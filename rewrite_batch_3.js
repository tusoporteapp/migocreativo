const fs = require('fs');
const path = require('path');

function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const batch3 = [
    // --- ÚLTIMAS 20 LECCIONES DE ACADEMIA ---
    { 
        type: 'academy', title: "Ajuste de niveles y curvas para imprimir", level: "intermedio", num: 19,
        body: `
            <p>Imprimir una imagen tal como se ve en tu monitor casi siempre resulta en un estampado opaco y lodoso. En esta lección aprenderás a manipular la luz y las sombras usando Niveles y Curvas para compensar la ganancia de punto en serigrafía y la absorción de tinta en sublimación.</p>
            <h3>El problema de la Ganancia de Punto (Dot Gain)</h3>
            <p>En serigrafía (y también en impresión inyección de tinta), cuando una gota redonda de tinta toca la tela, se expande ligeramente al absorberse. Si en Photoshop tienes un gris al 80% de oscuridad, en la camiseta se expandirá y se verá 95% negro. Debes compensar esto *aclarando* los tonos medios artificialmente antes de imprimir.</p>
            <h3>Uso de Curvas de Ajuste</h3>
            <p>Abre Curvas (Ctrl+M). Toma el punto central de la línea y súbelo ligeramente. Esto ilumina los grises intermedios sin quemar los blancos ni agrisar los negros puros. Para sublimación, donde los colores oscuros suelen verse verdosos o azulados por la temperatura, puedes ir al canal Rojo dentro de las curvas y darle un pequeño empujón hacia arriba para calentar la imagen.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Abre un retrato oscuro en Photoshop. Ve a Capa > Nueva Capa de Ajuste > Niveles. Mueve el deslizador gris del centro hacia la izquierda (valor 1.20 a 1.30). Notarás que el contraste general baja ligeramente en pantalla, pero esto garantizará que los rostros no salgan "quemados u oscuros" al estampar.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Cómo eliminar fondos con canales", level: "intermedio", num: 20,
        body: `
            <p>La herramienta Pluma y la Varita Mágica son inútiles cuando tienes que recortar algo que no tiene bordes duros: como humo, fuego, nubes, agua salpicando o cabello muy fino. Para estos casos extremos, los profesionales usamos la Extracción por Canales (Channel Pull).</p>
            <h3>Encontrando el alto contraste</h3>
            <p>Ve a la pestaña Canales (Channels). Verás el RGB, Red, Green y Blue. Haz clic en cada uno individualmente y busca cuál de los tres ofrece el mayor contraste en blanco y negro entre tu objeto (ej. fuego) y el fondo (ej. cielo nocturno). Usualmente, para aislar cosas brillantes sobre fondos oscuros, el canal Rojo o Verde es el mejor.</p>
            <h3>Creando la máscara de recorte perfecta</h3>
            <p>Duplica ese canal arrastrándolo al ícono de "Nuevo Canal". Con el canal copiado seleccionado, presiona Ctrl+L para abrir Niveles. Contrástalo al máximo: lleva los negros a negro puro y los blancos a blanco puro. Ahora, mantén presionado Ctrl y haz clic sobre la miniatura del canal copiado. Acabas de crear una selección perfecta de las flamas. Vuelve a RGB, ve a Capas y crea una Máscara. El fuego quedará perfectamente recortado con todas sus transparencias intactas.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Descarga una foto de una explosión o fuego sobre fondo negro. Usa el truco del Canal Rojo para extraerlo. Pon una foto de una camiseta detrás en una capa nueva. Verás que el humo y el fuego se fusionan de forma increíblemente realista sin bordes cuadrados.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Simulación de colores Pantone", level: "intermedio", num: 21,
        body: `
            <p>Cuando un cliente corporativo (como un banco o una marca de autos) te exige que su logotipo sea estampado en su color institucional exacto, no puedes adivinarlo en la pantalla. Un tono CMYK o RGB variará en cada impresora. Debes hablar el idioma universal del color: El sistema Pantone Matching System (PMS).</p>
            <h3>Identificación y Formulación</h3>
            <p>Si el cliente te pide "Pantone 186 C" (Un rojo clásico), debes ir a tu software de mezcla de tintas de serigrafía. Las marcas profesionales de plastisol (como Wilflex o Rutland) te dan un software gratuito donde ingresas "186 C" y te dice matemáticamente cuántos gramos de base transparente, cuántos de pigmento rojo y cuántos de pigmento amarillo debes mezclar en la balanza gramera.</p>
            <h3>Limitaciones en Impresión Digital (DTF/Sublimación)</h3>
            <p>Si trabajas con DTF, estás atado a las tintas CMYK. Es IMPOSIBLE reproducir el 100% de la paleta Pantone solo con 4 colores (especialmente los neones, dorados o naranjas ultra brillantes). Para acercarte lo máximo posible, debes imprimir una "Carta de Colores" (Color Chart) con miles de cuadritos CMYK en tela real. Cuando el cliente pida un Pantone, búscalo visualmente en tu tela ya planchada, y usa el valor CMYK de ese cuadrito en tu archivo de Illustrator.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Nunca prometas "Igualación de color exacta" en DTF o Sublimación básica. Explícale al cliente corporativo que el DTF usa CMYK y tendrá una variación del 5 al 10%. Para igualación exacta al 100%, la técnica a cotizar debe ser obligatoriamente Serigrafía de colores planos.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Creación de tramas de semitonos", level: "intermedio", num: 22,
        body: `
            <p>La serigrafía es binaria: el hueco de la malla está abierto (pasa tinta) o está cerrado (no pasa). ¿Cómo imprimimos un degrade suave de negro a blanco si no podemos usar tintas aguadas? Con la magia de la ilusión óptica: La Trama de Semitonos (Halftones).</p>
            <h3>El tamaño del punto (LPI - Líneas Por Pulgada)</h3>
            <p>El LPI determina qué tan finos o gruesos serán los puntitos negros. Un LPI de 30 tendrá puntos gordos (ideal para estilo cómic pop-art o mallas de 43 hilos). Un LPI de 55 tendrá puntos microscópicos fotorealistas (requiere mallas de 120 hilos). La regla de oro para evitar que los puntos se caigan por los agujeros de la malla es: LPI x 2.5 = Número de Hilos mínimo de tu marco.</p>
            <h3>Cómo tramarlo en Photoshop</h3>
            <p>Para hacer un diseño en escala de grises: Ve a Imagen > Modo > Mapa de Bits (Bitmap). Te preguntará la resolución de salida (pon la misma de entrada, mínimo 300) y elige "Trama de Semitonos". Luego te pedirá el LPI (Pon 45 para empezar), Ángulo (22.5 grados es estándar para un solo color) y la Forma (Redonda o Elíptica). Al dar OK, tus grises se volverán millones de puntos de tinta negra pura, listos para imprimir tu acetato.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Crea un archivo en blanco y negro con un degrade suave. Aplica el filtro "Semidiseño de color" (Color Halftone) en Photoshop (Filtro > Pixelizar > Semidiseño de color). Juega con el Radio Max (Max Radius) poniéndolo en 15 o 20 para entender cómo crece el punto en las zonas oscuras y se achica en las luces.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Lineaturas e inclinación de ángulos", level: "intermedio", num: 23,
        body: `
            <p>Continuando con los medios tonos, cuando imprimes una foto a todo color (CMYK) en serigrafía, vas a imprimir 4 tramas de puntos una encima de otra. Si todas tienen el mismo ángulo, los puntos colisionarán y crearán un patrón horrendo similar a una tela escocesa vibrante. Esto se llama "Efecto Moiré".</p>
            <h3>La Roseta CMYK</h3>
            <p>Para evitar que los puntos choquen, deben encajar unos al lado de otros formando un patrón de flor llamado "Roseta". Esto se logra asignando ángulos específicos matemáticos a cada color al momento de imprimir los fotolitos desde el RIP o Photoshop.</p>
            <h3>Los Ángulos Universales</h3>
            <p>El estándar internacional probado para CMYK en serigrafía es:<br>
            - <strong>Cyan:</strong> 15°<br>
            - <strong>Magenta:</strong> 75°<br>
            - <strong>Yellow (Amarillo):</strong> 90° (El amarillo es el más claro, por eso se pone a 90° donde el moiré es más evidente, pero visualmente menos invasivo).<br>
            - <strong>Black (Negro):</strong> 45° (El ojo humano es menos sensible a los patrones a 45 grados, por eso el color más fuerte va aquí).</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Además de los ángulos, la tensión de tus marcos debe ser igual en los 4. Si tu marco Cyan está a 20 Newtons y el Magenta a 12 Newtons, el Magenta se deformará al pasar la racleta, los puntos se estirarán y generarás moiré en la máquina aunque tus fotolitos estuvieran perfectos.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Optimización de sombras para DTF", level: "intermedio", num: 24,
        body: `
            <p>Uno de los errores más comunes de diseño en DTF es mandar una foto con sombras que se desvanecen (fade out) hacia transparente. Cuando planchas eso en la camiseta, la sombra negra suave se convierte en un contorno blanco duro y horrible. Veamos por qué ocurre y cómo arreglarlo.</p>
            <h3>El problema del "Borde Blanco" (Halo) en degradados</h3>
            <p>El software RIP del DTF está configurado para poner tinta blanca debajo de cualquier pixel que no sea 100% transparente. Si tienes una sombra negra con 10% de opacidad, el RIP imprimirá una gota de negro diluido Y una plasta de tinta blanca sólida debajo. Resultado: tu sombra negra se verá blanca o gris clara en la tela.</p>
            <h3>Solución: Trama (Halftone) o Knockout</h3>
            <p>La solución profesional para que el DTF se fusione impecablemente con las camisetas oscuras (sin parches plásticos duros) es crear un "Knockout" de negro (borrar el negro del diseño para que el color de la camiseta funja como sombra) o tramarlo (convertir el desvanecido en puntos sólidos usando Color Halftone). Si son puntos sólidos de 100% opacidad, el RIP le pondrá blanco debajo exacto al punto y tu cerebro verá una sombra suave desde lejos.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> En tu programa RIP, asegúrate de tener bien configurada la opción de "Color Tolerance" y usar la herramienta de eliminación de color de fondo (Background Color Removal) si vas a imprimir sombras negras sobre camisetas negras. ¡Esto ahorrará tinta y salvará tus diseños!</p>
            </div>`
    },
    { 
        type: 'academy', title: "Cómo manejar gradientes en serigrafía", level: "intermedio", num: 25,
        body: `
            <p>En el papel, un degradado de rojo a azul es trivial. En serigrafía básica de colores sólidos, esto es teóricamente imposible porque las tintas no se mezclan automáticamente en la tela. Sin embargo, existen dos técnicas para lograr gradientes sin usar cuatricromía compleja.</p>
            <h3>1. Degradado en malla (Split Fountain)</h3>
            <p>Es una técnica analógica y muy artística. Revelas el bloque entero en tu malla. Luego, colocas tinta roja en el lado izquierdo del marco y tinta azul en el lado derecho. Al pasar la racleta varias veces, las dos tintas chocarán en el centro, creando un morado suave y perfectamente fusionado. Cada camiseta será única y el degradado cambiará sutilmente a lo largo de la producción. Es ideal para fondos o cielos atardeceres.</p>
            <h3>2. Degradado por Semitonos (Halftones Spot Color)</h3>
            <p>Si necesitas que el degradado sea matemáticamente exacto en las 500 camisetas, debes separar el rojo en un fotolito con semitonos que se va haciendo chiquito hacia la derecha, y el azul en un fotolito que se hace chiquito hacia la izquierda. Imprimes uno encima del otro en el pulpo, y los puntitos intercalados crearán la ilusión de fusión.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Si haces Split Fountain (degradado en malla), procura no dar demasiadas pasadas extra para limpiar el marco, o el color del medio (morado) terminará invadiendo todo el marco y matando el rojo y azul originales.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Corrección selectiva de color", level: "intermedio", num: 26,
        body: `
            <p>Has recibido una fotografía de moda y el cliente pide que la chaqueta del modelo sea más azul y brillante, pero sin alterar el tono de la piel ni el fondo. En vez de intentar recortar la chaqueta con la pluma (que toma horas), usaremos Corrección Selectiva.</p>
            <h3>Capa de Ajuste: Tono/Saturación (Hue/Saturation)</h3>
            <p>En Photoshop, abre una capa de ajuste de Tono/Saturación. Por defecto dice "Todos" (Master). Haz clic ahí y elige el color que más se parezca a la chaqueta (ej. Cianes). Ahora usa los goteros que aparecen abajo para hacer clic en el color exacto de la prenda. Photoshop ahora aislará ese rango cromático. Mueve el deslizador de "Tono" (Hue) libremente y verás que SOLO la chaqueta cambia de color sin tocar el resto de la foto.</p>
            <h3>Ajuste de Color Selectivo (Selective Color)</h3>
            <p>Si lo que quieres no es cambiar el color drásticamente sino *limpiarlo* para impresión (por ejemplo, los rojos se ven sucios porque tienen mucho cian oculto), usa la capa de "Corrección Selectiva". Ve a los Rojos, y baja el deslizador de Cian a -20%. Los rojos quedarán puros, brillantes y evitarán que la impresora DTF suelte gotas de azul que ensucien la imagen.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Esta técnica es oro puro cuando descargas vectores JPG de internet que tienen fondos "negros" que no son realmente negros (son gris oscuro tipo RGB 15,15,15). Usa niveles o corrección selectiva en el canal Negro para empujarlo al 100% de oscuridad, evitando que tu RIP lo asuma como "gris" e imprima puntitos blancos por error.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Separación indexada de 8 canales", level: "avanzado", num: 27,
        body: `
            <p>Entramos a las grandes ligas. La separación indexada (Color Indexing) es la técnica reina de la serigrafía hiperrealista rockera y vintage. A diferencia de CMYK (donde 4 tintas translúcidas se mezclan), en Indexado usamos tintas sólidas, opacas e intensas (Spot Colors) que NO se superponen, sino que se colocan lado a lado como un mosaico de píxeles puros.</p>
            <h3>El proceso de Difusión (Dither)</h3>
            <p>El diseño debe estar tamaño real a 200 DPI (no 300, 200 es clave). En Photoshop, ve a Imagen > Modo > Color Indexado. Cambia la Paleta a "Personalizada" (Custom) o Local Perceptual, elige 8 colores, y marca el Dither (Tramado) en "Difusión". Photoshop calculará los 8 colores predominantes de la imagen y la reconstruirá usando únicamente píxeles sólidos de esos 8 colores esparcidos al azar.</p>
            <h3>Ventajas sobre el CMYK</h3>
            <p>1. CERO Moiré (porque los píxeles caen al azar, no hay ángulos ni tramas de choque). <br>2. Consistencia absoluta en el taller (la camiseta 1 será exactamente igual a la camiseta 1000). <br>3. Brillo extremo, porque imprimes colores Pantone exactos (rojo puro, azul puro) en lugar de intentar mezclarlos ópticamente.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> La separación indexada requiere un rigor técnico brutal en el taller. Los 8 marcos deben tener la misma tensión alta, malla 90 a 120 hilos/cm, y el registro (encaje) de tu carrusel debe ser micrómetrico, ya que los colores no se superponen para esconder errores, encajan borde con borde.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Proceso simulado para telas oscuras", level: "avanzado", num: 28,
        body: `
            <p>La "Simulated Process Color" (Cuatricromía Simulada) es el estándar americano de la alta serigrafía para imprimir arte fotorealista sobre camisetas negras. No usamos CMYK. Usamos Blancos, Grises, Rojos sangre, y Azules oscuros (Pantones Spot) con tramas de semitonos para "simular" una fotografía mezclándolos con la base de la camiseta.</p>
            <h3>El canal de la Base Blanca y el Blanco de Realce (Highlight White)</h3>
            <p>El secreto reside en que usamos DOS blancos. El primero es la "Base Blanca" (Underbase), que se imprime en malla gruesa (60 hilos) donde hay color, y luego se seca con Flash Cure. Luego se imprimen todos los colores de semitono (Rojo, Azul, Dorado) sobre ella, húmedo sobre húmedo. Finalmente, el último marco es el "Blanco de Realce", impreso con malla fina (120 hilos) directo sobre la base seca para dar los destellos, luces en ojos o reflejos de metal brillantes.</p>
            <h3>El Negro de la Camiseta como Color</h3>
            <p>En el diseño simulado sobre tela negra, ELIMINAMOS la tinta negra del fotolito. Dejamos el fondo hueco (transparente en las separaciones). La propia oscuridad del algodón fungirá como nuestras sombras. Esto reduce la cantidad de tinta en la prenda, dando un estampado que "respira" y tiene un tacto premium súper suave.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Separar cuatricromía simulada manualmente en canales toma entre 1 a 3 horas de trabajo de un experto. Te recomiendo dominar el concepto, y luego apoyarte en software o plugins especializados (como Separation Studio o T-Seps) para automatizar los cálculos algorítmicos en minutos.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Calibración de monitores para sublimación", level: "avanzado", num: 29,
        body: `
            <p>El monitor miente. Su luz trasera hace que todo se vea más brillante y saturado de lo que realmente es. Si trabajas diseñando sublimación en una laptop genérica viendo todo perfecto, y al planchar la camiseta el cliente se queja de que el rojo se ve naranja opaco, el problema es la falta de calibración (Color Management).</p>
            <h3>El Colorímetro (Hardware de calibración)</h3>
            <p>No intentes calibrar "a ojo" bajando el brillo de la pantalla. Un profesional invierte en un dispositivo de hardware como el *SpyderX* o *Calibrite ColorChecker*. Lo cuelgas en el monitor, el software pasa parches de color, lee cómo tu pantalla está mintiendo (si tiende al azul o al cálido), y genera un Perfil ICC de Monitor que corrige Windows/Mac para que te muestre los colores con honestidad fotográfica.</p>
            <h3>Soft Proofing (Prueba de Color en Pantalla) en Photoshop</h3>
            <p>Incluso calibrado, el monitor emite luz (RGB) y la tela no. En Photoshop, ve a Vista > Ajuste de Prueba (Proof Setup) > A Medida (Custom). Selecciona el Perfil ICC de tu impresora de Sublimación o DTF, y activa "Simular color del papel". Tu foto de repente se verá un poco más apagada. ¡Ese es el color REAL que saldrá de la plancha térmica! Edita basado en esa prueba.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Trabaja siempre en un entorno de luz neutra. Si diseñas en un cuarto oscuro, o frente a una ventana enorme que mete luz del sol por la tarde, tus ojos (pupilas) cambiarán su percepción del contraste. Los estudios de pre-prensa no tienen ventanas e iluminan la sala con focos LED a 5000K (Luz de Día Neutra).</p>
            </div>`
    },
    { 
        type: 'academy', title: "Creación de perfiles ICC personalizados", level: "avanzado", num: 30,
        body: `
            <p>Si la lección anterior calibró tus ojos (el monitor), esta lección calibra tus manos (la impresora). Un perfil ICC estándar bajado de internet asume que estás usando la tinta "A" con el papel "B". Si tú compras otra marca de papel de sublimación porque estaba de oferta, los colores se irán a la basura porque el papel absorbe distinto. Necesitas crear tu propio Perfil ICC.</p>
            <h3>El Espectrofotómetro</h3>
            <p>Requieres equipo pesado (como el *X-Rite i1Pro 3*). Imprimes desde el software una carta con 2,000 cuadritos de colores sin ninguna corrección. Tomas esa hoja de papel de sublimación y *la planchas sobre la tela que vas a usar* (poliéster blanco). Con el espectrofotómetro, escaneas los 2,000 cuadritos ya estampados en la tela física.</p>
            <h3>El nacimiento del Perfil</h3>
            <p>El equipo leerá que el cuadro que la computadora ordenó como "Cian 100%" salió como "Cian 85% y un poco amarillento" por culpa de la tela y la plancha. El software generará el archivo ICC que compensa matemáticamente eso, ordenándole a la impresora escupir 115% de Cian para lograr el 100% en la tela real. ¡Perfección total de color!</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Comprar un espectrofotómetro cuesta más de $1,500 USD. Si no puedes permitírtelo, puedes contratar servicios remotos de perfilado: te envían un archivo de prueba PDF, lo imprimes, lo planchas, se lo mandas por correo físico, y ellos lo escanean y te devuelven el perfil por email. Es una inversión económica e indispensable.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Automatización con Acciones de Photoshop", level: "avanzado", num: 31,
        body: `
            <p>Cuando un cliente escolar te envía 100 fotos de alumnos, y tienes que cortarlas en círculo, ponerles filtro de alto contraste, agregarles un borde de 5 píxeles y exportarlas en PNG para sublimar tazas... si lo haces a mano una por una, tardarás 6 horas. Con Acciones de Photoshop y Procesamiento por Lotes (Batch), lo harás en 2 minutos mientras tomas café.</p>
            <h3>Grabación de una Acción</h3>
            <p>Abre la ventana de Acciones (Actions). Crea un nuevo archivo y dale al botón de Grabar (círculo rojo). Photoshop empezará a memorizar cada click que hagas. Haz el proceso una vez: 1. Convertir a Blanco y negro, 2. Aumentar contraste, 3. Recortar al centro, 4. Guardar como JPG. Cuando termines, detén la grabación. ¡Acabas de crear un robot!</p>
            <h3>Procesamiento por Lotes (Batch) y Droplets</h3>
            <p>Ve a Archivo > Automatizar > Lote (Batch). Selecciona tu acción grabada, dile a Photoshop cuál es la carpeta de origen (las 100 fotos originales) y cuál es la carpeta de destino. Presiona OK y aléjate del mouse. Verás cómo Photoshop abre, edita y guarda 10 fotos por segundo a velocidad inhumana.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Puedes incluso compilar una acción como un "Droplet" (Archivo > Automatizar > Crear Droplet). Esto creará un icono ejecutable .exe en el escritorio de tu Windows. Si arrastras y sueltas una carpeta llena de imágenes sobre ese icono, Photoshop arrancará solo y hará todo el trabajo en segundo plano.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Separación de color con canales alfa", level: "avanzado", num: 32,
        body: `
            <p>Trabajar con capas está bien para arte general, pero para pre-prensa de serigrafía (creación de pantallas), el nivel maestro exige trabajar en la paleta de Canales. Los canales no contienen información de color, contienen información de luz y opacidad pura. Un canal Alfa (Alpha Channel) es una selección en escala de grises guardada permanentemente.</p>
            <h3>Extracción de tintas planas</h3>
            <p>Selecciona áreas específicas (usando Gama de Colores / Color Range). Ve a la pestaña Canales y crea un nuevo Canal (quedará totalmente negro). Llena tu selección con Blanco Puro (100% K). Lo que sea blanco en este canal, es donde la tinta pasará por la malla. Lo negro, estará bloqueado por la emulsión.</p>
            <h3>Doble clic para convertir a Tintas Planas (Spot Channels)</h3>
            <p>Si haces doble clic sobre tu canal alfa recién creado, se abrirán opciones. Cambia de "Áreas seleccionadas" a "Color de Tinta Plana" (Spot Color). Aquí puedes asignar un Pantone, por ejemplo un verde neón, con una solidez (solidity) del 85%. Verás en pantalla exactamente cómo lucirá esa tinta de serigrafía impresa sobre la base. Haz esto con 6 canales diferentes y verás la camiseta terminada digitalmente antes de tocar una sola malla.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Al exportar un archivo de Photoshop (PSD, DCS 2.0 o PDF) hacia el programa de ripeo (RIP) para imprimir los fotolitos en tu Epson, el RIP reconocerá automáticamente estos Canales Planos e imprimirá una hoja de acetato separada por cada canal que hayas creado, respetando sus opacidades como tramas de medios tonos perfectas.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Manejo avanzado de reventes (Trapping)", level: "avanzado", num: 33,
        body: `
            <p>Si eres estampador de serigrafía, odias la luz blanca entre dos colores mal registrados. El algodón encoge con el calor de las planchas flash. Un círculo amarillo dentro de un cuadro negro, después de pasar por la lámpara, dejará un "hueco" blanco visible porque la tela se achicó. El Trapping (Revente) lo soluciona en la fase de diseño.</p>
            <h3>Choke vs Spread (Engordar o Adelgazar)</h3>
            <p>La regla sagrada es: <strong>El color más claro debe invadir (meterse debajo) del color más oscuro</strong>. El color oscuro (que suele imprimirse de último) disimulará la mezcla. Si tienes texto amarillo sobre fondo azul marino, no le des un borde azul al amarillo. Añádele un trazo exterior al amarillo para que se engorde y se meta por debajo de las letras azules (Spread).</p>
            <h3>Trapping automático en Illustrator</h3>
            <p>Hacer esto línea por línea en diseños complejos es un infierno. En Illustrator, selecciona todos tus vectores y ve a la ventana de "Buscatrazos" (Pathfinder) > Opciones del Panel > Crear Reventes (Trap). El software calculará algorítmicamente las intersecciones y expandirá automáticamente los colores claros 0.5 puntos bajo los oscuros. Dile adiós a los hilos blancos de falla de registro.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Para bases blancas (Underbases), el trapping funciona al revés (Choke). Siempre debes "ahorcar" o encoger la plasta blanca base un par de píxeles para que los colores de arriba (CMYK o Plastisol regular) la tapen y los bordes blancos no asomen feamente en los contornos de tu estampado oscuro.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Técnicas de cuatricromía de alta definición", level: "avanzado", num: 34,
        body: `
            <p>Imprimir fotografías hiperrealistas en serigrafía tradicional (no digital) es el pináculo de la habilidad del estampador. Si dominaste los ángulos (CMYK) y las tramas en el nivel intermedio, aquí hablamos de infraestructura de alto rendimiento.</p>
            <h3>Tensión Extrema: La clave del High-Def</h3>
            <p>Para imprimir una línea LPI 65 (foto calidad revista), necesitas puntos microscópicos en tu fotolito. Si los intentas revelar en una malla de madera floja, los puntos chocarán con los hilos. Debes usar mallas teñidas de amarillo (para evitar refracción de la luz UV al revelar) con un mínimo de 140 hilos/cm (355 mesh), tensionadas en marcos neumáticos a 30 Newtons.</p>
            <h3>Fotopolímeros puros y curado de emulsión</h3>
            <p>Las emulsiones Diazo (las verdes económicas) no tienen el poder de resolución o detalle (Edge Definition) para aguantar puntos microscópicos. Debes invertir en Emulsiones de Fotopolímero Puro (SBQ), que son azules, rosas o violetas. Se revelan en 10 segundos en luces LED de alta potencia, garantizando bordes duros cortantes. Imprimir húmedo sobre húmedo con tintas plastisol baja viscosidad (Soft Hand) evitará que el punto reviente en la camiseta.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Una foto de alto contraste necesita racletas duras (75-90 Durometros). Si usas racletas muy suaves (60 Durometros), depositarás una capa de tinta muy gorda. Los medios tonos finos se empastarán, y la cara de la persona en la camiseta terminará viéndose oscura, borrosa y sin brillo.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Efectos especiales: Foil, relieve y discharge", level: "avanzado", num: 35,
        body: `
            <p>El mercado de la moda urbana ya no se conforma con colores planos. Pagan extra por tacto, brillo y experiencias. Implementar técnicas especiales multiplica por 3 el valor percibido de tu prenda y aleja a los competidores novatos.</p>
            <h3>Foil (Papel Metálico)</h3>
            <p>Para estampar oro, plata o acabados holográficos como espejos reales, imprimes en serigrafía un "Adhesivo para Foil" (Foil Adhesive). Se cursa igual que el plastisol. A la salida del horno, colocas una hoja de papel foil sobre el diseño adhesivo, lo metes a la plancha térmica (160°C por 12s con mucha presión), lo dejas ENFRIAR TOTALMENTE, y despegas la lámina de un tirón rápido (Cold Peel). El oro quedará adherido únicamente donde imprimiste la pega.</p>
            <h3>Relieve o Alta Densidad (High Density / Puff)</h3>
            <p>Puedes lograrlo de dos formas. El Aditivo Puff esponja y hace inflar el plastisol normal como espuma al pasar por el calor. El efecto 3D Alta Densidad (High Density) utiliza mallas especiales súper gruesas (capilar de 200 micras) para depositar un bloque masivo de tinta plastisol que, al secarse, queda como un sello de goma sólido y brillante con ángulos a 90 grados cortantes en la prenda.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> No mezcles estas técnicas al azar. La tinta puff arruinará un diseño fino porque se infla hacia los lados y pierde el detalle. Úsala solo en letras anchas y logos masivos. Además, recuerda planchar las prendas con Puff DENTRO a FUERA, de lo contrario la plancha térmica aplastará la burbuja y la arruinará de forma irreversible.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Optimización de archivos para corte láser", level: "avanzado", num: 36,
        body: `
            <p>La tecnología de grabado y corte láser (CO2) es la evolución del plotter de corte clásico. Es capaz de fabricar parches de cuero para gorras, cortar tela para apliques de sublimación o hacer detalles que una cuchilla reventaría. Pero el láser es una herramienta matemática destructiva; si el archivo está mal, quemarás material.</p>
            <h3>El Código de Colores Universal</h3>
            <p>Los softwares de láser (como LightBurn o RDWorks) leen los colores de tus vectores como órdenes de potencia diferentes. Acostumbra a tu diseñador a usar esta regla estricta:<br>
            - <strong>Trazos Rojos:</strong> Corte pasante (100% de potencia para cortar el material de lado a lado).<br>
            - <strong>Relleno Negro:</strong> Grabado o Rasterizado (Engrave) (Quema la superficie para dejar oscuridad, ideal para logotipos).<br>
            - <strong>Trazos Azules o Verdes:</strong> Marcado o Score (Baja potencia, solo raya superficialmente las líneas guía en el cuero para coserlo luego).</p>
            <h3>Limpieza de Nodos Dobles y Trazos Sueltos</h3>
            <p>La cuchilla de un plotter pasa y ya. El haz de luz del láser tiene grosor (Kerf). Si en tu archivo de Illustrator dejaste dos rectángulos pegados donde las líneas se superponen (trazos dobles invisibles al ojo), el láser pasará dos veces por el mismo milímetro quemando el cuero y prendiendo fuego a la pieza. Usa la ventana Buscatrazos > Unificar para colapsar toda la figura en un solo trazo maestro continuo perimetral.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Elimina todos los colores de relleno antes de enviar el marco a corte, deja solo líneas ultrafinas (0.001 puntos en Corel o Illustrator). Un láser guiado correctamente cortará un parche de cuero con detalles milimétricos en menos de 10 segundos, incrementando tu productividad drásticamente.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Flujo de trabajo para grandes producciones", level: "avanzado", num: 37,
        body: `
            <p>Hacer 50 camisetas perfectas requiere técnica. Hacer 5,000 camisetas en una semana cumpliendo el plazo de entrega corporativo y manteniendo márgenes de rentabilidad, requiere ingeniería de procesos. Si el caos manda en el taller, quebrarás en el gran salto.</p>
            <h3>Estaciones de embudo (Cuellos de Botella)</h3>
            <p>El error clásico del empresario estampador es comprar un pulpo automático de 10 colores gigantesco (que escupe 800 prendas/hora), pero mantener el mismo horno túnel eléctrico pequeñito, o tener a una sola persona doblando y empaquetando al final. De nada sirve imprimir rápido si el horno quema la tela por hacer que la banda vaya rápido. Mide los tiempos de ciclo. Si tu cuello de botella es el revelado de marcos, invierte ahí (ej. máquina CTS - Computer to Screen) en lugar de otra prensa.</p>
            <h3>La Orden de Producción (Work Order) en Pre-prensa</h3>
            <p>El estampador que maneja las racletas o las planchas de calor JAMÁS debe preguntarle al diseñador o al jefe "¿Dónde va este logo o qué pantone es?". La Hoja de Trabajo debe acompañar las prendas físicamente en una carpeta. Debe incluir: Medida en CM exactos desde el cuello hacia abajo, Tintas Pantone específicas, temperatura de horno y lote fotográfico de la muestra aprobada.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Establece la "Regla de los 5 minutos". Antes de empezar a producir las 5,000 camisetas, el operario debe estampar UNA prenda, lavarla con jabón duro, secarla, y comprobar adherencia. Perder 5 minutos probando la muestra 0 es la diferencia entre el éxito y demandar 5,000 camisetas peladas devueltas.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Resolución de problemas de moiré", level: "avanzado", num: 38,
        body: `
            <p>Has hecho todo bien. Los ángulos de los 4 canales CMYK están perfectos. Imprimes tu cyan, pasas al magenta, y de repente, la camiseta muestra un patrón psicodélico horrendo de cruces diagonales sobre el diseño. Bienvenida sea la bestia final de la serigrafía: El Moiré por Malla.</p>
            <h3>El Choque Malla vs Trama (Mesh Interference)</h3>
            <p>El Moiré no solo ocurre cuando los ángulos de los puntos (fotolito) chocan entre sí. También ocurre cuando la trama ordenada de puntos que imprimiste interactúa fatalmente con el patrón cuadriculado de los hilos de poliéster físicos que conforman la Malla de tu marco. ¡Son dos rejillas matemáticas cruzándose!</p>
            <h3>La Solución: El truco de la rotación</h3>
            <p>Para romper esa interferencia matemática de las rejillas, los impresores profesionales giran ligeramente TODO el canal fotográfico unos cuantos grados (normalmente de 4 a 7 grados extra respecto a la cuadratura de la malla), O aún mejor, pegan el acetato en la malla con una inclinación deliberada de unos grados a la derecha. Cuando imprimen la tela, el Moiré por choque desaparece al perder la alineación estricta de 90 grados.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Adquiere el hábito de contar la proporción mágica de la LPI vs Mesh Count. La malla (Hilos por cm) debe ser por lo menos entre 2.5 a 3.0 veces mayor que tu lineatura (LPI) del fotolito. Si usas un fotolito de LPI 55 en una malla de 120 hilos (55 x 2.18), estás jugando peligrosamente en el límite de choque de moiré; mejor sube a una malla de 150 hilos.</p>
            </div>`
    }
];

let filesWritten = 0;
const academyPath = path.join(__dirname, 'academia');

batch3.forEach(item => {
    const slug = toSlug(item.title) + '.html';
    const filePath = path.join(academyPath, slug);
    
    const bg = item.level === 'basico' ? 'rgba(34, 197, 94, 0.2)' : item.level === 'intermedio' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)';
    const col = item.level === 'basico' ? '#4ade80' : item.level === 'intermedio' ? '#facc15' : '#f87171';
    const txt = item.level === 'basico' ? '🟢 Básico' : item.level === 'intermedio' ? '🟡 Intermedio' : '🔴 Avanzado';
    
    const metaSection = `<div class="mc-post-meta">
        <span style="background: ${bg}; color: ${col}; padding: 4px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${txt}</span>
        <span style="color: var(--mc-text-muted); font-weight: 600;">Lección ${item.num}</span>
    </div>`;

    const html = `<!DOCTYPE html>
<html data-bs-theme="dark" lang="es-419">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>${item.title} | Migo Creativo</title>
    <meta name="description" content="Aprende sobre ${item.title} con las lecciones avanzadas de Migo Creativo.">
    <link rel="icon" type="image/jpeg" href="../assets/img/LOGO/LOGO NUEVO.jpg">
    <link rel="stylesheet" href="../assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
    <link rel="stylesheet" href="../assets/css/bss-overrides.css">
    <style>
        .mc-post-header { padding-top: 120px; }
        .mc-post-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 2rem; }
        .mc-post-body { max-width: 780px; margin: 0 auto; }
        .mc-post-body h2 { font-size: 1.75rem; margin-top: 3rem; margin-bottom: 1rem; border-bottom: 2px solid var(--mc-glass-border); padding-bottom: 0.5rem; }
        .mc-post-body h3 { font-size: 1.4rem; margin-top: 2rem; margin-bottom: 1rem; color: var(--mc-orange-light); font-weight: 700; }
        .mc-post-body p { color: var(--mc-text-muted); font-size: 1.1rem; line-height: 1.85; margin-bottom: 1.25rem; }
        .mc-post-body ul { color: var(--mc-text-muted); font-size: 1.1rem; line-height: 1.85; margin-bottom: 1.5rem; }
        .mc-highlight-box { background: rgba(255, 122, 0, 0.05); border-left: 4px solid var(--mc-orange); padding: 1.5rem; margin: 2.5rem 0; border-radius: var(--mc-radius-sm); border-top: 1px solid var(--mc-glass-border); border-right: 1px solid var(--mc-glass-border); border-bottom: 1px solid var(--mc-glass-border); }
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
                    <li class="nav-item"><a class="nav-link active" href="../academia/index.html">Academia</a></li>
                    <li class="nav-item"><a class="nav-link" href="../blog/index.html">Blog</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="mc-post-header pb-5" style="background: var(--mc-bg-deep); border-bottom: 1px solid var(--mc-glass-border);">
        <div class="container text-center">
            ${metaSection}
            <h1 style="font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; max-width: 900px; margin-left: auto; margin-right: auto;">${item.title}</h1>
        </div>
    </header>

    <section class="py-5" style="background: var(--mc-bg-surface);">
        <div class="container">
            <div class="mc-post-body mc-reveal">
                ${item.body}
                
                <div class="mc-post-author-box">
                    <img src="../assets/img/LOGO/LOGO NUEVO.jpg" alt="Miguel Heredia">
                    <div>
                        <h4 style="margin-bottom: 0.25rem;">Miguel Heredia</h4>
                        <p style="margin-bottom: 0;">Diseñador experto en serigrafía, DTF y sublimación. CEO de Migo Creativo en Bogotá, Colombia.</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <a href="index.html" class="mc-btn-primary">← Volver a la Academia</a>
            </div>
        </div>
    </section>

    <footer class="mc-footer"><div class="container py-4"><div class="mc-footer-bottom text-center"><p class="mb-0">© 2026 Migo Creativo | Hecho con ❤️ en Colombia</p></div></div></footer>
    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
    <script src="../assets/js/academia-progress.js"></script>
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
    
    fs.writeFileSync(filePath, html);
    filesWritten++;
});

console.log(`Lote 3 completado. Se han reescrito ${filesWritten} lecciones de academia con contenido técnico avanzado y único.`);
