/**
 * MigoCreativo — Animated Counter
 * Cuenta desde 0 hasta el número final al hacer scroll
 */
(function() {
  const counters = document.querySelectorAll('[data-mc-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.mcCounted) {
        entry.target.dataset.mcCounted = 'true';
        animateCount(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.mcCount);
    const suffix = el.dataset.mcSuffix || '';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }
})();
