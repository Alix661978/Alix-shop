const fs = require('fs');
const path = require('path');
const includesDir = path.join(__dirname, 'includes');
const pagesDir    = path.join(__dirname, 'pages');
const distDir     = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);
const includes = {};
fs.readdirSync(includesDir).forEach(f => {
  const key = path.basename(f, '.html');
  includes[key] = fs.readFileSync(path.join(includesDir, f), 'utf8');
});
fs.readdirSync(pagesDir).forEach(file => {
  if (path.extname(file) !== '.html') return;
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  Object.entries(includes).forEach(([key, html]) => {
    content = content.replace(new RegExp(`<!-- include:${key} -->`, 'g'), html);
  });
  fs.writeFileSync(path.join(distDir, file), content);
});
console.log('Build complete → dist/');