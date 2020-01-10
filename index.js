const fs = require('fs');
const http = require('http');

// Secret info
const secretPath = '/secret';
const secretFile = './secret.txt';

const now = () => new Date().toISOString();

const server = http.createServer((req, res) => {
  console.log(now(), req.url);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  if(req.url !== secretPath) {
    res.write(`You accessed [${req.url}]`);
    return res.end();
  }
  
  try {
    // Read the secret file, then remove it.
    const secretResponse = fs.readFileSync(secretFile, 'utf8');
    fs.unlinkSync(secretFile);
    
    console.log(now(), 'First access!');
    res.write(secretResponse);
    return res.end();
  }
  catch(_error) {
    // Cannot read (file does not exists) or cannot remove
    console.log(now(), 'Already accessed');
    res.write('Already accessed.');
    return res.end();
  }
});

server.listen(process.env.PORT || process.argv[2] || 8080, () => {
  console.log(now(), `Server started on ${server.address().port}`);
});
