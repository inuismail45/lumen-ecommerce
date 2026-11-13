/**
 * LUMEN Shopping Cart & Simulated Checkout Controller
 * Manages cart table rendering, live calculations, coupon processing,
 * shipping method selection, checkout form validation, card formatting,
 * and order confirmation receipt generation.
 */

import { store } from './store.js';
import { ICONS } from './ui.js';

class CartCheckoutController {
  constructor() {
    this.cart = [];
    this.totals = {};
    this.isProcessingOrder = false;

    this.init();
  }

  init() {
    this.updateState();
    this.renderCartTable();
    this.renderOrderSummary();
    this.bindCartEvents();
    this.bindCheckoutForm();

    // Check if ?checkout=true is present in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get('checkout') === 'true') {
      const checkoutSection = document.getElementById('checkout-flow-section');
      if (checkoutSection) {
        setTimeout(() => {
          checkoutSection.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }

    // Re-render when cart state updates
    window.addEventListener('lumen:cart-updated', () => {
      this.updateState();
      this.renderCartTable();
      this.renderOrderSummary();
    });
  }

  updateState() {
    this.cart = store.getCart();
    this.totals = store.getTotals();
  }

  renderCartTable() {
    const tableBody = document.getElementById('cart-table-body');
    const emptyState = document.getElementById('cart-empty-view');
    const fullView = document.getElementById('cart-full-view');

    if (!tableBody || !emptyState || !fullView) return;

    if (this.cart.length === 0) {
      emptyState.style.display = 'block';
      fullView.style.display = 'none';
      return;
    }

    emptyState.style.display = 'none';
    fullView.style.display = 'grid';

    tableBody.innerHTML = this.cart.map(item => `
      <tr data-cart-item-id="${item.cartItemId}">
        <td>
          <div class="cart-item-col">
            <a href="product.html?id=${item.productId}">
              <img class="cart-thumb" src="${item.image}" alt="${item.name}">
            </a>
            <div>
              <div style="font-size: var(--text-xs); color: var(--accent-primary); text-transform: uppercase; font-weight: 600;">
                ${item.category || 'Instrument'}
              </div>
              <a href="product.html?id=${item.productId}" style="font-weight: 700; font-size: var(--text-sm); color: var(--text-primary); display: block; margin: 0.15rem 0;">
                ${item.name}
              </a>
              <div style="font-size: var(--text-xs); color: var(--text-muted);">
                Color: ${item.color} • Spec: ${item.size}
              </div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-family: var(--font-display); font-weight: 600; font-size: var(--text-sm);">$${item.price.toFixed(2)}</span>
        </td>
        <td>
          <div class="quantity-stepper" style="height: 38px;">
            <button class="stepper-btn cart-qty-btn" data-action="decrease" data-id="${item.cartItemId}" aria-label="Decrease">−</button>
            <span class="stepper-val" style="font-size: var(--text-xs); min-width: 28px;">${item.quantity}</span>
            <button class="stepper-btn cart-qty-btn" data-action="increase" data-id="${item.cartItemId}" aria-label="Increase">+</button>
          </div>
        </td>
        <td>
          <span style="font-family: var(--font-display); font-weight: 700; font-size: var(--text-base); color: var(--text-primary);">
            $${(item.price * item.quantity).toFixed(2)}
          </span>
        </td>
        <td style="text-align: right;">
          <button class="cart-remove-btn" data-id="${item.cartItemId}" title="Remove item" aria-label="Remove item" style="color: var(--text-muted); padding: var(--space-2); transition: color var(--transition-fast);">
            ${ICONS.trash}
          </button>
        </td>
      </tr>
    `).join('');

    // Quantity buttons
    tableBody.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const action = btn.dataset.action;
        const item = this.cart.find(i => i.cartItemId === id);
        if (!item) return;
        if (action === 'increase') store.updateQuantity(id, item.quantity + 1);
        if (action === 'decrease') store.updateQuantity(id, item.quantity - 1);
      });
    });

    // Remove buttons
    tableBody.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        store.removeFromCart(btn.dataset.id);
      });
    });
  }

  renderOrderSummary() {
    const t = this.totals;
    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const discountRow = document.getElementById('summary-discount-row');
    const discountValEl = document.getElementById('summary-discount-val');
    const taxEl = document.getElementById('summary-tax');
    const grandTotalEl = document.getElementById('summary-grand-total');

    if (subtotalEl) subtotalEl.textContent = `$${t.subtotal.toFixed(2)}`;
    
    if (shippingEl) {
      shippingEl.textContent = t.shipping === 0 ? 'FREE' : `$${t.shipping.toFixed(2)}`;
      shippingEl.style.color = t.shipping === 0 ? 'var(--emerald-accent)' : 'var(--text-primary)';
    }

    if (discountRow && discountValEl) {
      if (t.discountAmount > 0) {
        discountRow.style.display = 'flex';
        discountValEl.textContent = `-$${t.discountAmount.toFixed(2)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (taxEl) taxEl.textContent = `$${t.tax.toFixed(2)}`;
    if (grandTotalEl) grandTotalEl.textContent = `$${t.grandTotal.toFixed(2)}`;

    // Free shipping progress bar
    const progressEl = document.getElementById('cart-freeship-progress');
    const textEl = document.getElementById('cart-freeship-text');
    if (progressEl && textEl) {
      progressEl.style.width = `${t.freeShippingProgress}%`;
      if (t.amountNeededForFreeShipping > 0) {
        textEl.innerHTML = `Add <strong>$${t.amountNeededForFreeShipping.toFixed(2)}</strong> more to unlock Free Express Courier Delivery.`;
      } else {
        textEl.innerHTML = `🎉 <strong>Eligible for Free Worldwide Express Delivery!</strong>`;
      }
    }

    // Applied coupon badge
    const appliedCouponContainer = document.getElementById('applied-coupon-pill');
    if (appliedCouponContainer) {
      if (t.coupon) {
        appliedCouponContainer.style.display = 'inline-flex';
        appliedCouponContainer.innerHTML = `
          <span>Applied: <strong>${t.coupon.code}</strong> (${t.coupon.desc})</span>
          <button id="remove-coupon-btn" style="color: var(--rose-accent); margin-left: var(--space-2); font-weight: 700;">×</button>
        `;
        appliedCouponContainer.querySelector('#remove-coupon-btn').addEventListener('click', () => {
          store.removeCoupon();
        });
      } else {
        appliedCouponContainer.style.display = 'none';
        appliedCouponContainer.innerHTML = '';
      }
    }
  }

  bindCartEvents() {
    // Clear Entire Cart
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to remove all items from your shopping bag?')) {
          store.clearCart();
        }
      });
    }

    // Apply Coupon
    const couponForm = document.getElementById('coupon-apply-form');
    if (couponForm) {
      couponForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('coupon-input-code');
        if (input) {
          store.applyCoupon(input.value);
          input.value = '';
        }
      });
    }

    // Shipping Method Radios
    const shippingRadios = document.querySelectorAll('input[name="shipping-tier"]');
    shippingRadios.forEach(r => {
      r.addEventListener('change', (e) => {
        store.setShippingMethod(e.target.value);
      });
    });

    // Test Card Helper Pill
    const testCardPill = document.getElementById('test-card-fill-btn');
    if (testCardPill) {
      testCardPill.addEventListener('click', () => {
        document.getElementById('checkout-card-num').value = '4242 •••• •••• 4242';
        document.getElementById('checkout-card-exp').value = '12/28';
        document.getElementById('checkout-card-cvv').value = '888';
        document.getElementById('checkout-card-name').value = 'Alex Sterling';
        store.showToast('Demo credit card details populated!', 'info');
      });
    }
  }

  bindCheckoutForm() {
    const form = document.getElementById('checkout-master-form');
    if (!form) return;

    // Credit card number auto-formatting
    const cardInput = document.getElementById('checkout-card-num');
    if (cardInput) {
      cardInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 16);
        let formatted = v.match(/.{1,4}/g)?.join(' ') || v;
        e.target.value = formatted;
      });
    }

    // Expiration auto-formatting (MM/YY)
    const expInput = document.getElementById('checkout-card-exp');
    if (expInput) {
      expInput.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '').substring(0, 4);
        if (v.length >= 2) {
          e.target.value = v.substring(0, 2) + '/' + v.substring(2);
        } else {
          e.target.value = v;
        }
      });
    }

    // Master Form Submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.cart.length === 0) {
        store.showToast('Your shopping bag is empty.', 'error');
        return;
      }

      if (this.isProcessingOrder) return;

      // Validate inputs
      const email = document.getElementById('checkout-email').value.trim();
      const fname = document.getElementById('checkout-fname').value.trim();
      const lname = document.getElementById('checkout-lname').value.trim();
      const address = document.getElementById('checkout-address').value.trim();
      const city = document.getElementById('checkout-city').value.trim();
      const zip = document.getElementById('checkout-zip').value.trim();

      if (!email || !fname || !lname || !address || !city || !zip) {
        store.showToast('Please fill out all required shipping and contact details.', 'error');
        return;
      }

      this.isProcessingOrder = true;
      const submitBtn = document.getElementById('place-order-submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <span style="display: inline-block; animation: spin 1s linear infinite; margin-right: var(--space-2);">⟳</span>
        Authorizing Secure Payment...
      `;
      submitBtn.disabled = true;

      // Simulate 1.8s payment gateway roundtrip
      setTimeout(() => {
        this.isProcessingOrder = false;
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        const orderId = 'LMN-' + Math.floor(100000 + Math.random() * 900000);
        this.showOrderConfirmation(orderId, {
          name: `${fname} ${lname}`,
          email,
          address: `${address}, ${city} ${zip}`,
          totals: { ...this.totals },
          items: [...this.cart]
        });

        // Clear cart in store
        store.clearCart();
      }, 1800);
    });
  }

  showOrderConfirmation(orderId, orderDetails) {
    const modal = document.getElementById('order-confirmation-modal');
    if (!modal) return;

    modal.innerHTML = `
      <div class="modal-dialog" style="max-width: 620px; text-align: center; padding: var(--space-8);">
        <div class="success-badge-icon">
          ${ICONS.check}
        </div>
        <div class="section-tag" style="background: rgba(16, 185, 129, 0.15); color: var(--emerald-accent); border-color: rgba(16, 185, 129, 0.3);">
          Order Confirmed
        </div>
        <h2 style="font-family: var(--font-display); font-size: var(--text-3xl); font-weight: 800; margin-bottom: var(--space-2);">
          Thank You, ${orderDetails.name}
        </h2>
        <p style="font-size: var(--text-sm); color: var(--text-secondary); margin-bottom: var(--space-6);">
          Order ID: <strong style="color: var(--text-primary); font-family: monospace; font-size: 1rem;">#${orderId}</strong>
        </p>

        <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-5); text-align: left; margin-bottom: var(--space-6);">
          <div style="font-size: var(--text-xs); color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: var(--space-3);">Order Summary</div>
          
          <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-4);">
            ${orderDetails.items.map(i => `
              <div style="display: flex; justify-content: space-between; font-size: var(--text-sm);">
                <span>${i.name} (x${i.quantity})</span>
                <span style="font-family: var(--font-display); font-weight: 600;">$${(i.price * i.quantity).toFixed(2)}</span>
              </div>
            `).join('')}
          </div>

          <div style="border-top: 1px solid var(--border-subtle); padding-top: var(--space-3); display: flex; justify-content: space-between; font-size: var(--text-base); font-weight: 700;">
            <span>Grand Total Paid</span>
            <span style="color: var(--accent-primary); font-family: var(--font-display);">$${orderDetails.totals.grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <div style="font-size: var(--text-xs); color: var(--text-secondary); line-height: 1.6; margin-bottom: var(--space-6);">
          A confirmation dispatch receipt and live courier tracking link have been dispatched to <strong>${orderDetails.email}</strong>.
        </div>

        <a href="shop.html" class="btn btn-primary btn-lg" style="width: 100%;">
          Continue Browsing Collection →
        </a>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CartCheckoutController();
});
