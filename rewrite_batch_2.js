const fs = require('fs');
const path = require('path');

function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const batch2 = [
    // --- ÚLTIMOS 10 ARTÍCULOS DE BLOG ---
    { 
        type: 'blog', title: "Sublimación 3D en carcasas de celular", tag: "Sublimación", date: "Abr 03, 2026",
        body: `
            <p>Las carcasas de celular personalizadas tienen uno de los márgenes de ganancia más altos de la industria. Sin embargo, lograr que la tinta de sublimación penetre perfectamente por los bordes curvos sin dejar arrugas es un arte. Aquí desglosamos el proceso de Sublimación 3D en hornos de vacío.</p>
            <h3>1. El molde y la membrana de silicona</h3>
            <p>A diferencia de la plancha plana, la máquina 3D usa una bomba de vacío que succiona una membrana de silicona, forzando el papel a abrazar la carcasa de polímero. Si tu membrana tiene micro-perforaciones, perderá vacío y los bordes quedarán blancos. Revisa la estanqueidad cada mes y reemplaza la silicona si pierde elasticidad.</p>
            <h3>2. Cortes de alivio en el papel</h3>
            <p>El papel de sublimación no es elástico. Cuando la máquina hace vacío sobre las esquinas de una carcasa de iPhone, el papel se arruga y crea rayas blancas horribles en el estampado. Debes hacer 4 pequeños "cortes de alivio" (pequeños triángulos) en las esquinas del papel impreso. Al bajar el vacío, las pestañas del papel se solaparán en lugar de arrugarse.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Las carcasas de plástico se deforman a 190°C. Siempre debes introducir el "molde metálico o de aluminio" enfriador dentro de la carcasa antes de meterla al horno. Y lo más importante: al sacarla caliente, déjala enfriar en el molde de aluminio; si la sacas antes de tiempo, se encogerá y el teléfono del cliente nunca encajará.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Vinilo Textil vs DTF: ¿Cuál gana en 2026?", tag: "Comparativa", date: "Abr 02, 2026",
        body: `
            <p>Hace cinco años, el vinilo textil era el rey indiscutible para estampados desde una unidad en prendas oscuras de algodón. Hoy, el DTF ha invadido los talleres a nivel global. ¿Aún hay espacio para el plotter de corte? Analizamos los costos y tiempos en 2026.</p>
            <h3>1. Tiempo de Producción (El verdadero costo)</h3>
            <p>Imagina que un cliente pide 30 camisetas negras con un logo a 3 colores. En vinilo textil: debes cargar 3 rollos distintos en el plotter, cortar, y luego pasar horas "depilando" (weeding) los detalles minúsculos con un gancho, para finalmente planchar color por color. En DTF: envías a imprimir en CMYK+W, le pones polvo, curas y planchas de un solo golpe. El DTF gana por paliza en tiempo operativo.</p>
            <h3>2. Efectos Especiales y Especialización</h3>
            <p>Aquí es donde el vinilo sobrevive y domina. Si un cliente busca acabados reflectivos reales (3M), holográficos intensos, vinilo puff (relieve 3D), o vinilos texturizados tipo fibra de carbono, el plotter de corte sigue siendo obligatorio. El DTF no puede simular un espejo metálico real.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> No vendas tus plotters de corte. El negocio más rentable en 2026 es el "Híbrido". Estampa la imagen principal en DTF, pero agrega acentos (como nombres, números de camisetas deportivas o escudos reflectivos) en Vinilo Textil de poliuretano. Esto eleva el valor percibido de la prenda drásticamente.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Tensionado correcto de mallas de serigrafía", tag: "Serigrafía", date: "Abr 01, 2026",
        body: `
            <p>La tensión de la malla es el secreto mejor guardado de los estampadores profesionales. Imprimir con mallas flojas es como intentar dibujar sobre un colchón de agua: tus bordes saldrán borrosos, gastarás el doble de tinta y tu espalda sufrirá empujando la racleta.</p>
            <h3>1. El concepto del Fuera de Contacto (Off-Contact)</h3>
            <p>En serigrafía, la malla no debe tocar la camiseta mientras está en reposo. Debe haber una separación de 2 a 3 milímetros. Al pasar la racleta, la malla toca la tela, deja la tinta, y "salta" inmediatamente hacia arriba. Este "salto" corta la tinta limpiamente. Si la malla está floja, se quedará pegada a la tela y embarrará el diseño al levantar el marco.</p>
            <h3>2. ¿Cuántos Newtons necesito?</h3>
            <p>La tensión se mide en Newtons/cm (N/cm) usando un tensiómetro. Para marcos de madera grapados a mano, con suerte llegas a 12-15 N/cm, lo cual es terrible para medias tintas. Para cuatricromía y detalles ultra finos, necesitas marcos de aluminio tensionados neumáticamente entre 25 y 30 N/cm.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Deja de usar marcos de madera si quieres ser profesional. La madera se deforma con el agua al lavar, aflojando la malla en el centro. Invierte en mallas retensionables (tipo Newman) o marcos de aluminio pegados con adhesivo de dos componentes. Notarás que tus impresiones consumen un 30% menos de tinta por pase.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Cómo calcular mermas y desperdicios", tag: "Negocios", date: "Mar 31, 2026",
        body: `
            <p>El margen de error humano y de maquinaria es inevitable. Un cabezal tapado, una camiseta quemada o un registro movido pueden destruir la rentabilidad de todo un pedido si no incluyes el costo de "merma" dentro de tus cotizaciones matemáticas.</p>
            <h3>1. Regla del 3% al 5%</h3>
            <p>Nunca asumas que vas a estampar 100 camisetas sin cometer un solo error. En pedidos masivos de serigrafía o DTF, añade siempre un porcentaje de merma al costo total. Si el cliente pide 100 unidades, debes facturar el costo operativo de procesar 103 o 105 unidades. El cliente final no lo ve desglosado, simplemente va diluido en el precio unitario.</p>
            <h3>2. Compra de prendas "de más"</h3>
            <p>Si el cliente trae sus propias prendas (maquila), hazle firmar un contrato donde aceptas un margen de merma del 3% sin responsabilidad de reposición de la prenda original. Si tú pones la prenda, compra siempre una de cada talla extra. Si arruinas una talla M, la repones con tu stock de seguridad y entregas el pedido perfecto. La que sobra, la usas para hacer pruebas de test.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> En sublimación rollo a rollo, el inicio y el final de la tela siempre quedan en blanco por el arrastre de la calandra. Debes sumar medio metro lineal de desperdicio por cada rollo cargado. No regales ese metro de papel ni de tela, cóbraselo matemáticamente al pedido.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Tintas de descarga (Discharge) para principiantes", tag: "Serigrafía", date: "Mar 30, 2026",
        body: `
            <p>La tinta Discharge (Descarga o Corrosión) es magia química. En lugar de pintar sobre la tela negra con tinta blanca gruesa, el discharge decolora el tinte original de la camiseta y deposita un nuevo pigmento al mismo tiempo. ¿El resultado? Tacto CERO en algodón oscuro.</p>
            <h3>1. El principio del activador</h3>
            <p>A diferencia del plastisol, el discharge requiere mezclar un polvo activador (Sal de Zinc o ZFS) con la base transparente o pigmentada, usualmente en un porcentaje del 4% al 6%. OJO: una vez mezclado, la vida útil de la tinta es de máximo 8 a 12 horas. Lo que sobre, debes botarlo o perderá su poder de decoloración.</p>
            <h3>2. Telas reactivas (El secreto)</h3>
            <p>El discharge SOLO funciona en prendas teñidas con colorantes reactivos. Si intentas aplicar discharge sobre una camiseta teñida con colorantes directos o que tenga poliéster en su composición, el resultado será un gris sucio y muerto, o simplemente no pasará nada. Pide siempre camisetas "aptas para discharge" o 100% algodón pre-encogido de alta calidad.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Las tintas de corrosión liberan formaldehído al pasar por el horno de curado. Suelta un olor extremadamente fuerte y tóxico (parecido a azufre). No intentes curar discharge en un taller pequeño sin una campana extractora de aire conectada directamente a los ductos del horno flash o túnel. La ventilación es obligatoria.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Personalización de gorras: Técnicas y trucos", tag: "Técnicas", date: "Mar 29, 2026",
        body: `
            <p>Las gorras trucker y snapback son pilares del merchandising. Sin embargo, su forma curva y la variedad enorme de grosores en la frente (goma eva, malla, poliéster, algodón) hacen que plancharlas sea un reto que genera muchas mermas.</p>
            <h3>1. La Plancha curva correcta</h3>
            <p>Las resistencias térmicas genéricas para gorras suelen venir con una curva estándar que NO encaja en todas las frentes. Si la plancha no hace contacto total con la frente rígida de la gorra, el DTF o el vinilo no pegará en los bordes. Utiliza el gancho tensor trasero de la plancha para estirar la gorra como un tambor antes de bajar la resistencia.</p>
            <h3>2. ¿Sublimación, Vinilo o DTF en gorras?</h3>
            <ul>
                <li><strong>Sublimación:</strong> Excelente para gorras Trucker blancas. Rápido y sin tacto. Tiempo recomendado: 180°C por 60s.</li>
                <li><strong>DTF Textil:</strong> Ideal para gorras oscuras de poliéster. Se adhiere perfecto con polvo fino, pero evita diseños que crucen la costura central, ya que el relieve del hilo puede generar grietas al curar.</li>
                <li><strong>Parches bordados o grabados láser (DTF UV):</strong> La mayor tendencia actual es planchar parches de cuero sintético grabados con láser, o usar DTF UV rígido para letras 3D flotantes.</li>
            </ul>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> El peor error al estampar vinilo o DTF en la frente de una gorra armada es que el calor funde el hilo de plástico duro de la visera. Protege siempre la unión entre la visera y la frente con un trozo de teflón o cinta térmica doblada para evitar marcar o deformar el borde de la visera.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Qué hacer si tu impresora DTF no imprime blanco", tag: "DTF", date: "Mar 28, 2026",
        body: `
            <p>El pánico entra en el taller cuando la hoja sale del RIP y los colores CMYK están perfectos, pero la capa de tinta blanca brilla por su ausencia, arruinando por completo el transfer. Analicemos el protocolo de emergencia.</p>
            <h3>1. ¿Problema de Software o de Hardware?</h3>
            <p>Primero, detente. Revisa tu software RIP (Maintop, Flexi, CADlink). ¿Seleccionaste la opción "Imprimir Canal Blanco" (Print White)? ¿Verificaste que la imagen tenga un canal spot o un fondo transparente? Si envías un JPG con fondo blanco, el RIP no imprimirá base de titanio. Haz una prueba con un archivo PNG de prueba que sepas que funciona.</p>
            <h3>2. Aire en los Dampers</h3>
            <p>Si el software está bien, revisa los dampers. La tinta blanca es muy espesa. Si ves aire (burbujas gigantes) en las mangueras que llegan a los inyectores de blanco, el cabezal está escupiendo aire. Usa una jeringa desde abajo del damper para purgar la línea y extraer tinta hasta llenar el damper a 3/4 de su capacidad.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Si has dejado la máquina parada más de 3 días sin recirculación, el pigmento de titanio se precipitó en el fondo del tanque, enviando agua sucia a las mangueras. Activa la bomba de circulación (o agita manual), y realiza una carga inicial de tinta (Ink Charge) para forzar la tinta fresca y espesa a llegar al cabezal. Luego, un test de inyectores normal.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Cómo crear mockups realistas para clientes", tag: "Diseño", date: "Mar 27, 2026",
        body: `
            <p>Un cliente no aprueba un diseño por lo bonito que es en vectores planos; lo aprueba cuando *se ve a sí mismo usando la prenda*. Presentar un boceto sobre un recuadro blanco es cosa del pasado. Los "Mockups" (fotomontajes hiperrealistas) son la herramienta de cierre de ventas número uno.</p>
            <h3>1. Mapas de Desplazamiento (Displacement Maps)</h3>
            <p>El error de principiante es poner el logo de Illustrator en modo "Multiplicar" sobre una foto de una sudadera. Esto se ve plano y falso. En Photoshop, debes crear un Mapa de Desplazamiento usando la foto de la camiseta en blanco y negro, con alto contraste. Al aplicarle el filtro Displace al logo, este se curvará siguiendo exactamente cada arruga y doblez de la prenda, dándole un volumen tridimensional brutal.</p>
            <h3>2. Simulación de técnicas (Tacto y reflejo)</h3>
            <p>Si vendes DTF, el estampado brilla un 10% bajo la luz. Añade una capa de "Bisel y Relieve" (Bevel & Emboss) microscópica para simular la altura del adhesivo, y una curva de brillo sutil. Si vendes Sublimación, bájale la opacidad al logo al 90% para que la textura de la trama del poliéster traspase visualmente el color.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> No compres mockups genéricos de internet con modelos nórdicos si tu marca está en Colombia o Latinoamérica. Esto desconecta a tu cliente. Haz una sesión de fotos rápida a un amigo usando prendas lisas de tu proveedor local y crea tus propios mockups. El cliente verá la prenda EXACTA que va a recibir.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Marketing en redes sociales para tu taller textil", tag: "Marketing", date: "Mar 26, 2026",
        body: `
            <p>Tener la mejor máquina de serigrafía o la última impresora DTF de 4 cabezales no sirve de nada si nadie te conoce. El negocio textil es altamente visual, y las redes sociales son tu vitrina principal. Deja de publicar fotos aburridas de "Llámanos para cotizar".</p>
            <h3>1. El formato "Behind the Scenes" (Detrás de cámara)</h3>
            <p>La gente ama los procesos de manufactura. Un video en TikTok o Reels mostrando la máquina DTF escupiendo tinta blanca, el polvo pasando por el horno, o el momento satisfactorio donde despegas el film PET de la prenda, genera miles de interacciones orgánicas. Acelera el proceso (Timelapse) y pon un audio en tendencia.</p>
            <h3>2. Educación al cliente (Tu mayor arma de ventas)</h3>
            <p>Tus clientes no saben qué es DPI ni qué es cuatricromía. Crea carruseles en Instagram enseñando: "Por qué tu logo se ve mal: Vectores vs JPG" o "3 errores al lavar tu camiseta estampada". Al educarlos, te posicionas como el experto de la ciudad. Cuando necesiten 100 uniformes, confiarán en ti por encima del estampador que solo publica precios.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Evita el síndrome del catálogo vacío. Pide siempre permiso a tus mejores clientes para tomarle fotos profesionales al pedido antes de entregarlo. Sube contenido real, menciona (etiqueta) al cliente en sus historias. El cliente lo compartirá en sus redes corporativas, y sus competidores o amigos te contactarán a ti.</p>
            </div>`
    },
    { 
        type: 'blog', title: "Seguridad laboral en talleres de serigrafía", tag: "Seguridad", date: "Mar 25, 2026",
        body: `
            <p>El olor a solvente en la mañana puede parecer normal para el estampador veterano, pero es una bomba de tiempo para los pulmones. La industria textil maneja químicos agresivos, temperaturas extremas y maquinaria móvil. Ignorar la seguridad laboral destruye tu salud y la de tus empleados a largo plazo.</p>
            <h3>1. Extractores y gases pesados</h3>
            <p>Al revelar mallas, limpiar plastisol con Varsol o curar tintas de corrosión, estás liberando Compuestos Orgánicos Volátiles (VOCs). Un ventilador apuntando a la ventana NO sirve, porque muchos de estos gases son más pesados que el aire y se quedan al nivel del pecho. Necesitas campanas extractoras instaladas directamente sobre las estaciones de lavado y sobre el horno de curado, conectadas a un ducto exterior.</p>
            <h3>2. Elementos de Protección Personal (EPP) Reales</h3>
            <ul>
                <li><strong>Ojos:</strong> Gafas con protección lateral obligatorias al usar la hidrolavadora para quitar emulsión (el rebote químico en los ojos causa ceguera paulatina).</li>
                <li><strong>Manos:</strong> Guantes de nitrilo industriales (los de látex azul de farmacia se derriten con los solventes de serigrafía).</li>
                <li><strong>Respiración:</strong> Mascarillas de media cara con filtros para vapores orgánicos (cartuchos carbón activado). Las mascarillas de tela N95 no detienen gases, solo polvo.</li>
            </ul>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Implementa una alfombra antifatiga frente al pulpo o al carrusel automático. Estar de pie sobre cemento durante 8 horas moviendo marcos de aluminio destruye las rodillas y lumbares. Tu productividad subirá un 20% si tu estampador no está adolorido a las 4 de la tarde.</p>
            </div>`
    },

    // --- PRIMERAS 10 LECCIONES DE ACADEMIA ---
    { 
        type: 'academy', title: "Entendiendo las resoluciones (DPI vs PPI)", level: "basico", num: 9,
        body: `
            <p>Bienvenidos a una de las clases fundacionales de la Academia Migo Creativo. El error número uno en el mundo de la impresión digital, sea DTF o Sublimación, ocurre al preparar la mesa de trabajo en Photoshop. Hoy desenredamos el misterio de los DPI y los PPI.</p>
            <h3>¿PPI o DPI? Entiende la diferencia</h3>
            <p>PPI significa "Pixels Per Inch" (Píxeles por pulgada), y define cuántos cuadritos de color digitales hay en una pulgada de tu monitor en Photoshop. DPI significa "Dots Per Inch" (Puntos por pulgada), y es la cantidad física de gotitas de tinta que el cabezal de tu impresora dispara sobre el papel.</p>
            <p>Nosotros, los diseñadores para estampar, trabajamos con PPI en nuestro lienzo (aunque coloquialmente le decimos DPI). La regla de oro internacional es: TODO gráfico destinado a impresión textil desde mapa de bits debe estar seteado a **300 PPI en su tamaño físico real**.</p>
            <h3>La Trampa de Internet</h3>
            <p>Si descargas una imagen de Google, generalmente vendrá a 72 PPI (resolución web para ahorrar peso). Si intentas imprimir un logo de 20x20 centímetros bajado a 72 PPI, la impresora no tendrá suficientes píxeles para rellenar el espacio. Se inventará la información, y el resultado final serán bordes serrucho, borrosos o pixelados (los famosos "cuadritos" feos).</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Abre Photoshop, ve a Imagen > Tamaño de Imagen, desmarca la casilla "Remuestrear" (Resample) y cambia la resolución a 300. Verás cómo automáticamente el tamaño físico del documento (en centímetros) se achica. Ese es el verdadero tamaño imprimible de tu diseño con nitidez.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Tipografías ideales para estampar", level: "basico", num: 10,
        body: `
            <p>Elegir la letra correcta para una camiseta parece una decisión estética, pero en el mundo textil es una decisión de viabilidad productiva. En esta lección aprenderás por qué tu fuente bonita de script falló al pasarla a malla.</p>
            <h3>Grosores de trazo (El problema del Vinilo y la Serigrafía)</h3>
            <p>Si estás diseñando para vinilo de corte o serigrafía básica, aléjate de las tipografías "Hairline" o "Script ultrafino". En serigrafía, un hilo de 0.5 milímetros de grosor en la letra no pasará correctamente la tinta a menos que tengas mallas perfectas de 120 hilos súper tensionadas. En vinilo de corte, cuando la cuchilla intente cortar un punto sobre una letra 'i', se lo llevará y te pasarás 2 horas intentando depilarlo.</p>
            <h3>Fuentes Block y Sans-Serif: Tus mejores amigas</h3>
            <p>Las fuentes universitarias gruesas (Slab Serif o Varsity) o las tipografías modernas geométricas (como Montserrat, Bebas Neue, Impact) son el estándar de oro en el deporte y streetwear. Su amplia área de superficie garantiza que la emulsión se adhiera bien al marco y que el polvo DTF tenga dónde agarrarse. Son imposibles de arruinar.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> No escribas en curvas cerradas a menos que uses texto sobre trazado (Path) en Illustrator. Convertir los textos a contornos (Ctrl+Shift+O) antes de enviarlos a imprimir es obligatorio. De lo contrario, si la computadora que recibe el archivo no tiene instalada tu fuente descargada, la cambiará a Arial y el pedido saldrá mal.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Manejo de capas en Photoshop", level: "basico", num: 11,
        body: `
            <p>Photoshop no es un lienzo plano como Microsoft Paint. Trabajar destructivamente arruina diseños complejos. Si un cliente te pide cambiar solo el color del texto después de 2 horas de trabajo y no tienes capas, tendrás que empezar de cero.</p>
            <h3>El concepto de la pila de cristales</h3>
            <p>Imagina cada Capa (Layer) como una hoja de acetato transparente. Lo que pongas en la capa superior tapará lo de abajo. Debes aislar TODOS tus elementos: El fondo va en la capa 1 (y debes apagarle el ojo antes de exportar un PNG para DTF), la ilustración va en la capa 2, y los textos van en la capa 3. Si borras o borroneas en una capa, las otras quedan intactas.</p>
            <h3>Objetos Inteligentes (Smart Objects)</h3>
            <p>La regla sagrada del diseño textil en Photoshop: Nunca escales hacia abajo un logo rasterizado para verlo chiquito y luego lo escales de vuelta hacia arriba. Photoshop tirará a la basura los píxeles y quedará borroso. Haz clic derecho en tu capa > Convertir en Objeto Inteligente. Esto "blinda" la información de la imagen dentro de un contenedor, permitiéndote escalar al infinito sin perder calidad de los píxeles originales.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Acostúmbrate a nombrar todas tus capas. Cuando el archivo de una ilustración de heavy metal para serigrafía simulada alcance las 50 capas y canales, saber dónde está la capa llamada "Sombras del Craneo" te salvará la vida.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Uso de la herramienta pluma en Illustrator", level: "basico", num: 12,
        body: `
            <p>La Herramienta Pluma (Pen Tool) es, de lejos, el instrumento más intimidante para los novatos en diseño vectorial, pero también el más poderoso. Dominarla te convertirá en un vectorizador independiente sin depender de calcos automáticos defectuosos.</p>
            <h3>Curvas de Bézier: Anatomía de un ancla</h3>
            <p>Al hacer clic generas un Punto de Ancla (Anchor Point). Si haces clic y mantienes pulsado el mouse mientras arrastras, de ese punto saldrán dos "manejadores" o "palancas" direccionales. Estos determinan la tensión y la dirección de la curva que estás por crear en el siguiente clic. Menos anclas = curvas más limpias. El peor error del novato es hacer 50 clics muy juntos para dar una curva; esto hace que el vector final se vea mordido.</p>
            <h3>Atajos sagrados (Alt y Ctrl)</h3>
            <p>La pluma no se domina arrastrando el mouse. Se domina con la mano izquierda en el teclado. Manteniendo **Alt (Option)** puedes quebrar un manejador independientemente para hacer esquinas afiladas después de una curva. Manteniendo **Ctrl (Cmd)** cambias temporalmente a la flecha blanca para mover un punto mal colocado sin soltar la herramienta pluma.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Práctica el juego de los contornos. Descarga el logo de Batman en JPG. Ponlo en una capa bloqueada. Selecciona la pluma, quita el color de relleno y ponle trazo rojo. Intenta calcar el murciélago usando menos de 10 puntos de ancla en total. Cuando lo logres, habrás dominado las curvas de Bézier.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Formatos de exportación explicados", level: "basico", num: 13,
        body: `
            <p>Has pasado horas creando un diseño genial y es hora de mandarlo a la impresora (RIP) o al plotter de corte. ¿En qué formato lo guardas? Escoger el incorrecto es el origen del 50% de las frustraciones en el área de pre-prensa de un taller.</p>
            <h3>Para Plotter de Corte (Vinilo) y Grabado Láser</h3>
            <p>Aquí necesitas vectores puros. Nada de mapas de bits. Debes exportar en **EPS** o **SVG** (Scalable Vector Graphics). El plotter necesita coordenadas matemáticas (líneas) para saber por dónde pasear la cuchilla. Archivos PDF vectoriales también funcionan excelente en RIPs modernos como FlexiPRINT.</p>
            <h3>Para DTF, DTG y Sublimación (Full Color)</h3>
            <p>Aquí NO puedes enviar un JPG si necesitas que el diseño no tenga un cuadrado blanco alrededor. Usa **PNG (Portable Network Graphics)**. El PNG soporta "Canal Alfa" (transparencia total o parcial), asegurando que tu software de RIP deposite polvo de poliamida o base blanca SOLO donde hay píxeles pintados, dejando la tela respirar por el resto.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Olvida guardar en formato nativo (.AI o .PSD) para mandárselo a la impresora o a otro colega, porque le pedirás las fuentes y los enlaces de las fotos. Para enviar a producción DTF: exporta un PNG sin fondo (o un TIFF con canal alfa si requiere alta resolución sin compresión).</p>
            </div>`
    },
    { 
        type: 'academy', title: "Diferencia entre mapa de bits y vector", level: "basico", num: 14,
        body: `
            <p>Esta es la base técnica de toda nuestra industria. Entender por qué un archivo sirve para serigrafía y otro no, empieza por diferenciar cómo las computadoras procesan los gráficos visuales. Repasemos Mapa de Bits (Raster) vs Vector.</p>
            <h3>Mapa de Bits (Rasterizado / Photoshop)</h3>
            <p>Una fotografía tomada con tu celular o un archivo JPG es un mapa de bits. Está compuesto por un mosaico de miles de cuadritos microscópicos llamados "Píxeles". Cada pixel tiene un color fijo. Si haces zoom profundo, verás la cuadrícula. Si tomas un logo pequeño en mapa de bits y lo estiras para imprimir en una sábana enorme, los cuadritos se agrandan creando "pixelación". Son pesados en megabytes, pero excelentes para degradados sutiles fotográficos (DTF, Sublimación).</p>
            <h3>Vectores (Illustrator / CorelDraw)</h3>
            <p>Los vectores NO tienen píxeles. Están construidos por ecuaciones matemáticas puras. Si dibujas un círculo rojo vectorial, el programa solo guarda la fórmula: "centro aquí, radio 5, color rojo". Por eso, puedes estirar ese círculo al tamaño del planeta Júpiter y su borde será infinitamente cortante, limpio e inquebrantable. Son obligatorios para plotter de corte y serigrafía de plasta de color (spot colors).</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Importa una foto JPG en Illustrator. Por más que estés dentro de un programa "vectorial", esa foto sigue siendo un mapa de bits. Illustrator solo es el envase. Aprende que meter imágenes en Illustrator no las vectoriza automáticamente a menos que uses calco de imagen activo.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Ajustes básicos de brillo y contraste", level: "basico", num: 15,
        body: `
            <p>El monitor engaña. Su pantalla emite luz desde atrás (LED/LCD), haciendo que cualquier diseño se vea brillante, saturado y majestuoso. La tinta en la tela no tiene luz interna. Si tu imagen está ligeramente subexpuesta o mate en pantalla, en la tela se verá como un pantano oscuro. Corregir curvas y niveles es imperativo antes del RIP.</p>
            <h3>La herramienta Curvas (Ctrl+M / Cmd+M) en Photoshop</h3>
            <p>A diferencia del simple "Brillo y Contraste", las Curvas te permiten levantar las luces sin dañar las sombras. Abre la ventana de Curvas. Tienes una línea diagonal recta y un histograma detrás. Toca el centro de la línea (tonos medios) y levántala ligeramente hacia arriba. Verás cómo la imagen cobra vida, se ilumina y pierde esa opacidad sin quemar los blancos ni empastar los negros oscuros.</p>
            <h3>Sobre-saturación intencional para tela</h3>
            <p>Especialmente para la sublimación (donde la tela puede absorber parte del espectro visual) o el DTG (donde el pretratamiento oscurece), acostúmbrate a empujar la herramienta "Intensidad" (Vibrance) en Photoshop un 15% por encima de lo que se ve bien en tu monitor. Lo que en pantalla se ve "exageradamente vivo", en la tela curada se verá "correcto".</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Abre un diseño oscuro. Crea una capa de ajuste de "Niveles". Mueve el pequeño triángulo blanco de la derecha (Luces Altas) hacia la izquierda, justo hasta donde empieza la montaña del histograma. Has eliminado la niebla (fog) y ajustado el punto blanco correcto para la impresora.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Cómo recortar fondos complejos", level: "basico", num: 16,
        body: `
            <p>Quitar el fondo blanco a un cuadrado negro es fácil (varita mágica). Pero, ¿qué pasa cuando un cliente te pide poner en una camiseta negra la foto de su perro, con todos sus cabellos delgados mezclándose con un fondo confuso de hojas de un parque? Bienvenido a los recortes de alta gama.</p>
            <h3>Select and Mask (Seleccionar y Aplicar Máscara)</h3>
            <p>La herramienta varita mágica destruirá el borde del pelaje, dejando restos blancos horribles o cortando pelos del animal (lo cual en DTF resulta en bloques blancos cuadrados flotantes). En versiones modernas de Photoshop, usa la herramienta **Selección de Objetos** o ve a "Selección > Sujeto". Luego, haz clic en el botón superior "Seleccionar y aplicar máscara".</p>
            <h3>El pincel para Perfeccionar Bordes</h3>
            <p>Dentro del espacio de trabajo de la máscara, toma el segundo pincel de la izquierda (Refine Edge Brush Tool). Pásalo suavemente a lo largo de todos los bordes peludos o finos (cabello humano, pelo de animal, texturas de fuego). Photoshop calculará matemáticamente qué píxel es cabello y cuál es fondo, y te devolverá una transparencia increíblemente precisa.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> ¡Jamás uses el Borrador para eliminar fondos! El borrador elimina la información para siempre. Al salir de "Seleccionar y Máscara", marca "Salida a: Nueva Capa con Máscara de Capa". Así, si te equivocaste y cortaste una oreja del perro, puedes pintar con blanco en la máscara de capa negra y ¡magia, la oreja vuelve a aparecer!</p>
            </div>`
    },
    { 
        type: 'academy', title: "Separación de color CMYK en Photoshop", level: "intermedio", num: 17,
        body: `
            <p>Damos el salto al nivel Intermedio. Quieres imprimir fotos reales en serigrafía tradicional usando cuatricromía (Cyan, Magenta, Amarillo, Negro). No puedes enviar el diseño directo a la impresora; debes descomponer la foto, aplicarle trama (puntitos de medio tono) e imprimir 4 fotolitos (acetatos) en blanco y negro puro.</p>
            <h3>Conversión e Inspección de Canales</h3>
            <p>Paso 1: Cambia tu documento de RGB a CMYK (Imagen > Modo > CMYK Color). Ve a la pestaña "Canales" (Channels) junto a Capas. Verás que tu imagen ahora está dividida en 4 canales grises. Selecciona solo el Cyan: donde veas negro, es donde la malla tendrá huecos para que pase la tinta azul. Las partes grises claras significa que deben ir puntitos muy chiquitos de azul.</p>
            <h3>El paso a Trama de Medios Tonos (Halftone)</h3>
            <p>Un fotolito no puede tener grises, solo negro puro de tinta de impresora o película transparente. Selecciona cada canal uno por uno, ve a "Dividir Canales" y luego en cada archivo nuevo ve a Imagen > Modo > Mapa de Bits (Bitmap). Elige "Trama de semitonos" (Halftone Screen). <br>Aquí asignas LPI (Líneas por pulgada) según tu malla, y el Ángulo (Angle) crucial: Cyan 15°, Magenta 75°, Amarillo 90°, Black 45°.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Imprime los 4 acetatos resultantes. Míralos a contraluz. Verás que lo que antes era un degrade de piel humana, ahora son miles de puntitos negros minúsculos en ángulos precisos. Al revelar esos puntos en la emulsión, y pasar las tintas translúcidas CMYK, ocurrirá la ilusión óptica en la prenda.</p>
            </div>`
    },
    { 
        type: 'academy', title: "Creación de bases blancas para DTF", level: "intermedio", num: 18,
        body: `
            <p>La base blanca es el alma del DTF. Es la pared sólida que bloquea el color oscuro de la camiseta y sobre la cual descansan los colores vibrantes CMYK. Sin embargo, no todo debe llevar blanco grueso de borde a borde. Generar una base inteligente te ahorra tinta y le da un tacto "premium" a tu transfer.</p>
            <h3>Choke (Ahorcamiento de la base)</h3>
            <p>Si la base blanca imprime exactamente al mismo ras milimétrico que tu color, cualquier micro-desajuste del cabezal hará que asome un borde blanco alrededor de todo el diseño (lo cual en bordes negros sobre camisetas negras se ve terrible). En tu RIP (Maintop/CADlink), debes configurar el "Choke" o contracción del blanco en 2 o 3 píxeles (-0.1mm a -0.2mm). Esto hace que la base blanca sea microscópicamente más pequeña que el color, escondiéndola perfectamente.</p>
            <h3>Máscara de Blanco según luminosidad</h3>
            <p>Si vas a imprimir negro sólido en DTF para aplicarlo en una camiseta que *ya es de color negro*, poner tinta blanca debajo es un desperdicio de dinero, crea sudor y cartón. Configura tu software RIP en "Generar blanco bajo color solo en áreas no-negras" o usa una degradación alfa (Base Blanca 100% bajo colores claros, 50% bajo sombras, 0% bajo el negro puro). El negro CMYK se imprimirá directo sobre el polvo, fundiéndose hermosamente con la tela.</p>
            <div class="mc-highlight-box">
                <p><strong>🎓 Tarea de la lección:</strong> Abre tu RIP de DTF. Busca la curva "White Ink Under Color". Modifica la densidad del blanco al 70%. Notarás que el estampado sale muchísimo más delgado, flexible y elástico, gastando un tercio menos de tu insumo más caro en el taller sin perder vibrancia de color real.</p>
            </div>`
    }
];

let filesWritten = 0;
const blogPath = path.join(__dirname, 'blog');
const academyPath = path.join(__dirname, 'academia');

batch2.forEach(item => {
    const slug = toSlug(item.title) + '.html';
    const folder = item.type === 'blog' ? blogPath : academyPath;
    const filePath = path.join(folder, slug);
    
    let metaSection = '';
    if (item.type === 'blog') {
        metaSection = `<div class="mc-post-meta">
            <span class="mc-post-tag">${item.tag}</span>
            <span>📅 ${item.date}</span>
            <span>⏱️ 5 min de lectura</span>
        </div>`;
    } else {
        const bg = item.level === 'basico' ? 'rgba(34, 197, 94, 0.2)' : item.level === 'intermedio' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        const col = item.level === 'basico' ? '#4ade80' : item.level === 'intermedio' ? '#facc15' : '#f87171';
        const txt = item.level === 'basico' ? '🟢 Básico' : item.level === 'intermedio' ? '🟡 Intermedio' : '🔴 Avanzado';
        metaSection = `<div class="mc-post-meta">
            <span style="background: ${bg}; color: ${col}; padding: 4px 14px; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">${txt}</span>
            <span style="color: var(--mc-text-muted); font-weight: 600;">Lección ${item.num}</span>
        </div>`;
    }

    const html = `<!DOCTYPE html>
<html data-bs-theme="dark" lang="es-419">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>${item.title} | Migo Creativo</title>
    <meta name="description" content="Aprende sobre ${item.title} con las guías detalladas de Migo Creativo.">
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
                    <li class="nav-item"><a class="nav-link ${item.type === 'academy' ? 'active' : ''}" href="../academia/index.html">Academia</a></li>
                    <li class="nav-item"><a class="nav-link ${item.type === 'blog' ? 'active' : ''}" href="../blog/index.html">Blog</a></li>
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
                <a href="index.html" class="mc-btn-primary">← Volver ${item.type === 'blog' ? 'al Blog' : 'a la Academia'}</a>
            </div>
        </div>
    </section>

    <footer class="mc-footer"><div class="container py-4"><div class="mc-footer-bottom text-center"><p class="mb-0">© 2026 Migo Creativo | Hecho con ❤️ en Colombia</p></div></div></footer>
    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
    ${item.type === 'academy' ? '<script src="../assets/js/academia-progress.js"></script>' : ''}
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

console.log(`Lote 2 completado. Se han reescrito ${filesWritten} archivos con contenido técnico avanzado y único.`);
