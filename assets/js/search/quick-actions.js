/* ==========================================================================
   GLOBAL SEARCH SYSTEM - QUICK ACTION SHORTCUTS
   ========================================================================== */

const GlobalQuickActions = {
  actions: [
    { label: 'View Projects', icon: 'bi-rocket-takeoff', url: 'projects.html' },
    { label: 'Download Resume', icon: 'bi-download', url: 'downloads.html' },
    { label: 'View Certificates', icon: 'bi-award', url: 'certificates.html' },
    { label: 'Open Blog', icon: 'bi-journal-code', url: 'blog/index.html' },
    { label: 'Switch Theme', icon: 'bi-palette', action: 'toggle-theme' },
    { label: 'Contact Me', icon: 'bi-envelope', url: 'contact.html' }
  ],

  renderQuickActions(container) {
    if (!container) return;

    container.innerHTML = `
      <div class="caption text-muted mb-2 font-mono">Quick Actions:</div>
      <div class="quick-actions-strip">
        ${this.actions.map(act => `
          <button class="quick-action-chip" data-url="${act.url || ''}" data-action="${act.action || ''}">
            <i class="bi ${act.icon} me-1"></i> ${act.label}
          </button>
        `).join('')}
      </div>
    `;

    container.querySelectorAll('.quick-action-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const url = chip.getAttribute('data-url');
        const action = chip.getAttribute('data-action');

        if (action === 'toggle-theme' && window.ThemeEngine) {
          window.ThemeEngine.toggleTheme();
        } else if (url) {
          window.location.href = url;
        }
      });
    });
  }
};

if (typeof window !== 'undefined') {
  window.GlobalQuickActions = GlobalQuickActions;
}
