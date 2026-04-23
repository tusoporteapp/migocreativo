const fs = require('fs');
const path = require('path');

const posts = [
    {
        url: 'diferencia-serigrafia-dtf-sublimacion.html',
        tag: 'Guías',
        date: 'Abr 23, 2026',
        title: '¿Cuál es la diferencia entre Serigrafía, DTF y Sublimación?',
        excerpt: 'Una guía definitiva para elegir la técnica correcta en 2026 sin perder dinero en el intento.'
    },
    {
        url: 'tendencias-diseno-textil-2026.html',
        tag: 'Tendencias',
        date: 'Abr 22, 2026',
        title: 'Tendencias de Diseño Textil y Estampado para 2026',
        excerpt: 'Descubre los estilos, colores y estéticas que dominarán el mundo del estampado este año.'
    },
    {
        url: 'guia-mantenimiento-prendas-estampadas.html',
        tag: 'Cuidados',
        date: 'Abr 21, 2026',
        title: 'Guía de Mantenimiento de Prendas Estampadas',
        excerpt: 'Consejos vitales para que tus estampados en DTF y serigrafía duren mucho más tiempo.'
    },
    {
        url: 'dtf-vs-serigrafia-rentabilidad.html',
        tag: 'Negocios',
        date: 'Abr 20, 2026',
        title: 'DTF vs Serigrafía: ¿Cuál es Más Rentable para tu Taller?',
        excerpt: 'Análisis de costos para ayudarte a decidir en qué técnica invertir según tu volumen de trabajo.'
    },
    {
        url: 'ia-en-diseno-textil.html',
        tag: 'Tecnología',
        date: 'Abr 18, 2026',
        title: 'Inteligencia Artificial en el Diseño Textil: Oportunidades y Limitaciones',
        excerpt: 'Cómo la inteligencia artificial está transformando la forma en que creamos arte para estampar.'
    },
    {
        url: 'como-elegir-mejor-tela-estampados.html',
        tag: 'Materiales',
        date: 'Abr 15, 2026',
        title: 'Cómo Elegir la Mejor Tela para Serigrafía, DTF y Sublimación',
        excerpt: 'No todas las telas reaccionan igual. Aprende a emparejar el textil con la técnica correcta.'
    }
];

// Rebuild blog/index.html grid
let blogHtml = '';
posts.forEach((post, idx) => {
    const delay = idx > 0 ? ` mc-reveal-delay-${idx % 3}` : '';
    blogHtml += `                <div class="col-md-6 col-lg-4 blog-item mc-reveal${delay}">
                    <a href="${post.url}" class="text-decoration-none">
                        <div class="mc-blog-card">
                            <div class="mc-blog-content">
                                <span class="mc-blog-tag">${post.tag}</span>
                                <h2 class="mc-blog-title">${post.title}</h2>
                                <p class="mc-blog-excerpt">${post.excerpt}</p>
                                <div class="mc-blog-meta">
                                    <div class="mc-blog-author">
                                        <img src="../assets/img/LOGO/LOGO NUEVO.jpg" alt="Miguel Heredia">
                                        <span style="color: var(--mc-text-muted); font-size: 0.85rem; font-weight: 500;">Miguel Heredia</span>
                                    </div>
                                    <span class="mc-blog-date">${post.date}</span>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>\n`;
});

const blogPath = path.join(__dirname, 'blog', 'index.html');
let blogContent = fs.readFileSync(blogPath, 'utf8');
const blogRegex = /<div class="row g-4" id="blog-grid">[\s\S]*?<\/div>\s*<div id="no-results"/;
blogContent = blogContent.replace(blogRegex, `<div class="row g-4" id="blog-grid">\n${blogHtml}            </div>\n\n            <div id="no-results"`);
fs.writeFileSync(blogPath, blogContent);

// Rebuild index.html 3 posts
let indexBlogHtml = '';
posts.slice(0, 3).forEach((post, idx) => {
    const delay = idx > 0 ? ` mc-reveal-delay-${idx}` : '';
    indexBlogHtml += `                <div class="col-md-4 mc-reveal${delay}">
                    <a href="blog/${post.url}" class="text-decoration-none">
                        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
                            <div class="d-flex gap-2 mb-3">
                                <span class="mc-post-tag" style="background: rgba(255, 122, 0, 0.15); color: #FF7A00; padding: 3px 10px; border-radius: 12px; font-size: 0.7rem; font-weight: 700;">${post.tag}</span>
                                <span style="color: var(--mc-text-muted); font-size: 0.8rem;">📅 ${post.date}</span>
                            </div>
                            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading); margin-bottom: 10px;">${post.title}</h3>
                            <p style="font-size: 0.9rem; color: var(--mc-text-muted); margin-bottom: 15px;">${post.excerpt}</p>
                            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Leer artículo →</span>
                        </div>
                    </a>
                </div>\n`;
});

const indexPath = path.join(__dirname, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');
const indexRegex = /<div class="row g-4 mt-4">\s*<!-- POST 1 -->[\s\S]*?<\/div>\s*<div class="text-center mt-5 mc-reveal">\s*<a href="blog\/index\.html"/;
indexContent = indexContent.replace(indexRegex, `<div class="row g-4 mt-4">\n${indexBlogHtml}            </div>\n            <div class="text-center mt-5 mc-reveal">\n                <a href="blog/index.html"`);
fs.writeFileSync(indexPath, indexContent);

console.log("Successfully linked 6 real posts to blog/index.html and updated index.html preview.");
