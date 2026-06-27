import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Haven API is running!" });
});

app.post("/api/cases/review", async (req, res) => {
  const { description } = req.body;
  // Mock AI agent deliberation
  const results = [
    { agent: "Triage Sentinel", action: "Assessed case urgency as Medium.", status: "completed" },
    { agent: "Risk Analytics", action: "No immediate physical risk. Mild psychosocial risk.", status: "completed" },
    { agent: "HR Advisory", action: "Recommended manager check-in and EAP referral.", status: "completed" }
  ];
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  res.json({
    success: true,
    results,
    memo: "Based on the assessment, please schedule a 1-on-1 with the employee and provide the EAP contact details."
  });
});

// Serve the Vite App
async function startServer() {
  if (process.env.VERCEL) {
    // On Vercel: static files are served by Vercel's CDN from dist/; Express handles API only.
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use(async (req, res, next) => {
      if (req.method !== 'GET' || req.originalUrl.startsWith("/api")) return next();
      try {
        const fs = await import("fs");
        const htmlPath = path.join(process.cwd(), "index.html");
        let html = fs.readFileSync(htmlPath, "utf-8");
        html = await vite.transformIndexHtml(req.originalUrl, html);
        res.status(200).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        console.error("Error serving index.html:", e);
        res.status(500).end("Internal Server Error");
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.method !== 'GET' || req.originalUrl.startsWith("/api")) return next();
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Haven Server running on http://localhost:${PORT}`);
  });
}

startServer();

export default app;
