// Animação dos números de estatísticas
function animateStats() {
    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;
    
    const statElements = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.5
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statElements.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    const duration = 2000; // 2 segundos
                    const increment = Math.ceil(target / (duration / 30)); // 30 é aproximadamente a taxa de atualização
                    
                    let current = 0;
                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            stat.textContent = target;
                            clearInterval(counter);
                        } else {
                            stat.textContent = current;
                        }
                    }, 30);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, options);
    
    statsObserver.observe(statsSection);
}

// Carrossel de clientes
const carousel = document.querySelector('.carousel');
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

// Clone slides para infinito
if (carousel && track && slides.length > 0) {
    const slideWidth = slides[0].offsetWidth;
    const slidesToShow = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 3 : 4;
    let slideIndex = 0;

    // Duplicar slides para simular carrossel infinito
    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        track.appendChild(clone);
    });

    // Configurar largura do track
    function setTrackWidth() {
        const allSlides = document.querySelectorAll('.carousel-slide');
        track.style.width = `${allSlides.length * slideWidth}px`;
    }

    setTrackWidth();

    // Atualizar posição do carrossel
    function updateCarousel() {
        track.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
    }

    // Próximo slide
    function nextSlide() {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        slideIndex = (slideIndex + 1) % (totalSlides - slidesToShow);
        updateCarousel();
    }

    // Slide anterior
    function prevSlide() {
        const totalSlides = document.querySelectorAll('.carousel-slide').length;
        slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    // Event listeners para botões
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Redimensionar carrossel ao redimensionar janela
    window.addEventListener('resize', () => {
        setTrackWidth();
        updateCarousel();
    });

    // Auto scroll do carrossel a cada 3 segundos
    let autoScroll = setInterval(nextSlide, 3000);

    // Parar auto scroll quando o mouse estiver sobre o carrossel
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoScroll);
    });

    // Reiniciar auto scroll quando o mouse sair do carrossel
    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(nextSlide, 3000);
    });
}

// Botão voltar ao topo
const backToTopButton = document.querySelector('.back-to-top');

function toggleBackToTopButton() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
}

window.addEventListener('scroll', toggleBackToTopButton);

// Formulário de contato
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Simular envio do formulário
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simular delay de processamento
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Animação de elementos ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .about-card, .stat-item, .about-image, .about-text, .contact-form, .contact-info');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        
        if (elementPosition < screenPosition - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Aplicar estilos iniciais para animações
document.querySelectorAll('.service-card, .about-card, .stat-item, .about-image, .about-text, .contact-form, .contact-info').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', () => {
    animateOnScroll();
    animateStats();
});