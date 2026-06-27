// server.ts
import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
var app = express();
app.use(express.json());
var PORT = process.env.PORT || 3e3;
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Haven API is running!" });
});
app.post("/api/cases/review", async (req, res) => {
  const { description } = req.body;
  const results = [
    { agent: "Triage Sentinel", action: "Assessed case urgency as Medium.", status: "completed" },
    { agent: "Risk Analytics", action: "No immediate physical risk. Mild psychosocial risk.", status: "completed" },
    { agent: "HR Advisory", action: "Recommended manager check-in and EAP referral.", status: "completed" }
  ];
  await new Promise((resolve) => setTimeout(resolve, 1500));
  res.json({
    success: true,
    results,
    memo: "Based on the assessment, please schedule a 1-on-1 with the employee and provide the EAP contact details."
  });
});
async function startServer() {
  if (process.env.VERCEL) {
    return;
  }
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom"
    });
    app.get("/", async (req, res) => {
      try {
        const fs = await import("fs");
        const htmlPath = path.join(process.cwd(), "index.html");
        const html = fs.readFileSync(htmlPath, "utf-8");
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        console.error("Error serving index.html:", e);
        res.status(500).end("Internal Server Error");
      }
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Haven Server running on http://localhost:${PORT}`);
  });
}
startServer();
var server_default = app;
export {
  server_default as default
};
