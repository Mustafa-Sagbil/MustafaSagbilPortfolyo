# Mustafa Sağbil Portföy

Modern, responsive ve kullanıcı dostu portföy sitesi. GitHub Pages ile yayınlanmaktadır.

## 🚀 Özellikler

- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm
- **Modern CSS**: CSS Grid, Flexbox ve CSS Variables kullanımı
- **Accessibility**: Erişilebilirlik standartlarına uygun
- **Performance**: Hızlı yükleme ve optimize edilmiş kod
- **Dark Mode**: Sistem tercihine göre otomatik tema değişimi
- **Animasyonlar**: Smooth geçişler ve hover efektleri

## 🛠️ Teknoloji Stack

- **HTML5**: Semantic markup ve modern özellikler
- **CSS3**: Modern CSS özellikleri ve responsive tasarım
- **GitHub Pages**: Hosting ve deployment
- **GitHub Actions**: Otomatik deployment

## 📁 Proje Yapısı

```
MustafaSagbilPortfolyo/
├── index.html          # Ana HTML dosyası
├── styles.css          # CSS stilleri
├── README.md           # Proje dokümantasyonu
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions workflow
```

## 🚀 Kurulum ve Çalıştırma

### Yerel Geliştirme

1. Repository'yi klonlayın:
```bash
git clone https://github.com/kullaniciadi/MustafaSagbilPortfolyo.git
cd MustafaSagbilPortfolyo
```

2. Dosyaları bir web sunucusunda çalıştırın:
```bash
# Python ile basit sunucu
python -m http.server 8000

# Node.js ile
npx serve .

# Live Server (VS Code extension) kullanabilirsiniz
```

3. Tarayıcıda `http://localhost:8000` adresini açın

### GitHub Pages ile Deployment

1. Repository'yi GitHub'a push edin
2. Repository Settings > Pages bölümüne gidin
3. Source olarak "Deploy from a branch" seçin
4. Branch olarak "main" seçin
5. Save butonuna tıklayın

Site otomatik olarak `https://kullaniciadi.github.io/MustafaSagbilPortfolyo/` adresinde yayınlanacaktır.

## 🔄 Otomatik Deployment

Bu proje GitHub Actions kullanarak otomatik deployment yapmaktadır:

- Her `main` branch'e push'ta otomatik olarak site güncellenir
- Pull request'lerde preview deployment oluşturulur
- Deployment durumu hakkında bildirim alırsınız

## 📱 Responsive Breakpoints

- **Desktop**: 1200px ve üzeri
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: 480px altı

## 🎨 Tasarım Sistemi

### Renkler
- **Ana Renk**: #2563eb (Mavi)
- **İkincil Renk**: #1e40af (Koyu Mavi)
- **Arka Plan**: #f8fafc (Açık Gri)
- **Metin**: #1e293b (Koyu Gri)

### Typography
- **Font Family**: Inter, system fonts
- **Font Weights**: 300, 400, 500, 600, 700

## 🔧 Geliştirme

### CSS Variables
Renk paleti ve temel değerler CSS variables ile yönetilmektedir. Değişiklik yapmak için `:root` selector'ını düzenleyin.

### Responsive Design
Mobile-first yaklaşım kullanılmaktadır. Yeni breakpoint'ler eklemek için media query'leri kullanın.

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Mustafa Sağbil**
- GitHub: [@kullaniciadi](https://github.com/kullaniciadi)
- Portfolio: [Live Demo](https://kullaniciadi.github.io/MustafaSagbilPortfolyo/)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için GitHub Issues kullanabilir veya iletişim bilgilerimden bana ulaşabilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
