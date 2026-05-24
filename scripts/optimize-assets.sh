#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC="$ROOT/assets/_originals"
OUT_IMG="$ROOT/public/assets/images"
OUT_VID="$ROOT/public/assets/video"
TMP="${TMPDIR:-/tmp}/pg-optimize"

mkdir -p "$TMP" "$OUT_IMG/guests" "$OUT_IMG/decor" "$OUT_VID/posters"

# $1=source $2=output.webp $3=max edge px $4=quality
to_webp() {
  local src="$1" out="$2" max="$3" quality="$4"
  local tmp="$TMP/$(basename "$src").png"
  sips -Z "$max" "$src" --out "$tmp" >/dev/null
  cwebp -quiet -q "$quality" -alpha_q 92 -m 6 -af "$tmp" -o "$out"
  rm -f "$tmp"
}

echo "→ Images (WebP, alpha preserved)"

to_webp "$SRC/deskmuta.png"      "$OUT_IMG/desk-muta.webp"      5160 90
to_webp "$SRC/dias.png"          "$OUT_IMG/guests/dias.webp"          800 86
to_webp "$SRC/diasfreze.png"     "$OUT_IMG/guests/dias-freeze.webp"   1600 88
to_webp "$SRC/explosion.png"     "$OUT_IMG/guests/explosion.webp"     800 86
to_webp "$SRC/explosionfreze.png" "$OUT_IMG/guests/explosion-freeze.webp" 1600 88
to_webp "$SRC/gekkon.png"        "$OUT_IMG/guests/gekkon.webp"        800 86
to_webp "$SRC/gekkonfreze.png"   "$OUT_IMG/guests/gekkon-freeze.webp" 1600 88
to_webp "$SRC/joker.png"         "$OUT_IMG/guests/joker.webp"         800 86
to_webp "$SRC/jokerfreze.png"    "$OUT_IMG/guests/joker-freeze.webp"  1600 88
to_webp "$SRC/tiger.png"         "$OUT_IMG/guests/tiger.webp"         800 86
to_webp "$SRC/tigerfreze.png"    "$OUT_IMG/guests/tiger-freeze.webp"  1600 88
to_webp "$SRC/линия1.png"        "$OUT_IMG/decor/line-1.webp"         2400 82
to_webp "$SRC/линия2.png"        "$OUT_IMG/decor/line-2.webp"         2400 82

cp "$SRC/лого.svg" "$OUT_IMG/logo.svg"

echo "→ Video (H.264, faststart, no audio)"

encode_video() {
  local src="$1" out="$2" scale="$3" crf="${4:-24}"
  ffmpeg -y -hide_banner -loglevel error -i "$src" \
    -an \
    -vf "$scale" \
    -c:v libx264 -crf "$crf" -preset slow -profile:v high -pix_fmt yuv420p \
    -movflags +faststart \
    "$out"
}

encode_video "$SRC/maindesk.mp4"    "$OUT_VID/main-desk.mp4"    "scale='min(2560,iw)':-2:flags=lanczos"
encode_video "$SRC/mainmob.mp4"     "$OUT_VID/main-mob.mp4"     "scale='min(1440,iw)':-2:flags=lanczos"
encode_video "$SRC/videobattle.mp4"   "$OUT_VID/video-battle.mp4" "scale='min(1080,ih)':-2:flags=lanczos" 23

poster() {
  local src="$1" out="$2"
  local tmp="$TMP/poster-$$.png"
  ffmpeg -y -hide_banner -loglevel error -ss 00:00:00.5 -i "$src" -vframes 1 \
    -vf "scale='min(1920,iw)':-2:flags=lanczos" "$tmp"
  cwebp -quiet -q 88 -m 6 "$tmp" -o "$out"
  rm -f "$tmp"
}

poster "$OUT_VID/main-desk.mp4"    "$OUT_VID/posters/main-desk.webp"
poster "$OUT_VID/main-mob.mp4"     "$OUT_VID/posters/main-mob.webp"
poster "$OUT_VID/video-battle.mp4" "$OUT_VID/posters/video-battle.webp"

echo "✓ Done"
