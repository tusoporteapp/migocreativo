/**
 * Migo Creativo - Script de SEO Dinámico para ReflowHQ
 * Actualiza Título y Meta Descripción para optimización de imágenes.
 */

// Guardar títulos originales
const originalTitle = document.title;
const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";

document.addEventListener('reflow-product-initialized', function (e) {
    const product = e.detail;
    const productName = product.name;
    const productDescription = product.description || "";

    const seoTitle = `${productName} - Imagen Optimizada para Estampado | Migo Creativo`;
    const cleanDescription = productDescription.replace(/<[^>]*>?/gm, '').substring(0, 150);
    const seoDescription = `Imagen "${productName}" optimizada profesionalmente para serigrafía, DTF y sublimación. Lista para producción. Migo Creativo - Colombia.`;

    document.title = seoTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", seoDescription);
    } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = seoDescription;
        document.head.appendChild(metaDescription);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", seoTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", seoDescription);

    console.log("SEO actualizado para: " + productName);
});

// Restaurar título original al volver a la lista (SPA)
window.addEventListener('hashchange', function() {
    if (!window.location.hash.startsWith('#producto=')) {
        document.title = originalTitle;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute("content", originalDescription);
    }
});