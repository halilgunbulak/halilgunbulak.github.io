// URL'den blog ID'sini al
function getBlogIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// SEO Meta Taglarını Güncelle
function updateSEOMetaTags(blog, blogId) {
    const baseUrl = window.location.origin + window.location.pathname.replace('blog-detail.html', '');
    const blogUrl = `${window.location.origin}${window.location.pathname}?id=${blogId}`;
    const imageUrl = blog.image ? `${baseUrl}${blog.image}` : '';

    // Title
    document.title = `${blog.title} - Halil İbrahim GÜNBULAK`;

    // Meta Description
    const description = blog.description || blog.content[0]?.text?.substring(0, 160) || 'Blog post by Halil İbrahim GÜNBULAK';
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'title', blog.title);

    // Keywords
    const keywords = blog.tags ? blog.tags.join(', ') : 'blog, programming';
    updateMetaTag('name', 'keywords', keywords);

    // Open Graph
    updateMetaTag('property', 'og:title', blog.title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', blogUrl);
    updateMetaTag('property', 'og:image', imageUrl);
    updateMetaTag('property', 'article:published_time', blog.date);
    updateMetaTag('property', 'article:author', blog.author || 'Halil İbrahim GÜNBULAK');

    // Twitter
    updateMetaTag('property', 'twitter:title', blog.title);
    updateMetaTag('property', 'twitter:description', description);
    updateMetaTag('property', 'twitter:url', blogUrl);
    updateMetaTag('property', 'twitter:image', imageUrl);

    // Canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
        canonicalLink.href = blogUrl;
    } else {
        const newCanonical = document.createElement('link');
        newCanonical.rel = 'canonical';
        newCanonical.href = blogUrl;
        document.head.appendChild(newCanonical);
    }

    // JSON-LD Structured Data
    addBlogStructuredData(blog, blogId, blogUrl, imageUrl);
}

// Meta Tag Güncelleme Yardımcı Fonksiyonu
function updateMetaTag(attribute, attributeValue, content) {
    let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
    if (element) {
        element.setAttribute('content', content);
    } else {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        element.setAttribute('content', content);
        document.head.appendChild(element);
    }
}

// Blog için JSON-LD Structured Data Ekle
function addBlogStructuredData(blog, blogId, blogUrl, imageUrl) {
    // Eski structured data varsa kaldır
    const oldScript = document.querySelector('script[type="application/ld+json"]#blog-structured-data');
    if (oldScript) {
        oldScript.remove();
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "description": blog.description || blog.content[0]?.text?.substring(0, 160) || '',
        "image": imageUrl,
        "datePublished": blog.date,
        "dateModified": blog.date,
        "author": {
            "@type": "Person",
            "name": blog.author || "Halil İbrahim GÜNBULAK",
            "url": window.location.origin
        },
        "publisher": {
            "@type": "Person",
            "name": "Halil İbrahim GÜNBULAK",
            "logo": {
                "@type": "ImageObject",
                "url": `${window.location.origin}/images/logo.jpg`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": blogUrl
        },
        "keywords": blog.tags ? blog.tags.join(', ') : '',
        "articleBody": blog.content.map(block => block.text || '').join(' ').substring(0, 500),
        "wordCount": blog.content.map(block => block.text || '').join(' ').split(' ').length,
        "timeRequired": `PT${blog.readTime || 5}M`
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-structured-data';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Blog detaylarını yükle
$(document).ready(function() {
    const blogId = getBlogIdFromURL();
    
    if (!blogId) {
        showError('Blog ID bulunamadı!');
        return;
    }
    
    loadBlogDetail(blogId);
    
    // Mobile menu toggle
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });
});

function loadBlogDetail(blogId) {
    // blogContentsData değişkeni blog-contents-data.js dosyasından gelir
    if (typeof blogContentsData !== 'undefined') {
        const blog = blogContentsData[blogId];
        if (blog) {
            updateSEOMetaTags(blog, blogId);
            renderBlogContent(blog);
        } else {
            showError('Blog bulunamadı!');
        }
    } else {
        // Fallback: JSON dosyasından yükle (sunucu gerektirir)
        fetch('blog-contents.json')
            .then(response => response.json())
            .then(data => {
                const blog = data[blogId];
                if (blog) {
                    updateSEOMetaTags(blog, blogId);
                    renderBlogContent(blog);
                } else {
                    showError('Blog bulunamadı!');
                }
            })
            .catch(error => {
                console.error('Blog yüklenirken hata:', error);
                showError('Blog yüklenirken bir hata oluştu! Lütfen bir HTTP sunucusu kullanın.');
            });
    }
}

function renderBlogContent(blog) {
    const contentDiv = $('#blog-content');
    contentDiv.empty();
    
    // Blog başlığı ve meta bilgileri
    let html = `
        <div class="blog-header">
            <h1 class="blog-title">${blog.title || 'Başlıksız Blog'}</h1>
    `;
    
    if (blog.date || blog.author || blog.readTime) {
        html += '<div class="blog-meta">';
        if (blog.date) {
            html += `<span><i class="far fa-calendar"></i>${formatDate(blog.date)}</span>`;
        }
        if (blog.author) {
            html += `<span><i class="far fa-user"></i>${blog.author}</span>`;
        }
        if (blog.readTime) {
            html += `<span><i class="far fa-clock"></i>${blog.readTime} dk okuma</span>`;
        }
        html += '</div>';
    }
    
    if (blog.tags && blog.tags.length > 0) {
        html += '<div class="blog-tags">';
        blog.tags.forEach(tag => {
            html += `<span class="blog-tag">${tag}</span>`;
        });
        html += '</div>';
    }
    
    html += '</div>';
    
    // İçerik bloklarını sırayla ekle
    if (blog.content && Array.isArray(blog.content)) {
        blog.content.forEach((block, index) => {
            html += `<div class="content-block" style="animation-delay: ${index * 0.1}s">`;
            html += renderContentBlock(block);
            html += '</div>';
        });
    }
    
    contentDiv.html(html);
    
    // Sayfa başlığını güncelle
    document.title = `${blog.title || 'Blog'} - HİG COMPANY`;
}

function renderContentBlock(block) {
    let html = '';
    
    // Her bir özelliği kontrol et ve uygun HTML'i oluştur
    if (block.header) {
        html += `<h2 class="content-header">${block.header}</h2>`;
    }
    
    if (block.small_header) {
        html += `<h3 class="content-small-header">${block.small_header}</h3>`;
    }
    
    if (block.text) {
        html += `<p class="content-text">${block.text}</p>`;
    }
    
    if (block.image) {
        const alt = block.image_alt || 'Blog görseli';
        const caption = block.image_caption || '';
        html += `<img src="../${block.image}" alt="${alt}" class="content-image">`;
        if (caption) {
            html += `<p style="text-align: center; color: #999; font-size: 14px; margin-top: -20px;">${caption}</p>`;
        }
    }
    
    if (block.quote) {
        html += `<blockquote class="content-quote">${block.quote}</blockquote>`;
    }
    
    if (block.list && Array.isArray(block.list)) {
        html += '<ul class="content-list">';
        block.list.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += '</ul>';
    }
    
    if (block.code) {
        html += `<pre style="background: #222; padding: 20px; border-radius: 5px; overflow-x: auto; border-left: 3px solid crimson;"><code>${escapeHtml(block.code)}</code></pre>`;
    }
    
    if (block.video) {
        html += `<div style="position: relative; padding-bottom: 56.25%; height: 0; margin: 30px 0;">
            <iframe src="${block.video}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 10px;" frameborder="0" allowfullscreen></iframe>
        </div>`;
    }
    
    return html;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function showError(message) {
    $('#blog-content').html(`
        <div style="text-align: center; padding: 100px 20px;">
            <i class="fas fa-exclamation-triangle" style="font-size: 64px; color: crimson; margin-bottom: 20px;"></i>
            <h2 style="color: #fff; margin-bottom: 20px;">${message}</h2>
            <a href="../index.html#blogs" style="color: crimson; text-decoration: none; font-size: 18px;">
                <i class="fas fa-arrow-left"></i> Bloglara Dön
            </a>
        </div>
    `);
}

