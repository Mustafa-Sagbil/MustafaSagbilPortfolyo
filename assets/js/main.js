/**
 * Mustafa Sağbil Portföy - Ana JavaScript Dosyası
 * Tüm component'leri başlatır ve genel işlevleri yönetir
 */

import { domReady } from './utils/helpers.js';
import Navbar from './components/navbar.js';

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
    
    initializeComponents() {
        // Navbar'ı başlat
        this.navbar = new Navbar();
        
        // Diğer component'ler buraya eklenecek
        // this.hero = new Hero();
        // this.about = new About();
        // this.projects = new Projects();
        // this.contact = new Contact();
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
