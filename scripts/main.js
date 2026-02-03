/* ========================================
   DIESLEY SOUSA - RUNNER PORTFOLIO
   JavaScript Interactions
   ======================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initCounterAnimations();
    initTrainButton();
    initCountdown();
    initStravaWidget();
    initPricingModal();
    initPaceChart();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (!menuToggle || !nav) return;

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const menuLinks = nav.querySelectorAll('.header__link');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

/**
 * Smooth Scroll for Navigation Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    // Add scroll-animate class to elements
    const animateElements = [
        '.hero__content',
        '.stats__comparison',
        '.stats__evolution',
        '.stats__zones',
        '.stats__schedule',
        '.origin__content',
        '.visibility__main-text',
        '.visibility__benefits',
        '.visibility__tiers',
        '.partners__grid'
    ];

    animateElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('scroll-animate');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Trigger counter animation if it's a stats element
                if (entry.target.classList.contains('stats__comparison')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.getElementById('header');

    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = 'none';
            return;
        }

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down - hide header
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up - show header
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Counter Animations
 */
function initCounterAnimations() {
    // Store counter elements for later animation
    window.countersAnimated = false;
}

function animateCounters() {
    if (window.countersAnimated) return;
    window.countersAnimated = true;

    // Animate VO2Max
    const vo2maxElement = document.querySelector('.stats__vo2max-value');
    if (vo2maxElement) {
        animateNumber(vo2maxElement, 0, 68.73, 2000, 2);
    }

    // Animate times (we'll just add a pulse effect)
    const timeElements = document.querySelectorAll('.stats__race-time');
    timeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.animation = 'pulse 0.5s ease';
        }, index * 300);
    });
}

/**
 * Animate a number from start to end
 */
function animateNumber(element, start, end, duration, decimals = 0) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

        const current = start + (end - start) * easeProgress;
        element.textContent = current.toFixed(decimals).replace('.', ',');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Train Button Interaction
 */
function initTrainButton() {
    const trainButton = document.getElementById('trainButton');

    if (!trainButton) return;

    trainButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Create a modal or redirect to trainer's page
        showTrainerModal();
    });
}

/**
 * Show Trainer Modal
 */
function showTrainerModal() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'trainer-modal';
    modal.innerHTML = `
        <div class="trainer-modal__overlay"></div>
        <div class="trainer-modal__content">
            <button class="trainer-modal__close">&times;</button>
            <div class="trainer-modal__logo">
                <span>WILL RUNNER</span>
                <small>PERSONAL</small>
            </div>
            <h3 class="trainer-modal__title">Treine com o Meu Treinador</h3>
            <p class="trainer-modal__text">
                Metodologia baseada em periodização ondulatória e análise de dados fisiológicos 
                para maximizar a performance sem lesões.
            </p>
            <div class="trainer-modal__contact">
                <a href="tel:+5534984069997" class="trainer-modal__button">
                    📱 (34) 98406-9997
                </a>
                <a href="https://instagram.com/willrunner" target="_blank" class="trainer-modal__button trainer-modal__button--secondary">
                    📷 @willrunner
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .trainer-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: fadeIn 0.3s ease;
        }
        
        .trainer-modal__overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .trainer-modal__content {
            position: relative;
            background: #1A1A1A;
            border-radius: 16px;
            padding: 2rem;
            max-width: 400px;
            width: 100%;
            text-align: center;
            border: 1px solid #2D2D2D;
            animation: fadeInUp 0.3s ease;
        }
        
        .trainer-modal__close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            color: #707070;
            font-size: 1.5rem;
            cursor: pointer;
            transition: color 0.2s;
        }
        
        .trainer-modal__close:hover {
            color: #FF6B00;
        }
        
        .trainer-modal__logo {
            margin-bottom: 1.5rem;
        }
        
        .trainer-modal__logo span {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
            color: #FFFFFF;
            display: block;
        }
        
        .trainer-modal__logo small {
            font-size: 0.625rem;
            letter-spacing: 4px;
            color: #707070;
        }
        
        .trainer-modal__title {
            font-family: 'Montserrat', sans-serif;
            font-weight: 700;
            color: #FF6B00;
            margin-bottom: 1rem;
        }
        
        .trainer-modal__text {
            font-size: 0.875rem;
            color: #B0B0B0;
            line-height: 1.7;
            margin-bottom: 1.5rem;
        }
        
        .trainer-modal__contact {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }
        
        .trainer-modal__button {
            display: block;
            padding: 0.875rem 1.5rem;
            background: #FF6B00;
            color: #0D0D0D;
            border-radius: 9999px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s;
        }
        
        .trainer-modal__button:hover {
            background: #FF8C38;
            transform: translateY(-2px);
        }
        
        .trainer-modal__button--secondary {
            background: transparent;
            border: 1px solid #2D2D2D;
            color: #FFFFFF;
        }
        
        .trainer-modal__button--secondary:hover {
            background: #2D2D2D;
            border-color: #3D3D3D;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Close modal on overlay click or close button
    const closeModal = () => {
        modal.remove();
        style.remove();
        document.body.style.overflow = '';
    };

    modal.querySelector('.trainer-modal__overlay').addEventListener('click', closeModal);
    modal.querySelector('.trainer-modal__close').addEventListener('click', closeModal);

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

/**
 * Parallax Effect (subtle)
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero__background');

    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/**
 * Add active state to current section in nav
 */
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active navigation
initActiveNavigation();

/**
 * Race Countdown Timer
 * Target: Uberaba 21k Half Marathon 2026 - 29/03/2026 às 06:30
 */
function initCountdown() {
    const targetDate = new Date('2026-03-29T06:30:00-03:00').getTime();

    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            // Race has started
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * Strava Widget - Last Activity (via Cloudflare Worker)
 */
function initStravaWidget() {
    // URL do Cloudflare Worker (credenciais seguras no servidor)
    const workerUrl = 'https://strava-api.diesleybrayan.workers.dev';

    const widget = document.getElementById('strava-widget');
    if (!widget) return;

    fetch(workerUrl)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                showStravaError(widget, data.error);
            } else {
                updateStravaWidget(data, widget);
            }
        })
        .catch(e => {
            console.error("Erro ao buscar Strava:", e);
            showStravaError(widget, 'Erro de conexão');
        });
}

function updateStravaWidget(run, widget) {
    const distanceKm = (run.distance / 1000).toFixed(2);
    const movingTimeMin = Math.floor(run.moving_time / 60);
    const movingTimeSec = run.moving_time % 60;
    const date = new Date(run.start_date).toLocaleDateString('pt-BR');
    const runName = run.name;

    // Calculate pace (min/km)
    const paceSeconds = run.moving_time / (run.distance / 1000);
    const paceMin = Math.floor(paceSeconds / 60);
    const paceSec = Math.floor(paceSeconds % 60);

    widget.innerHTML = `
        <div class="strava__header">
            <svg class="strava__icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
            </svg>
            <span class="strava__title">ÚLTIMA CORRIDA</span>
        </div>
        <p class="strava__name">${runName}</p>
        <div class="strava__stats">
            <div class="strava__stat">
                <span class="strava__stat-label">🏃 Distância</span>
                <span class="strava__stat-value">${distanceKm} km</span>
            </div>
            <div class="strava__stat">
                <span class="strava__stat-label">⏱️ Tempo</span>
                <span class="strava__stat-value">${movingTimeMin}:${String(movingTimeSec).padStart(2, '0')}</span>
            </div>
            <div class="strava__stat">
                <span class="strava__stat-label">📊 Pace</span>
                <span class="strava__stat-value">${paceMin}:${String(paceSec).padStart(2, '0')}/km</span>
            </div>
        </div>
        <p class="strava__date">📅 ${date}</p>
    `;
}

function showStravaError(widget, message) {
    widget.innerHTML = `
        <div class="strava__header">
            <svg class="strava__icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
            </svg>
            <span class="strava__title">ÚLTIMA CORRIDA</span>
        </div>
        <p class="strava__loading">${message}</p>
    `;
}

/**
 * Pricing Modal
 */
function initPricingModal() {
    const modal = document.getElementById('pricingModal');
    if (!modal) return;

    const overlay = document.getElementById('pricingOverlay');
    const closeBtn = document.getElementById('closePricingModal');
    // Select all buttons that trigger the pricing modal
    const openBtns = document.querySelectorAll('[data-modal="pricing"]');

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    openBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Pace Evolution Chart
 */
function initPaceChart() {
    const canvas = document.getElementById('paceEvolutionChart');
    if (!canvas) return;

    // Dados de evolução de pace (5K) - do mais antigo para o mais recente
    const data = {
        labels: [
            'Natal Solidário\n(Dez/25)',
            'UNIMED\n(Dez/25)',
            'IFTM\n(Dez/25)',
            'WR Run\n(Jan/26)'
        ],
        datasets: [{
            label: 'Pace (min/km)',
            data: [
                4.27,  // 21:20 / 5km = 4:16
                4.01,  // 20:07 / 5km = 4:01
                3.81,  // 19:03 / 5km = 3:48
                3.50   // 17:31 / 5km = 3:30
            ],
            borderColor: '#FF6B00',
            backgroundColor: 'rgba(255, 107, 0, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4, // Smooth curve
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#FF6B00',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointHoverBackgroundColor: '#FF8C38',
            pointHoverBorderColor: '#FFFFFF',
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.95)',
                    titleColor: '#FF6B00',
                    bodyColor: '#FFFFFF',
                    borderColor: '#2D2D2D',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            const pace = context.parsed.y;
                            const paceMin = Math.floor(pace);
                            const paceSec = Math.round((pace - paceMin) * 60);
                            return `Pace: ${paceMin}:${String(paceSec).padStart(2, '0')}/km`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    reverse: true, // Lower is better for pace
                    beginAtZero: false,
                    min: 3.0,
                    max: 4.5,
                    ticks: {
                        color: '#B0B0B0',
                        font: {
                            size: 12,
                            family: "'Inter', sans-serif"
                        },
                        callback: function (value) {
                            const paceMin = Math.floor(value);
                            const paceSec = Math.round((value - paceMin) * 60);
                            return `${paceMin}:${String(paceSec).padStart(2, '0')}`;
                        }
                    },
                    grid: {
                        color: '#2D2D2D',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: '#B0B0B0',
                        font: {
                            size: 11,
                            family: "'Inter', sans-serif"
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };

    new Chart(canvas, config);
}
