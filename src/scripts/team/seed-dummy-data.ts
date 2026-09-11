import fs from "node:fs";
import path from "node:path";
import type { TeamMember } from "@/lib/team/types";

const members: TeamMember[] = [
  // Administration
  {
    slug: "samuel-nkeng",
    name: "Mr. Samuel Nkeng",
    group: "administration",
    roleTitle: { en: "Director of Studies", fr: "Directeur des Études" },
    photo: "https://i.pravatar.cc/400?img=12",
    bio: {
      en: "Oversees academic planning and staff coordination across the primary and secondary sections.",
      fr: "Supervise la planification académique et la coordination du personnel dans les sections primaire et secondaire.",
    },
    contacts: [{ type: "email", value: "s.nkeng@charisschool.cm" }],
    order: 1,
  },
  {
    slug: "irene-fomba",
    name: "Mrs. Irene Fomba",
    group: "administration",
    roleTitle: { en: "Administrative Coordinator", fr: "Coordinatrice Administrative" },
    photo: "https://i.pravatar.cc/400?img=45",
    bio: {
      en: "Manages enrollment, records, and day-to-day administrative operations for the school.",
      fr: "Gère les inscriptions, les dossiers et les opérations administratives quotidiennes de l'école.",
    },
    contacts: [{ type: "email", value: "i.fomba@charisschool.cm" }],
    order: 2,
  },

  // Staff
  {
    slug: "paul-etoa",
    name: "Mr. Paul Etoa",
    group: "staff",
    roleTitle: { en: "IT Support", fr: "Support Informatique" },
    photo: "https://i.pravatar.cc/400?img=33",
    bio: {
      en: "Maintains the school's computer lab and technical equipment across all departments.",
      fr: "Entretient le laboratoire informatique et le matériel technique de tous les départements.",
    },
    contacts: [{ type: "email", value: "p.etoa@charisschool.cm" }],
    order: 1,
  },
  {
    slug: "clarisse-mballa",
    name: "Mrs. Clarisse Mballa",
    group: "staff",
    roleTitle: { en: "Librarian", fr: "Bibliothécaire" },
    photo: "https://i.pravatar.cc/400?img=47",
    bio: {
      en: "Runs the school library and supports pupils' reading habits from primary through secondary.",
      fr: "Gère la bibliothèque de l'école et encourage la lecture chez les élèves du primaire au secondaire.",
    },
    contacts: [{ type: "email", value: "c.mballa@charisschool.cm" }],
    order: 2,
  },
  {
    slug: "joseph-tabi",
    name: "Mr. Joseph Tabi",
    group: "staff",
    roleTitle: { en: "Security Supervisor", fr: "Superviseur de la Sécurité" },
    photo: "https://i.pravatar.cc/400?img=51",
    bio: {
      en: "Oversees campus security and coordinates safe arrival and departure routines for pupils.",
      fr: "Supervise la sécurité du campus et coordonne les routines d'arrivée et de départ des élèves.",
    },
    contacts: [{ type: "phone", value: "+237691179862" }],
    order: 3,
  },
  {
    slug: "solange-ndifor",
    name: "Mrs. Solange Ndifor",
    group: "staff",
    roleTitle: { en: "School Nurse", fr: "Infirmière Scolaire" },
    photo: "https://i.pravatar.cc/400?img=29",
    bio: {
      en: "Provides first aid and health monitoring for pupils and staff throughout the school day.",
      fr: "Assure les premiers soins et le suivi de la santé des élèves et du personnel durant la journée.",
    },
    contacts: [{ type: "email", value: "s.ndifor@charisschool.cm" }],
    order: 4,
  },
  {
    slug: "alain-bassong",
    name: "Mr. Alain Bassong",
    group: "staff",
    roleTitle: { en: "Facilities Manager", fr: "Responsable des Infrastructures" },
    photo: "https://i.pravatar.cc/400?img=53",
    bio: {
      en: "Keeps classrooms, grounds, and equipment in working order across the whole complex.",
      fr: "Veille au bon état des salles de classe, des espaces et des équipements de tout le complexe.",
    },
    contacts: [{ type: "email", value: "a.bassong@charisschool.cm" }],
    order: 5,
  },

  // Teachers
  {
    slug: "grace-ateba",
    name: "Mrs. Grace Ateba",
    group: "teacher",
    roleTitle: { en: "CP Teacher", fr: "Titulaire CP" },
    photo: "https://i.pravatar.cc/400?img=25",
    bio: {
      en: "Guides CP pupils through their first steps in reading, writing, and numeracy.",
      fr: "Accompagne les élèves de CP dans leurs premiers pas en lecture, écriture et calcul.",
    },
    contacts: [{ type: "email", value: "g.ateba@charisschool.cm" }],
    order: 1,
  },
  {
    slug: "eric-fonkou",
    name: "Mr. Eric Fonkou",
    group: "teacher",
    roleTitle: { en: "CE1 Teacher", fr: "Titulaire CE1" },
    photo: "https://i.pravatar.cc/400?img=14",
    bio: {
      en: "Builds on early literacy skills while introducing pupils to basic science concepts.",
      fr: "Renforce les compétences de base en lecture tout en initiant les élèves aux sciences.",
    },
    contacts: [{ type: "email", value: "e.fonkou@charisschool.cm" }],
    order: 2,
  },
  {
    slug: "linda-achu",
    name: "Mrs. Linda Achu",
    group: "teacher",
    roleTitle: { en: "CE2 Teacher", fr: "Titulaire CE2" },
    photo: "https://i.pravatar.cc/400?img=32",
    bio: {
      en: "Focuses on strengthening pupils' independence in reading comprehension and problem-solving.",
      fr: "Renforce l'autonomie des élèves en compréhension de lecture et en résolution de problèmes.",
    },
    contacts: [{ type: "email", value: "l.achu@charisschool.cm" }],
    order: 3,
  },
  {
    slug: "patrick-nguema",
    name: "Mr. Patrick Nguema",
    group: "teacher",
    roleTitle: { en: "CM1 Teacher", fr: "Titulaire CM1" },
    photo: "https://i.pravatar.cc/400?img=15",
    bio: {
      en: "Prepares pupils for upper-primary work with a focus on French and mathematics.",
      fr: "Prépare les élèves au cycle supérieur du primaire, avec un accent sur le français et les mathématiques.",
    },
    contacts: [{ type: "email", value: "p.nguema@charisschool.cm" }],
    order: 4,
  },
  {
    slug: "beatrice-njoya",
    name: "Mrs. Beatrice Njoya",
    group: "teacher",
    roleTitle: { en: "CM2 Teacher", fr: "Titulaire CM2" },
    photo: "https://i.pravatar.cc/400?img=48",
    bio: {
      en: "Guides CM2 pupils through their final year of primary school and entrance exam preparation.",
      fr: "Accompagne les élèves de CM2 dans leur dernière année du primaire et la préparation aux examens.",
    },
    contacts: [{ type: "email", value: "b.njoya@charisschool.cm" }],
    order: 5,
  },
  {
    slug: "daniel-ekema",
    name: "Mr. Daniel Ekema",
    group: "teacher",
    roleTitle: { en: "Class 1 Teacher", fr: "Titulaire Class 1" },
    photo: "https://i.pravatar.cc/400?img=18",
    bio: {
      en: "Introduces English-section pupils to foundational literacy and numeracy in a bilingual setting.",
      fr: "Initie les élèves de la section anglophone à la lecture et au calcul dans un cadre bilingue.",
    },
    contacts: [{ type: "email", value: "d.ekema@charisschool.cm" }],
    order: 6,
  },
  {
    slug: "florence-talla",
    name: "Mrs. Florence Talla",
    group: "teacher",
    roleTitle: { en: "Class 2 Teacher", fr: "Titulaire Class 2" },
    photo: "https://i.pravatar.cc/400?img=44",
    bio: {
      en: "Encourages curiosity through hands-on activities in reading, science, and creative arts.",
      fr: "Encourage la curiosité à travers des activités pratiques en lecture, sciences et arts créatifs.",
    },
    contacts: [{ type: "email", value: "f.talla@charisschool.cm" }],
    order: 7,
  },
  {
    slug: "vincent-ayuk",
    name: "Mr. Vincent Ayuk",
    group: "teacher",
    roleTitle: { en: "Class 3 Teacher", fr: "Titulaire Class 3" },
    photo: "https://i.pravatar.cc/400?img=22",
    bio: {
      en: "Builds pupils' confidence in English composition and introduces basic geography and history.",
      fr: "Renforce la confiance des élèves en rédaction anglaise et initie à la géographie et l'histoire.",
    },
    contacts: [{ type: "email", value: "v.ayuk@charisschool.cm" }],
    order: 8,
  },
  {
    slug: "rachel-mendo",
    name: "Mrs. Rachel Mendo",
    group: "teacher",
    roleTitle: { en: "Class 4 Teacher", fr: "Titulaire Class 4" },
    photo: "https://i.pravatar.cc/400?img=39",
    bio: {
      en: "Prepares pupils for common entrance examinations with a focus on maths and English.",
      fr: "Prépare les élèves aux examens d'entrée avec un accent sur les mathématiques et l'anglais.",
    },
    contacts: [{ type: "email", value: "r.mendo@charisschool.cm" }],
    order: 9,
  },
  {
    slug: "herve-sob",
    name: "Mr. Hervé Sob",
    group: "teacher",
    roleTitle: { en: "SIL Teacher", fr: "Titulaire SIL" },
    photo: "https://i.pravatar.cc/400?img=11",
    bio: {
      en: "Welcomes the youngest pupils into school life with a gentle introduction to letters and numbers.",
      fr: "Accueille les plus jeunes élèves dans la vie scolaire avec une initiation en douceur aux lettres et aux chiffres.",
    },
    contacts: [{ type: "email", value: "h.sob@charisschool.cm" }],
    order: 10,
  },
];

const outDir = path.join(process.cwd(), "content", "team");
fs.mkdirSync(outDir, { recursive: true });

for (const member of members) {
  const outPath = path.join(outDir, `${member.slug}.json`);
  fs.writeFileSync(outPath, JSON.stringify(member, null, 2) + "\n");
}

console.log(`Wrote ${members.length} team profiles to content/team/`);