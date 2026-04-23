/* MigoBot - Chatbot Wiki de Estampado Textil (v2.0) */
(function(){
const KB=[
{k:["hola","hey","buenas","saludos","hi"],r:"¡Hola! 👋 Soy MigoBot, el asistente virtual de Migo Creativo. Puedo ayudarte con dudas sobre serigrafía, DTF y sublimación. ¿Qué quieres saber?"},
{k:["quien","quién","miguel","heredia","migo creativo","fundador","ceo"],r:"Migo Creativo fue fundado por Miguel Heredia, especialista en optimización de imágenes para estampado textil en Colombia. Su servicio principal es preparar archivos listos para producción en serigrafía, DTF y sublimación."},
{k:["servicio","qué hacen","que hacen","qué haces","que haces","ofrecen"],r:"En Migo Creativo optimizamos tus imágenes para estampado textil. No vendemos diseños: tomamos TU imagen y la preparamos profesionalmente para serigrafía, DTF o sublimación. Separación de colores, perfiles ICC, resolución correcta — todo listo para producir."},
{k:["contacto","whatsapp","teléfono","telefono","escribir","cotizar","precio","costo","cuánto","cuanto","cobran"],r:"¡Con gusto! Escríbele directamente a Miguel por WhatsApp: wa.me/573023579755 📱 Te responde en menos de 24 horas y te asesora sin compromiso."},
{k:["diferencia","comparar","comparación","cuál es mejor","cual es mejor","versus","vs"],r:"📊 Las 3 técnicas principales:\n\n🖨️ SERIGRAFÍA: Ideal para pedidos grandes (+50 uds), pocos colores (1-6), máxima durabilidad. Funciona en cualquier tela.\n\n🎯 DTF: Perfecto para pedidos pequeños, colores ilimitados, cualquier tela y color. Muy versátil.\n\n✨ SUBLIMACIÓN: Colores vibrantes que penetran la tela. Solo para poliéster y telas claras. Tacto invisible.\n\n¿Quieres saber más de alguna en específico?"},
{k:["serigrafía","serigrafia","screen printing","pantalla","malla"],r:"🖨️ SERIGRAFÍA\n\nEs la técnica más veterana. Se pasa tinta a través de una malla tensada sobre la tela. Cada color necesita una pantalla diferente.\n\n✅ Ventajas:\n• Durabilidad extrema (sobrevive cientos de lavados)\n• Colores vibrantes y opacos\n• Bajo costo por unidad en volumen alto\n• Funciona en cualquier tipo de tela\n\n❌ Desventajas:\n• Setup costoso (pantallas, fotolitos)\n• No es rentable para pocas unidades\n• Limitado a 1-6 colores por diseño\n• No reproduce bien los degradados"},
{k:["dtf","direct to film","directo al film","film"],r:"🎯 DTF (Direct to Film)\n\nSe imprime el diseño en un film especial con tinta CMYK + blanco, se aplica polvo adhesivo y se transfiere con calor.\n\n✅ Ventajas:\n• Colores ilimitados y degradados perfectos\n• Funciona en CUALQUIER tela (algodón, poliéster, mezclas)\n• Funciona en telas claras Y oscuras\n• Rentable desde 1 unidad\n• No necesita setup costoso\n\n❌ Desventajas:\n• Deja una ligera película al tacto\n• Menos durable que serigrafía (50-80 lavados)\n• Requiere plancha de calor o prensa"},
{k:["sublimación","sublimacion","sublimar","sublimated"],r:"✨ SUBLIMACIÓN\n\nLa tinta pasa de sólido a gas y penetra las fibras del poliéster. El diseño se vuelve parte de la tela — no se siente al tocar.\n\n✅ Ventajas:\n• Tacto invisible (no se siente nada)\n• Colores vibrantes y duraderos\n• Ideal para full-print / all-over\n• Funciona en tazas, mouse pads, carcasas\n\n❌ Desventajas:\n• SOLO funciona en poliéster (o recubrimiento de poliéster)\n• SOLO en telas/superficies CLARAS\n• No cubre — tiñe (en oscuro no se ve)"},
{k:["resolución","resolucion","dpi","calidad","pixeles","píxeles"],r:"📐 RESOLUCIÓN PARA ESTAMPADO\n\nLa regla de oro: mínimo 300 DPI al tamaño real de impresión.\n\n• 72 DPI = pantalla/web (NO sirve para estampar)\n• 150 DPI = calidad baja (se ven los píxeles)\n• 300 DPI = calidad profesional ✅\n• 600 DPI = calidad ultra (para detalles finos)"},
{k:["color","cmyk","rgb","pantone","perfil","icc","colores"],r:"🎨 PERFILES DE COLOR\n\n• RGB: Para pantallas. NO uses RGB para imprimir.\n• CMYK: Para sublimación y DTF. Los colores se mezclan con cyan, magenta, amarillo y negro.\n• PANTONE: Para serigrafía. Cada color es una tinta específica premezclada.\n\n🔧 Perfil ICC: Es un archivo que le dice a tu impresora cómo interpretar los colores."},
{k:["algodón","algodon","tela","material","poliéster","poliester","mezcla","tejido","prenda"],r:"👕 GUÍA DE TELAS POR TÉCNICA\n\n• Algodón 100%: Serigrafía ✅ | DTF ✅ | Sublimación ❌\n• Poliéster 100%: Serigrafía ✅ | DTF ✅ | Sublimación ✅\n• Mezcla 50/50: Serigrafía ✅ | DTF ✅ | Sublimación ⚠️ (colores lavados)\n• Nylon: Serigrafía ⚠️ | DTF ✅ | Sublimación ❌\n• Tela oscura: Serigrafía ✅ | DTF ✅ | Sublimación ❌\n• Tela clara: Serigrafía ✅ | DTF ✅ | Sublimación ✅"},
{k:["durar","lavado","durabilidad","lavar","dura","aguanta","resistencia"],r:"🧺 DURABILIDAD POR TÉCNICA\n\n• Serigrafía: ⭐⭐⭐⭐⭐ (+200 lavados). La tinta queda incrustada. Puede durar más que la prenda.\n• DTF: ⭐⭐⭐⭐ (50-80 lavados). Buena durabilidad si se aplica correctamente.\n• Sublimación: ⭐⭐⭐⭐⭐ (permanente). El color ES la tela — no se pela ni se agrieta."},
{k:["formato","archivo","ai","psd","png","jpg","eps","vector","vectorizar"],r:"📁 FORMATOS DE ARCHIVO\n\n🖨️ Para Serigrafía:\n• Ideal: AI, EPS, SVG (vectores)\n• Aceptable: PSD con capas separadas por color\n\n🎯 Para DTF:\n• Ideal: PNG con fondo transparente\n• Aceptable: PSD, TIFF\n\n✨ Para Sublimación:\n• Ideal: TIFF en CMYK\n• Aceptable: PSD, PNG"},
{k:["separación","separacion","separar colores","fotolito","trama"],r:"🔬 SEPARACIÓN DE COLORES (Serigrafía)\n\nEs el proceso de dividir un diseño en sus colores individuales. Cada color se imprime por separado con su propia pantalla.\n\nTipos:\n• Directa/Spot: Cada color es una tinta Pantone.\n• Cuatricromía (CMYK): Se simula el color con 4 pantallas (C, M, Y, K).\n• Simulated Process: Se simulan colores con tintas spot para fotos en tela oscura."},
{k:["temperatura","calor","prensa","plancha","tiempo","presión","presion","transfer"],r:"🌡️ TEMPERATURAS DE TRANSFERENCIA\n\n🎯 DTF:\n• Temp: 160-170°C\n• Tiempo: 15-20 seg\n• Presión: Media-Alta\n\n✨ Sublimación:\n• Temp: 190-210°C\n• Tiempo: 45-60 seg\n• Presión: Media"},
{k:["empezar","comenzar","negocio","emprendimiento","equipo","máquina","maquina","invertir","necesito"],r:"🚀 ¿QUIERES EMPEZAR EN ESTAMPADO?\n\nEquipo mínimo por técnica:\n\n🎯 DTF (más fácil para empezar):\n• Impresora DTF\n• Horno de curado\n• Prensa de calor\n\n✨ Sublimación:\n• Impresora con tinta de sublimación\n• Prensa de calor\n\n🖨️ Serigrafía:\n• Mesa de estampado\n• Marcos, mallas e insoladora"},
{k:["error","problema","sale mal","defecto","mancha","borroso","opaco","deslavado"],r:"🔧 PROBLEMAS COMUNES Y SOLUCIONES\n\n❌ Colores opacos/apagados:\n→ Verifica el perfil ICC y la calibración\n\n❌ Imagen borrosa:\n→ Tu archivo tiene menos de 300 DPI\n\n❌ El estampado se pela:\n→ (DTF) Temperatura o tiempo incorrectos\n\n❌ Colores diferentes a la pantalla:\n→ Tu monitor no está calibrado"},
{k:["gracias","thank","genial","excelente","perfecto","chévere","chevere"],r:"¡Con mucho gusto! 😊 Si necesitas optimizar tus imágenes para producción, recuerda que en Migo Creativo estamos para ayudarte."},
{k:["taza","mug","carcasa","mouse pad","rígido","rigido","producto"],r:"🎁 ESTAMPADO EN PRODUCTOS RÍGIDOS\n\nPara tazas, mouse pads, carcasas y similares se usa SUBLIMACIÓN.\n\nRequisitos:\n• El producto debe tener recubrimiento de poliéster\n• Imagen en CMYK a 300 DPI\n• Imagen en espejo\n\n⚠️ DTF o Serigrafía NO se recomiendan para esto."},
{k:["camiseta","camisa","polo","hoodie","gorra","textil"],r:"👕 ESTAMPADO EN PRENDAS\n\nPara camisetas/hoodies:\n• Algodón + pocos colores → Serigrafía\n• Algodón + full color → DTF\n• Poliéster + tela clara → Sublimación\n\nPara gorras:\n• DTF es el más versátil"},
{k:["rip","software","acrorip","cadlink","imprimir dtf"],r:"💻 SOFTWARE RIP (Raster Image Processor)\n\nEs vital para DTF. Un RIP (como AcroRIP o Cadlink) controla cómo se imprime la base blanca y la densidad de tinta de color. No puedes imprimir DTF directamente desde Photoshop, necesitas el RIP para generar el canal blanco de forma automática o manual."},
{k:["ghosting","fantasma","sombra","doble"],r:"👻 GHOSTING (Efecto Fantasma)\n\nOcurre en la sublimación o DTF cuando el papel o film se mueve mientras la prenda aún está caliente, creando una imagen doble o sombra. Solución: usa cinta térmica para fijar el diseño y retira el papel/film de un solo tirón rápido."},
{k:["plastisol","base agua","descarga","tinta serigrafia","tintas"],r:"🎨 TINTAS DE SERIGRAFÍA\n\n• Plastisol: La más común. No se seca al aire (necesita calor). Colores opacos y vibrantes, pero tacto plástico.\n• Base Agua: Se seca al aire. Tacto muy suave, se integra a la tela. Difícil de usar porque se seca en la malla.\n• Descarga (Discharge): Destiñe la tela oscura y la tiñe del nuevo color. Cero tacto. Solo funciona en 100% algodón."},
{k:["halftone","trama","puntos","semitonos"],r:"⚫ TRAMA DE SEMITONOS (Halftone)\n\nEn serigrafía, no podemos imprimir opacidades (ej. 50% de gris). Para simular degradados, convertimos la imagen en puntos puros (halftones). Puntos grandes = color oscuro. Puntos pequeños = color claro. Se necesita mínimo 300 DPI para generarlos correctamente."}
];

const fallbackText="🤔 No tengo una respuesta específica para eso, pero puedo ayudarte con:\n\n• Serigrafía, DTF, Sublimación\n• Resolución y formatos de archivo\n• Perfiles de color (CMYK, RGB)\n• Temperaturas de transferencia\n• Problemas comunes\n\nIntenta preguntarme sobre alguno de estos temas, o mejor aún, **habla directamente con Miguel**:";

function findAnswer(q){
  const ql=q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  let best=null,bestScore=0;
  for(const item of KB){
    let score=0;
    for(const k of item.k){
      const kn=k.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
      if(ql.includes(kn))score+=kn.length;
    }
    if(score>bestScore){bestScore=score;best=item;}
  }
  
  if(bestScore>0) return { text: best.r, isFallback: false };
  return { text: fallbackText, isFallback: true };
}

function getContextualSuggestions() {
    const url = window.location.pathname.toLowerCase();
    if (url.includes('calculadora-dpi')) return ["¿Qué es DPI?", "Resolución", "Formatos", "Vectores"];
    if (url.includes('tabla-temperaturas')) return ["Temperaturas DTF", "Temperaturas Sublimación", "Ghosting"];
    if (url.includes('comparador')) return ["Diferencias", "Serigrafía", "DTF", "Sublimación"];
    if (url.includes('costos') || url.includes('cotizar')) return ["Empezar negocio", "Precio", "Servicio"];
    if (url.includes('academia') || url.includes('blog')) return ["¿Qué es DTF?", "Perfiles ICC", "Separación de colores", "Tramas"];
    
    // Default
    return ["¿Qué es DTF?", "Serigrafía", "Sublimación", "Diferencias", "Durabilidad", "Resolución"];
}

function createBot(){
  // Reuse existing CSS if already appended
  if(!document.getElementById('mcbot-style')) {
      const css=document.createElement('style');
      css.id = 'mcbot-style';
      css.textContent=`
      .mcbot-btn{position:fixed;bottom:24px;right:24px;width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#FF7A00,#5B4FD6);border:none;cursor:pointer;box-shadow:0 4px 20px rgba(255,122,0,.4);z-index:9999;display:flex;align-items:center;justify-content:center;font-size:28px;transition:transform .3s,box-shadow .3s;animation:mcbot-pulse 2s infinite}
      .mcbot-btn:hover{transform:scale(1.1);box-shadow:0 6px 30px rgba(255,122,0,.5)}
      @keyframes mcbot-pulse{0%,100%{box-shadow:0 4px 20px rgba(255,122,0,.4)}50%{box-shadow:0 4px 30px rgba(255,122,0,.6)}}
      .mcbot-window{position:fixed;bottom:96px;right:24px;width:380px;max-width:calc(100vw - 32px);height:520px;max-height:calc(100vh - 120px);background:#13132A;border:1px solid rgba(255,255,255,.08);border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.5);z-index:9998;display:none;flex-direction:column;overflow:hidden;font-family:'Inter',sans-serif}
      .mcbot-window.open{display:flex}
      .mcbot-header{padding:16px 20px;background:linear-gradient(135deg,rgba(255,122,0,.15),rgba(91,79,214,.15));border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;gap:12px;flex-shrink:0}
      .mcbot-header img{width:36px;height:36px;border-radius:50%;border:2px solid #FF7A00}
      .mcbot-header-info h4{margin:0;font-size:.95rem;color:#fff;font-weight:700}
      .mcbot-header-info span{font-size:.75rem;color:#9999B8}
      .mcbot-close{margin-left:auto;background:none;border:none;color:#9999B8;font-size:20px;cursor:pointer;padding:4px 8px;border-radius:6px;transition:all .2s}
      .mcbot-close:hover{background:rgba(255,255,255,.08);color:#fff}
      .mcbot-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px}
      .mcbot-messages::-webkit-scrollbar{width:4px}
      .mcbot-messages::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:4px}
      .mcbot-msg{max-width:85%;padding:12px 16px;border-radius:12px;font-size:.9rem;line-height:1.6;white-space:pre-line;word-wrap:break-word}
      .mcbot-msg.bot{background:#1A1A35;color:#EEEEF5;border:1px solid rgba(255,255,255,.06);align-self:flex-start;border-bottom-left-radius:4px}
      .mcbot-msg.user{background:linear-gradient(135deg,#FF7A00,#E06800);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
      .mcbot-input-area{padding:12px 16px;border-top:1px solid rgba(255,255,255,.08);display:flex;gap:8px;flex-shrink:0;background:#0B0B18}
      .mcbot-input{flex:1;background:#1A1A35;border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:10px 14px;color:#EEEEF5;font-size:.9rem;font-family:'Inter',sans-serif;outline:none;transition:border-color .2s}
      .mcbot-input:focus{border-color:#FF7A00}
      .mcbot-input::placeholder{color:#666}
      .mcbot-send{background:linear-gradient(135deg,#FF7A00,#5B4FD6);border:none;border-radius:8px;padding:10px 16px;color:#fff;cursor:pointer;font-size:1rem;transition:transform .2s}
      .mcbot-send:hover{transform:scale(1.05)}
      .mcbot-quick{display:flex;flex-wrap:wrap;gap:6px;padding:0 16px 12px}
      .mcbot-quick button{background:rgba(255,122,0,.1);border:1px solid rgba(255,122,0,.2);color:#FFa033;border-radius:100px;padding:5px 12px;font-size:.75rem;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;font-weight:500}
      .mcbot-quick button:hover{background:rgba(255,122,0,.2);border-color:#FF7A00}
      .mcbot-cta-btn{display:inline-block;background:#25D366;color:#fff !important;text-decoration:none;padding:8px 16px;border-radius:6px;font-weight:600;margin-top:10px;font-size:0.9rem;}
      `;
      document.head.appendChild(css);
  }

  const btn=document.createElement('button');
  btn.className='mcbot-btn';
  btn.innerHTML='💬';
  btn.title='Chat con MigoBot';
  btn.setAttribute('aria-label','Abrir chat');
  document.body.appendChild(btn);

  let basePath = '/';
  if (window.location.pathname.includes('/blog/') || window.location.pathname.includes('/academia/') || window.location.pathname.includes('/herramientas/')) {
      basePath = '../';
  }

  const win=document.createElement('div');
  win.className='mcbot-window';
  win.innerHTML=`
  <div class="mcbot-header">
    <img src="${basePath}assets/img/LOGO/LOGO NUEVO.jpg" alt="MigoBot">
    <div class="mcbot-header-info"><h4>MigoBot 🤖</h4><span>Wiki de Estampado Textil</span></div>
    <button class="mcbot-close" aria-label="Cerrar">✕</button>
  </div>
  <div class="mcbot-messages" id="mcbot-msgs"></div>
  <div class="mcbot-quick" id="mcbot-quick"></div>
  <div class="mcbot-input-area">
    <input class="mcbot-input" id="mcbot-input" placeholder="Pregunta sobre estampado..." autocomplete="off">
    <button class="mcbot-send" id="mcbot-send" aria-label="Enviar">➤</button>
  </div>`;
  document.body.appendChild(win);

  const msgs=document.getElementById('mcbot-msgs');
  const input=document.getElementById('mcbot-input');
  const sendBtn=document.getElementById('mcbot-send');
  const quickDiv=document.getElementById('mcbot-quick');

  const quickBtns = getContextualSuggestions();

  function addMsg(text,type, isHtml = false){
    const d=document.createElement('div');
    d.className='mcbot-msg '+type;
    if (isHtml) {
        d.innerHTML = text;
    } else {
        d.textContent=text;
    }
    msgs.appendChild(d);
    msgs.scrollTop=msgs.scrollHeight;
  }

  function showQuick(){
    quickDiv.innerHTML='';
    quickBtns.forEach(t=>{
      const b=document.createElement('button');
      b.textContent=t;
      b.onclick=()=>processInput(t);
      quickDiv.appendChild(b);
    });
  }

  function processInput(text){
    addMsg(text,'user');
    quickDiv.innerHTML='';
    setTimeout(()=>{
      const response = findAnswer(text);
      if (response.isFallback) {
          // Render HTML for the fallback button
          const htmlResponse = response.text.replace(/\n/g, '<br>') + '<br><a href="https://wa.me/573023579755" class="mcbot-cta-btn" target="_blank">Hablar con Miguel</a>';
          addMsg(htmlResponse, 'bot', true);
      } else {
          addMsg(response.text,'bot');
      }
      setTimeout(showQuick,500);
    },400);
  }

  function send(){
    const v=input.value.trim();
    if(!v)return;
    input.value='';
    processInput(v);
  }

  btn.onclick=()=>{
    const isOpen=win.classList.toggle('open');
    btn.innerHTML=isOpen?'✕':'💬';
    if(isOpen&&msgs.children.length===0){
      addMsg("¡Hola! 👋 Soy MigoBot, tu asistente de estampado textil.\n\nPuedo resolver tus dudas sobre serigrafía, DTF y sublimación. ¡Pregúntame lo que quieras!",'bot');
      showQuick();
    }
  };
  win.querySelector('.mcbot-close').onclick=()=>{win.classList.remove('open');btn.innerHTML='💬';};
  sendBtn.onclick=send;
  input.onkeydown=e=>{if(e.key==='Enter')send();};
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',createBot);
else createBot();
})();
