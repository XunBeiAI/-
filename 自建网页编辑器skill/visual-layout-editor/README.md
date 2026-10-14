# Visual Layout Editor Skill

A reusable AI skill that installs a dependency-free, browser-based visual editor into any static website.

## What it provides

- Same-origin HTML page loading
- Separate desktop and 390 × 844 mobile adjustments
- Click selection, border dragging, width handles, and corner resizing
- Text, position, size, font size, and opacity controls
- Copy, paste, delete, reset, undo, JSON import/export, and CSS export
- Browser-local preview persistence without changing project files

## Repository layout

```text
visual-layout-editor/
├─ SKILL.md
├─ agents/openai.yaml
├─ assets/visual-layout-editor.html
├─ references/usage.md
└─ scripts/
   ├─ install_editor.py
   ├─ serve_editor.mjs
   └─ validate_package.mjs
```

AI agents should read `SKILL.md`. For manual use, install the editor into a static site's document root and serve that root over HTTP:

```bash
python scripts/install_editor.py --site-root /absolute/path/to/site
node scripts/serve_editor.mjs /absolute/path/to/site 4173
```

Then open:

```text
http://127.0.0.1:4173/visual-layout-editor.html?page=index.html&device=desktop
```

The editor stores preview changes in the browser. Export JSON and merge reviewed changes into the source before deployment.

Run `node scripts/validate_package.mjs` before publishing the repository.


