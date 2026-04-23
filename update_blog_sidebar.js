const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const sidebarHtml = `
                </div>
                <div class="col-lg-4 mt-5 mt-lg-0">
                    <div class="mc-sidebar" style="position: sticky; top: 100px;">
                        <div style="background: var(--mc-bg-card); border: 1px solid var(--mc-glass-border); border-radius: var(--mc-radius); padding: 2rem;">
                            <h4 style="font-weight: 800; margin-bottom: 1.5rem; color: var(--mc-text-heading); border-bottom: 2px solid var(--mc-glass-border); padding-bottom: 0.5rem;">Herramientas Útiles</h4>
                            <ul class="list-unstyled" style="margin-bottom: 2rem;">
                                <li class="mb-3"><a href="../herramientas/calculadora-dpi.html" style="color: var(--mc-orange-light); text-decoration: none; display: flex; align-items: center; gap: 10px;"><span>📏</span> Calculadora de DPI</a></li>
                                <li class="mb-3"><a href="../herramientas/comparador-tecnicas.html" style="color: var(--mc-orange-light); text-decoration: none; display: flex; align-items: center; gap: 10px;"><span>🤔</span> Comparador de Técnicas</a></li>
                                <li class="mb-3"><a href="../herramientas/calculadora-costos.html" style="color: var(--mc-orange-light); text-decoration: none; display: flex; align-items: center; gap: 10px;"><span>💰</span> Calculadora de Costos</a></li>
                            </ul>

                            <h4 style="font-weight: 800; margin-bottom: 1.5rem; color: var(--mc-text-heading); border-bottom: 2px solid var(--mc-glass-border); padding-bottom: 0.5rem;">Lo más leído</h4>
                            <div class="mb-3">
                                <a href="diferencia-serigrafia-dtf-sublimacion.html" class="text-decoration-none">
                                    <span style="font-size: 0.75rem; color: var(--mc-text-muted);">Estampado Textil</span>
                                    <h5 style="font-size: 1rem; color: var(--mc-text); margin-top: 5px;">¿Serigrafía, DTF o Sublimación?</h5>
                                </a>
                            </div>
                            <div class="mb-3">
                                <a href="guia-vectores-vs-pixeles.html" class="text-decoration-none">
                                    <span style="font-size: 0.75rem; color: var(--mc-text-muted);">Diseño Gráfico</span>
                                    <h5 style="font-size: 1rem; color: var(--mc-text); margin-top: 5px;">Vectores vs Píxeles</h5>
                                </a>
                            </div>
                            
                            <div class="mt-4 p-3 rounded text-center" style="background: var(--mc-gradient-soft); border: 1px solid var(--mc-orange);">
                                <h5 class="fw-bold mb-2 text-white">¿Necesitas ayuda con un diseño?</h5>
                                <p class="text-muted text-sm mb-3">Optimizamos tu imagen lista para producción.</p>
                                <a href="https://wa.me/573023579755" class="mc-btn-primary w-100" style="padding: 8px;">Contactar a Miguel</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make sure we haven't already modified it
    if (!content.includes('mc-sidebar')) {
        // Change <div class="container"><div class="mc-post-body"> to <div class="container"><div class="row"><div class="col-lg-8"><div class="mc-post-body" style="margin: 0;">
        content = content.replace(
            '<div class="container">\n            <div class="mc-post-body">',
            '<div class="container">\n            <div class="row">\n                <div class="col-lg-8">\n                    <div class="mc-post-body" style="margin: 0;">'
        );
        
        // Sometimes they are inline: <div class="container"><div class="mc-post-body">
        content = content.replace(
            '<div class="container"><div class="mc-post-body">',
            '<div class="container"><div class="row"><div class="col-lg-8"><div class="mc-post-body" style="margin: 0;">'
        );

        // Close the divs properly before </article>
        // Originally: </div></div></article>  or  \n            </div>\n        </div>\n    </article>
        content = content.replace(
            /<\/div>\n\s*<\/div>\n\s*<\/article>/g,
            sidebarHtml + '\n        </div>\n    </article>'
        );
        content = content.replace(
            /<\/div><\/div><\/article>/g,
            sidebarHtml + '</div></article>'
        );

        // Fix the header link back to blog index instead of ../index.html#blog
        content = content.replace(
            '<a href="../index.html#blog"',
            '<a href="index.html"'
        );

        fs.writeFileSync(filePath, content);
        console.log(`Updated sidebar in ${file}`);
    }
}
