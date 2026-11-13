/**
 * LUMEN Reactive State Management & LocalStorage Persistence
 * Centralized Store for Shopping Cart, Wishlist, and Checkout Calculations
 */

import { PRODUCTS, COUPONS } from './data.js';

const STORAGE_KEYS = {
  CART: 'lumen_cart_v1',
  WISHLIST: 'lumen_wishlist_v1',
  COUPON: 'lumen_coupon_v1'
};

class Store extends EventTarget {
  constructor() {
    super();
    this.cart = this._loadFromStorage(STORAGE_KEYS.CART, []);
    this.wishlist = this._loadFromStorage(STORAGE_KEYS.WISHLIST, []);
    this.appliedCoupon = this._loadFromStorage(STORAGE_KEYS.COUPON, null);
    this.shippingMethod = 'standard'; // 'standard', 'express', 'overnight'
  }

  _loadFromStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`Could not load ${key} from localStorage`, e);
      return fallback;
    }
  }

  _saveToStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Could not save ${key} to localStorage`, e);
    }
  }

  _notify(eventName, detail = {}) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }

  showToast(message, type = 'success', duration = 3500) {
    this._notify('lumen:toast', { message, type, duration });
  }

  // ================= CART OPERATIONS ================= //

  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  addToCart(productId, quantity = 1, options = {}) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) {
      this.showToast('Product not found.', 'error');
      return null;
    }

    const selectedColor = options.color || (product.colors && product.colors[0]?.name) || 'Default';
    const selectedSize = options.size || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = `${productId}-${selectedColor}-${selectedSize}`.toLowerCase().replace(/\s+/g, '-');

    const existingIndex = this.cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingIndex > -1) {
      const newQty = this.cart[existingIndex].quantity + quantity;
      if (newQty > product.stockCount) {
        this.cart[existingIndex].quantity = product.stockCount;
        this.showToast(`Only ${product.stockCount} items available in stock.`, 'warning');
      } else {
        this.cart[existingIndex].quantity = newQty;
        this.showToast(`Updated quantity in your shopping bag.`, 'info');
      }
    } else {
      const addedQty = Math.min(quantity, product.stockCount);
      this.cart.push({
        cartItemId,
        productId: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.categoryName,
        color: selectedColor,
        size: selectedSize,
        quantity: addedQty,
        stockCount: product.stockCount
      });
      this.showToast(`"${product.name}" added to bag!`, 'success');
    }

    this._saveToStorage(STORAGE_KEYS.CART, this.cart);
    this._notify('lumen:cart-updated', { cart: this.cart, count: this.getCartCount() });
    return cartItemId;
  }

  updateQuantity(cartItemId, newQty) {
    const itemIndex = this.cart.findIndex(i => i.cartItemId === cartItemId);
    if (itemIndex === -1) return;

    if (newQty <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }

    const maxStock = this.cart[itemIndex].stockCount || 99;
    if (newQty > maxStock) {
      this.cart[itemIndex].quantity = maxStock;
      this.showToast(`Maximum stock limit reached (${maxStock}).`, 'warning');
    } else {
      this.cart[itemIndex].quantity = newQty;
    }

    this._saveToStorage(STORAGE_KEYS.CART, this.cart);
    this._notify('lumen:cart-updated', { cart: this.cart, count: this.getCartCount() });
  }

  removeFromCart(cartItemId) {
    const item = this.cart.find(i => i.cartItemId === cartItemId);
    this.cart = this.cart.filter(i => i.cartItemId !== cartItemId);
    this._saveToStorage(STORAGE_KEYS.CART, this.cart);
    this._notify('lumen:cart-updated', { cart: this.cart, count: this.getCartCount() });
    if (item) {
      this.showToast(`Removed "${item.name}" from bag.`, 'info');
    }
  }

  clearCart() {
    this.cart = [];
    this.appliedCoupon = null;
    this._saveToStorage(STORAGE_KEYS.CART, this.cart);
    this._saveToStorage(STORAGE_KEYS.COUPON, null);
    this._notify('lumen:cart-updated', { cart: this.cart, count: 0 });
  }

  // ================= COUPON & TOTALS ================= //

  applyCoupon(code) {
    const cleanCode = (code || '').trim().toUpperCase();
    if (!cleanCode) {
      this.showToast('Please enter a promo code.', 'error');
      return { success: false, message: 'Please enter a promo code.' };
    }

    const coupon = COUPONS[cleanCode];
    if (!coupon) {
      this.showToast(`Promo code "${cleanCode}" is invalid.`, 'error');
      return { success: false, message: 'Invalid promo code' };
    }

    this.appliedCoupon = coupon;
    this._saveToStorage(STORAGE_KEYS.COUPON, this.appliedCoupon);
    this._notify('lumen:cart-updated', { cart: this.cart });
    this.showToast(`Coupon "${cleanCode}" applied: ${coupon.desc}`, 'success');
    return { success: true, coupon };
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this._saveToStorage(STORAGE_KEYS.COUPON, null);
    this._notify('lumen:cart-updated', { cart: this.cart });
    this.showToast('Promo code removed.', 'info');
  }

  getAppliedCoupon() {
    return this.appliedCoupon;
  }

  setShippingMethod(method) {
    this.shippingMethod = method;
    this._notify('lumen:cart-updated', { cart: this.cart });
  }

  getShippingCost(subtotal) {
    if (this.appliedCoupon?.type === 'free_shipping') return 0;
    if (this.shippingMethod === 'express') return 15.00;
    if (this.shippingMethod === 'overnight') return 25.00;
    // Standard shipping is free on orders >= $150, otherwise $12
    return subtotal >= 150 ? 0 : (subtotal > 0 ? 12.00 : 0);
  }

  getTotals() {
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = 0;

    if (this.appliedCoupon) {
      if (this.appliedCoupon.type === 'percentage') {
        discountAmount = (subtotal * this.appliedCoupon.value) / 100;
      } else if (this.appliedCoupon.type === 'fixed') {
        discountAmount = Math.min(this.appliedCoupon.value, subtotal);
      }
    }

    const shipping = this.getShippingCost(subtotal);
    // Estimated tax: 8.25% applied to subtotal minus discount
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const tax = taxableAmount > 0 ? taxableAmount * 0.0825 : 0;
    const grandTotal = Math.max(0, taxableAmount + shipping + tax);

    // Free shipping threshold ($150)
    const freeShippingThreshold = 150;
    const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
    const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      shipping: parseFloat(shipping.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      grandTotal: parseFloat(grandTotal.toFixed(2)),
      freeShippingThreshold,
      amountNeededForFreeShipping: parseFloat(amountNeededForFreeShipping.toFixed(2)),
      freeShippingProgress,
      coupon: this.appliedCoupon,
      shippingMethod: this.shippingMethod
    };
  }

  // ================= WISHLIST ================= //

  getWishlist() {
    return this.wishlist;
  }

  getWishlistCount() {
    return this.wishlist.length;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  toggleWishlist(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const index = this.wishlist.indexOf(productId);

    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast(`Removed ${product ? `"${product.name}"` : 'item'} from wishlist.`, 'info');
    } else {
      this.wishlist.push(productId);
      this.showToast(`Saved ${product ? `"${product.name}"` : 'item'} to your wishlist.`, 'success');
    }

    this._saveToStorage(STORAGE_KEYS.WISHLIST, this.wishlist);
    this._notify('lumen:wishlist-updated', { wishlist: this.wishlist, count: this.wishlist.length });
    return this.isInWishlist(productId);
  }
}

export const store = new Store();
if (typeof window !== 'undefined') {
  window.store = store;
}
