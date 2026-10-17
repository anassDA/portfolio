// ==========================================================================
// ANASS DADA — Portfolio Interactivity, Filtering & Typewriter
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. TYPEWRITER EFFECT
  const phrases = [
    'Élève Ingénieur en 5ème année @ EMSI Rabat',
    'Certifié Oracle Java SE 17 Developer',
    'Concepteur Microservices & Spring Cloud',
    'Développeur Full Stack Java & Angular / React',
    'Spécialisé en Sécurité Applicative & OWASP',
    'En recherche active de Stage PFE (Février 2027)'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterEl = document.getElementById('typewriter');
  const typeSpeed = 70;
  const backSpeed = 35;
  const pauseEnd = 1600;

  function typeEffect() {
    if (!typewriterEl) return;
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeEffect, delay);
  }
  typeEffect();

  // 2. NAVBAR SCROLL EFFECT & ACTIVE NAVIGATION
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. MOBILE MENU TOGGLE
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.querySelector('.nav-links');

  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      navLinksList.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksList.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // 4. PROJECT CATEGORY FILTERING
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease';
            card.style.opacity = '1';
          }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.timeline-item, .project-card, .skill-category-box, .edu-card, .feature-card').forEach(el => {
    observer.observe(el);
  });

  // 6. CONTACT FORM HANDLER (Direct mailto trigger with notification)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;

      const mailtoUrl = `mailto:dadaanass01@gmail.com?subject=${encodeURIComponent('[Portfolio Stage PFE] ' + subject + ' - ' + name)}&body=${encodeURIComponent("Nom: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;

      window.location.href = mailtoUrl;

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Message prêt pour envoi !</span>';
      submitBtn.style.background = '#10b981';

      setTimeout(() => {
        submitBtn.innerHTML = originalHtml;
        submitBtn.style.background = '';
        contactForm.reset();
      }, 4000);
    });
  }
});
