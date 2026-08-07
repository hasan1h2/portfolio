# Production Hardening & Deployment Checklist

## GitHub Pages Deployment Checklist

### 1. Codebase Cleanliness & Hardening
- [x] Removed exposed secrets, API keys, and debug logs.
- [x] All dynamic JSON text insertion sanitized via `escapeHTML()`.
- [x] Centralized `error-handler.js` registered for unhandled errors and image fallback.
- [x] PWA `site.webmanifest` and `service-worker.js` verified.
- [x] Global search (`Ctrl+K`) and Multi-Language Engine (`en` / `bn`) verified.

---

### 2. GitHub Pages Deployment Steps
1. Push all code to the primary GitHub repository branch (e.g. `main`).
2. Navigate to Repository **Settings** -> **Pages**.
3. Under **Build and deployment**, select **Source**: `Deploy from a branch`.
4. Choose Branch `main` and Folder `/ (root)`.
5. Click **Save**. GitHub Pages will deploy the static site automatically within 1-2 minutes.

---

### 3. Maintenance Guide
- **Adding Projects**: Edit `assets/data/projects.json`.
- **Adding Blog Posts**: Add `.md` file to `assets/markdown/` and entry to `assets/data/posts.json`.
- **Adding Downloads**: Edit `assets/data/downloads.json`.
