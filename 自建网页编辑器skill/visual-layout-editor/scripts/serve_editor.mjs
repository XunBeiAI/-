#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || 4173);
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url || "/", `http://${host}`).pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const candidate = path.resolve(root, relative);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) {
    response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" }).end("Forbidden");
    return;
  }
  fs.stat(candidate, (statError, stat) => {
    const file = !statError && stat.isDirectory() ? path.join(candidate, "index.html") : candidate;
    fs.readFile(file, (readError, data) => {
      if (readError) {
        response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
        return;
      }
      response.writeHead(200, {
        "Content-Type": types[path.extname(file).toLowerCase()] || "application/octet-stream",
        "Cache-Control": "no-store"
      });
      response.end(data);
    });
  });
}).listen(port, host, () => {
  console.log(`Visual editor server: http://${host}:${port}/visual-layout-editor.html`);
});

