const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const regex = /"serviceType": \["Diseño para Serigrafía", "Diseño para DTF", "Diseño para Sublimación", "Separación de Colores", "Vectorización de Logos", "Optimización de Imágenes para Estampado"\],\s*"priceRange": "\$\$",\s*"openingHours": "Mo-Fr 08:00-18:00",\s*"sameAs": \[\]/;

const replacement = `"serviceType": ["Diseño para Serigrafía", "Diseño para DTF", "Diseño para Sublimación", "Separación de Colores", "Vectorización de Logos", "Optimización de Imágenes para Estampado"],
            "priceRange": "$$",
            "openingHours": "Mo-Fr 08:00-18:00",
            "sameAs": [],
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "30",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": [
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Carlos S."},
                    "datePublished": "2026-04-10",
                    "reviewBody": "Chamo, el servicio es de otro nivel. Nos acomodó una imagen de 72 DPI que el cliente juraba que estaba en alta. El DTF salió nítido, sin bordes pixelados.",
                    "reviewRating": {"@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1"}
                },
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Juan Pablo G."},
                    "datePublished": "2026-04-12",
                    "reviewBody": "Antes perdíamos mucha plata porque el DTF nos quedaba con un borde blanco horroroso. Desde que Miguel nos prepara los archivos, el acabado es premium. Cero problemas en la plancha.",
                    "reviewRating": {"@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1"}
                },
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Luis R."},
                    "datePublished": "2026-04-15",
                    "reviewBody": "Causa, el servicio es buenazo. Para producciones grandes en Gamarra necesitamos rapidez y calidad. Los diseños para plastisol nos llegan perfectos.",
                    "reviewRating": {"@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1"}
                },
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Ignacio V."},
                    "datePublished": "2026-04-18",
                    "reviewBody": "El soporte es genial. Me explicó por qué mi perfil RGB no funcionaba para sublimar y me entregó todo en CMYK listo para imprimir. Cero dramas.",
                    "reviewRating": {"@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1"}
                },
                {
                    "@type": "Review",
                    "author": {"@type": "Person", "name": "Martín N."},
                    "datePublished": "2026-04-20",
                    "reviewBody": "¡Che, increíble el laburo! Estábamos renegando con un archivo pesadísimo y Miguel nos devolvió un PNG transparente súper optimizado para DTF. Un crack.",
                    "reviewRating": {"@type": "Rating", "bestRating": "5", "ratingValue": "5", "worstRating": "1"}
                }
            ]`;

content = content.replace(regex, replacement);
fs.writeFileSync(indexPath, content);
console.log("SEO updated with aggregateRating and reviews");
