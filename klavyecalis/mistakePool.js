/**
 * MistakePool - Yanlış Kelime Havuzu Yönetimi
 * LocalStorage kullanarak yanlış yazılan kelimeleri saklar ve yönetir
 */

class MistakePool {
    static STORAGE_KEY = 'typing_mistake_pool';
    static VERSION = '1.0';

    /**
     * Havuzu LocalStorage'dan yükler
     * @returns {Object} Havuz verisi
     */
    static load() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (!data) {
                return this.createEmpty();
            }
            const pool = JSON.parse(data);
            // Versiyon kontrolü
            if (pool.version !== this.VERSION) {
                console.warn('Havuz versiyonu uyumsuz, yeni havuz oluşturuluyor');
                return this.createEmpty();
            }
            return pool;
        } catch (error) {
            console.error('Havuz yükleme hatası:', error);
            return this.createEmpty();
        }
    }

    /**
     * Boş havuz oluşturur
     * @returns {Object} Boş havuz yapısı
     */
    static createEmpty() {
        return {
            version: this.VERSION,
            lastUpdated: new Date().toISOString(),
            totalSessions: 0,
            words: []
        };
    }

    /**
     * Havuzu LocalStorage'a kaydeder
     * @param {Object} pool - Kaydedilecek havuz
     */
    static save(pool) {
        try {
            pool.lastUpdated = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pool));
            return true;
        } catch (error) {
            console.error('Havuz kaydetme hatası:', error);
            return false;
        }
    }

    /**
     * Yeni yanlış kelimeleri havuza ekler
     * @param {Array} incorrectWords - Yanlış kelimeler [{typed, correct}]
     */
    static addMistakes(incorrectWords) {
        if (!incorrectWords || incorrectWords.length === 0) {
            return;
        }

        const pool = this.load();
        pool.totalSessions++;

        incorrectWords.forEach(mistake => {
            const existing = pool.words.find(w => w.word === mistake.correct);

            if (existing) {
                // Mevcut kelime - güncelle
                existing.incorrectAttempts.push({
                    typed: mistake.typed,
                    timestamp: new Date().toISOString()
                });
                existing.frequency++;
                existing.lastMistake = new Date().toISOString();
            } else {
                // Yeni kelime - ekle
                pool.words.push({
                    word: mistake.correct,
                    incorrectAttempts: [{
                        typed: mistake.typed,
                        timestamp: new Date().toISOString()
                    }],
                    frequency: 1,
                    lastMistake: new Date().toISOString()
                });
            }
        });

        this.save(pool);
    }

    /**
     * Havuzu tamamen temizler
     */
    static clear() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Havuz temizleme hatası:', error);
            return false;
        }
    }

    /**
     * Tüm kelimeleri döndürür
     * @returns {Array} Kelime dizisi
     */
    static getAllWords() {
        const pool = this.load();
        return pool.words.map(w => w.word);
    }

    /**
     * En çok yanlış yapılan kelimeleri döndürür
     * @param {number} limit - Maksimum kelime sayısı
     * @returns {Array} Kelime dizisi
     */
    static getTopMistakes(limit = 50) {
        const pool = this.load();
        return pool.words
            .sort((a, b) => b.frequency - a.frequency)
            .slice(0, limit)
            .map(w => w.word);
    }

    /**
     * Havuz istatistiklerini döndürür
     * @returns {Object} İstatistikler
     */
    static getStats() {
        const pool = this.load();
        const totalWords = pool.words.length;
        const totalMistakes = pool.words.reduce((sum, w) => sum + w.frequency, 0);
        const avgMistakesPerWord = totalWords > 0 ? (totalMistakes / totalWords).toFixed(2) : 0;

        return {
            totalWords,
            totalMistakes,
            totalSessions: pool.totalSessions,
            avgMistakesPerWord: parseFloat(avgMistakesPerWord),
            lastUpdated: pool.lastUpdated
        };
    }

    /**
     * Belirli bir kelimeyi havuzdan siler
     * @param {string} word - Silinecek kelime
     */
    static removeWord(word) {
        const pool = this.load();
        pool.words = pool.words.filter(w => w.word !== word);
        this.save(pool);
    }

    /**
     * Havuzdan rastgele kelimeler seçer
     * @param {number} count - Seçilecek kelime sayısı
     * @returns {Array} Rastgele kelimeler
     */
    static getRandomWords(count = 20) {
        const allWords = this.getAllWords();
        const shuffled = allWords.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, Math.min(count, allWords.length));
    }

    /**
     * Havuzu TXT dosyası olarak indirir
     */
    static exportToTXT() {
        const pool = this.load();

        if (pool.words.length === 0) {
            alert('Havuzda kelime yok!');
            return;
        }

        // TXT içeriğini oluştur
        let content = '# Yanlış Kelime Havuzu\n';
        content += `# Toplam Kelime: ${pool.words.length}\n`;
        content += `# Toplam Hata: ${pool.words.reduce((sum, w) => sum + w.frequency, 0)}\n`;
        content += `# Son Güncelleme: ${new Date(pool.lastUpdated).toLocaleString('tr-TR')}\n`;
        content += '#\n';
        content += '# Format: Her satırda bir kelime\n';
        content += '# Frekans bilgisi: kelime (3x) - 3 kez yanlış yazılmış\n';
        content += '#\n\n';

        // Kelimeleri frekansa göre sırala ve ekle
        pool.words
            .sort((a, b) => b.frequency - a.frequency)
            .forEach(item => {
                content += `${item.word} (${item.frequency}x)\n`;
            });

        // Dosyayı indir
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `yanlis-kelimeler-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Havuz TXT olarak indirildi');
    }

    /**
     * TXT dosyasından havuzu yükler
     * @param {File} file - Yüklenecek TXT dosyası
     * @returns {Promise} Yükleme sonucu
     */
    static importFromTXT(file) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('Dosya seçilmedi'));
                return;
            }

            if (!file.name.endsWith('.txt')) {
                reject(new Error('Sadece TXT dosyaları yüklenebilir'));
                return;
            }

            const reader = new FileReader();

            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const lines = content.split('\n');
                    const words = [];

                    lines.forEach(line => {
                        // Boş satırları ve yorum satırlarını atla
                        line = line.trim();
                        if (!line || line.startsWith('#')) {
                            return;
                        }

                        // Kelimeyi ve frekansı ayıkla
                        // Format: "kelime (3x)" veya sadece "kelime"
                        const match = line.match(/^(.+?)\s*(?:\((\d+)x\))?$/);
                        if (match) {
                            const word = match[1].trim();
                            const frequency = match[2] ? parseInt(match[2]) : 1;

                            if (word) {
                                words.push({
                                    word,
                                    frequency,
                                    incorrectAttempts: [{
                                        typed: word,
                                        timestamp: new Date().toISOString()
                                    }],
                                    lastMistake: new Date().toISOString()
                                });
                            }
                        }
                    });

                    if (words.length === 0) {
                        reject(new Error('Dosyada geçerli kelime bulunamadı'));
                        return;
                    }

                    // Mevcut havuzu yükle
                    const pool = this.load();

                    // Yeni kelimeleri ekle veya mevcut olanları güncelle
                    words.forEach(newWord => {
                        const existing = pool.words.find(w => w.word === newWord.word);
                        if (existing) {
                            // Mevcut kelime - frekansı artır
                            existing.frequency += newWord.frequency;
                            existing.incorrectAttempts.push(...newWord.incorrectAttempts);
                            existing.lastMistake = newWord.lastMistake;
                        } else {
                            // Yeni kelime - ekle
                            pool.words.push(newWord);
                        }
                    });

                    // Havuzu kaydet
                    this.save(pool);

                    resolve({
                        success: true,
                        imported: words.length,
                        total: pool.words.length
                    });

                    console.log(`${words.length} kelime havuza eklendi`);
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => {
                reject(new Error('Dosya okuma hatası'));
            };

            reader.readAsText(file, 'UTF-8');
        });
    }

    /**
     * Havuzu basit kelime listesi olarak indirir (sadece kelimeler)
     */
    static exportSimpleTXT() {
        const words = this.getAllWords();

        if (words.length === 0) {
            alert('Havuzda kelime yok!');
            return;
        }

        // Basit liste oluştur
        const content = words.join('\n');

        // Dosyayı indir
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `kelime-listesi-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log('Basit kelime listesi indirildi');
    }
}

