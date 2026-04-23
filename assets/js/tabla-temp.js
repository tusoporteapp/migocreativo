/**
 * MigoCreativo — Tabla de Temperaturas
 */
document.addEventListener('DOMContentLoaded', () => {
    const tecSelect = document.getElementById('tec-select');
    const matSelect = document.getElementById('mat-select');
    const valTemp = document.getElementById('val-temp');
    const valTime = document.getElementById('val-time');
    const valPress = document.getElementById('val-press');
    const valPeel = document.getElementById('val-peel');
    const valNotes = document.getElementById('val-notes');

    if (!tecSelect) return;

    const db = {
        'dtf_estandar': {
            materials: [
                { id: 'algodon', name: 'Algodón 100%' },
                { id: 'poliester', name: 'Poliéster / Mezclas' },
                { id: 'jean', name: 'Denim (Jean)' }
            ],
            params: {
                'algodon': { temp: '160°C', time: '15s', press: 'Media-Alta', peel: 'Frío / Tibio', note: 'Re-prensar 5s con teflón para sellar y dar textura mate.' },
                'poliester': { temp: '150°C', time: '12s', press: 'Media', peel: 'Frío', note: 'Bajar temperatura para evitar migración de color del poliéster. Re-prensar 5s.' },
                'jean': { temp: '165°C', time: '20s', press: 'Alta', peel: 'Frío', note: 'Las telas gruesas necesitan más tiempo y presión para que el adhesivo penetre.' }
            }
        },
        'dtf_premium': {
            materials: [
                { id: 'algodon', name: 'Algodón 100%' },
                { id: 'poliester', name: 'Poliéster (Evitar Migración)' }
            ],
            params: {
                'algodon': { temp: '150°C', time: '12s', press: 'Media', peel: 'Frío', note: 'El polvo premium funde más rápido.' },
                'poliester': { temp: '140°C', time: '12s', press: 'Media', peel: 'Frío', note: 'Ideal para ropa deportiva para no quemar el tinte de la tela.' }
            }
        },
        'sublimacion_tela': {
            materials: [
                { id: 'poliester_blanco', name: 'Poliéster Blanco (>70%)' }
            ],
            params: {
                'poliester_blanco': { temp: '200°C', time: '40s - 45s', press: 'Media', peel: 'Caliente', note: 'Asegurar bien el papel con cinta térmica para evitar efecto fantasma (ghosting).' }
            }
        },
        'sublimacion_taza': {
            materials: [
                { id: 'taza_ceramica', name: 'Taza Cerámica 11oz' }
            ],
            params: {
                'taza_ceramica': { temp: '190°C', time: '180s', press: 'Media-Alta', peel: 'Caliente', note: 'El tiempo puede variar dependiendo de qué tan rápido caliente tu resistencia de tazas.' }
            }
        },
        'sublimacion_mousepad': {
            materials: [
                { id: 'neopreno', name: 'Neopreno / Mousepad' }
            ],
            params: {
                'neopreno': { temp: '190°C', time: '40s - 50s', press: 'Baja-Media', peel: 'Caliente', note: 'Mucha presión puede aplastar permanentemente el neopreno.' }
            }
        },
        'vinil_detalle': {
            materials: [
                { id: 'algodon_poli', name: 'Algodón / Poliéster' }
            ],
            params: {
                'algodon_poli': { temp: '150°C', time: '10s - 15s', press: 'Media', peel: 'Tibio / Caliente', note: 'Lee las instrucciones específicas de tu marca de vinil, algunas son peel cold.' }
            }
        },
        'vinil_holografico': {
            materials: [
                { id: 'algodon_poli', name: 'Algodón / Poliéster' }
            ],
            params: {
                'algodon_poli': { temp: '160°C', time: '15s', press: 'Alta', peel: 'Totalmente Frío', note: 'Si pelas caliente el vinil holográfico perderá su brillo o se rasgará.' }
            }
        }
    };

    function updateMaterials() {
        const tec = tecSelect.value;
        const materials = db[tec].materials;
        
        matSelect.innerHTML = '';
        materials.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m.id;
            opt.textContent = m.name;
            matSelect.appendChild(opt);
        });
        
        updateParams();
    }

    function updateParams() {
        const tec = tecSelect.value;
        const mat = matSelect.value;
        
        if(db[tec] && db[tec].params[mat]) {
            const data = db[tec].params[mat];
            valTemp.textContent = data.temp;
            valTime.textContent = data.time;
            valPress.textContent = data.press;
            valPeel.textContent = data.peel;
            valNotes.textContent = data.note;
        }
    }

    tecSelect.addEventListener('change', updateMaterials);
    matSelect.addEventListener('change', updateParams);

    // Init
    updateMaterials();
});
