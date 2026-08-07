/* ==========================================================================
   BLOG & KNOWLEDGE HUB - TABLE OF CONTENTS GENERATOR
   ========================================================================== */

const TOCGenerator = {
  generateTOC(contentContainer, tocContainer) {
    if (!contentContainer || !tocContainer) return;

    const headings = contentContainer.querySelectorAll('h2, h3');
    if (!headings.length) {
      tocContainer.style.display = 'none';
      return;
    }

    const fragment = document.createDocumentFragment();
    const ul = document.createElement('ul');
    ul.className = 'toc-list ps-0 list-unstyled mb-0';

    headings.forEach((heading, idx) => {
      const id = heading.id || `heading-${idx}`;
      heading.id = id;

      const li = document.createElement('li');
      li.className = `toc-item ${heading.tagName.toLowerCase() === 'h3' ? 'ms-3' : ''} mb-2`;

      const a = document.createElement('a');
      a.href = `#${id}`;
      a.className = 'toc-link text-secondary body-sm';
      a.textContent = heading.textContent;

      a.addEventListener('click', (e) => {
        e.preventDefault();
        heading.scrollIntoView({ behavior: 'smooth' });
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    fragment.appendChild(ul);
    tocContainer.innerHTML = '<h6 class="text-primary-color mb-3"><i class="bi bi-list-nested"></i> Table of Contents</h6>';
    tocContainer.appendChild(fragment);
    tocContainer.style.display = 'block';
  }
};

if (typeof window !== 'undefined') {
  window.TOCGenerator = TOCGenerator;
}
