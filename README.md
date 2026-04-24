# MigoCreativo.com — Documentación del Proyecto

## Descripción General

**MigoCreativo.com** es el sitio web de **Miguel Heredia**, especialista en **optimización de imágenes para estampado textil** (serigrafía, DTF y sublimación) en Colombia.

> ⚠️ **IMPORTANTE**: Miguel NO vende diseños. Su servicio es OPTIMIZAR imágenes que los clientes le envían para que estén listas para producción en cada técnica de estampado.

---

## Estructura del Proyecto

```
migocreativo/
├── index.html              # Página principal (SPA con secciones)
├── robots.txt              # Configuración para buscadores
├── sitemap.xml             # Mapa del sitio para SEO
├── README.md               # Este archivo (documentación)
├── blog/                   # 📝 Carpeta del Blog
│   └── diferencia-serigrafia-dtf-sublimacion.html  # Post 1
├── assets/
│   ├── bootstrap/          # Bootstrap CSS/JS (dark theme)
│   │   ├── css/bootstrap.min.css
│   │   └── js/bootstrap.min.js
│   ├── css/
│   │   └── bss-overrides.css   # 🎨 Sistema de diseño principal (colores, animaciones, layout)
│   ├── img/
│   │   └── LOGO/
│   │       ├── LOGO.png            # Ícono del personaje (favicon, navbar, footer)
│   │       └── LOGO NUEVO.jpg      # Foto de Miguel Heredia (hero, about, autor en blog)
│   └── js/
│       ├── jquery.min.js
│       ├── bs-init.js          # Inicialización de Bootstrap
│       ├── bold-and-dark.js    # Efecto parallax
│       └── seo.js              # SEO dinámico para páginas con Reflow (legacy, puede eliminarse)
```

---

## Paleta de Colores

Extraída del branding de Miguel (naranja del fondo de su foto + púrpura del logo):

| Variable | Color | Uso |
|----------|-------|-----|
| `--mc-orange` | `#FF7A00` | Color primario, botones, acentos |
| `--mc-purple` | `#5B4FD6` | Color secundario, gradientes |
| `--mc-bg-deep` | `#0B0B18` | Fondo principal (negro profundo) |
| `--mc-bg-surface` | `#13132A` | Fondo de secciones alternas |
| `--mc-bg-card` | `#1A1A35` | Fondo de cards |
| `--mc-text` | `#EEEEF5` | Texto principal |
| `--mc-text-muted` | `#9999B8` | Texto secundario |

**Gradiente principal**: `linear-gradient(135deg, #FF7A00, #5B4FD6)`

---

## Secciones de index.html

1. **Hero** (`#hero`): Presentación de Miguel con foto, título y CTAs
2. **Servicios** (`#servicios`): 3 cards — Serigrafía, DTF, Sublimación
3. **Blog** (`#blog`): Grid de cards con enlaces a posts del blog
4. **Sobre Mí** (`#sobre-mi`): Foto de Miguel, bio y estadísticas
5. **CTA** (`#contacto`): Llamada a acción con botón de WhatsApp
6. **Footer**: Links, redes sociales, info de contacto

---

## Sistema de Blog

### Cómo agregar un nuevo post:

1. **Crear el archivo HTML** en `/blog/` con nombre SEO-friendly (ej: `como-preparar-imagenes-dtf.html`)
2. **Copiar la estructura** del post existente (`diferencia-serigrafia-dtf-sublimacion.html`)
3. **Actualizar el SEO**: título, meta description, og:tags, schema.org BlogPosting
4. **Escribir el contenido** usando las clases CSS del sistema:
   - `mc-post-body` para el contenedor del artículo
   - `mc-highlight-box` para cajas destacadas
   - `mc-comparison-table` para tablas comparativas
   - `mc-post-author-box` para la caja del autor al final
   - `mc-post-tag` para etiquetas de categoría
5. **Agregar la card en index.html**: Buscar el comentario `<!-- AGREGAR MÁS POSTS AQUÍ -->` y añadir un nuevo `<div class="col-md-6 col-lg-4">` con la card del post
6. **Actualizar sitemap.xml**: Agregar una nueva entrada `<url>` con la URL del post

### Formato de card para index.html:

```html
<div class="col-md-6 col-lg-4">
    <a href="blog/NOMBRE-DEL-POST.html" class="text-decoration-none">
        <div class="mc-service-card" style="text-align: left; cursor: pointer;">
            <div class="d-flex gap-2 mb-3">
                <span class="mc-post-tag" style="padding:3px 10px; font-size:0.7rem;">CATEGORÍA</span>
                <span style="color: var(--mc-text-muted); font-size: 0.8rem;">📅 FECHA</span>
            </div>
            <h3 style="font-size: 1.15rem; line-height: 1.4; color: var(--mc-text-heading);">TÍTULO DEL POST</h3>
            <p style="font-size: 0.9rem;">DESCRIPCIÓN BREVE del artículo.</p>
            <span style="color: var(--mc-orange); font-weight: 600; font-size: 0.9rem;">Leer artículo →</span>
        </div>
    </a>
</div>
```

---

## Servicios Externos

| Servicio | Uso | Configuración |
|----------|-----|---------------|
| **Firebase** | Analytics | Proyecto: `migocreativo-com`, ID: `G-FBX628JT6Y` |
| **Bootstrap 5** | Framework CSS | Dark theme (`data-bs-theme="dark"`) |
| **Google Fonts** | Tipografía | Inter (300-900) |
| **Reflow** | Legacy (productos) | Proyecto: `921981977` — Puede eliminarse si ya no se usa |

---

## SEO

- Cada página tiene meta tags completos (description, og:*, twitter:*)
- Blog posts incluyen schema.org `BlogPosting` structured data
- `robots.txt` permite todo y apunta al sitemap
- `sitemap.xml` actualizado con cada nueva página
- Títulos siguen formato: `[Título] | Migo Creativo`

---

## Contacto / WhatsApp

El botón de WhatsApp usa la URL: `https://wa.me/573023579755`

---

## MigoBot (Chatbot Wiki)

Archivo: `assets/js/migobot.js`

Es un chatbot autocontenido que funciona como una Wiki de estampado textil. No requiere API ni backend — toda la base de conocimiento está embebida en el archivo JS.

### Temas que cubre:
- Diferencias entre serigrafía, DTF y sublimación
- Resolución y DPI para estampado
- Perfiles de color (CMYK, RGB, Pantone, ICC)
- Separación de colores
- Temperaturas de transferencia
- Tipos de tela por técnica
- Durabilidad por técnica
- Formatos de archivo
- Problemas comunes y soluciones
- Cómo empezar en el negocio
- Estampado en productos rígidos

### Cómo agregar más conocimiento:
1. Abrir `assets/js/migobot.js`
2. En el array `KB` al inicio, agregar un nuevo objeto:
```javascript
{k:["palabra","clave","del","tema"], r:"Respuesta completa del bot"}
```
3. `k` son las palabras clave que activan la respuesta
4. `r` es el texto que el bot responde

### Notas:
- El bot se carga automáticamente en todas las páginas que incluyan el script
- Aparece como un botón flotante 💬 en la esquina inferior derecha
- Incluye botones de respuesta rápida
- El estilo se inyecta automáticamente (no necesita CSS externo)

---

## Notas para IAs futuras

- **No cambiar** la paleta de colores sin aprobación de Miguel
- **No mencionar** venta de diseños — el servicio es OPTIMIZACIÓN de imágenes
- **Blog es solo texto** — no agregar imágenes en los posts a menos que Miguel lo pida
- **Todos los textos** deben ser en español (es-419, español latinoamericano)
- **El tono** es profesional pero cercano, como un amigo experto que te explica las cosas
- **Microsoft Edge** es el navegador predeterminado: SIEMPRE que Miguel quiera probar o ver la página, abre automáticamente el navegador usando el comando de terminal `start msedge [URL]`. No le pidas que abra el enlace manualmente.

---

## Últimas Optimizaciones (Abril 2026)

### 1. UX Móvil (Mobile-First)
- **Grid de 2 Columnas**: Se forzó la visualización de 2 items por línea en dispositivos móviles para la Tienda, Blog, Academia y secciones de Inicio usando la clase `row-cols-2`.
- **Ajustes Visuales**: Reducción de espaciado (`g-2`) y optimización de tamaños de fuente en móviles mediante `bss-overrides.css`.

### 2. Tienda y Conversión
- **Personalización de Pedidos**: Se añadió un campo de **Nombre del Cliente** en el carrito flotante.
- **WhatsApp Dinámico**: El mensaje enviado a WhatsApp ahora incluye el nombre del cliente y una lista detallada de los productos con sus precios.
- **Unificación de Interfaz**: Se restauró el botón de WhatsApp y la navegación completa en todas las subpáginas (Tienda, Blog, Academia).

### 3. SEO de Élite (Dominio de Buscadores)
- **Datos Estructurados (JSON-LD)**: 
  - `FAQPage`: Implementado para mostrar respuestas directamente en Google.
  - `BreadcrumbList`: Mejora la jerarquía y apariencia en los resultados de búsqueda.
  - `ProfessionalService`: Datos actualizados con reseñas y servicios específicos.
- **Contenido Semántico**: Se añadieron secciones de "Preguntas Frecuentes" y "Búsquedas Relacionadas" ricas en palabras clave como *"diseños para dtf bogotá"*, *"separación de colores serigrafía"* y *"plantillas para sublimación"*.
- **Sitemap & Robots**: `sitemap.xml` creado y vinculado en `robots.txt` para asegurar la indexación de todas las secciones.

### 4. Analítica y Consistencia
- **Firebase Analytics**: Integrado en todas las páginas para seguimiento unificado del tráfico y clics en WhatsApp.
- **Footers Unificados**: Todas las subpáginas ahora comparten el mismo pie de página profesional y completo del inicio.
