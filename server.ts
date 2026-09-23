import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const targetPort = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Health check endpoint for Cloud Run
app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Serve static assets from Vite build
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback all SPA routes to index.html
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const startServer = (port: number) => {
  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE' && port !== 3000) {
      console.warn(`Port ${port} is in use, attempting fallback to port 3000...`);
      startServer(3000);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(targetPort);
