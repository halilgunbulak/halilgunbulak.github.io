/**
 * MType Games - Advanced Version (Phase 4)
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

// Yardımcı fonksiyon: Ses dosyası yolu
function getSoundPath(filename) {
    if (typeof getPath === 'function') {
        return getPath('sounds/' + filename);
    }
    return 'sounds/' + filename;
}

// Yardımcı fonksiyon: Kelime sesi dosyası yolu
function getVoicePath(filename) {
    if (typeof getPath === 'function') {
        return getPath('voice/' + filename);
    }
    return 'voice/' + filename;
}

// Ses havuzları
const TYPING_POOL = [];
const EXPLOSION_POOL = [];

// Ses havuzlarını oluştur
for (let i = 0; i < SOUND_POOL_SIZE; i++) {
    const typing = new Audio(getSoundPath('typing_temp.wav'));
    typing.volume = 0.4;
    typing.load();
    TYPING_POOL.push(typing);

    const explosion = new Audio(getSoundPath('explosion.wav'));
    explosion.volume = 0.4;
    explosion.load();
    EXPLOSION_POOL.push(explosion);
}

// Eski sesler (yedek)
const SHOOT_SOUND = new Audio(getSoundPath('shoot.wav'));
SHOOT_SOUND.load();

// Background music
const BACKGROUND_MUSIC = new Audio(getSoundPath('background.mp3'));
BACKGROUND_MUSIC.loop = true;
BACKGROUND_MUSIC.volume = 0.2;
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
            // Müzik etkinse çal
            if (musicEnabled) {
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

    // Kelime sesi çal (voice klasöründen)
    static playWordSound(wordData) {
        if (!wordData || !wordData.us) {
            console.warn('No audio file for word:', wordData);
            return;
        }

        try {
            const audioPath = getVoicePath(wordData.us);
            const audio = new Audio(audioPath);
            audio.volume = 0.7; // Kelime sesleri biraz daha yüksek
            audio.play().catch(e => {
                console.warn('Could not play word audio:', wordData.word, e);
            });
        } catch (e) {
            console.warn('Error playing word audio:', wordData.word, e);
        }
    }
}

// --- Localization System ---
const TRANSLATIONS = {
    tr: {
        menuTitle: "M Dil Öğrenme - HIGames",
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
        newWordsBtn: "YENİ KELİMELERLE BAŞLAT",
        labelCurrentScore: "Mevcut Skor",
        mistakeCountLabel: "Hatalı Kelime",
        // Vocabulary Learning - Yeni Çeviriler
        labelLevelSelect: "Kelime Seviyesi",
        labelDirection: "Yazma Sırası",
        directionEnTr: "İngilizce → Türkçe",
        directionTrEn: "Türkçe → İngilizce",
        learnedTitle: "ÖĞRENİLEN KELİMELER",
        learnedCount: "Toplam Öğrenilen",
        viewLearnedBtn: "KELİMELERİMİ GÖR",
        noLearnedWords: "Henüz öğrenilen kelime yok",
        phase1Complete: "İyi! Şimdi çevirisini yaz",
        phase2Complete: "Mükemmel! Kelime öğrenildi",
        levelA1: "A1 - Başlangıç",
        levelA2: "A2 - Temel",
        levelB1: "B1 - Orta Altı",
        levelB2: "B2 - Orta Üstü",
        levelC1: "C1 - İleri",
        levelC2: "C2 - Uzman",
        wordCount: "Kelime Sayısı",
        startLearning: "ÖĞRENMEYE BAŞLA"
    },

    en: {
        menuTitle: "MLanguage - HIGAMES",
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
        newWordsBtn: "START WITH NEW WORDS",
        labelCurrentScore: "Current Score",
        mistakeCountLabel: "Mistakes",
        // Vocabulary Learning - New Translations
        labelLevelSelect: "Word Level",
        labelDirection: "Typing Order",
        directionEnTr: "English → Turkish",
        directionTrEn: "Turkish → English",
        learnedTitle: "LEARNED WORDS",
        learnedCount: "Total Learned",
        viewLearnedBtn: "VIEW MY WORDS",
        noLearnedWords: "No learned words yet",
        phase1Complete: "Good! Now type the translation",
        phase2Complete: "Perfect! Word learned",
        levelA1: "A1 - Beginner",
        levelA2: "A2 - Elementary",
        levelB1: "B1 - Intermediate",
        levelB2: "B2 - Upper Intermediate",
        levelC1: "C1 - Advanced",
        levelC2: "C2 - Proficient",
        wordCount: "Word Count",
        startLearning: "START LEARNING"
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

// --- Vocabulary Data System (Language Learning) ---
// VOCABULARY_DATA_JSON is loaded from files/vocabulary_data.js
let VOCABULARY_DATA = [];
let vocabularyLoaded = false;

// Kelime verilerini yükle
async function loadVocabulary() {
    if (vocabularyLoaded) return VOCABULARY_DATA;

    try {
        // Check if data is already loaded inline
        if (typeof VOCABULARY_DATA_JSON !== 'undefined' && VOCABULARY_DATA_JSON.length > 0) {
            VOCABULARY_DATA = VOCABULARY_DATA_JSON;
            vocabularyLoaded = true;
            console.log('✅ Kelime verisi yüklendi (inline):', VOCABULARY_DATA.length, 'kelime');
            return VOCABULARY_DATA;
        }

        // Fallback: try to fetch from JSON file (for web server environments)
        const jsonPath = typeof getPath === 'function' ? getPath('files/language_tr_en.json') : 'files/language_tr_en.json';
        console.log('📚 Kelime verisi yükleniyor (fetch):', jsonPath);
        const response = await fetch(jsonPath);
        VOCABULARY_DATA = await response.json();
        vocabularyLoaded = true;
        console.log('✅ Kelime verisi yüklendi (fetch):', VOCABULARY_DATA.length, 'kelime');

        return VOCABULARY_DATA;
    } catch (e) {
        console.error('❌ Kelime verisi yüklenemedi:', e);
        return [];
    }
}

// CEFR seviyesine göre filtreleme
function filterByLevel(words, level) {
    if (!level || level === 'all') return words;
    return words.filter(w => w.cefr && w.cefr.toLowerCase() === level.toLowerCase());
}

// Fisher-Yates shuffle algoritması
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Vocabulary Manager - Kelime işleme sınıfı
class VocabularyManager {
    static getWords(level = 'b1', count = 50) {
        const filtered = filterByLevel(VOCABULARY_DATA, level);
        const shuffled = shuffleArray(filtered);
        return shuffled.slice(0, Math.min(count, shuffled.length));
    }

    static getLevelStats() {
        const stats = {};
        ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'].forEach(level => {
            stats[level] = filterByLevel(VOCABULARY_DATA, level).length;
        });
        return stats;
    }
}

// Eski WordManager korunuyor (geriye uyumluluk için, kaldırılabilir)
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

        this.state = 'MENU'; // MENU, PLAYING, GAMEOVER, REVIEW, LEARNED
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

        // === VOCABULARY LEARNING PROPERTIES ===
        this.selectedCefrLevel = localStorage.getItem('vocab_cefr_level') || 'b1';
        this.typingDirection = localStorage.getItem('vocab_direction') || 'en-tr';
        this.learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
        this.vocabularyPool = []; // Current game's word pool (word objects)

        // UI Bindings
        startBtn.addEventListener('click', () => {
            // Read level from slider on start
            this.level = parseInt(speedSlider.value) || 4;
            // Save to localStorage
            localStorage.setItem('ztype_level', this.level);

            // Check if user selected a text (safely check if elements exist)
            const textLibrarySelect = document.getElementById('text-library-select');
            const selectVal = textLibrarySelect ? textLibrarySelect.value : 'random';
            const customText = customTextEl ? customTextEl.value.trim() : '';
            this.userSelectedText = (selectVal !== 'random' || customText.length > 0);

            this.initGame({ resetScore: true });
        });

        if (nextLevelBtn) nextLevelBtn.addEventListener('click', () => this.nextLevel());
        if (restartGameBtn) restartGameBtn.addEventListener('click', () => {
            this.initGame(true); // Restart = reset score
        });
        if (returnMenuBtn) returnMenuBtn.addEventListener('click', () => this.showMenu());
        if (reviewMistakesBtn) reviewMistakesBtn.addEventListener('click', () => this.startReview());
        if (closeReviewBtn) closeReviewBtn.addEventListener('click', () => this.showGameOver());

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

        const newWordsBtn = document.getElementById('new-words-btn');
        if (newWordsBtn) newWordsBtn.addEventListener('click', () => this.startWithNewWords());

        const levelCompleteMenuBtn = document.getElementById('level-complete-menu-btn');
        if (levelCompleteMenuBtn) levelCompleteMenuBtn.addEventListener('click', () => this.showMenu());

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

        // === VOCABULARY LEARNING UI BINDINGS ===

        // View Learned Words button
        const viewLearnedBtn = document.getElementById('view-learned-btn');
        if (viewLearnedBtn) {
            viewLearnedBtn.addEventListener('click', () => this.showLearnedWords());
        }

        // Close Learned Words screen
        const closeLearnedBtn = document.getElementById('close-learned-btn');
        if (closeLearnedBtn) {
            closeLearnedBtn.addEventListener('click', () => this.hideLearnedWords());
        }

        // Clear Learned Words
        const clearLearnedBtn = document.getElementById('clear-learned-btn');
        if (clearLearnedBtn) {
            clearLearnedBtn.addEventListener('click', () => this.clearLearnedWords());
        }

        // Learned words filter
        const learnedFilterLevel = document.getElementById('learned-filter-level');
        if (learnedFilterLevel) {
            learnedFilterLevel.addEventListener('change', (e) => this.filterLearnedWords(e.target.value));
        }

        // CEFR Level selector - save on change
        const cefrSelect = document.getElementById('cefr-level-select');
        if (cefrSelect) {
            cefrSelect.value = this.selectedCefrLevel;
            cefrSelect.addEventListener('change', (e) => {
                this.selectedCefrLevel = e.target.value;
                localStorage.setItem('vocab_cefr_level', this.selectedCefrLevel);
            });
        }

        // Direction selector - save on change
        const directionSelect = document.getElementById('direction-select');
        if (directionSelect) {
            directionSelect.value = this.typingDirection;
            directionSelect.addEventListener('change', (e) => {
                this.typingDirection = e.target.value;
                localStorage.setItem('vocab_direction', this.typingDirection);
            });
        }

        // Update learned count on load
        this.updateLearnedCount();

        window.addEventListener('keydown', (e) => this.input(e));

        this.loop(0);
    }

    getDifficulty(level) {
        // === VOCABULARY LEARNING - SLOWER SPEEDS ===
        // Speed: 0.4 base + 0.08 per level (slower than original)
        // Level 1: 0.48, Level 5: 0.8, Level 10: 1.2
        const speedMult = 0.4 + (level * 0.08);

        // Spawn Interval: Longer intervals for vocabulary learning
        // Level 1: 3500ms, Level 5: 2500ms, Level 10: 1500ms
        let interval = 4000 - (level * 250);
        if (interval < 1200) interval = 1200; // Minimum 1200ms

        // Special adjustments for early levels
        if (level === 1) interval = 3800;
        if (level === 2) interval = 3500;
        if (level === 3) interval = 3200;

        // Max meteors based on CEFR level
        const maxMeteors = this.getMaxMeteorsByLevel();

        return { speedMult, spawnInterval: interval, maxMeteors };
    }

    getMaxMeteorsByLevel() {
        const limits = {
            'a1': 2,
            'a2': 2,
            'b1': 3,
            'b2': 3,
            'c1': 4,
            'c2': 4
        };
        return limits[this.selectedCefrLevel] || 3;
    }

    setLanguage(lang) {
        this.currentLang = lang;
        DEFAULT_WORDS = lang === 'tr' ? DEFAULT_WORDS_TR : DEFAULT_WORDS_EN;

        // Load vocabulary data (async but don't block UI)
        loadVocabulary().then(() => {

            this.updateVocabularyStats();
        });

        // Update Buttons UI
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        this.updateUIStrings();
    }

    updateVocabularyStats() {
        // Update CEFR level selector options with word counts
        const stats = VocabularyManager.getLevelStats();
        const cefrSelect = document.getElementById('cefr-level-select');
        if (cefrSelect) {
            const t = TRANSLATIONS[this.currentLang];
            cefrSelect.innerHTML = `
                <option value="a1">${t.levelA1} (${stats.a1 || 0})</option>
                <option value="a2">${t.levelA2} (${stats.a2 || 0})</option>
                <option value="b1">${t.levelB1} (${stats.b1 || 0})</option>
                <option value="b2">${t.levelB2} (${stats.b2 || 0})</option>
                <option value="c1">${t.levelC1} (${stats.c1 || 0})</option>
                
            `;
           /* <option value="c2">${t.levelC2} (${stats.c2 || 0})</option>*/
            cefrSelect.value = this.selectedCefrLevel;
        }
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
            'new-words-btn': t.newWordsBtn,
            'label-current-score': t.labelCurrentScore
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
        // Populate Library Dropdown (safely check if element exists)
        const select = document.getElementById('text-library-select');
        if (!select) return; // Element doesn't exist, skip

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
        if (menuOverlay) menuOverlay.classList.remove('hidden');
        if (gameOverScreen) gameOverScreen.classList.add('hidden');
        if (reviewOverlay) reviewOverlay.classList.add('hidden');
        const pauseScreen = document.getElementById('pause-screen');
        if (pauseScreen) pauseScreen.classList.add('hidden');
        const levelCompleteScreen = document.getElementById('level-complete-screen');
        if (levelCompleteScreen) levelCompleteScreen.classList.add('hidden');
        const textSelectionScreen = document.getElementById('text-selection-screen');
        if (textSelectionScreen) textSelectionScreen.classList.add('hidden');
        const learnedWordsScreen = document.getElementById('learned-words-screen');
        if (learnedWordsScreen) learnedWordsScreen.classList.add('hidden');
        if (scoreEl) scoreEl.innerText = '0';
        if (nextLevelBtn) nextLevelBtn.classList.add('hidden');
        if (restartGameBtn) restartGameBtn.classList.remove('hidden');

        // Update learned count
        this.updateLearnedCount();

        // Arka plan müziğini başlat (ilk kez)
        SoundManager.initBackgroundMusic();
    }

    // === LEARNED WORDS SCREEN METHODS ===

    showLearnedWords() {
        this.state = 'LEARNED';
        document.getElementById('learned-words-screen').classList.remove('hidden');
        this.populateLearnedWords();
    }

    hideLearnedWords() {
        this.state = 'MENU';
        document.getElementById('learned-words-screen').classList.add('hidden');
    }

    populateLearnedWords(filterLevel = 'all') {
        const container = document.getElementById('learned-words-container');
        const totalEl = document.getElementById('learned-total');

        if (!container) return;

        let words = this.learnedWords;
        if (filterLevel !== 'all') {
            words = words.filter(w => w.level && w.level.toLowerCase() === filterLevel);
        }

        if (totalEl) {
            totalEl.innerText = `Toplam: ${words.length}`;
        }

        if (words.length === 0) {
            const t = TRANSLATIONS[this.currentLang];
            container.innerHTML = `<p class="empty-message">${t.noLearnedWords}</p>`;
            return;
        }

        // Create table
        const table = document.createElement('table');
        table.className = 'learned-words-table';
        table.innerHTML = `
            <thead>
                <tr>
                    <th>English</th>
                    <th>Türkçe</th>
                    <th>Level</th>
                </tr>
            </thead>
            <tbody>
                ${words.map(w => `
                    <tr>
                        <td>${w.en}</td>
                        <td>${w.tr}</td>
                        <td><span class="level-badge ${w.level}">${(w.level || '').toUpperCase()}</span></td>
                    </tr>
                `).join('')}
            </tbody>
        `;
        container.innerHTML = '';
        container.appendChild(table);
    }

    filterLearnedWords(level) {
        this.populateLearnedWords(level);
    }

    clearLearnedWords() {
        const t = TRANSLATIONS[this.currentLang];
        const confirmMsg = this.currentLang === 'tr'
            ? 'Tüm öğrenilen kelimeler silinecek. Emin misiniz?'
            : 'All learned words will be deleted. Are you sure?';

        if (confirm(confirmMsg)) {
            this.learnedWords = [];
            localStorage.setItem('learnedWords', '[]');
            this.updateLearnedCount();
            this.populateLearnedWords();
        }
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

        // Hatalı kelime sayısı metnini güncelle
        const t = TRANSLATIONS[this.currentLang];
        const mistakeCountDisplay = document.getElementById('mistake-count-display');
        if (mistakeCountDisplay) {
            mistakeCountDisplay.innerHTML = `${t.mistakeCountLabel}: <span id="mistake-count">${this.mistakeWords.length}</span>`;
        }

        const levelCompleteScreen = document.getElementById('level-complete-screen');
        if (levelCompleteScreen) levelCompleteScreen.classList.remove('hidden');
        if (gameOverScreen) gameOverScreen.classList.add('hidden');
        if (reviewOverlay) reviewOverlay.classList.add('hidden');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        const pauseScreen = document.getElementById('pause-screen');
        if (pauseScreen) pauseScreen.classList.add('hidden');
        const textSelectionScreen = document.getElementById('text-selection-screen');
        if (textSelectionScreen) textSelectionScreen.classList.add('hidden');

        SoundManager.playLevelUp(); // Victory sound
    }

    showMissionComplete() {
        // Eski görev tamamlama ekranı (artık kullanılmıyor, level complete kullanılıyor)
        this.showLevelComplete();
    }

    showGameOver() {
        this.state = 'GAMEOVER';
        this.cameFromGameOver = false; // Reset flag
        if (finalScoreEl) finalScoreEl.innerText = this.score;
        if (gameOverScreen) gameOverScreen.classList.remove('hidden');
        if (reviewOverlay) reviewOverlay.classList.add('hidden');
        if (menuOverlay) menuOverlay.classList.add('hidden');
        const textSelectionScreen = document.getElementById('text-selection-screen');
        if (textSelectionScreen) textSelectionScreen.classList.add('hidden');

        // Arka plan müziğini durdur
        SoundManager.stopBackgroundMusic();

        // Hatalı kelime sayısını göster
        const gameoverMistakeCountEl = document.getElementById('gameover-mistake-count');
        if (gameoverMistakeCountEl) gameoverMistakeCountEl.innerText = this.mistakeWords.length;

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

    startWithNewWords() {
        // Yeni kelimelerle başlat (aynı seviye ve ayarlarla ama farklı kelimeler)
        this.initGame({ resetScore: false, keepSettings: true, sameText: false });
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
        const pauseScreen = document.getElementById('pause-screen');
        if (pauseScreen) pauseScreen.classList.remove('hidden');
        SoundManager.pauseBackgroundMusic();
    }

    resumeGame() {
        if (this.state !== 'PAUSED') return;
        this.state = 'PLAYING';
        const pauseScreen = document.getElementById('pause-screen');
        if (pauseScreen) pauseScreen.classList.add('hidden');
        SoundManager.resumeBackgroundMusic();
    }

    gameOver() {
        this.showGameOver();
    }

    initGame(options = {}) {
        const lvlDisp = document.getElementById('level-display');
        if (lvlDisp) lvlDisp.innerText = this.level || 4;

        const isRestart = (typeof options === 'boolean') ? options : false;
        if (isRestart) options = { resetScore: true, keepSettings: true };

        if (options.resetScore === undefined) options.resetScore = true;
        if (options.keepSettings === undefined) options.keepSettings = false;

        // === VOCABULARY LEARNING GAME SETUP ===

        // Read settings from UI
        const cefrSelect = document.getElementById('cefr-level-select');
        const directionSelect = document.getElementById('direction-select');
        const wordCountSelect = document.getElementById('word-count-select');

        if (cefrSelect) {
            this.selectedCefrLevel = cefrSelect.value;
            localStorage.setItem('vocab_cefr_level', this.selectedCefrLevel);
        }

        if (directionSelect) {
            this.typingDirection = directionSelect.value;
            localStorage.setItem('vocab_direction', this.typingDirection);
        }

        const wordCount = wordCountSelect ? parseInt(wordCountSelect.value) : 30;

        // Get speed/level from slider
        if (!this.level) this.level = parseInt(speedSlider.value) || 4;
        const diff = this.getDifficulty(this.level);
        this.speedMultiplier = diff.speedMult;
        this.spawnInterval = diff.spawnInterval;
        this.baseSpawnInterval = diff.spawnInterval;
        this.maxMeteors = diff.maxMeteors;

        // If sameText option, reuse existing pool
        if (options.sameText && this.vocabularyPool && this.vocabularyPool.length > 0) {
            this.currentWordIndex = 0;
        } else {
            // Load vocabulary for selected CEFR level
            this.vocabularyPool = VocabularyManager.getWords(this.selectedCefrLevel, wordCount);
            this.currentWordIndex = 0;

            if (this.vocabularyPool.length === 0) {
                console.warn('No vocabulary found for level:', this.selectedCefrLevel);
                // Fallback: try loading all words
                this.vocabularyPool = shuffleArray(VOCABULARY_DATA).slice(0, wordCount);
            }

            console.log(`Loaded ${this.vocabularyPool.length} words for level ${this.selectedCefrLevel}`);
        }

        // No space requirement in vocabulary learning mode
        this.requireSpace = false;

        this.player = new Player(this.width / 2, this.height - 50);
        this.enemies = [];
        this.particles = [];
        this.projectiles = [];
        this.explosions = []; // Patlama animasyonları
        if (options.resetScore) {
            this.score = 0;
            if (scoreEl) scoreEl.innerText = '0';
        }
        this.spawnTimer = 0;
        this.activeEnemy = null;
        this.mistakeWords = [];
        this.waitingForSpace = false;
        this.state = 'PLAYING';

        if (menuOverlay) menuOverlay.classList.add('hidden');
        if (gameOverScreen) gameOverScreen.classList.add('hidden');
        if (reviewOverlay) reviewOverlay.classList.add('hidden');
        const pauseScreen = document.getElementById('pause-screen');
        if (pauseScreen) pauseScreen.classList.add('hidden');
        const levelCompleteScreen = document.getElementById('level-complete-screen');
        if (levelCompleteScreen) levelCompleteScreen.classList.add('hidden');
        const textSelectionScreen = document.getElementById('text-selection-screen');
        if (textSelectionScreen) textSelectionScreen.classList.add('hidden');

        const t = TRANSLATIONS[this.currentLang];
        document.getElementById('go-title').innerText = t.goTitle;
        if (nextLevelBtn) nextLevelBtn.classList.add('hidden');
        const nextMisBtn = document.getElementById('next-mission-btn');
        if (nextMisBtn) nextMisBtn.classList.add('hidden');
        if (restartGameBtn) restartGameBtn.classList.remove('hidden');

        // Arka plan müziğini başlat
        SoundManager.startBackgroundMusic();
    }

    startReview() {
        this.state = 'REVIEW';
        this.reviewIndex = 0;
        if (reviewOverlay) reviewOverlay.classList.remove('hidden');
        if (gameOverScreen) gameOverScreen.classList.add('hidden');
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

        // Always case insensitive for vocabulary learning
        let key = e.key.toLocaleLowerCase('tr-TR');

        if (this.activeEnemy) {
            if (this.activeEnemy.peekNextChar(this.settings) === key) {
                this.fireAt(this.activeEnemy);
            } else {
                this.activeEnemy.markMistake();
                this.logMistake(this.activeEnemy.wordData);
                SoundManager.playError();
            }
        } else {
            const candidates = this.enemies.filter(en => en.peekNextChar(this.settings) === key);
            if (candidates.length > 0) {
                candidates.sort((a, b) => b.y - a.y);
                this.activeEnemy = candidates[0];
                this.fireAt(this.activeEnemy);
            } else {
                SoundManager.playError();
            }
        }
    }

    logMistake(wordData) {
        // Log the word object, not just string
        if (!this.mistakeWords.find(w => w.id === wordData.id)) {
            this.mistakeWords.push(wordData);
        }
    }

    addLearnedWord(wordData) {
        const entry = {
            id: wordData.id,
            en: wordData.word,
            tr: wordData.kelime,
            level: wordData.cefr,
            type: wordData.type,
            date: Date.now()
        };

        // Don't add duplicates
        if (!this.learnedWords.find(w => w.id === entry.id)) {
            this.learnedWords.push(entry);
            localStorage.setItem('learnedWords', JSON.stringify(this.learnedWords));
            this.updateLearnedCount();
        }
    }

    updateLearnedCount() {
        const countEl = document.getElementById('learned-count-value');
        if (countEl) {
            countEl.innerText = this.learnedWords.length;
        }
    }

    fireAt(enemy) {
        SoundManager.playShoot();
        this.projectiles.push(new Projectile(this.player.x, this.player.y, enemy));
        enemy.hit();
        const angle = Math.atan2(enemy.y - this.player.y, enemy.x - this.player.x);
        this.player.targetAngle = angle + Math.PI / 2;

        // Check if phase is complete
        if (enemy.isPhaseComplete()) {
            if (enemy.phase === 1) {
                // Advance to phase 2
                enemy.advancePhase();
                this.score += 5; // Phase 1 points
                if (scoreEl) scoreEl.innerText = this.score;

                // Visual feedback for phase transition
                this.spawnDebris(enemy.x, enemy.y, 10, '#00f3ff');

                // Show phase transition message briefly
                this.showPhaseMessage(1);
            } else if (enemy.isDead()) {
                // Fully complete - word learned!
                SoundManager.playExplosion();

                // Kelimenin sesini çal (İngilizce telaffuz)
                SoundManager.playWordSound(enemy.wordData);

                this.spawnDebris(enemy.x, enemy.y, 20, '#ff9f00');
                this.explosions.push(new ExplosionAnimation(enemy.x, enemy.y, enemy.originalSize * 1.5));

                this.enemies.splice(this.enemies.indexOf(enemy), 1);
                this.activeEnemy = null;

                // Score for phase 2 + bonus
                this.score += enemy.getScore();
                if (scoreEl) scoreEl.innerText = this.score;

                // Add to learned words
                this.addLearnedWord(enemy.wordData);

                // Show completion message
                this.showPhaseMessage(2);
            }
        } else {
            this.spawnDebris(enemy.x, enemy.y, 3, '#999');
        }
    }

    showPhaseMessage(phase) {
        const t = TRANSLATIONS[this.currentLang];
        const msg = phase === 1 ? t.phase1Complete : t.phase2Complete;

        // Create floating message
        const el = document.createElement('div');
        el.className = 'phase-message';
        el.innerText = msg;
        el.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: ${phase === 1 ? '#00f3ff' : '#ff9f00'};
            font-size: 24px;
            font-weight: bold;
            text-shadow: 0 0 10px currentColor;
            z-index: 1000;
            pointer-events: none;
            animation: fadeUp 1s ease-out forwards;
        `;
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
    }

    spawnDebris(x, y, count, color) {
        for (let i = 0; i < count; i++) this.particles.push(new Particle(x, y, color));
    }

    update(dt) {
        if (this.state !== 'PLAYING') return;

        // Check if all words used and no enemies left
        if (this.currentWordIndex >= this.vocabularyPool.length && this.enemies.length === 0) {
            this.showLevelComplete();
            return;
        }

        this.spawnTimer += dt;
        if (this.spawnTimer > this.spawnInterval) {
            this.spawnTimer = 0;

            // Only spawn if: 
            // 1. There are words left
            // 2. We haven't hit max meteor limit
            if (this.currentWordIndex < this.vocabularyPool.length &&
                this.enemies.length < this.maxMeteors) {

                const wordData = this.vocabularyPool[this.currentWordIndex];
                this.currentWordIndex++;
                const x = Math.random() * (this.width - 150) + 75;
                const targetX = this.player.x;
                const targetY = this.player.y;

                // Create meteor with word data and typing direction
                this.enemies.push(new Meteor(
                    x, -50,
                    wordData,
                    this.speedMultiplier,
                    targetX, targetY,
                    this.typingDirection
                ));
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
        if (finalScoreEl) finalScoreEl.innerText = this.score;
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
    constructor(x, y, wordData, speedMult = 1, targetX, targetY, direction = 'en-tr') {
        this.x = x;
        this.y = y;

        // Vocabulary data (full object from JSON)
        this.wordData = wordData;
        this.wordEN = wordData.word || '';
        this.wordTR = wordData.kelime || '';

        // Typing direction: 'en-tr' = English first, then Turkish
        this.direction = direction;

        // Two-phase system
        this.phase = 1; // 1: first language, 2: second language
        this.halfDestroyed = false;

        // Set active word based on phase and direction
        if (direction === 'en-tr') {
            this.word = this.wordEN;
            this.secondWord = this.wordTR;
        } else {
            this.word = this.wordTR;
            this.secondWord = this.wordEN;
        }

        this.typed = 0;
        this.hadMistake = false; // Track if any mistake was made

        // Target point (spaceship)
        this.targetX = targetX;
        this.targetY = targetY;

        // Movement speed - SLOWED DOWN for vocabulary learning
        this.baseSpeed = (0.02 + Math.random() * 0.025) * speedMult;

        // Size based on combined word length
        const totalLength = this.wordEN.length + this.wordTR.length;
        if (totalLength <= 8) {
            this.radius = 25;
            this.size = 50;
            this.originalSize = 50;
        } else if (totalLength <= 14) {
            this.radius = 30;
            this.size = 60;
            this.originalSize = 60;
        } else if (totalLength <= 20) {
            this.radius = 35;
            this.size = 70;
            this.originalSize = 70;
        } else {
            this.radius = 40;
            this.size = 80;
            this.originalSize = 80;
        }

        this.color = '#888';
        this.rotation = 0;
        this.rotSpeed = (Math.random() - 0.5) * 0.002;

        // Calculate movement direction
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        this.vx = (dx / distance) * this.baseSpeed;
        this.vy = (dy / distance) * this.baseSpeed;
    }

    update(dt) {
        // Move towards target
        this.x += this.vx * dt;
        this.y += this.vy * dt;
        this.rotation += this.rotSpeed * dt;
    }

    // Recalculate direction (after shockwave)
    recalculateDirection() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 0) {
            this.vx = (dx / distance) * this.baseSpeed;
            this.vy = (dy / distance) * this.baseSpeed;
        }
    }

    // Advance to phase 2 (after completing first word)
    advancePhase() {
        if (this.phase === 1) {
            this.phase = 2;
            this.typed = 0;
            this.halfDestroyed = true;

            // Switch to second word
            this.word = this.secondWord;

            // Shrink meteor visually
            this.size = this.originalSize * 0.6;
            this.radius = this.radius * 0.6;

            return 'phase_complete';
        }
        return 'word_complete';
    }

    draw(ctx, isActive) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // If half destroyed, reduce opacity
        if (this.halfDestroyed) {
            ctx.globalAlpha = 0.7;
        }

        // Draw Meteor Image
        if (IMG_METEOR.complete && IMG_METEOR.naturalWidth !== 0) {
            ctx.drawImage(IMG_METEOR, -this.size / 2, -this.size / 2, this.size, this.size);
        } else {
            ctx.fillStyle = '#444';
            ctx.beginPath(); ctx.arc(0, 0, this.radius, 0, 6.28); ctx.fill();
        }

        // Selection Glow
        if (isActive) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = this.phase === 1 ? '#00f3ff' : '#ff003c';
            ctx.strokeStyle = this.phase === 1 ? '#00f3ff' : '#ff003c';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2 + 5, 0, 6.28);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        ctx.globalAlpha = 1;
        ctx.restore();

        // Draw Text BELOW meteor
        ctx.textAlign = 'center';
        const textY = this.y + this.size / 2 + 20;

        // Phase indicator
        const phaseIcon = this.phase === 1 ? '①' : '②';
        const phaseColor = this.phase === 1 ? '#00f3ff' : '#ff9f00';

        // Remaining text to type
        const remaining = this.word.substring(this.typed);
        const typed = this.word.substring(0, this.typed);

        if (isActive) {
            // Show typed letters in green, remaining in highlight color
            ctx.font = 'bold 20px "Roboto Mono"';

            // Typed part (green)
            if (typed.length > 0) {
                ctx.fillStyle = '#00ff00';
                const typedWidth = ctx.measureText(typed).width;
                const remainingWidth = ctx.measureText(remaining).width;
                const totalWidth = typedWidth + remainingWidth;
                ctx.fillText(typed, this.x - totalWidth / 2 + typedWidth / 2, textY);

                // Remaining part
                ctx.fillStyle = phaseColor;
                ctx.fillText(remaining, this.x - totalWidth / 2 + typedWidth + remainingWidth / 2, textY);
            } else {
                ctx.fillStyle = phaseColor;
                ctx.fillText(remaining, this.x, textY);
            }

            // Phase indicator above
            ctx.font = 'bold 14px "Roboto Mono"';
            ctx.fillStyle = phaseColor;
            ctx.fillText(phaseIcon, this.x, this.y - this.size / 2 - 10);
        } else {
            ctx.font = 'bold 18px "Roboto Mono"';
            ctx.fillStyle = '#fff';
            ctx.fillText(remaining, this.x, textY);

            // Phase indicator
            ctx.font = 'bold 12px "Roboto Mono"';
            ctx.fillStyle = '#888';
            ctx.fillText(phaseIcon, this.x, this.y - this.size / 2 - 8);
        }
    }

    peekNextChar(settings) {
        const char = this.word[this.typed];
        // Always case insensitive for vocabulary learning
        return char ? char.toLocaleLowerCase('tr-TR') : null;
    }

    hit() {
        this.typed++;
    }

    markMistake() {
        this.hadMistake = true;
    }

    isPhaseComplete() {
        return this.typed >= this.word.length;
    }

    isDead() {
        return this.phase === 2 && this.typed >= this.word.length;
    }

    // Get score based on phase and mistakes
    getScore() {
        if (this.phase === 1) {
            return 5; // Phase 1 completion
        } else {
            let score = 10; // Phase 2 base
            if (!this.hadMistake) {
                score += 5; // Perfect bonus
            }
            return score;
        }
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
