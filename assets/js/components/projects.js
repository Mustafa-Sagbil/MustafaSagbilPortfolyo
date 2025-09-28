/**
 * Mustafa Sağbil Portföy - Projects Component
 * Projeler bölümü JavaScript işlevleri
 */

import { $, $$, addClass, removeClass, toggleClass, addEventListeners } from '../utils/helpers.js';
import navigationSystem from '../utils/navigation.js';

class ProjectsComponent {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.searchTerm = '';
        this.isLoading = false;
        
        this.init();
    }
    
    async init() {
        await this.loadProjects();
        this.render();
        this.bindEvents();
    }
    
    async loadProjects() {
        try {
            this.isLoading = true;
            const response = await fetch('assets/data/projects/projects.json');
            const data = await response.json();
            this.projects = data.projects;
            this.filteredProjects = [...this.projects];
        } catch (error) {
            console.error('Projeler yüklenirken hata oluştu:', error);
            this.projects = [];
            this.filteredProjects = [];
        } finally {
            this.isLoading = false;
        }
    }
    
    render() {
        const container = $('#projeler-container');
        if (!container) return;
        
        container.innerHTML = this.getHTML();
        this.updateProjectCards();
        
        // Navigation sistemine yeni section'ı kaydet
        const projectsSection = $('#projeler');
        if (projectsSection) {
            navigationSystem.addSection('projeler', projectsSection);
        }
    }
    
    getHTML() {
        return `
            <section id="projeler" class="projects-section">
                <div class="projects-container">
                    <div class="projects-header">
                        <h2 class="projects-title">Projelerim</h2>
                        <p class="projects-subtitle">
                            Geliştirdiğim projeleri keşfedin. Her proje, farklı teknolojiler ve 
                            yaklaşımlarla oluşturulmuş, gerçek dünya problemlerini çözen çözümlerdir.
                        </p>
                    </div>
                    
                    <div class="projects-filters">
                        <button class="filter-btn active" data-filter="all">Tümü</button>
                        <button class="filter-btn" data-filter="Web Development">Web Development</button>
                        <button class="filter-btn" data-filter="Mobile Development">Mobile Development</button>
                        <button class="filter-btn" data-filter="Desktop Applications">Desktop Applications</button>
                        <button class="filter-btn" data-filter="Data Science">Data Science</button>
                    </div>
                    
                    <div class="projects-search">
                        <div class="search-icon">🔍</div>
                        <input 
                            type="text" 
                            class="search-input" 
                            placeholder="Proje ara..."
                            id="project-search"
                        >
                    </div>
                    
                    <div class="projects-grid" id="projects-grid">
                        ${this.isLoading ? this.getLoadingHTML() : this.getProjectsHTML()}
                    </div>
                </div>
            </section>
        `;
    }
    
    getLoadingHTML() {
        return `
            <div class="projects-loading">
                <p>Projeler yükleniyor...</p>
            </div>
        `;
    }
    
    getProjectsHTML() {
        if (this.filteredProjects.length === 0) {
            return `
                <div class="projects-empty">
                    <p>Aradığınız kriterlere uygun proje bulunamadı.</p>
                </div>
            `;
        }
        
        return this.filteredProjects.map(project => this.getProjectCardHTML(project)).join('');
    }
    
    getProjectCardHTML(project) {
        const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
        const technologies = project.technologies.slice(0, 4).map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-thumbnail">
                    <img src="${project.thumbnail}" alt="${project.title}" loading="lazy">
                    <div class="project-status ${statusClass}">${project.status}</div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.shortDescription}</p>
                    <div class="project-technologies">
                        ${technologies}
                        ${project.technologies.length > 4 ? 
                            `<span class="tech-tag">+${project.technologies.length - 4}</span>` : 
                            ''
                        }
                    </div>
                    <div class="project-links">
                        <a href="${project.demoUrl}" target="_blank" class="project-link demo">
                            <span>👁️</span> Demo
                        </a>
                        <a href="${project.githubUrl}" target="_blank" class="project-link github">
                            <span>📁</span> GitHub
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    
    updateProjectCards() {
        const grid = $('#projects-grid');
        if (!grid) return;
        
        grid.innerHTML = this.getProjectsHTML();
        this.bindProjectEvents();
    }
    
    bindEvents() {
        // Filter buttons
        const filterButtons = $$('.filter-btn');
        addEventListeners(filterButtons, 'click', (e) => {
            this.handleFilterClick(e);
        });
        
        // Search input
        const searchInput = $('#project-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }
    
    bindProjectEvents() {
        // Project card clicks
        const projectCards = $$('.project-card');
        addEventListeners(projectCards, 'click', (e) => {
            this.handleProjectClick(e);
        });
    }
    
    handleFilterClick(e) {
        const filter = e.target.dataset.filter;
        
        // Update active filter button
        $$('.filter-btn').forEach(btn => {
            removeClass(btn, 'active');
        });
        addClass(e.target, 'active');
        
        this.currentFilter = filter;
        this.applyFilters();
    }
    
    handleSearch(term) {
        this.searchTerm = term.toLowerCase();
        this.applyFilters();
    }
    
    applyFilters() {
        this.filteredProjects = this.projects.filter(project => {
            const matchesFilter = this.currentFilter === 'all' || 
                                project.category === this.currentFilter;
            
            const matchesSearch = this.searchTerm === '' ||
                                project.title.toLowerCase().includes(this.searchTerm) ||
                                project.description.toLowerCase().includes(this.searchTerm) ||
                                project.technologies.some(tech => 
                                    tech.toLowerCase().includes(this.searchTerm)
                                );
            
            return matchesFilter && matchesSearch;
        });
        
        this.updateProjectCards();
    }
    
    handleProjectClick(e) {
        const projectCard = e.target.closest('.project-card');
        if (!projectCard) return;
        
        const projectId = projectCard.dataset.projectId;
        const project = this.projects.find(p => p.id === projectId);
        
        if (project) {
            this.showProjectModal(project);
        }
    }
    
    showProjectModal(project) {
        // Modal HTML oluştur
        const modalHTML = this.getProjectModalHTML(project);
        
        // Modal'ı DOM'a ekle
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = modalHTML;
        document.body.appendChild(modal);
        
        // Modal'ı göster
        setTimeout(() => {
            addClass(modal, 'active');
        }, 10);
        
        // Event listener'ları ekle
        this.bindModalEvents(modal, project);
    }
    
    getProjectModalHTML(project) {
        const features = project.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        const challenges = project.challenges.map(challenge => 
            `<li>${challenge}</li>`
        ).join('');
        
        const learnings = project.learnings.map(learning => 
            `<li>${learning}</li>`
        ).join('');
        
        return `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="project-thumbnail">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>
                <div class="project-content">
                    <h2 class="project-title">${project.title}</h2>
                    <p class="project-description">${project.description}</p>
                    
                    <div class="project-details">
                        <div class="detail-section">
                            <h3>Özellikler</h3>
                            <ul>${features}</ul>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Zorluklar</h3>
                            <ul>${challenges}</ul>
                        </div>
                        
                        <div class="detail-section">
                            <h3>Öğrenilenler</h3>
                            <ul>${learnings}</ul>
                        </div>
                    </div>
                    
                    <div class="project-links">
                        <a href="${project.demoUrl}" target="_blank" class="project-link demo">
                            <span>👁️</span> Canlı Demo
                        </a>
                        <a href="${project.githubUrl}" target="_blank" class="project-link github">
                            <span>📁</span> GitHub
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
    
    bindModalEvents(modal, project) {
        // Close button
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            this.closeModal(modal);
        });
        
        // Background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });
        
        // Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
    
    closeModal(modal) {
        removeClass(modal, 'active');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    // Public methods
    getProjects() {
        return this.projects;
    }
    
    getProjectById(id) {
        return this.projects.find(project => project.id === id);
    }
    
    addProject(project) {
        this.projects.push(project);
        this.applyFilters();
    }
    
    removeProject(id) {
        this.projects = this.projects.filter(project => project.id !== id);
        this.applyFilters();
    }
}

// Export for use in main.js
export default ProjectsComponent;
