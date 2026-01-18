# Google AdSense Entegrasyon Rehberi

## ✅ KURULUM TAMAMLANDI!

AdSense reklamları başarıyla entegre edildi:
- **Publisher ID:** ca-pub-6460012519509265
- **Ad Slot:** 8154014030
- **Reklam Boyutu:** 300x600 (Half Page)

## 📢 Reklam Alanları

Blog detay sayfasında 2 reklam alanı bulunmaktadır:

### 1. Sol Dikey Reklam (Desktop)
- **Boyut:** 300x600 (Half Page)
- **Konum:** Blog içeriğinin solunda
- **Görünürlük:** Desktop (>1200px)
- **Ad Slot:** 8154014030

### 2. Sağ Dikey Reklam (Desktop/Tablet)
- **Boyut:** 300x600 (Half Page) / 160x600 (Tablet)
- **Konum:** Blog içeriğinin sağında
- **Görünürlük:** Desktop ve Tablet (>992px)
- **Ad Slot:** 8154014030

### 3. Responsive Davranış
- **Desktop (>1200px):** Sol (300x600) + Sağ (300x600) reklam görünür
- **Tablet (992px-1200px):** Sadece sağ reklam (160x600) görünür
- **Mobil (<992px):** Reklamlar gizlenir (kullanıcı deneyimi için)

## ✅ Kurulum Durumu

### Tamamlanan Adımlar:
- ✅ AdSense script eklendi (`<head>` bölümünde)
- ✅ Sol reklam alanı aktif (300x600)
- ✅ Sağ reklam alanı aktif (300x600)
- ✅ Responsive tasarım yapılandırıldı
- ✅ Sticky positioning aktif

### Mevcut Kod:
```html
<!-- HEAD bölümünde -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6460012519509265"
     crossorigin="anonymous"></script>

<!-- Sol Reklam -->
<aside class="ad-left">
    <ins class="adsbygoogle"
         style="display:inline-block;width:300px;height:600px"
         data-ad-client="ca-pub-6460012519509265"
         data-ad-slot="8154014030"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</aside>

<!-- Sağ Reklam -->
<aside class="ad-right">
    <ins class="adsbygoogle"
         style="display:inline-block;width:300px;height:600px"
         data-ad-client="ca-pub-6460012519509265"
         data-ad-slot="8154014030"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</aside>
```

## 🔄 Farklı Ad Slot Kullanmak İsterseniz

Eğer sol ve sağ reklamlar için farklı ad slot'lar oluşturmak isterseniz:

1. AdSense panelinde 2 ayrı reklam birimi oluşturun
2. `blog-detail.html` dosyasında `data-ad-slot` değerlerini güncelleyin:

```html
<!-- Sol Reklam -->
data-ad-slot="SOL_REKLAM_SLOT_ID"

<!-- Sağ Reklam -->
data-ad-slot="SAG_REKLAM_SLOT_ID"
```

## 🎨 Özelleştirme

### Mevcut Reklam Boyutu
- **Desktop:** 300x600 (Half Page) - Daha fazla gelir potansiyeli
- **Tablet:** 160x600 (Wide Skyscraper) - Responsive
- **Mobil:** Gizli - Kullanıcı deneyimi için

### Reklam Boyutunu Değiştirmek İsterseniz

`blogs/blog-detail.css` dosyasında:

```css
.ad-left,
.ad-right {
    width: 300px;  /* Mevcut: 300px */
    min-width: 300px;
}
```

`blogs/blog-detail.html` dosyasında:

```html
<ins class="adsbygoogle"
     style="display:inline-block;width:300px;height:600px"  <!-- Boyutu değiştir -->
     data-ad-client="ca-pub-6460012519509265"
     data-ad-slot="8154014030"></ins>
```

### Reklam Konumunu Ayarlama

```css
.ad-left,
.ad-right {
    top: 120px;  /* Üstten mesafeyi ayarla */
}
```

### Google AdSense Desteklenen Boyutlar

Dikey reklamlar için:
- **120x600** - Skyscraper (Küçük)
- **160x600** - Wide Skyscraper (Orta)
- **300x600** - Half Page (Büyük - Mevcut) ✅
- **300x1050** - Portrait (Çok Büyük)

## 💡 İpuçları

1. **Test Modu:** AdSense onaylanmadan önce test reklamları gösterilir
2. **Reklam Politikaları:** Google AdSense politikalarına uyun
3. **Sayfa Hızı:** Reklamlar asenkron yüklenir, sayfa hızını etkilemez
4. **Responsive:** Mobilde reklamlar otomatik gizlenir
5. **Sticky Position:** Reklamlar scroll sırasında sabit kalır

## 🔍 Alternatif Reklam Ağları

AdSense dışında kullanabileceğiniz alternatifler:

- **Media.net** - Yahoo/Bing reklam ağı
- **PropellerAds** - Pop-under ve display reklamlar
- **Ezoic** - AI tabanlı reklam optimizasyonu
- **AdThrive** - Premium reklam ağı (yüksek trafik gerekli)
- **Mediavine** - Premium reklam ağı (50k+ session gerekli)

## 📊 Performans Takibi

AdSense panelinde şunları takip edin:
- **CTR (Click-Through Rate):** Tıklama oranı
- **CPC (Cost Per Click):** Tıklama başına kazanç
- **RPM (Revenue Per Mille):** 1000 gösterim başına kazanç
- **Viewability:** Reklamların görünürlük oranı

## ⚠️ Önemli Notlar

1. ✅ **Reklamlar Aktif:** Placeholder'lar kaldırıldı, gerçek AdSense kodları eklendi
2. ✅ **Test Edildi:** Yerel ortamda yapı test edildi
3. ⚠️ **Canlı Test:** GitHub Pages'e push ettikten sonra canlıda test edin
4. ⚠️ **AdSense Onayı:** AdSense hesabınız onaylanana kadar test reklamları görünür
5. ✅ **Mobil Optimizasyon:** Mobilde reklamlar gizli (kullanıcı deneyimi için)
6. ✅ **Kullanıcı Deneyimi:** Sadece 2 reklam, içeriği engellemiyor

## 🎯 Canlıya Alma Checklist

- [x] AdSense hesabı oluşturuldu (ca-pub-6460012519509265)
- [x] Reklam birimleri oluşturuldu (Slot: 8154014030)
- [x] Reklam kodları yerleştirildi (Sol + Sağ)
- [x] AdSense script eklendi (`<head>` bölümünde)
- [x] Placeholder'lar kaldırıldı (Gerçek reklamlar aktif)
- [x] Responsive tasarım yapılandırıldı
- [ ] GitHub Pages'e push edildi
- [ ] Canlıda test edildi (desktop, tablet, mobil)
- [ ] Sayfa hızı kontrol edildi
- [ ] AdSense politikalarına uygunluk kontrol edildi

## 🚀 Sonraki Adımlar

1. **GitHub'a Push Edin:**
   ```bash
   git add .
   git commit -m "AdSense reklamları eklendi (300x600)"
   git push origin main
   ```

2. **Canlıda Test Edin:**
   - https://halilgunbulak.github.io/blogs/blog-detail.html?id=blog1
   - Desktop'ta sol ve sağ reklamları kontrol edin
   - Tablet'te sadece sağ reklamı kontrol edin
   - Mobilde reklamların gizli olduğunu kontrol edin

3. **AdSense Panelinde Takip Edin:**
   - İlk reklamların görünmesi 10-30 dakika sürebilir
   - AdSense hesabınız onaylanana kadar test reklamları görünür
   - Onaylandıktan sonra gerçek reklamlar gösterilir

4. **Performans İzleme:**
   - AdSense panelinde günlük gelir takibi
   - CTR (Click-Through Rate) oranını izleyin
   - RPM (Revenue Per Mille) değerini takip edin

---

**Not:**
- ✅ Yerel geliştirmede (localhost) AdSense reklamları gösterilmez - Bu normaldir!
- ✅ Canlı ortamda (GitHub Pages) reklamlar görünecektir
- ⚠️ AdSense onayı 1-2 hafta sürebilir
- ⚠️ Onay sürecinde test reklamları gösterilir

