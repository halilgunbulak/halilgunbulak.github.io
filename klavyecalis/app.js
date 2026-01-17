/**
 * Metin Yazma Uygulaması - Ana Uygulama
 * State yönetimi, ekran geçişleri ve olay yöneticileri
 */

class TypingApp {
    constructor() {
        // State
        this.state = {
            currentScreen: 'menu',
            selectedText: null,
            userInput: '',
            startTime: null,
            endTime: null,
            results: null,
            settings: {
                caseSensitive: false,
                ignorePunctuation: true
            }
        };

        // Modüller
        this.comparator = new TextComparator(this.state.settings);
        this.timer = new Timer(180); // 180 saniye
        this.mistakePool = MistakePool;

        // DOM Elementleri
        this.screens = {
            menu: document.getElementById('menu-screen'),
            countdown: document.getElementById('countdown-screen'),
            writing: document.getElementById('writing-screen'),
            result: document.getElementById('result-screen'),
            pool: document.getElementById('pool-screen')
        };

        this.elements = {
            // Menu
            textSelect: document.getElementById('text-select'),
            startBtn: document.getElementById('start-btn'),
            poolBtn: document.getElementById('pool-btn'),
            ignorePunctuation: document.getElementById('ignore-punctuation'),
            caseSensitive: document.getElementById('case-sensitive'),
            backgroundMusic: document.getElementById('background-music'),
            
            // Countdown
            countdownNumber: document.getElementById('countdown-number'),
            
            // Writing
            timerDisplay: document.getElementById('timer-display'),
            referenceText: document.getElementById('reference-text'),
            userInput: document.getElementById('user-input'),
            
            // Result
            correctCount: document.getElementById('correct-count'),
            incorrectCount: document.getElementById('incorrect-count'),
            totalCount: document.getElementById('total-count'),
            errorRate: document.getElementById('error-rate'),
            duration: document.getElementById('duration'),
            wpm: document.getElementById('wpm'),
            mistakesList: document.getElementById('mistakes-list'),
            mistakesSection: document.getElementById('mistakes-section'),
            retryTextBtn: document.getElementById('retry-text-btn'),
            saveMistakesBtn: document.getElementById('save-mistakes-btn'),
            practiceMistakesBtn: document.getElementById('practice-mistakes-btn'),
            backToMenuBtn: document.getElementById('back-to-menu-btn'),
            
            // Pool
            poolTotal: document.getElementById('pool-total'),
            poolMistakes: document.getElementById('pool-mistakes'),
            poolSessions: document.getElementById('pool-sessions'),
            poolList: document.getElementById('pool-list'),
            practicePoolBtn: document.getElementById('practice-pool-btn'),
            clearPoolBtn: document.getElementById('clear-pool-btn'),
            poolBackBtn: document.getElementById('pool-back-btn'),
            exportPoolBtn: document.getElementById('export-pool-btn'),
            importPoolBtn: document.getElementById('import-pool-btn'),
            importFileInput: document.getElementById('import-file-input'),

            // Sounds
            beepSound: document.getElementById('beep-sound'),
            backgroundSound: document.getElementById('background-sound')
        };

        this.init();
    }

    init() {
        console.log('Metin Yazma Uygulaması başlatılıyor...');

        // Metinleri yükle
        this.loadTexts();

        // Event listener'ları ekle
        this.attachEventListeners();

        // Timer callback'lerini ayarla
        this.setupTimer();

        // Ses dosyalarını önceden yükle
        this.preloadSounds();

        // İlk ekranı göster
        this.showScreen('menu');

        console.log('Uygulama hazır!');
    }

    preloadSounds() {
        // Ses dosyalarını önceden yükle (tarayıcı cache'ine al)
        try {
            this.elements.beepSound.load();
            this.elements.backgroundSound.load();
            console.log('Ses dosyaları yüklendi');
        } catch (error) {
            console.log('Ses dosyaları yüklenemedi:', error);
        }
    }

    loadTexts() {
        // missions_tr.js'den metinleri yükle
        if (typeof MISSIONS_TR !== 'undefined') {
            this.elements.textSelect.innerHTML = '';
            MISSIONS_TR.forEach((mission, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = mission.header;
                this.elements.textSelect.appendChild(option);
            });
        } else {
            console.error('MISSIONS_TR bulunamadı!');
        }
    }

    attachEventListeners() {
        // Menu
        this.elements.startBtn.addEventListener('click', () => this.handleStart());
        this.elements.poolBtn.addEventListener('click', () => this.showPoolScreen());
        this.elements.ignorePunctuation.addEventListener('change', (e) => {
            this.state.settings.ignorePunctuation = e.target.checked;
            this.comparator.updateSettings(this.state.settings);
        });
        this.elements.caseSensitive.addEventListener('change', (e) => {
            this.state.settings.caseSensitive = e.target.checked;
            this.comparator.updateSettings(this.state.settings);
        });
        
        // Writing - Kopyala-yapıştır engelleme
        this.elements.userInput.addEventListener('paste', (e) => e.preventDefault());
        this.elements.userInput.addEventListener('copy', (e) => e.preventDefault());
        this.elements.userInput.addEventListener('cut', (e) => e.preventDefault());
        
        // Result
        this.elements.retryTextBtn.addEventListener('click', () => this.retryText());
        this.elements.saveMistakesBtn.addEventListener('click', () => this.saveMistakes());
        this.elements.practiceMistakesBtn.addEventListener('click', () => this.practiceMistakes());
        this.elements.backToMenuBtn.addEventListener('click', () => this.showScreen('menu'));
        
        // Pool
        this.elements.practicePoolBtn.addEventListener('click', () => this.practiceFromPool());
        this.elements.clearPoolBtn.addEventListener('click', () => this.clearPool());
        this.elements.poolBackBtn.addEventListener('click', () => this.showScreen('menu'));
        this.elements.exportPoolBtn.addEventListener('click', () => this.exportPool());
        this.elements.importPoolBtn.addEventListener('click', () => this.elements.importFileInput.click());
        this.elements.importFileInput.addEventListener('change', (e) => this.importPool(e));
        
        // ESC tuşu ile çıkış
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.currentScreen === 'writing') {
                if (confirm('Yazmayı bırakmak istediğinize emin misiniz?')) {
                    this.timer.stop();
                    this.stopBackgroundMusic();
                    this.showScreen('menu');
                }
            }
        });
    }

    setupTimer() {
        this.timer.setCallbacks({
            onTick: (remaining) => {
                this.elements.timerDisplay.textContent = this.timer.getFormattedTime();
            },
            onWarning: () => {
                this.elements.timerDisplay.classList.add('warning');
            },
            onComplete: () => {
                this.handleTimerEnd();
            }
        });
    }

    // ===== EKRAN YÖNETİMİ =====
    showScreen(screenName) {
        // Tüm ekranları gizle
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });

        // Body'den tüm mode class'larını kaldır
        document.body.classList.remove('writing-mode', 'countdown-mode', 'menu-mode', 'result-mode', 'pool-mode');

        // İstenen ekranı göster
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.state.currentScreen = screenName;

            // Body'ye mode class'ı ekle (reklamları gizlemek için)
            document.body.classList.add(`${screenName}-mode`);

            console.log(`Ekran değişti: ${screenName}`);
        }
    }

    // ===== ANA FONKSİYONLAR =====
    handleStart() {
        // Seçili metni al
        const selectedIndex = parseInt(this.elements.textSelect.value);
        if (isNaN(selectedIndex) || !MISSIONS_TR[selectedIndex]) {
            alert('Lütfen bir metin seçin!');
            return;
        }

        this.state.selectedText = MISSIONS_TR[selectedIndex];
        console.log('Seçili metin:', this.state.selectedText.header);

        // Geri sayımı başlat
        this.startCountdown();
    }

    startCountdown() {
        this.showScreen('countdown');
        let count = 3;

        this.elements.countdownNumber.textContent = count;

        // İlk bip sesini çal
        this.playBeep();

        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                this.elements.countdownNumber.textContent = count;
                this.playBeep(); // Her saniyede bip sesi
            } else {
                clearInterval(countdownInterval);
                this.startWriting();
            }
        }, 1000);
    }

    playBeep() {
        try {
            this.elements.beepSound.currentTime = 0;
            this.elements.beepSound.play().catch(err => {
                console.log('Bip sesi çalınamadı:', err);
            });
        } catch (error) {
            console.log('Bip sesi hatası:', error);
        }
    }

    startWriting() {
        this.showScreen('writing');

        // Referans metni göster
        this.elements.referenceText.textContent = this.state.selectedText.body;

        // Kullanıcı input'unu temizle ve odaklan
        this.elements.userInput.value = '';
        this.elements.userInput.focus();

        // Timer'ı sıfırla ve başlat
        this.timer.reset();
        this.elements.timerDisplay.classList.remove('warning');
        this.elements.timerDisplay.textContent = this.timer.getFormattedTime();

        this.state.startTime = Date.now();
        this.timer.start();

        // Arka plan müziğini başlat (eğer seçiliyse)
        if (this.elements.backgroundMusic.checked) {
            console.log('Arka plan müziği başlatılıyor...');
            this.playBackgroundMusic();
        } else {
            console.log('Arka plan müziği kapalı');
        }

        // Metin tamamlanma kontrolü için event listener ekle
        this.elements.userInput.addEventListener('input', () => this.checkTextCompletion());

        console.log('Yazma başladı!');
    }

    playBackgroundMusic() {
        try {
            const sound = this.elements.backgroundSound;
            sound.volume = 0.3; // Ses seviyesi %30

            // Eğer ses daha önce duraklatıldıysa devam et, yoksa baştan başlat
            if (sound.paused) {
                sound.currentTime = 0;
                const playPromise = sound.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Arka plan müziği başladı');
                        })
                        .catch(err => {
                            console.log('Arka plan müziği çalınamadı (tarayıcı izni gerekli):', err);
                            // Kullanıcıya bilgi ver
                            if (err.name === 'NotAllowedError') {
                                console.log('Tarayıcı ses çalmaya izin vermiyor. Kullanıcı etkileşimi gerekli.');
                            }
                        });
                }
            }
        } catch (error) {
            console.log('Arka plan müziği hatası:', error);
        }
    }

    stopBackgroundMusic() {
        try {
            this.elements.backgroundSound.pause();
            this.elements.backgroundSound.currentTime = 0;
        } catch (error) {
            console.log('Müzik durdurma hatası:', error);
        }
    }

    checkTextCompletion() {
        const userText = this.elements.userInput.value.trim();
        const referenceText = this.state.selectedText.body.trim();

        // Kullanıcı metni referans metinden uzunsa veya eşitse kontrol et
        if (userText.length >= referenceText.length) {
            const userWords = userText.split(/\s+/).filter(w => w.length > 0);
            const refWords = referenceText.split(/\s+/).filter(w => w.length > 0);

            // Kelime sayısı eşit veya fazlaysa metni tamamlamış sayılır
            if (userWords.length >= refWords.length) {
                console.log('Metin tamamlandı! Sonuç ekranına geçiliyor...');
                this.timer.stop();
                this.handleTimerEnd();
            }
        }
    }

    handleTimerEnd() {
        this.state.endTime = Date.now();
        this.state.userInput = this.elements.userInput.value;

        // Arka plan müziğini durdur
        this.stopBackgroundMusic();

        console.log('Süre bitti! Analiz ediliyor...');

        // Sonuçları hesapla
        this.analyzeResults();

        // Sonuç ekranını göster
        this.showResultScreen();
    }

    analyzeResults() {
        const referenceText = this.state.selectedText.body;
        const userText = this.state.userInput;

        // Karşılaştırma yap
        const comparison = this.comparator.compare(referenceText, userText);

        // WPM hesapla
        const elapsedSeconds = this.timer.getElapsedTime();
        const wpm = TextComparator.calculateWPM(comparison.stats.correctCount, elapsedSeconds);

        this.state.results = {
            ...comparison,
            wpm,
            elapsedSeconds
        };

        console.log('Analiz tamamlandı:', this.state.results);
    }

    showResultScreen() {
        this.showScreen('result');

        const { stats, results, wpm, elapsedSeconds } = this.state.results;

        // İstatistikleri göster
        this.elements.correctCount.textContent = stats.correctCount;
        this.elements.incorrectCount.textContent = stats.incorrectCount;
        this.elements.totalCount.textContent = stats.totalWords;
        this.elements.errorRate.textContent = stats.errorRate + '%';
        this.elements.duration.textContent = elapsedSeconds + ' saniye';
        this.elements.wpm.textContent = wpm + ' kelime/dk';

        // Yanlış kelimeleri göster
        if (results.incorrect.length > 0) {
            this.elements.mistakesSection.style.display = 'block';
            this.elements.mistakesList.innerHTML = '';

            results.incorrect.forEach(mistake => {
                const div = document.createElement('div');
                div.className = 'mistake-item';
                div.innerHTML = `
                    <span class="typed">${mistake.typed}</span> →
                    <span class="correct">${mistake.correct}</span>
                `;
                this.elements.mistakesList.appendChild(div);
            });
        } else {
            this.elements.mistakesSection.style.display = 'none';
        }
    }

    saveMistakes() {
        if (!this.state.results || this.state.results.results.incorrect.length === 0) {
            alert('Kaydedilecek yanlış kelime yok!');
            return;
        }

        this.mistakePool.addMistakes(this.state.results.results.incorrect);
        alert('Yanlış kelimeler havuza kaydedildi!');
        console.log('Havuza eklendi:', this.state.results.results.incorrect.length, 'kelime');
    }

    retryText() {
        // Aynı metni tekrar yaz
        if (!this.state.selectedText) {
            alert('Metin bulunamadı!');
            return;
        }

        console.log('Metin yeniden yazılıyor:', this.state.selectedText.header);

        // Geri sayımı başlat
        this.startCountdown();
    }

    practiceMistakes() {
        if (!this.state.results || this.state.results.results.incorrect.length === 0) {
            alert('Pratik yapılacak yanlış kelime yok!');
            return;
        }

        // Yanlış kelimeleri metin olarak hazırla
        const mistakeWords = this.state.results.results.incorrect.map(m => m.correct);
        const practiceText = mistakeWords.join(' ');

        // Özel metin olarak ayarla
        this.state.selectedText = {
            header: 'Yanlış Kelimeler',
            body: practiceText
        };

        // Geri sayımı başlat
        this.startCountdown();
    }

    // ===== HAVUZ FONKSİYONLARI =====
    showPoolScreen() {
        this.showScreen('pool');

        // Havuz istatistiklerini göster
        const stats = this.mistakePool.getStats();
        this.elements.poolTotal.textContent = stats.totalWords;
        this.elements.poolMistakes.textContent = stats.totalMistakes;
        this.elements.poolSessions.textContent = stats.totalSessions;

        // Havuzdaki kelimeleri listele
        const words = this.mistakePool.getAllWords();
        this.elements.poolList.innerHTML = '';

        if (words.length === 0) {
            this.elements.poolList.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">Havuzda kelime yok.</p>';
            this.elements.practicePoolBtn.disabled = true;
        } else {
            this.elements.practicePoolBtn.disabled = false;
            words.forEach(word => {
                const div = document.createElement('div');
                div.className = 'pool-word';
                div.textContent = '• ' + word;
                this.elements.poolList.appendChild(div);
            });
        }
    }

    practiceFromPool() {
        const words = this.mistakePool.getAllWords();

        if (words.length === 0) {
            alert('Havuzda kelime yok!');
            return;
        }

        // Havuzdaki kelimeleri metin olarak hazırla
        const practiceText = words.join(' ');

        // Özel metin olarak ayarla
        this.state.selectedText = {
            header: 'Havuzdaki Kelimeler',
            body: practiceText
        };

        // Geri sayımı başlat
        this.startCountdown();
    }

    clearPool() {
        if (confirm('Havuzdaki tüm kelimeleri silmek istediğinize emin misiniz?')) {
            this.mistakePool.clear();
            alert('Havuz temizlendi!');
            this.showPoolScreen(); // Ekranı yenile
        }
    }

    exportPool() {
        try {
            this.mistakePool.exportToTXT();
        } catch (error) {
            console.error('Export hatası:', error);
            alert('Havuz indirilemedi: ' + error.message);
        }
    }

    importPool(event) {
        const file = event.target.files[0];
        if (!file) return;

        this.mistakePool.importFromTXT(file)
            .then(result => {
                alert(`✅ Başarılı!\n\n${result.imported} kelime yüklendi.\nToplam havuz: ${result.total} kelime`);
                this.showPoolScreen(); // Ekranı yenile
                // Input'u temizle (aynı dosyayı tekrar yükleyebilmek için)
                event.target.value = '';
            })
            .catch(error => {
                console.error('Import hatası:', error);
                alert('❌ Hata!\n\n' + error.message);
                event.target.value = '';
            });
    }
}

// ===== UYGULAMAYI BAŞLAT =====
let app;

// DOM yüklendiğinde uygulamayı başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new TypingApp();
    });
} else {
    app = new TypingApp();
}
