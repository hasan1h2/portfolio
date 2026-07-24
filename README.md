# 🚀 Habib Hasan | Premium 3D Portfolio

A world-class, production-ready, fully responsive static personal portfolio website for **Habib Hasan** (Flutter App Developer, Full Stack Web Developer, Graphic Designer, Digital Marketer, SEO Specialist, Video Editor, AI Content Creator, DevOps Learner).

## 🌟 Features
- **Award-winning Design**: Luxury dark theme with glassmorphism layers, neon gradients, and premium visual hierarchy.
- **3D Interactions**: Geodesic interactive 3D hero background via [Three.js](https://threejs.org/).
- **Dynamic Effects**: Custom animated glowing cursor, page preloaders, tilting cards (Vanilla-tilt), particle backgrounds (Particles.js).
- **Responsive Architecture**: Built ground-up with HTML5, Vanilla CSS3, custom utilities, and Bootstrap 5.
- **Fast & SEO Optimized**: 100% static, modular Javascript, semantic markup, zero backend rendering wait times.

## 🛠️ Tech Stack
This project purposely avoids modern frontend frameworks (React, Vue, Next.js) to remain incredibly lightweight and instantly deployable.

- **Structure**: HTML5
- **Styling**: Vanilla CSS3, Bootstrap 5 (Grid, Modals)
- **Logics & Animations**: JavaScript (ES6+), GSAP (Scroll triggers), AOS (Fade Animations), JQuery
- **Interactivity**: Three.js, Particles.js, Vanilla Tilt.js, Typed.js
- **Icons & Typography**: Font Awesome 6, Bootstrap Icons, Google Fonts (Outfit)

## 📂 Project Structure

```
my_portfolio/
│
├── assets/
│   ├── css/
│   │   └── style.css            # Global unified styles and glassmorphism framework
│   ├── js/
│   │   ├── main.js              # Global controller (Loader, Theme, Cursor, Navbar, Filtering)
│   │   ├── three-hero.js        # Three.js custom 3D scene script
│   │   └── particles-config.js  # Background particles configuration
│   ├── images/                  # Bio avatars and global graphics
│   ├── projects/                # Specific project showcases (Chef Starz, Artisan, etc.)
│   └── certificates/            # Official certificates and awards
│
├── portfolio/                   # Specialized Sub-Portfolio Pages
│   ├── flutter.html
│   ├── web.html
│   ├── graphic-design.html
│   ├── video-editing.html
│   ├── digital-marketing.html
│   ├── ai-projects.html
│   └── devops.html
│
├── index.html                   # Root Hero & Summary Page
├── about.html                   # Detailed Biography
├── skills.html                  # Skill Progress & Focus
├── experience.html              # Tech Agency Experience
├── education.html               # Institutional Training
├── projects.html                # Searchable Gallery Grid
├── services.html                # Service Offers
├── certificates.html            # Certification Downloads
├── contact.html                 # Direct Contact & Maps
│
├── sitemap.xml                  # SEO Index Map
├── robots.txt                   # Search Crawler Directives
└── README.md                    # Documentation
```

## 🚀 Deployment Guide (GitHub Pages)

This static site is completely ready for deployment on **GitHub Pages**.

### Steps to Deploy:
1. **Initialize Git Repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Habib Portfolio"
   ```
2. **Push to GitHub:**
   - Create a new repository on GitHub named `my_portfolio` (or `habibhasan.github.io`).
   - Add the remote origin and push.
   ```bash
   git remote add origin https://github.com/Username/my_portfolio.git
   git branch -M main
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - Go to your repository **Settings**.
   - Navigate to the **Pages** section on the left sidebar.
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Under **Branch**, select the `main` branch, root `/` folder, and hit **Save**.
   - Your site will instantly be built and available at `https://[Your-Username].github.io/my_portfolio/`.

## 🎨 Theme Customization
To change the primary branding colors, open `assets/css/style.css` and navigate to the `:root` pseudo-class variables:
```css
:root {
  --primary-color: #00E5FF;
  --secondary-color: #7B61FF;
  --accent-color: #00FFA3;
  --bg-dark: #050816;
}
```

---
**Designed & Developed for Habib Hasan.**
