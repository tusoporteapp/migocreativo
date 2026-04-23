/**
 * MigoCreativo — Calculadora de Costos
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('costos-form');
    const prendaSelect = document.getElementById('c-prenda');
    const divCostoPrenda = document.getElementById('div-costo-prenda');
    const inputCostoPrenda = document.getElementById('c-prenda-costo');
    
    // Result elements
    const resultBox = document.getElementById('result-box');
    const resProd = document.getElementById('res-prod');
    const resPrendas = document.getElementById('res-prendas');
    const resDiseno = document.getElementById('res-diseno');
    const resTotal = document.getElementById('res-total');
    const resUnit = document.getElementById('res-unit');

    if (!form) return;

    // Show/hide manual price input
    prendaSelect.addEventListener('change', () => {
        if (prendaSelect.value === 'custom') {
            divCostoPrenda.style.display = 'block';
            inputCostoPrenda.required = true;
        } else {
            divCostoPrenda.style.display = 'none';
            inputCostoPrenda.required = false;
        }
    });

    const formatCOP = (num) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(num);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const tecnica = document.getElementById('c-tecnica').value;
        const cantidad = parseInt(document.getElementById('c-cantidad').value);
        const prendaTipo = document.getElementById('c-prenda').value;
        const margen = parseFloat(document.getElementById('c-margen').value) / 100;
        const costoDiseno = parseInt(document.getElementById('c-diseno').value);

        // 1. Calcular Costos Base de Producción (Materiales + Luz + Depreciación)
        // Valores estimados del mercado en Colombia 2026
        let costoProdUnidad = 0;
        if (tecnica === 'dtf_a4') costoProdUnidad = 3500;
        if (tecnica === 'dtf_a3') costoProdUnidad = 6500;
        if (tecnica === 'sublimacion_a4') costoProdUnidad = 1500;
        if (tecnica === 'sublimacion_taza') costoProdUnidad = 1200;

        const totalProdBase = costoProdUnidad * cantidad;

        // 2. Calcular Costo de Prendas
        let costoPrendaUnidad = 0;
        if (prendaTipo === 'basica') costoPrendaUnidad = 12000;
        else if (prendaTipo === 'premium') costoPrendaUnidad = 20000;
        else if (prendaTipo === 'hoodie') costoPrendaUnidad = 35000;
        else if (prendaTipo === 'taza') costoPrendaUnidad = 4000;
        else if (prendaTipo === 'custom') costoPrendaUnidad = parseInt(inputCostoPrenda.value) || 0;

        const totalPrendasBase = costoPrendaUnidad * cantidad;

        // 3. Aplicar Margen y Calcular Total
        // El precio sugerido es Costo / (1 - Margen)
        // Ejemplo: Costo 1000, Margen 40%. Precio = 1000 / 0.6 = 1666. Ganancia = 666 (40% de 1666)
        
        const costoSubtotal = totalProdBase + totalPrendasBase;
        
        let precioCobrar = costoSubtotal / (1 - margen);
        precioCobrar += costoDiseno; // El diseño se suma al final (generalmente es neto o ya tiene su propio margen)

        const precioUnidad = precioCobrar / cantidad;

        // Actualizar UI
        resProd.textContent = formatCOP(totalProdBase);
        resPrendas.textContent = formatCOP(totalPrendasBase);
        resDiseno.textContent = formatCOP(costoDiseno);
        
        resTotal.textContent = formatCOP(precioCobrar);
        resUnit.textContent = formatCOP(precioUnidad);
        
        resultBox.style.display = 'block';
    });
});
