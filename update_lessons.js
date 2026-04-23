const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'academia');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'glosario.html');

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace migobot script inclusion to include academia-progress first
    if (!content.includes('academia-progress.js')) {
        content = content.replace(
            '<script src="../assets/js/migobot.js"></script>',
            '<script src="../assets/js/academia-progress.js"></script>\n    <script src="../assets/js/migobot.js"></script>'
        );
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    }
}
