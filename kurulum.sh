#!/bin/bash

# Mustafa Sağbil Portföy - Kurulum Scripti
# Bu script yukleme_yap komutunu sistem genelinde kullanılabilir hale getirir

echo "🔧 Portföy kurulum scripti çalıştırılıyor..."

# Mevcut dizini al
CURRENT_DIR="$(pwd)"

# .bashrc veya .zshrc dosyasını bul
if [ -f "$HOME/.zshrc" ]; then
    SHELL_RC="$HOME/.zshrc"
    echo "📝 .zshrc dosyası bulundu"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_RC="$HOME/.bashrc"
    echo "📝 .bashrc dosyası bulundu"
else
    echo "❌ Hata: .bashrc veya .zshrc dosyası bulunamadı!"
    exit 1
fi

# Alias ekle
echo "" >> "$SHELL_RC"
echo "# Mustafa Sağbil Portföy - Otomatik Yükleme" >> "$SHELL_RC"
echo "alias yukleme-yap='cd $CURRENT_DIR && ./yukleme_yap'" >> "$SHELL_RC"

echo "✅ Kurulum tamamlandı!"
echo ""
echo "🚀 Kullanım:"
echo "   yukleme-yap"
echo ""
echo "📝 Not: Yeni terminal açtığınızda komut kullanılabilir olacak."
echo "   Mevcut terminal için: source $SHELL_RC"
