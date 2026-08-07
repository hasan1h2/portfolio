/* ==========================================================================
   BLOG & KNOWLEDGE HUB - MARKDOWN PARSER ENGINE
   ========================================================================== */

const MarkdownParserEngine = {
  async loadAndParseMarkdown(markdownFilename, targetContainer) {
    if (!markdownFilename || !targetContainer) return;

    try {
      const response = await fetch(`../assets/markdown/${markdownFilename}`);
      if (!response.ok) throw new Error(`Markdown file not found: ${markdownFilename}`);

      const rawMarkdown = await response.text();
      let parsedHtml = '';

      if (typeof marked !== 'undefined') {
        parsedHtml = marked.parse(rawMarkdown);
      } else {
        // Fallback plain text renderer
        parsedHtml = `<pre>${rawMarkdown}</pre>`;
      }

      targetContainer.innerHTML = parsedHtml;

      // Trigger Prism.js code syntax highlighting if available
      if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(targetContainer);
      }

      // Trigger Table of Contents Generator
      if (window.TOCGenerator) {
        window.TOCGenerator.generateTOC(targetContainer, document.querySelector('#toc-container'));
      }
    } catch (err) {
      console.error('[MarkdownParserEngine] Parse error:', err);
      targetContainer.innerHTML = `<div class="alert-ds alert-ds-danger">Failed to load article content.</div>`;
    }
  }
};

if (typeof window !== 'undefined') {
  window.MarkdownParserEngine = MarkdownParserEngine;
}
