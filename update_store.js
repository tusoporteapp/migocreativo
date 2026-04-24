const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'assets', 'img', 'tienda');
const dataFile = path.join(__dirname, 'tienda', 'data', 'designs.json');
const mappingFile = path.join(__dirname, 'tienda', 'data', 'name_mapping.json');

// Crear directorios si no existen
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}
if (!fs.existsSync(path.dirname(dataFile))) {
    fs.mkdirSync(path.dirname(dataFile), { recursive: true });
}

function updateStore() {
    console.log('Leyendo diseños en: ' + imgDir);
    
    // Cargar name_mapping.json si existe
    let nameMapping = {};
    if (fs.existsSync(mappingFile)) {
        try {
            nameMapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
            console.log(`Cargado name_mapping.json con ${Object.keys(nameMapping).length} entradas.`);
        } catch(e) {
            console.log('No se pudo cargar name_mapping.json, usando nombres por defecto.');
        }
    }
    
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
                // Buscar nombre en el mapeo
                const mapping = nameMapping[file] || {};
                let name = mapping.name || '';
                let tags = mapping.tags || '';
                
                // Si no hay nombre en el mapeo, generar uno del archivo
                if (!name) {
                    name = path.basename(file, ext);
                    name = name.replace(/[-_]/g, ' ');
                    name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                }

                designs.push({
                    id: index + 1,
                    name: name,
                    tags: tags,
                    image: `../assets/img/tienda/${file}`,
                    filename: file
                });
            }
        });

        fs.writeFile(dataFile, JSON.stringify(designs, null, 2), (err) => {
            if (err) {
                console.error('Error guardando designs.json:', err);
                return;
            }
            const namedCount = designs.filter(d => !d.name.startsWith('InShot')).length;
            console.log(`¡Éxito! ${designs.length} diseños guardados. (${namedCount} con nombre personalizado, ${designs.length - namedCount} pendientes).`);
        });
    });
}

updateStore();
