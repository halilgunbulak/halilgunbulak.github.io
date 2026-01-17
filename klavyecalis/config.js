// ============================================
// DOSYA YOLU YAPILANDIRMASI
// ============================================
// Hosting'e yüklerken bu değeri değiştirin
// Örnek: 'public_html/mtype/' veya '/mtype/' veya ''

const BASE_URL = ''; // Lokal test için boş bırakın
// const BASE_URL = 'public_html/mtype/'; // Hosting için bu satırı aktif edin

// ============================================
// YARDIMCI FONKSİYONLAR
// ============================================

/**
 * Dosya yolunu base URL ile birleştirir
 * @param {string} path - Dosya yolu
 * @returns {string} - Tam dosya yolu
 */
function getPath(path) {
    // Eğer path zaten / ile başlıyorsa, base URL ekleme
    if (path.startsWith('/') || path.startsWith('http')) {
        return path;
    }
    
    // Base URL varsa ekle
    if (BASE_URL) {
        // Base URL'in sonunda / yoksa ekle
        const base = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/';
        return base + path;
    }
    
    return path;
}

/**
 * Ses dosyası yolu
 */
function getSoundPath(filename) {
    return getPath('sounds/' + filename);
}

/**
 * Görsel dosyası yolu
 */
function getImagePath(filename) {
    return getPath('images/' + filename);
}

/**
 * CSS dosyası yolu
 */
function getCSSPath(filename) {
    return getPath(filename);
}

/**
 * JS dosyası yolu
 */
function getJSPath(filename) {
    return getPath(filename);
}

// ============================================
// EXPORT (Diğer dosyalarda kullanmak için)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BASE_URL,
        getPath,
        getSoundPath,
        getImagePath,
        getCSSPath,
        getJSPath
    };
}

