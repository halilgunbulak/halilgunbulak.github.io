# Blog Sistemi Kullanım Kılavuzu

## 📝 Yeni Blog Ekleme

### 1. Adım: Blog Kartı Oluşturma (Ana Sayfa)

`blogs/blogs.json` dosyasına yeni blog kartı ekleyin:

```json
{
    "id": 4,
    "blogId": "blog4",
    "title": "Blog Başlığı",
    "description": "Kısa açıklama (1-2 cümle)",
    "date": "2024-01-20",
    "image": "images/resim.jpg",
    "tags": ["etiket1", "etiket2", "etiket3"]
}
```

### 2. Adım: Blog İçeriği Oluşturma (Detay Sayfası)

`blogs/blog-contents.json` dosyasına blog içeriğini ekleyin:

```json
"blog4": {
    "title": "Blog Başlığı",
    "date": "2024-01-20",
    "author": "Halil İbrahim GÜNBULAK",
    "readTime": "5",
    "tags": ["etiket1", "etiket2"],
    "content": [
        {
            "text": "Giriş paragrafı buraya..."
        },
        {
            "header": "Ana Başlık"
        },
        {
            "image": "images/resim.jpg",
            "image_caption": "Resim açıklaması (opsiyonel)"
        },
        {
            "small_header": "Alt Başlık"
        },
        {
            "text": "Paragraf metni..."
        },
        {
            "quote": "Alıntı metni"
        },
        {
            "list": ["Madde 1", "Madde 2", "Madde 3"]
        }
    ]
}
```

## 📦 İçerik Blok Tipleri

Blog içeriğinde kullanabileceğiniz tüm blok tipleri:

### `text` - Paragraf
```json
{ "text": "Paragraf metni buraya..." }
```

### `header` - Ana Başlık
```json
{ "header": "Ana Başlık" }
```

### `small_header` - Alt Başlık
```json
{ "small_header": "Alt Başlık" }
```

### `image` - Resim
```json
{
    "image": "images/resim.jpg",
    "image_alt": "Alternatif metin (opsiyonel)",
    "image_caption": "Resim açıklaması (opsiyonel)"
}
```

### `quote` - Alıntı
```json
{ "quote": "Alıntı metni buraya..." }
```

### `list` - Liste
```json
{ "list": ["Madde 1", "Madde 2", "Madde 3"] }
```

### `code` - Kod Bloğu
```json
{ "code": "const x = 10;\nconsole.log(x);" }
```

### `video` - Video (YouTube/Vimeo)
```json
{ "video": "https://www.youtube.com/embed/VIDEO_ID" }
```

## 🎨 Özellikler

- ✅ Dinamik blog yükleme sistemi
- ✅ **Grid Layout: 4 satır x 2 kolon** (30-40 blog için optimize)
- ✅ **Yatay kaydırma** ile sonsuz blog görüntüleme
- ✅ Önceki/Sonraki butonları ile kolay navigasyon
- ✅ Esnek içerik blokları (text, image, quote, list, code, video)
- ✅ Tarihe göre otomatik sıralama
- ✅ Responsive tasarım
- ✅ Ayrı detay sayfası
- ✅ Etiket sistemi
- ✅ Okuma süresi gösterimi
- ✅ Animasyonlu içerik yükleme
- ✅ Mobil uyumlu
- ✅ Özel scrollbar tasarımı

## 📂 Dosya Yapısı

```
blogs/
├── blogs.json           # Ana sayfa blog kartları
├── blog-contents.json   # Detaylı blog içerikleri
├── blog.css            # Ana sayfa stilleri
├── blog.js             # Ana sayfa JavaScript
├── blog-detail.html    # Blog detay sayfası
├── blog-detail.css     # Detay sayfası stilleri
├── blog-detail.js      # Detay sayfası JavaScript
└── README.md           # Bu dosya
```

## 🔧 Özelleştirme

### Renkleri Değiştirme
`blogs/blog.css` ve `blogs/blog-detail.css` dosyalarında `crimson` rengini değiştirerek tema rengini özelleştirebilirsiniz.

### Grid Düzeni Değiştirme
`blogs/blog.css` dosyasında `.blogs-grid` sınıfını düzenleyin:
```css
.blogs-grid {
    grid-template-columns: repeat(2, 1fr);  /* Kolon sayısı */
    grid-template-rows: repeat(4, auto);    /* Satır sayısı */
    gap: 30px;                              /* Kartlar arası boşluk */
}
```

### Scroll Hızı Ayarlama
`blogs/blog.js` dosyasında `scrollBlogsLeft()` ve `scrollBlogsRight()` fonksiyonlarında:
```javascript
const scrollAmount = container.clientWidth * 0.8; // 0.8 değerini değiştirin (0.5 - 1.0 arası)
```

## 💡 İpuçları

1. **Blog resimlerini** `images/` klasörüne ekleyin
2. **Tarih formatı:** `YYYY-MM-DD` (örn: 2024-01-20)
3. **Benzersiz ID'ler:** Her blog için farklı `id` ve `blogId` kullanın
4. **Etiketler:** Küçük harfle ve kısa tutun
5. **İçerik sırası:** `content` dizisindeki bloklar yukarıdan aşağıya sırayla gösterilir
6. **Esneklik:** İstediğiniz kadar blok ekleyebilir, sırasını değiştirebilirsiniz
7. **Resim boyutları:** Yüksek çözünürlüklü resimler kullanın (min 1200px genişlik)
8. **Grid düzeni:** 4 satır x 2 kolon = 8 blog görünür, sağa kaydırarak diğerlerini görebilirsiniz
9. **Çok sayıda blog:** 30-40 blog ekleyebilirsiniz, sistem otomatik olarak yatay kaydırma ekler
10. **CORS hatası:** Yerel geliştirmede `python3 -m http.server 8000` ile sunucu başlatın

## 📝 Örnek Blog Ekleme

### blogs.json'a ekle:
```json
{
    "id": 4,
    "blogId": "yeni-blog",
    "title": "Yeni Blog Yazım",
    "description": "Bu benim yeni blog yazım",
    "date": "2024-01-20",
    "image": "images/yeni-resim.jpg",
    "tags": ["yeni", "blog"]
}
```

### blog-contents.json'a ekle:
```json
"yeni-blog": {
    "title": "Yeni Blog Yazım",
    "date": "2024-01-20",
    "author": "Halil İbrahim GÜNBULAK",
    "readTime": "5",
    "tags": ["yeni", "blog"],
    "content": [
        { "text": "Giriş paragrafı..." },
        { "header": "İlk Bölüm" },
        { "image": "images/resim1.jpg" },
        { "text": "Açıklama metni..." },
        { "quote": "Önemli alıntı" },
        { "list": ["Madde 1", "Madde 2"] }
    ]
}
```

Artık blogunuz hazır! 🎉

