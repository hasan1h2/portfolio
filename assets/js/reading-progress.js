/* ==========================================================================
   BLOG & KNOWLEDGE HUB - READING PROGRESS & TIME CALCULATOR
   ========================================================================== */

const ReadingProgressEngine = {
  init() {
    this.bindProgressBar();
  },

  bindProgressBar() {
    const progressBar = document.querySelector('.scroll-progress-bar, #blog-reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const article = document.querySelector('.article-content, #article-body');
      if (!article) return;

      const totalHeight = article.offsetHeight - window.innerHeight;
      const scrollPosition = window.scrollY - article.offsetTop;
      const progress = Math.min(Math.max((scrollPosition / totalHeight) * 100, 0), 100);

      progressBar.style.width = `${progress}%`;
    });
  },

  calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  ReadingProgressEngine.init();
});

if (typeof window !== 'undefined') {
  window.ReadingProgressEngine = ReadingProgressEngine;
}
