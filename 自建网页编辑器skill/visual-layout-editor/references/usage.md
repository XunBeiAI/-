# Usage and merge guide

## Same-origin requirement

The editor reads and modifies an iframe DOM. Install it under the same HTTP document root as the target page. A target URL with a different scheme, host, or port is rejected. `file://` is unsupported.

## Controls

- Click an element to select it.
- Shift-click to select its parent.
- Drag any blue border segment to move the element.
- Drag the left or right middle handle to change width and text wrapping.
- Drag the bottom-right handle to resize width and height together.
- Use arrow keys for 1 px movement and Shift + arrow keys for 10 px.
- Delete hides the selected element; Reset restores its original inline style and text.
- Ctrl/Cmd+C and Ctrl/Cmd+V copy and paste selected elements.

## Persistence model

Desktop and mobile records use separate `localStorage` keys. Save writes the current record set to the browser. It does not write files. JSON export is the authoritative handoff format.

Each ordinary record may contain:

- `style`: complete inline style after adjustment
- `text`: editable text or input placeholder
- `deleted`: whether the element is hidden
- `x`, `y`, `width`, `height`, `fontSize`, `opacity`: inspection metadata

`@clones` contains pasted nodes with a parent selector, generated clone id, and HTML.

## Merge into source

Use selectors only to locate elements; do not blindly append all inline styles to production. Prefer moving stable values into the project's stylesheet and responsive media queries. Apply `text` values to HTML, remove nodes intentionally marked `deleted`, and place clone markup beside the intended siblings. Re-run the page after each structural merge because positional selectors using `:nth-of-type()` may change when markup changes.

## Troubleshooting

- Blank preview: confirm the page path is relative to the editor's HTTP root and returns 200.
- Selection does nothing: confirm the iframe URL has the same origin as the editor.
- A component moves unexpectedly: select the smallest intended child; Shift-click only when selecting a parent deliberately.
- Saved changes are missing: confirm the same browser profile, page path, and device mode are in use.
- Animations disappear in editor: intentional; editor mode disables animation and transition for precise manipulation.

