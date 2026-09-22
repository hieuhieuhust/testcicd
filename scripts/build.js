import { cp, mkdir, rm, stat } from "node:fs/promises";
import { join } from "node:path";

const source = "public";
const output = "dist";
for (const file of ["index.html", "styles.css", "app.js", "tasks.js"]) {
  await stat(join(source, file));
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
console.log("Đã tạo website trong thư mục dist/");
