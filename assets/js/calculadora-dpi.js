/**
 * MigoCreativo — Calculadora de DPI
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('dpi-form');
    const resultBox = document.getElementById('result-box');
    const resultDpi = document.getElementById('result-dpi');
    const resultTitle = document.getElementById('result-title');
    const resultMsg = document.getElementById('result-msg');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const pxW = parseFloat(document.getElementById('img-width').value);
        const pxH = parseFloat(document.getElementById('img-height').value);
        const cmW = parseFloat(document.getElementById('print-width').value);
        const cmH = parseFloat(document.getElementById('print-height').value);

        if (!pxW || !pxH || !cmW || !cmH) return;

        // 1 inch = 2.54 cm
        const inchesW = cmW / 2.54;
        const inchesH = cmH / 2.54;

        // Calculate DPI for both sides (they should be roughly equal if aspect ratio matches)
        const dpiW = Math.round(pxW / inchesW);
        const dpiH = Math.round(pxH / inchesH);
        
        // Take the lowest DPI as the limiting factor
        const finalDPI = Math.min(dpiW, dpiH);

        resultDpi.textContent = finalDPI + ' DPI';
        
        resultBox.classList.remove('mc-result-success', 'mc-result-warning', 'mc-result-danger');
        
        if (finalDPI >= 300) {
            resultBox.classList.add('mc-result-success');
            resultTitle.textContent = '¡Calidad Óptima!';
            resultMsg.textContent = 'Tu imagen tiene excelente resolución para ese tamaño. Es perfecta para DTF y Sublimación.';
        } else if (finalDPI >= 150) {
            resultBox.classList.add('mc-result-warning');
            resultTitle.textContent = 'Calidad Aceptable';
            resultMsg.textContent = 'La imagen se verá bien en serigrafía o en impresiones grandes que se ven de lejos, pero puede notarse borrosa de cerca en DTF.';
        } else {
            resultBox.classList.add('mc-result-danger');
            resultTitle.textContent = 'Resolución Muy Baja';
            resultMsg.textContent = 'No imprimas esto. La imagen se verá pixelada y borrosa. Necesitas vectorizarla o redibujarla.';
        }

        resultBox.style.display = 'block';
    });
});
