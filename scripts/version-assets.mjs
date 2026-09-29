// Appends ?v=<content hash> to local CSS/JS references in every public/**/*.html.
// The CDN and browsers cache assets for a week, so every change must get a new URL.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const dir = new URL('../public/', import.meta.url);
const ref = /((?:href|src)="\/?)(assets\/(?:css|js)\/[\w.-]+\.(?:css|js))(?:\?v=[\w]+)?"/g;

for (const page of readdirSync(dir, { recursive: true }).filter((f) => f.endsWith('.html'))) {
  const url = new URL(page, dir);
  const html = readFileSync(url, 'utf8');
  const out = html.replace(ref, (_, attr, path) => {
    const hash = createHash('sha256').update(readFileSync(new URL(path, dir))).digest('hex').slice(0, 10);
    return `${attr}${path}?v=${hash}"`;
  });
  if (out !== html) writeFileSync(url, out);
}
