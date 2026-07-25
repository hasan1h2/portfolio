const fs = require('fs');
const path = require('path');

const dirs = [
  'assets/images',
  'assets/images/projects/flutter',
  'assets/images/projects/web',
  'assets/images/projects/graphic',
  'assets/images/projects/video',
  'assets/images/projects/digital-marketing',
  'assets/images/projects/ai',
  'assets/images/projects/devops',
  'assets/images/certificates'
];

dirs.forEach(d => {
  const fullPath = path.join(__dirname, d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

function createSvgPlaceholder(title, category, color1, color2, width = 800, height = 500) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="overlay" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.15)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.4)" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect width="100%" height="100%" fill="url(#overlay)" />
  <circle cx="${width/2}" cy="${height/2 - 30}" r="60" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <text x="50%" y="${height/2 - 25}" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">${category}</text>
  <text x="50%" y="${height/2 + 40}" font-family="Arial, sans-serif" font-size="22" font-weight="600" fill="#00FFA3" text-anchor="middle">${title}</text>
  <text x="50%" y="${height/2 + 80}" font-family="Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="middle">Habib Hasan Portfolio Asset</text>
  <rect x="20" y="20" width="${width-40}" height="${height-40}" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" rx="16" />
</svg>`;
}

// Profile avatar
fs.writeFileSync('assets/images/profile.svg', createSvgPlaceholder('Habib Hasan', 'Flutter & Web Engineer', '#050816', '#1E1B4B', 600, 600));

// Flutter (12 screenshots)
const flutterProjects = [
  { name: 'chef-starz.svg', title: 'Chef Starz App' },
  { name: 'worker-hiring.svg', title: 'Worker Hiring App' },
  { name: 'artisan.svg', title: 'Artisan App' },
  { name: 'flutter-ui-kit.svg', title: 'Flutter Static UI' },
  { name: 'ecommerce-app.svg', title: 'E-Commerce Mobile' },
  { name: 'health-tracker.svg', title: 'Health Tech App' },
  { name: 'real-estate.svg', title: 'Real Estate App' },
  { name: 'food-delivery.svg', title: 'Food Delivery UI' },
  { name: 'crypto-wallet.svg', title: 'Crypto Wallet App' },
  { name: 'social-media.svg', title: 'Social Connect' },
  { name: 'chat-app.svg', title: 'Realtime Chat UI' },
  { name: 'task-manager.svg', title: 'Task Manager App' }
];
flutterProjects.forEach(p => {
  fs.writeFileSync(`assets/images/projects/flutter/${p.name}`, createSvgPlaceholder(p.title, 'Flutter & Dart', '#0284C7', '#0F172A'));
});

// Web (6 projects)
const webProjects = [
  { name: 'landing-page.svg', title: 'SaaS Landing Page' },
  { name: 'business-website.svg', title: 'Corporate Business Site' },
  { name: 'dashboard-ui.svg', title: 'Admin Analytics Dashboard' },
  { name: 'portfolio-site.svg', title: '3D Portfolio Website' },
  { name: 'ecommerce-web.svg', title: 'Modern E-Commerce Web' },
  { name: 'agency-website.svg', title: 'Creative Agency Website' }
];
webProjects.forEach(p => {
  fs.writeFileSync(`assets/images/projects/web/${p.name}`, createSvgPlaceholder(p.title, 'Full Stack Web', '#4F46E5', '#0F172A'));
});

// Graphic Design (10 items)
const graphicProjects = [
  { name: 'logo-design.svg', title: 'Brand Logo Design' },
  { name: 'poster-design.svg', title: 'Promotional Poster' },
  { name: 'banner-design.svg', title: 'Social Media Banner' },
  { name: 'business-card.svg', title: 'Luxury Business Card' },
  { name: 'flyer-design.svg', title: 'Event Flyer Design' },
  { name: 'brochure-design.svg', title: 'Corporate Brochure' },
  { name: 'thumbnail-design.svg', title: 'YouTube Thumbnail' },
  { name: 'social-media-pack.svg', title: 'Social Media Campaign' },
  { name: 'packaging-design.svg', title: 'Product Packaging' },
  { name: 'brand-identity.svg', title: 'Brand Guidelines Guide' }
];
graphicProjects.forEach(p => {
  fs.writeFileSync(`assets/images/projects/graphic/${p.name}`, createSvgPlaceholder(p.title, 'Graphic Design', '#D97706', '#0F172A'));
});

// Video Editing (5 items)
const videoProjects = [
  { name: 'youtube-video.svg', title: 'YouTube Tech Review' },
  { name: 'instagram-reel.svg', title: 'Viral Instagram Reel' },
  { name: 'motion-graphics.svg', title: 'Motion Graphics Intro' },
  { name: 'promo-video.svg', title: 'App Promotional Commercial' },
  { name: 'short-video.svg', title: 'Short Format Content' }
];
videoProjects.forEach(p => {
  fs.writeFileSync(`assets/images/projects/video/${p.name}`, createSvgPlaceholder(p.title, 'Video & Motion', '#DC2626', '#0F172A'));
});

// Digital Marketing (5 items)
const marketingProjects = [
  { name: 'seo-report.svg', title: 'Technical SEO Audit' },
  { name: 'campaign-strategy.svg', title: 'Digital Growth Campaign' },
  { name: 'facebook-ads.svg', title: 'High ROI Facebook Ads' },
  { name: 'google-ads.svg', title: 'Google Search Ads' },
  { name: 'analytics-dashboard.svg', title: 'Traffic & Conversion Insights' }
];
marketingProjects.forEach(p => {
  fs.writeFileSync(`assets/images/projects/digital-marketing/${p.name}`, createSvgPlaceholder(p.title, 'Digital Marketing', '#059669', '#0F172A'));
});

// AI (5 items)
const aiProjects = [
  { name: 'ai-images.svg', title: 'Midjourney Concept Art' },
  { name: 'ai-videos.svg', title: 'AI Avatar Video Generation' },
  { name: 'prompt-collection.svg', title: 'Advanced Prompt Matrix' },
  { name: 'creative-designs.svg', title: 'Generative Visual Assets' },
  { name: 'automation-concepts.svg', title: 'AI Workflow Automation' }
];
aiProjects.forEach(p => {
  fs.writeFileSync(`assets/images/projects/ai/${p.name}`, createSvgPlaceholder(p.title, 'AI & Generative Tools', '#7C3AED', '#0F172A'));
});

// DevOps (6 items)
const devopsProjects = [
  { name: 'linux-practice.svg', title: 'Linux Server Administration' },
  { name: 'docker-containers.svg', title: 'Docker Microservices Setup' },
  { name: 'github-actions.svg', title: 'CI/CD Pipeline Automation' },
  { name: 'nginx-config.svg', title: 'NGINX Reverse Proxy & SSL' },
  { name: 'cicd-notes.svg', title: 'Deployment Pipeline Notes' },
  { name: 'deployment-screenshots.svg', title: 'Cloud Server Deployment' }
];
devopsProjects.forEach(p => {
  fs.writeFileSync(`assets/images/projects/devops/${p.name}`, createSvgPlaceholder(p.title, 'DevOps & Infrastructure', '#475569', '#0F172A'));
});

// Certificates (3 items)
const certs = [
  { name: 'flutter-cert.svg', title: 'Flutter App Development - BdCalling' },
  { name: 'web-cert.svg', title: 'Web Engineering - Dreamland IT' },
  { name: 'design-cert.svg', title: 'Graphic & Digital Media Certification' }
];
certs.forEach(c => {
  fs.writeFileSync(`assets/images/certificates/${c.name}`, createSvgPlaceholder(c.title, 'Verified Credential', '#0284C7', '#1E1B4B', 800, 550));
});

console.log('All image placeholder SVGs generated successfully!');
