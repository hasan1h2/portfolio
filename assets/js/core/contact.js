/* ==========================================================================
   GLOBAL DESIGN SYSTEM - CONTACT FORM & VALIDATION LOGIC
   ========================================================================== */

const DSContact = {
  init() {
    this.bindFormValidation();
  },

  bindFormValidation() {
    const contactForm = document.querySelector('#contactForm, .contact-form-ds');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const inputs = contactForm.querySelectorAll('.form-control-ds[required]');

      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
        }
      });

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('btn-ds-loading');
        }
        
        setTimeout(() => {
          if (submitBtn) submitBtn.classList.remove('btn-ds-loading');
          const alert = contactForm.querySelector('.alert-ds');
          if (alert) alert.style.display = 'block';
          contactForm.reset();
        }, 1500);
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  DSContact.init();
});

if (typeof window !== 'undefined') {
  window.DSContact = DSContact;
}
