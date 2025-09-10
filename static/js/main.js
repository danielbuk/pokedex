// Pokedex JavaScript - Funcionalidades principais

// Variáveis globais
let isLoading = false;
let currentPage = 1;
const itemsPerPage = 20;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Inicializar aplicação
function initializeApp() {
    // Configurar tooltips do Bootstrap
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Configurar animações de entrada
    setupScrollAnimations();
    
    // Configurar lazy loading de imagens
    setupLazyLoading();
    
    // Configurar busca em tempo real
    setupRealTimeSearch();
    
    // Configurar filtros
    setupFilters();
    
    // Configurar navegação por teclado
    setupKeyboardNavigation();
    
    console.log('🎮 Pokedex inicializada com sucesso!');
}

// Configurar animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ser animados
    document.querySelectorAll('.pokemon-card, .info-section').forEach(el => {
        observer.observe(el);
    });
}

// Configurar lazy loading de imagens
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Configurar busca em tempo real
function setupRealTimeSearch() {
    const searchInput = document.getElementById('pokemon-filter');
    if (searchInput) {
        let searchTimeout;
        
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                filterPokemon();
            }, 300);
        });
    }
}

// Configurar filtros
function setupFilters() {
    const typeFilter = document.getElementById('type-filter');
    if (typeFilter) {
        typeFilter.addEventListener('change', filterPokemon);
    }
}

// Configurar navegação por teclado
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Ctrl + K para focar na busca
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.pokemon-search, #pokemon-filter');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape para limpar filtros
        if (e.key === 'Escape') {
            clearFilters();
        }
    });
}

// Filtrar Pokémon
function filterPokemon() {
    const nameFilter = document.getElementById('pokemon-filter')?.value.toLowerCase() || '';
    const typeFilter = document.getElementById('type-filter')?.value || '';
    
    const pokemonItems = document.querySelectorAll('.pokemon-item');
    let visibleCount = 0;
    
    pokemonItems.forEach(item => {
        const name = item.dataset.name || '';
        const types = item.dataset.types || '';
        
        const matchesName = name.includes(nameFilter);
        const matchesType = !typeFilter || types.includes(typeFilter);
        
        if (matchesName && matchesType) {
            item.style.display = 'block';
            item.classList.add('fade-in-up');
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Mostrar mensagem se nenhum Pokémon for encontrado
    const container = document.getElementById('pokemon-container');
    if (container) {
        let noResultsMsg = container.querySelector('.no-results');
        
        if (visibleCount === 0 && pokemonItems.length > 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'col-12 text-center no-results';
                noResultsMsg.innerHTML = `
                    <div class="pokemon-card">
                        <div class="pokemon-card-header">
                            <i class="fas fa-search fa-3x mb-3"></i>
                            <h3>Nenhum Pokémon encontrado</h3>
                        </div>
                        <div class="card-body">
                            <p>Tente ajustar os filtros ou buscar por outro termo.</p>
                            <button class="btn btn-pokemon" onclick="clearFilters()">
                                <i class="fas fa-times"></i> Limpar Filtros
                            </button>
                        </div>
                    </div>
                `;
                container.appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}

// Limpar filtros
function clearFilters() {
    const nameFilter = document.getElementById('pokemon-filter');
    const typeFilter = document.getElementById('type-filter');
    
    if (nameFilter) nameFilter.value = '';
    if (typeFilter) typeFilter.value = '';
    
    filterPokemon();
}

// Mostrar loading
function showLoading(element) {
    if (element) {
        element.innerHTML = `
            <div class="col-12 text-center">
                <div class="loading"></div>
                <p class="mt-3">Carregando...</p>
            </div>
        `;
    }
}

// Mostrar erro
function showError(element, message) {
    if (element) {
        element.innerHTML = `
            <div class="col-12 text-center">
                <div class="pokemon-card">
                    <div class="pokemon-card-header">
                        <i class="fas fa-exclamation-triangle fa-3x mb-3 text-danger"></i>
                        <h3>Erro</h3>
                    </div>
                    <div class="card-body">
                        <p>${message}</p>
                        <button class="btn btn-pokemon" onclick="location.reload()">
                            <i class="fas fa-refresh"></i> Tentar Novamente
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Copiar para clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Copiado para a área de transferência!', 'success');
        });
    } else {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Copiado para a área de transferência!', 'success');
    }
}

// Mostrar notificação
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Formatar número com zeros à esquerda
function padNumber(num, size = 3) {
    return num.toString().padStart(size, '0');
}

// Capitalizar primeira letra
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Formatar nome do Pokémon
function formatPokemonName(name) {
    return name.split('-').map(capitalize).join(' ');
}

// Formatar nome do movimento
function formatMoveName(name) {
    return name.split('-').map(capitalize).join(' ');
}

// Obter cor do tipo
function getTypeColor(type) {
    const colors = {
        'fire': '#FF6B35',
        'water': '#3B82F6',
        'grass': '#10B981',
        'electric': '#F59E0B',
        'psychic': '#8B5CF6',
        'ice': '#06B6D4',
        'dragon': '#7C3AED',
        'dark': '#6B7280',
        'fairy': '#EC4899',
        'fighting': '#EF4444',
        'poison': '#8B5CF6',
        'ground': '#D97706',
        'flying': '#8B5CF6',
        'bug': '#84CC16',
        'rock': '#92400E',
        'ghost': '#6B7280',
        'steel': '#6B7280',
        'normal': '#9CA3AF'
    };
    return colors[type] || '#9CA3AF';
}

// Animar contador
function animateCounter(element, start, end, duration = 2000) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (difference * progress));
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Detectar tema escuro
function isDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Configurar tema
function setupTheme() {
    if (isDarkMode()) {
        document.body.classList.add('dark-theme');
    }
    
    // Escutar mudanças no tema
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-theme');
            } else {
                document.body.classList.remove('dark-theme');
            }
        });
    }
}

// Configurar PWA
function setupPWA() {
    // Registrar service worker se disponível
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registrado: ', registration);
                })
                .catch(registrationError => {
                    console.log('Falha no registro do SW: ', registrationError);
                });
        });
    }
}

// Configurar analytics (se necessário)
function setupAnalytics() {
    // Implementar analytics aqui se necessário
    console.log('Analytics configurado');
}

// Exportar funções para uso global
window.PokedexUtils = {
    showLoading,
    showError,
    showNotification,
    copyToClipboard,
    padNumber,
    capitalize,
    formatPokemonName,
    formatMoveName,
    getTypeColor,
    animateCounter,
    isMobile,
    debounce,
    throttle
};
