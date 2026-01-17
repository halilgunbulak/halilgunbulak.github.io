/**
 * TextComparator - Metin Karşılaştırma Modülü
 * Referans metin ile kullanıcı metnini karşılaştırır ve detaylı analiz sağlar
 */

class TextComparator {
    constructor(settings = {}) {
        this.settings = {
            caseSensitive: settings.caseSensitive || false,
            ignorePunctuation: settings.ignorePunctuation !== false, // Default true
            ignoreNumbers: settings.ignoreNumbers || false
        };
    }

    /**
     * İki metni karşılaştırır (Akıllı Hizalama ile)
     * @param {string} referenceText - Orijinal metin
     * @param {string} userText - Kullanıcının yazdığı metin
     * @returns {Object} Karşılaştırma sonuçları ve istatistikler
     */
    compare(referenceText, userText) {
        // Tokenize - kelimelere ayır
        let refWords = this.tokenize(referenceText);
        let userWords = this.tokenize(userText);

        // Orijinal kelimeleri sakla (gösterim için)
        const originalRefWords = [...refWords];
        const originalUserWords = [...userWords];

        // Ayarları uygula (karşılaştırma için)
        if (!this.settings.caseSensitive) {
            refWords = refWords.map(w => w.toLocaleLowerCase('tr-TR'));
            userWords = userWords.map(w => w.toLocaleLowerCase('tr-TR'));
        }

        if (this.settings.ignorePunctuation) {
            refWords = refWords.map(w => this.removePunctuation(w));
            userWords = userWords.map(w => this.removePunctuation(w));
        }

        // Akıllı hizalama yap (LCS tabanlı)
        const alignment = this.alignWords(refWords, userWords);

        // Karşılaştırma yap
        const results = {
            correct: [],
            incorrect: [],
            missing: [],
            extra: []
        };

        for (const item of alignment) {
            if (item.type === 'match') {
                // Doğru kelime
                results.correct.push({
                    word: originalUserWords[item.userIndex],
                    position: item.refIndex
                });
            } else if (item.type === 'mismatch') {
                // Yanlış yazılmış kelime
                results.incorrect.push({
                    typed: originalUserWords[item.userIndex],
                    correct: originalRefWords[item.refIndex],
                    position: item.refIndex
                });
            } else if (item.type === 'missing') {
                // Atlanmış kelime
                results.missing.push({
                    word: originalRefWords[item.refIndex],
                    position: item.refIndex
                });
            } else if (item.type === 'extra') {
                // Fazladan yazılmış kelime
                results.extra.push({
                    word: originalUserWords[item.userIndex],
                    position: item.userIndex
                });
            }
        }

        // İstatistikleri hesapla
        const totalWords = refWords.length;
        const correctCount = results.correct.length;
        const incorrectCount = results.incorrect.length;
        const missingCount = results.missing.length;
        const extraCount = results.extra.length;

        // Hata oranı = Yanlış kelime sayısı / Doğru kelime sayısı * 100
        const errorRate = correctCount > 0 ? (incorrectCount / correctCount) * 100 : 0;
        const accuracy = 100 - errorRate;

        return {
            results,
            stats: {
                totalWords,
                correctCount,
                incorrectCount,
                missingCount,
                extraCount,
                errorRate: parseFloat(errorRate.toFixed(2)),
                accuracy: parseFloat(accuracy.toFixed(2))
            }
        };
    }

    /**
     * İki kelime dizisini akıllıca hizalar (LCS tabanlı)
     * Bir kelime atlandığında veya yanlış yazıldığında sonraki kelimelerin kaymasını önler
     * @param {Array} refWords - Referans kelimeler
     * @param {Array} userWords - Kullanıcı kelimeleri
     * @returns {Array} Hizalanmış kelime çiftleri
     */
    alignWords(refWords, userWords) {
        const m = refWords.length;
        const n = userWords.length;

        // LCS (Longest Common Subsequence) tablosu oluştur
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

        // DP tablosunu doldur
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (refWords[i - 1] === userWords[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        // Geri izleme (backtracking) ile hizalamayı bul
        const alignment = [];
        let i = m;
        let j = n;

        while (i > 0 || j > 0) {
            if (i > 0 && j > 0 && refWords[i - 1] === userWords[j - 1]) {
                // Eşleşme bulundu
                alignment.unshift({
                    type: 'match',
                    refIndex: i - 1,
                    userIndex: j - 1
                });
                i--;
                j--;
            } else if (i > 0 && j > 0 && this.isSimilar(refWords[i - 1], userWords[j - 1])) {
                // Benzer kelime (küçük yazım hatası)
                alignment.unshift({
                    type: 'mismatch',
                    refIndex: i - 1,
                    userIndex: j - 1
                });
                i--;
                j--;
            } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
                // Fazladan kelime (kullanıcı ekstra yazmış)
                alignment.unshift({
                    type: 'extra',
                    userIndex: j - 1
                });
                j--;
            } else if (i > 0) {
                // Eksik kelime (kullanıcı atlamış)
                alignment.unshift({
                    type: 'missing',
                    refIndex: i - 1
                });
                i--;
            }
        }

        return alignment;
    }

    /**
     * İki kelimenin benzer olup olmadığını kontrol eder
     * Levenshtein mesafesi kullanarak küçük yazım hatalarını tespit eder
     * @param {string} word1 - İlk kelime
     * @param {string} word2 - İkinci kelime
     * @returns {boolean} Benzer mi?
     */
    isSimilar(word1, word2) {
        // Kelimeler çok farklı uzunluktaysa benzer değildir
        if (Math.abs(word1.length - word2.length) > 3) {
            return false;
        }

        const distance = this.levenshteinDistance(word1, word2);
        const maxLength = Math.max(word1.length, word2.length);

        // Benzerlik oranı: %70'den fazlaysa benzer kabul et
        const similarity = 1 - (distance / maxLength);
        return similarity >= 0.7;
    }

    /**
     * İki kelime arasındaki Levenshtein mesafesini hesaplar
     * @param {string} str1 - İlk kelime
     * @param {string} str2 - İkinci kelime
     * @returns {number} Levenshtein mesafesi
     */
    levenshteinDistance(str1, str2) {
        const m = str1.length;
        const n = str2.length;
        const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(
                        dp[i - 1][j] + 1,      // silme
                        dp[i][j - 1] + 1,      // ekleme
                        dp[i - 1][j - 1] + 1   // değiştirme
                    );
                }
            }
        }

        return dp[m][n];
    }

    /**
     * Metni kelimelere ayırır
     * @param {string} text - Ayrılacak metin
     * @returns {Array} Kelime dizisi
     */
    tokenize(text) {
        return text
            .trim()
            .split(/\s+/)
            .filter(w => w.length > 0);
    }

    /**
     * Kelimeden noktalama işaretlerini kaldırır
     * @param {string} word - Kelime
     * @returns {string} Temizlenmiş kelime
     */
    removePunctuation(word) {
        return word.replace(/[.,!?;:()"\[\]{}'"«»]/g, '');
    }

    /**
     * Ayarları günceller
     * @param {Object} newSettings - Yeni ayarlar
     */
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }

    /**
     * Hız hesaplar (kelime/dakika)
     * @param {number} wordCount - Kelime sayısı
     * @param {number} seconds - Geçen süre (saniye)
     * @returns {number} Kelime/dakika
     */
    static calculateWPM(wordCount, seconds) {
        if (seconds === 0) return 0;
        const minutes = seconds / 60;
        return Math.round(wordCount / minutes);
    }

    /**
     * Doğruluk yüzdesi hesaplar
     * @param {number} correctCount - Doğru kelime sayısı
     * @param {number} totalCount - Toplam kelime sayısı
     * @returns {number} Doğruluk yüzdesi
     */
    static calculateAccuracy(correctCount, totalCount) {
        if (totalCount === 0) return 0;
        return parseFloat(((correctCount / totalCount) * 100).toFixed(2));
    }
}

