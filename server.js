const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT) || 8080;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav"
};

function send(res, code, body, type = "text/plain; charset=utf-8") {
  res.writeHead(code, {
    "Content-Type": type,
    "Cache-Control": "no-cache"
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent((req.url || "/").split("?")[0]);
  } catch {
    return send(res, 400, "Bad Request");
  }

  let rel = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  let file = path.resolve(root, rel);

  if (file !== root && !file.startsWith(root + path.sep)) {
    return send(res, 403, "Forbidden");
  }

  fs.stat(file, (err, stat) => {
    if (!err && stat.isDirectory()) {
      file = path.join(file, "index.html");
      return serveFile(file);
    }
    if (err) return send(res, 404, "Not Found");
    serveFile(file);
  });

  function serveFile(target) {
    fs.readFile(target, (err, data) => {
      if (err) return send(res, 404, "Not Found");
      const ext = path.extname(target).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME[ext] || "application/octet-stream",
        "Content-Length": data.length,
        "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
        "X-Content-Type-Options": "nosniff"
      });
      res.end(data);
    });
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Reaction Chain listening on 0.0.0.0:${port}`);
});
