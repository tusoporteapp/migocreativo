const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

// 1. Update Navbar links
content = content.replace(
    '<li class="nav-item"><a class="nav-link" href="#academia">Academia</a></li>',
    '<li class="nav-item"><a class="nav-link" href="academia/index.html">Academia</a></li>'
);
content = content.replace(
    '<li class="nav-item"><a class="nav-link" href="#blog">Blog</a></li>',
    '<li class="nav-item"><a class="nav-link" href="blog/index.html">Blog</a></li>'
);
// Also update footer links if any
content = content.replace(
    '<li><a href="#academia">Academia</a></li>',
    '<li><a href="academia/index.html">Academia</a></li>'
);
content = content.replace(
    '<li><a href="#blog">Blog</a></li>',
    '<li><a href="blog/index.html">Blog</a></li>'
);

// 2. Rebuild Blog and Academia sections
const sectionsHtml = `
    <!-- Academia Section -->
    <section class="mc-services py-5" id="academia" style="background: var(--mc-bg-deep);">
        <div class="container py-5">
            <div class="text-center mc-reveal">
                <span class="mc-badge mb-3">🎓 Academia Gratuita</span>
                <h2 class="mc-section-title">Aprende <span class="mc-gradient-text">Estampado Textil</span></h2>
                <p class="mc-section-subtitle">Las mejores lecciones 100% gratuitas para que domines la serigrafía, DTF y sublimación.</p>
            </div>
            <div class="row g-4 mt-4">
                <!-- LECCION 1 -->
                <div class="col-md-4 mc-reveal">
                    <a href="academia/que-es-estampado-textil.html" class="text-decoration-none">
                        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
                            <div class="d-flex gap-2 align-items-center mb-3">
                                <span class="mc-level-badge mc-level-basico" style="background: rgba(34, 197, 94, 0.2); color: #4ade80; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">🟢 Básico</span>
                                <span style="color: var(--mc-text-muted); font-size: 0.8rem; font-weight: 700;">Lección 1</span>
                            </div>
                            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading); margin-bottom: 10px;">¿Qué es el estampado textil?</h3>
                            <p style="font-size: 0.9rem; color: var(--mc-text-muted); margin-bottom: 15px;">Las 3 técnicas principales, cómo funcionan y cuál te conviene más para tu negocio.</p>
                            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Empezar lección →</span>
                        </div>
                    </a>
                </div>
                <!-- LECCION 2 -->
                <div class="col-md-4 mc-reveal mc-reveal-delay-1">
                    <a href="academia/conceptos-basicos-color.html" class="text-decoration-none">
                        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
                            <div class="d-flex gap-2 align-items-center mb-3">
                                <span class="mc-level-badge mc-level-basico" style="background: rgba(34, 197, 94, 0.2); color: #4ade80; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">🟢 Básico</span>
                                <span style="color: var(--mc-text-muted); font-size: 0.8rem; font-weight: 700;">Lección 2</span>
                            </div>
                            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading); margin-bottom: 10px;">Conceptos Básicos de Color (CMYK vs RGB)</h3>
                            <p style="font-size: 0.9rem; color: var(--mc-text-muted); margin-bottom: 15px;">Por qué los colores cambian al imprimir y cómo evitar estampados oscuros.</p>
                            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Empezar lección →</span>
                        </div>
                    </a>
                </div>
                <!-- LECCION 3 -->
                <div class="col-md-4 mc-reveal mc-reveal-delay-2">
                    <a href="academia/resolucion-dpi-importancia.html" class="text-decoration-none">
                        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
                            <div class="d-flex gap-2 align-items-center mb-3">
                                <span class="mc-level-badge mc-level-basico" style="background: rgba(34, 197, 94, 0.2); color: #4ade80; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;">🟢 Básico</span>
                                <span style="color: var(--mc-text-muted); font-size: 0.8rem; font-weight: 700;">Lección 3</span>
                            </div>
                            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading); margin-bottom: 10px;">Resolución y DPI: Por qué son vitales</h3>
                            <p style="font-size: 0.9rem; color: var(--mc-text-muted); margin-bottom: 15px;">Descubre por qué una imagen borrosa arruina tu trabajo y cómo solucionarlo.</p>
                            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Empezar lección →</span>
                        </div>
                    </a>
                </div>
            </div>
            <div class="text-center mt-5 mc-reveal">
                <a href="academia/index.html" class="mc-btn-primary">Ver todas las lecciones</a>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="mc-services py-5" id="blog">
        <div class="container py-5">
            <div class="text-center mc-reveal">
                <span class="mc-badge mb-3">📝 Últimas Noticias</span>
                <h2 class="mc-section-title">Blog de <span class="mc-gradient-text">MigoCreativo</span></h2>
                <p class="mc-section-subtitle">Artículos, guías y consejos avanzados para rentabilizar tu taller textil.</p>
            </div>
            <div class="row g-4 mt-4">
                <!-- POST 1 -->
                <div class="col-md-4 mc-reveal">
                    <a href="blog/diferencia-serigrafia-dtf-sublimacion.html" class="text-decoration-none">
                        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
                            <div class="d-flex gap-2 mb-3">
                                <span class="mc-post-tag" style="background: rgba(255, 122, 0, 0.15); color: #FF7A00; padding: 3px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700;">Guías</span>
                                <span style="color: var(--mc-text-muted); font-size: 0.8rem;">📅 Hoy</span>
                            </div>
                            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading); margin-bottom: 10px;">¿Cuál es la diferencia entre Serigrafía, DTF y Sublimación?</h3>
                            <p style="font-size: 0.9rem; color: var(--mc-text-muted); margin-bottom: 15px;">Una comparación técnica para saber cuándo usar cada técnica en tu taller.</p>
                            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Leer artículo →</span>
                        </div>
                    </a>
                </div>
                <!-- POST 2 -->
                <div class="col-md-4 mc-reveal mc-reveal-delay-1">
                    <a href="blog/como-preparar-archivo-dtf.html" class="text-decoration-none">
                        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
                            <div class="d-flex gap-2 mb-3">
                                <span class="mc-post-tag" style="background: rgba(255, 122, 0, 0.15); color: #FF7A00; padding: 3px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700;">Tutoriales</span>
                                <span style="color: var(--mc-text-muted); font-size: 0.8rem;">📅 Ayer</span>
                            </div>
                            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading); margin-bottom: 10px;">Cómo preparar un archivo perfecto para DTF</h3>
                            <p style="font-size: 0.9rem; color: var(--mc-text-muted); margin-bottom: 15px;">Evita bordes blancos y manchas de tinta aprendiendo a generar la base blanca correcta.</p>
                            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Leer artículo →</span>
                        </div>
                    </a>
                </div>
                <!-- POST 3 -->
                <div class="col-md-4 mc-reveal mc-reveal-delay-2">
                    <a href="blog/errores-comunes-sublimacion.html" class="text-decoration-none">
                        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
                            <div class="d-flex gap-2 mb-3">
                                <span class="mc-post-tag" style="background: rgba(255, 122, 0, 0.15); color: #FF7A00; padding: 3px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700;">Errores</span>
                                <span style="color: var(--mc-text-muted); font-size: 0.8rem;">📅 Esta semana</span>
                            </div>
                            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading); margin-bottom: 10px;">Los 5 errores más comunes al estampar en sublimación</h3>
                            <p style="font-size: 0.9rem; color: var(--mc-text-muted); margin-bottom: 15px;">Desde el temido "ghosting" hasta colores opacos. Aprende cómo solucionarlos.</p>
                            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Leer artículo →</span>
                        </div>
                    </a>
                </div>
            </div>
            <div class="text-center mt-5 mc-reveal">
                <a href="blog/index.html" class="mc-btn-primary">Ver todos los artículos</a>
            </div>
        </div>
    </section>

    <!-- About Section -->`;

content = content.replace('<!-- About Section -->', sectionsHtml);
fs.writeFileSync(indexPath, content);
console.log("Restored Academy and Blog sections to index.html and updated navbar links.");
