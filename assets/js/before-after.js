/**
 * MigoCreativo — Before/After Image Slider
 */
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('mc-ba-slider');
    if (!container) return;

    const clip = container.querySelector('.mc-ba-clip');
    const handle = container.querySelector('.mc-ba-handle');
    const clipImg = container.querySelector('.mc-ba-clip img');

    let isDragging = false;

    // Fix image width to match container width
    const setImgWidth = () => {
        clipImg.style.width = container.offsetWidth + 'px';
    };
    window.addEventListener('resize', setImgWidth);
    setImgWidth();

    const slide = (e) => {
        if (!isDragging) return;
        
        let clientX = e.clientX;
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
        }

        const rect = container.getBoundingClientRect();
        let x = clientX - rect.left;

        // Boundaries
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percentage = (x / rect.width) * 100;
        
        clip.style.width = percentage + '%';
        handle.style.left = percentage + '%';
    };

    const stopDrag = () => { isDragging = false; };

    // Mouse Events
    handle.addEventListener('mousedown', () => { isDragging = true; });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('mousemove', slide);

    // Touch Events
    handle.addEventListener('touchstart', () => { isDragging = true; });
    window.addEventListener('touchend', stopDrag);
    window.addEventListener('touchmove', slide);

    // Initial animation
    setTimeout(() => {
        clip.style.transition = 'width 1s ease-in-out';
        handle.style.transition = 'left 1s ease-in-out';
        clip.style.width = '75%';
        handle.style.left = '75%';
        
        setTimeout(() => {
            clip.style.width = '50%';
            handle.style.left = '50%';
            
            setTimeout(() => {
                clip.style.transition = 'none';
                handle.style.transition = 'none';
            }, 1000);
        }, 1000);
    }, 500);
});
