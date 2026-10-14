---
name: visual-layout-editor
description: Add and operate a browser-based visual layout editor for static HTML websites. Use when a user wants to drag, resize, copy, delete, or edit text on desktop/mobile page previews and then merge the result back into source. Do not use for canvas apps, design files, or hosted CMS editors.
---

# Visual Layout Editor

Use the bundled editor to make a static page visually adjustable without introducing a framework or external dependency.

## Workflow

1. Identify the site's HTTP document root and the page to edit. The editor and target page must be served from the same origin; never use `file://`.
2. Install the editor into that document root:

   ```text
   python scripts/install_editor.py --site-root <absolute-site-root>
   ```

   The command creates `visual-layout-editor.html` and does not modify existing pages.
3. Start the bundled server when the project has no dev server:

   ```text
   node scripts/serve_editor.mjs <absolute-site-root> 4173
   ```

4. Open the editor with a root-relative page path:

   ```text
   http://127.0.0.1:4173/visual-layout-editor.html?page=index.html&device=desktop
   ```

   Use `device=mobile` for the independent 390 × 844 layout.
5. Let the user adjust the page. Saved browser state is preview data, not a source edit.
6. Export JSON before merging. Use the stored selectors, inline style strings, text values, deleted flags, and clone records to update the real HTML/CSS. Preserve responsive rules and unrelated source changes. Treat exported CSS as a review aid because it cannot represent text changes or cloned nodes.
7. Reload both the original page and editor after merging, then verify desktop and mobile separately.

Read [references/usage.md](references/usage.md) when troubleshooting selection, persistence, import/export, or source merging.

## Constraints

- Keep the editor generic. Do not add client names, logos, contact details, private URLs, or project-specific copy to this skill.
- Do not load cross-origin pages into the editor. Browser security prevents DOM editing and the editor intentionally rejects them.
- Never claim that “Save” changed project files. It writes only to browser `localStorage`.
- Ask before overwriting an existing `visual-layout-editor.html`; the installer requires `--force` for replacement.
- Prefer editing source after review instead of shipping the editor in production builds.
