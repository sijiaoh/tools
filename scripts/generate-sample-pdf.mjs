// Generates public/pdf-extract/sample.pdf for manual testing of the PDF
// extract tool. Run once with `node scripts/generate-sample-pdf.mjs` and
// commit the resulting PDF.
import { mkdirSync, createWriteStream } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '..', 'public', 'pdf-extract', 'sample.pdf');
mkdirSync(dirname(outPath), { recursive: true });

const doc = new PDFDocument({ size: 'A4', margin: 64 });
doc.pipe(createWriteStream(outPath));

const pages = [
  {
    title: 'Sample PDF — Page 1',
    body: [
      'This is a sample PDF used to verify the PDF extract tool.',
      'It contains a few pages of plain text in English.',
      'Each page has a short header and a paragraph below.',
    ],
  },
  {
    title: 'Page 2 — Lorem',
    body: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    ],
  },
  {
    title: 'Page 3 — Numbers',
    body: [
      'One two three four five six seven eight nine ten.',
      'Pi is approximately 3.14159.',
      'e is approximately 2.71828.',
    ],
  },
];

pages.forEach((p, i) => {
  if (i > 0) doc.addPage();
  doc.fontSize(20).text(p.title);
  doc.moveDown();
  doc.fontSize(12);
  p.body.forEach((line) => doc.text(line));
});

doc.end();
console.log(`Wrote ${outPath}`);
