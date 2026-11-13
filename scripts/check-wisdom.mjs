// Checks that every exercise in lib/data/exercises.ts has a wisdom entry
// in lib/data/wisdom.ts (keyed by its exact text), and that no wisdom entry
// is orphaned. Run with: pnpm check:wisdom  (needs Node 22.6+)
import { exerciseTexts } from "../lib/data/exercises.ts";
import { exerciseMetadata } from "../lib/data/wisdom.ts";

const exercises = Object.entries(exerciseTexts).flatMap(([category, levels]) =>
  Object.entries(levels).flatMap(([level, texts]) =>
    texts.map((text) => ({ text, where: `${category}/${level}` })),
  ),
);
const keys = new Set(Object.keys(exerciseMetadata));
const texts = new Set(exercises.map((e) => e.text));

const missing = exercises.filter((e) => !keys.has(e.text));
const orphaned = [...keys].filter((k) => !texts.has(k));
const incomplete = [...keys].filter((k) => {
  const w = exerciseMetadata[k];
  return !w.translation?.trim() || !w.wisdom?.trim();
});

for (const e of missing) console.error(`✗ missing wisdom: [${e.where}] ${e.text}`);
for (const k of orphaned) console.error(`✗ wisdom key matches no exercise: ${k}`);
for (const k of incomplete) console.error(`✗ empty translation or wisdom: ${k}`);

if (missing.length || orphaned.length || incomplete.length) process.exit(1);
console.log(`✓ all ${exercises.length} exercises have wisdom`);
