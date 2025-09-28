/**
 * Mustafa Sağbil Portföy - Helper Functions
 * Genel yardımcı fonksiyonlar ve utilities
 */

// DOM Ready fonksiyonu
export function domReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// Element seçici
export function $(selector) {
    return document.querySelector(selector);
}

export function $$(selector) {
    return document.querySelectorAll(selector);
}

// Class ekleme/çıkarma
export function addClass(element, className) {
    if (element) {
        element.classList.add(className);
    }
}

export function removeClass(element, className) {
    if (element) {
        element.classList.remove(className);
    }
}

export function toggleClass(element, className) {
    if (element) {
        element.classList.toggle(className);
    }
}

// Smooth scroll fonksiyonu
export function smoothScrollTo(target, duration = 800) {
    const targetElement = typeof target === 'string' ? $(target) : target;
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 70; // Navbar height
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
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

// Debounce fonksiyonu
export function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle fonksiyonu
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Local storage helpers
export const storage = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.warn('LocalStorage not available');
            return defaultValue;
        }
    },
    
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('LocalStorage not available');
        }
    }
};

// Event listener helper
export function addEventListeners(elements, event, handler) {
    if (elements.length) {
        elements.forEach(element => {
            element.addEventListener(event, handler);
        });
    } else if (elements) {
        elements.addEventListener(event, handler);
    }
}

// Format helpers
export function formatDate(date) {
    return new Date(date).toLocaleDateString('tr-TR');
}

export function formatNumber(num) {
    return new Intl.NumberFormat('tr-TR').format(num);
}
