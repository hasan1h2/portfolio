/* ==========================================================================
   BLOG & KNOWLEDGE HUB - SOCIAL SHARE ENGINE
   ========================================================================== */

const BlogShareEngine = {
  init(shareContainer, title, url) {
    if (!shareContainer) return;

    const currentUrl = encodeURIComponent(url || window.location.href);
    const encodedTitle = encodeURIComponent(title || document.title);

    shareContainer.innerHTML = `
      <div class="d-flex align-items-center gap-2 flex-wrap">
        <span class="caption text-muted fw-bold me-2">Share Article:</span>
        <a href="https://twitter.com/intent/tweet?text=${encodedTitle}&url=${currentUrl}" target="_blank" class="footer-social-icon text-decoration-none" title="Share on Twitter"><i class="bi bi-twitter-x"></i></a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}" target="_blank" class="footer-social-icon text-decoration-none" title="Share on LinkedIn"><i class="bi bi-linkedin"></i></a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" class="footer-social-icon text-decoration-none" title="Share on Facebook"><i class="bi bi-facebook"></i></a>
        <a href="https://api.whatsapp.com/send?text=${encodedTitle}%20${currentUrl}" target="_blank" class="footer-social-icon text-decoration-none" title="Share on WhatsApp"><i class="bi bi-whatsapp"></i></a>
        <button class="footer-social-icon btn-copy-link" title="Copy Link"><i class="bi bi-link-45deg"></i></button>
      </div>
    `;

    shareContainer.querySelector('.btn-copy-link')?.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    });
  }
};

if (typeof window !== 'undefined') {
  window.BlogShareEngine = BlogShareEngine;
}
