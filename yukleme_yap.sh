#!/bin/bash

# Mustafa Sağbil Portföy - Otomatik Yükleme Scripti
# Bu script tüm değişiklikleri otomatik olarak GitHub'a yükler

echo "🚀 Portföy yükleme işlemi başlatılıyor..."

# Git durumunu kontrol et
if [ ! -d ".git" ]; then
    echo "❌ Hata: Bu klasör bir Git repository'si değil!"
    exit 1
fi

# Değişiklik var mı kontrol et
if [ -z "$(git status --porcelain)" ]; then
    echo "ℹ️  Yüklenecek değişiklik bulunamadı."
    echo "✅ Her şey güncel!"
    exit 0
fi

echo "📁 Değişiklikler tespit edildi..."

# Tüm dosyaları ekle
echo "➕ Dosyalar Git'e ekleniyor..."
git add .

# Commit mesajı oluştur (tarih ve saat ile)
COMMIT_MESSAGE="Portföy güncellendi - $(date '+%d.%m.%Y %H:%M')"

# Commit yap
echo "💾 Değişiklikler kaydediliyor..."
git commit -m "$COMMIT_MESSAGE"

# GitHub'a push yap
echo "🌐 GitHub'a yükleniyor..."
git push origin main

# Sonuç kontrolü
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Yükleme başarıyla tamamlandı!"
    echo "🌍 Site URL: https://mustafa-sagbil.github.io/MustafaSagbilPortfolyo/"
    echo "⏱️  Site güncellemesi 1-2 dakika sürebilir."
    echo ""
    echo "📊 Deployment durumunu kontrol etmek için:"
    echo "   https://github.com/Mustafa-Sagbil/MustafaSagbilPortfolyo/actions"
else
    echo ""
    echo "❌ Yükleme sırasında hata oluştu!"
    echo "🔍 Lütfen hata mesajlarını kontrol edin."
    exit 1
fi
