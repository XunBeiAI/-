#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const skillRoot = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const required = [
  "SKILL.md",
  "agents/openai.yaml",
  "assets/visual-layout-editor.html",
  "references/usage.md",
  "scripts/install_editor.py",
  "scripts/serve_editor.mjs"
];
const errors = [];
for (const relative of required) {
  if (!fs.existsSync(path.join(skillRoot, relative))) errors.push(`Missing required file: ${relative}`);
}

const skill = fs.readFileSync(path.join(skillRoot, "SKILL.md"), "utf8");
if (!/^---\r?\nname: visual-layout-editor\r?\ndescription: .+\r?\n---/s.test(skill)) errors.push("SKILL.md frontmatter is incomplete.");
if (/\[TODO:|placeholder instructions/i.test(skill)) errors.push("SKILL.md still contains scaffold placeholders.");

const editor = fs.readFileSync(path.join(skillRoot, "assets/visual-layout-editor.html"), "utf8");
const scriptStart = editor.lastIndexOf("<script>");
const scriptEnd = editor.lastIndexOf("</script>");
if (scriptStart < 0 || scriptEnd <= scriptStart) errors.push("Editor script block is missing.");
else {
  try { new Function(editor.slice(scriptStart + 8, scriptEnd)); }
  catch (error) { errors.push(`Editor JavaScript syntax error: ${error.message}`); }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("Skill package validation: OK");

