# 🔊 Ses Dosyaları

Bu klasörde oyun için gerekli ses dosyaları bulunmalıdır.

## Gerekli Dosyalar

### 1. **typing.wav** - Klavye Yazma Sesi
- **Açıklama**: Her harf yazıldığında çalacak klavye tuş sesi
- **Süre**: 0.1-0.2 saniye
- **Format**: WAV veya MP3
- **Önerilen Kaynak**:
  - https://freesound.org/ (arama: "keyboard typing")
  - https://mixkit.co/free-sound-effects/keyboard/
  - Kendi kaydınız (klavye tuşuna basma sesi)

### 2. **hit.wav** - Vuruş Sesi (YENİ!)
- **Açıklama**: Mermi meteora çarptığında çalacak impact sesi
- **Süre**: 0.05-0.1 saniye (çok kısa)
- **Format**: WAV veya MP3
- **Özellikler**: Keskin, metalik, vuruş hissi veren
- **Önerilen Kaynak**:
  - https://freesound.org/ (arama: "impact hit metal")
  - https://mixkit.co/free-sound-effects/impact/
  - Alternatif aramalar: "punch hit", "laser hit", "bullet impact"

### 3. **explosion.wav** - Patlama Sesi
- **Açıklama**: Meteor yok edildiğinde çalacak patlama sesi
- **Süre**: 0.3-0.5 saniye
- **Format**: WAV veya MP3
- **Önerilen Kaynak**:
  - https://freesound.org/ (arama: "explosion")
  - https://mixkit.co/free-sound-effects/explosion/

### 4. **shoot.wav** - Atış Sesi (Eski - artık kullanılmıyor)
- **Not**: typing.wav ile değiştirildi, ama yedek olarak tutulabilir

### 5. **background.mp3** - Arka Plan Müziği
- **Açıklama**: Oyun sırasında sürekli çalacak arka plan müziği
- **Süre**: 1-3 dakika (loop olacak)
- **Format**: MP3 (daha küçük dosya boyutu için)
- **Özellikler**: 
  - Elektronik/Space tema
  - Hızlı tempo
  - Loop edilebilir (başı ve sonu uyumlu)
- **Önerilen Kaynak**:
  - https://freesound.org/ (arama: "space music loop")
  - https://incompetech.com/ (Royalty-free music)
  - https://www.bensound.com/ (Creative Commons)
  - https://pixabay.com/music/

## 📥 Nasıl İndirilir?

### Freesound.org'dan:
1. https://freesound.org/ adresine gidin
2. Ücretsiz hesap oluşturun
3. Arama yapın (örn: "keyboard typing")
4. Beğendiğiniz sesi indirin
5. `sounds/` klasörüne kopyalayın

### Mixkit'ten:
1. https://mixkit.co/free-sound-effects/ adresine gidin
2. Kategori seçin (Keyboard, Explosion, vb.)
3. İndirin (hesap gerekmez)
4. `sounds/` klasörüne kopyalayın

## 🎵 Önerilen Sesler

### Klavye Sesi:
- Kısa, keskin tuş sesi
- Mekanik klavye sesi tercih edilir
- Çok yüksek olmamalı (volume: 0.4)

### Vuruş Sesi (YENİ!):
- Çok kısa, keskin impact sesi
- Metalik veya lazer vuruş sesi
- Vuruş hissi vermeli
- Volume: 0.5

### Patlama Sesi:
- Orta şiddette patlama
- Çok uzun olmamalı
- Bas ağırlıklı

### Arka Plan Müziği:
- Elektronik/Synthwave tarzı
- 120-140 BPM
- Loop edilebilir
- Çok yoğun olmamalı (oyunu baskılamamalı)

## 🔧 Alternatif: Ses Dosyası Yoksa

Eğer ses dosyalarını bulamazsanız, oyun fallback olarak Web Audio API ile sentetik sesler üretir. Ancak gerçek ses dosyaları çok daha iyi bir deneyim sunar.

## 📝 Lisans Notu

İndirdiğiniz ses dosyalarının lisansını kontrol edin:
- ✅ Creative Commons (CC0, CC-BY)
- ✅ Royalty-free
- ✅ Public Domain
- ❌ Telif hakkı korumalı sesler kullanmayın

## 🎮 Test

Ses dosyalarını ekledikten sonra:
1. Oyunu başlatın
2. Bir harf yazın → Klavye sesi duyulmalı
3. Mermi meteora çarpsın → Vuruş sesi duyulmalı (YENİ!)
4. Bir kelimeyi tamamlayın → Patlama sesi duyulmalı
5. Arka plan müziği otomatik başlamalı

## 📂 Dosya Yapısı

```
sounds/
├── typing.wav          (Gerekli)
├── hit.wav            (Gerekli - YENİ!)
├── explosion.wav       (Gerekli)
├── shoot.wav          (Opsiyonel - yedek)
├── background.mp3     (Gerekli)
└── README.md          (Bu dosya)
```

## 🔗 Hızlı Linkler

- **Freesound**: https://freesound.org/
- **Mixkit**: https://mixkit.co/free-sound-effects/
- **Incompetech**: https://incompetech.com/
- **Bensound**: https://www.bensound.com/
- **Pixabay Music**: https://pixabay.com/music/

---

**Not**: Ses dosyalarını ekledikten sonra tarayıcınızı yenileyin (Ctrl+F5 veya Cmd+Shift+R).

