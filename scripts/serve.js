import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };
const port = 3000;

createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const file = pathname === "/" ? "index.html" : pathname.slice(1);
  if (!/^[\w.-]+$/.test(file)) {
    response.writeHead(404).end("Không tìm thấy");
    return;
  }
  try {
    const content = await readFile(join("public", file));
    response.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" }).end(content);
  } catch {
    response.writeHead(404).end("Không tìm thấy");
  }
}).listen(port, () => console.log(`Mở http://localhost:${port}`));
