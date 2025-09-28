/**
 * Mustafa Sağbil Portföy - Navbar Component
 * Navbar ile ilgili tüm JavaScript işlevleri
 */

import { $, $$, addClass, removeClass, toggleClass, addEventListeners } from '../utils/helpers.js';

class Navbar {
    constructor() {
        this.navbar = $('.navbar');
        this.toggle = $('#navbar-toggle');
        this.menu = $('#navbar-menu');
        this.navLinks = $$('.nav-link');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.handleScroll();
        this.setActiveLink();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking on links
        addEventListeners(this.navLinks, 'click', () => this.closeMenu());
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Handle scroll for navbar effects
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Smooth scroll for anchor links
        addEventListeners(this.navLinks, 'click', (e) => this.handleSmoothScroll(e));
    }
    
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        toggleClass(this.menu, 'active');
        toggleClass(this.toggle, 'active');
        
        // Prevent body scroll when menu is open
        if (this.isMenuOpen) {
            addClass(document.body, 'menu-open');
        } else {
            removeClass(document.body, 'menu-open');
        }
    }
    
    closeMenu() {
        if (this.isMenuOpen) {
            this.isMenuOpen = false;
            removeClass(this.menu, 'active');
            removeClass(this.toggle, 'active');
            removeClass(document.body, 'menu-open');
        }
    }
    
    handleOutsideClick(e) {
        if (this.isMenuOpen && 
            !this.navbar.contains(e.target)) {
            this.closeMenu();
        }
    }
    
    handleResize() {
        // Close menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMenu();
        }
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Add scrolled class for navbar effects
        if (scrollY > 50) {
            addClass(this.navbar, 'scrolled');
        } else {
            removeClass(this.navbar, 'scrolled');
        }
    }
    
    handleSmoothScroll(e) {
        const href = e.target.getAttribute('href');
        
        // Check if it's an anchor link
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                this.smoothScrollTo(targetElement);
            }
        }
    }
    
    smoothScrollTo(target) {
        const navbarHeight = 70;
        const targetPosition = target.offsetTop - navbarHeight;
        
        // Modern smooth scroll API kullan
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        } else {
            // Fallback için eski yöntem
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        }
    }
    
    setActiveLink() {
        // Set active link based on current section
        const sections = $$('section[id]');
        
        if (sections.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveLink(id);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-70px 0px -70px 0px'
        });
        
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    updateActiveLink(activeId) {
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${activeId}`) {
                addClass(link, 'active');
            } else {
                removeClass(link, 'active');
            }
        });
    }
}

// Export for use in main.js
export default Navbar;
