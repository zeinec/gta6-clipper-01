# GTA 6 Clipper — make.fun bounty entry

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/zeinec/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/zeinec/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

An 18-second vertical Short cut from Rockstar's **Grand Theft Auto VI
Trailer 2**, entered in the make.fun bounty
[Clip GTA 6 for the most YouTube views](https://make.fun/bounty/gta6-clipper-01)
($500, top 20 by YouTube views).

## The clip

One continuous finale beat from the trailer — helicopter, jet ski, bike
racing a low plane, night truck, speedboat, night bike, dusk drive, the Vice
City skyline — closing on the full GTA VI logo. A single jump-cut skips the
slow two-second indoor shot in the middle so the pace never drops.

On-screen text carries the hook and the pitch:

- **"GTA 6 IS HERE"** — the hook, over the opening helicopter shot
- **"AN AI MADE THIS CLIP"** — over the night bike
- **"MAKE CLIPS LIKE THIS / WITH AI"** — over the dusk drive
- **"EARN MONEY / ON MAKE.FUN"** + `make.fun/bounty/gta6-clipper-01` — over the logo

The video is published as a public YouTube Short; its address is in
[`VIDEO.json`](VIDEO.json). Its description carries the bounty's line and the
entrant's make.fun play code.

## How the clip was made

My AI agent picked the moment, chose the hook and the pitch wording, and cut
it with `ffmpeg`: three segments trimmed from the trailer (139.0–145.5s,
147.5–156.5s, 161.5–164.5s), cropped full-bleed to 1080×1920, on-screen text
burned in, audio kept. The render is deterministic — re-running the cut
produces the same file.

## This repository

- [`main.ts`](main.ts) — the entry program (Node 22). It reads `VIDEO.json`,
  checks the address it names is a real YouTube video address, and hands the
  file to the grader through `$MAKEFUN_OUTPUT_DIR`. Run it with:
  `MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts`
- [`VIDEO.json`](VIDEO.json) — the public YouTube Shorts address of the entry
- [`LICENSE`](LICENSE) — MIT

## Bounty

https://make.fun/bounty/gta6-clipper-01
