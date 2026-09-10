import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_BUCKET = process.env.R2_BUCKET_NAME!;
/** Public base URL the bucket is served from, e.g. https://media.charisschool.cm */
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL!;

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const GIF_EXTENSION = ".gif";
const VIDEO_EXTENSIONS = new Set([".mp4", ".mov", ".webm"]);
const THUMB_SUFFIX = "-thumb";

/** One object read back from the R2 bucket listing. */
interface BucketObject {
  key: string;
  sizeBytes: number;
}

/** Converts a byte count into a short human-readable label, e.g. "24 MB". */
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

/** Derives a media `type` from a file extension, or `null` if unrecognized. */
function inferType(ext: string): "image" | "gif" | "video" | null {
  if (IMAGE_EXTENSIONS.has(ext)) return "image";
  if (ext === GIF_EXTENSION) return "gif";
  if (VIDEO_EXTENSIONS.has(ext)) return "video";
  return null;
}

/** Lists every object under a given prefix in the R2 bucket. */
async function listObjects(prefix: string): Promise<BucketObject[]> {

  console.log({
     R2_ACCOUNT_ID,
 R2_ACCESS_KEY_ID ,
 R2_SECRET_ACCESS_KEY,
 R2_BUCKET ,
 R2_PUBLIC_URL ,
  })

  const client = new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId: R2_ACCESS_KEY_ID, secretAccessKey: R2_SECRET_ACCESS_KEY },
  });

  const objects: BucketObject[] = [];
  let continuationToken: string | undefined;

  do {
    const result = await client.send(
      new ListObjectsV2Command({ Bucket: R2_BUCKET, Prefix: prefix, ContinuationToken: continuationToken })
    );
    for (const obj of result.Contents ?? []) {
      if (obj.Key && obj.Size !== undefined) {
        objects.push({ key: obj.Key, sizeBytes: obj.Size });
      }
    }
    continuationToken = result.NextContinuationToken;
  } while (continuationToken);

  return objects;
}

/**
 * Scaffolds a `meta.json` stub for a gallery event by listing its R2
 * bucket prefix. Fills in everything derivable from the files themselves
 * (`src`, `type`, `sizeLabel`, thumbnail pairing) and leaves `title`,
 * `alt`, and `category` as TODO placeholders for manual entry.
 */
async function scaffold(year: string, slug: string) {
  const prefix = `${year}/${slug}/`;  // was `gallery/${year}/${slug}/`
  const objects = await listObjects(prefix);

  if (objects.length === 0) {
    console.error(`No objects found under prefix "${prefix}". Check the year/slug and bucket contents.`);
    process.exit(1);
  }

  const keysByBasename = new Map(objects.map((o) => [path.basename(o.key, path.extname(o.key)), o]));

  const items: unknown[] = [];
  let coverImage: string | undefined;

  for (const obj of objects) {
    const filename = path.basename(obj.key);
    const ext = path.extname(filename).toLowerCase();
    const base = path.basename(filename, ext);

    // Thumbnail files are consumed by their paired video/gif, not listed as their own item.
    if (base.endsWith(THUMB_SUFFIX)) continue;

    const type = inferType(ext);
    if (!type) {
      console.warn(`Skipping unrecognized file type: ${obj.key}`);
      continue;
    }

    const src = `${R2_PUBLIC_URL}/${obj.key}`;

    if (base === "cover") coverImage = src;

    if (type === "video" || type === "gif") {
      const thumbKey = keysByBasename.get(`${base}${THUMB_SUFFIX}`);
      if (!thumbKey) {
        console.warn(`No thumbnail found for ${obj.key} (expected "${base}${THUMB_SUFFIX}.<ext>"). Add one before publishing.`);
      }
      items.push({
        type,
        src,
        thumbnail: thumbKey ? `${R2_PUBLIC_URL}/${thumbKey.key}` : "TODO",
        sizeLabel: formatSize(obj.sizeBytes),
        alt: "TODO",
      });
    } else {
      items.push({ type, src, alt: "TODO" });
    }
  }

  const meta = {
    title: "TODO",
    slug,
    date: new Date().toISOString().slice(0, 10),
    category: "TODO",
    coverImage: coverImage ?? "TODO — no file named 'cover.*' found, set manually",
    items,
  };

  const outDir = path.join(process.cwd(), "content", "gallery", year, slug);
  const outPath = path.join(outDir, "meta.json");

  if (fs.existsSync(outPath) && !process.argv.includes("--force")) {
    console.error(`${outPath} already exists. Re-run with --force to overwrite.`);
    process.exit(1);
  }

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(meta, null, 2) + "\n");

  console.log(`Wrote ${outPath} — ${items.length} item(s). Fill in the TODO fields before publishing.`);
}

const [year, slug] = process.argv.slice(2);
if (!year || !slug) {
  console.error("Usage: tsx scripts/gallery/scaffold-meta.ts <year> <slug>");
  process.exit(1);
}

scaffold(year, slug);