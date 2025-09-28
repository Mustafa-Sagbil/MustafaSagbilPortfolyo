/**
 * Mustafa Sağbil Portföy - Navigation System
 * Merkezi navigasyon yönetim sistemi
 */

import { $, $$, addClass, removeClass, toggleClass } from './helpers.js';

class NavigationSystem {
    constructor() {
        this.currentSection = 'ana-sayfa';
        this.sections = new Map();
        this.navLinks = new Map();
        this.scrollOffset = 70; // Navbar height
        this.isScrolling = false;
        this.scrollTimeout = null;
        
        this.init();
    }
    
    init() {
        this.registerSections();
        this.registerNavLinks();
        this.bindEvents();
        this.setInitialState();
    }
    
    registerSections() {
        // Mevcut bölümleri kaydet
        const sectionElements = $$('section[id]');
        sectionElements.forEach(section => {
            this.sections.set(section.id, {
                element: section,
                top: 0,
                bottom: 0,
                isVisible: false
            });
        });
        
        // Ana sayfa için özel durum
        if (!this.sections.has('ana-sayfa')) {
            const mainElement = $('main');
            if (mainElement) {
                this.sections.set('ana-sayfa', {
                    element: mainElement,
                    top: 0,
                    bottom: 0,
                    isVisible: true
                });
            }
        }
    }
    
    registerNavLinks() {
        const links = $$('.nav-link');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const sectionId = href.substring(1);
                this.navLinks.set(sectionId, link);
            }
        });
    }
    
    bindEvents() {
        // Navbar link tıklamaları
        this.navLinks.forEach((link, sectionId) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateTo(sectionId);
            });
        });
        
        // Scroll olayları
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Resize olayları
        window.addEventListener('resize', () => {
            this.updateSectionPositions();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }
    
    setInitialState() {
        this.updateSectionPositions();
        this.updateActiveNavLink();
    }
    
    navigateTo(sectionId, smooth = true) {
        const section = this.sections.get(sectionId);
        if (!section) {
            console.warn(`Section '${sectionId}' not found`);
            return;
        }
        
        this.currentSection = sectionId;
        
        if (smooth) {
            this.smoothScrollTo(section.element);
        } else {
            this.instantScrollTo(section.element);
        }
        
        // URL hash güncelle
        this.updateUrlHash(sectionId);
        
        // Active nav link güncelle
        this.updateActiveNavLink();
        
        // Custom event dispatch
        this.dispatchNavigationEvent(sectionId);
    }
    
    smoothScrollTo(element) {
        const targetPosition = element.offsetTop - this.scrollOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;
        
        this.isScrolling = true;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                this.isScrolling = false;
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    instantScrollTo(element) {
        const targetPosition = element.offsetTop - this.scrollOffset;
        window.scrollTo(0, targetPosition);
    }
    
    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    handleScroll() {
        if (this.isScrolling) return;
        
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
            this.updateSectionPositions();
            this.updateActiveNavLink();
        }, 10);
    }
    
    updateSectionPositions() {
        const scrollTop = window.pageYOffset + this.scrollOffset;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach((section, sectionId) => {
            const rect = section.element.getBoundingClientRect();
            section.top = rect.top + window.pageYOffset;
            section.bottom = section.top + rect.height;
            section.isVisible = (
                section.top <= scrollTop + windowHeight / 2 &&
                section.bottom >= scrollTop + windowHeight / 2
            );
        });
    }
    
    updateActiveNavLink() {
        // Mevcut görünür bölümü bul
        let activeSection = null;
        let minDistance = Infinity;
        
        this.sections.forEach((section, sectionId) => {
            if (section.isVisible) {
                const distance = Math.abs(section.top - (window.pageYOffset + this.scrollOffset));
                if (distance < minDistance) {
                    minDistance = distance;
                    activeSection = sectionId;
                }
            }
        });
        
        // Eğer görünür bölüm yoksa, en yakın bölümü seç
        if (!activeSection) {
            const scrollTop = window.pageYOffset + this.scrollOffset;
            this.sections.forEach((section, sectionId) => {
                if (section.top <= scrollTop) {
                    const distance = scrollTop - section.top;
                    if (distance < minDistance) {
                        minDistance = distance;
                        activeSection = sectionId;
                    }
                }
            });
        }
        
        if (activeSection && activeSection !== this.currentSection) {
            this.currentSection = activeSection;
            this.updateUrlHash(activeSection);
        }
        
        // Nav link'leri güncelle
        this.navLinks.forEach((link, sectionId) => {
            if (sectionId === this.currentSection) {
                addClass(link, 'active');
            } else {
                removeClass(link, 'active');
            }
        });
    }
    
    updateUrlHash(sectionId) {
        if (sectionId !== 'ana-sayfa') {
            history.pushState(null, null, `#${sectionId}`);
        } else {
            history.pushState(null, null, window.location.pathname);
        }
    }
    
    handleKeyboardNavigation(e) {
        // Arrow keys ile navigasyon
        if (e.altKey) {
            const sections = Array.from(this.sections.keys());
            const currentIndex = sections.indexOf(this.currentSection);
            
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    if (currentIndex > 0) {
                        this.navigateTo(sections[currentIndex - 1]);
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (currentIndex < sections.length - 1) {
                        this.navigateTo(sections[currentIndex + 1]);
                    }
                    break;
                case 'Home':
                    e.preventDefault();
                    this.navigateTo('ana-sayfa');
                    break;
                case 'End':
                    e.preventDefault();
                    const lastSection = sections[sections.length - 1];
                    this.navigateTo(lastSection);
                    break;
            }
        }
    }
    
    dispatchNavigationEvent(sectionId) {
        const event = new CustomEvent('sectionChanged', {
            detail: {
                sectionId: sectionId,
                section: this.sections.get(sectionId)
            }
        });
        document.dispatchEvent(event);
    }
    
    // Public methods
    getCurrentSection() {
        return this.currentSection;
    }
    
    getSection(sectionId) {
        return this.sections.get(sectionId);
    }
    
    addSection(sectionId, element) {
        this.sections.set(sectionId, {
            element: element,
            top: 0,
            bottom: 0,
            isVisible: false
        });
        this.updateSectionPositions();
        
        // Yeni section eklendikten sonra pozisyonları güncelle
        setTimeout(() => {
            this.updateSectionPositions();
        }, 100);
    }
    
    removeSection(sectionId) {
        this.sections.delete(sectionId);
    }
    
    // Programmatic navigation
    goToNext() {
        const sections = Array.from(this.sections.keys());
        const currentIndex = sections.indexOf(this.currentSection);
        if (currentIndex < sections.length - 1) {
            this.navigateTo(sections[currentIndex + 1]);
        }
    }
    
    goToPrevious() {
        const sections = Array.from(this.sections.keys());
        const currentIndex = sections.indexOf(this.currentSection);
        if (currentIndex > 0) {
            this.navigateTo(sections[currentIndex - 1]);
        }
    }
}

// Export singleton instance
export default new NavigationSystem();
