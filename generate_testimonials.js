const fs = require('fs');
const path = require('path');

const testimonials = [
    // Colombia (8)
    { init: 'JP', color: 'var(--mc-orange)', name: 'Juan Pablo G.', city: 'Taller de DTF • Bogotá, Colombia', quote: 'Antes perdíamos mucha plata porque el DTF nos quedaba con un borde blanco horroroso. Desde que Miguel nos prepara los archivos, el acabado es premium. Cero problemas en la plancha.' },
    { init: 'AM', color: 'var(--mc-purple)', name: 'Andrés M.', city: 'Serigrafista • Medellín, Colombia', quote: 'Le envié un logo pixelado que me mandó un cliente por WhatsApp. No sé cómo hizo pero lo vectorizó perfecto y la separación de colores para serigrafía encajó a la primera.' },
    { init: 'CR', color: 'var(--mc-blue)', name: 'Carolina R.', city: 'Sublimación deportiva • Cali, Colombia', quote: 'Nuestros uniformes de ciclismo quedaban con colores muy apagados. Gracias a la perfilación de color que nos hizo Miguel, ahora los neones resaltan increíble en la tela.' },
    { init: 'LF', color: '#10b981', name: 'Luis Fernando', city: 'Estampados • Barranquilla, Colombia', quote: 'La rapidez con la que entrega los archivos listos para imprimir es absurda. Literalmente nos salvó un pedido de 500 camisetas para un evento de carnaval.' },
    { init: 'MV', color: '#f43f5e', name: 'Marta V.', city: 'Emprendedora • Bucaramanga, Colombia', quote: 'Yo no sabía nada de resolución. Miguel no solo me arregló el archivo, sino que me explicó en qué formato pedirle los diseños a mis clientes. Una excelente atención.' },
    { init: 'DC', color: '#3b82f6', name: 'Diego C.', city: 'Textiles DC • Cartagena, Colombia', quote: 'Estampar fotos en camisetas oscuras era nuestra debilidad. Con el proceso simulado que nos preparó, los clientes creen que es impresión digital directa. Brutal.' },
    { init: 'SP', color: '#8b5cf6', name: 'Sofía P.', city: 'Ropa Infantil • Cúcuta, Colombia', quote: 'Excelente servicio. Los vectores quedan limpísimos, sin nodos basura. Cuando mandamos a cortar vinilo textil la máquina vuela sin trabarse.' },
    { init: 'RJ', color: '#f59e0b', name: 'Roberto J.', city: 'Dotaciones • Pereira, Colombia', quote: 'Teníamos un problema crónico de ghosting en las tazas de sublimación. Miguel nos asesoró con la plantilla correcta y sangrados. Problema resuelto para siempre.' },

    // Argentina (4)
    { init: 'MN', color: '#0ea5e9', name: 'Martín N.', city: 'Taller Gráfico • Buenos Aires, Argentina', quote: '¡Che, increíble el laburo! Estábamos renegando con un archivo pesadísimo y Miguel nos devolvió un PNG transparente súper optimizado para DTF. Un crack.' },
    { init: 'VG', color: '#d946ef', name: 'Valeria G.', city: 'Diseño e Indumentaria • Córdoba, Argentina', quote: 'La separación de canales para serigrafía cuatricromía fue impecable. Nos ahorró horas de trabajo en el Photoshop. Super recomendable el servicio.' },
    { init: 'ES', color: '#14b8a6', name: 'Esteban S.', city: 'Estampados • Rosario, Argentina', quote: 'Mandamos a hacer un diseño complejo con muchísimos degradados. En la imprenta nos rebotaban, pero Migo Creativo lo dejó listo y pasó de diez.' },
    { init: 'FR', color: '#f97316', name: 'Florencia R.', city: 'Sublimaciones • Mendoza, Argentina', quote: 'Gracias a Miguel pudimos calibrar por fin nuestra impresora Epson. Los grises ya no salen verdosos. Un nivel de profesionalismo tremendo.' },

    // Venezuela (4)
    { init: 'CS', color: '#eab308', name: 'Carlos S.', city: 'Impresiones 360 • Caracas, Venezuela', quote: 'Chamo, el servicio es de otro nivel. Nos acomodó una imagen de 72 DPI que el cliente juraba que estaba en alta. El DTF salió nítido, sin bordes pixelados.' },
    { init: 'MA', color: '#ec4899', name: 'María A.', city: 'Confecciones • Maracaibo, Venezuela', quote: 'Estábamos perdiendo material probando temperaturas. Miguel nos guió con los archivos de prueba para calibrar nuestra plancha. Excelente atención.' },
    { init: 'JL', color: '#6366f1', name: 'José L.', city: 'Serigrafía JL • Valencia, Venezuela', quote: 'Los fotolitos ahora me salen perfectos. La trama de semitonos que aplica Miguel hace que el revelado de la pantalla sea facilísimo. 100% recomendados.' },
    { init: 'DP', color: '#84cc16', name: 'Daniela P.', city: 'Regalos Personalizados • Barquisimeto, Venezuela', quote: 'Nos salvaron con un diseño para unas tazas del Día de la Madre. Todo rápido, limpio y con los colores exactos que queríamos.' },

    // Chile (3)
    { init: 'PR', color: '#ef4444', name: 'Pedro R.', city: 'Taller Textil • Santiago, Chile', quote: 'Bacán el trabajo. Nos enviaron un archivo listo para la máquina de impresión directa (DTG) con la base blanca perfectamente mapeada. Cero desperdicio de tinta.' },
    { init: 'CH', color: '#06b6d4', name: 'Camila H.', city: 'Sublima Todo • Valparaíso, Chile', quote: 'Seco para la vectorización. Tenía un logo antiguo de un colegio que solo existía en una foto borrosa y quedó como recién diseñado por la agencia.' },
    { init: 'IV', color: '#a855f7', name: 'Ignacio V.', city: 'Estampados Conce • Concepción, Chile', quote: 'El soporte es genial. Me explicó por qué mi perfil RGB no funcionaba para sublimar y me entregó todo en CMYK listo para imprimir. Cero dramas.' },

    // Peru (5)
    { init: 'LR', color: '#10b981', name: 'Luis R.', city: 'Gamarra Textil • Lima, Perú', quote: 'Causa, el servicio es buenazo. Para producciones grandes en Gamarra necesitamos rapidez y calidad. Los diseños para plastisol nos llegan perfectos.' },
    { init: 'AL', color: '#f59e0b', name: 'Ana L.', city: 'Sublimagic • Arequipa, Perú', quote: 'Me sorprendió lo bien que manejan los perfiles ICC. Las fotos de paisajes en nuestras telas ahora se ven hiperrealistas, con colores súper vivos.' },
    { init: 'RM', color: '#3b82f6', name: 'Raúl M.', city: 'Estampados Norte • Trujillo, Perú', quote: 'Excelente trabajo arreglando un diseño full color para DTF. Eliminó todos los píxeles semi-transparentes que siempre nos traían problemas con la goma.' },
    { init: 'KT', color: '#ec4899', name: 'Karen T.', city: 'Creaciones • Chiclayo, Perú', quote: 'Muy buena experiencia. No sabíamos cómo preparar archivos para hacer DTF UV y nos explicaron todo al detalle. Salieron unos stickers increíbles.' },
    { init: 'JG', color: '#8b5cf6', name: 'Jorge G.', city: 'Cusco Prints • Cusco, Perú', quote: 'Recomendadísimo. Vectorizó unos patrones andinos muy complejos y los dejó listos para corte en plotter sin que la máquina se vuelva loca.' },

    // Ecuador (6)
    { init: 'DV', color: '#f43f5e', name: 'David V.', city: 'Quito Textil • Quito, Ecuador', quote: 'Excelente calidad en la separación de colores indexados. Hicimos unas camisetas de bandas de rock y el nivel de detalle en los grises es espectacular.' },
    { init: 'FC', color: '#0ea5e9', name: 'Fernanda C.', city: 'Sublimarket • Guayaquil, Ecuador', quote: 'Muy ágiles. Necesitábamos optimizar 20 imágenes para una campaña publicitaria en menos de 24 horas y cumplieron con creces. Calidad A1.' },
    { init: 'AB', color: '#14b8a6', name: 'Andrés B.', city: 'Cuenca Diseño • Cuenca, Ecuador', quote: 'El servicio de Migo Creativo nos cambió la forma de trabajar. Ahora ya no perdemos tiempo intentando salvar archivos malos de los clientes, todo se lo mandamos a ellos.' },
    { init: 'GL', color: '#d946ef', name: 'Gabriela L.', city: 'Estampando • Santo Domingo, Ecuador', quote: 'Súper precisos. El blanco base para nuestras prendas oscuras quedó exacto, sin asomarse por los bordes. Se nota la experiencia en serigrafía.' },
    { init: 'OM', color: '#f97316', name: 'Omar M.', city: 'Machala Prints • Machala, Ecuador', quote: 'El conocimiento técnico es altísimo. Me resolvieron dudas sobre lineaturas de trama que nadie me había sabido explicar antes. Un éxito.' },
    { init: 'SC', color: '#6366f1', name: 'Silvia C.', city: 'Manta Custom • Manta, Ecuador', quote: 'Trabajos muy pulidos. En DTF los degradados hacia transparencia son lo más difícil, y Migo Creativo los prepara para que queden suaves y sin bordes duros.' }
];

// Shuffle array for better variety (optional, but requested order is fine, let's keep them mixed or grouped?)
// Let's just use them as they are, but maybe shuffle to mix countries?
// Actually, randomizing makes it look more natural.
for (let i = testimonials.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [testimonials[i], testimonials[j]] = [testimonials[j], testimonials[i]];
}

let newTrackHtml = '\n';
for (const t of testimonials) {
    const starHtml = '<div class="mc-stars">⭐⭐⭐⭐⭐</div>';
    const bgStyle = t.color !== 'var(--mc-orange)' ? ` style="background: ${t.color};"` : '';
    
    newTrackHtml += `                    <div class="mc-testimonial-card">
                        ${starHtml}
                        <p class="mc-quote">"${t.quote}"</p>
                        <div class="mc-client">
                            <div class="mc-client-avatar"${bgStyle}>${t.init}</div>
                            <div>
                                <h4 class="mb-0">${t.name}</h4>
                                <span class="text-muted text-sm">${t.city}</span>
                            </div>
                        </div>
                    </div>\n`;
}

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

const regex = /<div class="mc-testimonial-track" id="mc-testimonial-track">([\s\S]*?)<\/div>\s*<\/div>\s*<\/section>/;

content = content.replace(regex, `<div class="mc-testimonial-track" id="mc-testimonial-track">${newTrackHtml}                    </div>\n                </div>\n            </div>\n        </div>\n    </section>`);

// Wait, the regex might destroy the wrappers. Let's be safer.
// Let's find exactly the track and replace its interior.
const trackStartStr = '<div class="mc-testimonial-track" id="mc-testimonial-track">';
const trackStartIdx = content.indexOf(trackStartStr);
if (trackStartIdx !== -1) {
    // find the end of this div.
    // Since it contains multiple cards, let's just use a more precise regex.
    const regexPrecise = /<div class="mc-testimonial-track" id="mc-testimonial-track">[\s\S]*?<!-- About Section -->/;
    
    const replacement = `<div class="mc-testimonial-track" id="mc-testimonial-track">${newTrackHtml}                </div>\n            </div>\n        </div>\n    </section>\n\n    <!-- About Section -->`;
    
    content = content.replace(regexPrecise, replacement);
    fs.writeFileSync(indexPath, content);
    console.log("30 Testimonials successfully injected!");
} else {
    console.log("Could not find testimonial track");
}
