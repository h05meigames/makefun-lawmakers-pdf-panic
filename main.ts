// The Long Roast: Lawmakers and the File They Cannot Convert — make.fun bounty
// u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7
// Writes one original satirical sentence (max 320 characters) roasting
// lawmakers who would regulate AI, crypto or the internet but cannot
// convert a file to PDF. Node 22+, standard library only. Deterministic:
// the same line every run.

import { mkdirSync, writeFileSync } from "node:fs";

// One original roast, written for this bounty.
const line =
  "The senator who called artificial intelligence an existential threat just called IT in a panic because his bill 'turned into a PDF and now I can't edit it anymore' — then voted to regulate the software that did it.";

// The bounty requires ONE satirical sentence of at most 320 characters.
// Count Unicode code points (not UTF-16 units or bytes) so multi-byte
// characters count once, and fail loudly instead of emitting a bad entry.
const codePoints = [...line].length;
if (codePoints < 1 || codePoints > 320) {
  throw new Error(`line must be 1–320 code points, got ${codePoints}`);
}
// A line of only whitespace would pass the length guard but is not a
// roast at all, so reject it here instead of writing a blank entry.
if (line.trim().length === 0) {
  throw new Error("line must not be only white space");
}
// The brief asks for ONE sentence on ONE line: a newline would split the
// entry, extra sentences would break the brief, and a line without
// terminal punctuation reads unfinished, so reject all three here.
if (/[\r\n]/.test(line)) {
  throw new Error("line must be a single line (no newline characters)");
}
const sentences = line.split(/[.!?]+/).filter((s) => s.trim().length > 0);
if (sentences.length !== 1) {
  throw new Error(`line must be exactly 1 sentence, got ${sentences.length}`);
}
if (!/[.!?]$/.test(line)) {
  throw new Error("line must end with terminal punctuation");
}

// The entry: one line on stdout.
console.log(line);

// Also keep the established /output/entry.txt copy for the grader.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
