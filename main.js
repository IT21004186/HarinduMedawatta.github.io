// ============================================
// Theme Toggle Functionality
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}

// ============================================
// Mobile Menu Toggle
// ============================================
const sidemenu = document.getElementById('sidemenu');
const navLinks = document.querySelectorAll('.nav-link');

function openmenu() {
    sidemenu.classList.add('active');
    body.style.overflow = 'hidden';
}

function closemenu() {
    sidemenu.classList.remove('active');
    body.style.overflow = '';
}

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closemenu();
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!sidemenu.contains(e.target) && !e.target.classList.contains('fa-bars')) {
        closemenu();
    }
});

// ============================================
// Smooth Scroll Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#home') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Active Navigation Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;
    const headerHeight = 80;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - headerHeight - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .service-card');
animateElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
});

// About image animation
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    aboutImage.style.opacity = '0';
    aboutImage.style.transform = 'translateX(-30px)';
    aboutImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    aboutObserver.observe(aboutImage);
}

// ============================================
// Typing Animation for Hero Section (Optional)
// ============================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Uncomment to enable typing animation
// const heroTagline = document.querySelector('.hero-tagline');
// if (heroTagline) {
//     const taglineText = heroTagline.textContent;
//     typeWriter(heroTagline, taglineText, 50);
// }

// ============================================
// Contact Form Handling with EmailJS
// ============================================
const contactForm = document.querySelector('#contact-form');
const submitBtn = document.querySelector('.submit-btn');
const submitText = document.getElementById('submitText');
const formMessage = document.getElementById('formMessage');
const nameInput = document.querySelector('#user_name');
const emailInput = document.querySelector('#user_email');
const subjectInput = document.querySelector('#subject');
const messageInput = document.querySelector('#message');

// EmailJS Configuration
const publicKey = "51eAbHxO25TsRhYFr";
const serviceID = "service_fnztb84";
const templateID = "template_p8kzqfh";

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(publicKey);
}

// Form validation
function validateForm() {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Reset previous error states
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.style.borderColor = '';
    });

    // Validate name
    if (nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }

    // Validate email
    if (!emailRegex.test(emailInput.value)) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subjectInput.value.trim().length < 3) {
        showFieldError(subjectInput, 'Subject must be at least 3 characters');
        isValid = false;
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#ef4444';
    field.focus();
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    setTimeout(() => {
        formMessage.style.opacity = '0';
        setTimeout(() => {
            formMessage.style.display = 'none';
            formMessage.style.opacity = '1';
        }, 300);
    }, 5000);
}

// Real-time validation
[nameInput, emailInput, subjectInput, messageInput].forEach(input => {
    input.addEventListener('blur', validateForm);
    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
            this.style.borderColor = '';
        }
    });
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateForm()) {
        showFormMessage('Please fill in all fields correctly', 'error');
        return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitText.textContent = 'Sending...';

    try {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not loaded');
        }

        const inputFields = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            subject: subjectInput.value.trim(),
            message: messageInput.value.trim()
        };

        await emailjs.send(serviceID, templateID, inputFields);

        // Success
        showFormMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        submitText.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';

        // Clear form
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';

        // Reset button after delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitText.textContent = 'Send Message';
            submitBtn.style.background = '';
        }, 3000);

    } catch (error) {
        console.error('EmailJS Error:', error);
        showFormMessage('Failed to send message. Please try again or contact me directly via email.', 'error');
        submitText.textContent = 'Failed';
        submitBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';

        // Reset button after delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitText.textContent = 'Send Message';
            submitBtn.style.background = '';
        }, 3000);
    }
});

// ============================================
// Lazy Loading Images (Intersection Observer)
// ============================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
}, {
    rootMargin: '50px'
});

document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    imageObserver.observe(img);
});

// ============================================
// Update Copyright Year
// ============================================
const currentYear = new Date().getFullYear();
const yearElement = document.getElementById('currentYear');
if (yearElement) {
    yearElement.textContent = currentYear;
}

// ============================================
// Header Scroll Effect
// ============================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Smooth Scroll for Buttons
// ============================================
document.querySelectorAll('.btn[href^="#"]').forEach(button => {
    button.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Page Load Animation
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Console Message
// ============================================
console.log('%c👋 Hello! Interested in my code?', 'font-size: 20px; font-weight: bold; color: #3B82F6;');
console.log('%cCheck out my GitHub: https://github.com/IT21004186', 'font-size: 14px; color: #8B5CF6;');
