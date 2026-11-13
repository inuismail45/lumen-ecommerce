/**
 * LUMEN About Us, FAQ & Contact Controller
 * Handles FAQ accordion toggles and interactive contact form validation
 */

import { FAQS } from './data.js';
import { store } from './store.js';

class ContactController {
  constructor() {
    this.init();
  }

  init() {
    this.renderFAQs();
    this.bindFAQEvents();
    this.bindContactForm();
  }

  renderFAQs() {
    const container = document.getElementById('faq-accordion-container');
    if (!container) return;

    container.innerHTML = FAQS.map((faq, index) => `
      <div class="faq-item ${index === 0 ? 'active' : ''}">
        <button class="faq-question-btn" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
          <span>${faq.q}</span>
          <span class="faq-icon-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </span>
        </button>
        <div class="faq-answer">
          <p>${faq.a}</p>
        </div>
      </div>
    `).join('');
  }

  bindFAQEvents() {
    const container = document.getElementById('faq-accordion-container');
    if (!container) return;

    container.addEventListener('click', (e) => {
      const btn = e.target.closest('.faq-question-btn');
      if (!btn) return;

      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Close all items
      container.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        el.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  }

  bindContactForm() {
    const form = document.getElementById('studio-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value;
      const message = document.getElementById('contact-message').value.trim();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !emailRegex.test(email) || !message) {
        store.showToast('Please fill out all required contact fields with a valid email.', 'error');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Transmitting Message...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        form.reset();

        store.showToast(`Message received, ${name}! Our concierge will reply to ${email} within 4 hours.`, 'success', 5000);
      }, 1200);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactController();
});
