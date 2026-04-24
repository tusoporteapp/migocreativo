document.addEventListener('DOMContentLoaded', () => {
    const designsGrid = document.getElementById('designsGrid');
    const searchInput = document.getElementById('searchInput');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const floatingCart = document.getElementById('floatingCart');
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems');
    const btnWhatsApp = document.getElementById('btnWhatsApp');
    const cartTotalElement = document.getElementById('cartTotal');
    const currencySelector = document.getElementById('currencySelector');
    
    const discountProgress = document.getElementById('discountProgress');
    const discountText = document.getElementById('discountText');
    const discountRemaining = document.getElementById('discountRemaining');
    const discountBar = document.getElementById('discountBar');

    let designs = [];
    let cart = []; // Array of { cartItemId, designId, name, technique, basePrice, currentPrice }
    
    // Exchange Rates Logic
    let exchangeRates = { USD: 1, COP: 4000, ARS: 1000, CLP: 950, BRL: 5 }; // Fallbacks
    let currentCurrency = 'USD';

    // Número de WhatsApp (Formato internacional sin +)
    const WHATSAPP_NUMBER = "573023579755";
    const DISCOUNT_THRESHOLD = 11;

    // Obtener tasas de cambio reales
    fetch('https://open.er-api.com/v6/latest/USD')
        .then(res => res.json())
        .then(data => {
            if(data && data.rates) {
                exchangeRates.USD = 1;
                exchangeRates.COP = data.rates.COP || 4000;
                exchangeRates.ARS = data.rates.ARS || 1000;
                exchangeRates.CLP = data.rates.CLP || 950;
                exchangeRates.BRL = data.rates.BRL || 5;
            }
        })
        .catch(err => console.log('Usando tasas de cambio de respaldo', err));

    currencySelector.addEventListener('change', (e) => {
        currentCurrency = e.target.value;
        updateCartUI();
    });

    function formatCurrency(amountUSD) {
        const rate = exchangeRates[currentCurrency];
        const converted = amountUSD * rate;
        
        if (currentCurrency === 'USD') return `$${converted.toFixed(2)}`;
        if (currentCurrency === 'BRL') return `R$${converted.toFixed(2)}`;
        
        // Formato sin decimales para pesos
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: currentCurrency, maximumFractionDigits: 0 }).format(converted);
    }

    // 1. Cargar datos
    fetch('data/designs.json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar designs.json');
            return response.json();
        })
        .then(data => {
            designs = data;
            loadingIndicator.style.display = 'none';
            if (designs.length === 0) {
                showEmptyState("No hay diseños disponibles en el catálogo actualmente.");
            } else {
                renderDesigns(designs);
            }
        })
        .catch(error => {
            loadingIndicator.style.display = 'none';
            showEmptyState("Aún no hay diseños en el catálogo. Sube las imágenes a assets/img/tienda y ejecuta update_store.js");
        });

    function showEmptyState(message) {
        designsGrid.innerHTML = `
            <div class="col-12 empty-state text-center py-5">
                <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;">📭</div>
                <h4 style="color: var(--mc-text-muted);">${message}</h4>
            </div>
        `;
    }

    // 2. Renderizar diseños
    function renderDesigns(items) {
        designsGrid.innerHTML = '';
        if (items.length === 0) {
            showEmptyState("No se encontraron diseños con ese nombre.");
            return;
        }

        const isDiscountActive = cart.length >= DISCOUNT_THRESHOLD;

        items.forEach(design => {
            const col = document.createElement('div');
            col.className = 'col-sm-6 col-md-4 col-lg-3';
            
            // Generate pricing display for the card
            const priceDTF = isDiscountActive ? 1.5 : 3;
            const priceSeri = isDiscountActive ? 5 : 7;
            
            col.innerHTML = `
                <div class="design-card glass-panel" data-id="${design.id}">
                    <div class="design-img-container">
                        <img src="${design.image}" alt="${design.name}" class="design-img" loading="lazy">
                    </div>
                    <div class="design-info">
                        <div class="design-title">${design.name}</div>
                        
                        <label style="font-size: 0.75rem; color: var(--mc-text-muted); margin-bottom: 4px; text-transform: uppercase; letter-spacing: 1px;">Técnica</label>
                        <select class="form-select mb-3 technique-select" style="background-color: #1A1A35; color: #EEEEF5; border: 1px solid rgba(255,255,255,0.1); font-size: 0.9rem;">
                            <option value="DTF" data-base="3" data-discount="1.5">DTF ($${priceDTF})</option>
                            <option value="Sublimación" data-base="3" data-discount="1.5">Sublimación ($${priceDTF})</option>
                            <option value="Serigrafía" data-base="7" data-discount="5">Serigrafía ($${priceSeri})</option>
                        </select>
                        
                        <button class="btn btn-add-cart">Quiero este diseño</button>
                    </div>
                </div>
            `;

            const btn = col.querySelector('.btn-add-cart');
            const selectElement = col.querySelector('.technique-select');
            
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(design, selectElement);
                
                // Feedback visual Glass
                const originalText = btn.innerHTML;
                btn.innerHTML = '¡Agregado! ✓';
                btn.style.color = 'white';
                setTimeout(() => {
                    btn.innerHTML = originalText;
                }, 1000);
            });

            designsGrid.appendChild(col);
        });
    }

    // 3. Filtrar
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = designs.filter(d => d.name.toLowerCase().includes(query));
        renderDesigns(filtered);
    });

    // 4. Lógica del Carrito y Descuentos
    function addToCart(design, selectElement) {
        const technique = selectElement.value;
        const opt = selectElement.options[selectElement.selectedIndex];
        const basePrice = parseFloat(opt.dataset.base);
        const discountPrice = parseFloat(opt.dataset.discount);
        const cartItemId = `${design.id}_${technique}`;
        
        // Check if exists
        const existing = cart.find(item => item.cartItemId === cartItemId);
        if (!existing) {
            cart.push({
                cartItemId,
                designId: design.id,
                name: design.name,
                technique,
                basePrice,
                discountPrice,
                currentPrice: basePrice
            });
            recalculateDiscounts();
        }
    }

    function removeCartItem(cartItemId) {
        cart = cart.filter(item => item.cartItemId !== cartItemId);
        recalculateDiscounts();
    }
    window.removeCartItem = removeCartItem; // Global export

    function recalculateDiscounts() {
        const isDiscountActive = cart.length >= DISCOUNT_THRESHOLD;
        
        cart.forEach(item => {
            item.currentPrice = isDiscountActive ? item.discountPrice : item.basePrice;
        });
        
        // Re-render UI to update card dropdown prices
        const query = searchInput.value.toLowerCase();
        renderDesigns(designs.filter(d => d.name.toLowerCase().includes(query)));
        
        updateCartUI();
    }

    function updateCartUI() {
        cartCount.textContent = cart.length;
        
        if (cart.length > 0) {
            floatingCart.classList.add('visible');
            
            // Update Progress Bar
            if (cart.length >= DISCOUNT_THRESHOLD) {
                discountProgress.style.background = 'rgba(74, 222, 128, 0.15)';
                discountProgress.style.border = '1px solid rgba(74, 222, 128, 0.3)';
                discountText.innerHTML = '✨ ¡Descuento Mayorista Activado! ✨';
                discountText.style.color = '#4ade80';
                discountBar.style.width = '100%';
                discountBar.style.background = '#4ade80';
            } else {
                const remaining = DISCOUNT_THRESHOLD - cart.length;
                discountProgress.style.background = 'rgba(0,0,0,0.5)';
                discountProgress.style.border = '1px solid rgba(255,255,255,0.05)';
                discountText.innerHTML = `Lleva <span style="color: var(--mc-orange); font-size:1.1em;">${remaining}</span> más para precio mayorista`;
                discountText.style.color = 'white';
                const percentage = (cart.length / DISCOUNT_THRESHOLD) * 100;
                discountBar.style.width = `${percentage}%`;
                discountBar.style.background = 'linear-gradient(90deg, var(--mc-orange), #ffb700)';
            }

            cartItemsContainer.innerHTML = '';
            let totalUSD = 0;
            const isDiscountActive = cart.length >= DISCOUNT_THRESHOLD;
            
            cart.forEach(item => {
                totalUSD += item.currentPrice;
                
                let priceHtml = '';
                if (isDiscountActive) {
                    priceHtml = `<span class="price-strike">$${item.basePrice}</span> <span class="price-discounted">$${item.currentPrice}</span>`;
                } else {
                    priceHtml = `<span class="price-normal">$${item.currentPrice}</span>`;
                }

                cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span style="font-weight: 600; font-size: 0.9rem;">${item.name}</span>
                            <span class="cart-item-remove" onclick="removeCartItem('${item.cartItemId}')">✖</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--mc-text-muted);">
                            <span>${item.technique}</span>
                            <span>${priceHtml} (USD)</span>
                        </div>
                    </div>
                `;
            });

            cartTotalElement.textContent = formatCurrency(totalUSD);
            updateWhatsAppLink(totalUSD);
        } else {
            floatingCart.classList.remove('visible');
            // Reset cards if emptied
            const query = searchInput.value.toLowerCase();
            renderDesigns(designs.filter(d => d.name.toLowerCase().includes(query)));
        }
    }

    function updateWhatsAppLink(totalUSD) {
        if (cart.length === 0) return;

        const isDiscountActive = cart.length >= DISCOUNT_THRESHOLD;
        const totalLocalFormatted = formatCurrency(totalUSD);

        let message = "Hola Miguel, quiero pedir los siguientes diseños de tu catálogo Premium:\n\n";
        
        if (isDiscountActive) {
            message += "🎉 *¡Apliqué para el descuento mayorista!*\n\n";
        }

        cart.forEach((item, index) => {
            const localPrice = formatCurrency(item.currentPrice);
            message += `${index + 1}. ${item.name}\n`;
            
            if (currentCurrency === 'USD') {
                message += `   Técnica: ${item.technique} (USD $${item.currentPrice})\n`;
            } else {
                message += `   Técnica: ${item.technique} (USD $${item.currentPrice} / ${currentCurrency} ${localPrice})\n`;
            }
        });
        
        message += `\n*Total a pagar:* USD $${totalUSD.toFixed(2)}`;
        if (currentCurrency !== 'USD') {
            message += ` / ${currentCurrency} ${totalLocalFormatted}\n`;
        } else {
            message += `\n`;
        }
        message += `\n¿Cómo procedemos con el pago?`;

        const encodedMessage = encodeURIComponent(message);
        btnWhatsApp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    }
});
