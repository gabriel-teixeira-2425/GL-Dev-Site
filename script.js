/* ===================================================================
   MENU MOBILE (estilo Brownie)
   =================================================================== */
const header = document.getElementById('main-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

function initHeaderScroll() {
  if (!header) return;
  const update = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initMobileMenu() {
  if (!menuToggle || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  function openMenu() {
    mobileMenu.classList.add('open');
    menuToggle.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

/* ===================================================================
   SCROLL REVEAL
   =================================================================== */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ===================================================================
   FAQ ACCORDION
   =================================================================== */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      openItem.classList.remove('open');
    });

    if (!isOpen) item.classList.add('open');
  });
});

/* ===================================================================
   MENU ATIVO (DESTAQUE)
   =================================================================== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  const scrollPos = window.scrollY + 150;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').substring(1);
    if (href === current) link.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

/* ===================================================================
   WHATSAPP - APENAS O BOTÃO "ENVIAR MENSAGEM" USA O TEXTAREA
   =================================================================== */
const phoneNumber = '5585992648353';
const textarea = document.getElementById('customMessage');
const sendBtn = document.getElementById('sendWhatsappBtn');

const DEFAULT_MESSAGE = 'Olá Gabriel! Vi seu site e quero criar um site para meu negócio. Meu nome é [seu nome] e meu negócio é [seu negócio]. Gostaria de saber mais sobre os valores e prazos.';

if (textarea) {
  textarea.value = DEFAULT_MESSAGE;
}

// APENAS este botão usa a mensagem do textarea
if (sendBtn) {
  sendBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const message = textarea ? textarea.value : DEFAULT_MESSAGE;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}

/* ===================================================================
   E-MAIL (ABRE GMAIL)
   =================================================================== */
const emailLink = document.getElementById('emailLink');
const emailAddress = 'gabriel.teixeira0417@gmail.com';
const emailSubject = 'Orçamento para site - GL Dev';

if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(emailSubject)}`;
    window.open(gmailUrl, '_blank');
  });
}

/* ===================================================================
   INICIALIZAÇÃO
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
});