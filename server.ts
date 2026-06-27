import express from "express";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

// In-memory database for the demo
let cases: any[] = [
  {
    id: "case-2026-001",
    title: "Finance Dept: Sudden Absenteeism & Psychological Safety",
    department: "Finance",
    category: "Psychosocial Risk / Conflict Resolution",
    severity: "elevated",
    status: "sign-off",
    riskProfile: { systemic: 42, bullying: 28, fatigue: 20, physical: 10 }
  },
  {
    id: "case-2026-002",
    title: "Support Operations: Overwhelming Emotional Distress",
    department: "Customer Operations",
    category: "Occupational Health / Burnout Mitigation",
    severity: "moderate",
    status: "sign-off",
    riskProfile: { systemic: 35, bullying: 15, fatigue: 60, physical: 5 }
  }
];

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/cases", (req, res) => {
  res.json(cases);
});

app.post("/api/cases", async (req, res) => {
  const { description } = req.body;
  
  // Simulate AI agent deliberation based on description length/keywords
  const isUrgent = description.toLowerCase().includes('urgent') || description.toLowerCase().includes('danger');
  
  const newCase = {
    id: `case-2026-00${cases.length + 1}`,
    title: description.substring(0, 50) + (description.length > 50 ? '...' : ''),
    department: "General",
    category: isUrgent ? "Immediate Safety Threat" : "General Wellbeing Concern",
    severity: isUrgent ? "critical" : "moderate",
    status: "triage",
    riskProfile: {
      systemic: Math.floor(Math.random() * 50),
      bullying: Math.floor(Math.random() * 50),
      fatigue: Math.floor(Math.random() * 50),
      physical: isUrgent ? 80 : Math.floor(Math.random() * 30),
    }
  };

  cases.unshift(newCase);
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  res.json({ success: true, case: newCase });
});

// Serve the Vite App
async function startServer() {
  if (process.env.VERCEL) {
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
