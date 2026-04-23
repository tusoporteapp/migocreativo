/**
 * MigoCreativo — Comparador de Técnicas
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('comparador-form');
    const resultBox = document.getElementById('result-box');
    const resultWinner = document.getElementById('result-winner');
    const resultReason = document.getElementById('result-reason');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const tela = document.getElementById('q-tela').value;
        const color = document.getElementById('q-color').value;
        const colores = document.getElementById('q-colores').value;
        const cantidad = document.getElementById('q-cantidad').value;

        let winner = '';
        let reason = '';

        // Lógica del algoritmo de decisión
        if (tela === 'rigido') {
            winner = 'Sublimación';
            reason = 'Para artículos rígidos (tazas, termos, etc.), la sublimación con polímero es la única técnica que garantiza durabilidad y resistencia a lavados.';
        } else if (tela === 'poliester' && color === 'blanco') {
            winner = 'Sublimación';
            reason = '¡Tienes la combinación perfecta para sublimación! Tela poliéster blanca. Lograrás cero tacto (la tinta penetra el hilo), colores vibrantes, máxima durabilidad y a un costo muy bajo sin importar la cantidad de colores del diseño.';
        } else if (cantidad === 'muchas' && colores === 'pocos') {
            winner = 'Serigrafía';
            reason = 'Para producción en volumen con diseños de pocos colores planos, la serigrafía es la técnica más rentable por unidad y ofrece la mayor durabilidad del mercado. El costo inicial de las pantallas se diluye entre las muchas prendas.';
        } else if (cantidad === 'muchas' && colores === 'muchos' && color === 'oscuro') {
            // Aquí depende de si tienen equipo de cuatricromía/simulado
            winner = 'Serigrafía (Proceso Simulado) o DTF';
            reason = 'Si tienes experiencia en serigrafía avanzada, un proceso simulado te dará la mejor calidad/precio para volumen. Si buscas facilidad y no lidiar con pantallas, el DTF es excelente, aunque ligeramente más costoso por unidad.';
        } else {
            // El DTF es el rey de la versatilidad
            winner = 'DTF (Direct to Film)';
            reason = 'El DTF es tu mejor opción porque permite estampar a todo color, desde una sola unidad, sobre cualquier tipo de tela (algodón, poliéster) y sin importar si la prenda es oscura o clara. No requiere costos iniciales de pantallas.';
        }

        resultWinner.textContent = winner;
        resultReason.innerHTML = `<strong>¿Por qué?</strong><br>${reason}`;
        resultBox.style.display = 'block';
    });
});
