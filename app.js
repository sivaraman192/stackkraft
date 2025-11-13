// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const navMenu = document.getElementById('navMenu');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    }
  });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 200) {
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

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards, value cards, and other animated elements
const animatedElements = document.querySelectorAll('.service-card, .value-card, .stat-card, .info-card');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Portfolio card 3D tilt effect
const portfolioCards = document.querySelectorAll('[data-tilt]');

portfolioCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });
});

// Sphere items click handler
const sphereItems = document.querySelectorAll('.sphere-item');
sphereItems.forEach(item => {
  item.addEventListener('click', () => {
    // Add click feedback
    item.style.transform = item.style.transform + ' scale(0.95)';
    setTimeout(() => {
      item.style.transform = item.style.transform.replace(' scale(0.95)', '');
    }, 200);
    
    // You could add a modal or alert here to show project details
    console.log('Project clicked:', item.textContent);
  });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form-container form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    // Formspree will handle the submission
    // Add any additional client-side validation here if needed
    console.log('Form submitted');
  });
}

// Newsletter form handlers
const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter');
newsletterForms.forEach(form => {
  const button = form.querySelector('button');
  const input = form.querySelector('input');
  
  if (button && input) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const email = input.value;
      
      if (email && email.includes('@')) {
        // Store subscription in memory (since localStorage is not available)
        console.log('Newsletter subscription:', email);
        
        // Visual feedback
        button.textContent = '✓';
        button.style.background = '#00F0FF';
        input.value = '';
        
        setTimeout(() => {
          if (button.textContent === '✓') {
            button.textContent = button.closest('.footer-newsletter') ? '→' : 'Subscribe';
            button.style.background = '';
          }
        }, 2000);
      } else {
        // Show error feedback
        input.style.borderColor = '#FF296B';
        setTimeout(() => {
          input.style.borderColor = '';
        }, 2000);
      }
    });
  }
});

// CTA buttons handler
const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
ctaButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection && !button.type) {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// View Our Work button handler
const viewWorkButtons = document.querySelectorAll('.btn-secondary');
viewWorkButtons.forEach(button => {
  if (button.textContent.includes('View')) {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Parallax effect for hero background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroBg = document.querySelector('.hero-bg-pattern');
  if (heroBg) {
    heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover glow effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 10px 40px rgba(0, 240, 255, 0.3)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '';
  });
});



// Console welcome message
console.log('%c Stack Kraft ', 'background: linear-gradient(135deg, #00F0FF, #FF296B); color: #000; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Crafting Digital Identities ', 'color: #00F0FF; font-size: 14px; font-weight: normal;');
console.log('%c Website by Stack Kraft © 2025 ', 'color: #A7A9A9; font-size: 12px;');


const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme in localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️ Light Mode";
}

// Toggle theme on click
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});



