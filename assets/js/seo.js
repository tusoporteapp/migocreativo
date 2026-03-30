/**
 * Migo Creativo - Script de SEO Dinámico para ReflowHQ
 * Este script detecta cuando un producto se carga y actualiza el Título 
 * y la Meta Descripción automáticamente para mejorar el posicionamiento.
 */

document.addEventListener('reflow-product-initialized', function (e) {
    // 1. Obtenemos la información del producto desde el evento de Reflow
    const product = e.detail;
    const productName = product.name;
    const productDescription = product.description || "";

    // 2. Definimos nuestra fórmula de Título SEO
    const seoTitle = `${productName} - Diseño para Serigrafía y DTF | Migo Creativo`;

    // 3. Definimos nuestra fórmula de Meta Descripción
    // Limpiamos etiquetas HTML si existen en la descripción original
    const cleanDescription = productDescription.replace(/<[^>]*>?/gm, '').substring(0, 150);
    const seoDescription = `Descarga el diseño "${productName}" en alta resolución. Vector optimizado para serigrafía y DTF en Colombia. ¡Mejora tus productos con Migo Creativo!`;

    // 4. Aplicamos los cambios al documento
    document.title = seoTitle;

    // Actualizar Meta Descripción
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute("content", seoDescription);
    } else {
        // Si no existe la etiqueta, la creamos
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = seoDescription;
        document.head.appendChild(metaDescription);
    }

    // 5. Actualizar Open Graph (para WhatsApp/Redes Sociales)
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", seoTitle);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", seoDescription);

    console.log("SEO actualizado para: " + productName);
});