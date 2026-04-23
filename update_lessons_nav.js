const fs = require('fs');
const path = require('path');

const lessons = [
    { id: 1, file: 'que-es-estampado-textil.html', title: '¿Qué es el estampado textil?' },
    { id: 2, file: 'resolucion-para-estampado.html', title: 'Resolución: ¿cuántos DPI necesitas?' },
    { id: 3, file: 'formatos-de-archivo.html', title: 'Formatos de archivo' },
    { id: 4, file: 'preparar-archivo-dtf.html', title: 'Preparar archivo para DTF' },
    { id: 5, file: 'separacion-colores-proceso-simulado.html', title: 'Proceso Simulado' },
    { id: 6, file: 'perfiles-icc-color-perfecto.html', title: 'Perfiles ICC' },
    { id: 7, file: 'calibracion-prensas-calor.html', title: 'Calibración de Prensas' },
    { id: 8, file: 'como-cotizar-servicios-estampado.html', title: 'Cómo Cotizar' }
];

const dir = path.join(__dirname, 'academia');

for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const prev = i > 0 ? lessons[i-1] : null;
    const next = i < lessons.length - 1 ? lessons[i+1] : null;
    
    let navHtml = '\n        <div class="d-flex justify-content-between mt-5 pt-4 border-top" style="border-color: var(--mc-glass-border) !important;">\n';
    
    if (prev) {
        navHtml += `            <a href="${prev.file}" class="text-decoration-none" style="max-width: 45%;"><small class="text-muted d-block mb-1">← Lección Anterior</small><span style="color:var(--mc-orange);font-weight:600;">${prev.title}</span></a>\n`;
    } else {
        navHtml += `            <div></div>\n`; // Empty div for flexbox spacing
    }
    
    if (next) {
        navHtml += `            <a href="${next.file}" class="text-decoration-none text-end" style="max-width: 45%;"><small class="text-muted d-block mb-1">Siguiente Lección →</small><span style="color:var(--mc-orange);font-weight:600;">${next.title}</span></a>\n`;
    } else {
         navHtml += `            <a href="index.html" class="text-decoration-none text-end" style="max-width: 45%;"><small class="text-muted d-block mb-1">¡Has terminado! 🎉</small><span style="color:var(--mc-orange);font-weight:600;">Volver al inicio</span></a>\n`;
    }
    
    navHtml += '        </div>\n';
    
    const filePath = path.join(dir, lesson.file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Inject before the author box
    if (!content.includes('Lección Anterior') && !content.includes('Siguiente Lección')) {
        content = content.replace('<div class="mc-post-author-box">', navHtml + '        <div class="mc-post-author-box">');
        fs.writeFileSync(filePath, content);
        console.log(`Nav added to ${lesson.file}`);
    }
}
