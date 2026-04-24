const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\migue\\.gemini\\antigravity\\brain\\6165cc21-a1d8-47d7-81ed-8ea5a9f2e2fc';
const destDir = 'C:\\Users\\migue\\OneDrive\\Documentos\\GitHub\\migocreativo\\assets\\img\\tienda';

// Eliminar archivos anteriores
const oldFiles = fs.readdirSync(destDir);
oldFiles.forEach(file => fs.unlinkSync(path.join(destDir, file)));

// Copiar nuevos
const files = fs.readdirSync(sourceDir);
files.forEach(file => {
    if (file.endsWith('.png') && (file.startsWith('leon') || file.startsWith('calavera') || file.startsWith('flores'))) {
        let destName = file.split('_1')[0] + '.png'; // Clean name
        fs.copyFileSync(path.join(sourceDir, file), path.join(destDir, destName));
        console.log(`Copiado: ${destName}`);
    }
});

require('./update_store.js');
