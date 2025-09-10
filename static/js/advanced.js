// POKEDEX AVANÇADA - MICROINTERAÇÕES ÉPICAS! 🚀

class PokedexAdvanced {
    constructor() {
        this.init();
        this.createParticles();
        this.setupMouseEffects();
        this.setupScrollAnimations();
        this.setupCardInteractions();
    }

    init() {
        console.log('🎮 Pokedex Avançada Iniciada!');
        this.addLoadingEffects();
        this.setupSearchEnhancements();
    }

    // Criar partículas de fundo
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Efeitos de mouse
    setupMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            this.createMouseTrail(e);
            this.updateCardTilt(e);
        });

        // Efeito de parallax no header
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const header = document.querySelector('.header');
            if (header) {
                header.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }

    // Trilha do mouse
    createMouseTrail(e) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = 'rgba(255, 203, 5, 0.6)';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transition = 'all 0.3s ease';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0)';
            setTimeout(() => trail.remove(), 300);
        }, 100);
    }

    // Inclinação dos cards baseada no mouse
    updateCardTilt(e) {
        const cards = document.querySelectorAll('.pokemon-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
    }

    // Animações de scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observar todos os cards
        document.querySelectorAll('.pokemon-card').forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });
    }

    // Interações dos cards
    setupCardInteractions() {
        const cards = document.querySelectorAll('.pokemon-card');
        
        cards.forEach(card => {
            // Efeito de hover com som
            card.addEventListener('mouseenter', () => {
                this.playHoverSound();
                this.addGlowEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeGlowEffect(card);
            });

            // Efeito de clique
            card.addEventListener('click', (e) => {
                this.createRippleEffect(e, card);
                this.playClickSound();
            });
        });
    }

    // Efeito de ondulação
    createRippleEffect(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 203, 5, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Efeito de brilho
    addGlowEffect(element) {
        element.style.boxShadow = '0 0 30px rgba(255, 203, 5, 0.5)';
        element.style.borderColor = 'rgba(255, 203, 5, 0.8)';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.borderColor = '';
    }

    // Efeitos de loading
    addLoadingEffects() {
        // Adicionar spinner de loading
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';
        loadingSpinner.style.display = 'none';
        document.body.appendChild(loadingSpinner);

        // Mostrar loading em requisições
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
            loadingSpinner.style.display = 'block';
            return originalFetch.apply(this, args)
                .finally(() => {
                    setTimeout(() => {
                        loadingSpinner.style.display = 'none';
                    }, 500);
                });
        };
    }

    // Melhorias na busca
    setupSearchEnhancements() {
        const searchBox = document.querySelector('.search-box');
        if (searchBox) {
            // Efeito de foco
            searchBox.addEventListener('focus', () => {
                searchBox.style.transform = 'scale(1.05)';
                searchBox.style.boxShadow = '0 0 20px rgba(255, 203, 5, 0.3)';
            });

            searchBox.addEventListener('blur', () => {
                searchBox.style.transform = 'scale(1)';
                searchBox.style.boxShadow = '';
            });

            // Busca em tempo real
            searchBox.addEventListener('input', (e) => {
                this.debounce(() => {
                    this.highlightSearchResults(e.target.value);
                }, 300)();
            });
        }
    }

    // Destacar resultados da busca
    highlightSearchResults(query) {
        const cards = document.querySelectorAll('.pokemon-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                card.style.borderColor = 'rgba(255, 203, 5, 0.8)';
                card.style.transform = 'scale(1.02)';
            } else {
                card.style.borderColor = '';
                card.style.transform = '';
            }
        });
    }

    // Debounce para otimizar performance
    debounce(func, wait) {
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

    // Sons (usando Web Audio API)
    playHoverSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Fallback silencioso se Web Audio API não estiver disponível
        }
    }

    playClickSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } catch (e) {
            // Fallback silencioso
        }
    }

    // Efeitos especiais para Pokémon específicos
    addPokemonSpecialEffects() {
        const pikachuCard = document.querySelector('[href*="pikachu"]');
        if (pikachuCard) {
            pikachuCard.addEventListener('mouseenter', () => {
                this.createElectricEffect(pikachuCard);
            });
        }

        const charizardCard = document.querySelector('[href*="charizard"]');
        if (charizardCard) {
            charizardCard.addEventListener('mouseenter', () => {
                this.createFireEffect(charizardCard);
            });
        }
    }

    // Efeito elétrico para Pikachu
    createElectricEffect(element) {
        const sparks = document.createElement('div');
        sparks.style.position = 'absolute';
        sparks.style.top = '0';
        sparks.style.left = '0';
        sparks.style.right = '0';
        sparks.style.bottom = '0';
        sparks.style.pointerEvents = 'none';
        sparks.style.borderRadius = '25px';
        sparks.style.background = 'linear-gradient(45deg, transparent 30%, rgba(255, 203, 5, 0.3) 50%, transparent 70%)';
        sparks.style.animation = 'electric 0.5s ease-in-out';
        
        element.style.position = 'relative';
        element.appendChild(sparks);
        
        setTimeout(() => sparks.remove(), 500);
    }

    // Efeito de fogo para Charizard
    createFireEffect(element) {
        const flames = document.createElement('div');
        flames.style.position = 'absolute';
        flames.style.top = '0';
        flames.style.left = '0';
        flames.style.right = '0';
        flames.style.bottom = '0';
        flames.style.pointerEvents = 'none';
        flames.style.borderRadius = '25px';
        flames.style.background = 'linear-gradient(45deg, transparent 30%, rgba(239, 68, 68, 0.3) 50%, transparent 70%)';
        flames.style.animation = 'fire 0.5s ease-in-out';
        
        element.style.position = 'relative';
        element.appendChild(flames);
        
        setTimeout(() => flames.remove(), 500);
    }
}

// CSS para animações
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes electric {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    
    @keyframes fire {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PokedexAdvanced();
});

// Exportar para uso global
window.PokedexAdvanced = PokedexAdvanced;
