/**
 * Mustafa Sağbil Portföy - Ana JavaScript Dosyası
 * Tüm component'leri başlatır ve genel işlevleri yönetir
 */

import { domReady } from './utils/helpers.js';
import Navbar from './components/navbar.js';
import ProjectsComponent from './components/projects.js';
import navigationSystem from './utils/navigation.js';
import languageSystem from './utils/language.js';

class Portfolio {
    constructor() {
        this.init();
    }
    
    init() {
        domReady(() => {
            this.initializeComponents();
            this.bindGlobalEvents();
            console.log('Portföy uygulaması başlatıldı');
        });
    }
    
    async initializeComponents() {
        // Dil sistemini başlat ve yüklenmesini bekle
        this.language = languageSystem;
        await this.waitForLanguageSystem();
        
        // Navbar'ı başlat
        this.navbar = new Navbar();
        
        // Navigation system'i başlat
        this.navigation = navigationSystem;
        
        // Projeler component'ini sadece projeler sayfasında başlat
        if (window.location.pathname.includes('projects.html') || $('#projeler')) {
            this.projects = new ProjectsComponent();
        }
        
        // İletişim sayfası için dil sistemini başlat
        if (window.location.pathname.includes('contact.html')) {
            this.initializeContactPage();
        }
        
        // Diğer component'ler buraya eklenecek
        // this.hero = new Hero();
        // this.about = new About();
        // this.contact = new Contact();
    }
    
    async waitForLanguageSystem() {
        // Dil sisteminin tam olarak yüklenmesini bekle
        while (!this.language.translations || Object.keys(this.language.translations).length === 0) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
        console.log('Language system yüklendi:', Object.keys(this.language.translations).length, 'çeviri anahtarı');
    }
    
    initializeContactPage() {
        // İletişim sayfası için dil sistemini başlat
        console.log('İletişim sayfası dil sistemi başlatıldı');
    }
    
    bindGlobalEvents() {
        // Global event listener'lar
        this.handlePageLoad();
        this.handleResize();
        this.handleScroll();
    }
    
    handlePageLoad() {
        // Sayfa yüklendiğinde çalışacak kodlar
        this.addLoadingAnimation();
    }
    
    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.onResize();
            }, 250);
        });
    }
    
    handleScroll() {
        let scrollTimer;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                this.onScroll();
            }, 10);
        });
    }
    
    onResize() {
        // Resize işlemleri
        console.log('Window resized');
    }
    
    onScroll() {
        // Scroll işlemleri
        // Navbar scroll effect'i navbar.js'de yönetiliyor
    }
    
    addLoadingAnimation() {
        // Sayfa yükleme animasyonu
        document.body.classList.add('loaded');
    }
}

// Uygulamayı başlat
const portfolio = new Portfolio();

// Global olarak erişilebilir yap
window.Portfolio = portfolio;
