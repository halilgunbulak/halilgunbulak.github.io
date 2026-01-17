# 🎯 Akıllı Kelime Hizalama Algoritması

## 🤔 Problem

### Eski Sistem (Basit Index Karşılaştırma)
```
Referans: Merhaba dünya nasılsın bugün
Kullanıcı: Merhaba nasılsın bugün

Eski Sonuç:
✓ Merhaba = Merhaba  (doğru)
✗ dünya ≠ nasılsın   (YANLIŞ! Aslında dünya atlandı)
✗ nasılsın ≠ bugün   (YANLIŞ! Aslında doğru yazılmış)
⊘ bugün eksik        (YANLIŞ! Aslında doğru yazılmış)
```

**Sorun**: Bir kelime atlandığında tüm sonraki kelimeler kayıyor ve yanlış olarak işaretleniyor!

### Yeni Sistem (Akıllı Hizalama)
```
Referans: Merhaba dünya nasılsın bugün
Kullanıcı: Merhaba nasılsın bugün

Yeni Sonuç:
✓ Merhaba = Merhaba  (doğru)
⊘ dünya atlandı      (eksik)
✓ nasılsın = nasılsın (doğru)
✓ bugün = bugün      (doğru)
```

**Çözüm**: Kelimeler akıllıca hizalanıyor, atlanmış kelimeler tespit ediliyor!

## 🧠 Algoritma: LCS (Longest Common Subsequence)

### 1. Adım: DP Tablosu Oluşturma

```javascript
// Referans: [Merhaba, dünya, nasılsın, bugün]
// Kullanıcı: [Merhaba, nasılsın, bugün]

DP Tablosu:
        ""  Merhaba  nasılsın  bugün
    ""   0      0        0       0
Merhaba  0      1        1       1
dünya    0      1        1       1
nasılsın 0      1        2       2
bugün    0      1        2       3
```

### 2. Adım: Geri İzleme (Backtracking)

Tablodan geriye doğru giderek en uzun ortak alt diziyi buluyoruz:

```
(4,3) → (3,3) → (3,2) → (2,2) → (1,1) → (0,0)
  ↓       ↓       ↓       ↓       ↓
bugün  nasılsın  dünya  Merhaba  başlangıç
```

### 3. Adım: Hizalama Oluşturma

```javascript
[
  { type: 'match', refIndex: 0, userIndex: 0 },     // Merhaba
  { type: 'missing', refIndex: 1 },                 // dünya (atlandı)
  { type: 'match', refIndex: 2, userIndex: 1 },     // nasılsın
  { type: 'match', refIndex: 3, userIndex: 2 }      // bugün
]
```

## 🔍 Levenshtein Distance (Benzerlik Tespiti)

Küçük yazım hatalarını tespit etmek için kullanılır:

```javascript
// "dünya" vs "dunya"
Levenshtein Distance = 1 (ü → u değişimi)
Benzerlik = 1 - (1/5) = 0.8 = %80

// %70'den fazlaysa "benzer" kabul edilir
// Bu durumda "yanlış yazılmış" olarak işaretlenir
```

### Levenshtein Distance Hesaplama

```
    ""  d  u  n  y  a
""   0  1  2  3  4  5
d    1  0  1  2  3  4
ü    2  1  1  2  3  4
n    3  2  2  1  2  3
y    4  3  3  2  1  2
a    5  4  4  3  2  1
```

Son hücre (5,5) = 1 → Mesafe 1

## 📊 Algoritma Karmaşıklığı

### Zaman Karmaşıklığı
- **DP Tablosu**: O(m × n)
- **Geri İzleme**: O(m + n)
- **Toplam**: O(m × n)

Burada:
- m = Referans kelime sayısı
- n = Kullanıcı kelime sayısı

### Alan Karmaşıklığı
- **DP Tablosu**: O(m × n)
- **Hizalama Dizisi**: O(m + n)
- **Toplam**: O(m × n)

### Örnek Performans
```
100 kelimelik metin:
- Zaman: ~10ms
- Bellek: ~40KB

1000 kelimelik metin:
- Zaman: ~100ms
- Bellek: ~4MB
```

## 🎯 Kullanım Senaryoları

### Senaryo 1: Kelime Atlandı
```javascript
Referans: "A B C D E"
Kullanıcı: "A C D E"

Sonuç:
✓ A (doğru)
⊘ B (eksik)
✓ C (doğru)
✓ D (doğru)
✓ E (doğru)
```

### Senaryo 2: Kelime Yanlış Yazıldı
```javascript
Referans: "Merhaba dünya"
Kullanıcı: "Merhaba dunya"

Sonuç:
✓ Merhaba (doğru)
✗ dunya → dünya (yanlış, benzer)
```

### Senaryo 3: Fazladan Kelime
```javascript
Referans: "A B C"
Kullanıcı: "A X Y B C"

Sonuç:
✓ A (doğru)
+ X (fazla)
+ Y (fazla)
✓ B (doğru)
✓ C (doğru)
```

### Senaryo 4: Karmaşık
```javascript
Referans: "A B C D E F"
Kullanıcı: "A C X E F"

Sonuç:
✓ A (doğru)
⊘ B (eksik)
✓ C (doğru)
⊘ D (eksik)
+ X (fazla)
✓ E (doğru)
✓ F (doğru)
```

## 🔧 Kod Yapısı

### Ana Fonksiyonlar

#### 1. `compare(referenceText, userText)`
Ana karşılaştırma fonksiyonu. Metinleri tokenize eder, ayarları uygular ve hizalama yapar.

#### 2. `alignWords(refWords, userWords)`
LCS algoritması ile kelimeleri hizalar. DP tablosu oluşturur ve geri izleme yapar.

#### 3. `isSimilar(word1, word2)`
İki kelimenin benzer olup olmadığını kontrol eder. Levenshtein mesafesi kullanır.

#### 4. `levenshteinDistance(str1, str2)`
İki string arasındaki Levenshtein mesafesini hesaplar.

## 📈 Avantajlar

### ✅ Doğruluk
- Atlanmış kelimeler doğru tespit edilir
- Sonraki kelimeler kaymaz
- Küçük yazım hataları tolere edilir

### ✅ Performans
- O(m × n) karmaşıklık (kabul edilebilir)
- 100 kelimelik metin için ~10ms
- Gerçek zamanlı kullanıma uygun

### ✅ Esneklik
- Büyük/küçük harf duyarlılığı ayarlanabilir
- Noktalama işaretleri yoksayılabilir
- Benzerlik eşiği ayarlanabilir (%70)

## 🚀 Gelecek İyileştirmeler

### 1. Optimizasyon
- **Space Optimization**: DP tablosunu 2 satıra indirgeme
- **Early Termination**: Çok farklı metinlerde erken çıkış
- **Caching**: Sık kullanılan kelimeleri önbellekleme

### 2. Gelişmiş Özellikler
- **Phonetic Matching**: Sesli harf benzerliği (ü ↔ u)
- **Turkish-Specific**: Türkçe'ye özel kurallar (ı ↔ i)
- **Context Awareness**: Bağlam duyarlı düzeltme

### 3. Görselleştirme
- **Diff View**: Git-style diff görünümü
- **Heatmap**: Hata yoğunluğu haritası
- **Animation**: Hizalama animasyonu

## 📚 Kaynaklar

### Algoritmalar
- [Longest Common Subsequence (LCS)](https://en.wikipedia.org/wiki/Longest_common_subsequence_problem)
- [Levenshtein Distance](https://en.wikipedia.org/wiki/Levenshtein_distance)
- [Dynamic Programming](https://en.wikipedia.org/wiki/Dynamic_programming)

### Benzer Uygulamalar
- Git Diff Algorithm
- Spell Checkers
- Plagiarism Detection
- DNA Sequence Alignment

## 🎉 Sonuç

Akıllı hizalama algoritması sayesinde:
- ✅ Kelime atlandığında sonraki kelimeler kaymıyor
- ✅ Küçük yazım hataları tolere ediliyor
- ✅ Detaylı ve doğru analiz yapılıyor
- ✅ Kullanıcı deneyimi iyileştiriliyor

---

**Demo**: `alignment_demo.html` dosyasını açarak algoritmanın çalışmasını görsel olarak inceleyebilirsiniz!

