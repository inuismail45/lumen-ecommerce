/**
 * LUMEN Product Details Page Controller
 * Handles URL parameter parsing, interactive gallery zoom, variant selection,
 * tab switching, review submission simulation, and related products rendering.
 */

import { PRODUCTS } from './data.js';
import { store } from './store.js';
import { renderStars, createProductCardHTML, ICONS } from './ui.js';

class ProductDetailsController {
  constructor() {
    this.product = null;
    this.selectedColor = null;
    this.selectedSize = null;
    this.quantity = 1;
    this.reviews = [];

    this.init();
  }

  init() {
    this.loadProductFromURL();
    if (!this.product) return;

    this.initReviewData();
    this.renderProductPage();
    this.initGalleryInteractions();
    this.initVariantSelectors();
    this.initQuantityStepper();
    this.initActionButtons();
    this.initTabs();
    this.initReviewForm();
    this.renderRelatedProducts();
  }

  loadProductFromURL() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'lmn-01';
    this.product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];

    // Defaults
    this.selectedColor = this.product.colors[0]?.name || 'Standard';
    this.selectedSize = this.product.sizes[0] || 'Standard';
    this.quantity = 1;

    // Update Browser Page Title
    document.title = `${this.product.name} — LUMEN Audio & Lifestyle`;
  }

  initReviewData() {
    this.reviews = [
      {
        author: 'Alexander Wright',
        location: 'Zurich, Switzerland',
        date: '3 days ago',
        rating: 5,
        title: 'Exceeds studio reference standards',
        content: 'The acoustic balance on this piece is remarkable. Highs are airy and crystalline without harshness, while low frequencies are tight and resonant. The unibody aluminum chassis feels indestructible.'
      },
      {
        author: 'Sophie Laurent',
        location: 'Paris, France',
        date: '2 weeks ago',
        rating: 5,
        title: 'Pure minimalist luxury',
        content: 'I wear this every single day during long drafting sessions. The ergonomic balance and materials are leagues ahead of common commercial alternatives.'
      },
      {
        author: 'Kenji Takahashi',
        location: 'Kyoto, Japan',
        date: '1 month ago',
        rating: 4,
        title: 'Exceptional build and battery longevity',
        content: 'Arrived in Tokyo in 48 hours. Beautiful sustainable packaging. Fast connectivity and unbelievable battery endurance. Truly world class.'
      }
    ];
  }

  renderProductPage() {
    const p = this.product;

    // Breadcrumbs
    const bcCat = document.getElementById('pdp-bc-cat');
    const bcTitle = document.getElementById('pdp-bc-title');
    if (bcCat) {
      bcCat.textContent = p.categoryName;
      bcCat.href = `shop.html?category=${p.category}`;
    }
    if (bcTitle) bcTitle.textContent = p.name;

    // Gallery Images
    const mainImg = document.getElementById('pdp-main-img');
    const thumbsCol = document.getElementById('pdp-thumbs-col');
    if (mainImg) mainImg.src = p.images[0];
    if (thumbsCol) {
      thumbsCol.innerHTML = p.images.map((img, i) => `
        <button class="pdp-thumb-btn ${i === 0 ? 'active' : ''}" data-index="${i}" aria-label="Thumbnail ${i + 1}">
          <img src="${img}" alt="${p.name} angle ${i + 1}">
        </button>
      `).join('');
    }

    // Info Column
    const badgeEl = document.getElementById('pdp-badge');
    if (badgeEl) {
      if (p.badge) {
        badgeEl.textContent = p.badge;
        badgeEl.style.display = 'inline-block';
      } else {
        badgeEl.style.display = 'none';
      }
    }

    document.getElementById('pdp-category').textContent = p.categoryName;
    document.getElementById('pdp-title').textContent = p.name;
    document.getElementById('pdp-stars').innerHTML = renderStars(p.rating);
    document.getElementById('pdp-rating-num').textContent = p.rating.toFixed(1);
    document.getElementById('pdp-reviews-count').textContent = `(${p.reviewsCount} reviews)`;

    // Price
    document.getElementById('pdp-price').textContent = `$${p.price.toFixed(2)}`;
    const oldPriceEl = document.getElementById('pdp-old-price');
    const discountEl = document.getElementById('pdp-discount');
    if (p.originalPrice > p.price) {
      oldPriceEl.textContent = `$${p.originalPrice.toFixed(2)}`;
      oldPriceEl.style.display = 'inline';
      discountEl.textContent = `Save ${p.discount}%`;
      discountEl.style.display = 'inline-block';
    } else {
      oldPriceEl.style.display = 'none';
      discountEl.style.display = 'none';
    }

    // Stock Status
    document.getElementById('pdp-stock-text').textContent = `In Stock — Only ${p.stockCount} units available for priority dispatch`;

    // Descriptions
    document.getElementById('pdp-short-desc').textContent = p.shortDescription;
    document.getElementById('pdp-full-desc').textContent = p.fullDescription;

    // Key Features Bullets
    const featuresList = document.getElementById('pdp-features-list');
    if (featuresList && p.features) {
      featuresList.innerHTML = p.features.map(f => `
        <li style="display: flex; align-items: baseline; gap: var(--space-2); margin-bottom: var(--space-2); color: var(--text-secondary); font-size: var(--text-sm);">
          <span style="color: var(--emerald-accent); font-weight: 700;">✓</span>
          <span>${f}</span>
        </li>
      `).join('');
    }

    // Color Swatches
    const colorSwatchesWrap = document.getElementById('pdp-color-swatches');
    const colorNameLabel = document.getElementById('pdp-selected-color-name');
    if (colorSwatchesWrap && p.colors) {
      colorNameLabel.textContent = this.selectedColor;
      colorSwatchesWrap.innerHTML = p.colors.map((c, i) => `
        <button class="color-swatch-btn ${i === 0 ? 'active' : ''}" data-color="${c.name}" title="${c.name}">
          <span class="color-swatch-inner" style="background-color: ${c.hex};"></span>
        </button>
      `).join('');
    }

    // Sizes Pills
    const sizePillGroup = document.getElementById('pdp-size-pills');
    const sizeSectionWrap = document.getElementById('pdp-sizes-section');
    if (sizePillGroup && p.sizes) {
      if (p.sizes.length > 1) {
        sizeSectionWrap.style.display = 'block';
        sizePillGroup.innerHTML = p.sizes.map((s, i) => `
          <button class="size-pill-btn ${i === 0 ? 'active' : ''}" data-size="${s}">${s}</button>
        `).join('');
      } else {
        sizeSectionWrap.style.display = 'none';
      }
    }

    // Specs Table
    const specsTable = document.getElementById('pdp-specs-table');
    if (specsTable && p.specs) {
      specsTable.innerHTML = Object.entries(p.specs).map(([k, v]) => `
        <tr>
          <td>${k}</td>
          <td style="color: var(--text-primary); font-weight: 500;">${v}</td>
        </tr>
      `).join('');
    }

    // Wishlist Button state
    this.updateWishlistButton();

    // Render Reviews List
    this.renderReviewsList();
  }

  initGalleryInteractions() {
    const p = this.product;
    const mainImg = document.getElementById('pdp-main-img');
    const mainImgBox = document.getElementById('pdp-main-img-box');
    const thumbs = document.querySelectorAll('.pdp-thumb-btn');

    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        thumbs.forEach(btn => btn.classList.remove('active'));
        t.classList.add('active');
        const idx = parseInt(t.dataset.index, 10);
        mainImg.src = p.images[idx];
      });
    });

    // Zoom Lens on Mouse Move
    if (mainImgBox && mainImg) {
      mainImgBox.addEventListener('mousemove', (e) => {
        const rect = mainImgBox.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mainImg.style.transformOrigin = `${x}% ${y}%`;
        mainImg.style.transform = 'scale(1.75)';
      });

      mainImgBox.addEventListener('mouseleave', () => {
        mainImg.style.transform = 'scale(1)';
        mainImg.style.transformOrigin = 'center center';
      });
    }
  }

  initVariantSelectors() {
    const colorBtns = document.querySelectorAll('#pdp-color-swatches .color-swatch-btn');
    const colorLabel = document.getElementById('pdp-selected-color-name');
    colorBtns.forEach(b => {
      b.addEventListener('click', () => {
        colorBtns.forEach(btn => btn.classList.remove('active'));
        b.classList.add('active');
        this.selectedColor = b.dataset.color;
        if (colorLabel) colorLabel.textContent = this.selectedColor;
      });
    });

    const sizeBtns = document.querySelectorAll('#pdp-size-pills .size-pill-btn');
    sizeBtns.forEach(sb => {
      sb.addEventListener('click', () => {
        sizeBtns.forEach(btn => btn.classList.remove('active'));
        sb.classList.add('active');
        this.selectedSize = sb.dataset.size;
      });
    });
  }

  initQuantityStepper() {
    const valEl = document.getElementById('pdp-qty-val');
    const minusBtn = document.getElementById('pdp-qty-minus');
    const plusBtn = document.getElementById('pdp-qty-plus');

    minusBtn.addEventListener('click', () => {
      if (this.quantity > 1) {
        this.quantity--;
        valEl.textContent = this.quantity;
      }
    });

    plusBtn.addEventListener('click', () => {
      if (this.quantity < this.product.stockCount) {
        this.quantity++;
        valEl.textContent = this.quantity;
      } else {
        store.showToast(`Maximum available units: ${this.product.stockCount}`, 'warning');
      }
    });
  }

  initActionButtons() {
    // Add to Cart
    const addBtn = document.getElementById('pdp-add-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        store.addToCart(this.product.id, this.quantity, {
          color: this.selectedColor,
          size: this.selectedSize
        });

        addBtn.innerHTML = `${ICONS.check} Added to Bag`;
        addBtn.classList.add('btn-primary');
        setTimeout(() => {
          addBtn.innerHTML = `${ICONS.cart} Add to Shopping Bag`;
          addBtn.classList.remove('btn-primary');
        }, 1500);
      });
    }

    // Buy Now (Add to cart and go to cart.html)
    const buyBtn = document.getElementById('pdp-buy-now-btn');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        store.addToCart(this.product.id, this.quantity, {
          color: this.selectedColor,
          size: this.selectedSize
        });
        window.location.href = 'cart.html?checkout=true';
      });
    }

    // Wishlist Toggle Button
    const wishBtn = document.getElementById('pdp-wishlist-toggle');
    if (wishBtn) {
      wishBtn.addEventListener('click', () => {
        store.toggleWishlist(this.product.id);
        this.updateWishlistButton();
      });
    }
  }

  updateWishlistButton() {
    const wishBtn = document.getElementById('pdp-wishlist-toggle');
    if (!wishBtn) return;
    const isSaved = store.isInWishlist(this.product.id);
    wishBtn.innerHTML = isSaved
      ? `<span style="color: var(--rose-accent);">${ICONS.heartFilled}</span> Saved to Wishlist`
      : `${ICONS.heart} Add to Wishlist`;
  }

  initTabs() {
    const triggers = document.querySelectorAll('.pdp-tab-trigger');
    const contents = document.querySelectorAll('.pdp-tab-content');

    triggers.forEach(t => {
      t.addEventListener('click', () => {
        const targetId = t.dataset.tab;
        triggers.forEach(tr => tr.classList.remove('active'));
        contents.forEach(co => co.classList.remove('active'));

        t.classList.add('active');
        const targetEl = document.getElementById(targetId);
        if (targetEl) targetEl.classList.add('active');
      });
    });
  }

  renderReviewsList() {
    const list = document.getElementById('pdp-reviews-list');
    if (!list) return;

    list.innerHTML = this.reviews.map(r => `
      <div style="padding: var(--space-5) 0; border-bottom: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);">
          <div>
            <span style="font-weight: 700; font-size: var(--text-sm);">${r.author}</span>
            <span style="font-size: var(--text-xs); color: var(--text-muted); margin-left: var(--space-2);">${r.location}</span>
          </div>
          <span style="font-size: var(--text-xs); color: var(--text-muted);">${r.date}</span>
        </div>
        <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-2);">
          <span style="color: var(--amber-accent); font-size: 0.9rem;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
          <span style="font-weight: 600; font-size: var(--text-sm);">${r.title}</span>
        </div>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); line-height: 1.6;">${r.content}</p>
      </div>
    `).join('');
  }

  initReviewForm() {
    const form = document.getElementById('pdp-write-review-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('#review-author-name').value.trim();
      const location = form.querySelector('#review-author-loc').value.trim() || 'Verified Customer';
      const rating = parseInt(form.querySelector('#review-rating-select').value, 10);
      const title = form.querySelector('#review-title-input').value.trim();
      const content = form.querySelector('#review-content-input').value.trim();

      if (!name || !title || !content) {
        store.showToast('Please complete all required review fields.', 'error');
        return;
      }

      this.reviews.unshift({
        author: name,
        location,
        date: 'Just now',
        rating,
        title,
        content
      });

      this.renderReviewsList();
      store.showToast('Thank you! Your verified review has been submitted.', 'success');
      form.reset();
    });
  }

  renderRelatedProducts() {
    const relatedWrap = document.getElementById('pdp-related-grid');
    if (!relatedWrap) return;

    // Filter products from same or other categories excluding current
    const related = PRODUCTS.filter(p => p.id !== this.product.id).slice(0, 4);
    relatedWrap.innerHTML = related.map(p => createProductCardHTML(p)).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ProductDetailsController();
});
