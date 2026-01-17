/**
 * Timer - Geri Sayım Sayacı
 * Yazma oturumu için geri sayım yönetimi
 */

class Timer {
    constructor(duration = 180) {
        this.duration = duration; // Toplam süre (saniye)
        this.remaining = duration; // Kalan süre
        this.interval = null;
        this.startTime = null;
        this.endTime = null;
        this.isPaused = false;
        this.callbacks = {
            onTick: null,
            onComplete: null,
            onWarning: null // Son 30 saniye uyarısı
        };
    }

    /**
     * Sayacı başlatır
     */
    start() {
        if (this.interval) {
            this.stop();
        }

        this.startTime = Date.now();
        this.remaining = this.duration;
        this.isPaused = false;

        this.interval = setInterval(() => {
            if (!this.isPaused) {
                this.remaining--;

                // Callback'leri çağır
                if (this.callbacks.onTick) {
                    this.callbacks.onTick(this.remaining);
                }

                // Uyarı (son 30 saniye)
                if (this.remaining === 30 && this.callbacks.onWarning) {
                    this.callbacks.onWarning();
                }

                // Süre bitti
                if (this.remaining <= 0) {
                    this.complete();
                }
            }
        }, 1000);
    }

    /**
     * Sayacı durdurur
     */
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.endTime = Date.now();
    }

    /**
     * Sayacı duraklatır
     */
    pause() {
        this.isPaused = true;
    }

    /**
     * Sayacı devam ettirir
     */
    resume() {
        this.isPaused = false;
    }

    /**
     * Sayacı sıfırlar
     */
    reset() {
        this.stop();
        this.remaining = this.duration;
        this.startTime = null;
        this.endTime = null;
        this.isPaused = false;
    }

    /**
     * Sayaç tamamlandığında çağrılır
     */
    complete() {
        this.stop();
        if (this.callbacks.onComplete) {
            this.callbacks.onComplete();
        }
    }

    /**
     * Callback fonksiyonlarını ayarlar
     * @param {Object} callbacks - {onTick, onComplete, onWarning}
     */
    setCallbacks(callbacks) {
        this.callbacks = { ...this.callbacks, ...callbacks };
    }

    /**
     * Kalan süreyi formatlar (MM:SS)
     * @returns {string} Formatlanmış süre
     */
    getFormattedTime() {
        const minutes = Math.floor(this.remaining / 60);
        const seconds = this.remaining % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    /**
     * Geçen süreyi saniye olarak döndürür
     * @returns {number} Geçen süre (saniye)
     */
    getElapsedTime() {
        return this.duration - this.remaining;
    }

    /**
     * Toplam geçen süreyi milisaniye olarak döndürür
     * @returns {number} Geçen süre (ms)
     */
    getTotalElapsedMs() {
        if (!this.startTime) return 0;
        const end = this.endTime || Date.now();
        return end - this.startTime;
    }

    /**
     * İlerleme yüzdesini döndürür
     * @returns {number} İlerleme (0-100)
     */
    getProgress() {
        return ((this.duration - this.remaining) / this.duration) * 100;
    }

    /**
     * Sayaç çalışıyor mu?
     * @returns {boolean}
     */
    isRunning() {
        return this.interval !== null && !this.isPaused;
    }

    /**
     * Süre ayarlar
     * @param {number} seconds - Yeni süre (saniye)
     */
    setDuration(seconds) {
        this.duration = seconds;
        this.remaining = seconds;
    }
}

