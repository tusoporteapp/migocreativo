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
    let cart = []; // Array of { cartItemId, designId, name, technique, basePrice, discountPrice, currentPrice }
    
    // Exchange Rates Logic
    let exchangeRates = { USD: 1, COP: 4000, ARS: 1000, CLP: 950, BRL: 5 };
    let currentCurrency = 'USD';

    const WHATSAPP_NUMBER = "573023579755";
    const DISCOUNT_THRESHOLD = 11;

    // Precios fijos por técnica
    const PRICES = {
        'DTF': { base: 3, discount: 1.5 },
        'Sublimación': { base: 3, discount: 1.5 },
        'Serigrafía': { base: 7, discount: 5 }
    };

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
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: currentCurrency, maximumFractionDigits: 0 }).format(converted);
    }

    // 1. Cargar datos (cache-buster para evitar Service Worker)
    fetch('data/designs.json?v=' + Date.now())
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

    // 2. Renderizar diseños (Solo Imagen)
    function renderDesigns(items) {
        designsGrid.innerHTML = '';
        if (items.length === 0) {
            showEmptyState("No se encontraron diseños con ese nombre.");
            return;
        }

        items.forEach(design => {
            const col = document.createElement('div');
            col.className = 'col';
            
            // Solo imagen con overlay
            col.innerHTML = `
                <div class="design-card glass-panel" data-id="${design.id}" style="border-radius: 12px; overflow: hidden; position: relative;">
                    <div class="design-img-container" style="padding-bottom: 100%;">
                        <img src="${design.image}" alt="${design.name}" class="design-img" style="position: absolute; top:0; left:0; width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                        <div class="design-overlay">
                            <div class="add-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Agregar clic a toda la tarjeta
            const card = col.querySelector('.design-card');
            card.addEventListener('click', (e) => {
                e.preventDefault();
                addToCart(design);
                
                // Efecto visual rápido
                const overlay = card.querySelector('.design-overlay');
                const icon = card.querySelector('.add-icon');
                overlay.style.background = 'rgba(74, 222, 128, 0.8)';
                icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                
                setTimeout(() => {
                    overlay.style.background = '';
                    icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>';
                }, 800);
            });

            designsGrid.appendChild(col);
        });
    }

    // 3. Filtrar (busca en nombre Y tags)
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = designs.filter(d => {
            const nameMatch = d.name.toLowerCase().includes(query);
            const tagMatch = d.tags && d.tags.toLowerCase().includes(query);
            return nameMatch || tagMatch;
        });
        renderDesigns(filtered);
    });

    // 4. Lógica del Carrito
    function addToCart(design) {
        // Técnica por defecto al agregar: DTF
        const technique = 'DTF';
        const basePrice = PRICES[technique].base;
        const discountPrice = PRICES[technique].discount;
        
        // Generar un ID único (usando timestamp para permitir agregar el mismo diseño varias veces si quieren diferentes técnicas)
        const cartItemId = `${design.id}_${Date.now()}`;
        
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

    function removeCartItem(cartItemId) {
        cart = cart.filter(item => item.cartItemId !== cartItemId);
        recalculateDiscounts();
    }
    
    function changeCartItemTechnique(cartItemId, newTechnique) {
        const item = cart.find(i => i.cartItemId === cartItemId);
        if (item) {
            item.technique = newTechnique;
            item.basePrice = PRICES[newTechnique].base;
            item.discountPrice = PRICES[newTechnique].discount;
            recalculateDiscounts();
        }
    }

    // Exponer al global
    window.removeCartItem = removeCartItem;
    window.changeCartItemTechnique = changeCartItemTechnique;

    function recalculateDiscounts() {
        const isDiscountActive = cart.length >= DISCOUNT_THRESHOLD;
        
        cart.forEach(item => {
            item.currentPrice = isDiscountActive ? item.discountPrice : item.basePrice;
        });
        
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

                // Generar select para cambiar técnica dentro del carrito
                const selectHtml = `
                    <select class="form-select technique-select-cart" onchange="changeCartItemTechnique('${item.cartItemId}', this.value)" style="width: auto; padding: 2px 24px 2px 8px; font-size: 0.75rem; background-color: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; border-radius: 4px;">
                        <option value="DTF" style="color:black;" ${item.technique === 'DTF' ? 'selected' : ''}>DTF</option>
                        <option value="Sublimación" style="color:black;" ${item.technique === 'Sublimación' ? 'selected' : ''}>Sublimación</option>
                        <option value="Serigrafía" style="color:black;" ${item.technique === 'Serigrafía' ? 'selected' : ''}>Serigrafía</option>
                    </select>
                `;

                cartItemsContainer.innerHTML += `
                    <div class="cart-item" style="background: rgba(0,0,0,0.2); padding: 10px; border-radius: 8px; margin-bottom: 8px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px; align-items: center;">
                            <span style="font-weight: 600; font-size: 0.85rem; color: #fff; max-width: 75%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.name}</span>
                            <span class="cart-item-remove" onclick="removeCartItem('${item.cartItemId}')" style="cursor: pointer; color: #ff6b6b; padding: 0 5px;">✖</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--mc-text-muted);">
                            ${selectHtml}
                            <span style="margin-left: 10px;">${priceHtml}</span>
                        </div>
                    </div>
                `;
            });

            cartTotalElement.textContent = formatCurrency(totalUSD);
            updateWhatsAppLink(totalUSD);
        } else {
            floatingCart.classList.remove('visible');
        }
    }

    function updateWhatsAppLink(totalUSD) {
        if (cart.length === 0) return;

        const isDiscountActive = cart.length >= DISCOUNT_THRESHOLD;
        const totalLocalFormatted = formatCurrency(totalUSD);

        let message = "Hola Miguel, quiero pedir los siguientes diseños de tu catálogo:\n\n";
        
        if (isDiscountActive) {
            message += "🎉 *¡Aliqué para el descuento mayorista!*\n\n";
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
