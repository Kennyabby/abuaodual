// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== STICKY NAVBAR =====
let lastScroll = 0;
const navbar = $('#navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add sticky class when scrolled
  navbar.classList.toggle('sticky', currentScroll > 100);
  
  lastScroll = currentScroll;
});

// ===== MOBILE NAVBAR TOGGLE =====
const navToggle = $('#nav-toggle');
const navMenu = $('#nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  
  // Close menu when clicking on a link
  $$('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 968) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
      }
    }
  });
}

// ===== DROPDOWN TOGGLE (Mobile) =====
$$('.dropdown > .dropbtn').forEach(button => {
  button.addEventListener('click', (e) => {
    if (window.innerWidth <= 968) {
      e.preventDefault();
      const parent = button.parentElement;
      
      // Close other dropdowns
      $$('.dropdown').forEach(dropdown => {
        if (dropdown !== parent) {
          dropdown.classList.remove('active');
        }
      });
      
      parent.classList.toggle('active');
    }
  });
});

// ===== HERO SLIDER =====
let currentSlide = 0;
const slides = $$('.slide');
const indicators = $$('.indicator');

function showSlide(index) {
  // Remove active class from all slides and indicators
  slides.forEach(slide => slide.classList.remove('active'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Add active class to current slide and indicator
  if (slides[index]) {
    slides[index].classList.add('active');
  }
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-advance slides
let sliderInterval;
if (slides.length > 0) {
  sliderInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  $('.hero-slider')?.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
  });
  
  $('.hero-slider')?.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 5000);
  });
}

// Indicator click handlers
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => {
    goToSlide(index);
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 5000);
  });
});

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 5000);
  } else if (e.key === 'ArrowRight') {
    nextSlide();
    clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, 5000);
  }
});

// ===== SCROLL ANIMATIONS (Fade-in Elements) =====
const fadeElements = $$('.fade-in');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

fadeElements.forEach(element => {
  fadeInObserver.observe(element);
});

// ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip empty hashes
    if (href === '#' || !href) {
      e.preventDefault();
      return;
    }
    
    const target = $(href);
    if (target) {
      e.preventDefault();
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = $('#scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== CONTACT FORM HANDLING =====
const contactForm = $('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const subject = $('#subject')?.value.trim() || 'General Inquiry';
    const message = $('#message').value.trim();
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Show success message
    alert(`Thank you, ${name}! Your message has been received. We will get back to you shortly at ${email}.`);
    
    // Reset form
    contactForm.reset();
  });
}

// ===== NEWSLETTER FORM =====
const newsletterForm = $('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput?.value.trim();
    
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        alert(`Thank you for subscribing! We'll send updates to ${email}.`);
        newsletterForm.reset();
      } else {
        alert('Please enter a valid email address.');
      }
    }
  });
}

// ===== LEAFLET INTERACTIVE MAP =====
window.addEventListener('load', () => {
  const mapElement = $('#abuaMap');
  if (!mapElement) return;

  try {
    // Initialize map centered on Abua/Odual, Rivers State
    const map = L.map('abuaMap').setView([4.9264, 6.6665], 10);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Custom icon
    const customIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSIjMDA3YTAwIj48cGF0aCBkPSJNMTIgMkM4LjEzIDIgNSA1LjEzIDUgOWMwIDUuMjUgNyAxMyA3IDEzczctNy43NSA3LTEzYzAtMy44Ny0zLjEzLTctNy03em0wIDkuNWMtMS4zOCAwLTIuNS0xLjEyLTIuNS0yLjVzMS4xMi0yLjUgMi41LTIuNSAyLjUgMS4xMiAyLjUgMi41LTEuMTIgMi41LTIuNSAyLjV6Ii8+PC9zdmc+',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Add multiple key locations
    const locations = [
      { 
        name: 'Abua Central', 
        coords: [4.9264, 6.6665], 
        info: 'Administrative center of the LGA - Home to the local government secretariat.' 
      },
      { 
        name: 'Emohua Junction', 
        coords: [4.92, 6.63], 
        info: 'A busy hub linking major routes and facilitating commerce.' 
      },
      { 
        name: 'Odual Area', 
        coords: [4.91, 6.70], 
        info: 'Known for agriculture and vibrant markets serving the community.' 
      },
      { 
        name: 'Anyu Community', 
        coords: [4.95, 6.68], 
        info: 'A fast-growing residential area with modern developments.' 
      }
    ];

    locations.forEach(loc => {
      L.marker(loc.coords, { icon: customIcon })
        .addTo(map)
        .bindPopup(`<div style="text-align: center;"><b>${loc.name}</b><br><p style="margin-top: 8px; font-size: 14px;">${loc.info}</p></div>`);
    });

    // Draw LGA boundary (approximate)
    const boundaryCoords = [
      [4.97, 6.63],
      [4.90, 6.60],
      [4.86, 6.68],
      [4.91, 6.74],
      [4.98, 6.70]
    ];

    const boundary = L.polygon(boundaryCoords, {
      color: '#007a00',
      weight: 3,
      fillColor: '#007a00',
      fillOpacity: 0.15
    }).addTo(map);

    boundary.bindPopup('<div style="text-align: center;"><b>Abua-Odual LGA Boundary</b><br><p style="margin-top: 8px;">Approximate coverage area of the local government.</p></div>');

    // Hover effect on boundary
    boundary.on('mouseover', function() {
      this.setStyle({ fillOpacity: 0.35, weight: 4 });
    });
    
    boundary.on('mouseout', function() {
      this.setStyle({ fillOpacity: 0.15, weight: 3 });
    });

    // Fit the map view to the boundary
    map.fitBounds(boundary.getBounds(), { padding: [50, 50] });
  } catch (error) {
    console.error('Error initializing map:', error);
    mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666;"><p>Map could not be loaded. Please check your internet connection.</p></div>';
  }
});

// ===== ACTIVE NAVIGATION HIGHLIGHT =====
window.addEventListener('scroll', () => {
  const sections = $$('section[id]');
  const navLinks = $$('.nav-menu a[href^="#"]');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
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

// ===== PERFORMANCE: Lazy load images =====
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  $$('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== ACCESSIBILITY: Keyboard navigation enhancement =====
document.addEventListener('keydown', (e) => {
  // ESC to close mobile menu
  if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
    navMenu.classList.remove('active');
    const icon = navToggle?.querySelector('i');
    if (icon) {
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  }
});

// ===== PREVENT LAYOUT SHIFT =====
// Add min-height to sections to prevent content jumping
const sections = $$('section');
sections.forEach(section => {
  if (!section.style.minHeight) {
    const computedHeight = section.offsetHeight;
    if (computedHeight > 0) {
      section.style.minHeight = computedHeight + 'px';
    }
  }
});

// ===== CONSOLE LOG (Development) =====
console.log('%cAbua-Odual LGA Website', 'color: #007a00; font-size: 24px; font-weight: bold;');
console.log('%cBuilding a prosperous, sustainable, and united community', 'color: #666; font-size: 14px;');
