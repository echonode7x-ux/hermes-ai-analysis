import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const siteDir = join(root, "site");
const distDir = join(root, "dist");

rmSync(distDir, { recursive: true, force: true });
mkdirSync(distDir, { recursive: true });
cpSync(siteDir, distDir, { recursive: true });

if (!existsSync(join(distDir, "index.html"))) {
  throw new Error("Build failed: dist/index.html is missing");
}

console.log("Build complete: copied site/ to dist/");
