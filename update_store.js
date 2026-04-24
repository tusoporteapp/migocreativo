const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'img', 'tienda');
const dataFile = path.join(__dirname, 'tienda', 'data', 'designs.json');

// Crear directorios si no existen
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}
if (!fs.existsSync(path.dirname(dataFile))) {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
}

function updateStore() {
    console.log('Leyendo diseños en: ' + imgDir);
    
    fs.readdir(imgDir, (err, files) => {
        if (err) {
            console.error('Error leyendo el directorio:', err);
            return;
        }

        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const designs = [];

        files.forEach((file, index) => {
            const ext = path.extname(file).toLowerCase();
            if (validExtensions.includes(ext)) {
                // Generar nombre legible: quitar extensión, reemplazar _, -, y capitalizar
                let name = path.basename(file, ext);
                name = name.replace(/[-_]/g, ' ');
                // Capitalizar cada palabra
                name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

                designs.push({
                    id: index + 1,
                    name: name,
                    image: `../assets/img/tienda/${file}`, // Ruta relativa desde tienda/index.html
                    filename: file
                });
            }
        });

        fs.writeFile(dataFile, JSON.stringify(designs, null, 2), (err) => {
            if (err) {
                console.error('Error guardando designs.json:', err);
                return;
            }
            console.log(`¡Éxito! Se han encontrado y guardado ${designs.length} diseños en la tienda.`);
        });
    });
}

updateStore();
