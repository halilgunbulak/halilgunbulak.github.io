# 📝 Metin Yazma Uygulaması

Katip adayları ve yazma becerilerini geliştirmek isteyenler için profesyonel metin yazma uygulaması.

## 🎯 Özellikler

- ✍️ **180 Saniyelik Yazma Oturumları**: Verilen metni 3 dakika içinde yazın
- 📊 **Detaylı Analiz**: Doğru/yanlış kelime sayısı, hata oranı, yazma hızı
- 💾 **Yanlış Kelime Havuzu**: Yanlış yazdığınız kelimeleri saklayın ve pratik yapın
- 🎨 **Minimal Tasarım**: Beyaz tonlu, sade, odaklanmış arayüz
- 📱 **Responsive**: Masaüstü, tablet ve mobil uyumlu
- 🚫 **Kopyala-Yapıştır Engelleme**: Gerçek yazma pratiği için

## 📁 Dosya Yapısı

```
klavyecalis/
├── index.html          # Ana HTML dosyası
├── style.css           # Minimal CSS stilleri
├── app.js              # Ana uygulama mantığı
├── comparator.js       # Metin karşılaştırma modülü
├── mistakePool.js      # Yanlış kelime havuzu yönetimi
├── timer.js            # Geri sayım sayacı
├── missions_tr.js      # Türkçe metinler
├── config.js           # Yapılandırma
└── protection.js       # Koruma katmanı
```

## 🚀 Kullanım

### 1. Ana Menü
- Dropdown'dan bir metin seçin
- İsterseniz ayarları değiştirin:
  - ✓ Noktalama işaretlerini yoksay (varsayılan: açık)
  - ✓ Büyük/küçük harf duyarlı (varsayılan: kapalı)
- **BAŞLAT** butonuna tıklayın

### 2. Geri Sayım
- 3-2-1 geri sayımı
- Otomatik olarak yazma ekranına geçer

### 3. Yazma Ekranı
- **Üst panel**: Referans metin (salt okunur)
- **Alt panel**: Yazma alanı
- **Sağ üst**: Kalan süre (son 30 saniyede kırmızı)
- 180 saniye içinde metni yazın
- ESC tuşu ile çıkış (onay gerektirir)

### 4. Sonuç Ekranı
Detaylı rapor:
- ✓ Doğru kelime sayısı
- ✗ Yanlış kelime sayısı
- Σ Toplam kelime sayısı
- % Hata oranı
- ⏱ Geçen süre
- ⚡ Yazma hızı (kelime/dakika)
- Yanlış yazılan kelimelerin listesi

**Seçenekler:**
- **YANLIŞ KELİMELERİ HAVUZDA SAKLA**: LocalStorage'a kaydet
- **BU YANLIŞ KELİMELERİ ŞİMDİ YAZ**: Hemen pratik yap
- **ANA MENÜYE DÖN**: Menüye geri dön

### 5. Yanlış Kelime Havuzu
- Ana menüden **YANLIŞ KELİME HAVUZU** butonuna tıklayın
- Havuzdaki tüm kelimeleri görün
- İstatistikler: Toplam kelime, toplam hata, oturum sayısı
- **HAVUZDAKİ KELİMELERİ YAZ**: Tüm kelimelerle pratik yap
- **HAVUZU TEMİZLE**: Tüm kelimeleri sil

## 🔧 Teknik Detaylar

### State Yönetimi
```javascript
{
  currentScreen: 'menu' | 'countdown' | 'writing' | 'result' | 'pool',
  selectedText: { header, body },
  userInput: string,
  results: { stats, wpm, ... },
  settings: { caseSensitive, ignorePunctuation }
}
```

### Metin Karşılaştırma Algoritması
1. Metinleri kelimelere ayır (tokenize)
2. Ayarları uygula (büyük/küçük harf, noktalama)
3. Kelime kelime karşılaştır
4. Doğru, yanlış, eksik, fazla kelimeleri tespit et
5. İstatistikleri hesapla

### LocalStorage Yapısı
```javascript
{
  version: '1.0',
  lastUpdated: ISO timestamp,
  totalSessions: number,
  words: [
    {
      word: string,
      incorrectAttempts: [{ typed, timestamp }],
      frequency: number,
      lastMistake: ISO timestamp
    }
  ]
}
```

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Primary**: #333333 (Koyu gri)
- **Secondary**: #666666 (Orta gri)
- **Background**: #FFFFFF (Beyaz)
- **Surface**: #F5F5F5 (Açık gri)
- **Success**: #4CAF50 (Yeşil)
- **Error**: #F44336 (Kırmızı)

### Typography
- **Font Family**: Inter, Roboto, sans-serif
- **Mono Font**: Roboto Mono, Courier New, monospace
- **Font Sizes**: 14px - 48px

## 📱 Responsive Breakpoints
- Desktop: > 1024px
- Tablet: 768px - 1024px
- Mobile: < 768px

## 🔒 Güvenlik
- Kopyala-yapıştır engelleme
- LocalStorage veri doğrulama
- XSS koruması (innerHTML yerine textContent)

## 🚧 Geliştirme Notları

### Yeni Metin Ekleme
`missions_tr.js` dosyasına yeni metin ekleyin:
```javascript
{ 
  "header": "Metin Başlığı", 
  "body": "Metin içeriği..." 
}
```

### Süre Değiştirme
`app.js` içinde Timer süresi:
```javascript
this.timer = new Timer(180); // 180 saniye = 3 dakika
```

## 📄 Lisans
© 2026 MH Games - Tüm hakları saklıdır.

## 🤝 Destek
Web: https://mhgames.com.tr

