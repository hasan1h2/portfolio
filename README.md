# 🚀 Habib Hasan — Award-Winning 3D Personal Portfolio Website

Welcome to the official production-ready repository of **Habib Hasan** — Agency-proven Flutter App Developer, Full Stack Web Engineer, Creative Professional, and DevOps Learner.

This website is a **100% static, responsive, high-performance web portfolio** built without backend frameworks, fully deployable on **GitHub Pages**, Vercel, Netlify, or any static hosting service.

---

## 🌟 Key Highlights & Features

- **Award-Winning Visual Design**: Dark Glassmorphism aesthetic featuring HSL tailored colors, cyber neon accents, floating 3D tilt cards, custom particle canvas, and reactive cursor effects.
- **Master Featured Projects Section** (`projects.html`): Chef Starz spotlight hero card, 8 category filters, live instant search, 4 dynamic layout switchers (Grid, Cards, Masonry, Large Preview), and Swiper.js project detail modal.
- **Multi-Category Portfolio Hub** (`portfolio.html`): 7 premium category landing cards with project counts, gradient borders, and CountUp statistics.
- **Seven Sub-Portfolio Pages** (`portfolio/`):
  - 📱 `flutter.html` — 12 Mobile Applications with APK download placeholders & device previews.
  - 💻 `web-development.html` & `web.html` — 6 Full-Stack Websites, SaaS Portals, and Dashboards.
  - 🎨 `graphic-design.html` — 10 Design items (Logos, Posters, Banners, Business Cards, Brand Identity).
  - 🎬 `video-editing.html` — 5 Video items (YouTube, Reels, Shorts, Commercials, Motion Graphics).
  - 📈 `digital-marketing.html` — 5 Growth Campaigns, Technical SEO Audit reports, Meta Ads & GA4.
  - 🤖 `ai-projects.html` — 5 AI Generative Workflows, Midjourney v6 Art & Prompt Matrices.
  - ⚙️ `devops.html` — 6 DevOps modules (Linux CLI, Docker Compose, GitHub Actions CI/CD, NGINX, Deployment).
- **Professional Digital Services** (`services.html`): 9 Service cards with feature lists, learn more modals, 6-step Work Process timeline, Why Choose Me section, Client Benefits, and flexible pricing tiers.
- **Education & Verified Certificates** (`certificates.html`): Official certificates (BdCalling Academy, Dreamland IT, Creative IT), live search, skills badges, 8 future certifications, credential modals.
- **Interactive Contact Page** (`contact.html`): 8 Quick Contact Cards with copy to clipboard buttons, EmailJS form integration, 6 FAQ accordions, and responsive Google Map embed.

---

## 🛠️ Technology Stack

- **Core**: HTML5, Vanilla CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3 (Modular Grid & Utilities)
- **Plugins**:
  - `jQuery 3.7`
  - `GSAP` (GreenSock Animation Platform)
  - `AOS` (Animate On Scroll)
  - `Vanilla Tilt.js` (3D Card Tilt)
  - `Swiper.js` (Image Gallery Sliders)
  - `GLightbox` (Lightbox Image & Video Popups)
  - `Isotope.js` (Masonry Grid Filtering)
  - `EmailJS` (Client-side Email Contact Form)
- **Icons**: Font Awesome 6, Bootstrap Icons

---

## 📂 Project Folder Structure

```
portfolio/
├── index.html                    # Master Landing Page (Hero, Stats, About, Skills, Featured)
├── about.html                    # Bio, Career Timeline & Agency Experience
├── skills.html                   # Interactive Tech Stack & Mastery Progress Bars
├── experience.html               # Sparktech Agency Experience & Job Responsibilities
├── education.html                # Academic Background & Qualifications
├── projects.html                # Master Featured Projects & Spotlight Showcase
├── portfolio.html                # Multi-Category Portfolio Hub
├── services.html                # Professional Services, Process & Pricing
├── certificates.html            # Education, Verified Certificates & Credentials
├── contact.html                 # Interactive Contact Form, FAQs & Map
├── privacy-policy.html          # Legal Privacy Policy
├── terms.html                   # Terms of Service
├── 404.html                     # Custom Cyberpunk 404 Error Page
├── robots.txt                   # Search Engine Crawler Guidance
├── sitemap.xml                  # Full XML Sitemap for SEO Indexing
├── manifest.json                # PWA Progressive Web App Manifest
├── README.md                    # Deployment & Architecture Documentation
├── OPTIMIZATION_REPORT.md       # Lighthouse Audit & Code Quality Report
│
├── portfolio/                   # Category Sub-Portfolios
│   ├── flutter.html             # Flutter Apps Portfolio (12 Apps)
│   ├── web-development.html     # Web Projects Portfolio (6 Websites)
│   ├── web.html                 # Web Projects Mirror Link
│   ├── graphic-design.html      # Graphic Design Masonry Gallery (10 Designs)
│   ├── video-editing.html       # Video Editing Portfolio (5 Videos)
│   ├── digital-marketing.html   # Digital Marketing & SEO (5 Campaigns)
│   ├── ai-projects.html         # AI & Generative Art (5 Workflows)
│   └── devops.html              # DevOps Pathways & Server Notes (6 Modules)
│
└── assets/
    ├── css/
    │   └── style.css            # Master Glassmorphism & Custom Utility Stylesheet
    ├── js/
    │   ├── email-config.js      # EmailJS Credentials Configuration File
    │   └── main.js              # Interactive DOM Controller & Plugin Manager
    └── images/                  # High-Resolution Vector SVG & Image Assets
        ├── profile.svg
        ├── certificates/
        └── projects/            # Category Project Images (flutter, web, graphic, video, etc.)
```

---

## 📧 EmailJS Setup Guide

To connect the contact form to your personal email inbox:
1. Create a free account at [EmailJS](https://www.emailjs.com/).
2. Create an **Email Service** (e.g. Gmail).
3. Create an **Email Template** with fields: `from_name`, `from_email`, `phone`, `company`, `service`, `budget`, `subject`, `message`.
4. Open `assets/js/email-config.js` and paste your keys:
```javascript
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "YOUR_PUBLIC_KEY",
  SERVICE_ID: "YOUR_SERVICE_ID",
  TEMPLATE_ID: "YOUR_TEMPLATE_ID"
};
```
*(Note: If left empty, the contact form automatically operates in graceful demonstration mode for static previews).*

---

## 🌐 GitHub Pages Deployment Guide

1. Create a new repository on GitHub (e.g. `portfolio`).
2. Push all files from your workspace directory to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Habib Hasan Portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
3. Navigate to **Settings** -> **Pages** in your GitHub repository.
4. Select `Branch: main`, `Folder: / (root)`, and click **Save**.
5. Your website will be live in ~60 seconds at: `https://YOUR_USERNAME.github.io/portfolio/`

---

## ⚖️ License & Attribution

Designed & Developed by **Habib Hasan** &copy; 2026. All Rights Reserved.
