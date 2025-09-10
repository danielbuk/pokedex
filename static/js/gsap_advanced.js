// POKEDEX GSAP AVANÇADA - NÍVEL PROFISSIONAL! 🚀

class PokedexGSAP {
    constructor() {
        this.init();
        this.setupScrollAnimations();
        this.setupInteractiveEffects();
        this.setupParticleSystem();
        this.setupPageTransitions();
    }

    init() {
        console.log('🎮 Pokedex GSAP Avançada Iniciada!');
        
        // Registrar plugins
        gsap.registerPlugin(ScrollTrigger, TextPlugin, MotionPathPlugin);
        
        // Configurações iniciais
        this.setInitialStates();
        
        // Timeline principal
        this.createMainTimeline();
    }

    setInitialStates() {
        // Hero elements
        gsap.set("#heroTitle", { opacity: 0, y: -100, rotationX: -90 });
        gsap.set("#heroSubtitle", { opacity: 0, y: 100, rotationX: 90 });
        gsap.set("#ctaButton", { opacity: 0, scale: 0, rotation: 180 });
        
        // Cards
        gsap.set(".pokemon-card-gsap", { opacity: 0, y: 150, rotationY: 45 });
        gsap.set(".stat-card-gsap", { opacity: 0, scale: 0, rotation: 360 });
        
        // Particles
        gsap.set(".particle", { opacity: 0, scale: 0, rotation: 0 });
        
        // Loading
        gsap.set("#loader", { opacity: 1 });
    }

    createMainTimeline() {
        const tl = gsap.timeline();
        
        // Loading sequence
        tl.to(".loader-spinner", { 
            rotation: 360, 
            duration: 1, 
            repeat: -1, 
            ease: "none" 
        })
        .to("#loader", { 
            opacity: 0, 
            duration: 0.8,
            ease: "power2.inOut"
        })
        .set("#loader", { display: "none" })
        
        // Hero entrance
        .to("#heroTitle", { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            duration: 1.5, 
            ease: "power3.out" 
        })
        .to("#heroSubtitle", { 
            opacity: 1, 
            y: 0, 
            rotationX: 0,
            duration: 1.2, 
            ease: "power3.out" 
        }, "-=0.8")
        .to("#ctaButton", { 
            opacity: 1, 
            scale: 1, 
            rotation: 0,
            duration: 1, 
            ease: "back.out(1.7)" 
        }, "-=0.5")
        
        // Particles entrance
        .to(".particle", { 
            opacity: 1, 
            scale: 1, 
            rotation: 360,
            duration: 1.5, 
            stagger: 0.3,
            ease: "elastic.out(1, 0.3)"
        }, "-=0.5");
    }

    setupScrollAnimations() {
        // Stats counter animation
        gsap.to(".stat-number", {
            textContent: function() {
                return this.getAttribute("data-target");
            },
            duration: 2.5,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: "#stats",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                onEnter: () => this.createCounterEffect()
            }
        });

        // Cards animation with 3D effect
        gsap.to(".pokemon-card-gsap", {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#pokemonGrid",
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            }
        });

        // Stats cards with rotation
        gsap.to(".stat-card-gsap", {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: "#stats",
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });

        // Parallax effect for hero
        gsap.to("#hero", {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }

    setupInteractiveEffects() {
        // Advanced hover effects for cards
        document.querySelectorAll(".pokemon-card-gsap").forEach((card, index) => {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, { 
                    scale: 1.08, 
                    rotationY: 10, 
                    rotationX: 5,
                    z: 50,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                // Glow effect
                gsap.to(card, {
                    boxShadow: "0 20px 60px rgba(255, 203, 5, 0.4)",
                    borderColor: "rgba(255, 203, 5, 0.8)",
                    duration: 0.3
                });
            });
            
            card.addEventListener("mouseleave", () => {
                gsap.to(card, { 
                    scale: 1, 
                    rotationY: 0, 
                    rotationX: 0,
                    z: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                gsap.to(card, {
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    borderColor: "rgba(255, 203, 5, 0.2)",
                    duration: 0.3
                });
            });

            // Click effect
            card.addEventListener("click", (e) => {
                this.createRippleEffect(e, card);
            });
        });

        // Button interactions
        document.querySelectorAll(".btn-gsap").forEach(btn => {
            btn.addEventListener("mouseenter", () => {
                gsap.to(btn, { 
                    scale: 1.15, 
                    rotation: 5,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
            
            btn.addEventListener("mouseleave", () => {
                gsap.to(btn, { 
                    scale: 1, 
                    rotation: 0,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });

        // CTA Button special effect
        const ctaButton = document.getElementById("ctaButton");
        if (ctaButton) {
            ctaButton.addEventListener("click", (e) => {
                e.preventDefault();
                
                // Efeito visual no botão
                gsap.to(ctaButton, { 
                    scale: 0.95, 
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut"
                });
                
                // Criar explosão
                this.createExplosionEffect(ctaButton);
                
                // Scroll com delay para ver a explosão
                setTimeout(() => {
                    this.scrollToContent();
                }, 300);
            });
        }
    }

    setupParticleSystem() {
        // Floating particles
        gsap.to(".particle", {
            y: -200,
            x: "random(-100, 100)",
            rotation: "random(0, 360)",
            duration: "random(3, 6)",
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            stagger: {
                amount: 2,
                from: "random"
            }
        });

        // Create additional particles dynamically
        this.createDynamicParticles();
    }

    createDynamicParticles() {
        const hero = document.getElementById("hero");
        if (!hero) return;

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";
            particle.style.position = "absolute";
            particle.style.width = Math.random() * 6 + 2 + "px";
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 60 + 40}, 100%, 60%)`;
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";
            particle.style.borderRadius = "50%";
            particle.style.pointerEvents = "none";
            
            hero.appendChild(particle);
            
            // Animate particle
            gsap.to(particle, {
                y: "random(-300, 300)",
                x: "random(-200, 200)",
                rotation: "random(0, 720)",
                scale: "random(0.5, 1.5)",
                duration: "random(4, 8)",
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                delay: Math.random() * 2
            });
        }
    }

    setupPageTransitions() {
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="/"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.createPageTransition(link.href);
            });
        });
    }

    createPageTransition(url) {
        const tl = gsap.timeline();
        
        tl.to("body", {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: "power2.inOut",
            onComplete: () => {
                window.location.href = url;
            }
        });
    }

    createCounterEffect() {
        document.querySelectorAll(".stat-number").forEach(number => {
            const target = parseInt(number.getAttribute("data-target"));
            const obj = { value: 0 };
            
            gsap.to(obj, {
                value: target,
                duration: 2,
                ease: "power2.out",
                onUpdate: () => {
                    number.textContent = Math.round(obj.value);
                }
            });
        });
    }

    createRippleEffect(e, element) {
        const ripple = document.createElement("span");
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 203, 5, 0.6) 0%, transparent 70%);
            pointer-events: none;
            z-index: 1000;
        `;
        
        element.style.position = "relative";
        element.style.overflow = "hidden";
        element.appendChild(ripple);
        
        gsap.fromTo(ripple, 
            { scale: 0, opacity: 1 },
            { 
                scale: 4, 
                opacity: 0, 
                duration: 0.6, 
                ease: "power2.out",
                onComplete: () => ripple.remove()
            }
        );
    }

    createExplosionEffect(element) {
        // Create explosion particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement("div");
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: #FFCB05;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
            `;
            
            const rect = element.getBoundingClientRect();
            particle.style.left = rect.left + rect.width / 2 + "px";
            particle.style.top = rect.top + rect.height / 2 + "px";
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                x: Math.cos(i * 30 * Math.PI / 180) * 100,
                y: Math.sin(i * 30 * Math.PI / 180) * 100,
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    }

    scrollToContent() {
        console.log('🎮 ScrollToContent chamado!');
        
        // Scroll para a seção de conteúdo
        const contentSection = document.querySelector('.content-section');
        if (contentSection) {
            console.log('✅ Encontrou content-section, fazendo scroll...');
            contentSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.log('⚠️ Content-section não encontrado, tentando fallback...');
            // Fallback: scroll para o primeiro card
            const firstCard = document.querySelector('.pokemon-card-gsap');
            if (firstCard) {
                console.log('✅ Encontrou primeiro card, fazendo scroll...');
                firstCard.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                console.log('❌ Nenhum elemento encontrado para scroll');
                // Último fallback: scroll manual
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Método para criar efeitos especiais por tipo de Pokémon
    createPokemonTypeEffect(type, element) {
        const effects = {
            electric: () => {
                gsap.to(element, {
                    boxShadow: "0 0 30px #FFCB05",
                    duration: 0.3,
                    yoyo: true,
                    repeat: 3
                });
            },
            fire: () => {
                gsap.to(element, {
                    boxShadow: "0 0 30px #EF4444",
                    duration: 0.3,
                    yoyo: true,
                    repeat: 3
                });
            },
            water: () => {
                gsap.to(element, {
                    boxShadow: "0 0 30px #3B82F6",
                    duration: 0.3,
                    yoyo: true,
                    repeat: 3
                });
            }
        };
        
        if (effects[type]) {
            effects[type]();
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new PokedexGSAP();
});

// Exportar para uso global
window.PokedexGSAP = PokedexGSAP;
