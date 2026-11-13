/**
 * LUMEN Main Application Bootstrap
 * Loaded on every page to initialize navigation, drawers, modals, and global events
 */

import { store } from './store.js';
import { 
  initToastSystem, 
  initMiniCartDrawer, 
  initQuickViewModal, 
  initSearchModal, 
  initMobileNav, 
  openCartDrawer, 
  closeCartDrawer,
  openSearch, 
  closeSearch,
  openMobileNav,
  closeMobileNav,
  openQuickView,
  closeQuickView,
  updateBadges, 
  ICONS 
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Global UI Subsystems
  initToastSystem();
  initMiniCartDrawer();
  initQuickViewModal();
  initSearchModal();
  initMobileNav();

  // Initial Badge synchronization
  updateBadges();

  // Sticky Header Scroll Elevation
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Active Nav Link Detection
  const currentPath = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href')?.toLowerCase();
    if (!href) return;
    
    // Highlight home on root or index.html
    if ((currentPath.endsWith('/') || currentPath.endsWith('index.html')) && (href === 'index.html' || href === './')) {
      link.classList.add('active');
    } else if (currentPath.includes(href) && href !== 'index.html' && href !== './') {
      link.classList.add('active');
    }
  });

  // Global Header Action Buttons
  const cartTriggers = document.querySelectorAll('.header-cart-trigger');
  cartTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If we are already on cart.html, let the link navigate; otherwise open the slide-out mini-cart
      if (!window.location.pathname.includes('cart.html')) {
        e.preventDefault();
        openCartDrawer();
      }
    });
  });

  const searchTriggers = document.querySelectorAll('.header-search-trigger');
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  const menuTriggers = document.querySelectorAll('.mobile-menu-toggle');
  menuTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openMobileNav();
    });
  });

  // Global Delegated Click Handler for Products (Add to Cart, Quickview, Wishlist)
  document.addEventListener('click', (e) => {
    // Add to Cart from card button
    const addBtn = e.target.closest('[data-action="add-to-cart"]');
    if (addBtn) {
      e.preventDefault();
      const productId = addBtn.dataset.id;
      if (productId) {
        store.addToCart(productId, 1);
        
        // Micro-interaction animation on button
        addBtn.classList.add('added');
        addBtn.innerHTML = ICONS.check;
        setTimeout(() => {
          addBtn.classList.remove('added');
          addBtn.innerHTML = ICONS.plus;
        }, 1200);
      }
      return;
    }

    // Quick View
    const qvBtn = e.target.closest('[data-action="quickview"]');
    if (qvBtn) {
      e.preventDefault();
      const productId = qvBtn.dataset.id;
      if (productId) openQuickView(productId);
      return;
    }

    // Wishlist Toggle
    const wishBtn = e.target.closest('[data-action="wishlist"]');
    if (wishBtn) {
      e.preventDefault();
      const productId = wishBtn.dataset.id;
      if (productId) {
        const isSaved = store.toggleWishlist(productId);
        wishBtn.classList.toggle('active', isSaved);
        wishBtn.innerHTML = isSaved ? ICONS.heartFilled : ICONS.heart;
        wishBtn.title = isSaved ? 'Remove from Wishlist' : 'Add to Wishlist';
      }
      return;
    }
  });

  // Global Keyboard Navigation (Esc closes modals/drawers)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
      closeSearch();
      closeMobileNav();
    }
  });

  // Footer Newsletter Form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const email = input ? input.value.trim() : '';

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        store.showToast('Please enter a valid email address.', 'error');
        return;
      }

      store.showToast(`Thank you! Use promo code "LUMEN20" for 20% off.`, 'success');
      input.value = '';
    });
  }
});
