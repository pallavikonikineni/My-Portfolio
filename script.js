// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const emailLinks = document.querySelectorAll('#email-link, #footer-email');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation highlighting
function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Email display functionality
emailLinks.forEach(emailLink => {
    emailLink.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = 'pallavikonikineni1111@gmail.com';
        
        // Create a popup to show email
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            border-radius: 15px;
            padding: 2rem;
            backdrop-filter: blur(10px);
            z-index: 1001;
            color: var(--text-primary);
            text-align: center;
            box-shadow: var(--shadow-glow);
            max-width: 400px;
            width: 90%;
        `;
        
        popup.innerHTML = `
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">Contact Me</h3>
            <p style="margin-bottom: 1rem;">My email address is:</p>
            <p style="font-size: 1.2rem; font-weight: 600; color: var(--primary-color); margin-bottom: 1.5rem;">${email}</p>
            <button id="copyEmail" style="
                background: var(--gradient-primary);
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                margin-right: 1rem;
                transition: all 0.3s ease;
            ">Copy Email</button>
            <button id="closePopup" style="
                background: var(--bg-tertiary);
                border: 1px solid var(--border-color);
                padding: 0.75rem 1.5rem;
                border-radius: 25px;
                color: var(--text-primary);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            ">Close</button>
        `;
        
        document.body.appendChild(popup);
        
        // Copy email functionality
        document.getElementById('copyEmail').addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(email);
                document.getElementById('copyEmail').textContent = 'Copied!';
                setTimeout(() => {
                    document.getElementById('copyEmail').textContent = 'Copy Email';
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                document.getElementById('copyEmail').textContent = 'Copied!';
                setTimeout(() => {
                    document.getElementById('copyEmail').textContent = 'Copy Email';
                }, 2000);
            }
        });
        
        // Close popup functionality
        document.getElementById('closePopup').addEventListener('click', () => {
            document.body.removeChild(popup);
        });
        
        // Close on background click
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                document.body.removeChild(popup);
            }
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
            
            // Animate stats
            if (entry.target.id === 'about') {
                animateStats();
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

// Animate statistics counters
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalNumber = parseInt(stat.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                stat.textContent = finalNumber + '+';
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentNumber) + '+';
            }
        }, 30);
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const animateElements = document.querySelectorAll('.cert-card, .project-card, .badge-card, .skill-category');
    
    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

// Particle background animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 255, 255, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${5 + Math.random() * 10}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Parallax effect for hero section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
}

// Enhanced scroll listener
window.addEventListener('scroll', () => {
    updateActiveNav();
    animateOnScroll();
    parallaxEffect();
    
    // Add scroll class to navbar
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 26, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.9)';
    }
});

// Mouse move effect for cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.cert-card, .project-card, .badge-card, .skill-category');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add hover glow effect
const cards = document.querySelectorAll('.cert-card, .project-card, .badge-card, .skill-category');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.setProperty('--glow-opacity', '0.15');
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--glow-opacity', '0');
    });
});

// Typing effect for hero title
function typeWriterEffect() {
    const text = "Pallavi Konikineni";
    const titleElement = document.querySelector('.shimmer-text');
    let index = 0;
    
    titleElement.textContent = '';
    
    function type() {
        if (index < text.length) {
            titleElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        }
    }
    
    // Start typing effect after page load
    setTimeout(type, 1000);
}

// Loading animation
function showLoadingAnimation() {
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        document.body.style.overflow = '';
        typeWriterEffect();
    }, 500);
}

// Initialize animations and effects
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    showLoadingAnimation();
    
    // Add entrance animations to elements
    const animateElements = document.querySelectorAll('.hero-text, .hero-visual, .section-header');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * (index + 1));
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Focus management for accessibility
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.classList.add('focused');
    });
    
    link.addEventListener('blur', () => {
        link.classList.remove('focused');
    });
});

// Preload critical images and resources
function preloadResources() {
    const criticalResources = [
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Performance optimization
function optimizePerformance() {
    // Throttle scroll events
    let ticking = false;
    
    function updateScrollElements() {
        updateActiveNav();
        animateOnScroll();
        parallaxEffect();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollElements);
            ticking = true;
        }
    }
    
    window.removeEventListener('scroll', updateActiveNav);
    window.removeEventListener('scroll', animateOnScroll);
    window.removeEventListener('scroll', parallaxEffect);
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Initialize performance optimizations
optimizePerformance();
preloadResources();

// Error handling for navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const target = document.querySelector(href);
        
        if (!target) {
            console.warn(`Navigation target not found: ${href}`);
            e.preventDefault();
        }
    });
});

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('aria-expanded', 'false');
    
    navToggle.addEventListener('click', () => {
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility improvements
improveAccessibility();

// Service worker registration for performance
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker would be implemented here for caching
        console.log('Service worker support detected');
    });
}

// Analytics and performance monitoring
function trackPerformance() {
    // Performance monitoring would be implemented here
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
        });
    }
}

// Initialize performance tracking
trackPerformance();

// Cleanup function for event listeners
window.addEventListener('beforeunload', () => {
    // Cleanup any remaining intervals or timeouts
    observer.disconnect();
});

console.log('Portfolio application initialized successfully');