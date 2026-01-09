# Z-Type Clone - Gelişmiş Yazma Oyunu

Bu proje, orijinal Z-Type oyunundan esinlenen, modern web teknolojileri ve gelişmiş oyun mekanikleri ile donatılmış bir klavyede hızlı yazma oyunudur.

## 🚀 Öne Çıkan Özellikler

### 1. Dinamik Zorluk Sistemi (Seviye 1-10)
- Oyun, Seviye 1'den 10'a kadar ölçeklenebilir bir zorluk sistemine sahiptir.
- **Algoritmik Hız:** Seviye arttıkça meteorların düşme hızı ve kelime gelme sıklığı matematiksel bir eğri ile artar.
- **Kademeli Hızlanma:** Her yok edilen kelime, oyun içindeki tempoyu çok hafifçe artırır (Damped per-kill acceleration).

### 2. "Space" (Boşluk) Mekaniği
- Bir kelimeyi tamamen yazdığınızda, ateş edebilmek için bir kez **Space** tuşuna basmanız gerekir.
- **İtme Etkisi (Pushback):** Space tuşuna basıldığında ekrandaki tüm meteorlar 20px yukarı itilir, bu da size zaman kazandırır.
- **Shockwave:** Space basıldığında oyuncu gemisinden çıkan mavi bir şok dalgası görseli oluşur.

### 3. Görev ve Seviye Sistemi
- **30+ Görev:** Harici `missions_tr.js` ve `missions_en.js` dosyalarından yüklenen zengin metin kütüphanesi.
- **Skor Sürekliliği:** Görevler veya seviyeler değiştikçe skorunuz sıfırlanmaz, toplam skorunuzu koruyarak ilerleyebilirsiniz.
- **Hızlı Geçiş:** Görev sonu ekranından "Sonraki Görev" veya "Sonraki Seviye" seçenekleriyle kesintisiz oyun keyfi.

### 4. Gelişmiş HUD ve Geri Bildirim
- **Canlı Göstergeler:** Skor ve Seviye bilgisi ekranın üst köşelerinde anlık olarak güncellenir.
- **+1 Level Up Animasyonu:** Seviye atladığınızda ekranın sağ üstünde yüzen animasyonlu bir bildirim görünür.
- **Sesli Bildirim:** Seviye artışlarında ve atışlarda AudioContext tabanlı özel sentezlenmiş sesler/arpejler çalar.

### 5. Duraklatma ve Menü (Pause Menu)
- Oyun sırasında `Esc` tuşuna basıldığında oyun durur.
- Pause menüsü üzerinden "Devam Et" veya "Menüye Dön" seçenekleri sunulur.

### 6. Hata İnceleme (Review Mode)
- Oyun bittiğinde, yanlış yazdığınız kelimeleri tek tek inceleyebileceğiniz özel bir mod mevcuttur.

## 🛠 Teknik Mimari

- **Motor:** Vanilla JavaScript (ES6+ Class yapısı).
- **Grafik:** HTML5 Canvas API ile 60 FPS akıcı görüntü.
- **Ses:** Web Audio API (SoundManager) - Dosya tabanlı `.wav` sesleri ve sentezlenmiş fallback bip sesleri.
- **Lokalizasyon:** Türkçe ve İngilizce tam dil desteği.
- **Varlıklar (Assets):** SVG tabanlı yüksek kaliteli meteor ve gemi görselleri.

## 🎮 Kontroller

- **Harfler:** Meteorları vurmak için kelimeleri yazın.
- **Space (Boşluk):** Kelime bittikten sonra şok dalgası yaratmak ve devam etmek için basın.
- **Esc:** Oyunu duraklat veya menüye dön.

## 📁 Proje Yapısı

- `index.html`: Oyunun ana arayüzü ve UI katmanları.
- `game.js`: Oyun mantığı, motoru ve tüm sınıflar (Meteor, Player, Projectile, etc.).
- `style.css`: Siberpunk/Neon estetiği sağlayan görsel stiller.
- `missions_tr.js` / `missions_en.js`: Görev metinlerinin bulunduğu veri dosyaları.
- `images/`: SVG varlıkları.
- `sounds/`: `.wav` ses dosyaları.

---
*Hazırlayan: Antigravity AI*
