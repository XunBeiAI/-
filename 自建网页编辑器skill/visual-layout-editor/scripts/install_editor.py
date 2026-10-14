#!/usr/bin/env python3
"""Install the generic visual layout editor into a static site's document root."""

from __future__ import annotations

import argparse
import shutil
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--site-root", required=True, help="Static site's HTTP document root")
    parser.add_argument("--output", default="visual-layout-editor.html", help="Output path relative to site root")
    parser.add_argument("--force", action="store_true", help="Replace an existing editor file")
    args = parser.parse_args()

    site_root = Path(args.site_root).expanduser().resolve()
    if not site_root.is_dir():
        parser.error(f"site root does not exist or is not a directory: {site_root}")

    output = (site_root / args.output).resolve()
    try:
        output.relative_to(site_root)
    except ValueError:
        parser.error("output must remain inside site root")

    source = Path(__file__).resolve().parents[1] / "assets" / "visual-layout-editor.html"
    if output.exists() and not args.force:
        parser.error(f"output already exists: {output}; pass --force to replace it")

    output.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(source, output)
    print(f"Installed visual layout editor: {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

