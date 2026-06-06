const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

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
};

const ADMIN_USERS = [
  { username: 'Oracle', password: 'Emre16' },
  { username: 'Keymaker', password: 'Yasin55' },
  { username: 'Architect', password: 'Mehmet20' }
];

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // API to authenticate admin
  if (req.method === 'POST' && req.url === '/api/login') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const isValidUser = ADMIN_USERS.some(u => u.username === data.username && u.password === data.password);
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

  // Serve static assets (Vite compiled assets or images/videos)
  if (req.url.startsWith('/assets/')) {
    let filePath = decodeURIComponent(req.url.split('?')[0]);
    const extname = String(path.extname(filePath)).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    let absPath;
    // Images and videos are in the root /assets directory
    if (filePath.startsWith('/assets/images/') || filePath.startsWith('/assets/videos/')) {
      absPath = path.join(__dirname, filePath);
    } else {
      // Vite compiled JS/CSS assets are in /frontend/dist/assets/
      absPath = path.join(__dirname, 'frontend', 'dist', filePath);
    }
    
    fs.readFile(absPath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
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
    
    fs.readFile(absPath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`=========================================`);
});
