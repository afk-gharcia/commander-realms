"""Prepare Commander Realms site icon and realm icon assets."""

from __future__ import annotations

from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
BRANDING = ROOT / "public" / "images" / "branding"
THEMES = ROOT / "public" / "images" / "themes"
ICON_SOURCE = BRANDING / "icon-source.png"


def is_dark_background(r: int, g: int, b: int, a: int) -> bool:
    if a < 10:
        return True

    total = r + g + b
    if total < 50:
        return True

    mx, mn = max(r, g, b), min(r, g, b)
    sat = mx - mn
    avg = total / 3

    if sat < 42 and avg < 68:
        return True

    return False


def color_distance(c1: tuple[int, int, int], c2: tuple[int, int, int]) -> int:
    return sum(abs(a - b) for a, b in zip(c1, c2))


def corner_samples(img: Image.Image) -> list[tuple[int, int, int]]:
    pixels = img.load()
    w, h = img.size
    points = [
        (0, 0),
        (w - 1, 0),
        (0, h - 1),
        (w - 1, h - 1),
        (w // 2, 0),
        (0, h // 2),
        (w - 1, h // 2),
        (w // 2, h - 1),
    ]
    return [pixels[x, y][:3] for x, y in points]


def matches_background(
    r: int,
    g: int,
    b: int,
    samples: list[tuple[int, int, int]],
    *,
    tolerance: int = 48,
) -> bool:
    if is_dark_background(r, g, b, 255):
        return True

    pixel = (r, g, b)
    if any(color_distance(pixel, sample) <= tolerance for sample in samples):
        return True

    mx, mn = max(r, g, b), min(r, g, b)
    avg = (r + g + b) / 3
    if mx - mn < 36 and avg > 110:
        for sr, sg, sb in samples:
            sample_avg = (sr + sg + sb) / 3
            if abs(avg - sample_avg) < 55:
                return True

    return False


def flood_fill_background(img: Image.Image, *, tolerance: int = 48) -> None:
    w, h = img.size
    pixels = img.load()
    samples = corner_samples(img)
    seen = set()
    queue: deque[tuple[int, int]] = deque()

    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))

    while queue:
        x, y = queue.popleft()
        if (x, y) in seen or x < 0 or x >= w or y < 0 or y >= h:
            continue
        seen.add((x, y))

        r, g, b, a = pixels[x, y]
        if not matches_background(r, g, b, samples, tolerance=tolerance):
            continue

        pixels[x, y] = (0, 0, 0, 0)
        queue.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])


def crop_square(img: Image.Image) -> Image.Image:
    bbox = img.getbbox()
    if not bbox:
        return img

    img = img.crop(bbox)
    w, h = img.size
    side = max(w, h)
    squared = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    squared.paste(img, ((side - w) // 2, (side - h) // 2))
    return squared


def strip_dark_pixels(img: Image.Image) -> None:
    pixels = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if is_dark_background(r, g, b, a):
                pixels[x, y] = (0, 0, 0, 0)


def process_transparent(
    src: Path,
    dest: Path,
    *,
    square: bool = False,
    flood_fill: bool = False,
) -> None:
    img = Image.open(src).convert("RGBA")

    if flood_fill:
        flood_fill_background(img)
        strip_dark_pixels(img)
    else:
        strip_dark_pixels(img)

    if square:
        img = crop_square(img)
    else:
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)

    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG", optimize=True)
    print(f"Wrote {dest.relative_to(ROOT)} ({img.size[0]}x{img.size[1]})")


def process_realm_icons() -> None:
    if not THEMES.exists():
        return

    for theme_dir in sorted(THEMES.iterdir()):
        if not theme_dir.is_dir():
            continue

        src = theme_dir / "icon-source.png"
        if not src.exists():
            continue

        process_transparent(
            src,
            theme_dir / "icon.png",
            square=True,
            flood_fill=True,
        )


if __name__ == "__main__":
    icon_src = ICON_SOURCE if ICON_SOURCE.exists() else BRANDING / "icon.png"
    if icon_src.exists():
        process_transparent(icon_src, BRANDING / "icon.png", square=True, flood_fill=True)
    else:
        print("Skip site icon: no source file")

    process_realm_icons()
