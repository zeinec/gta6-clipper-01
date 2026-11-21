// gta6-clipper-01 — entry program for "Clip GTA 6 for the most YouTube views".
//
// The entry itself is a public YouTube Short cut from Rockstar's Grand Theft
// Auto VI Trailer 2. This program is the repository's checkable half of it:
// it reads VIDEO.json next to this file, makes sure the address it names is a
// real YouTube video address, and hands that file to the grader through
// $MAKEFUN_OUTPUT_DIR. Anything else exits non-zero with a plain message.
//
// Run it the way the grader does:
//   MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const videoFile = join(here, "VIDEO.json");

function fail(message: string): never {
  console.error(`gta6-clipper-01: ${message}`);
  process.exit(1);
}

if (!existsSync(videoFile)) {
  fail("VIDEO.json is missing from the repository root.");
}

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(videoFile, "utf8"));
} catch {
  fail("VIDEO.json is not valid JSON.");
}

const urlText = (parsed as { url?: unknown } | null)?.url;
if (typeof urlText !== "string" || urlText.trim() === "") {
  fail('VIDEO.json must name the video as {"url": "<YouTube address>"}.');
}

let videoUrl: URL;
try {
  videoUrl = new URL(urlText.trim());
} catch {
  fail(`VIDEO.json does not hold a valid address: ${urlText}`);
}

// The entry must be a public link a viewer can open, so plain http is not
// good enough: the address has to be https.
if (videoUrl.protocol !== "https:") {
  fail(`VIDEO.json must name an https address, got ${videoUrl.protocol}.`);
}

const youtubeHosts = [
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtu.be",
  "www.youtu.be",
];
const host = videoUrl.hostname.toLowerCase();
if (!youtubeHosts.includes(host)) {
  fail(`VIDEO.json must name a YouTube address, got host ${host}.`);
}

// A YouTube video id is always 11 characters of letters, digits, - and _.
// It can sit in ?v=, in /shorts/<id>, /embed/<id>, /live/<id>, or as the
// single path segment of a youtu.be link.
const idPattern = /^[A-Za-z0-9_-]{11}$/;
let videoId = "";
if (host.endsWith("youtu.be")) {
  videoId = videoUrl.pathname.replace(/^\/+/, "").split("/")[0] ?? "";
} else if (
  videoUrl.pathname.startsWith("/shorts/") ||
  videoUrl.pathname.startsWith("/embed/") ||
  videoUrl.pathname.startsWith("/live/")
) {
  videoId = videoUrl.pathname.split("/")[2] ?? "";
} else {
  videoId = videoUrl.searchParams.get("v") ?? "";
}
if (!idPattern.test(videoId)) {
  fail(
    `VIDEO.json must name a real YouTube video id (11 characters), got ${JSON.stringify(videoId)}.`,
  );
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  fail("MAKEFUN_OUTPUT_DIR is not set; the grader sets it when it runs this program.");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(videoFile, join(outDir, "VIDEO.json"));
console.log(`gta6-clipper-01: entry video https://www.youtube.com/watch?v=${videoId}`);
