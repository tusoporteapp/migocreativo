const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory() && file !== '.git' && file !== 'assets') {
            processDir(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Remove the nav item
            const navItemRegex = /<li class="nav-item"><a class="nav-link" href="#" id="mc-theme-toggle">☀️ Modo Claro<\/a><\/li>\r?\n?/g;
            if (navItemRegex.test(content)) {
                content = content.replace(navItemRegex, '');
                modified = true;
            }

            // Remove the script tag
            const scriptRegex1 = /<script src="assets\/js\/theme-toggle\.js"><\/script>\r?\n?/g;
            if (scriptRegex1.test(content)) {
                content = content.replace(scriptRegex1, '');
                modified = true;
            }
            
            const scriptRegex2 = /<script src="\.\.\/assets\/js\/theme-toggle\.js"><\/script>\r?\n?/g;
            if (scriptRegex2.test(content)) {
                content = content.replace(scriptRegex2, '');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Removed theme toggle from ${fullPath}`);
            }
        }
    }
}

processDir(__dirname);

// Delete the js file
const jsFile = path.join(__dirname, 'assets', 'js', 'theme-toggle.js');
if (fs.existsSync(jsFile)) {
    fs.unlinkSync(jsFile);
    console.log('Deleted theme-toggle.js');
}
