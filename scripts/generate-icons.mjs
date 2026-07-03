import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");

// PotMark "tile"-variant: witte ring op een teal afgeronde tegel — het app-icoon.
const svg = `
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100" height="100" rx="22" fill="#0f6e56" />
  <g transform="rotate(-90 50 50)" fill="none" stroke-linecap="butt">
    <circle cx="50" cy="50" r="30" stroke="#ffffff" stroke-width="11" stroke-dasharray="70.6 117.8" stroke-dashoffset="0" />
    <circle cx="50" cy="50" r="30" stroke="#cfe7df" stroke-width="11" stroke-dasharray="46.1 142.3" stroke-dashoffset="-75.4" />
    <circle cx="50" cy="50" r="30" stroke="#a4cec2" stroke-width="11" stroke-dasharray="31.1 157.3" stroke-dashoffset="-126.3" />
    <circle cx="50" cy="50" r="30" stroke="#ffffff" stroke-width="11" stroke-dasharray="21.6 166.8" stroke-dashoffset="-162.1" />
  </g>
</svg>
`;

for (const size of [192, 512]) {
  const outfile = path.join(publicDir, `icon-${size}.png`);
  await sharp(Buffer.from(svg)).resize(size, size).png().toFile(outfile);
  console.log(`geschreven: ${outfile}`);
}
