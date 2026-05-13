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
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // API to save products
  if (req.method === 'POST' && req.url === '/api/save') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        // We write the Javascript file in the exact same format
        const jsContent = `const productsData = ${JSON.stringify(data, null, 2)};\n`;
        fs.writeFileSync(path.join(__dirname, 'js', 'products.js'), jsContent, 'utf8');
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

  // API to upload files (images/videos)
  if (req.method === 'POST' && req.url === '/api/upload') {
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
      res.end(JSON.stringify({ success: true, path: `assets/${fileType}/${filename}` }));
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

  // Static file routing
  let filePath = req.url === '/' ? '/index.html' : req.url;
  // Remove query strings like ?id=sokak
  filePath = filePath.split('?')[0];
  
  const extname = String(path.extname(filePath)).toLowerCase();
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  const absPath = path.join(__dirname, filePath);
  
  fs.readFile(absPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Admin Panel: http://localhost:${PORT}/admin.html`);
  console.log(`=========================================`);
});
