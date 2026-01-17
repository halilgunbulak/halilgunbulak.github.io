// URL'den blog ID'sini al
function getBlogIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
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

