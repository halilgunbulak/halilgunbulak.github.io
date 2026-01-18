# SEO Optimizasyon Rehberi

## 🎯 Eklenen SEO Özellikleri

### 1. Meta Tags (Ana Sayfa - index.html)

#### Primary Meta Tags
- ✅ Title: "Halil İbrahim GÜNBULAK - Software Developer | Web & Mobile Development"
- ✅ Description: Full-stack developer açıklaması
- ✅ Keywords: İlgili anahtar kelimeler
- ✅ Author, Language, Robots meta tagları

#### Open Graph (Facebook, LinkedIn)
- ✅ og:type, og:url, og:title, og:description
- ✅ og:image (1200x630 önerilen boyut)
- ✅ og:locale, og:site_name

#### Twitter Cards
- ✅ twitter:card, twitter:title, twitter:description
- ✅ twitter:image

#### Canonical URL
- ✅ Duplicate content'i önlemek için canonical link

### 2. JSON-LD Structured Data (Ana Sayfa)

#### Person Schema
```json
{
  "@type": "Person",
  "name": "Halil İbrahim GÜNBULAK",
  "jobTitle": "Software Developer",
  "knowsAbout": ["JavaScript", "React", "Flutter", ...],
  "sameAs": ["GitHub", "LinkedIn", "Twitter URLs"]
}
```

#### Website Schema
```json
{
  "@type": "WebSite",
  "name": "Portfolio",
  "potentialAction": {
    "@type": "SearchAction"
  }
}
```

#### Blog Schema
```json
{
  "@type": "Blog",
  "blogPost": [...]
}
```

#### Breadcrumb Schema
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [Home, About, Blogs, Services, Contact]
}
```

### 3. Blog Detay Sayfası SEO (blog-detail.html)

#### Dinamik Meta Tags
- ✅ JavaScript ile her blog için özel meta taglar
- ✅ Title, description, keywords otomatik güncellenir
- ✅ Open Graph ve Twitter Cards dinamik
- ✅ Canonical URL her blog için benzersiz

#### Blog Structured Data
```json
{
  "@type": "BlogPosting",
  "headline": "Blog başlığı",
  "datePublished": "2024-01-15",
  "author": {...},
  "publisher": {...},
  "articleBody": "...",
  "wordCount": 1500,
  "timeRequired": "PT5M"
}
```

## 🚀 Canlıya Alma Öncesi Yapılacaklar

### 1. URL'leri Güncelle
`index.html` ve `blog-detail.html` dosyalarında:
```html
<!-- Değiştir: -->
https://halilgunbulak.github.io/

<!-- Gerçek domain'iniz ile: -->
https://yourdomain.com/
```

### 2. Sosyal Medya Linklerini Güncelle
`index.html` içindeki JSON-LD'de:
```json
"sameAs": [
  "https://github.com/GERÇEK_KULLANICI_ADI",
  "https://linkedin.com/in/GERÇEK_KULLANICI_ADI",
  "https://twitter.com/GERÇEK_KULLANICI_ADI"
]
```

### 3. Profil Resmini Optimize Et
- **Boyut:** 1200x630 px (Open Graph için ideal)
- **Format:** JPG veya PNG
- **Dosya boyutu:** <200KB
- **Konum:** `images/profile.jpg`

### 4. Favicon Ekle
- **Boyutlar:** 16x16, 32x32, 180x180 (Apple)
- **Format:** ICO veya PNG
- **Konum:** Root dizinde `favicon.ico`

## 📊 Google Search Console Kurulumu

### 1. Site Ownership Doğrulama
```html
<!-- index.html <head> bölümüne ekle: -->
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### 2. Sitemap Oluştur
`sitemap.xml` dosyası oluştur:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://higcompany.com/</loc>
    <lastmod>2024-01-20</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://higcompany.com/blogs/blog-detail.html?id=blog1</loc>
    <lastmod>2024-01-15</lastmod>
    <priority>0.8</priority>
  </url>
</urlset>
```

### 3. robots.txt Oluştur
Root dizinde `robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## 🔍 SEO Test Araçları

### 1. Google Tools
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Mobile-Friendly Test:** https://search.google.com/test/mobile-friendly
- **Rich Results Test:** https://search.google.com/test/rich-results
- **Search Console:** https://search.google.com/search-console

### 2. Social Media Debuggers
- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/

### 3. SEO Analysis Tools
- **Lighthouse (Chrome DevTools):** F12 > Lighthouse
- **SEMrush:** https://www.semrush.com/
- **Ahrefs:** https://ahrefs.com/
- **Moz:** https://moz.com/

## 💡 SEO İpuçları

### 1. İçerik Optimizasyonu
- ✅ Her sayfada benzersiz title ve description
- ✅ H1, H2, H3 başlıkları doğru kullanın
- ✅ Alt text'leri resimlere ekleyin
- ✅ İç linkleme yapın (blog'lar arası)
- ✅ Dış linklere `rel="noopener noreferrer"` ekleyin

### 2. Performans
- ✅ Resimleri optimize edin (WebP formatı)
- ✅ CSS ve JS dosyalarını minify edin
- ✅ Lazy loading kullanın
- ✅ CDN kullanın (Cloudflare, etc.)

### 3. Mobil Optimizasyon
- ✅ Responsive tasarım
- ✅ Touch-friendly butonlar (min 44x44px)
- ✅ Viewport meta tag
- ✅ Mobil sayfa hızı

### 4. Güvenlik
- ✅ HTTPS kullanın
- ✅ Security headers ekleyin
- ✅ XSS ve CSRF koruması

## 📈 Takip Edilecek Metrikler

### Google Analytics
```html
<!-- index.html <head> bölümüne ekle: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Takip Edilecek Metrikler
- **Organic Traffic:** Arama motorlarından gelen ziyaretçiler
- **Bounce Rate:** Tek sayfa görüntüleme oranı
- **Average Session Duration:** Ortalama oturum süresi
- **Pages per Session:** Oturum başına sayfa görüntüleme
- **Click-Through Rate (CTR):** Arama sonuçlarında tıklama oranı
- **Keyword Rankings:** Anahtar kelime sıralamaları

## ✅ SEO Checklist

- [ ] Meta tags eklendi (title, description, keywords)
- [ ] Open Graph tags eklendi
- [ ] Twitter Cards eklendi
- [ ] JSON-LD structured data eklendi
- [ ] Canonical URLs eklendi
- [ ] Sitemap.xml oluşturuldu
- [ ] robots.txt oluşturuldu
- [ ] Google Search Console kuruldu
- [ ] Google Analytics eklendi
- [ ] Resimler optimize edildi
- [ ] Alt text'ler eklendi
- [ ] HTTPS aktif
- [ ] Mobil uyumlu
- [ ] Sayfa hızı optimize edildi
- [ ] Social media debugger'larda test edildi

---

**Not:** SEO sonuçları 3-6 ay içinde görülmeye başlar. Düzenli içerik üretimi ve optimizasyon önemlidir.

