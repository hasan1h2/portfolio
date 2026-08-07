/* ==========================================================================
   GLOBAL ANIMATION ENGINE - MASTER ORCHESTRATOR
   ========================================================================== */

const MasterAnimationEngine = {
  version: '2.0.0',

  init() {
    console.log('[AnimationEngine] Master Animation Engine Initializing...');

    // 1. Check for reduced motion preferences
    if (window.AnimationUtils && AnimationUtils.prefersReducedMotion()) {
      console.log('[AnimationEngine] Reduced motion preference detected. Heavy motion disabled.');
      return;
    }

    // 2. Initialize Sub-Engines safely
    this.initModule(window.PreloaderEngine, 'PreloaderEngine');
    this.initModule(window.ThreeBackgroundEngine, 'ThreeBackgroundEngine');
    this.initModule(window.CursorEngine, 'CursorEngine');
    this.initModule(window.HeroAnimationEngine, 'HeroAnimationEngine');
    this.initModule(window.ScrollAnimationEngine, 'ScrollAnimationEngine');
    this.initModule(window.CounterEngine, 'CounterEngine');
    this.initModule(window.ThemeTransitionEngine, 'ThemeTransitionEngine');
    this.initModule(window.PortfolioAnimationEngine, 'PortfolioAnimationEngine');
  },

  initModule(moduleObj, moduleName) {
    if (moduleObj && typeof moduleObj.init === 'function') {
      try {
        moduleObj.init();
      } catch (err) {
        console.warn(`[AnimationEngine] ${moduleName} initialization warning:`, err);
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  MasterAnimationEngine.init();
});

if (typeof window !== 'undefined') {
  window.MasterAnimationEngine = MasterAnimationEngine;
}
