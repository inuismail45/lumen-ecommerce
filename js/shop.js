/**
 * LUMEN Shop Catalogue Controller
 * Filtering, Sorting, Dynamic Grid Rendering, and Pagination
 */

import { PRODUCTS, CATEGORIES } from './data.js';
import { store } from './store.js';
import { createProductCardHTML } from './ui.js';

class ShopCatalogue {
  constructor() {
    this.products = [...PRODUCTS];
    this.filteredProducts = [...PRODUCTS];
    this.pageSize = 8;
    this.currentPage = 1;

    // Filter states
    this.state = {
      search: '',
      categories: [],
      maxPrice: 1000,
      minRating: 0,
      inStockOnly: false,
      wishlistOnly: false,
      sortBy: 'featured'
    };

    this.init();
  }

  init() {
    this.parseURLParams();
    this.bindEvents();
    this.renderCategoryFilters();
    this.applyFilters();
  }

  parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    
    // Category param
    const cat = params.get('category');
    if (cat) {
      this.state.categories = [cat];
    }

    // Search param
    const search = params.get('search');
    if (search) {
      this.state.search = search.toLowerCase();
      const searchInput = document.getElementById('filter-search-input');
      if (searchInput) searchInput.value = search;
    }

    // Wishlist param
    const filter = params.get('filter');
    if (filter === 'wishlist') {
      this.state.wishlistOnly = true;
    }
  }

  bindEvents() {
    // Search Filter
    const searchInput = document.getElementById('filter-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.state.search = e.target.value.trim().toLowerCase();
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Price Range Slider
    const priceSlider = document.getElementById('filter-price-slider');
    const priceValDisplay = document.getElementById('filter-price-val');
    if (priceSlider && priceValDisplay) {
      priceSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        this.state.maxPrice = val;
        priceValDisplay.textContent = `$${val}`;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Minimum Rating Select
    const ratingRadios = document.querySelectorAll('input[name="rating-filter"]');
    ratingRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        this.state.minRating = parseFloat(e.target.value) || 0;
        this.currentPage = 1;
        this.applyFilters();
      });
    });

    // In Stock Only Toggle
    const inStockToggle = document.getElementById('filter-in-stock');
    if (inStockToggle) {
      inStockToggle.addEventListener('change', (e) => {
        this.state.inStockOnly = e.target.checked;
        this.currentPage = 1;
        this.applyFilters();
      });
    }

    // Sort Dropdown
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.state.sortBy = e.target.value;
        this.applyFilters();
      });
    }

    // Reset Filters Button
    const resetBtn = document.getElementById('filter-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.resetFilters());
    }

    // Load More Button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.currentPage++;
        this.renderProducts(true);
      });
    }

    // Mobile Filter Drawer Toggle
    const mobileFilterTrigger = document.getElementById('mobile-filter-trigger');
    const closeMobileFilterBtn = document.getElementById('close-mobile-filters');
    const filterSidebar = document.querySelector('.filter-sidebar');
    if (mobileFilterTrigger && filterSidebar) {
      mobileFilterTrigger.addEventListener('click', () => {
        filterSidebar.classList.add('mobile-active');
        document.body.style.overflow = 'hidden';
      });
    }
    if (closeMobileFilterBtn && filterSidebar) {
      closeMobileFilterBtn.addEventListener('click', () => {
        filterSidebar.classList.remove('mobile-active');
        document.body.style.overflow = '';
      });
    }
  }

  renderCategoryFilters() {
    const catList = document.getElementById('category-filter-list');
    if (!catList) return;

    catList.innerHTML = CATEGORIES.map(cat => {
      const isChecked = this.state.categories.includes(cat.id);
      return `
        <li>
          <label class="filter-checkbox-label">
            <input type="checkbox" value="${cat.id}" class="category-checkbox" ${isChecked ? 'checked' : ''} style="display: none;">
            <span class="custom-checkbox">${isChecked ? '✓' : ''}</span>
            <span>${cat.name}</span>
            <span style="font-size: var(--text-xs); color: var(--text-muted); margin-left: auto;">(${cat.count})</span>
          </label>
        </li>
      `;
    }).join('');

    catList.querySelectorAll('.category-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const checked = Array.from(catList.querySelectorAll('.category-checkbox:checked')).map(c => c.value);
        this.state.categories = checked;
        this.currentPage = 1;
        this.applyFilters();
        this.renderCategoryFilters(); // Re-render checkmarks
      });
    });
  }

  applyFilters() {
    let result = [...this.products];

    // Filter by Wishlist Only (if triggered from header)
    if (this.state.wishlistOnly) {
      const wishlistIds = store.getWishlist();
      result = result.filter(p => wishlistIds.includes(p.id));
    }

    // Filter by Search Query
    if (this.state.search) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(this.state.search) || 
        p.categoryName.toLowerCase().includes(this.state.search) ||
        p.shortDescription.toLowerCase().includes(this.state.search)
      );
    }

    // Filter by Categories
    if (this.state.categories.length > 0) {
      result = result.filter(p => this.state.categories.includes(p.category));
    }

    // Filter by Price
    result = result.filter(p => p.price <= this.state.maxPrice);

    // Filter by Minimum Rating
    if (this.state.minRating > 0) {
      result = result.filter(p => p.rating >= this.state.minRating);
    }

    // Filter by Stock
    if (this.state.inStockOnly) {
      result = result.filter(p => p.stockCount > 0);
    }

    // Sorting
    switch (this.state.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    this.filteredProducts = result;
    this.renderProducts(false);
  }

  renderProducts(append = false) {
    const grid = document.getElementById('shop-product-grid');
    const countEl = document.getElementById('shop-results-count');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const emptyState = document.getElementById('shop-empty-state');

    if (!grid) return;

    const total = this.filteredProducts.length;
    const maxItems = this.currentPage * this.pageSize;
    const visibleProducts = this.filteredProducts.slice(0, maxItems);

    if (countEl) {
      countEl.textContent = `Showing ${Math.min(visibleProducts.length, total)} of ${total} products`;
    }

    if (total === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      if (loadMoreBtn) loadMoreBtn.style.display = 'none';
      return;
    }

    grid.style.display = 'grid';
    if (emptyState) emptyState.style.display = 'none';

    if (append) {
      const newItems = this.filteredProducts.slice((this.currentPage - 1) * this.pageSize, maxItems);
      grid.insertAdjacentHTML('beforeend', newItems.map(p => createProductCardHTML(p)).join(''));
    } else {
      grid.innerHTML = visibleProducts.map(p => createProductCardHTML(p)).join('');
    }

    // Toggle Load More button
    if (loadMoreBtn) {
      loadMoreBtn.style.display = maxItems < total ? 'inline-flex' : 'none';
    }
  }

  resetFilters() {
    this.state = {
      search: '',
      categories: [],
      maxPrice: 1000,
      minRating: 0,
      inStockOnly: false,
      wishlistOnly: false,
      sortBy: 'featured'
    };

    const searchInput = document.getElementById('filter-search-input');
    if (searchInput) searchInput.value = '';

    const priceSlider = document.getElementById('filter-price-slider');
    const priceValDisplay = document.getElementById('filter-price-val');
    if (priceSlider && priceValDisplay) {
      priceSlider.value = 1000;
      priceValDisplay.textContent = '$1000';
    }

    const inStockToggle = document.getElementById('filter-in-stock');
    if (inStockToggle) inStockToggle.checked = false;

    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) sortSelect.value = 'featured';

    const defaultRating = document.querySelector('input[name="rating-filter"][value="0"]');
    if (defaultRating) defaultRating.checked = true;

    this.currentPage = 1;
    this.renderCategoryFilters();
    this.applyFilters();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ShopCatalogue();
});
