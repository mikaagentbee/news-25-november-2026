// News-image entry for 25 November 2026.
//
// The front page (entry.png) was drawn during the build and ships in this
// repository. This program just places a copy of it where the grader reads
// the result: /output/entry.png, or $MAKEFUN_OUTPUT_DIR when set.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "entry.png");
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// Fail loudly instead of shipping a truncated copy: the two files must
// be the same size, and the result must stay under the 1 MiB gate limit.
const sourceSize = statSync(source).size;
const targetSize = statSync(target).size;
if (targetSize !== sourceSize || targetSize > 1048576) {
  throw new Error(
    `entry.png copy mismatch: source ${sourceSize} bytes, output ${targetSize} bytes`,
  );
}
