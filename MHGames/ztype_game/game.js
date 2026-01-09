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
    speedSlider.addEventListener('input', (e) => {
        speedValue.innerText = e.target.value;
    });
}

// --- Audio System (File Based) ---
const SHOOT_SOUND = new Audio('sounds/shoot.wav');
const EXPLOSION_SOUND = new Audio('sounds/explosion.wav');

// Preload
SHOOT_SOUND.load();
EXPLOSION_SOUND.load();

class SoundManager {
    static playShoot() {
        // Clone to allow overlapping sounds
        const s = SHOOT_SOUND.cloneNode();
        s.volume = 0.3;
        s.play().catch(e => console.log("Audio play failed", e));
    }

    static playExplosion() {
        const s = EXPLOSION_SOUND.cloneNode();
        s.volume = 0.4;
        s.play().catch(e => console.log("Audio play failed", e));
    }

    static playError() {
        // Simple synth fallback for error or just ignore
        // Or load error.wav if we had one. 
        // Let's use a tiny synth beep or silence for now to keep it simple pure file based?
        // Or just re-use synth for error? User specifically asked for Shoot/Explosion as files.
        // Let's create a minimal oscillator for Error just in case, or ignore.
        // I will allow simple beep.
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = 150;
        gain.gain.value = 0.1;
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    }
}

// --- Localization System ---
const TRANSLATIONS = {
    tr: {
        menuTitle: "Z-TYPE KLONU",
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
        menuBtn: "MENÜ"
    },

    en: {
        menuTitle: "Z-TYPE CLONE",
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
        menuBtn: "MENU"
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
        this.level = 2; // Default Level
        this.speedMultiplier = 1;
        this.baseSpawnInterval = 2000;

        // UI Bindings
        startBtn.addEventListener('click', () => {
            // Read level from slider on start
            this.level = parseInt(speedSlider.value) || 2;
            this.initGame();
        });
        nextLevelBtn.addEventListener('click', () => this.nextLevel());
        restartGameBtn.addEventListener('click', () => {
            this.initGame(true);
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

        // Initial language update
        this.setLanguage('tr');

        window.addEventListener('keydown', (e) => this.input(e));

        this.loop(0);
    }

    getDifficulty(level) {
        // Speed: 0.7 base + 0.15 per level
        // Level 1: 0.85, Level 10: 2.2
        const speedMult = 0.7 + (level * 0.15);

        // Spawn Interval: Non-linear decrease
        // Level 1: 2500, Level 2: 2200, Level 10: 600
        // Formula: 2800 - (level * 250) but clamped
        // Improve Curve: Large steps at even levels
        let interval = 2800 - (level * 220);
        if (interval < 600) interval = 600;

        // Tune specific levels for "Step" feel
        // Level 2 (Default): ~2360 -> Set to 2200
        if (level === 2) interval = 2200;

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
            console.error("Metin kütüphanesi yüklenemedi / Failed to load missions:", e);
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
            'next-level-btn': t.nextLevelBtn
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
        scoreEl.innerText = '0';
        nextLevelBtn.classList.add('hidden');
        restartGameBtn.classList.remove('hidden');
        // Reset speed slider display if needed, but let's keep it as is
    }

    showMissionComplete() {
        // Stop current game loop or Input? State is GAMEOVER-ish
        this.state = 'GAMEOVER';
        finalScoreEl.innerText = this.score;
        gameOverScreen.classList.remove('hidden');
        reviewOverlay.classList.add('hidden');
        menuOverlay.classList.add('hidden');

        const t = TRANSLATIONS[this.currentLang];
        document.getElementById('go-title').innerText = t.completeTitle;

        // Show Next Level button, Hide Restart (or keep both?)
        // User asked for "Level Logic", so presumably Next Level is the main action
        nextLevelBtn.classList.remove('hidden');
        restartGameBtn.classList.remove('hidden'); // allow restart same level info

        SoundManager.playShoot(); // Victory sound?
    }

    showGameOver() {
        this.state = 'GAMEOVER';
        finalScoreEl.innerText = this.score;
        gameOverScreen.classList.remove('hidden');
        reviewOverlay.classList.add('hidden');
        menuOverlay.classList.add('hidden');

        // Disable Review button if no mistakes
        const t = TRANSLATIONS[this.currentLang];
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
        this.initGame(true); // Restart with new settings
    }

    initGame(isRestart = false) {
        // Parse settings only if coming from menu, else keep same
        if (!isRestart) {
            this.settings = {
                caseSensitive: checkCase.checked,
                punctuation: checkPunc.checked,
                numbers: checkNums.checked
            };

            // Level handling
            if (!this.level) this.level = parseInt(speedSlider.value) || 2;

            // Algorithmic Difficulty
            const diff = this.getDifficulty(this.level);
            this.speedMultiplier = diff.speedMult;
            this.spawnInterval = diff.spawnInterval;
            this.baseSpawnInterval = diff.spawnInterval; // Remember starting interval

            const rawTextCustom = customTextEl.value;
            const selectVal = document.getElementById('text-library-select').value;

            let sourceText = "";

            if (rawTextCustom.trim().length > 0) {
                sourceText = rawTextCustom;
            } else if (selectVal !== 'random' && TEXT_LIBRARY[selectVal]) {
                sourceText = TEXT_LIBRARY[selectVal].text;
            }

            this.pool = WordManager.process(sourceText, this.settings);
            if (this.pool.length === 0) this.pool = DEFAULT_WORDS; // Fallback

            this.currentWordIndex = 0; // Reset index

            // Read new setting
            const reqSpaceEl = document.getElementById('require-space');
            this.requireSpace = reqSpaceEl ? reqSpaceEl.checked : false;
        } else {
            this.currentWordIndex = 0; // Reset order on restart too
            // Keep this.pool and this.settings
        }

        this.player = new Player(this.width / 2, this.height - 50);
        this.enemies = [];
        this.particles = [];
        this.projectiles = [];
        this.score = 0;
        this.spawnTimer = 0;
        this.spawnInterval = 2000;
        this.activeEnemy = null;
        this.mistakeWords = [];

        this.waitingForSpace = false;
        this.spaceIndicatorEl = document.getElementById('space-indicator');

        this.state = 'PLAYING';
        menuOverlay.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        reviewOverlay.classList.add('hidden');
        scoreEl.innerText = '0';

        // Reset Game Over title to failure
        const t = TRANSLATIONS[this.currentLang];
        document.getElementById('go-title').innerText = t.goTitle;
        nextLevelBtn.classList.add('hidden');
        restartGameBtn.classList.remove('hidden');

        // Audio init removed here as SoundManager handles it lazily or on load
        // audio.playTone(0, 'sine', 0, 0);
    }

    startReview() {
        this.state = 'REVIEW';
        this.reviewIndex = 0;
        reviewOverlay.classList.remove('hidden');
        gameOverScreen.classList.add('hidden');
        this.showReviewWord();
    }

    showReviewWord() {
        if (this.reviewIndex < this.mistakeWords.length) {
            reviewWordEl.innerText = this.mistakeWords[this.reviewIndex];
        } else {
            // Done
            reviewWordEl.innerText = TRANSLATIONS[this.currentLang].revComplete;
        }
    }

    input(e) {
        // ESC key to return to menu during game
        if (e.key === 'Escape') {
            this.showMenu();
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

        // Space Mechanic Logic
        if (this.waitingForSpace) {
            if (e.code === 'Space') {
                this.waitingForSpace = false;
                this.spaceIndicatorEl.classList.add('hidden');

                // PUSHBACK MECHANIC
                this.enemies.forEach(en => {
                    en.y = Math.max(-50, en.y - 20); // Move up 20px
                });

                // Visual Effect
                this.particles.push(new Shockwave(this.player.x, this.player.y));
            }
            return;
        }

        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key.length > 1) return;

        let key = e.key;
        if (!this.settings.caseSensitive) {
            key = key.toLocaleLowerCase('tr-TR');
        }

        if (this.activeEnemy) {
            if (this.activeEnemy.peekNextChar(this.settings) === key) {
                this.fireAt(this.activeEnemy);
            } else {
                this.logMistake(this.activeEnemy.word);
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

    logMistake(word) {
        if (!this.mistakeWords.includes(word)) {
            this.mistakeWords.push(word);
        }
    }

    fireAt(enemy) {
        SoundManager.playShoot();
        this.projectiles.push(new Projectile(this.player.x, this.player.y, enemy));
        enemy.hit();

        const angle = Math.atan2(enemy.y - this.player.y, enemy.x - this.player.x);
        this.player.targetAngle = angle + Math.PI / 2;

        if (enemy.isDead()) {
            SoundManager.playExplosion();
            this.spawnDebris(enemy.x, enemy.y, 20, enemy.color);
            this.enemies.splice(this.enemies.indexOf(enemy), 1);
            this.activeEnemy = null;

            this.score += 10;
            scoreEl.innerText = this.score;

            // Damped acceleration: decrease interval by 2ms instead of 20ms
            if (this.spawnInterval > 400) this.spawnInterval -= 2;

            if (this.requireSpace) {
                this.waitingForSpace = true;
                this.spaceIndicatorEl.classList.remove('hidden');
            }
        } else {
            this.spawnDebris(enemy.x, enemy.y, 3, '#999');
        }
    }

    spawnDebris(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(x, y, color));
        }
    }

    update(dt) {
        if (this.state !== 'PLAYING') return;

        // Check for mission complete
        if (this.pool.length === 0 && this.enemies.length === 0 && this.state === 'PLAYING') {
            this.showMissionComplete();
            return;
        }

        this.spawnTimer += dt;
        if (this.spawnTimer > this.spawnInterval) {
            this.spawnTimer = 0;
            if (this.pool.length > 0) {
                const word = this.pool[this.currentWordIndex];
                this.currentWordIndex = (this.currentWordIndex + 1) % this.pool.length;
                const x = Math.random() * (this.width - 150) + 75;
                this.enemies.push(new Meteor(x, -50, word, this.speedMultiplier));
            }
        }

        this.player.update(dt);

        this.enemies.forEach(e => {
            e.update(dt);
            if (e.y > this.height - 50) this.gameOver();
        });

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            this.projectiles[i].update(dt);
            if (this.projectiles[i].remove) this.projectiles.splice(i, 1);
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update(dt);
            if (this.particles[i].alpha <= 0) this.particles.splice(i, 1);
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
        }
    }

    loop(lastTime) {
        const now = performance.now();
        const dt = now - lastTime;
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
        this.spaceIndicatorEl.classList.add('hidden');
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
    constructor(x, y, word, speedMult = 1) {
        this.x = x;
        this.y = y;
        this.word = word;
        this.typed = 0;
        this.speed = (0.03 + Math.random() * 0.04) * speedMult;
        this.radius = 25; // Image size approx
        this.color = '#888';
        this.rotation = 0;
        this.rotSpeed = (Math.random() - 0.5) * 0.002;
    }

    update(dt) {
        this.y += this.speed * dt;
        this.rotation += this.rotSpeed * dt;
    }

    draw(ctx, isActive) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        // Draw Meteor Image
        if (IMG_METEOR.complete && IMG_METEOR.naturalWidth !== 0) {
            const size = 60; // Size of meteor
            ctx.drawImage(IMG_METEOR, -size / 2, -size / 2, size, size);
        } else {
            // Fallback (Polygon) if needed, but we rely on image now
            ctx.fillStyle = '#444';
            ctx.beginPath(); ctx.arc(0, 0, 20, 0, 6.28); ctx.fill();
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
    constructor(x, y, target) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.remove = false;
    }

    update(dt) {
        const dx = this.target.x - this.x;
        const dy = this.target.y - this.y;
        this.x += dx * 0.15;
        this.y += dy * 0.15;

        if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
            this.remove = true;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 10);
        ctx.strokeStyle = '#0aff0a';
        ctx.lineWidth = 3;
        ctx.stroke();
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

const game = new Game();
