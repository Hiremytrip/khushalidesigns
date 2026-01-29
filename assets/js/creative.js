/* ========================================
   KHUSHALI DESIGN STUDIO - Creative JS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Preloader with Progress (first visit only)
    // ========================================
    const preloader = document.querySelector('.preloader');
    const preloaderProgress = document.querySelector('.preloader-progress');
    const preloaderPercentage = document.querySelector('.preloader-percentage');

    if (preloader && sessionStorage.getItem('preloaderShown')) {
        // Already shown this session — skip preloader immediately
        preloader.remove();
        document.body.classList.remove('loading');
        initGSAPAnimations();
    } else {
        let progress = 0;
        const preloaderInterval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(preloaderInterval);

                setTimeout(() => {
                    if (preloader) {
                        preloader.classList.add('hidden');
                        document.body.classList.remove('loading');
                    }
                    sessionStorage.setItem('preloaderShown', 'true');
                    // Initialize GSAP animations after preloader
                    initGSAPAnimations();
                }, 500);
            }

            if (preloaderProgress) {
                preloaderProgress.style.width = progress + '%';
            }
            if (preloaderPercentage) {
                preloaderPercentage.textContent = Math.floor(progress) + '%';
            }
        }, 100);
    }

    // ========================================
    // Enhanced Custom Cursor with Text Labels
    // ========================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const cursorText = document.querySelector('.cursor-text');

    if (cursor && cursorFollower && window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        // Easing values - different for main cursor and follower
        const mainEasing = 0.15;
        const followerEasing = 0.08;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Main cursor with faster easing
            cursorX += (mouseX - cursorX) * mainEasing;
            cursorY += (mouseY - cursorY) * mainEasing;

            // Follower with slower easing (trail effect)
            followerX += (mouseX - followerX) * followerEasing;
            followerY += (mouseY - followerY) * followerEasing;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Cursor hover effects - Magnifying glass zoom effect
        const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .gallery-item');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');

                // Add zoom/magnify effect to element
                el.style.transition = 'transform 0.3s ease';
                el.style.transform = 'scale(1.05)';
                el.style.zIndex = '10';
            });

            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');

                // Remove zoom effect
                el.style.transform = 'scale(1)';
                el.style.zIndex = '';
            });
        });
    }

    // ========================================
    // Particles Background
    // ========================================
    const particlesContainer = document.querySelector('.particles');

    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // ========================================
    // Navigation Scroll Effect
    // ========================================
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    function handleScroll() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ========================================
    // Fullscreen Menu
    // ========================================
    const fullscreenMenu = document.querySelector('.fullscreen-menu');

    if (menuToggle && fullscreenMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            fullscreenMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu on link click
        const fullscreenLinks = document.querySelectorAll('.fullscreen-link');
        fullscreenLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                fullscreenMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', (e) => {
        // ESC to close fullscreen menu
        if (e.key === 'Escape') {
            if (fullscreenMenu && fullscreenMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                fullscreenMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }

            // Close lightbox if open
            const lightbox = document.querySelector('.lightbox.active');
            if (lightbox) {
                closeLightbox();
            }
        }

        // Arrow keys for lightbox navigation
        const lightbox = document.querySelector('.lightbox.active');
        if (lightbox) {
            if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
            if (e.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });

    // ========================================
    // Active link on scroll
    // ========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // ========================================
    // Portfolio Filter
    // ========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // Testimonials Slider
    // ========================================
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimonials-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // ========================================
    // Stats Counter Animation
    // ========================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        const sectionTop = statsSection.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;

        if (sectionTop < triggerPoint) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.dataset.count);
                const duration = 2000;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeProgress * target);
                    stat.textContent = current + '+';

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    }
                }

                requestAnimationFrame(updateCount);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats();

    // ========================================
    // Scroll Reveal Animations
    // ========================================
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    function revealOnScroll() {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.85;

            if (elementTop < triggerPoint) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.querySelector('.back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                gsap.to(window, { duration: 1, scrollTo: 0, ease: 'power2.inOut' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }

    // ========================================
    // GSAP Scroll Animations
    // ========================================
    function initGSAPAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // Parallax effect on hero
        const heroBg = document.querySelector('.hero-bg img');
        if (heroBg) {
            gsap.to(heroBg, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        // Section titles fade in
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                opacity: 0,
                y: 50,
                duration: 1,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Staggered service cards
        gsap.utils.toArray('.service-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 80,
                duration: 0.8,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Staggered portfolio items
        gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                scale: 0.9,
                duration: 0.6,
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Process timeline items
        gsap.utils.toArray('.process-item').forEach((item, i) => {
            gsap.from(item, {
                opacity: 0,
                x: i % 2 === 0 ? -50 : 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Smooth anchor scrolling with GSAP
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: { y: target, offsetY: 80 },
                        ease: 'power2.inOut'
                    });
                }
            });
        });
    }

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(i => i.classList.remove('active'));

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // ========================================
    // Lightbox Gallery
    // ========================================
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item');

    let currentIndex = 0;
    const galleryImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push(img.src);

            item.addEventListener('click', () => {
                currentIndex = index;
                openLightbox(img.src);
            });
        }
    });

    function openLightbox(src) {
        if (lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.classList.add('lightbox-open');
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
        }
    }

    function showPrevImage() {
        if (galleryImages.length === 0) return;
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        if (lightboxImg) lightboxImg.src = galleryImages[currentIndex];
    }

    function showNextImage() {
        if (galleryImages.length === 0) return;
        currentIndex = (currentIndex + 1) % galleryImages.length;
        if (lightboxImg) lightboxImg.src = galleryImages[currentIndex];
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // ========================================
    // Contact Form Handling
    // ========================================
    const contactForm = document.querySelector('.contact-form form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Simulate form submission
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#4CAF50';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const input = this.querySelector('input');
            const btn = this.querySelector('button');
            const originalHTML = btn.innerHTML;

            if (input.value) {
                btn.innerHTML = '<i class="fas fa-check"></i>';

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    input.value = '';
                }, 2000);
            }
        });
    }

    // ========================================
    // Gallery Marquee Duplication
    // ========================================
    const marquee = document.querySelector('.marquee');
    if (marquee) {
        const marqueeContent = marquee.innerHTML;
        marquee.innerHTML += marqueeContent;
    }

    // ========================================
    // Magnetic Button Effect
    // ========================================
    const magneticBtns = document.querySelectorAll('.nav-cta, .btn-primary');

    if (window.innerWidth > 1024) {
        magneticBtns.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ========================================
    // Tilt Effect for Cards
    // ========================================
    if (window.innerWidth > 1024) {
        const tiltCards = document.querySelectorAll('.service-card, .testimonial-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });

            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // ========================================
    // Cookie Consent Banner
    // ========================================
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDecline = document.getElementById('cookieDecline');

    if (cookieConsent && !localStorage.getItem('cookieConsent')) {
        setTimeout(function() {
            cookieConsent.classList.add('active');
        }, 1000);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.remove('active');
        });
    }

    if (cookieDecline) {
        cookieDecline.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieConsent.classList.remove('active');
        });
    }

});
