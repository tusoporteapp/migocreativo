const fs = require('fs');
const path = require('path');

const blogTopics = [
    { title: "Cómo resolver el banding en impresoras DTF", tag: "DTF", date: "Abr 23, 2026" },
    { title: "Estrategias de precios para talleres de serigrafía", tag: "Negocios", date: "Abr 22, 2026" },
    { title: "Mantenimiento preventivo de planchas térmicas", tag: "Equipos", date: "Abr 21, 2026" },
    { title: "Tintas plastisol vs base agua: La guía definitiva", tag: "Serigrafía", date: "Abr 20, 2026" },
    { title: "Secretos para sublimar tazas sin manchas", tag: "Sublimación", date: "Abr 19, 2026" },
    { title: "Cómo elegir el mejor polvo poliamida para DTF", tag: "DTF", date: "Abr 18, 2026" },
    { title: "Técnicas de separación de color indexada", tag: "Diseño", date: "Abr 17, 2026" },
    { title: "Errores fatales al curar tintas plastisol", tag: "Serigrafía", date: "Abr 16, 2026" },
    { title: "Guía para sublimar en algodón (Técnicas alternativas)", tag: "Sublimación", date: "Abr 15, 2026" },
    { title: "El futuro del DTF UV en merchandising", tag: "Tendencias", date: "Abr 14, 2026" },
    { title: "Cómo vectorizar imágenes borrosas rápido", tag: "Diseño", date: "Abr 13, 2026" },
    { title: "Resolución ideal para estampados de gran formato", tag: "Diseño", date: "Abr 12, 2026" },
    { title: "Cómo evitar la migración de color en poliéster", tag: "Serigrafía", date: "Abr 11, 2026" },
    { title: "Rentabilidad: ¿DTF o DTG?", tag: "Negocios", date: "Abr 10, 2026" },
    { title: "Mejores marcas de papel de sublimación", tag: "Materiales", date: "Abr 09, 2026" },
    { title: "Cuatricromía en serigrafía: Consejos de oro", tag: "Serigrafía", date: "Abr 08, 2026" },
    { title: "Cómo limpiar cabezales Epson para DTF", tag: "Mantenimiento", date: "Abr 07, 2026" },
    { title: "El impacto de la humedad en el polvo DTF", tag: "DTF", date: "Abr 06, 2026" },
    { title: "Diseñando para serigrafía con Illustrator", tag: "Diseño", date: "Abr 05, 2026" },
    { title: "Perfiles ICC: Por qué tus colores salen opacos", tag: "Color", date: "Abr 04, 2026" },
    { title: "Sublimación 3D en carcasas de celular", tag: "Sublimación", date: "Abr 03, 2026" },
    { title: "Vinilo Textil vs DTF: ¿Cuál gana en 2026?", tag: "Comparativa", date: "Abr 02, 2026" },
    { title: "Tensionado correcto de mallas de serigrafía", tag: "Serigrafía", date: "Abr 01, 2026" },
    { title: "Cómo calcular mermas y desperdicios", tag: "Negocios", date: "Mar 31, 2026" },
    { title: "Tintas de descarga (Discharge) para principiantes", tag: "Serigrafía", date: "Mar 30, 2026" },
    { title: "Personalización de gorras: Técnicas y trucos", tag: "Técnicas", date: "Mar 29, 2026" },
    { title: "Qué hacer si tu impresora DTF no imprime blanco", tag: "DTF", date: "Mar 28, 2026" },
    { title: "Cómo crear mockups realistas para clientes", tag: "Diseño", date: "Mar 27, 2026" },
    { title: "Marketing en redes sociales para tu taller textil", tag: "Marketing", date: "Mar 26, 2026" },
    { title: "Seguridad laboral en talleres de serigrafía", tag: "Seguridad", date: "Mar 25, 2026" }
];

const academyTopics = [
    { num: 9, level: "basico", title: "Entendiendo las resoluciones (DPI vs PPI)" },
    { num: 10, level: "basico", title: "Tipografías ideales para estampar" },
    { num: 11, level: "basico", title: "Manejo de capas en Photoshop" },
    { num: 12, level: "basico", title: "Uso de la herramienta pluma en Illustrator" },
    { num: 13, level: "basico", title: "Formatos de exportación explicados" },
    { num: 14, level: "basico", title: "Diferencia entre mapa de bits y vector" },
    { num: 15, level: "basico", title: "Ajustes básicos de brillo y contraste" },
    { num: 16, level: "basico", title: "Cómo recortar fondos complejos" },
    { num: 17, level: "intermedio", title: "Separación de color CMYK en Photoshop" },
    { num: 18, level: "intermedio", title: "Creación de bases blancas para DTF" },
    { num: 19, level: "intermedio", title: "Ajuste de niveles y curvas para imprimir" },
    { num: 20, level: "intermedio", title: "Cómo eliminar fondos con canales" },
    { num: 21, level: "intermedio", title: "Simulación de colores Pantone" },
    { num: 22, level: "intermedio", title: "Creación de tramas de semitonos" },
    { num: 23, level: "intermedio", title: "Lineaturas e inclinación de ángulos" },
    { num: 24, level: "intermedio", title: "Optimización de sombras para DTF" },
    { num: 25, level: "intermedio", title: "Cómo manejar gradientes en serigrafía" },
    { num: 26, level: "intermedio", title: "Corrección selectiva de color" },
    { num: 27, level: "avanzado", title: "Separación indexada de 8 canales" },
    { num: 28, level: "avanzado", title: "Proceso simulado para telas oscuras" },
    { num: 29, level: "avanzado", title: "Calibración de monitores para sublimación" },
    { num: 30, level: "avanzado", title: "Creación de perfiles ICC personalizados" },
    { num: 31, level: "avanzado", title: "Automatización con Acciones de Photoshop" },
    { num: 32, level: "avanzado", title: "Separación de color con canales alfa" },
    { num: 33, level: "avanzado", title: "Manejo avanzado de reventes (Trapping)" },
    { num: 34, level: "avanzado", title: "Técnicas de cuatricromía de alta definición" },
    { num: 35, level: "avanzado", title: "Efectos especiales: Foil, relieve y discharge" },
    { num: 36, level: "avanzado", title: "Optimización de archivos para corte láser" },
    { num: 37, level: "avanzado", title: "Flujo de trabajo para grandes producciones" },
    { num: 38, level: "avanzado", title: "Resolución de problemas de moiré" }
];

function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

function generateBody(title) {
    return `
        <p>En el mundo del estampado textil, dominar las técnicas adecuadas puede significar la diferencia entre un trabajo amateur y un resultado profesional de alta gama. El tema de <strong>${title}</strong> es crítico para asegurar que cada prenda o sustrato cumpla con las más altas exigencias de calidad del mercado.</p>
        
        <h3>1. Entendiendo los fundamentos</h3>
        <p>Para abordar correctamente este desafío, primero debemos entender cómo interactúan los materiales. Tanto si trabajas con serigrafía tradicional, como si te has actualizado al DTF o la sublimación, los principios de la física de tintas y transferencia de calor aplican. Ajustar la presión, el tiempo de curado y la temperatura de forma precisa evita que los polímeros sufran una degradación térmica prematura, un error muy común en talleres inexpertos.</p>

        <div class="mc-highlight-box">
            <p><strong>🔥 Consejo de experto:</strong> Nunca confíes ciegamente en los valores predeterminados de fábrica. Realiza siempre pruebas de lavado con muestras reales, ya que la humedad relativa de tu taller altera drásticamente los tiempos de secado y curado.</p>
        </div>

        <h3>2. Mejores Prácticas y Técnicas</h3>
        <p>A lo largo de mis años de experiencia en Migo Creativo, he comprobado que estandarizar tu flujo de trabajo reduce las mermas hasta en un 40%. A continuación, las claves esenciales:</p>
        <ul>
            <li><strong>Control Ambiental:</strong> Mantén tu área de trabajo libre de polvo y con humedad controlada (ideal entre 40% y 60%).</li>
            <li><strong>Calibración Periódica:</strong> Utiliza termómetros láser o pirómetros para verificar que tu plancha térmica entregue calor uniforme en toda la platina.</li>
            <li><strong>Preparación de Archivos:</strong> Verifica siempre que los diseños estén en el espacio de color adecuado (CMYK para impresión, RGB para monitoreo) y en la resolución de 300 DPI.</li>
            <li><strong>Mantenimiento Preventivo:</strong> Limpia rieles, cabezales y mallas después de cada jornada intensiva de producción.</li>
        </ul>

        <h3>3. Solución a problemas comunes</h3>
        <p>Es muy probable que en algún momento te enfrentes a migraciones de color o pérdida de adherencia. Esto suele suceder cuando la tela de poliéster supera su punto de gasificación (aprox. 160°C). Para evitar que los tintes originales de la prenda manchen tu estampado (especialmente con plastisol blanco o tinta DTF), debes utilizar bases bloqueadoras de migración o reducir agresivamente la temperatura de planchado aumentando ligeramente el tiempo.</p>

        <h3>Conclusión</h3>
        <p>Implementar las técnicas correctas para <strong>${title}</strong> te permitirá elevar la calidad de tus entregas y fidelizar a clientes exigentes. Recuerda que la inversión en educación y optimización técnica siempre se recupera con creces mediante la reducción de errores y el aumento de la productividad en tu taller.</p>
    `;
}

function generateHTML(title, slug, type, extraData) {
    const isBlog = type === 'blog';
    const folderPath = isBlog ? '../' : '../';
    
    let metaSection = '';
    if (isBlog) {
        metaSection = `<div class="mc-post-meta">
            <span class="mc-post-tag">${extraData.tag}</span>
            <span>📅 ${extraData.date}</span>
            <span>⏱️ 5 min de lectura</span>
        </div>`;
    } else {
        const bg = extraData.level === 'basico' ? 'rgba(34, 197, 94, 0.2)' : extraData.level === 'intermedio' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        const col = extraData.level === 'basico' ? '#4ade80' : extraData.level === 'intermedio' ? '#facc15' : '#f87171';
        const txt = extraData.level === 'basico' ? '🟢 Básico' : extraData.level === 'intermedio' ? '🟡 Intermedio' : '🔴 Avanzado';
        
        metaSection = `<div class="mc-post-meta">
            <span style="background: ${bg}; color: ${col}; padding: 4px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${txt}</span>
            <span style="color: var(--mc-text-muted); font-weight: 600;">Lección ${extraData.num}</span>
        </div>`;
    }

    return `<!DOCTYPE html>
<html data-bs-theme="dark" lang="es-419">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>${title} | Migo Creativo</title>
    <meta name="description" content="Aprende sobre ${title} con las guías detalladas de Migo Creativo.">
    <link rel="icon" type="image/jpeg" href="../assets/img/LOGO/LOGO NUEVO.jpg">
    <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="../assets/css/bss-overrides.css">
    <style>
        .mc-post-header { padding-top: 120px; }
        .mc-post-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 2rem; }
        .mc-post-tag { padding: 4px 14px; background: var(--mc-gradient-soft); border: 1px solid var(--mc-glass-border); border-radius: 100px; font-size: 0.75rem; font-weight: 600; color: var(--mc-orange-light); text-transform: uppercase; }
        .mc-post-body { max-width: 780px; margin: 0 auto; }
        .mc-post-body h2 { font-size: 1.75rem; margin-top: 3rem; margin-bottom: 1rem; border-bottom: 2px solid var(--mc-glass-border); padding-bottom: 0.5rem; }
        .mc-post-body h3 { font-size: 1.3rem; margin-top: 2rem; margin-bottom: 0.75rem; color: var(--mc-orange-light); }
        .mc-post-body p { color: var(--mc-text-muted); font-size: 1.05rem; line-height: 1.85; margin-bottom: 1.25rem; }
        .mc-post-body ul { color: var(--mc-text-muted); font-size: 1.05rem; line-height: 1.85; margin-bottom: 1.5rem; }
        .mc-highlight-box { background: var(--mc-gradient-soft); border-left: 4px solid var(--mc-orange); padding: 1.5rem; margin: 2rem 0; border-radius: var(--mc-radius-sm); }
        .mc-post-author-box { background: var(--mc-bg-card); border: 1px solid var(--mc-glass-border); border-radius: var(--mc-radius); padding: 2rem; display: flex; align-items: center; gap: 1.5rem; margin-top: 3rem; }
        .mc-post-author-box img { width: 80px; height: 80px; border-radius: 50%; border: 3px solid var(--mc-orange); object-fit: cover; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark" id="mainNav">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="../index.html">
                <img class="rounded-circle" width="40" height="40" src="../assets/img/LOGO/LOGO NUEVO.jpg" alt="Migo Creativo Logo">
                <span>MIGOCREATIVO</span>
            </a>
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navcol-1"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="../index.html">Inicio</a></li>
                    <li class="nav-item"><a class="nav-link ${!isBlog ? 'active' : ''}" href="../academia/index.html">Academia</a></li>
                    <li class="nav-item"><a class="nav-link ${isBlog ? 'active' : ''}" href="../blog/index.html">Blog</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="mc-post-header pb-5" style="background: var(--mc-bg-deep); border-bottom: 1px solid var(--mc-glass-border);">
        <div class="container text-center">
            ${metaSection}
            <h1 style="font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; max-width: 900px; margin-left: auto; margin-right: auto;">${title}</h1>
        </div>
    </header>

    <section class="py-5" style="background: var(--mc-bg-surface);">
        <div class="container">
            <div class="mc-post-body mc-reveal">
                ${generateBody(title)}
                
                <div class="mc-post-author-box">
                    <img src="../assets/img/LOGO/LOGO NUEVO.jpg" alt="Miguel Heredia">
                    <div>
                        <h4 style="margin-bottom: 0.25rem;">Miguel Heredia</h4>
                        <p style="margin-bottom: 0;">Diseñador experto en serigrafía, DTF y sublimación. CEO de Migo Creativo en Bogotá, Colombia.</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <a href="${isBlog ? 'index.html' : 'index.html'}" class="mc-btn-primary">← Volver al ${isBlog ? 'Blog' : 'Academia'}</a>
            </div>
        </div>
    </section>

    <footer class="mc-footer"><div class="container py-4"><div class="mc-footer-bottom text-center"><p class="mb-0">© 2026 Migo Creativo | Hecho con ❤️ en Colombia</p></div></div></footer>
    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
    ${!isBlog ? '<script src="../assets/js/academia-progress.js"></script>' : ''}
    <script src="../assets/js/migobot.js"></script>
    <script>
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.mc-reveal').forEach(el => observer.observe(el));
    </script>
</body>
</html>`;
}

// Ensure directories exist
const blogDir = path.join(__dirname, 'blog');
const academyDir = path.join(__dirname, 'academia');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);
if (!fs.existsSync(academyDir)) fs.mkdirSync(academyDir);

// Generate Blog Posts
let blogGridHtml = '';
blogTopics.forEach((topic, idx) => {
    const slug = toSlug(topic.title) + '.html';
    const filePath = path.join(blogDir, slug);
    fs.writeFileSync(filePath, generateHTML(topic.title, slug, 'blog', topic));
    
    // Add to grid
    blogGridHtml += `
                <div class="col-md-6 col-lg-4 blog-item mc-reveal">
                    <a href="${slug}" class="text-decoration-none">
                        <div class="mc-blog-card">
                            <div class="mc-blog-content">
                                <span class="mc-blog-tag">${topic.tag}</span>
                                <h2 class="mc-blog-title" style="font-size: 1.15rem;">${topic.title}</h2>
                                <p class="mc-blog-excerpt" style="font-size: 0.9rem;">Guía técnica detallada sobre mejores prácticas y optimización para tu taller textil.</p>
                                <div class="mc-blog-meta">
                                    <div class="mc-blog-author">
                                        <img src="../assets/img/LOGO/LOGO NUEVO.jpg" alt="Miguel Heredia">
                                        <span style="color: var(--mc-text-muted); font-size: 0.85rem; font-weight: 500;">Miguel Heredia</span>
                                    </div>
                                    <span class="mc-blog-date">${topic.date}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>`;
});

// Update blog/index.html
const blogIndex = path.join(blogDir, 'index.html');
let bContent = fs.readFileSync(blogIndex, 'utf8');
const bRegex = /(<div class="row g-4" id="blog-grid">)[\s\S]*?(<\/div>\s*<div id="no-results")/;
bContent = bContent.replace(bRegex, `$1\n${blogGridHtml}\n$2`);
fs.writeFileSync(blogIndex, bContent);

// Generate Academy Lessons
let academyGridHtml = '';
academyTopics.forEach((topic, idx) => {
    const slug = toSlug(topic.title) + '.html';
    const filePath = path.join(academyDir, slug);
    fs.writeFileSync(filePath, generateHTML(topic.title, slug, 'academy', topic));
    
    // Add to grid
    const lvlText = topic.level === 'basico' ? '🟢 Básico' : topic.level === 'intermedio' ? '🟡 Intermedio' : '🔴 Avanzado';
    academyGridHtml += `
                <div class="col-md-6 col-lg-4 mc-reveal lesson-item" data-level="${topic.level}">
                    <a href="${slug}" class="text-decoration-none" data-lesson-id="${topic.num}">
                        <div class="mc-lesson-card">
                            <div class="mc-completed-check">✓</div>
                            <div class="d-flex gap-2 align-items-center"><span class="mc-level-badge mc-level-${topic.level}">${lvlText}</span><span class="mc-lesson-num">Lección ${topic.num}</span></div>
                            <h3 style="font-size: 1.15rem;">${topic.title}</h3>
                            <p style="font-size: 0.9rem;">Domina esta técnica paso a paso para elevar la calidad de tus estampados.</p>
                        </div>
                    </a>
                </div>`;
});

// Update academia/index.html
const academyIndex = path.join(academyDir, 'index.html');
let aContent = fs.readFileSync(academyIndex, 'utf8');
// For academy we append to the existing lessons-grid.
const aRegex = /(<div class="row g-4" id="lessons-grid">[\s\S]*?)(<\/div>\s*<\/div>\s*<\/section>)/;
aContent = aContent.replace(aRegex, `$1\n${academyGridHtml}\n$2`);
// Update the progress bar max to 38
aContent = aContent.replace(/0\/8 Lecciones/g, '0/38 Lecciones');
fs.writeFileSync(academyIndex, aContent);

console.log("Generación Masiva Completada: 30 Posts de Blog y 30 Lecciones de Academia creadas con éxito.");
