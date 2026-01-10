#!/bin/bash

# JavaScript Obfuscation Script
# Bu script dosyalarınızı otomatik olarak obfuscate eder

echo "🔒 JavaScript Obfuscation Başlıyor..."
echo ""

# Renk kodları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Yedek klasörü oluştur
BACKUP_DIR="backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo -e "${YELLOW}📦 Yedek alınıyor...${NC}"
cp game.js "$BACKUP_DIR/"
cp missions_tr.js "$BACKUP_DIR/"
cp missions_en.js "$BACKUP_DIR/"
echo -e "${GREEN}✅ Yedek alındı: $BACKUP_DIR${NC}"
echo ""

# NPM paketini kontrol et
if ! command -v javascript-obfuscator &> /dev/null
then
    echo -e "${YELLOW}⚠️  javascript-obfuscator bulunamadı. Yükleniyor...${NC}"
    npm install -g javascript-obfuscator
    echo ""
fi

# Obfuscation ayarları
OPTIONS="--compact true --control-flow-flattening true --dead-code-injection true --debug-protection false --disable-console-output true --string-array true --string-array-encoding base64 --string-array-threshold 0.75 --split-strings true --split-strings-chunk-length 10"

# game.js obfuscate
echo -e "${YELLOW}🔄 game.js obfuscate ediliyor...${NC}"
javascript-obfuscator game.js --output game.obf.js $OPTIONS
if [ $? -eq 0 ]; then
    mv game.obf.js game.js
    echo -e "${GREEN}✅ game.js obfuscate edildi${NC}"
else
    echo -e "${RED}❌ game.js obfuscate edilemedi${NC}"
fi
echo ""

# missions_tr.js obfuscate
echo -e "${YELLOW}🔄 missions_tr.js obfuscate ediliyor...${NC}"
javascript-obfuscator missions_tr.js --output missions_tr.obf.js $OPTIONS
if [ $? -eq 0 ]; then
    mv missions_tr.obf.js missions_tr.js
    echo -e "${GREEN}✅ missions_tr.js obfuscate edildi${NC}"
else
    echo -e "${RED}❌ missions_tr.js obfuscate edilemedi${NC}"
fi
echo ""

# missions_en.js obfuscate
echo -e "${YELLOW}🔄 missions_en.js obfuscate ediliyor...${NC}"
javascript-obfuscator missions_en.js --output missions_en.obf.js $OPTIONS
if [ $? -eq 0 ]; then
    mv missions_en.obf.js missions_en.js
    echo -e "${GREEN}✅ missions_en.js obfuscate edildi${NC}"
else
    echo -e "${RED}❌ missions_en.js obfuscate edilemedi${NC}"
fi
echo ""

echo -e "${GREEN}🎉 Obfuscation tamamlandı!${NC}"
echo -e "${YELLOW}📁 Orijinal dosyalar: $BACKUP_DIR${NC}"
echo ""
echo -e "${YELLOW}⚠️  NOT: Obfuscate edilmiş dosyaları test edin!${NC}"
echo -e "${YELLOW}⚠️  Sorun varsa yedek klasöründen geri yükleyin.${NC}"

