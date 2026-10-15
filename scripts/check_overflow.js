const http = require('http');

http.get('http://localhost:3000/jadwal-dokter', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Page length:', data.length);
  });
});
