const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ROOT = __dirname;
const envFile = path.join(ROOT, ".env");
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, "$2");
  }
}
const PORT = Number(process.env.PORT) || 4173;
const HOST = process.env.HOST || "0.0.0.0";
const SUPABASE_URL = (process.env.SUPABASE_URL || "").replace(/\/$/, "");
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
const MAX_BODY = 16 * 1024;
const allowedTypes = new Set(["Retailer", "Wholesaler", "Distributor", "Chain store", "Regional trader", "Bulk buyer"]);
const recentRequests = new Map();
const mime = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png",
  ".webp": "image/webp", ".svg": "image/svg+xml", ".pdf": "application/pdf"
};

function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": mime[".json"], "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
  res.end(JSON.stringify(body));
}

function clean(value, max) {
  return String(value ?? "").trim().replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").slice(0, max);
}

function validate(input) {
  const enquiry = {
    name: clean(input.name, 100), business: clean(input.business, 150), city: clean(input.city, 100),
    type: clean(input.type, 50), phone: clean(input.phone, 30), whatsapp: clean(input.whatsapp, 30),
    requirement: clean(input.requirement, 1500)
  };
  const errors = {};
  if (!enquiry.name) errors.name = "Enter your name";
  if (!enquiry.business) errors.business = "Enter your business name";
  if (!enquiry.city) errors.city = "Enter your city";
  if (!allowedTypes.has(enquiry.type)) errors.type = "Select a valid business type";
  if (enquiry.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10 digit phone number";
  if (enquiry.whatsapp && enquiry.whatsapp.replace(/\D/g, "").length < 10) errors.whatsapp = "Enter a valid WhatsApp number";
  return { enquiry, errors };
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", chunk => { body += chunk; if (Buffer.byteLength(body) > MAX_BODY) reject(Object.assign(new Error("Payload too large"), { status: 413 })); });
    req.on("end", () => { try { resolve(JSON.parse(body || "{}")); } catch { reject(Object.assign(new Error("Invalid JSON"), { status: 400 })); } });
    req.on("error", reject);
  });
}

async function saveEnquiry(req, res) {
  if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
    return sendJson(res, 503, { ok: false, message: "Enquiry service is not configured yet." });
  }
  const ip = req.socket.remoteAddress || "unknown";
  const now = Date.now();
  if (now - (recentRequests.get(ip) || 0) < 3000) return sendJson(res, 429, { ok: false, message: "Please wait a moment and try again." });
  const input = await readBody(req);
  const { enquiry, errors } = validate(input);
  if (Object.keys(errors).length) return sendJson(res, 422, { ok: false, errors });
  recentRequests.set(ip, now);
  const record = { id: crypto.randomUUID(), ...enquiry };
  const response = await fetch(`${SUPABASE_URL}/rest/v1/enquiries`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_SECRET_KEY,
      "Authorization": `Bearer ${SUPABASE_SECRET_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=minimal"
    },
    body: JSON.stringify(record)
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error("Supabase insert failed:", response.status, detail);
    throw new Error("Supabase insert failed");
  }
  sendJson(res, 201, { ok: true, id: record.id });
}

function serveFile(req, res, pathname) {
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const file = path.resolve(ROOT, relative);
  const publicFile = relative === "index.html" || relative.startsWith("images/") || relative.startsWith("catalogs/");
  if (!publicFile || !file.startsWith(ROOT + path.sep)) return sendJson(res, 404, { ok: false, message: "Not found" });
  fs.stat(file, (statError, stats) => {
    if (statError || !stats.isFile()) return sendJson(res, 404, { ok: false, message: "Not found" });
    res.writeHead(200, { "Content-Type": mime[path.extname(file).toLowerCase()] || "application/octet-stream", "X-Content-Type-Options": "nosniff" });
    if (req.method === "HEAD") return res.end();
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer(async (req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host || "localhost"}`).pathname;
  try {
    if (req.method === "GET" && pathname === "/api/health") return sendJson(res, 200, { ok: true, database: SUPABASE_URL ? "supabase" : "not-configured" });
    if (req.method === "POST" && pathname === "/api/enquiries") return await saveEnquiry(req, res);
    if (req.method === "GET" || req.method === "HEAD") return serveFile(req, res, pathname);
    sendJson(res, 405, { ok: false, message: "Method not allowed" });
  } catch (error) {
    console.error(error);
    sendJson(res, error.status || 500, { ok: false, message: error.status ? error.message : "Unable to save your request right now." });
  }
});

server.listen(PORT, HOST, () => console.log(`LAKNITE running at http://${HOST}:${PORT}`));
