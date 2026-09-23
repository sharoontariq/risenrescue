// server.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var targetPort = parseInt(process.env.PORT || "3000", 10);
app.use(express.json());
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});
var distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));
app.get("*", (_req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});
var startServer = (port) => {
  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
  server.on("error", (err) => {
    if (err.code === "EADDRINUSE" && port !== 3e3) {
      console.warn(`Port ${port} is in use, attempting fallback to port 3000...`);
      startServer(3e3);
    } else {
      console.error("Server error:", err);
    }
  });
};
startServer(targetPort);
