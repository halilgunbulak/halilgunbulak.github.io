# 🔒 Kod Koruma Rehberi

Bu dosya, oyununuzun kodlarını korumak için uygulayabileceğiniz yöntemleri açıklar.

## ⚠️ ÖNEMLİ NOT
**Tarayıcıda çalışan hiçbir kod %100 güvenli değildir!** Ancak bu yöntemler kopyalamayı zorlaştırır ve amatör kullanıcıları engeller.

---

## 🛡️ Uygulanmış Korumalar

### 1. ✅ Temel Korumalar (protection.js)
- ✅ Sağ tık engelleme
- ✅ Kopyalama engelleme (Ctrl+C)
- ✅ Kesme engelleme (Ctrl+X)
- ✅ Metin seçimi engelleme
- ✅ F12 ve DevTools kısayolları engelleme
- ✅ DevTools açık mı kontrolü
- ✅ Konsol temizleme
- ✅ Sayfa kaynağını görüntüleme engelleme (Ctrl+U)
- ✅ Sürükleme engelleme

### 2. ✅ CSS Korumaları (style.css)
- ✅ `user-select: none` - Metin seçimi engelleme
- ✅ `user-drag: none` - Sürükleme engelleme
- ✅ Input alanlarında seçime izin verme

---

## 🚀 İleri Seviye Korumalar (Opsiyonel)

### 3. JavaScript Obfuscation (Karıştırma)

#### Online Araçlar:
1. **JavaScript Obfuscator** (Önerilen)
   - URL: https://obfuscator.io/
   - Ayarlar:
     ```
     ✅ Compact Code
     ✅ Control Flow Flattening
     ✅ Dead Code Injection
     ✅ Debug Protection
     ✅ Disable Console Output
     ✅ String Array Encoding: Base64
     ✅ Split Strings
     ✅ Rename Variables
     ```

2. **JScrambler** (Profesyonel - Ücretli)
   - URL: https://jscrambler.com/
   - En güçlü koruma
   - Aylık ücretli

#### Kullanım:
```bash
# 1. game.js dosyanızı obfuscator.io'ya yükleyin
# 2. Ayarları yapın
# 3. Obfuscate edin
# 4. İndirin ve game.js'in yerine koyun
```

### 4. Kod Minification (Küçültme)

#### Online Araçlar:
- **Terser**: https://try.terser.org/
- **UglifyJS**: https://skalman.github.io/UglifyJS-online/

#### NPM ile:
```bash
npm install -g terser
terser game.js -o game.min.js -c -m
```

### 5. Dosya İsimlendirme
Dosya isimlerini karmaşık yapın:
```
game.js → a7f3d9e2.js
missions_tr.js → b4c8f1a6.js
protection.js → c9e2d5f7.js
```

### 6. Domain Kilitleme
Kodunuzu sadece kendi domain'inizde çalışacak şekilde kilitleyin:

```javascript
// protection.js'e ekleyin
(function() {
    const allowedDomains = ['yourdomain.com', 'www.yourdomain.com'];
    const currentDomain = window.location.hostname;
    
    if (!allowedDomains.includes(currentDomain) && currentDomain !== 'localhost') {
        document.body.innerHTML = '<h1>Unauthorized Domain</h1>';
        throw new Error('Domain not authorized');
    }
})();
```

### 7. API Key Gizleme
Eğer API kullanıyorsanız, backend üzerinden proxy yapın:
```
Frontend → Your Backend → External API
```

### 8. Watermark Ekleme
Kodunuza dijital imza ekleyin:
```javascript
// game.js'in başına
/*! 
 * ZType Clone Game
 * Copyright (c) 2024 Your Name
 * Licensed under proprietary license
 * Unauthorized copying is prohibited
 */
```

---

## 📦 Tam Koruma Paketi (Adım Adım)

### Adım 1: Mevcut Korumalar
✅ Zaten uygulandı (protection.js + CSS)

### Adım 2: JavaScript Obfuscation
```bash
1. https://obfuscator.io/ adresine gidin
2. game.js içeriğini yapıştırın
3. Ayarları yapın (yukarıdaki önerilere göre)
4. "Obfuscate" butonuna tıklayın
5. Sonucu indirin ve game.js'in yerine koyun
```

### Adım 3: Dosya İsimlerini Değiştirin
```bash
# Eski isimler
game.js
missions_tr.js
missions_en.js
protection.js

# Yeni isimler (örnek)
a7f3d9e2.js
b4c8f1a6.js
c9e2d5f7.js
d1a3b5c7.js

# index.html'de script tag'lerini güncelleyin
```

### Adım 4: Domain Kilidi Ekleyin
protection.js'e domain kontrolü ekleyin (yukarıdaki örneğe bakın)

### Adım 5: Meta Tags Ekleyin
```html
<!-- index.html <head> içine -->
<meta name="robots" content="noindex, nofollow">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="pragma" content="no-cache">
```

---

## 🎯 Koruma Seviyeleri

### Seviye 1: Temel (Mevcut)
- ✅ protection.js
- ✅ CSS korumaları
- **Engellediği**: Amatör kullanıcılar, sağ tık kopyalama

### Seviye 2: Orta
- ✅ Seviye 1
- ✅ JavaScript Obfuscation
- ✅ Minification
- **Engellediği**: Orta seviye geliştiriciler

### Seviye 3: İleri
- ✅ Seviye 2
- ✅ Domain kilidi
- ✅ Dosya ismi karmaşıklaştırma
- ✅ Backend proxy
- **Engellediği**: İleri seviye geliştiriciler (ama yine de %100 değil)

---

## ⚡ Hızlı Başlangıç

Şu anda **Seviye 1** koruması aktif. Daha fazla koruma için:

1. **Obfuscation için**: https://obfuscator.io/
2. **Domain kilidi için**: protection.js'i düzenleyin
3. **Profesyonel koruma için**: JScrambler kullanın

---

## 📝 Notlar

- DevTools koruması agresif olabilir, test ederken dikkatli olun
- Obfuscation sonrası kodunuzu yedekleyin
- Her güncelleme sonrası tekrar obfuscate etmeniz gerekir
- Performans kaybı olabilir (özellikle obfuscation ile)

---

## 🔗 Faydalı Linkler

- JavaScript Obfuscator: https://obfuscator.io/
- Terser (Minifier): https://terser.org/
- JScrambler: https://jscrambler.com/
- Webpack (Build tool): https://webpack.js.org/

---

**Son Güncelleme**: 2024
**Lisans**: Proprietary

