/* ========================================
   ANTRA - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ========================================
    // Back to Top Button
    // ========================================
    const backToTop = document.querySelector('.back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // Hero Slider
    // ========================================
    const heroSlider = new Swiper('.hero-slider', {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.hero-pagination',
            clickable: true,
        },
    });

    // ========================================
    // Projects Slider
    // ========================================
    const projectsSlider = new Swiper('.projects-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    // ========================================
    // Testimonials Slider
    // ========================================
    const testimonialsSlider = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
    });

    // ========================================
    // Partners Slider
    // ========================================
    const partnersSlider = new Swiper('.partners-slider', {
        slidesPerView: 2,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 3,
            },
            992: {
                slidesPerView: 5,
            },
            1200: {
                slidesPerView: 6,
            },
        },
    });

    // ========================================
    // Blog Slider
    // ========================================
    const blogSlider = new Swiper('.blog-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
        },
    });

    // ========================================
    // Counter Animation
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);

        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        updateCounter();
    }

    // Intersection Observer for counter animation
    const statNumbers = document.querySelectorAll('.stat-box .stat-number span[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(number => {
        counterObserver.observe(number);
    });

    // ========================================
    // Service Item Hover Effect
    // ========================================
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceImage = document.querySelector('.services-image img');

    const serviceImages = [
        'assets/images/service-1.jpg',
        'assets/images/service-2.jpg',
        'assets/images/service-3.jpg',
        'assets/images/service-4.jpg',
        'assets/images/service-5.jpg',
        'assets/images/service-6.jpg',
    ];

    serviceItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            serviceItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            if (serviceImage && serviceImages[index]) {
                serviceImage.src = serviceImages[index];
            }
        });
    });

    // ========================================
    // Team Member Hover Effect
    // ========================================
    const teamMembers = document.querySelectorAll('.team-member');
    const teamImage = document.querySelector('.team-image img');

    const teamImages = [
        'assets/images/team-1.jpg',
        'assets/images/team-2.jpg',
        'assets/images/team-3.jpg',
        'assets/images/team-4.jpg',
        'assets/images/team-5.jpg',
    ];

    teamMembers.forEach((member, index) => {
        member.addEventListener('mouseenter', function() {
            teamMembers.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            if (teamImage && teamImages[index]) {
                teamImage.src = teamImages[index];
            }
        });
    });

    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }

    // ========================================
    // Scroll Reveal Animation
    // ========================================
    const revealElements = document.querySelectorAll('.service-card, .process-step, .project-card, .blog-card, .stat-box');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        revealObserver.observe(element);
    });

    // ========================================
    // Parallax Effect for Background Images
    // ========================================
    const parallaxElements = document.querySelectorAll('.hero-slide, .video-cta-section');

    window.addEventListener('scroll', function() {
        parallaxElements.forEach(element => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            element.style.backgroundPositionY = rate + 'px';
        });
    });

    // ========================================
    // Video Play Button
    // ========================================
    const playBtn = document.querySelector('.play-btn');

    if (playBtn) {
        playBtn.addEventListener('click', function() {
            // Create video modal
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            modal.innerHTML = `
                <div class="video-modal-content">
                    <button class="video-close">&times;</button>
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allowfullscreen></iframe>
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';

            // Close modal
            modal.addEventListener('click', function(e) {
                if (e.target === modal || e.target.classList.contains('video-close')) {
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ========================================
    // Newsletter Form
    // ========================================
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                // Show success message
                const btn = this.querySelector('button');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i>';
                btn.style.background = '#4CAF50';

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    this.reset();
                }, 2000);
            }
        });
    }

    // ========================================
    // Image Lazy Loading
    // ========================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        lazyObserver.observe(img);
    });

    // ========================================
    // Gallery Lightbox
    // ========================================
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryItems.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${this.src}" alt="${this.alt}">
                </div>
            `;
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';

            setTimeout(() => lightbox.classList.add('active'), 10);

            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }, 300);
                }
            });
        });
    });

    // ========================================
    // Preloader
    // ========================================
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 500);
        }
    });

});

// ========================================
// Add CSS for Dynamic Elements
// ========================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    .video-modal {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .video-modal-content {
        position: relative;
        width: 90%;
        max-width: 900px;
    }

    .video-modal-content iframe {
        width: 100%;
        height: 500px;
    }

    .video-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }

    .lightbox {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .lightbox.active {
        opacity: 1;
    }

    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }

    .lightbox-content img {
        max-width: 100%;
        max-height: 90vh;
        object-fit: contain;
    }

    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 30px;
        cursor: pointer;
    }

    .preloader {
        position: fixed;
        inset: 0;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        transition: opacity 0.5s ease;
    }

    .preloader.fade-out {
        opacity: 0;
    }

    .main-nav.active {
        display: block !important;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }

    .main-nav.active .nav-list {
        flex-direction: column;
        gap: 0;
    }

    .main-nav.active .nav-link {
        color: #333;
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }

    .mobile-menu-btn.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-btn.active span:nth-child(2) {
        opacity: 0;
    }

    .mobile-menu-btn.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(dynamicStyles);
