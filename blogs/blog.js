// Blog yükleme ve gösterme fonksiyonları
$(document).ready(function(){
    loadBlogs();
});

function loadBlogs() {
    // blogsData değişkeni blogs-data.js dosyasından gelir
    if (typeof blogsData !== 'undefined') {
        displayBlogs(blogsData);
        initializeBlogCarousel();
    } else {
        // Fallback: JSON dosyasından yükle (sunucu gerektirir)
        fetch('blogs/blogs.json')
            .then(response => response.json())
            .then(blogs => {
                displayBlogs(blogs);
                initializeBlogCarousel();
            })
            .catch(error => {
                console.error('Blog yüklenirken hata oluştu:', error);
                console.log('Lütfen bir HTTP sunucusu kullanın veya blogs-data.js dosyasını index.html\'e ekleyin');
            });
    }
}

function displayBlogs(blogs) {
    const blogGrid = $('#blogs-grid');
    blogGrid.empty();

    // Blogları tarihe göre sırala (en yeni önce)
    blogs.sort((a, b) => new Date(b.date) - new Date(a.date));

    blogs.forEach(blog => {
        const blogCard = createBlogCard(blog);
        blogGrid.append(blogCard);
    });

    // Scroll butonlarını güncelle
    updateScrollButtons();
}

function createBlogCard(blog) {
    const formattedDate = formatDate(blog.date);
    const tags = blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
    const blogUrl = blog.blogId ? `blogs/blog-detail.html?id=${blog.blogId}` : '#';

    return `
        <div class="card" onclick="window.location.href='${blogUrl}'">
            <div class="box">
                <img src="${blog.image}" alt="${blog.title}" class="blog-image">
                <div class="text">${blog.title}</div>
                <p class="description">${blog.description}</p>
                <div class="blog-date">${formattedDate}</div>
                <div class="blog-tags">${tags}</div>
            </div>
        </div>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
}

// Scroll fonksiyonları
function scrollBlogsLeft() {
    const container = document.querySelector('.blogs-grid-container');
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
    });
    setTimeout(updateScrollButtons, 300);
}

function scrollBlogsRight() {
    const container = document.querySelector('.blogs-grid-container');
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
    setTimeout(updateScrollButtons, 300);
}

function updateScrollButtons() {
    const container = document.querySelector('.blogs-grid-container');
    const leftBtn = document.getElementById('scroll-left');
    const rightBtn = document.getElementById('scroll-right');

    if (!container || !leftBtn || !rightBtn) return;

    // Sol buton kontrolü
    if (container.scrollLeft <= 0) {
        leftBtn.disabled = true;
    } else {
        leftBtn.disabled = false;
    }

    // Sağ buton kontrolü
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 10) {
        rightBtn.disabled = true;
    } else {
        rightBtn.disabled = false;
    }
}

// Scroll event listener
$(document).ready(function() {
    const container = document.querySelector('.blogs-grid-container');
    if (container) {
        container.addEventListener('scroll', updateScrollButtons);
    }
});

// Blog detay modal fonksiyonları
function openBlogModal(blogId) {
    fetch('blogs/blogs.json')
        .then(response => response.json())
        .then(blogs => {
            const blog = blogs.find(b => b.id === blogId);
            if (blog) {
                showBlogModal(blog);
            }
        })
        .catch(error => {
            console.error('Blog detayı yüklenirken hata oluştu:', error);
        });
}

function showBlogModal(blog) {
    const formattedDate = formatDate(blog.date);
    const tags = blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('');
    
    const modalHTML = `
        <div id="blogModal" class="blog-modal">
            <div class="blog-modal-content">
                <span class="blog-modal-close" onclick="closeBlogModal()">&times;</span>
                <img src="${blog.image}" alt="${blog.title}" class="blog-modal-image">
                <h2 class="blog-modal-title">${blog.title}</h2>
                <div class="blog-modal-date">${formattedDate}</div>
                <div class="blog-tags" style="justify-content: flex-start; margin-bottom: 20px;">${tags}</div>
                <div class="blog-modal-content-text">${blog.content}</div>
            </div>
        </div>
    `;
    
    // Eski modal varsa kaldır
    $('#blogModal').remove();
    
    // Yeni modal ekle
    $('body').append(modalHTML);
    
    // Modal'ı göster
    $('#blogModal').fadeIn();
    
    // Modal dışına tıklanınca kapat
    $('#blogModal').click(function(e) {
        if (e.target.id === 'blogModal') {
            closeBlogModal();
        }
    });
}

function closeBlogModal() {
    $('#blogModal').fadeOut(function() {
        $(this).remove();
    });
}

// ESC tuşu ile modal'ı kapat
$(document).keydown(function(e) {
    if (e.key === "Escape") {
        closeBlogModal();
    }
});

