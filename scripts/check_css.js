const http = require('http');

http.get('http://localhost:3000/jadwal-dokter', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    const match = html.match(/href="([^"]+\.css)"/);
    if (!match) {
      console.log('No CSS link found');
      return;
    }
    const cssPath = match[1];
    http.get('http://localhost:3000' + cssPath, (cRes) => {
      let css = '';
      cRes.on('data', c => css += c);
      cRes.on('end', () => {
        console.log('CSS length:', css.length);
        console.log('Includes .hidden:', css.includes('.hidden'));
        console.log('Includes @media (min-width: 48rem):', css.includes('48rem') || css.includes('768px'));
      });
    });
  });
});
