const fs = require('fs');
const path = require('path');

function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

const batch1 = [
    { 
        title: "Cómo resolver el banding en impresoras DTF", tag: "DTF", date: "Abr 23, 2026",
        body: `
            <p>El "banding" (esas molestas líneas horizontales claras u oscuras que atraviesan tu diseño impreso) es el peor enemigo de cualquier estampador DTF. Arruina el acabado final y hace que el cliente rechace el trabajo. En esta guía técnica, te explico las causas reales y cómo solucionarlo en tu taller.</p>
            <h3>1. Limpieza y Test de Inyectores</h3>
            <p>El 80% de los casos de banding ocurren porque uno o varios inyectores del cabezal están obstruidos. Haz un "Nozzle Check" (Test de inyectores) en tu software RIP. Si faltan líneas en el patrón CMYK o en el canal de blanco, ejecuta una limpieza de cabezal (Head Cleaning). Si el problema persiste tras 3 limpiezas, es posible que el damper esté vacío o tapado.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Nunca imprimas si el test de inyectores no está al 100%. Imprimir con inyectores tapados fuerza a los demás y acorta la vida útil de tu cabezal Epson (i3200 o XP600).</p>
            </div>
            <h3>2. Tensión de las correas (Step Adjustment)</h3>
            <p>Si el test de inyectores sale perfecto pero sigues viendo banding, el problema es mecánico. El "Step Adjustment" (ajuste de avance) controla cuánto avanza el film PET después de cada pasada del cabezal. Si avanza de más, verás líneas blancas (espacio vacío). Si avanza de menos, verás líneas oscuras (sobreimpresión). Entra a tu software (como FlexiPRINT o Maintop) y realiza la calibración del "Step" o "Feed".</p>
            <h3>3. Humedad y estática en el Film</h3>
            <p>Un ambiente muy seco (menos del 40% de humedad) genera estática en el film PET, causando que las micro-gotas de tinta se desvíen antes de tocar la película. Usa un humidificador industrial cerca de la impresora para mantener el ambiente entre 45% y 60% de humedad relativa.</p>`
    },
    { 
        title: "Estrategias de precios para talleres de serigrafía", tag: "Negocios", date: "Abr 22, 2026",
        body: `
            <p>Muchos talleres de serigrafía terminan quebrando no por falta de clientes o mala calidad, sino porque no saben cobrar. Establecer una estructura de precios rentable es vital para escalar tu negocio en Colombia. Aquí te enseñamos cómo estructurarlo.</p>
            <h3>1. Cálculo de Costos Fijos y Variables</h3>
            <p>El error más común es cobrar "lo que cobra la competencia". Debes calcular cuánto cuesta encender tu taller cada día. Suma alquiler, luz, internet, salarios (incluyendo el tuyo) y divídelo por las horas productivas del mes. Esto te dará tu "Costo por Hora de Taller". A esto le sumas los variables: emulsión, tinta plastisol, revelador, y el costo de la prenda.</p>
            <h3>2. La regla del Setup (Costo de Configuración)</h3>
            <p>En serigrafía, quemar marcos, registrar colores y limpiar, toma el mismo tiempo para 10 camisetas que para 500. Siempre debes cobrar un "Setup Fee" (costo por marco/color) por separado, o prorratearlo fuertemente en pedidos pequeños. Por ejemplo, cobrar $40,000 COP por el revelado de cada malla si el pedido es menor a 50 unidades.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> No tengas miedo de perder pedidos de 5 o 10 camisetas. La serigrafía no es para micro-pedidos. Si un cliente quiere pocas unidades, ofrécele DTF y mantén tus carruseles libres para volumen alto.</p>
            </div>
            <h3>3. Escalas de Volumen</h3>
            <p>Crea una tabla de precios escalonada: 12-24, 25-50, 51-100, 101-500 y 500+. Esto incentiva al cliente a pedir más para reducir el costo unitario, aumentando tu ticket promedio y maximizando el uso de tus mallas ya reveladas.</p>`
    },
    { 
        title: "Mantenimiento preventivo de planchas térmicas", tag: "Equipos", date: "Abr 21, 2026",
        body: `
            <p>Tu plancha térmica (o estampadora) es el corazón de tu negocio de sublimación o DTF. Si falla la temperatura o la presión, fallan todos tus estampados. Aquí te mostramos la rutina de mantenimiento que debes aplicar mensualmente.</p>
            <h3>1. Limpieza de la platina de teflón</h3>
            <p>Con el uso constante, restos de polvo poliamida, tintas de sublimación o adhesivos se acumulan en la platina superior. Límpiala cada semana estando *ligeramente tibia* (unos 60°C) con un paño de microfibra y un limpiador no abrasivo o alcohol isopropílico. Si tiene teflón dañado, instala una hoja de teflón permanente con imanes.</p>
            <h3>2. Calibración real de la temperatura</h3>
            <p>Lo que dice el panel digital no siempre es lo que hay en la platina. Consigue un termómetro láser o un pirómetro de contacto y mide la temperatura en 5 puntos: el centro y las 4 esquinas. Si las esquinas están más frías por más de 5°C, tendrás problemas de curado en estampados grandes.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Si notas "puntos fríos" severos, significa que las resistencias internas se están quemando. Es momento de pensar en cambiar la platina o la máquina completa antes de que arruine un pedido de 100 camisetas.</p>
            </div>
            <h3>3. Lubricación y ajuste de presión</h3>
            <p>Las planchas clamshell (tipo almeja) o swing-away sufren desgaste en los pivotes y resortes. Aplica una gota de grasa de litio o aceite 3-en-1 en las bisagras y pernos cada 3 meses. Esto evita que la máquina "chille" y asegura que la presión baje de forma totalmente plana sobre la silicona base.</p>`
    },
    { 
        title: "Tintas plastisol vs base agua: La guía definitiva", tag: "Serigrafía", date: "Abr 20, 2026",
        body: `
            <p>La eterna batalla en el mundo de la serigrafía: ¿Qué tinta es mejor? La realidad es que no hay una ganadora absoluta; la elección depende del tejido, el cliente final y tu infraestructura de curado. Veamos las diferencias a fondo.</p>
            <h3>1. Plastisol: El rey de la facilidad</h3>
            <p>El plastisol es una tinta a base de PVC que no seca al aire. Puedes dejar la malla entintada todo el fin de semana y no se tapará. Cubre fácilmente telas oscuras (con una buena base blanca) y produce colores súper vibrantes.</p>
            <ul>
                <li><strong>Curado:</strong> Requiere horno o flash cure que alcance los 160°C en toda la capa de tinta. Si no llega, se cuarteará al lavar.</li>
                <li><strong>Tacto:</strong> Es un tacto más pesado ("ahulado"). Ideal para ropa de trabajo o ropa streetwear de alto gramaje.</li>
            </ul>
            <h3>2. Base Agua: El tacto cero</h3>
            <p>Las tintas base agua (como Acramina o Copage) penetran las fibras de la tela en lugar de sentarse sobre ellas. El resultado es un estampado que literalmente no se siente al pasar la mano, ofreciendo una suavidad premium insuperable.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> La base agua seca rapidísimo en la malla. Si trabajas en climas cálidos o sin aire acondicionado, debes imprimir rápido y rociar agua frecuentemente con un atomizador para evitar que se tape el marco.</p>
            </div>
            <h3>3. Conclusión</h3>
            <p>Si produces ropa vintage, moda premium y tienes experiencia manejando marcos rápidos, la base agua y el discharge son tu mejor opción. Si buscas alta productividad, estampados en poliéster o no tienes experiencia lidiando con mallas secas, el plastisol será tu mejor aliado operativo.</p>`
    },
    { 
        title: "Secretos para sublimar tazas sin manchas", tag: "Sublimación", date: "Abr 19, 2026",
        body: `
            <p>Las tazas son uno de los productos más rentables en la personalización, pero también los que generan más mermas. Fantasmas (ghosting), bordes descoloridos y manchas son el pan de cada día si no dominas estos tres pilares de la sublimación cerámica.</p>
            <h3>1. El ajuste perfecto del papel</h3>
            <p>El 90% de los bordes borrosos en las tazas (especialmente cerca del asa o en el fondo) ocurren porque el papel no está tocando firmemente la cerámica. Usa papel de secado rápido (que es más maleable) y estíralo con fuerza usando cinta térmica en 4 puntos clave. No dejes burbujas de aire.</p>
            <h3>2. Control de Temperatura y Presión</h3>
            <p>Una taza AAA estándar requiere aproximadamente 180°C (360°F) durante 180 a 200 segundos. Sin embargo, si la presión de tu resistencia está muy suave, los gases se escaparán y crearán manchas difuminadas. Si está muy fuerte, quebrarás el polímero (o la taza). Ajusta la presión en frío: debe costar cerrar la palanca con una sola mano, pero sin hacer fuerza extrema.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Las tazas frías absorben todo el calor de la resistencia al iniciar. Si estás en una ciudad fría como Bogotá, precalienta la taza vacía durante 10 segundos antes de ponerle el papel para evitar choques térmicos y bordes inferiores descoloridos.</p>
            </div>
            <h3>3. Retirada rápida (Evitar el Ghosting)</h3>
            <p>El proceso de sublimación no se detiene cuando sacas la taza de la máquina. La cerámica retiene calor por minutos, y si el papel se mueve un milímetro, soltará gas en un lugar incorrecto creando el "fantasma". Saca la taza, retira el papel inmediatamente de un solo tirón, y sumérgela en agua tibia (no helada) o ponla frente a un ventilador para frenar la gasificación.</p>`
    },
    { 
        title: "Cómo elegir el mejor polvo poliamida para DTF", tag: "DTF", date: "Abr 18, 2026",
        body: `
            <p>En el proceso de Direct To Film (DTF), la tinta imprime el color, pero el polvo poliamida (el adhesivo hot-melt) es lo que garantiza que tu estampado no se caiga a pedazos después del primer lavado. Elegir el gramaje y tipo correcto es crítico.</p>
            <h3>1. Polvo Grueso vs Fino</h3>
            <p>El polvo viene granulado en micras. El <strong>polvo fino</strong> (aprox 80-160 micras) se adhiere perfectamente a líneas finas y detalles pequeños, dejando un tacto súper suave, pero tiene menos poder de anclaje en telas gruesas. El <strong>polvo grueso</strong> (más de 160 micras) deja un tacto más acartonado pero es indispensable si vas a estampar denim, lonas, o prendas de trabajo pesado donde necesitas tracción extrema.</p>
            <h3>2. Polvo Blanco vs Polvo Negro</h3>
            <p>Casi todos los talleres usan polvo blanco por defecto. Sin embargo, al estampar sobre telas oscuras de poliéster que destiñen, el polvo blanco puede dejar un molesto contorno blanquecino en los bordes del diseño tras el planchado. El <strong>polvo negro</strong> contiene pigmentos que evitan ese contorno visible y añaden un bloqueo extra contra la migración de color.</p>
            <div class="mc-highlight-box">
                <p><strong>🔥 Consejo de experto:</strong> Si al curar tu DTF en el horno notas que el polvo crea "cráteres" o burbujas en lugar de una superficie lisa como piel de naranja, es porque tu polvo atrapó demasiada humedad del ambiente. Almacénalo siempre en bolsas con cierre hermético y sílice.</p>
            </div>
            <h3>3. Temperatura de curado</h3>
            <p>Un buen polvo poliamida estándar funde entre 120°C y 140°C. Si tu horno está muy frío, el polvo se verá blanco y arenoso (tu estampado se pelará al lavar). Si lo curas demasiado caliente (más de 150°C), el polvo se verá transparente y cristalizado como un espejo, perdiendo sus propiedades elásticas y agrietándose en la prenda.</p>`
    },
    { title: "Técnicas de separación de color indexada", tag: "Diseño", date: "Abr 17, 2026",
      body: `<p>La separación indexada es una de las técnicas más avanzadas en serigrafía para reproducir fotografías o diseños hiperrealistas sin lidiar con los problemas de moiré que generan las tramas de cuatricromía CMYK tradicional. Aquí exploramos por qué los talleres profesionales están migrando a esta técnica.</p><h3>¿Qué es el Color Indexado?</h3><p>A diferencia del CMYK donde 4 colores se superponen para crear tonos ópticos, en la indexación usamos colores "spot" (sólidos, opacos) y Photoshop convierte la imagen en un patrón de píxeles puros que no se mezclan. El resultado es un estampado mucho más brillante y fiel al monitor.</p><h3>Pasos Clave en Photoshop</h3><p>Para indexar, la imagen debe estar exactamente al tamaño final de impresión y a 200 o 300 DPI. Se reduce la paleta de colores de millones (RGB) a una paleta cerrada (ej. 6, 8 o 10 colores) utilizando una difusión de tramado (Diffusion Dither). Cada canal resultante se quema directamente a la malla sin ángulos ni lineaturas.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> La indexación requiere mallas de alta tensión y muchos hilos (mínimo 90h/cm o 230h/inch). Además, es fundamental usar colores Pantone exactos al preparar tus tintas en el taller, de lo contrario la mezcla óptica fallará estrepitosamente en la camiseta.</p></div>` },
    { title: "Errores fatales al curar tintas plastisol", tag: "Serigrafía", date: "Abr 16, 2026",
      body: `<p>El 90% de los reclamos por "estampados pelados o cuarteados" en serigrafía se deben a un curado defectuoso. Las tintas plastisol no se secan; deben polimerizarse mediante calor a una temperatura específica. Si fallas en esto, todo tu trabajo previo se va a la basura.</p><h3>1. Confundir pre-secado con curado</h3><p>El flash cure se usa durante 3 a 5 segundos para "gelificar" la superficie de la tinta (alcanzando unos 105°C) y permitir imprimir otro color encima sin manchar. Esto NO es un curado final. Si le entregas la prenda al cliente así, la tinta se caerá en el primer ciclo de lavadora.</p><h3>2. No medir la temperatura interna</h3><p>El curado requiere que *toda la capa de tinta*, desde la superficie hasta donde toca la tela, alcance los 160°C (320°F) durante al menos 30 segundos. Un error fatal es que la pistola láser solo mide la temperatura de la superficie. Si tienes una capa muy gruesa de tinta (como alta densidad), la base estará fría.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> Realiza siempre la prueba de estiramiento. Toma la prenda recién salida del horno, déjala enfriar totalmente y estira el estampado. Si se agrieta o se rompe como yeso, el plastisol no curó correctamente. Debería estirarse como una liga elástica.</p></div>` },
    { title: "Guía para sublimar en algodón (Técnicas alternativas)", tag: "Sublimación", date: "Abr 15, 2026",
      body: `<p>El santo grial de la personalización siempre ha sido la "sublimación sobre algodón oscuro". Técnicamente, el gas de sublimación solo tiñe polímeros (poliéster). Sin embargo, el mercado exige algodón, y la industria ha respondido con alternativas ingeniosas. Analicemos las más rentables para tu taller.</p><h3>1. Poliamida líquida o en spray (Subli-algodón)</h3><p>Consiste en rociar la camiseta 100% algodón con un polímero líquido transparente, secarla, y luego sublimar encima. <br><strong>Pros:</strong> Conserva gran parte del tacto natural. <br><strong>Contras:</strong> Solo sirve para prendas blancas o de colores muy claros, y puede dejar un recuadro amarillento (quemado) donde se aplicó el químico tras el planchado.</p><h3>2. Vinilo Textil Sublimable o Subli-Flock</h3><p>Se corta un material (vinilo blanco o flock texturizado) en plotter, se sublima a todo color, y luego se plancha sobre la prenda de algodón oscuro. <br><strong>Pros:</strong> Colores brutalmente vibrantes y durabilidad altísima. <br><strong>Contras:</strong> Queda un "parche" muy grueso y acartonado en el pecho, poco estético en diseños muy grandes.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> En pleno 2026, mi recomendación es clara: si el cliente exige algodón oscuro a todo color y sin parches gruesos, no inventes trucos mágicos. Ofrécele <strong>DTF (Direct To Film)</strong>. El DTF desplazó estas técnicas alternativas porque está diseñado nativamente para anclarse en algodón con un tacto superior.</p></div>` },
    { title: "El futuro del DTF UV en merchandising", tag: "Tendencias", date: "Abr 14, 2026",
      body: `<p>El DTF textil revolucionó la ropa, pero el **DTF UV** está cambiando las reglas del juego en el merchandising duro. Si tienes una impresora de sublimación o UV clásica, debes entender por qué el DTF UV es la próxima inversión obligatoria para los talleres publicitarios.</p><h3>¿Qué es y cómo funciona?</h3><p>El DTF UV combina la tecnología de impresión UV de curado en frío con una película adhesiva transferible (Film A + Film B). La impresora escupe tinta, blanca, barniz (glossy) e imprime directamente sobre un adhesivo. Esto permite aplicar logotipos 3D en relieve sobre vidrio, metal, madera, termos o plásticos sin usar calor.</p><h3>Ventajas frente a la Serigrafía Cilíndrica y Sublimación</h3><p>La sublimación en rígidos requiere artículos costosos con recubrimientos especiales (tazas y termos polimerizados). La serigrafía cilíndrica está limitada a uno o dos colores por pasadas complejas. El DTF UV te permite pegar un logo a full color fotográfico con relieve sobre *cualquier* termo del mercado chino, reduciendo tus costos de inventario de manera absurda.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> El único enemigo del DTF UV es la presión y rasguños mecánicos agresivos, además del micro-ondas o lavavajillas. Siempre advierte a tus clientes sobre los cuidados de lavado a mano para asegurar que el adhesivo dure años intacto en los tomatodos.</p></div>` },
    { title: "Cómo vectorizar imágenes borrosas rápido", tag: "Diseño", date: "Abr 13, 2026",
      body: `<p>Todo estampador lo ha vivido: el cliente te manda su "logo en alta calidad" por WhatsApp y es un JPG de 200x200 píxeles. Imprimir eso en serigrafía o DTF es un suicidio técnico. Vectorizar es obligatorio, y aquí te explico cómo acelerar este proceso que suele robarte horas.</p><h3>1. Evita el "Calco de Imagen" automático si es posible</h3><p>La tentación de usar *Image Trace* en Illustrator o *PowerTrace* en CorelDraw es enorme. Sin embargo, en logotipos pequeños o textos geométricos, el calco automático genera "nodos basura" y deforma las letras redondeadas convirtiéndolas en garabatos. El calco automático solo úsalo para ilustraciones complejas tipo acuarela o manchas grunge.</p><h3>2. Reconstrucción con Geometría Pura</h3><p>La forma más profesional y rápida de vectorizar logotipos es ignorar la herramienta pluma y usar figuras primitivas. ¿Hay una letra O? Usa la herramienta elipse. ¿Hay escudos? Usa cuadrados, rótalos y usa la herramienta Buscatrazos (Pathfinder) para fusionar. Las formas matemáticas son perfectas, la mano alzada con la pluma no.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> En Migo Creativo recibimos cientos de logos borrosos diarios. Nuestro primer paso antes de intentar trazar es buscar en plataformas como <em>WhatTheFont</em> o <em>Adobe Fonts</em>. Identificar la tipografía original y simplemente reescribirla ahorra el 80% del trabajo y queda 100% perfecto para corte láser o vinilo.</p></div>` },
    { title: "Resolución ideal para estampados de gran formato", tag: "Diseño", date: "Abr 12, 2026",
      body: `<p>Existe mucha confusión sobre la resolución (DPI) cuando se trata de estampados que abarcan toda una sudadera o banderas enormes. ¿Realmente necesitas 300 DPI para un estampado de 2 metros de ancho? La respuesta corta es NO. Analicemos la ciencia detrás de la resolución y la distancia de visión.</p><h3>La Regla de la Distancia de Visión</h3><p>La resolución de 300 DPI (Puntos por Pulgada) es un estándar nacido para revistas y papelería que se ven a 30 centímetros de distancia (distancia de lectura). Una estampa en el pecho izquierdo de una camiseta requiere 300 DPI porque la gente se acerca a leerlo. Pero una bandera o un estampado de gran formato tipo "all-over print" se ve desde lejos.</p><h3>Resoluciones Recomendadas</h3><ul><li><strong>Logos de Pecho (A6):</strong> 300 DPI al tamaño real.</li><li><strong>Espalda Completa (A3):</strong> 150 a 200 DPI al tamaño real. (Tu RIP software de DTF o Plotter de Sublimación lo interpolará perfectamente).</li><li><strong>Banderas o Vallas Textiles (Más de 1 metro):</strong> 72 a 100 DPI es más que suficiente.</li></ul><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> Forzar una imagen de 2 metros cuadrados a 300 DPI en Photoshop creará un archivo monstruoso de 2 o 3 Gigabytes. Esto colapsará la memoria RAM de tu computadora, cerrará tu CorelDraw y tardará horas en procesarse en el RIP de tu impresora sin mejorar visiblemente la calidad en tela.</p></div>` },
    { title: "Cómo evitar la migración de color en poliéster", tag: "Serigrafía", date: "Abr 11, 2026",
      body: `<p>Estampar tinta plastisol o poliuretano (DTF) blanca sobre una camiseta roja de poliéster deportivo es la pesadilla del taller. Sacas la prenda del horno viéndose perfecta, y 48 horas después, el blanco se ha vuelto rosa brillante. Esto se llama *Migración por Sublimación Inversa* o Sangrado de tintes (Bleeding).</p><h3>¿Por qué ocurre la migración?</h3><p>Las telas de poliéster oscuro son teñidas a altas temperaturas en la fábrica mediante tintes dispersos (esencias de sublimación). Cuando aplicas calor con tu plancha (o el flash cure) a más de 140°C, reactivas los tintes de la tela. Esos tintes se convierten en gas e intentan escapar hacia arriba, atravesando tu tinta blanca y tiñéndola permanentemente.</p><h3>Estrategias de Bloqueo en Serigrafía</h3><p>Para frenar la migración, NO sirve darle 3 capas gruesas de blanco normal. La solución técnica es imprimir una base bloqueadora especial anti-migración (suele ser tinta plastisol color gris carbono o negro especial). Este químico atrapa los gases. Imprimes el gris, lo curas, y luego estampas el plastisol blanco encima. Blanco puro asegurado.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto para DTF:</strong> Si trabajas con DTF, la migración es brutal. Para evitar clientes furiosos con logotipos blancos vueltos de color rosa o celeste, utiliza Polvo Poliamida Negro al curar tus transfers. El polvo negro crea una barrera física en la espalda del diseño que impide el paso del tinte gasificado de la prenda.</p></div>` },
    { title: "Rentabilidad: ¿DTF o DTG?", tag: "Negocios", date: "Abr 10, 2026",
      body: `<p>Si tienes capital para invertir y quieres expandir tu taller hacia el mundo digital full color, la decisión entre DTG (Direct To Garment) y DTF (Direct To Film) dictará el futuro operativo de tu negocio. Ambas máquinas cuestan miles de dólares, pero su rentabilidad es radicalmente opuesta según tu mercado.</p><h3>DTG (Impresión Directa a Prenda)</h3><p>El DTG es literalmente una impresora de inyección de tinta donde metes la camiseta entera adentro. <br><strong>Pros:</strong> El tacto es insuperable, ya que la tinta blanca se funde con el hilo de algodón, logrando la calidad retail de marcas gigantes. <br><strong>Contras:</strong> Requiere pre-tratamiento líquido obligatorio en cada prenda oscura. Solo imprime sobre prendas con 80% o más de algodón. El costo de tinta por prenda es alto y las máquinas exigen ambientes rigurosamente controlados.</p><h3>DTF (Impresión Directa a Film)</h3><p>El DTF imprime sobre una lámina PET, la rocía con adhesivo y luego tú planchas ese transfer donde quieras. <br><strong>Pros:</strong> Se adhiere a algodón, poliéster, lycra, cuero y maderas. Sin pretratamiento en la tela. Extremadamente versátil y la máquina puede imprimir en rollo mientras tú te dedicas a otra cosa. <br><strong>Contras:</strong> El diseño queda con una leve textura plástica que no gusta a ciertas marcas de alta moda, y estampar bloques sólidos enormes genera "pecheras" que hacen sudar al usuario.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> En América Latina, la batalla está ganada por el DTF. La versatilidad de estampar cualquier tela del mercado chino sin importar el porcentaje de algodón o poliéster, con márgenes de rentabilidad sobre el 300%, hace del DTF la máquina predilecta para el 95% de los talleres colombianos.</p></div>` },
    { title: "Mejores marcas de papel de sublimación", tag: "Materiales", date: "Abr 09, 2026",
      body: `<p>El papel de sublimación no es simple papel bond; tiene un recubrimiento químico de silicato que impide que la tinta líquida sea absorbida por la celulosa, manteniéndola en la superficie lista para gasificarse al recibir calor. Usar un papel barato te obligará a gastar más tinta y dejará tus prendas opacas.</p><h3>Secado Rápido vs Secado Lento</h3><p>Existen dos variantes principales en el mercado. El papel "Tacky" (con adhesivo térmico activado) y el papel regular. Si sublimas tazas o camisetas donde el papel no puede moverse un milímetro al abrir la plancha (para evitar el ghosting), necesitas papel con polímero tacky. Si tu taller es muy húmedo, busca papeles de secado ultrarrápido para evitar los "caminitos de hormiga" que dejan los rodillos de arrastre de la impresora Epson.</p><h3>Gramajes Ideales</h3><ul><li><strong>100g a 120g:</strong> Ideal para tazas, mugs y prendas pequeñas. Tiene cuerpo para no arrugarse bajo la resistencia.</li><li><strong>70g a 90g:</strong> Ideal para producción masiva de sublimación rollo a rollo, seca más rápido y consume menos masa térmica.</li></ul><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> Muchos talleres intentan ahorrar centavos imprimiendo con tintas de sublimación en papel de oficina normal (papel bond). Esto es un error financiero: el papel bond absorbe el 60% de la tinta hasta el núcleo. Transferirás colores muertos y pálidos, y tendrás que botar la prenda a la basura.</p></div>` },
    { title: "Cuatricromía en serigrafía: Consejos de oro", tag: "Serigrafía", date: "Abr 08, 2026",
      body: `<p>La cuatricromía (CMYK) es la técnica reina para imprimir fotografías hiperrealistas en serigrafía con solo 4 mallas: Cyan, Magenta, Amarillo y Negro (y un quinto blanco para fondos oscuros). Sin embargo, es altamente temida por los problemas de Moiré y contaminación de color en el carrusel.</p><h3>La ciencia de las lineaturas y ángulos</h3><p>Si revelas los 4 colores en los mismos ángulos, los puntos se imprimirán uno exactamente encima de otro y crearán lodo oscuro. Debes decirle a Photoshop o a tu RIP que asigne inclinaciones distintas. El estándar más funcional es: Cyan 15°, Magenta 75°, Amarillo 90° y Negro 45°. Además, usar lineaturas de 45 a 55 LPI requiere mallas de altísimo número de hilos (120 hilos/cm) tensionadas perfectamente a 25 Newtons.</p><h3>El orden de impresión es vital</h3><p>Las tintas CMYK de serigrafía son translúcidas por naturaleza para permitir la mezcla óptica en la prenda. El orden en que caen sobre la camiseta dicta el resultado final. El estándar europeo y americano suele ser: **Amarillo > Magenta > Cyan > Negro**. (Imprimir de los tonos más brillantes a los más oscuros).</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> Si imprimes cuatricromía húmedo sobre húmedo (wet-on-wet) sin flash cure entre pasadas, la tinta se pegará a la parte inferior del siguiente marco, manchando todos los colores. Para evitarlo, usa tintas de "baja viscosidad" especialmente formuladas para cuatricromía CMYK húmedo y aplica tensiones muy altas en las mallas para un "fuera de contacto" rápido y limpio.</p></div>` },
    { title: "Cómo limpiar cabezales Epson para DTF", tag: "Mantenimiento", date: "Abr 07, 2026",
      body: `<p>El mantenimiento de cabezales en máquinas DTF y sublimación es el dolor de cabeza número uno en la industria. Las tintas blancas de DTF están cargadas de dióxido de titanio pesado que sedimenta y obstruye los inyectores de los cabezales Epson XP600 o i3200 en cuestión de días si no haces un protocolo riguroso.</p><h3>La jeringa y el líquido limpiador</h3><p>Si el software de limpieza de cabezales (Head Cleaning) ya no resuelve el test de inyectores faltantes, la limpieza manual ("Water fall") es el último recurso. Consiste en retirar los dampers, conectar una manguerita de silicona suave a la espiga del inyector y presionar con una jeringa líquido limpiador especializado para tintas pigmentadas textiles.</p><h3>Los peligros del exceso de presión</h3><p>El error catastrófico que cometen los novatos es empujar la jeringa con demasiada fuerza. Los cabezales Epson piezoeléctricos tienen membranas microscópicas de cerámica. Si fuerzas el líquido para "destapar", reventarás la pared interna entre el canal de color y el blanco. El resultado: colores cruzados permanentemente. El cabezal se dañó para siempre y cuesta cientos de dólares.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> El mejor mantenimiento no es limpiar, es **prevenir**. Nunca dejes la impresora apagada el fin de semana. Instala el software de "limpieza automática cada 12 horas" y agita tus tanques de tinta blanca vigorosamente cada mañana antes de encender la máquina. Mantener la humedad del ambiente al 55% evitará que la tinta se seque en el capping.</p></div>` },
    { title: "El impacto de la humedad en el polvo DTF", tag: "DTF", date: "Abr 06, 2026",
      body: `<p>Uno de los factores técnicos menos comprendidos y más culpados por fallas en DTF es la humedad ambiental y su interacción con el polvo adhesivo hot-melt (Poliamida/TPU). Un taller con humedad no controlada experimentará estampados que se desmoronan a los 10 días.</p><h3>Comportamiento Higroscópico</h3><p>El polvo poliamida es altamente higroscópico, lo que significa que absorbe la humedad del aire como una esponja. Si dejas tu bandeja de polvo destapada en una ciudad como Lima o en días lluviosos en Bogotá, el polvo se llenará de micro-gotas de agua. Cuando metes el film empolvado al horno a 140°C, el agua atrapada hierve y explota, creando cráteres y huecos invisibles en tu capa adhesiva.</p><h3>Síntomas de un polvo húmedo</h3><p>¿Cómo saber si tu polvo está arruinado? Durante el horneado, el adhesivo no se verá liso como un plástico fundido continuo, sino que se formarán burbujas o se quedará granulado. Además, notarás que en la bandeja vibratoria del shaker, el polvo se aglutina formando "piedras" y no cae uniformemente sobre la tinta blanca mojada.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> La solución es sencilla pero estricta: almacena siempre tu polvo sobrante al finalizar el turno en cajas herméticas con bolsitas de sílica gel. Además, instala un higrómetro barato en tu área de curado para asegurar que la humedad esté por debajo del 50%. Si ya está húmedo, mételo en un horno casero a 50°C durante 1 hora para deshidratarlo sin derretirlo.</p></div>` },
    { title: "Diseñando para serigrafía con Illustrator", tag: "Diseño", date: "Abr 05, 2026",
      body: `<p>A diferencia de imprimir en papel, donde puedes mandar cualquier mezcla de colores y degradados y la impresora los resuelve, la serigrafía exige un archivo rigurosamente preparado donde cada color está separado, registrado y vectorizado en capas independientes. Illustrator es la herramienta rey para este proceso técnico.</p><h3>La regla del Overprint (Reventes / Trapping)</h3><p>La tela no es papel; es un tejido vivo que se estira y contrae al recibir el calor de las lámparas de secado rápido (flash cure). Si tienes letras rojas sobre un fondo azul y cortas los vectores exactos borde a borde, al imprimir en tela notarás líneas blancas entre ambos colores (errores de registro). En Illustrator debes aplicar "Trapping" o "Revente": expandir microscópicamente el vector rojo unos 0.5 puntos para que invada al azul y se solapen ligeramente, eliminando huecos.</p><h3>Tintas planas y colores globales</h3><p>El peor hábito es diseñar usando colores en el panel estándar o la rueda de color. Acostúmbrate a crear Muestras (Swatches) y marcar la opción "Color Global" o asignar Tintas Planas (Spot Colors) como referencias Pantone. Esto le permite al programa imprimir separaciones automáticas exactas, donde el RIP saca un fotolito independiente por cada Tinta Plana definida en tu arte.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> Siempre diseña al 100% del tamaño de impresión real. Si el estampado en la camiseta medirá 30 cm de ancho, tu Mesa de Trabajo (Artboard) en Illustrator debe estar seteada en centímetros a ese tamaño exacto. Evitas escalas de última hora que destrozan los grosores de los trazos (Strokes).</p></div>` },
    { title: "Perfiles ICC: Por qué tus colores salen opacos", tag: "Color", date: "Abr 04, 2026",
      body: `<p>Una de las peores experiencias como estampador de sublimación o DTF es ver tu diseño súper brillante, neón y contrastado en el monitor (RGB), para luego imprimirlo, plancharlo y descubrir un estampado lavado, opaco y con negros que parecen grises verdosos. El responsable directo: La falta de un perfil de color ICC correcto.</p><h3>¿Qué es el Perfil ICC?</h3><p>Tu monitor emite luz RGB, y tu impresora deposita tinta física CMYK. El Perfil ICC es el "traductor oficial" entre ambos mundos. Le dice a la impresora exactamente cuántas gotas de cian, magenta, amarillo y negro debe combinar para alcanzar ese azul eléctrico que ves en pantalla. Las impresoras caseras adaptadas a sublimación o DTF no saben que tienen tinta textil dentro; asumen que tienen tinta fotográfica de papel.</p><h3>El mito de los "Ajustes Manuales"</h3><p>Muchos talleres intentan solucionar colores opacos aumentando el brillo o saturación en Photoshop a ciegas. Esto es un error que te roba tiempo y consume exceso de tinta. Instalar el archivo *.icc o *.icm provisto por el fabricante de TUS tintas exactas, e integrarlo en Photoshop o Maintop/Flexi, ajustará las curvas matemáticas para escupir la gota perfecta de tinta requerida por la refracción de ese pigmento.</p><div class="mc-highlight-box"><p><strong>🔥 Consejo de experto:</strong> El perfil ICC depende de TRES factores: La impresora, el modelo exacto de tinta y el papel. Si cambias de marca de papel de sublimación de un lote a otro, los niveles de absorción cambian y tus colores se alterarán. Exige a tu distribuidor el perfil ICC correspondiente a su tinta.</p></div>` }
];

let filesWritten = 0;
const blogDir = path.join(__dirname, 'blog');

batch1.forEach(post => {
    const slug = toSlug(post.title) + '.html';
    const filePath = path.join(blogDir, slug);
    
    // Minimal template logic that calls the body.
    const metaSection = `<div class="mc-post-meta">
        <span class="mc-post-tag">${post.tag}</span>
        <span>📅 ${post.date}</span>
        <span>⏱️ 5 min de lectura</span>
    </div>`;

    const html = `<!DOCTYPE html>
<html data-bs-theme="dark" lang="es-419">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>${post.title} | Migo Creativo</title>
    <meta name="description" content="Guía experta sobre ${post.title}.">
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
                    <li class="nav-item"><a class="nav-link" href="../academia/index.html">Academia</a></li>
                    <li class="nav-item"><a class="nav-link active" href="../blog/index.html">Blog</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <header class="mc-post-header pb-5" style="background: var(--mc-bg-deep); border-bottom: 1px solid var(--mc-glass-border);">
        <div class="container text-center">
            ${metaSection}
            <h1 style="font-size: 2.5rem; font-weight: 800; line-height: 1.2; margin-bottom: 1.5rem; max-width: 900px; margin-left: auto; margin-right: auto;">${post.title}</h1>
        </div>
    </header>

    <section class="py-5" style="background: var(--mc-bg-surface);">
        <div class="container">
            <div class="mc-post-body mc-reveal">
                ${post.body}
                
                <div class="mc-post-author-box">
                    <img src="../assets/img/LOGO/LOGO NUEVO.jpg" alt="Miguel Heredia">
                    <div>
                        <h4 style="margin-bottom: 0.25rem;">Miguel Heredia</h4>
                        <p style="margin-bottom: 0;">Diseñador experto en serigrafía, DTF y sublimación. CEO de Migo Creativo en Bogotá, Colombia.</p>
                    </div>
                </div>
            </div>
            <div class="text-center mt-5">
                <a href="index.html" class="mc-btn-primary">← Volver al Blog</a>
            </div>
        </div>
    </section>

    <footer class="mc-footer"><div class="container py-4"><div class="mc-footer-bottom text-center"><p class="mb-0">© 2026 Migo Creativo | Hecho con ❤️ en Colombia</p></div></div></footer>
    <script src="../assets/js/jquery.min.js"></script>
    <script src="../assets/bootstrap/js/bootstrap.min.js"></script>
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

console.log(`Lote 1 completado. Se han reescrito ${filesWritten} artículos de blog con contenido técnico avanzado y único.`);
