/**
 * Mustafa Sağbil Portföy - Language System
 * Çok dilli sistem yönetimi
 */

import { $, $$, addClass, removeClass, storage } from './helpers.js';

class LanguageSystem {
    constructor() {
        this.currentLanguage = 'tr';
        this.translations = {};
        this.supportedLanguages = ['tr', 'en'];
        this.defaultLanguage = 'tr';
        
        this.init();
    }
    
    async init() {
        // Kullanıcının tercih ettiği dili yükle
        this.currentLanguage = storage.get('language', this.defaultLanguage);
        
        // Dil dosyalarını yükle
        await this.loadTranslations();
        
        // HTML lang attribute'unu güncelle
        this.updateHtmlLang();
        
        // Sayfa içeriklerini güncelle
        this.updatePageContent();
        
        // Event listener'ları bağla
        this.bindEvents();
    }
    
    async loadTranslations() {
        try {
            const response = await fetch(`assets/data/languages/${this.currentLanguage}.json`);
            this.translations = await response.json();
        } catch (error) {
            console.error('Dil dosyası yüklenirken hata oluştu:', error);
            // Fallback olarak varsayılan dili yükle
            if (this.currentLanguage !== this.defaultLanguage) {
                this.currentLanguage = this.defaultLanguage;
                await this.loadTranslations();
            }
        }
    }
    
    updateHtmlLang() {
        document.documentElement.lang = this.currentLanguage;
        document.documentElement.dir = this.translations.direction || 'ltr';
    }
    
    updatePageContent() {
        // Navbar linklerini güncelle
        this.updateNavbar();
        
        // Sayfa içeriklerini güncelle
        this.updateHomeContent();
        this.updateProjectsContent();
        this.updateContactContent();
        
        // Dil değiştirici butonunu güncelle
        this.updateLanguageSwitcher();
    }
    
    updateNavbar() {
        // Tüm navbar linklerini bul ve güncelle
        const allNavLinks = $$('.nav-link');
        
        allNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            let translationKey = null;
            
            if (href && href.includes('index.html')) {
                translationKey = 'home';
            } else if (href && href.includes('projects.html')) {
                translationKey = 'projects';
            } else if (href && href.includes('contact.html')) {
                translationKey = 'contact';
            } else if (href && href.includes('#hakkimda')) {
                translationKey = 'about';
            } else if (href && href.includes('#yetenekler')) {
                translationKey = 'skills';
            }
            
            if (translationKey && this.translations.navbar[translationKey]) {
                link.textContent = this.translations.navbar[translationKey];
            }
        });
    }
    
    updateHomeContent() {
        // Ana sayfa başlığı
        const homeTitle = $('.merhaba-baslik');
        if (homeTitle && this.translations.home.title) {
            homeTitle.textContent = this.translations.home.title;
        }
        
        // Ana sayfa alt yazısı
        const homeSubtitle = $('.merhaba-alt-yazi');
        if (homeSubtitle && this.translations.home.subtitle) {
            homeSubtitle.textContent = this.translations.home.subtitle;
        }
    }
    
    updateProjectsContent() {
        // Projeler sayfası içerikleri
        const projectsTitle = $('.projects-title');
        if (projectsTitle && this.translations.projects.title) {
            projectsTitle.textContent = this.translations.projects.title;
        }
        
        const projectsSubtitle = $('.projects-subtitle');
        if (projectsSubtitle && this.translations.projects.subtitle) {
            projectsSubtitle.textContent = this.translations.projects.subtitle;
        }
        
        // Arama placeholder'ı
        const searchInput = $('#project-search');
        if (searchInput && this.translations.projects.search.placeholder) {
            searchInput.placeholder = this.translations.projects.search.placeholder;
        }
        
        // Filtre butonları
        const filterButtons = $$('.filter-btn');
        filterButtons.forEach(btn => {
            const filter = btn.dataset.filter;
            if (this.translations.projects.filters[filter]) {
                btn.textContent = this.translations.projects.filters[filter];
            }
        });
    }
    
    updateContactContent() {
        // İletişim sayfası içerikleri
        const elements = $$('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.getTranslation(key);
            if (translation) {
                element.textContent = translation;
            }
        });
    }
    
    updateLanguageSwitcher() {
        const switcher = $('.language-switcher');
        if (switcher) {
            const currentLang = this.translations.languageName;
            const otherLang = this.currentLanguage === 'tr' ? 'English' : 'Türkçe';
            
            switcher.innerHTML = `
                <button class="language-btn active" data-lang="${this.currentLanguage}">
                    ${currentLang}
                </button>
                <button class="language-btn" data-lang="${this.currentLanguage === 'tr' ? 'en' : 'tr'}">
                    ${otherLang}
                </button>
            `;
        }
    }
    
    bindEvents() {
        // Dil değiştirici butonları
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('language-btn')) {
                const newLang = e.target.dataset.lang;
                if (newLang && newLang !== this.currentLanguage) {
                    this.changeLanguage(newLang);
                }
            }
        });
    }
    
    async changeLanguage(newLanguage) {
        if (!this.supportedLanguages.includes(newLanguage)) {
            console.warn(`Desteklenmeyen dil: ${newLanguage}`);
            return;
        }
        
        // Dil değiştirici butonlarını güncelle
        $$('.language-btn').forEach(btn => {
            removeClass(btn, 'active');
            if (btn.dataset.lang === newLanguage) {
                addClass(btn, 'active');
            }
        });
        
        // Yeni dili yükle
        this.currentLanguage = newLanguage;
        await this.loadTranslations();
        
        // HTML lang attribute'unu güncelle
        this.updateHtmlLang();
        
        // Sayfa içeriklerini güncelle
        this.updatePageContent();
        
        // Kullanıcı tercihini kaydet
        storage.set('language', newLanguage);
        
        // Custom event dispatch
        const event = new CustomEvent('languageChanged', {
            detail: {
                language: newLanguage,
                translations: this.translations
            }
        });
        document.dispatchEvent(event);
    }
    
    // Public methods
    getTranslation(key, fallback = '') {
        // Translations henüz yüklenmemişse fallback döndür
        if (!this.translations || Object.keys(this.translations).length === 0) {
            return fallback;
        }
        
        const keys = key.split('.');
        let value = this.translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return fallback;
            }
        }
        
        return value || fallback;
    }
    
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    getSupportedLanguages() {
        return this.supportedLanguages;
    }
    
    // Projeler için özel çeviri metodu
    translateProject(project) {
        if (this.currentLanguage === 'en') {
            return {
                ...project,
                title: project.titleEn || project.title,
                description: project.descriptionEn || project.description,
                shortDescription: project.shortDescriptionEn || project.shortDescription
            };
        }
        return project;
    }
}

// Export singleton instance
export default new LanguageSystem();
