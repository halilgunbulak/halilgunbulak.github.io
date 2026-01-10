/**
 * ZType Clone - Advanced Version (Phase 4)
 * Features: Web Audio API, Canvas Graphics, Advanced Text Processing,
 *           Turkish Support, Side Ads, Player Rotation, Error Review
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('final-score');
const gameOverScreen = document.getElementById('game-over-screen');
const menuOverlay = document.getElementById('menu-overlay');
const reviewOverlay = document.getElementById('review-overlay');
const reviewWordEl = document.getElementById('review-word');
const closeReviewBtn = document.getElementById('close-review-btn');

const startBtn = document.getElementById('start-btn');
const restartGameBtn = document.getElementById('restart-game-btn');
const returnMenuBtn = document.getElementById('return-menu-btn'); // For "Return to Menu"
// Note: legacy restart-btn might be gone, we use new ones.
// Just in case, let's grab them safely or ensure HTML matches.
// HTML has: restart-game-btn, review-mistakes-btn, return-menu-btn

const reviewMistakesBtn = document.getElementById('review-mistakes-btn');
const customTextEl = document.getElementById('custom-text');
const checkCase = document.getElementById('check-case');
const checkPunc = document.getElementById('check-punctuation');
const checkNums = document.getElementById('check-numbers');
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');
const nextLevelBtn = document.getElementById('next-level-btn');

// Speed Slider Logic
if (speedSlider && speedValue) {
    // Load saved level or default to 4
    const savedLevel = localStorage.getItem('ztype_level');
    const defaultLevel = savedLevel ? parseInt(savedLevel) : 4;
    speedSlider.value = defaultLevel;
    speedValue.innerText = defaultLevel;

    speedSlider.addEventListener('input', (e) => {
        const newLevel = e.target.value;
        speedValue.innerText = newLevel;
        // Save to localStorage
        localStorage.setItem('ztype_level', newLevel);
    });
}

// --- Audio System (File Based) ---
// Ses havuzu sistemi - her ses için birden fazla instance
const SOUND_POOL_SIZE = 5; // Her ses için 5 instance

// Ses havuzları
const TYPING_POOL = [];
const EXPLOSION_POOL = [];

// Ses havuzlarını oluştur
for (let i = 0; i < SOUND_POOL_SIZE; i++) {
    const typing = new Audio('sounds/typing_temp.wav');
    typing.volume = 0.4;
    typing.load();
    TYPING_POOL.push(typing);

    const explosion = new Audio('sounds/explosion.wav');
    explosion.volume = 0.4;
    explosion.load();
    EXPLOSION_POOL.push(explosion);
}

// Eski sesler (yedek)
const SHOOT_SOUND = new Audio('sounds/shoot.wav');
SHOOT_SOUND.load();

// Background music
const BACKGROUND_MUSIC = new Audio('sounds/background.mp3');
BACKGROUND_MUSIC.loop = true;
BACKGROUND_MUSIC.volume = 0.3;
BACKGROUND_MUSIC.load();

// Müzik ayarları (localStorage'dan yükle)
let musicVolume = parseFloat(localStorage.getItem('musicVolume')) || 0.3;
let musicEnabled = localStorage.getItem('musicEnabled') !== 'false'; // Default true
BACKGROUND_MUSIC.volume = musicEnabled ? musicVolume : 0;

// Ses havuzundan müsait ses al
function getAvailableSound(pool) {
    // Çalmayan veya bitmiş ses bul
    for (let sound of pool) {
        if (sound.paused || sound.ended || sound.currentTime === 0) {
            return sound;
        }
    }
    // Hepsi meşgulse ilkini kullan (üzerine yaz)
    return pool[0];
}

class SoundManager {
    static ctx = null;

    static init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    static playTone(freq, type, duration) {
        this.init();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type || 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }

    static playShoot() {
        // Artık klavye yazma sesi kullanılacak
        try {
            const s = getAvailableSound(TYPING_POOL);
            s.currentTime = 0; // Başa sar
            s.playbackRate = 1.0 + Math.random() * 0.2; // Hafif varyasyon
            s.play().catch(e => {
                // Fallback to synth if file fails
                this.playTone(600, 'square', 0.05);
            });
        } catch (e) {
            this.playTone(600, 'square', 0.05);
        }
    }

    static playExplosion() {
        try {
            const s = getAvailableSound(EXPLOSION_POOL);
            s.currentTime = 0; // Başa sar
            s.play().catch(e => {
                this.playTone(100, 'triangle', 0.3);
            });
        } catch (e) {
            this.playTone(100, 'triangle', 0.3);
        }
    }

    static playError() {
        this.playTone(150, 'triangle', 0.1);
    }

    static playLevelUp() {
        this.init();
        const now = this.ctx.currentTime;
        [440, 554, 659, 880].forEach((freq, i) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            gain.gain.setValueAtTime(0.3, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.3);
        });
    }

    static startBackgroundMusic() {
        try {
            // Sadece devam ettir, baştan başlatma
            if (BACKGROUND_MUSIC.paused) {
                BACKGROUND_MUSIC.play().catch(e => {
                    console.log('Background music autoplay blocked:', e);
                });
            }
        } catch (e) {
            console.log('Background music error:', e);
        }
    }

    static initBackgroundMusic() {
        try {
            // İlk kez başlat (menüden)
            BACKGROUND_MUSIC.currentTime = 0;
            BACKGROUND_MUSIC.play().catch(e => {
                console.log('Background music autoplay blocked:', e);
            });
        } catch (e) {
            console.log('Background music error:', e);
        }
    }

    static stopBackgroundMusic() {
        try {
            BACKGROUND_MUSIC.pause();
            BACKGROUND_MUSIC.currentTime = 0;
        } catch (e) {
            console.log('Background music stop error:', e);
        }
    }

    static pauseBackgroundMusic() {
        try {
            BACKGROUND_MUSIC.pause();
        } catch (e) {
            console.log('Background music pause error:', e);
        }
    }

    static resumeBackgroundMusic() {
        try {
            BACKGROUND_MUSIC.play().catch(e => {
                console.log('Background music resume error:', e);
            });
        } catch (e) {
            console.log('Background music resume error:', e);
        }
    }

    // Müzik ses seviyesi ayarla
    static setMusicVolume(volume) {
        musicVolume = Math.max(0, Math.min(1, volume)); // 0-1 arası
        BACKGROUND_MUSIC.volume = musicEnabled ? musicVolume : 0;
        localStorage.setItem('musicVolume', musicVolume);
        this.updateMusicUI();
    }

    // Müzik aç/kapat
    static toggleMusic() {
        musicEnabled = !musicEnabled;
        BACKGROUND_MUSIC.volume = musicEnabled ? musicVolume : 0;
        localStorage.setItem('musicEnabled', musicEnabled);
        this.updateMusicUI();
    }

    // Müzik UI güncelle
    static updateMusicUI() {
        const volumeSlider = document.getElementById('music-volume');
        const muteBtn = document.getElementById('music-mute-btn');

        if (volumeSlider) {
            volumeSlider.value = musicVolume * 100;
        }

        if (muteBtn) {
            muteBtn.textContent = musicEnabled ? '🔊' : '🔇';
            muteBtn.title = musicEnabled ? 'Müziği Kapat' : 'Müziği Aç';
        }
    }
}

// --- Localization System ---
const TRANSLATIONS = {
    tr: {
        menuTitle: "H&M -HIGames",
        labelScore: "Skor",
        labelSource: "Metin Kaynağı",
        labelCustom: "Kendi Metnini Yapıştır",
        labelSettings: "Ayarlar",
        labelCase: "Büyük/Küçük Duyarlı",
        labelPunc: "Noktalama Eşleştir",
        labelNums: "Sayıları Eşleştir",
        labelReqSpace: "Kelimeden Sonra Boşluk Zorunlu",
        startBtn: "GÖREVİ BAŞLAT",
        controlsHint: "Meteorları vurmak için yazın. Size çarpmalarına izin vermeyin.",
        goTitle: "GÖREV BAŞARISIZ",
        labelFinalScore: "Final Skor",
        restartBtn: "YENİDEN BAŞLAT",
        reviewBtn: "HATALARI İNCELE",
        returnMenuBtn: "MENÜYE DÖN",
        revTitle: "HATALI KELİMELER",
        revHint: "Sonraki kelime için SPACE'e basın",
        revComplete: "İNCELEME TAMAMLANDI",
        closeBtn: "KAPAT",
        pressSpace: "BOŞLUĞA BAS",
        randomWords: "Rastgele (TR)",
        noMistakes: "HATA YOK (KUSURSUZ)",
        completeTitle: "GÖREV TAMAMLANDI",
        nextLevelBtn: "SONRAKİ SEVİYE (HIZ +0.5)",
        nextMissionBtn: "SONRAKİ GÖREV (YENİ METİN)",
        labelLevel: "Seviye",
        menuBtn: "MENÜ",
        pauseTitle: "OYUN DURAKLATILDI",
        resumeBtn: "DEVAM ET",
        pauseMenuBtn: "MENÜYE DÖN",
        levelCompleteTitle: "SEVİYE TAMAMLANDI!",
        levelCompleteMsg: "Tüm kelimeleri başarıyla tamamladınız!",
        increaseSpeedBtn: "HIZI ARTIR VE DEVAM ET",
        newTextBtn: "YENİ METİN İLE DEVAM ET",
        labelCurrentScore: "Mevcut Skor",
        textSelectionTitle: "METİN SEÇİN",
        textSelectionMsg: "Devam etmek için bir metin seçin:",
        textSelectionCancel: "İPTAL",
        mistakeCountLabel: "Hatalı Kelime",
        retryMistakesBtn: "HATALI KELİMELERLE OYNA",
        gameoverNewTextBtn: "YENİ METİN SEÇ"
    },

    en: {
        menuTitle: "H&M - HIGAMES",
        labelScore: "Score",
        labelSource: "Text Source",
        labelCustom: "Paste Custom Text",
        labelSettings: "Settings",
        labelCase: "Case Sensitive",
        labelPunc: "Match Punctuation",
        labelNums: "Match Numbers",
        labelReqSpace: "Require Space After Word",
        startBtn: "START MISSION",
        controlsHint: "Type to shoot meteors. Don't let them hit you.",
        goTitle: "MISSION FAILED",
        labelFinalScore: "Final Score",
        restartBtn: "RESTART MISSION",
        reviewBtn: "REVIEW MISTAKES",
        returnMenuBtn: "RETURN TO MENU",
        revTitle: "MISTAKE REVIEW",
        revHint: "Press SPACE for next word",
        revComplete: "REVIEW COMPLETE",
        closeBtn: "CLOSE",
        pressSpace: "PRESS SPACE",
        randomWords: "Random (EN)",
        noMistakes: "NO MISTAKES (PERFECT)",
        completeTitle: "MISSION COMPLETE",
        nextLevelBtn: "NEXT LEVEL (SPEED +0.5)",
        nextMissionBtn: "NEXT MISSION (NEW TEXT)",
        labelLevel: "Level",
        menuBtn: "MENU",
        pauseTitle: "GAME PAUSED",
        resumeBtn: "RESUME",
        pauseMenuBtn: "EXIT TO MENU",
        levelCompleteTitle: "LEVEL COMPLETE!",
        levelCompleteMsg: "You've successfully completed all words!",
        increaseSpeedBtn: "INCREASE SPEED & CONTINUE",
        newTextBtn: "NEW TEXT & CONTINUE",
        labelCurrentScore: "Current Score",
        textSelectionTitle: "SELECT TEXT",
        textSelectionMsg: "Choose a text to continue:",
        textSelectionCancel: "CANCEL",
        mistakeCountLabel: "Mistakes",
        retryMistakesBtn: "PLAY WITH MISTAKES",
        gameoverNewTextBtn: "SELECT NEW TEXT"
    },
};

// Add getDifficulty method to Game class later, but for now structure is safe.


const DEFAULT_WORDS_TR = [
    'uzay', 'lazer', 'galaksi', 'gezegen', 'roket', 'yıldız', 'yörünge', 'uzaylı',
    'kuyrukluyıldız', 'bulutsu', 'yerçekimi', 'boşluk', 'meteor', 'güneş', 'ay', 'sistem',
    'enerji', 'güç', 'kalkan', 'kuvvet', 'ışık', 'karanlık', 'gelecek', 'robot',
    'evren', 'saldırı', 'savunma', 'uçuş', 'pilot', 'motor', 'hız', 'atılım'
];

const DEFAULT_WORDS_EN = [
    'space', 'laser', 'galaxy', 'planet', 'rocket', 'star', 'orbit', 'alien',
    'comet', 'nebula', 'gravity', 'void', 'meteor', 'solar', 'lunar', 'system',
    'energy', 'power', 'shield', 'force', 'light', 'dark', 'future', 'robot',
    'cosmos', 'attack', 'defend', 'flight', 'pilot', 'engine', 'speed', 'warp'
];

let DEFAULT_WORDS = DEFAULT_WORDS_TR;

// --- Text Library (30 Missions) ---
let TEXT_LIBRARY = [];

class WordManager {
    static process(text, settings) {
        if (!text || text.trim().length === 0) return DEFAULT_WORDS;

        let words = text.split(/\s+/);

        return words.map(w => {
            let clean = w;
            if (!settings.caseSensitive) {
                clean = clean.toLocaleLowerCase('tr-TR');
            }
            if (!settings.punctuation) {
                clean = clean.replace(/[^a-zA-Z0-9_ğüşıöçĞÜŞİÖÇ\s]/g, "");
            }
            if (!settings.numbers) clean = clean.replace(/\d+/g, "");
            return clean;
        }).filter(w => w.length > 0);
    }
}

// --- Asset Loading ---
const IMG_SHIP = new Image();
IMG_SHIP.src = 'images/space.svg';
const IMG_METEOR = new Image();
IMG_METEOR.src = 'images/meteor.svg';

// Patlama efekti SVG'leri
const IMG_EXPLOSION_1 = new Image();
IMG_EXPLOSION_1.src = 'images/patlama_1.svg';

const IMG_EXPLOSION_2 = new Image();
IMG_EXPLOSION_2.src = 'images/patlama_2.svg';

const IMG_EXPLOSION_3 = new Image();
IMG_EXPLOSION_3.src = 'images/patlama_3.svg';

// --- Game Classes ---
class Game {
    constructor() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.state = 'MENU'; // MENU, PLAYING, GAMEOVER, REVIEW
        this.words = [];
        this.settings = {};
        this.currentWordIndex = 0;

        this.mistakeWords = []; // Stores words where mistakes happened
        this.reviewIndex = 0;

        this.currentLang = 'tr';

        // Load saved level from localStorage, default to 4
        const savedLevel = localStorage.getItem('ztype_level');
        this.level = savedLevel ? parseInt(savedLevel) : 4;

        this.speedMultiplier = 1;
        this.baseSpawnInterval = 2000;
        this.currentLibraryIndex = -1; // -1 for random or none
        this.userSelectedText = false; // Kullanıcı metin seçti mi?

        // UI Bindings
        startBtn.addEventListener('click', () => {
            // Read level from slider on start
            this.level = parseInt(speedSlider.value) || 4;
            // Save to localStorage
            localStorage.setItem('ztype_level', this.level);

            // Check if user selected a text
            const selectVal = document.getElementById('text-library-select').value;
            const customText = customTextEl.value.trim();
            this.userSelectedText = (selectVal !== 'random' || customText.length > 0);

            this.initGame({ resetScore: true });
        });
        nextLevelBtn.addEventListener('click', () => this.nextLevel());
        restartGameBtn.addEventListener('click', () => {
            this.initGame(true); // Restart = reset score
        });
        returnMenuBtn.addEventListener('click', () => this.showMenu());
        reviewMistakesBtn.addEventListener('click', () => this.startReview());
        closeReviewBtn.addEventListener('click', () => this.showGameOver());

        // Language Switcher Bindings
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });

        // Other UI Bindings
        const nextMissionBtn = document.getElementById('next-mission-btn');
        if (nextMissionBtn) nextMissionBtn.addEventListener('click', () => this.nextMission());

        const resumeBtn = document.getElementById('resume-btn');
        if (resumeBtn) resumeBtn.addEventListener('click', () => this.resumeGame());

        const pauseMenuBtn = document.getElementById('pause-to-menu-btn');
        if (pauseMenuBtn) pauseMenuBtn.addEventListener('click', () => this.showMenu());

        const increaseSpeedBtn = document.getElementById('increase-speed-btn');
        if (increaseSpeedBtn) increaseSpeedBtn.addEventListener('click', () => this.increaseSpeedAndContinue());

        const newTextBtn = document.getElementById('new-text-btn');
        if (newTextBtn) newTextBtn.addEventListener('click', () => this.newTextAndContinue());

        const levelCompleteMenuBtn = document.getElementById('level-complete-menu-btn');
        if (levelCompleteMenuBtn) levelCompleteMenuBtn.addEventListener('click', () => this.showMenu());

        const retryMistakesBtn = document.getElementById('retry-mistakes-btn');
        if (retryMistakesBtn) retryMistakesBtn.addEventListener('click', () => this.retryWithMistakes());

        const textSelectionCancelBtn = document.getElementById('text-selection-cancel-btn');
        if (textSelectionCancelBtn) textSelectionCancelBtn.addEventListener('click', () => {
            // Eğer game over'dan geldiyse game over'a dön, değilse level complete'e dön
            if (this.cameFromGameOver) {
                this.showGameOver();
            } else {
                this.showLevelComplete();
            }
        });

        const gameoverRetryMistakesBtn = document.getElementById('gameover-retry-mistakes-btn');
        if (gameoverRetryMistakesBtn) gameoverRetryMistakesBtn.addEventListener('click', () => this.retryWithMistakes());

        const gameoverNewTextBtn = document.getElementById('gameover-new-text-btn');
        if (gameoverNewTextBtn) gameoverNewTextBtn.addEventListener('click', () => {
            this.cameFromGameOver = true;
            this.showTextSelection();
        });

        this.setLanguage('tr');

        // Update level display on load
        const lvlDisp = document.getElementById('level-display');
        if (lvlDisp) lvlDisp.innerText = this.level;

        // Müzik kontrolleri
        const musicMuteBtn = document.getElementById('music-mute-btn');
        const musicVolumeSlider = document.getElementById('music-volume');
        const musicVolumeLabel = document.getElementById('music-volume-label');

        if (musicMuteBtn) {
            musicMuteBtn.addEventListener('click', () => {
                SoundManager.toggleMusic();
            });
        }

        if (musicVolumeSlider) {
            musicVolumeSlider.addEventListener('input', (e) => {
                const volume = e.target.value / 100;
                SoundManager.setMusicVolume(volume);
                if (musicVolumeLabel) {
                    musicVolumeLabel.textContent = e.target.value + '%';
                }
            });
        }

        // UI'yi başlangıçta güncelle
        SoundManager.updateMusicUI();

        // Müziği başlat (sayfa yüklendiğinde)
        SoundManager.initBackgroundMusic();

        window.addEventListener('keydown', (e) => this.input(e));

        this.loop(0);
    }

    getDifficulty(level) {
        // Speed: Daha yumuşak artış - 0.6 base + 0.12 per level
        // Level 1: 0.72, Level 5: 1.2, Level 10: 1.8
        const speedMult = 0.6 + (level * 0.12);

        // Spawn Interval: Level'e göre daha dengeli azalma
        // Level 1: 2400ms, Level 2: 2200ms, Level 5: 1600ms, Level 10: 1000ms
        // Formula: Daha yumuşak bir eğri
        let interval = 2600 - (level * 160);
        if (interval < 800) interval = 800; // Minimum 800ms

        // Özel ayarlamalar
        if (level === 1) interval = 2400;
        if (level === 2) interval = 2200;
        if (level === 3) interval = 2000;

        return { speedMult, spawnInterval: interval };
    }

    setLanguage(lang) {
        this.currentLang = lang;
        DEFAULT_WORDS = lang === 'tr' ? DEFAULT_WORDS_TR : DEFAULT_WORDS_EN;

        try {
            // Load from global variables loaded via script tags
            const data = lang === 'tr' ? MISSIONS_TR : MISSIONS_EN;
            TEXT_LIBRARY = data.map(item => ({
                title: item.header,
                text: item.body
            }));
        } catch (e) {
            console.error("Metin kütüphanesi yüklenemedi:", e);
            TEXT_LIBRARY = [];
        }

        // Update Buttons UI
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        this.updateUIStrings();
        this.populateLibrary();
    }

    updateUIStrings() {
        const t = TRANSLATIONS[this.currentLang];

        // Generic mapping ID -> Translation Key
        const map = {
            'menu-title': t.menuTitle,
            'label-score': t.labelScore,
            'label-level': t.labelLevel,
            'label-source': t.labelSource,
            'label-custom': t.labelCustom,
            'label-settings': t.labelSettings,
            'label-case': t.labelCase,
            'label-punc': t.labelPunc,
            'label-nums': t.labelNums,
            'label-req-space': t.labelReqSpace,
            'start-btn': t.startBtn,
            'controls-hint': t.controlsHint,
            'go-title': t.goTitle,
            'label-final-score': t.labelFinalScore,
            'restart-game-btn': t.restartBtn,
            'review-mistakes-btn': t.reviewBtn,
            'return-menu-btn': t.returnMenuBtn,
            'rev-title': t.revTitle,
            'rev-hint': t.revHint,
            'close-review-btn': t.closeBtn,

            'space-indicator': t.pressSpace,
            'next-level-btn': t.nextLevelBtn,
            'next-mission-btn': t.nextMissionBtn,
            'pause-title': t.pauseTitle,
            'resume-btn': t.resumeBtn,
            'pause-to-menu-btn': t.pauseMenuBtn,
            'level-complete-title': t.levelCompleteTitle,
            'level-complete-message': t.levelCompleteMsg,
            'increase-speed-btn': t.increaseSpeedBtn,
            'new-text-btn': t.newTextBtn,
            'label-current-score': t.labelCurrentScore,
            'text-selection-title': t.textSelectionTitle,
            'text-selection-message': t.textSelectionMsg,
            'text-selection-cancel-btn': t.textSelectionCancel,
            'retry-mistakes-btn': t.retryMistakesBtn,
            'gameover-retry-mistakes-btn': t.retryMistakesBtn,
            'gameover-new-text-btn': t.gameoverNewTextBtn
        };

        for (const [id, text] of Object.entries(map)) {
            const el = document.getElementById(id);
            if (el) {
                if (el.tagName === 'INPUT' && el.type === 'button') el.value = text;
                else el.innerText = text;
            }
        }

        // Special case for placeholders
        const customText = document.getElementById('custom-text');
        if (customText) customText.placeholder = this.currentLang === 'tr' ? 'Buraya metin girin...' : 'Enter text here...';
    }

    populateLibrary() {
        // Populate Library Dropdown
        const select = document.getElementById('text-library-select');
        select.innerHTML = '';

        const langSuffix = this.currentLang === 'tr' ? '(TR)' : '(EN)';
        const randomLabel = this.currentLang === 'tr' ? 'Rastgele' : 'Random';

        const randomOpt = document.createElement('option');
        randomOpt.value = 'random';
        randomOpt.innerText = `${randomLabel} ${langSuffix}`;
        select.appendChild(randomOpt);

        TEXT_LIBRARY.forEach((item, index) => {
            const opt = document.createElement('option');
            opt.value = index;
            opt.innerText = item.title;
            select.appendChild(opt);
        });
    }

    resize() {
        const container = document.getElementById('game-container');
        if (container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
            this.width = canvas.width;
            this.height = canvas.height;
        }
    }

    showMenu() {
        this.state = 'MENU';
        menuOverlay.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        reviewOverlay.classList.add('hidden');
        document.getElementById('pause-screen').classList.add('hidden');
        document.getElementById('level-complete-screen').classList.add('hidden');
        document.getElementById('text-selection-screen').classList.add('hidden');
        scoreEl.innerText = '0';
        nextLevelBtn.classList.add('hidden');
        restartGameBtn.classList.remove('hidden');

        // Arka plan müziğini başlat (ilk kez)
        SoundManager.initBackgroundMusic();
    }

    showLevelComplete() {
        // Yeni level atlama ekranı
        this.state = 'LEVEL_COMPLETE';
        this.cameFromGameOver = false; // Reset flag
        const currentScoreEl = document.getElementById('current-score');
        if (currentScoreEl) currentScoreEl.innerText = this.score;

        // Hatalı kelime sayısını göster
        const mistakeCountEl = document.getElementById('mistake-count');
        if (mistakeCountEl) mistakeCountEl.innerText = this.mistakeWords.length;

        // Hatalı kelime varsa butonu göster
        const retryMistakesBtn = document.getElementById('retry-mistakes-btn');
        if (retryMistakesBtn) {
            if (this.mistakeWords.length > 0) {
                retryMistakesBtn.classList.remove('hidden');
            } else {
                retryMistakesBtn.classList.add('hidden');
            }
        }

        // Hatalı kelime sayısı metnini güncelle
        const t = TRANSLATIONS[this.currentLang];
        const mistakeCountDisplay = document.getElementById('mistake-count-display');
        if (mistakeCountDisplay) {
            mistakeCountDisplay.innerHTML = `${t.mistakeCountLabel}: <span id="mistake-count">${this.mistakeWords.length}</span>`;
        }

        document.getElementById('level-complete-screen').classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        reviewOverlay.classList.add('hidden');
        menuOverlay.classList.add('hidden');
        document.getElementById('pause-screen').classList.add('hidden');
        document.getElementById('text-selection-screen').classList.add('hidden');

        SoundManager.playLevelUp(); // Victory sound
    }

    showMissionComplete() {
        // Eski görev tamamlama ekranı (artık kullanılmıyor, level complete kullanılıyor)
        this.showLevelComplete();
    }

    showGameOver() {
        this.state = 'GAMEOVER';
        this.cameFromGameOver = false; // Reset flag
        finalScoreEl.innerText = this.score;
        gameOverScreen.classList.remove('hidden');
        reviewOverlay.classList.add('hidden');
        menuOverlay.classList.add('hidden');
        document.getElementById('text-selection-screen').classList.add('hidden');

        // Arka plan müziğini durdur
        SoundManager.stopBackgroundMusic();

        // Hatalı kelime sayısını göster
        const gameoverMistakeCountEl = document.getElementById('gameover-mistake-count');
        if (gameoverMistakeCountEl) gameoverMistakeCountEl.innerText = this.mistakeWords.length;

        // Hatalı kelime varsa butonu göster
        const gameoverRetryMistakesBtn = document.getElementById('gameover-retry-mistakes-btn');
        if (gameoverRetryMistakesBtn) {
            if (this.mistakeWords.length > 0) {
                gameoverRetryMistakesBtn.classList.remove('hidden');
            } else {
                gameoverRetryMistakesBtn.classList.add('hidden');
            }
        }

        // Hatalı kelime sayısı metnini güncelle
        const t = TRANSLATIONS[this.currentLang];
        const gameoverMistakeCountDisplay = document.getElementById('gameover-mistake-count-display');
        if (gameoverMistakeCountDisplay) {
            gameoverMistakeCountDisplay.innerHTML = `${t.mistakeCountLabel}: <span id="gameover-mistake-count">${this.mistakeWords.length}</span>`;
        }

        // Disable Review button if no mistakes
        if (this.mistakeWords.length === 0) {
            reviewMistakesBtn.disabled = true;
            reviewMistakesBtn.style.opacity = '0.5';
            reviewMistakesBtn.innerText = t.noMistakes;
        } else {
            reviewMistakesBtn.disabled = false;
            reviewMistakesBtn.style.opacity = '1';
            reviewMistakesBtn.innerText = t.reviewBtn;
        }
    }

    nextLevel() {
        if (this.level < 10) {
            this.level++;
        }
        // Update slider UI to reflect new level
        if (speedSlider) {
            speedSlider.value = this.level;
            speedValue.innerText = this.level;
        }
        // Trigger Effect
        this.showLevelUpEffect();
        SoundManager.playLevelUp();

        this.initGame({ resetScore: false, keepSettings: true });
    }

    showLevelUpEffect() {
        // Visual +1
        const el = document.createElement('div');
        el.className = 'level-up-anim';
        el.innerText = "+1 LEVEL UP!";

        // Position near top right or center
        const stats = document.getElementById('level-stats');
        if (stats) {
            const rect = stats.getBoundingClientRect();
            el.style.top = (rect.top + 30) + 'px';
            el.style.left = (rect.left - 50) + 'px';
        } else {
            el.style.top = '100px';
            el.style.right = '50px';
        }

        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1500);
    }

    increaseSpeedAndContinue() {
        // Hızı artır (level'i artır) ve aynı metinle devam et
        if (this.level < 10) {
            this.level++;
        }

        // Save to localStorage
        localStorage.setItem('ztype_level', this.level);

        // Slider'ı güncelle
        if (speedSlider) {
            speedSlider.value = this.level;
            speedValue.innerText = this.level;
        }

        // Level display'i güncelle
        const lvlDisp = document.getElementById('level-display');
        if (lvlDisp) lvlDisp.innerText = this.level;

        // Aynı metinle devam et, skoru koru
        this.initGame({ resetScore: false, keepSettings: true, sameText: true });

        SoundManager.playLevelUp();
    }

    newTextAndContinue() {
        // Metin seçim ekranını göster
        this.showTextSelection();
    }

    showTextSelection() {
        this.state = 'TEXT_SELECTION';
        document.getElementById('text-selection-screen').classList.remove('hidden');
        document.getElementById('level-complete-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.add('hidden');

        // Metin listesini doldur
        const container = document.getElementById('text-list-container');
        container.innerHTML = '';

        TEXT_LIBRARY.forEach((item, index) => {
            const btn = document.createElement('button');
            btn.className = 'text-option';
            btn.innerText = item.title;
            btn.addEventListener('click', () => this.selectText(index));
            container.appendChild(btn);
        });
    }

    selectText(index) {
        this.currentLibraryIndex = index;
        this.userSelectedText = true;

        // Seçilen metinle devam et, skoru koru
        this.initGame({ resetScore: false, keepSettings: false, libraryIndex: this.currentLibraryIndex });

        SoundManager.playShoot();
    }

    retryWithMistakes() {
        // Hatalı kelimelerle oyna
        if (this.mistakeWords.length === 0) return;

        // Hatalı kelimeleri pool olarak kullan
        this.pool = [...this.mistakeWords]; // Kopyasını al
        this.currentWordIndex = 0;

        // Hız ayarlarını güncelle
        const diff = this.getDifficulty(this.level);
        this.speedMultiplier = diff.speedMult;
        this.spawnInterval = diff.spawnInterval;
        this.baseSpawnInterval = diff.spawnInterval;

        // Oyunu başlat
        this.player = new Player(this.width / 2, this.height - 50);
        this.enemies = [];
        this.particles = [];
        this.projectiles = [];
        this.explosions = []; // Patlama animasyonları
        this.spawnTimer = 0;
        this.activeEnemy = null;
        this.mistakeWords = []; // Yeni hataları kaydetmek için sıfırla
        this.waitingForSpace = false;
        this.state = 'PLAYING';

        document.getElementById('level-complete-screen').classList.add('hidden');
        document.getElementById('text-selection-screen').classList.add('hidden');
        menuOverlay.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        reviewOverlay.classList.add('hidden');
        document.getElementById('pause-screen').classList.add('hidden');

        SoundManager.playShoot();
    }

    nextMission() {
        // Increment Index
        this.currentLibraryIndex++;
        if (this.currentLibraryIndex >= TEXT_LIBRARY.length) {
            this.currentLibraryIndex = 0; // Loop back to start
        }
        this.userSelectedText = true;
        // Keep score, but load new text
        this.initGame({ resetScore: false, keepSettings: false, libraryIndex: this.currentLibraryIndex });
    }

    pauseGame() {
        if (this.state !== 'PLAYING') return;
        this.state = 'PAUSED';
        document.getElementById('pause-screen').classList.remove('hidden');
        SoundManager.pauseBackgroundMusic();
    }

    resumeGame() {
        if (this.state !== 'PAUSED') return;
        this.state = 'PLAYING';
        document.getElementById('pause-screen').classList.add('hidden');
        SoundManager.resumeBackgroundMusic();
    }

    gameOver() {
        this.showGameOver();
    }

    initGame(options = {}) {
        const lvlDisp = document.getElementById('level-display');
        if (lvlDisp) lvlDisp.innerText = this.level || 2;

        const isRestart = (typeof options === 'boolean') ? options : false;
        if (isRestart) options = { resetScore: true, keepSettings: true };

        if (options.resetScore === undefined) options.resetScore = true;
        if (options.keepSettings === undefined) options.keepSettings = false;

        // Eğer sameText true ise, mevcut pool'u koru ve başa sar
        if (options.sameText && this.pool && this.pool.length > 0) {
            // Sadece hız ayarlarını güncelle
            const diff = this.getDifficulty(this.level);
            this.speedMultiplier = diff.speedMult;
            this.spawnInterval = diff.spawnInterval;
            this.baseSpawnInterval = diff.spawnInterval;
            this.currentWordIndex = 0; // Kelimeleri baştan başlat
        } else if (!options.keepSettings || options.libraryIndex !== undefined) {
            this.settings = {
                caseSensitive: checkCase.checked,
                punctuation: checkPunc.checked,
                numbers: checkNums.checked
            };
            if (!this.level) this.level = parseInt(speedSlider.value) || 2;
            const diff = this.getDifficulty(this.level);
            this.speedMultiplier = diff.speedMult;
            this.spawnInterval = diff.spawnInterval;
            this.baseSpawnInterval = diff.spawnInterval;

            const rawTextCustom = customTextEl.value;
            const selectVal = document.getElementById('text-library-select').value;
            let sourceText = "";

            if (rawTextCustom.trim().length > 0) {
                // Kullanıcı özel metin girmiş
                sourceText = rawTextCustom;
                this.userSelectedText = true;
            } else if (this.currentLibraryIndex !== -1 && TEXT_LIBRARY[this.currentLibraryIndex]) {
                // Programatik olarak seçilmiş metin (nextMission, selectText vb.)
                sourceText = TEXT_LIBRARY[this.currentLibraryIndex].text;
                this.userSelectedText = true;
            } else if (selectVal !== 'random' && TEXT_LIBRARY[selectVal]) {
                // Kullanıcı dropdown'dan metin seçmiş
                sourceText = TEXT_LIBRARY[selectVal].text;
                this.userSelectedText = true;
            } else if (selectVal === 'random' || !this.userSelectedText) {
                // Rastgele seçim - metinler arasından rastgele seç
                if (TEXT_LIBRARY.length > 0) {
                    const randomIndex = Math.floor(Math.random() * TEXT_LIBRARY.length);
                    sourceText = TEXT_LIBRARY[randomIndex].text;
                    this.currentLibraryIndex = randomIndex;
                } else {
                    sourceText = "";
                }
            }

            this.pool = WordManager.process(sourceText, this.settings);
            if (this.pool.length === 0) this.pool = DEFAULT_WORDS;
            this.currentWordIndex = 0;
            const reqSpaceEl = document.getElementById('require-space');
            this.requireSpace = reqSpaceEl ? reqSpaceEl.checked : false;
        } else {
            this.currentWordIndex = 0;
        }

        this.player = new Player(this.width / 2, this.height - 50);
        this.enemies = [];
        this.particles = [];
        this.projectiles = [];
        this.explosions = []; // Patlama animasyonları
        if (options.resetScore) {
            this.score = 0;
            scoreEl.innerText = '0';
        }
        this.spawnTimer = 0;
        this.activeEnemy = null;
        this.mistakeWords = [];
        this.waitingForSpace = false;
        this.state = 'PLAYING';

        menuOverlay.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        reviewOverlay.classList.add('hidden');
        document.getElementById('pause-screen').classList.add('hidden');
        document.getElementById('level-complete-screen').classList.add('hidden');
        document.getElementById('text-selection-screen').classList.add('hidden');

        const t = TRANSLATIONS[this.currentLang];
        document.getElementById('go-title').innerText = t.goTitle;
        nextLevelBtn.classList.add('hidden');
        const nextMisBtn = document.getElementById('next-mission-btn');
        if (nextMisBtn) nextMisBtn.classList.add('hidden');
        restartGameBtn.classList.remove('hidden');

        // Arka plan müziğini başlat
        SoundManager.startBackgroundMusic();
    }

    startReview() {
        this.state = 'REVIEW';
        this.reviewIndex = 0;
        reviewOverlay.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        this.showReviewWord();
    }

    showReviewWord() {
        const t = TRANSLATIONS[this.currentLang];
        if (this.reviewIndex < this.mistakeWords.length) {
            reviewWordEl.innerText = this.mistakeWords[this.reviewIndex];
        } else {
            reviewWordEl.innerText = t.revComplete;
        }
    }

    input(e) {
        if (this.state === 'MENU') return;

        // Tuş basılı tutulduğunda tekrar tetiklenmesini engelle
        if (e.repeat) return;

        if (e.code === 'Escape') {
            if (this.state === 'PLAYING') this.pauseGame();
            else if (this.state === 'PAUSED') this.resumeGame();
            else this.showMenu();
            return;
        }

        if (this.state === 'REVIEW') {
            if (e.code === 'Space') {
                this.reviewIndex++;
                if (this.reviewIndex >= this.mistakeWords.length) {
                    this.showGameOver();
                } else {
                    this.showReviewWord();
                }
            }
            return;
        }

        if (this.state !== 'PLAYING') return;

        if (this.waitingForSpace) {
            if (e.code === 'Space') {
                this.waitingForSpace = false;
                const spcInd = document.getElementById('space-indicator');
                if (spcInd) spcInd.classList.add('hidden');

                // Meteorları yukarı it ve hareket yönlerini yeniden hesapla
                this.enemies.forEach(en => {
                    en.y = Math.max(-50, en.y - 30);
                    en.recalculateDirection(); // Yeni yöne doğru git
                });

                this.particles.push(new Shockwave(this.player.x, this.player.y));
            }
            return;
        }

        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key.length > 1) return;

        let key = e.key;
        if (!this.settings.caseSensitive) key = key.toLocaleLowerCase('tr-TR');

        if (this.activeEnemy) {
            if (this.activeEnemy.peekNextChar(this.settings) === key) this.fireAt(this.activeEnemy);
            else { this.logMistake(this.activeEnemy.word); SoundManager.playError(); }
        } else {
            const candidates = this.enemies.filter(en => en.peekNextChar(this.settings) === key);
            if (candidates.length > 0) {
                candidates.sort((a, b) => b.y - a.y);
                this.activeEnemy = candidates[0];
                this.fireAt(this.activeEnemy);
            } else SoundManager.playError();
        }
    }

    logMistake(word) {
        if (!this.mistakeWords.includes(word)) this.mistakeWords.push(word);
    }

    fireAt(enemy) {
        SoundManager.playShoot();
        // Her harf için sadece 1 mermi
        this.projectiles.push(new Projectile(this.player.x, this.player.y, enemy));
        enemy.hit();
        const angle = Math.atan2(enemy.y - this.player.y, enemy.x - this.player.x);
        this.player.targetAngle = angle + Math.PI / 2;

        if (enemy.isDead()) {
            SoundManager.playExplosion();
            this.spawnDebris(enemy.x, enemy.y, 20, enemy.color);

            // Patlama animasyonu ekle
            this.explosions.push(new ExplosionAnimation(enemy.x, enemy.y, enemy.size * 1.5));

            this.enemies.splice(this.enemies.indexOf(enemy), 1);
            this.activeEnemy = null;
            this.score += 10;
            scoreEl.innerText = this.score;
            if (this.spawnInterval > 400) this.spawnInterval -= 2;
            if (this.requireSpace) {
                this.waitingForSpace = true;
                const spcInd = document.getElementById('space-indicator');
                if (spcInd) spcInd.classList.remove('hidden');
            }
        } else this.spawnDebris(enemy.x, enemy.y, 3, '#999');
    }

    spawnDebris(x, y, count, color) {
        for (let i = 0; i < count; i++) this.particles.push(new Particle(x, y, color));
    }

    update(dt) {
        if (this.state !== 'PLAYING') return;

        // Tüm kelimeler kullanıldı ve ekranda düşman kalmadı mı?
        if (this.currentWordIndex >= this.pool.length && this.enemies.length === 0) {
            this.showLevelComplete();
            return;
        }

        this.spawnTimer += dt;
        if (this.spawnTimer > this.spawnInterval) {
            this.spawnTimer = 0;
            // Sadece henüz kullanılmamış kelimeler varsa spawn et
            if (this.currentWordIndex < this.pool.length) {
                const word = this.pool[this.currentWordIndex];
                this.currentWordIndex++;
                const x = Math.random() * (this.width - 150) + 75;
                // Hedef: uzay gemisinin konumu
                const targetX = this.player.x;
                const targetY = this.player.y;
                this.enemies.push(new Meteor(x, -50, word, this.speedMultiplier, targetX, targetY));
            }
        }

        this.player.update(dt);
        this.enemies.forEach(e => {
            e.update(dt);
            // Meteorun gemiye çarpıp çarpmadığını kontrol et
            const dx = e.x - this.player.x;
            const dy = e.y - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < e.radius + 30) { // 30 = gemi yarıçapı yaklaşık
                this.gameOver();
            }
        });

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            this.projectiles[i].update(dt);
            if (this.projectiles[i].remove) this.projectiles.splice(i, 1);
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(dt);
            if (this.particles[i].alpha <= 0) this.particles.splice(i, 1);
        }

        // Patlama animasyonlarını güncelle
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            this.explosions[i].update(dt);
            if (this.explosions[i].remove) this.explosions.splice(i, 1);
        }
    }

    draw() {
        ctx.fillStyle = this.state === 'PLAYING' ? 'rgba(5, 5, 16, 0.6)' : 'rgba(5, 5, 16, 1)';
        ctx.fillRect(0, 0, this.width, this.height);

        if (this.state === 'PLAYING') {
            this.player.draw(ctx);
            if (this.activeEnemy) {
                ctx.beginPath();
                ctx.moveTo(this.player.x, this.player.y);
                ctx.lineTo(this.activeEnemy.x, this.activeEnemy.y);
                ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            this.enemies.forEach(e => e.draw(ctx, e === this.activeEnemy));
            this.projectiles.forEach(p => p.draw(ctx));
            this.particles.forEach(p => p.draw(ctx));

            // Patlama animasyonlarını çiz
            this.explosions.forEach(exp => exp.draw(ctx));
        }
    }

    loop(lastTime) {
        const now = performance.now();
        const dt = now - lastTime;
        this.lastTime = now;
        this.update(dt);
        this.draw();
        requestAnimationFrame(() => this.loop(now));
    }

    gameOver() {
        this.state = 'GAMEOVER';
        finalScoreEl.innerText = this.score;
        this.showGameOver();
        SoundManager.playExplosion();
        this.waitingForSpace = false;
        const spcInd = document.getElementById('space-indicator');
        if (spcInd) spcInd.classList.add('hidden');
    }
}

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.angle = 0; // Radians
        this.targetAngle = 0;
    }

    update(dt) {
        // Smooth rotation
        const diff = this.targetAngle - this.angle;
        this.angle += diff * 0.1; // Ease factor
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Draw Image if loaded, else fallback
        if (IMG_SHIP.complete && IMG_SHIP.naturalWidth !== 0) {
            // Centered assume image is approx 60x60
            ctx.drawImage(IMG_SHIP, -30, -30, 60, 60);
        } else {
            ctx.fillStyle = '#0aff0a';
            ctx.beginPath();
            ctx.moveTo(0, -20);
            ctx.lineTo(15, 15);
            ctx.lineTo(0, 10);
            ctx.lineTo(-15, 15);
            ctx.fill();
        }
        ctx.restore();
    }
}

class Meteor {
    constructor(x, y, word, speedMult = 1, targetX, targetY) {
        this.x = x;
        this.y = y;
        this.word = word;
        this.typed = 0;

        // Hedef nokta (uzay gemisi)
        this.targetX = targetX;
        this.targetY = targetY;

        // Hareket hızı
        this.baseSpeed = (0.03 + Math.random() * 0.04) * speedMult;

        // Kelime uzunluğuna göre boyut (3-8 karakter arası normal, daha uzun/kısa olanlar farklı)
        const wordLength = word.length;
        if (wordLength <= 3) {
            this.radius = 20;
            this.size = 40;
        } else if (wordLength <= 5) {
            this.radius = 25;
            this.size = 50;
        } else if (wordLength <= 8) {
            this.radius = 30;
            this.size = 60;
        } else if (wordLength <= 12) {
            this.radius = 35;
            this.size = 70;
        } else {
            this.radius = 40;
            this.size = 80;
        }

        this.color = '#888';
        this.rotation = 0;
        this.rotSpeed = (Math.random() - 0.5) * 0.002;

        // Hareket yönü hesapla
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / distance) * this.baseSpeed;
        this.vy = (dy / distance) * this.baseSpeed;
    }

    update(dt) {
        // Hedefe doğru hareket et
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.rotation += this.rotSpeed * dt;
    }

    // Hareket yönünü yeniden hesapla (shockwave sonrası)
    recalculateDirection() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            this.vx = (dx / distance) * this.baseSpeed;
            this.vy = (dy / distance) * this.baseSpeed;
        }
    }

    draw(ctx, isActive) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw Meteor Image - Dinamik boyut
        if (IMG_METEOR.complete && IMG_METEOR.naturalWidth !== 0) {
            ctx.drawImage(IMG_METEOR, -this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            // Fallback (Polygon) if needed, but we rely on image now
            ctx.fillStyle = '#444';
            ctx.beginPath(); ctx.arc(0, 0, this.radius, 0, 6.28); ctx.fill();
        }

        // Selection Glow
        if (isActive) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = '#ff003c';
            ctx.strokeStyle = '#ff003c';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, 6.28);
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset
        }

        ctx.restore();

        // Draw Text BELOW
        ctx.font = 'bold 18px "Roboto Mono"';
        ctx.textAlign = 'center';
        const textY = this.y + 40; // Below image
        const remaining = this.word.substring(this.typed);

        if (isActive) {
            ctx.fillStyle = '#ff003c';
            ctx.font = 'bold 20px "Roboto Mono"';
        } else {
            ctx.fillStyle = '#fff';
        }
        ctx.fillText(remaining, this.x, textY);
    }

    peekNextChar(settings) {
        return this.word[this.typed];
    }

    hit() {
        this.typed++;
    }

    isDead() {
        return this.typed >= this.word.length;
    }
}

class Projectile {
    constructor(x, y, target, willKill = false, game = null) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.willKill = willKill;
        this.game = game;
        this.remove = false;
        this.hasExploded = false;
    }

    update(dt) {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;

        // Hız: 0.08 (yavaş)
        this.x += dx * 0.08;
        this.y += dy * 0.08;

        // Hedefe ulaştı mı?
        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
            // Eğer bu son mermi ise ve henüz patlamadıysa
            if (this.willKill && !this.hasExploded && this.game) {
                this.hasExploded = true;
                this.game.destroyEnemy(this.target);
            }
            this.remove = true;
        }
    }

    draw(ctx) {
        ctx.save();

        // Kuyruk (iz) - KISA gradient (10 pixel)
        const tailLength = 10; // Daha kısa kuyruk
        const gradient = ctx.createLinearGradient(
            this.x, this.y + tailLength,
            this.x, this.y
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)'); // Tamamen şeffaf
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)'); // Çok hafif
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0.6)'); // Hafif görünür

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(this.x - 1.5, this.y + tailLength); // Sol alt
        ctx.lineTo(this.x + 1.5, this.y + tailLength); // Sağ alt
        ctx.lineTo(this.x + 0.8, this.y); // Sağ üst
        ctx.lineTo(this.x - 0.8, this.y); // Sol üst
        ctx.closePath();
        ctx.fill();

        // Ana mermi gövdesi - beyaz, ince
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 6); // Üst nokta
        ctx.lineTo(this.x + 2, this.y + 2); // Sağ alt
        ctx.lineTo(this.x - 2, this.y + 2); // Sol alt
        ctx.closePath();
        ctx.fill();

        // Yuvarlak uç (parlak nokta)
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y - 4, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // İç parlama (hafif mavi)
        ctx.fillStyle = 'rgba(220, 240, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y - 3, 1.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

class Shockwave {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.maxRadius = canvas.height; // Expand to cover mostly
        this.speed = 40; // Fast expansion
        this.alpha = 1;
        this.width = 10;
    }

    update(dt) {
        this.radius += this.speed * (dt / 16);
        this.alpha -= 0.02 * (dt / 16);
        this.width -= 0.2 * (dt / 16);
    }

    draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // Deep Sky Blue
        ctx.strokeStyle = `rgba(0, 191, 255, ${this.alpha})`;
        ctx.lineWidth = Math.max(1, this.width);
        ctx.stroke();
        ctx.restore();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        const angle = Math.random() * 6.28;
        const speed = Math.random() * 5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = 0.03;
    }
    update(dt) {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        this.vx *= 0.95;
        this.vy *= 0.95;
    }
    draw(ctx) {
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 6.28);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class ExplosionAnimation {
    constructor(x, y, size = 80) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.frame = 0;
        this.maxFrame = 3;
        this.frameDuration = 100; // Her frame 100ms
        this.elapsed = 0;
        this.remove = false;
        this.images = [IMG_EXPLOSION_1, IMG_EXPLOSION_2, IMG_EXPLOSION_3];
    }

    update(dt) {
        this.elapsed += dt;
        if (this.elapsed >= this.frameDuration) {
            this.elapsed = 0;
            this.frame++;
            if (this.frame >= this.maxFrame) {
                this.remove = true;
            }
        }
    }

    draw(ctx) {
        if (this.frame < this.images.length) {
            const img = this.images[this.frame];
            if (img.complete && img.naturalWidth !== 0) {
                ctx.save();
                ctx.globalAlpha = 1;
                ctx.drawImage(img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
                ctx.restore();
            }
        }
    }
}

const game = new Game();
