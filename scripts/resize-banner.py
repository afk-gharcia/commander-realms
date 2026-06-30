"""Resize a realm banner to the site target size (1280x300, center crop)."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

TARGET_W, TARGET_H = 1280, 300


def resize_banner(path: Path) -> None:
    img = Image.open(path).convert("RGB")
    src_w, src_h = img.size
    target_ratio = TARGET_W / TARGET_H
    src_ratio = src_w / src_h

    if src_ratio > target_ratio:
        new_h = src_h
        new_w = int(src_h * target_ratio)
        left = (src_w - new_w) // 2
        img = img.crop((left, 0, left + new_w, new_h))
    else:
        new_w = src_w
        new_h = int(src_w / target_ratio)
        top = (src_h - new_h) // 2
        img = img.crop((0, top, new_w, top + new_h))

    img = img.resize((TARGET_W, TARGET_H), Image.Resampling.LANCZOS)
    img.save(path, "PNG", optimize=True)
    print(f"Wrote {path} ({TARGET_W}x{TARGET_H}) from {src_w}x{src_h}")


if __name__ == "__main__":
    banner = (
        Path(__file__).resolve().parents[1]
        / "public"
        / "images"
        / "themes"
        / "marvel-civil-war"
        / "banner.png"
    )
    resize_banner(banner)
