# PowerShell SVG Generator for Habib Hasan Portfolio
$dirs = @(
  "assets/images",
  "assets/images/projects/flutter",
  "assets/images/projects/web",
  "assets/images/projects/graphic",
  "assets/images/projects/video",
  "assets/images/projects/digital-marketing",
  "assets/images/projects/ai",
  "assets/images/projects/devops",
  "assets/images/certificates"
)

foreach ($d in $dirs) {
  if (-not (Test-Path $d)) {
    New-Item -ItemType Directory -Path $d -Force | Out-Null
  }
}

function Create-SvgPlaceholder {
  param(
    [string]$title,
    [string]$category,
    [string]$color1,
    [string]$color2,
    [int]$width = 800,
    [int]$height = 500
  )

  return @"
<svg xmlns="http://www.w3.org/2000/svg" width="$width" height="$height" viewBox="0 0 $width $height">
  <defs>
    <linearGradient id="bg_$($title -replace '\W+','')" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="$color1" />
      <stop offset="100%" stop-color="$color2" />
    </linearGradient>
    <linearGradient id="overlay_$($title -replace '\W+','')" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.15)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.55)" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg_$($title -replace '\W+',''))" />
  <rect width="100%" height="100%" fill="url(#overlay_$($title -replace '\W+',''))" />
  <circle cx="$([math]::Round($width/2))" cy="$([math]::Round($height/2 - 30))" r="55" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <text x="50%" y="$([math]::Round($height/2 - 25))" font-family="Outfit, Arial, sans-serif" font-size="26" font-weight="bold" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">$category</text>
  <text x="50%" y="$([math]::Round($height/2 + 35))" font-family="Outfit, Arial, sans-serif" font-size="22" font-weight="600" fill="#00FFA3" text-anchor="middle">$title</text>
  <text x="50%" y="$([math]::Round($height/2 + 75))" font-family="Outfit, Arial, sans-serif" font-size="14" fill="rgba(255,255,255,0.7)" text-anchor="middle">Habib Hasan • Featured Project Asset</text>
  <rect x="20" y="20" width="$($width-40)" height="$($height-40)" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" rx="16" />
</svg>
"@
}

# Profile avatar
Set-Content -Path "assets/images/profile.svg" -Value (Create-SvgPlaceholder "Habib Hasan" "Flutter & Web Engineer" "#050816" "#1E1B4B" 600 600)

# Flutter Projects
$flutter = @(
  @{ file="chef-starz.svg"; title="Chef Starz Gourmet App" },
  @{ file="worker-hiring.svg"; title="Worker Hiring Platform" },
  @{ file="artisan.svg"; title="Artisan Service Booking" },
  @{ file="flutter-ui-kit.svg"; title="Flutter Static UI Kit" },
  @{ file="ecommerce-app.svg"; title="E-Commerce Mobile App" },
  @{ file="health-tracker.svg"; title="Health Tech Mobile UI" },
  @{ file="real-estate.svg"; title="Real Estate Booking App" },
  @{ file="food-delivery.svg"; title="Food Delivery Experience" },
  @{ file="crypto-wallet.svg"; title="Crypto Wallet Interface" },
  @{ file="social-media.svg"; title="Social Connect App" },
  @{ file="chat-app.svg"; title="Realtime Chat Messenger" },
  @{ file="task-manager.svg"; title="Task & Productivity App" }
)
foreach ($p in $flutter) {
  Set-Content -Path "assets/images/projects/flutter/$($p.file)" -Value (Create-SvgPlaceholder $p.title "Flutter & Dart" "#0284C7" "#0F172A")
}

# Web Projects
$web = @(
  @{ file="landing-page.svg"; title="SaaS Product Landing Page" },
  @{ file="business-website.svg"; title="Corporate Business Site" },
  @{ file="dashboard-ui.svg"; title="Admin Analytics Dashboard" },
  @{ file="portfolio-site.svg"; title="3D Interactive Portfolio" },
  @{ file="ecommerce-web.svg"; title="Modern E-Commerce Portal" },
  @{ file="agency-website.svg"; title="Creative Agency Website" }
)
foreach ($p in $web) {
  Set-Content -Path "assets/images/projects/web/$($p.file)" -Value (Create-SvgPlaceholder $p.title "Full Stack Web" "#4F46E5" "#0F172A")
}

# Graphic Design
$graphic = @(
  @{ file="logo-design.svg"; title="Brand Logo & Identity" },
  @{ file="poster-design.svg"; title="Promotional Event Poster" },
  @{ file="banner-design.svg"; title="Social Media Banner Suite" },
  @{ file="business-card.svg"; title="Luxury Business Card" },
  @{ file="flyer-design.svg"; title="Corporate Event Flyer" },
  @{ file="brochure-design.svg"; title="Tri-Fold Company Brochure" },
  @{ file="thumbnail-design.svg"; title="High CTR YouTube Thumbnail" },
  @{ file="social-media-pack.svg"; title="Social Campaign Creative" },
  @{ file="packaging-design.svg"; title="Product Package Design" },
  @{ file="brand-identity.svg"; title="Brand Style Guidelines" }
)
foreach ($p in $graphic) {
  Set-Content -Path "assets/images/projects/graphic/$($p.file)" -Value (Create-SvgPlaceholder $p.title "Graphic Design" "#D97706" "#0F172A")
}

# Video Projects
$video = @(
  @{ file="youtube-video.svg"; title="YouTube Tech Review Edit" },
  @{ file="instagram-reel.svg"; title="Viral Instagram Reel" },
  @{ file="motion-graphics.svg"; title="Motion Graphics Intro" },
  @{ file="promo-video.svg"; title="App Commercial Promo" },
  @{ file="short-video.svg"; title="Short Format Content" }
)
foreach ($p in $video) {
  Set-Content -Path "assets/images/projects/video/$($p.file)" -Value (Create-SvgPlaceholder $p.title "Video & Motion" "#DC2626" "#0F172A")
}

# Marketing Projects
$marketing = @(
  @{ file="seo-report.svg"; title="Technical SEO Audit Report" },
  @{ file="campaign-strategy.svg"; title="Digital Growth Campaign" },
  @{ file="facebook-ads.svg"; title="High ROI Facebook Ad Suite" },
  @{ file="google-ads.svg"; title="Google Search Ad Campaign" },
  @{ file="analytics-dashboard.svg"; title="Traffic & Conversion Insights" }
)
foreach ($p in $marketing) {
  Set-Content -Path "assets/images/projects/digital-marketing/$($p.file)" -Value (Create-SvgPlaceholder $p.title "Digital Marketing" "#059669" "#0F172A")
}

# AI Projects
$ai = @(
  @{ file="ai-images.svg"; title="Midjourney Visual Concept Art" },
  @{ file="ai-videos.svg"; title="AI Avatar Video Generation" },
  @{ file="prompt-collection.svg"; title="Advanced Prompt Engineering" },
  @{ file="creative-designs.svg"; title="Generative Visual Assets" },
  @{ file="automation-concepts.svg"; title="AI Workflow Automation" }
)
foreach ($p in $ai) {
  Set-Content -Path "assets/images/projects/ai/$($p.file)" -Value (Create-SvgPlaceholder $p.title "AI & Generative Tools" "#7C3AED" "#0F172A")
}

# DevOps Projects
$devops = @(
  @{ file="linux-practice.svg"; title="Linux Server Administration" },
  @{ file="docker-containers.svg"; title="Docker Microservices Setup" },
  @{ file="github-actions.svg"; title="CI/CD Pipeline Automation" },
  @{ file="nginx-config.svg"; title="NGINX Reverse Proxy & SSL" },
  @{ file="cicd-notes.svg"; title="Deployment Pipeline Notes" },
  @{ file="deployment-screenshots.svg"; title="Cloud Server Deployment" }
)
foreach ($p in $devops) {
  Set-Content -Path "assets/images/projects/devops/$($p.file)" -Value (Create-SvgPlaceholder $p.title "DevOps & Infrastructure" "#475569" "#0F172A")
}

# Certificates
$certs = @(
  @{ file="flutter-cert.svg"; title="Flutter App Development - BdCalling" },
  @{ file="web-cert.svg"; title="Web Engineering - Dreamland IT" },
  @{ file="design-cert.svg"; title="Graphic & Digital Media Credential" }
)
foreach ($c in $certs) {
  Set-Content -Path "assets/images/certificates/$($c.file)" -Value (Create-SvgPlaceholder $c.title "Verified Credential" "#0284C7" "#1E1B4B" 800 550)
}

Write-Host "All SVG Placeholders Generated Successfully!"
