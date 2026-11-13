/**
 * LUMEN Global UI Components & Interactive View Controller
 * Mini-Cart Drawer, Quick View Modal, Search Palette, and Toasts
 */

import { PRODUCTS } from './data.js';
import { store } from './store.js';

// SVG Icons Map for clean, zero-dependency modern iconography
export const ICONS = {
  cart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>`,
  heart: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  heartFilled: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
  eye: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  close: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  trash: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  arrowRight: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  check: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  star: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  minus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/></svg>`,
  bag: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
};

export function renderStars(rating = 5) {
  const rounded = Math.round(rating);
  let starsHtml = '';
  for (let i = 0; i < 5; i++) {
    starsHtml += `<span class="rating-star" style="color: ${i < rounded ? 'var(--amber-accent)' : 'var(--text-muted)'}; margin-right: 1px;">★</span>`;
  }
  return starsHtml;
}

export function createProductCardHTML(product) {
  const isWishlisted = store.isInWishlist(product.id);
  const badgeHtml = product.badge
    ? `<span class="card-badge ${product.badge.toLowerCase().includes('sale') ? 'badge-sale' : (product.badge.toLowerCase().includes('new') ? 'badge-new' : 'badge-popular')}">${product.badge}</span>`
    : '';

  return `
    <article class="product-card" data-product-id="${product.id}">
      <div class="product-card-media">
        ${badgeHtml}
        <div class="card-actions">
          <button class="card-action-btn card-wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${product.id}" title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}" aria-label="Wishlist">
            ${isWishlisted ? ICONS.heartFilled : ICONS.heart}
          </button>
          <button class="card-action-btn card-quickview-btn" data-action="quickview" data-id="${product.id}" title="Quick View" aria-label="Quick View">
            ${ICONS.eye}
          </button>
        </div>
        <a href="product.html?id=${product.id}" class="card-img-link" title="${product.name}">
          <img class="product-card-img" src="${product.images[0]}" alt="${product.name}" loading="lazy">
        </a>
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${product.categoryName}</span>
        <h3 class="product-card-title">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <span class="rating-stars">${renderStars(product.rating)}</span>
          <span class="rating-count">(${product.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <div class="product-price-wrap">
            <span class="product-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice > product.price ? `<span class="product-original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <button class="card-add-btn" data-action="add-to-cart" data-id="${product.id}" title="Add to Bag" aria-label="Add to Bag">
            ${ICONS.plus}
          </button>
        </div>
      </div>
    </article>
  `;
}

// ================= GLOBAL TOAST NOTIFICATIONS ================= //
export function initToastSystem() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  window.addEventListener('lumen:toast', (e) => {
    const { message, type = 'success', duration = 3500 } = e.detail;
    showToast(message, type, duration);
  });
}

export function showToast(message, type = 'success', duration = 3500) {
  const container = document.getElementById('toast-container') || (() => {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
    return c;
  })();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let iconSvg = ICONS.check;
  if (type === 'error') iconSvg = ICONS.close;
  if (type === 'info') iconSvg = ICONS.bag;

  toast.innerHTML = `
    <div class="toast-icon">${iconSvg}</div>
    <div class="toast-message">${message}</div>
    <button class="toast-close" aria-label="Dismiss">${ICONS.close}</button>
  `;

  const closeBtn = toast.querySelector('.toast-close');
  const dismiss = () => {
    toast.classList.add('toast-leave');
    setTimeout(() => toast.remove(), 250);
  };

  closeBtn.addEventListener('click', dismiss);
  container.appendChild(toast);

  setTimeout(dismiss, duration);
}

// ================= MINI CART DRAWER CONTROLLER ================= //
export function initMiniCartDrawer() {
  let drawer = document.getElementById('cart-drawer');
  let overlay = document.getElementById('cart-overlay');

  if (!drawer) {
    overlay = document.createElement('div');
    overlay.id = 'cart-overlay';
    overlay.className = 'drawer-overlay';

    drawer = document.createElement('aside');
    drawer.id = 'cart-drawer';
    drawer.className = 'cart-drawer';
    drawer.setAttribute('aria-label', 'Shopping Bag');

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);
  }

  // Bind Overlay Close
  overlay.addEventListener('click', closeCartDrawer);

  // Re-render when cart updates
  window.addEventListener('lumen:cart-updated', () => {
    renderMiniCart();
    updateBadges();
  });

  renderMiniCart();
}

export function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    renderMiniCart();
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function renderMiniCart() {
  const drawer = document.getElementById('cart-drawer');
  if (!drawer) return;

  const cart = store.getCart();
  const totals = store.getTotals();
  const count = store.getCartCount();

  let bodyContent = '';

  if (cart.length === 0) {
    bodyContent = `
      <div class="drawer-empty">
        <div class="drawer-empty-icon">${ICONS.bag}</div>
        <h4 class="drawer-empty-title">Your shopping bag is empty</h4>
        <p class="drawer-empty-desc">Explore our curated collection of acoustic & lifestyle pieces.</p>
        <a href="shop.html" class="btn btn-primary btn-sm drawer-close-trigger">Explore Collection</a>
      </div>
    `;
  } else {
    const itemsHtml = cart.map(item => `
      <div class="drawer-item" data-cart-item-id="${item.cartItemId}">
        <img class="drawer-item-img" src="${item.image}" alt="${item.name}">
        <div class="drawer-item-details">
          <a href="product.html?id=${item.productId}" class="drawer-item-title">${item.name}</a>
          <span class="drawer-item-meta">${item.color} • ${item.size}</span>
          <div class="drawer-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          <div class="drawer-qty-control">
            <button class="qty-btn" data-action="decrease" data-id="${item.cartItemId}">${ICONS.minus}</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" data-action="increase" data-id="${item.cartItemId}">${ICONS.plus}</button>
          </div>
        </div>
        <button class="drawer-item-remove" data-action="remove" data-id="${item.cartItemId}" title="Remove item">
          ${ICONS.trash}
        </button>
      </div>
    `).join('');

    bodyContent = `
      <div class="drawer-items-list">
        ${itemsHtml}
      </div>
    `;
  }

  const freeShipText = totals.amountNeededForFreeShipping > 0
    ? `Add <strong>$${totals.amountNeededForFreeShipping.toFixed(2)}</strong> more for free worldwide shipping!`
    : `🎉 <strong>Congratulations!</strong> You have unlocked Free Express Shipping.`;

  drawer.innerHTML = `
    <div class="drawer-header">
      <h3 class="drawer-title">${ICONS.bag} Shopping Bag (${count})</h3>
      <button class="drawer-close" id="drawer-close-btn" aria-label="Close bag">${ICONS.close}</button>
    </div>
    
    <div class="shipping-meter">
      <div class="shipping-meter-text">${freeShipText}</div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${totals.freeShippingProgress}%;"></div>
      </div>
    </div>

    <div class="drawer-body">
      ${bodyContent}
    </div>

    ${cart.length > 0 ? `
      <div class="drawer-footer">
        <div class="drawer-subtotal-row">
          <span class="drawer-subtotal-label">Subtotal</span>
          <span class="drawer-subtotal-val">$${totals.subtotal.toFixed(2)}</span>
        </div>
        <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-4);">Taxes and shipping calculated at checkout.</p>
        <div class="drawer-cta-group">
          <a href="cart.html?checkout=true" class="btn btn-accent btn-lg" style="width: 100%;">Proceed to Checkout</a>
          <a href="cart.html" class="btn btn-outline" style="width: 100%;">View Full Shopping Bag</a>
        </div>
      </div>
    ` : ''}
  `;

  // Bind Events inside drawer
  const closeBtn = drawer.querySelector('#drawer-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);

  const exploreBtn = drawer.querySelector('.drawer-close-trigger');
  if (exploreBtn) exploreBtn.addEventListener('click', closeCartDrawer);

  drawer.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cartItemId = btn.dataset.id;
      const action = btn.dataset.action;
      const item = cart.find(i => i.cartItemId === cartItemId);
      if (!item) return;
      if (action === 'increase') store.updateQuantity(cartItemId, item.quantity + 1);
      if (action === 'decrease') store.updateQuantity(cartItemId, item.quantity - 1);
    });
  });

  drawer.querySelectorAll('.drawer-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const cartItemId = btn.dataset.id;
      store.removeFromCart(cartItemId);
    });
  });
}

// ================= QUICK VIEW MODAL ================= //
export function initQuickViewModal() {
  let modalBackdrop = document.getElementById('quickview-modal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'quickview-modal';
    modalBackdrop.className = 'modal-backdrop';
    document.body.appendChild(modalBackdrop);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeQuickView();
  });
}

export function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('quickview-modal');
  let selectedColor = product.colors[0]?.name || 'Standard';
  let selectedSize = product.sizes[0] || 'Standard';
  let currentQty = 1;

  modal.innerHTML = `
    <div class="modal-dialog">
      <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close dialog">${ICONS.close}</button>
      <div class="modal-grid">
        <div class="modal-gallery">
          <div class="modal-main-img-wrap">
            <img class="modal-main-img" id="quick-main-img" src="${product.images[0]}" alt="${product.name}">
          </div>
          <div class="modal-thumbs">
            ${product.images.map((img, idx) => `
              <div class="modal-thumb ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <img src="${img}" alt="${product.name}">
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-details">
          <span class="product-card-category">${product.categoryName}</span>
          <h2 style="font-family: var(--font-display); font-size: var(--text-2xl); font-weight: 800; margin-bottom: var(--space-2); line-height: 1.2;">
            ${product.name}
          </h2>
          <div class="product-rating">
            <span class="rating-stars">${renderStars(product.rating)}</span>
            <span class="rating-count">${product.rating} (${product.reviewsCount} verified reviews)</span>
          </div>
          <div class="pdp-price-row" style="margin-bottom: var(--space-4);">
            <span class="pdp-current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice > product.price ? `<span class="pdp-old-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-6);">
            ${product.shortDescription}
          </p>

          <div style="margin-bottom: var(--space-4);">
            <div class="option-group-label">Finish: <span id="quick-color-name" style="color: var(--text-primary);">${selectedColor}</span></div>
            <div class="color-swatches">
              ${product.colors.map((c, i) => `
                <button class="color-swatch-btn ${i === 0 ? 'active' : ''}" data-color="${c.name}" title="${c.name}">
                  <span class="color-swatch-inner" style="background-color: ${c.hex};"></span>
                </button>
              `).join('')}
            </div>
          </div>

          ${product.sizes.length > 1 ? `
            <div style="margin-bottom: var(--space-6);">
              <div class="option-group-label">Option:</div>
              <div class="size-pill-group">
                ${product.sizes.map((s, i) => `
                  <button class="size-pill-btn ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div class="pdp-cta-row" style="margin-top: auto;">
            <div class="quantity-stepper">
              <button class="stepper-btn" id="quick-qty-minus">${ICONS.minus}</button>
              <span class="stepper-val" id="quick-qty-val">1</span>
              <button class="stepper-btn" id="quick-qty-plus">${ICONS.plus}</button>
            </div>
            <button class="btn btn-accent btn-lg" id="quick-add-btn" style="flex-grow: 1;">
              ${ICONS.cart} Add to Bag
            </button>
          </div>

          <div style="margin-top: var(--space-4); text-align: center;">
            <a href="product.html?id=${product.id}" class="footer-link" style="font-size: var(--text-xs); color: var(--accent-primary); font-weight: 600;">
              View Full Product Details & Specifications →
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Gallery Swapping
  const mainImg = modal.querySelector('#quick-main-img');
  const thumbs = modal.querySelectorAll('.modal-thumb');
  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      thumbs.forEach(th => th.classList.remove('active'));
      t.classList.add('active');
      const idx = parseInt(t.dataset.index, 10);
      mainImg.src = product.images[idx];
    });
  });

  // Color Swatches
  const colorBtns = modal.querySelectorAll('.color-swatch-btn');
  const colorLabel = modal.querySelector('#quick-color-name');
  colorBtns.forEach(b => {
    b.addEventListener('click', () => {
      colorBtns.forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      selectedColor = b.dataset.color;
      colorLabel.textContent = selectedColor;
    });
  });

  // Size Options
  const sizeBtns = modal.querySelectorAll('.size-pill-btn');
  sizeBtns.forEach(sb => {
    sb.addEventListener('click', () => {
      sizeBtns.forEach(btn => btn.classList.remove('active'));
      sb.classList.add('active');
      selectedSize = sb.dataset.size;
    });
  });

  // Quantity Stepper
  const qtyVal = modal.querySelector('#quick-qty-val');
  modal.querySelector('#quick-qty-minus').addEventListener('click', () => {
    if (currentQty > 1) {
      currentQty--;
      qtyVal.textContent = currentQty;
    }
  });
  modal.querySelector('#quick-qty-plus').addEventListener('click', () => {
    if (currentQty < product.stockCount) {
      currentQty++;
      qtyVal.textContent = currentQty;
    }
  });

  // Add to Bag
  modal.querySelector('#quick-add-btn').addEventListener('click', () => {
    store.addToCart(product.id, currentQty, { color: selectedColor, size: selectedSize });
    closeQuickView();
    openCartDrawer();
  });

  // Close trigger
  modal.querySelector('#modal-close-trigger').addEventListener('click', closeQuickView);

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

export function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ================= LIVE SEARCH MODAL ================= //
export function initSearchModal() {
  let searchModal = document.getElementById('search-modal');
  if (!searchModal) {
    searchModal = document.createElement('div');
    searchModal.id = 'search-modal';
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
      <div class="search-box-wrap">
        <div class="search-icon-pos">${ICONS.search}</div>
        <input type="text" id="live-search-input" class="search-input-field" placeholder="Search acoustic, chronographs, workspace tech..." autocomplete="off">
        <button id="search-modal-close" class="search-close-btn" aria-label="Close search">${ICONS.close}</button>
      </div>
      <div id="search-results-list" class="search-results-dropdown" style="display: none;"></div>
    `;
    document.body.appendChild(searchModal);
  }

  const input = searchModal.querySelector('#live-search-input');
  const resultsBox = searchModal.querySelector('#search-results-list');
  const closeBtn = searchModal.querySelector('#search-modal-close');

  closeBtn.addEventListener('click', closeSearch);
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  input.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) {
      resultsBox.style.display = 'none';
      resultsBox.innerHTML = '';
      return;
    }

    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.categoryName.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q)
    ).slice(0, 6);

    if (matches.length === 0) {
      resultsBox.style.display = 'block';
      resultsBox.innerHTML = `
        <div style="padding: var(--space-6); text-align: center; color: var(--text-secondary); font-size: var(--text-sm);">
          No products found matching "<strong>${q}</strong>".
        </div>
      `;
    } else {
      resultsBox.style.display = 'block';
      resultsBox.innerHTML = matches.map(m => `
        <a href="product.html?id=${m.id}" class="search-result-item">
          <img src="${m.images[0]}" alt="${m.name}" class="search-result-img">
          <div>
            <div class="search-result-name">${m.name}</div>
            <div style="font-size: var(--text-xs); color: var(--text-muted);">${m.categoryName}</div>
          </div>
          <div class="search-result-price">$${m.price.toFixed(2)}</div>
        </a>
      `).join('');
    }
  });

  // Handle enter key to redirect to shop.html?search=...
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) window.location.href = `shop.html?search=${encodeURIComponent(q)}`;
    }
  });
}

export function openSearch() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.add('active');
    const input = modal.querySelector('#live-search-input');
    if (input) {
      input.value = '';
      setTimeout(() => input.focus(), 100);
    }
    document.body.style.overflow = 'hidden';
  }
}

export function closeSearch() {
  const modal = document.getElementById('search-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ================= MOBILE NAVIGATION DRAWER ================= //
export function initMobileNav() {
  let navDrawer = document.getElementById('mobile-nav-drawer');
  let overlay = document.getElementById('mobile-nav-overlay');

  if (!navDrawer) {
    overlay = document.createElement('div');
    overlay.id = 'mobile-nav-overlay';
    overlay.className = 'drawer-overlay';

    navDrawer = document.createElement('nav');
    navDrawer.id = 'mobile-nav-drawer';
    navDrawer.className = 'mobile-nav-drawer';
    navDrawer.setAttribute('aria-label', 'Mobile Navigation');

    navDrawer.innerHTML = `
      <div class="mobile-nav-header">
        <a href="index.html" class="brand-logo">
          <span class="brand-symbol">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
          LUMEN
        </a>
        <button id="mobile-nav-close" class="drawer-close" aria-label="Close menu">${ICONS.close}</button>
      </div>
      <div class="mobile-nav-links">
        <a href="index.html" class="mobile-nav-link" data-page="home">Home ${ICONS.arrowRight}</a>
        <a href="shop.html" class="mobile-nav-link" data-page="shop">Catalogue & Shop ${ICONS.arrowRight}</a>
        <a href="shop.html?category=audio" class="mobile-nav-link">Acoustics & Audio ${ICONS.arrowRight}</a>
        <a href="shop.html?category=wearables" class="mobile-nav-link">Wearable Tech ${ICONS.arrowRight}</a>
        <a href="cart.html" class="mobile-nav-link" data-page="cart">Shopping Bag ${ICONS.arrowRight}</a>
        <a href="about.html" class="mobile-nav-link" data-page="about">Studio & Support ${ICONS.arrowRight}</a>
      </div>
      <div class="mobile-nav-footer">
        <div style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-2);">Need concierge advice?</div>
        <a href="about.html#contact" class="btn btn-outline btn-sm" style="width: 100%;">Contact Concierge</a>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(navDrawer);

    overlay.addEventListener('click', closeMobileNav);
    navDrawer.querySelector('#mobile-nav-close').addEventListener('click', closeMobileNav);
  }
}

export function openMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  if (drawer && overlay) {
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeMobileNav() {
  const drawer = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  if (drawer && overlay) {
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// ================= BADGE COUNTERS UPDATE ================= //
export function updateBadges() {
  const cartBadges = document.querySelectorAll('.cart-count-badge');
  const count = store.getCartCount();

  cartBadges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    badge.classList.remove('bump');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bump');
  });

  const wishlistBadges = document.querySelectorAll('.wishlist-count-badge');
  const wCount = store.getWishlistCount();

  wishlistBadges.forEach(badge => {
    badge.textContent = wCount;
    badge.style.display = wCount > 0 ? 'flex' : 'none';
  });
}
