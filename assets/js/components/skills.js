/**
 * Mustafa Sağbil Portföy - Skills Component
 * Yetenekler bölümü JavaScript işlevleri
 */

import { $, $$, addClass, removeClass } from '../utils/helpers.js';
import languageSystem from '../utils/language.js';

class SkillsComponent {
    constructor() {
        this.skills = {
            'elektronik': {
                tr: {
                    title: 'Elektronik',
                    description: 'Elektronik devre tasarımı, analog ve dijital elektronik sistemler, elektronik bileşenler ve devre analizi konularında uzmanım. Temel elektronik prensiplerinden karmaşık sistem tasarımlarına kadar geniş bir yelpazede çalışabiliyorum.'
                },
                en: {
                    title: 'Electronics',
                    description: 'I am an expert in electronic circuit design, analog and digital electronic systems, electronic components and circuit analysis. I can work in a wide range from basic electronic principles to complex system designs.'
                }
            },
            'gomulu-yazilim': {
                tr: {
                    title: 'Gömülü Yazılım',
                    description: 'Mikrokontrolör programlama, C/C++ ile düşük seviye programlama, RTOS (Real-Time Operating System) kullanımı, donanım yazılımı entegrasyonu ve gömülü sistem optimizasyonu konularında deneyimliyim.'
                },
                en: {
                    title: 'Embedded Software',
                    description: 'I have experience in microcontroller programming, low-level programming with C/C++, RTOS (Real-Time Operating System) usage, hardware-software integration and embedded system optimization.'
                }
            },
            'iot': {
                tr: {
                    title: 'IoT (Nesnelerin İnterneti)',
                    description: 'IoT cihazları tasarımı, sensör entegrasyonu, veri toplama ve analizi, bulut platformları ile entegrasyon, MQTT, HTTP protokolleri ve güvenlik konularında uzmanım.'
                },
                en: {
                    title: 'IoT (Internet of Things)',
                    description: 'I am an expert in IoT device design, sensor integration, data collection and analysis, cloud platform integration, MQTT, HTTP protocols and security.'
                }
            },
            'proje-organizasyonu': {
                tr: {
                    title: 'Proje Organizasyonu',
                    description: 'Proje planlama, takım yönetimi, zaman yönetimi, kaynak planlama, risk analizi ve proje süreçlerini optimize etme konularında deneyimliyim. Agile metodolojileri kullanarak etkili proje yönetimi yapabiliyorum.'
                },
                en: {
                    title: 'Project Organization',
                    description: 'I have experience in project planning, team management, time management, resource planning, risk analysis and optimizing project processes. I can do effective project management using Agile methodologies.'
                }
            },
            'flutter': {
                tr: {
                    title: 'Flutter',
                    description: 'Cross-platform mobil uygulama geliştirme, Dart programlama dili, widget kullanımı, state management, API entegrasyonu ve performans optimizasyonu konularında uzmanım. iOS ve Android için tek kod tabanı ile uygulama geliştirebiliyorum.'
                },
                en: {
                    title: 'Flutter',
                    description: 'I am an expert in cross-platform mobile app development, Dart programming language, widget usage, state management, API integration and performance optimization. I can develop applications for iOS and Android with a single codebase.'
                }
            },
            'pcb-dizayn': {
                tr: {
                    title: 'PCB Devre Dizaynı',
                    description: 'PCB tasarımı, Eagle CAD, Altium Designer kullanımı, devre şeması çizimi, PCB layout tasarımı, üretim dosyaları hazırlama ve prototip üretimi konularında deneyimliyim.'
                },
                en: {
                    title: 'PCB Circuit Design',
                    description: 'I have experience in PCB design, Eagle CAD, Altium Designer usage, circuit schematic drawing, PCB layout design, production file preparation and prototype manufacturing.'
                }
            },
            'lehimleme': {
                tr: {
                    title: 'Lehimleme',
                    description: 'El lehimleme, SMD lehimleme, BGA lehimleme, lehim kalitesi kontrolü, lehim malzemeleri seçimi ve lehimleme teknikleri konularında uzmanım. Hassas elektronik bileşenlerin güvenli lehimlenmesini yapabiliyorum.'
                },
                en: {
                    title: 'Soldering',
                    description: 'I am an expert in hand soldering, SMD soldering, BGA soldering, solder quality control, solder material selection and soldering techniques. I can safely solder sensitive electronic components.'
                }
            },
            'devre-analizi': {
                tr: {
                    title: 'Devre Analizi ve Tamiri',
                    description: 'Elektronik devre analizi, arıza tespiti, osiloskop kullanımı, multimetre ile ölçüm, devre tamiri ve bakım konularında deneyimliyim. Karmaşık elektronik sistemlerdeki arızaları tespit edip çözebiliyorum.'
                },
                en: {
                    title: 'Circuit Analysis and Repair',
                    description: 'I have experience in electronic circuit analysis, fault detection, oscilloscope usage, multimeter measurements, circuit repair and maintenance. I can detect and solve faults in complex electronic systems.'
                }
            },
            'mobil-gelistirme': {
                tr: {
                    title: 'Mobil Uygulama Geliştirme',
                    description: 'iOS ve Android uygulama geliştirme, Flutter, React Native, native geliştirme, UI/UX tasarım, API entegrasyonu, veritabanı yönetimi ve uygulama yayınlama konularında uzmanım.'
                },
                en: {
                    title: 'Mobile App Development',
                    description: 'I am an expert in iOS and Android app development, Flutter, React Native, native development, UI/UX design, API integration, database management and app publishing.'
                }
            }
        };
        
        this.init();
    }
    
    init() {
        // Dil sisteminin yüklenmesini bekle
        this.waitForLanguageSystem().then(() => {
            this.bindEvents();
            this.updateSkillNames();
        });
    }
    
    async waitForLanguageSystem() {
        // Dil sisteminin tam olarak yüklenmesini bekle
        while (!languageSystem.translations || Object.keys(languageSystem.translations).length === 0) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    
    updateSkillNames() {
        // Yetenek isimlerini güncelle
        const skillNames = $$('.skill-name[data-translate]');
        console.log('Bulunan yetenek elementleri:', skillNames.length);
        
        skillNames.forEach((element, index) => {
            const key = element.getAttribute('data-translate');
            const translation = languageSystem.getTranslation(key);
            console.log(`Element ${index + 1}: ${key} -> ${translation}`);
            
            if (translation) {
                element.textContent = translation;
            } else {
                console.warn(`Çeviri bulunamadı: ${key}`);
            }
        });
        
        // Debug için konsola yazdır
        console.log('Yetenek isimleri güncellendi:', skillNames.length, 'element');
    }
    
    updateOpenModal() {
        // Açık olan modal varsa içeriğini güncelle
        const modal = $('.skill-modal');
        if (modal) {
            const skillKey = modal.getAttribute('data-skill-key');
            if (skillKey) {
                this.updateModalContent(modal, skillKey);
            }
        }
    }
    
    updateModalContent(modal, skillKey) {
        const skill = this.skills[skillKey];
        if (!skill) return;
        
        const currentLang = languageSystem.getCurrentLanguage();
        const skillData = skill[currentLang] || skill.tr;
        
        // Modal başlığını güncelle
        const titleElement = modal.querySelector('.skill-modal-title');
        if (titleElement) {
            titleElement.textContent = skillData.title;
        }
        
        // Modal açıklamasını güncelle
        const descriptionElement = modal.querySelector('.skill-modal-description');
        if (descriptionElement) {
            descriptionElement.textContent = skillData.description;
        }
        
        console.log('Modal içeriği güncellendi:', skillKey, currentLang);
    }
    
    bindEvents() {
        // Skill card click events
        const skillCards = $$('.skill-card');
        console.log('Bulunan yetenek kartları:', skillCards.length);
        
        skillCards.forEach((card, index) => {
            const skillKey = card.dataset.skill;
            console.log(`Kart ${index + 1}: ${skillKey}`);
            
            card.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Kart tıklandı:', skillKey);
                this.showSkillModal(skillKey);
            });
        });
        
        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('skill-modal') || e.target.classList.contains('skill-modal-close')) {
                this.hideSkillModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideSkillModal();
            }
        });
        
        // Dil değişiminde yetenek isimlerini güncelle
        document.addEventListener('languageChanged', () => {
            console.log('Dil değişti, yetenek isimleri güncelleniyor...');
            // Kısa bir gecikme ile güncelleme yap
            setTimeout(() => {
                this.updateSkillNames();
                this.updateOpenModal();
            }, 100);
        });
    }
    
    showSkillModal(skillKey) {
        console.log('showSkillModal çağrıldı:', skillKey);
        const skill = this.skills[skillKey];
        if (!skill) {
            console.error('Yetenek bulunamadı:', skillKey);
            return;
        }
        
        const currentLang = languageSystem.getCurrentLanguage();
        const skillData = skill[currentLang] || skill.tr;
        console.log('Yetenek verisi:', skillData);
        
        const modal = document.createElement('div');
        modal.className = 'skill-modal';
        modal.setAttribute('data-skill-key', skillKey);
        modal.innerHTML = `
            <div class="skill-modal-content">
                <button class="skill-modal-close">&times;</button>
                <div class="skill-modal-header">
                    <div class="skill-modal-icon">${this.getSkillIcon(skillKey)}</div>
                    <h2 class="skill-modal-title">${skillData.title}</h2>
                </div>
                <div class="skill-modal-description">
                    ${skillData.description}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        console.log('Modal DOM\'a eklendi');
        
        // Show modal with animation
        setTimeout(() => {
            addClass(modal, 'active');
            console.log('Modal aktif edildi');
        }, 10);
    }
    
    hideSkillModal() {
        const modal = $('.skill-modal');
        if (modal) {
            removeClass(modal, 'active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }
    
    getSkillIcon(skillKey) {
        const icons = {
            'elektronik': '⚡',
            'gomulu-yazilim': '🔧',
            'iot': '🌐',
            'proje-organizasyonu': '📋',
            'flutter': '📱',
            'pcb-dizayn': '🔌',
            'lehimleme': '🔥',
            'devre-analizi': '🔍',
            'mobil-gelistirme': '📲'
        };
        return icons[skillKey] || '💡';
    }
}

// Export for use in main.js
export default SkillsComponent;
