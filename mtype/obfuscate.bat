@echo off
REM JavaScript Obfuscation Script for Windows
REM Bu script dosyalarınızı otomatik olarak obfuscate eder

echo.
echo ============================================
echo   JavaScript Obfuscation Baslıyor...
echo ============================================
echo.

REM Yedek klasörü oluştur
set BACKUP_DIR=backup_%date:~-4%%date:~-7,2%%date:~-10,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set BACKUP_DIR=%BACKUP_DIR: =0%
mkdir "%BACKUP_DIR%"

echo [YEDEK] Dosyalar yedekleniyor...
copy game.js "%BACKUP_DIR%\" >nul
copy missions_tr.js "%BACKUP_DIR%\" >nul
copy missions_en.js "%BACKUP_DIR%\" >nul
echo [OK] Yedek alindi: %BACKUP_DIR%
echo.

REM NPM paketini kontrol et
where javascript-obfuscator >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [UYARI] javascript-obfuscator bulunamadi. Yukleniyor...
    call npm install -g javascript-obfuscator
    echo.
)

REM Obfuscation ayarları
set OPTIONS=--compact true --control-flow-flattening true --dead-code-injection true --debug-protection false --disable-console-output true --string-array true --string-array-encoding base64 --string-array-threshold 0.75 --split-strings true --split-strings-chunk-length 10

REM game.js obfuscate
echo [ISLEM] game.js obfuscate ediliyor...
call javascript-obfuscator game.js --output game.obf.js %OPTIONS%
if %ERRORLEVEL% EQU 0 (
    move /Y game.obf.js game.js >nul
    echo [OK] game.js obfuscate edildi
) else (
    echo [HATA] game.js obfuscate edilemedi
)
echo.

REM missions_tr.js obfuscate
echo [ISLEM] missions_tr.js obfuscate ediliyor...
call javascript-obfuscator missions_tr.js --output missions_tr.obf.js %OPTIONS%
if %ERRORLEVEL% EQU 0 (
    move /Y missions_tr.obf.js missions_tr.js >nul
    echo [OK] missions_tr.js obfuscate edildi
) else (
    echo [HATA] missions_tr.js obfuscate edilemedi
)
echo.

REM missions_en.js obfuscate
echo [ISLEM] missions_en.js obfuscate ediliyor...
call javascript-obfuscator missions_en.js --output missions_en.obf.js %OPTIONS%
if %ERRORLEVEL% EQU 0 (
    move /Y missions_en.obf.js missions_en.js >nul
    echo [OK] missions_en.js obfuscate edildi
) else (
    echo [HATA] missions_en.js obfuscate edilemedi
)
echo.

echo ============================================
echo   Obfuscation tamamlandi!
echo ============================================
echo.
echo Orijinal dosyalar: %BACKUP_DIR%
echo.
echo UYARI: Obfuscate edilmis dosyalari test edin!
echo UYARI: Sorun varsa yedek klasoründen geri yukleyin.
echo.
pause

