/**
 * MigoCreativo — Testimonials Carousel
 * Duplica el contenido para loop infinito
 */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('mc-testimonial-track');
    if (!track) return;

    // Clone the inner HTML to create a seamless infinite loop
    const originalHTML = track.innerHTML;
    track.innerHTML = originalHTML + originalHTML;
});
