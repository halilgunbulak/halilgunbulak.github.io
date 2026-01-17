# 🚀 Hosting Kurulum Rehberi

Bu dosya, MType Games uygulamasını hosting'e yüklerken yapılması gerekenleri açıklar.

---

## 📁 Dosya Yapısı

```
public_html/
└── mtype/
    ├── index.html
    ├── config.js
    ├── game.js
    ├── style.css
    ├── protection.js
    ├── missions_tr.js
    ├── missions_en.js
    ├── sounds/
    │   ├── typing_temp.wav
    │   ├── explosion.wav
    │   ├── shoot.wav
    │   └── background.mp3
    └── images/
        └── (görsel dosyaları)
```

---

## ⚙️ Kurulum Adımları

### 1️⃣ Lokal Test (Bilgisayarınızda)

**index.html** dosyasını açın ve **satır 11**'i bulun:

```javascript
const BASE_URL = ''; // ✅ Lokal test için BOŞ bırakın
```

Bu şekilde bırakın ve tarayıcıda açın. Her şey çalışmalı.

---

### 2️⃣ Hosting'e Yükleme

#### Adım 1: Dosyaları Yükleyin
Tüm dosyaları hosting'inizin `public_html/mtype/` klasörüne yükleyin.

#### Adım 2: BASE_URL'i Ayarlayın
**index.html** dosyasını açın ve **satır 11**'i düzenleyin:

```javascript
// ÖNCE (Lokal):
const BASE_URL = '';

// SONRA (Hosting):
const BASE_URL = 'public_html/mtype/';
```

veya

```javascript
const BASE_URL = '/mtype/'; // Eğer root'tan erişiyorsanız
```

#### Adım 3: Test Edin
Tarayıcıda sitenizi açın:
```
https://siteniz.com/mtype/
```

---

## 🔧 Farklı Hosting Senaryoları

### Senaryo 1: Root Klasörde
```
public_html/
├── index.html
├── game.js
├── sounds/
└── ...
```

**Ayar:**
```javascript
const BASE_URL = '';
```

---

### Senaryo 2: Alt Klasörde (mtype/)
```
public_html/
└── mtype/
    ├── index.html
    ├── game.js
    └── ...
```

**Ayar:**
```javascript
const BASE_URL = '/mtype/';
```

---

### Senaryo 3: Derin Klasör Yapısı
```
public_html/
└── games/
    └── mtype/
        ├── index.html
        └── ...
```

**Ayar:**
```javascript
const BASE_URL = '/games/mtype/';
```

---

## 🐛 Sorun Giderme

### Problem: CSS yüklenmiyor
**Çözüm:** BASE_URL'in sonunda `/` olduğundan emin olun:
```javascript
const BASE_URL = 'public_html/mtype/'; // ✅ Doğru
const BASE_URL = 'public_html/mtype';  // ❌ Yanlış
```

### Problem: Sesler çalmıyor
**Çözüm:** 
1. `sounds/` klasörünün doğru yerde olduğunu kontrol edin
2. Tarayıcı konsolunu açın (F12) ve hata mesajlarını kontrol edin
3. BASE_URL'in doğru olduğundan emin olun

### Problem: 404 Hatası
**Çözüm:**
1. Dosya yollarını kontrol edin
2. BASE_URL'i kontrol edin
3. Hosting'de dosya izinlerini kontrol edin (644 veya 755)

---

## 📝 Hızlı Kontrol Listesi

- [ ] Tüm dosyalar yüklendi mi?
- [ ] `sounds/` klasörü var mı?
- [ ] `images/` klasörü var mı?
- [ ] `index.html` içinde BASE_URL ayarlandı mı?
- [ ] BASE_URL'in sonunda `/` var mı?
- [ ] Tarayıcıda test edildi mi?

---

## 💡 İpuçları

1. **Lokal test yaparken:** BASE_URL'i boş bırakın (`''`)
2. **Hosting'e yüklerken:** BASE_URL'i ayarlayın
3. **Her değişiklikten sonra:** Tarayıcı önbelleğini temizleyin (Ctrl+F5)
4. **Hata varsa:** Tarayıcı konsolunu kontrol edin (F12)

---

## 📢 Google AdSense Reklamları

### Otomatik Ortam Algılama
Reklamlar **otomatik olarak** sadece canlı ortamda gösterilir:

✅ **Canlı Ortam (Reklamlar Gösterilir):**
- `https://siteniz.com`
- `http://siteniz.com`
- Herhangi bir domain

❌ **Lokal Ortam (Reklamlar Gösterilmez):**
- `localhost`
- `127.0.0.1`
- `192.168.x.x` (LAN IP'leri)
- `file:///` (Dosya protokolü)

### Lokal Test'te Ne Görünür?
Lokal ortamda reklamlar yerine placeholder gösterilir:
```
📢 REKLAM ALANI
(Sadece canlı ortamda görünür)
```

### Reklam Ayarları
Reklamlar `index.html` dosyasında tanımlıdır:
- **Sol Reklam:** `data-ad-slot="5563779212"`
- **Sağ Reklam:** `data-ad-slot="2230861258"`
- **Publisher ID:** `ca-pub-6460012519509265`

### Reklam Değiştirme
Farklı reklam kodları kullanmak için `index.html` dosyasında ilgili bölümleri düzenleyin.

---

## 🎯 Örnek Kullanım

### Lokal Test:
```javascript
const BASE_URL = '';
```
Erişim: `file:///C:/Users/.../mtype/index.html`

### Hosting (Alt Klasör):
```javascript
const BASE_URL = '/mtype/';
```
Erişim: `https://siteniz.com/mtype/`

### Hosting (Root):
```javascript
const BASE_URL = '';
```
Erişim: `https://siteniz.com/`

---

## 📞 Destek

Sorun yaşarsanız:
1. Tarayıcı konsolunu kontrol edin (F12)
2. BASE_URL ayarını kontrol edin
3. Dosya yollarını kontrol edin

---

**Başarılar! 🎮✨**

