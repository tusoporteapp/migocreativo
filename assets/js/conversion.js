/**
 * MigoCreativo — Conversion & Analytics Tools
 * Exit Intent Popup + Enhanced WhatsApp integration
 */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. WhatsApp Hover Animation (Already in Navbar/Hero, but we can add a persistent floating button if needed)
    // Actually, MigoBot is floating. We'll use MigoBot as the primary floating CTA, which now connects to WA.

    // 2. Exit Intent Popup
    const hasSeenPopup = localStorage.getItem('mc_exit_intent_seen');
    let popupTriggered = false;

    if (!hasSeenPopup) {
        // Create Popup HTML
        const popupHTML = `
            <div id="mc-exit-popup" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(11,11,24,0.9); z-index: 10000; display: none; align-items: center; justify-content: center; backdrop-filter: blur(5px);">
                <div style="background: var(--mc-bg-surface); width: 90%; max-width: 500px; padding: 2.5rem; border-radius: var(--mc-radius-lg); position: relative; text-align: center; border: 1px solid var(--mc-glass-border); box-shadow: var(--mc-shadow-glow-orange);">
                    <button id="mc-close-popup" style="position: absolute; top: 15px; right: 15px; background: none; border: none; color: var(--mc-text-muted); font-size: 1.5rem; cursor: pointer;">✕</button>
                    <span style="font-size: 3rem; margin-bottom: 1rem; display: block;">🎁</span>
                    <h2 style="font-weight: 800; color: #fff; margin-bottom: 1rem;">¿Te vas tan pronto?</h2>
                    <p style="color: var(--mc-text-muted); margin-bottom: 2rem;">No dejes que tus estampados salgan mal. Háblame por WhatsApp y te regalo una <strong>revisión gratuita</strong> de tu primer archivo para asegurarnos de que esté listo para producción.</p>
                    <a href="https://wa.me/573023579755?text=Hola%20Miguel,%20vengo%20por%20la%20revisi%C3%B3n%20gratuita%20de%20mi%20archivo." target="_blank" id="mc-claim-offer" style="display: block; width: 100%; background: linear-gradient(135deg, #25D366, #128C7E); color: #fff; padding: 14px; border-radius: var(--mc-radius-sm); text-decoration: none; font-weight: 700; font-size: 1.1rem; box-shadow: 0 4px 15px rgba(37,211,102,0.4);">
                        💬 Reclamar Revisión por WhatsApp
                    </a>
                    <button id="mc-decline-offer" style="background: none; border: none; color: var(--mc-text-muted); text-decoration: underline; margin-top: 1.5rem; cursor: pointer; font-size: 0.9rem;">No gracias, prefiero arriesgarme.</button>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', popupHTML);

        const popup = document.getElementById('mc-exit-popup');
        const btnClose = document.getElementById('mc-close-popup');
        const btnDecline = document.getElementById('mc-decline-offer');
        const btnClaim = document.getElementById('mc-claim-offer');

        const closePopup = () => {
            popup.style.display = 'none';
            localStorage.setItem('mc_exit_intent_seen', 'true');
        };

        btnClose.addEventListener('click', closePopup);
        btnDecline.addEventListener('click', closePopup);
        btnClaim.addEventListener('click', () => {
            // Track conversion event here
            trackEvent('exit_intent_claimed', { method: 'whatsapp' });
            closePopup();
        });

        // Trigger on mouse leave window (desktop)
        document.addEventListener('mouseout', (e) => {
            if (e.clientY < 0 && !popupTriggered) {
                popupTriggered = true;
                popup.style.display = 'flex';
                trackEvent('exit_intent_shown');
            }
        });

        // Trigger on mobile after 60 seconds
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                if (!popupTriggered) {
                    popupTriggered = true;
                    popup.style.display = 'flex';
                    trackEvent('exit_intent_shown');
                }
            }, 60000);
        }
    }

    // 3. Helper for Firebase Analytics Custom Events
    function trackEvent(eventName, params = {}) {
        // Since analytics is initialized in the HTML head (Firebase v9)
        // we can dispatch a custom event to notify the global scope
        const event = new CustomEvent('mcAnalytics', { 
            detail: { name: eventName, params: params } 
        });
        window.dispatchEvent(event);
        console.log(`[Analytics] Tracked: ${eventName}`, params);
    }

    // Track standard CTA clicks
    document.querySelectorAll('a[href^="https://wa.me"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            trackEvent('whatsapp_click', {
                location: window.location.pathname,
                button_text: btn.textContent.trim()
            });
        });
    });
});
