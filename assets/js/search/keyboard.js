/* ==========================================================================
   GLOBAL SEARCH SYSTEM - KEYBOARD NAVIGATION & SHORTCUTS
   ========================================================================== */

const GlobalSearchKeyboard = {
  selectedIndex: -1,

  bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl + K or Cmd + K to Open Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (window.GlobalSearchModal) {
          window.GlobalSearchModal.openSearch();
        }
      }

      // Escape Key to Close Search Modal
      if (e.key === 'Escape') {
        if (window.GlobalSearchModal) {
          window.GlobalSearchModal.closeSearch();
        }
      }

      // Arrow Key Navigation inside Search Results
      const backdrop = document.querySelector('#globalSearchBackdrop');
      if (backdrop && backdrop.classList.contains('open')) {
        const resultCards = Array.from(document.querySelectorAll('.search-result-card'));

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = Math.min(this.selectedIndex + 1, resultCards.length - 1);
          this.updateSelection(resultCards);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
          this.updateSelection(resultCards);
        } else if (e.key === 'Enter' && this.selectedIndex >= 0 && resultCards[this.selectedIndex]) {
          e.preventDefault();
          resultCards[this.selectedIndex].click();
        }
      }
    });
  },

  updateSelection(cards) {
    cards.forEach((card, idx) => {
      if (idx === this.selectedIndex) {
        card.classList.add('selected');
        card.scrollIntoView({ block: 'nearest' });
      } else {
        card.classList.remove('selected');
      }
    });
  },

  resetSelection() {
    this.selectedIndex = -1;
  }
};

if (typeof window !== 'undefined') {
  window.GlobalSearchKeyboard = GlobalSearchKeyboard;
}
