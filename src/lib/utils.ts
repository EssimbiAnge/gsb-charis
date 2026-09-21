import z from "zod";

export { cn } from "cn";

export function coerceDate(): (
  arg: unknown,
  ctx: z.core.$RefinementCtx
) => unknown {
  return (val) => {
    if (val instanceof Date) return val.toISOString().slice(0, 10);
    if (typeof val === "string") {
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
    }
    return val;
  };
}
