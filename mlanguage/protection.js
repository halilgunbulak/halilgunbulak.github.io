/**
 * Basic Protection Layer
 * Bu dosya temel koruma önlemleri içerir
 */

(function () {
    'use strict';
    // 1. Sağ Tık Engelleme
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // 2. Kopyalama Engelleme
    document.addEventListener('copy', function (e) {
        e.preventDefault();
        return false;
    });

    // 3. Kesme Engelleme
    document.addEventListener('cut', function (e) {
        e.preventDefault();
        return false;
    });

    // 4. Seçim Engelleme (CSS ile de yapılacak)
    document.addEventListener('selectstart', function (e) {
        e.preventDefault();
        return false;
    });

    // 5. Klavye Kısayolları Engelleme
    document.addEventListener('keydown', function (e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U engelleme
        if (
            e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.keyCode === 85) || // Ctrl+U
            (e.ctrlKey && e.keyCode === 83) || // Ctrl+S
            (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
            (e.metaKey && e.altKey && e.keyCode === 73) || // Cmd+Option+I (Mac)
            (e.metaKey && e.altKey && e.keyCode === 74) // Cmd+Option+J (Mac)
        ) {
            e.preventDefault();
            return false;
        }
    });

    // 6. DevTools Açık mı Kontrolü
    let devtoolsOpen = false;
    const threshold = 160;

    const checkDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;

        if (widthThreshold || heightThreshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // DevTools açıldığında yapılacak işlem
                document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:Arial;font-size:24px;color:#ff003c;">⚠️ Developer Tools Detected</div>';
            }
        } else {
            devtoolsOpen = false;
        }
    };

    // Her 1 saniyede bir kontrol et
    setInterval(checkDevTools, 1000);

    // 7. Konsol Mesajları Temizleme
    setInterval(() => {
        console.clear();
    }, 2000);

    // 8. Konsol Fonksiyonlarını Devre Dışı Bırakma
    const disableConsole = () => {
        const noop = () => { };
        const methods = ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir', 'dirxml', 'group', 'groupCollapsed', 'groupEnd', 'clear', 'count', 'countReset', 'assert', 'profile', 'profileEnd', 'time', 'timeLog', 'timeEnd', 'timeStamp'];

        methods.forEach(method => {
            console[method] = noop;
        });
    };

    // Konsolu devre dışı bırak
    disableConsole();

    // 9. Debugger Tuzağı (Opsiyonel - agresif)
    // setInterval(() => {
    //     debugger;
    // }, 100);

    // 10. Sayfa Kaynağını Görüntüleme Engelleme
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && (e.keyCode === 83 || e.keyCode === 80)) { // Ctrl+S, Ctrl+P
            e.preventDefault();
            return false;
        }
    });

    // 11. Drag & Drop Engelleme
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // 12. Görsel Sürükleme Engelleme
    document.addEventListener('drag', function (e) {
        e.preventDefault();
        return false;
    });

    // 13. Sayfa Yüklendiğinde Uyarı
    console.log('%c⚠️ UYARI!', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cBu konsolu kullanmak sitenize zarar verebilir!', 'color: red; font-size: 20px;');
    console.log('%cBilinmeyen kodları buraya yapıştırmayın!', 'color: red; font-size: 20px;');
})();

