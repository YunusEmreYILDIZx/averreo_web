const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = 8080;

// Admin users are loaded from the ADMIN_USERS env var (see /etc/averreo/averreo.env).
// Format: JSON array of { username, salt, hash } where hash = scrypt(password, salt, 64) hex.
// Never store plaintext credentials in code.
function loadAdminUsers() {
  try {
    return JSON.parse(process.env.ADMIN_USERS || '[]');
  } catch (e) {
    console.error('Invalid ADMIN_USERS env var:', e.message);
    return [];
  }
}

function verifyCredentials(username, password) {
  const user = loadAdminUsers().find(u => u.username === username);
  if (!user) return false;
  let derived;
  try {
    derived = crypto.scryptSync(password, user.salt, 64);
  } catch {
    return false;
  }
  const expected = Buffer.from(user.hash, 'hex');
  return derived.length === expected.length && crypto.timingSafeEqual(derived, expected);
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.ogg': 'video/ogg',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // API to authenticate admin
  if (req.method === 'POST' && req.url === '/api/login') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const isValidUser = verifyCredentials(data.username, data.password);
        if (isValidUser) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, token: 'fake-jwt-token' }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Geçersiz kullanıcı adı veya şifre' }));
        }
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // Helper function to check auth
  const checkAuth = (headers) => {
    const auth = headers['authorization'];
    return auth === 'Bearer fake-jwt-token';
  };

  // API to get products
  if (req.method === 'GET' && req.url === '/api/products') {
    fs.readFile(path.join(__dirname, 'data', 'products.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
    return;
  }

  // API to handle contact form submissions (Mock)
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('Received contact submission:', data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Message sent successfully' }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API to get company data
  if (req.method === 'GET' && req.url === '/api/company') {
    fs.readFile(path.join(__dirname, 'data', 'company.json'), 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
    return;
  }

  // API to save products
  if (req.method === 'POST' && req.url === '/api/save') {
    if (!checkAuth(req.headers)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized' }));
      return;
    }
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        fs.writeFileSync(path.join(__dirname, 'data', 'products.json'), JSON.stringify(data, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        console.error("Save error:", e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API to save company data
  if (req.method === 'POST' && req.url === '/api/save-company') {
    if (!checkAuth(req.headers)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized' }));
      return;
    }
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        fs.writeFileSync(path.join(__dirname, 'data', 'company.json'), JSON.stringify(data, null, 2), 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        console.error("Save company error:", e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API to submit contact form messages (saves to data/messages.json & sends email if SMTP is set)
  if (req.method === 'POST' && req.url === '/api/contact') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        const newMsg = {
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
          name: data.name,
          email: data.email,
          subject: data.subject || 'Yeni İletişim Formu Mesajı',
          message: data.message,
          recipient: 'info@averreo.com.tr'
        };

        const messagesPath = path.join(__dirname, 'data', 'messages.json');
        let existing = [];
        try {
          if (fs.existsSync(messagesPath)) {
            existing = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));
          }
        } catch (err) {
          console.error("Reading messages.json error:", err);
        }
        existing.unshift(newMsg);
        fs.writeFileSync(messagesPath, JSON.stringify(existing, null, 2), 'utf8');

        console.log(`[CONTACT] New message from ${data.name} (${data.email}) to info@averreo.com.tr`);

        if (process.env.SMTP_HOST && process.env.SMTP_USER) {
          try {
            const nodemailer = require('nodemailer');
            const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: parseInt(process.env.SMTP_PORT || '587'),
              secure: process.env.SMTP_SECURE === 'true',
              auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
            });
            await transporter.sendMail({
              from: `"${data.name}" <${process.env.SMTP_USER}>`,
              replyTo: data.email,
              to: 'info@averreo.com.tr',
              subject: `[İletişim Formu] ${data.subject || data.name}`,
              text: `Ad Soyad: ${data.name}\nE-posta: ${data.email}\nKonu: ${data.subject}\n\nMesaj:\n${data.message}`
            });
          } catch (mailErr) {
            console.error("Failed sending email via SMTP:", mailErr);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Mesaj başarıyla iletildi.' }));
      } catch (e) {
        console.error("Contact API error:", e);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: e.message }));
      }
    });
    return;
  }

  // API to upload files (images/videos)
  if (req.method === 'POST' && req.url === '/api/upload') {
    if (!checkAuth(req.headers)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: 'Unauthorized' }));
      return;
    }
    const filename = decodeURIComponent(req.headers['x-file-name'] || 'upload.bin');
    const fileType = req.headers['x-file-type'] === 'video' ? 'videos' : 'images';
    
    // Create directory if not exists
    const dirPath = path.join(__dirname, 'assets', fileType);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const savePath = path.join(dirPath, filename);
    const writeStream = fs.createWriteStream(savePath);

    req.pipe(writeStream);

    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, path: `/assets/${fileType}/${filename}` }));
    });

    req.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    });

    writeStream.on('error', (err) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    });
    
    return;
  }

  const serveFileStreaming = (req, res, absPath, contentType, cacheControl) => {
    fs.stat(absPath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404);
        return res.end('404 Not Found');
      }

      const { size } = stats;
      const range = req.headers.range;

      // Only allow 206 Partial Content for video/audio streaming, not for HTML documents (which breaks WhatsApp crawler)
      const isMedia = contentType.startsWith('video/') || contentType.startsWith('audio/');

      if (range && isMedia) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(absPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
          'Cache-Control': cacheControl
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': size,
          'Content-Type': contentType,
          'Cache-Control': cacheControl
        };
        res.writeHead(200, head);
        fs.createReadStream(absPath).pipe(res);
      }
    });
  };

  // Serve static assets (Vite compiled assets or images/videos)
  if (req.url.startsWith('/assets/')) {
    let filePath = decodeURIComponent(req.url.split('?')[0]);
    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    let absPath;
    let cacheControl;
    // Images and videos are in the root /assets directory
    if (filePath.startsWith('/assets/images/') || filePath.startsWith('/assets/videos/')) {
      absPath = path.join(__dirname, filePath);
      // Fixed filenames (can be re-uploaded via admin), so cache for a day with revalidation.
      cacheControl = 'public, max-age=86400, stale-while-revalidate=604800';
    } else {
      // Vite compiled JS/CSS assets are in /frontend/dist/assets/
      absPath = path.join(__dirname, 'frontend', 'dist', filePath);
      // Content-hashed filenames, safe to cache immutably for a year.
      cacheControl = 'public, max-age=31536000, immutable';
    }

    serveFileStreaming(req, res, absPath, contentType, cacheControl);
    return;
  }

  // Static file routing from frontend/dist
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';
  
  let absPath = path.join(__dirname, 'frontend', 'dist', reqPath);
  
  // SPA routing: if file doesn't exist, serve index.html
  fs.stat(absPath, (err, stats) => {
    if (err || !stats.isFile()) {
      absPath = path.join(__dirname, 'frontend', 'dist', 'index.html');
    }
    
    const extname = String(path.extname(absPath)).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'text/html';
    const cacheHeader = extname === '.html' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=86400';
    
    serveFileStreaming(req, res, absPath, contentType, cacheHeader);
  });
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`=========================================`);
});
