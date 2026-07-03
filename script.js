/* ===================================================================
   MENU MOBILE - Controle do menu hambúrguer e overlay
   =================================================================== */
const header = document.getElementById("main-header");
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

// Efeito de scroll no header (muda o fundo quando rola a página)
function initHeaderScroll() {
  if (!header) return;
  const update = () => header.classList.toggle("scrolled", window.scrollY > 24);
  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Abrir/fechar o menu mobile
function initMobileMenu() {
  if (!menuToggle || !mobileMenu) return;

  function closeMenu() {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    mobileMenu.classList.add("open");
    menuToggle.classList.add("active");
    mobileMenu.setAttribute("aria-hidden", "false");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Fecha o menu ao clicar em um link
  mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

/* ===================================================================
   SCROLL REVEAL - Elementos aparecem suavemente ao rolar
   =================================================================== */
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

revealElements.forEach((el) => revealObserver.observe(el));

/* ===================================================================
   FAQ ACCORDION - Perguntas que abrem/fecham ao clicar
   =================================================================== */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    // Fecha todas as outras perguntas abertas
    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      openItem.classList.remove("open");
    });

    // Abre a pergunta clicada se não estava aberta
    if (!isOpen) item.classList.add("open");
  });
});

/* ===================================================================
   MENU ATIVO - Destaca o link do menu correspondente à seção visível
   =================================================================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let current = "";
  const headerHeight = header?.offsetHeight || 80;
  const scrollPos = window.scrollY + headerHeight + 20;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href").substring(1);
    if (href === current) link.classList.add("active");
  });
}

window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

/* ===================================================================
   NAVEGAÇÃO SUAVE - Scroll suave ao clicar nos links
   Considera a altura do header para não cortar o título da seção
   =================================================================== */
function smoothNavigate(href, target) {
  const headerHeight = header?.offsetHeight || 80;
  const targetPosition = target.offsetTop - headerHeight;

  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: "smooth",
  });

  history.pushState(null, null, href);
}

// Links do menu desktop
document.querySelectorAll('.nav-links a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Se for Home, vai para o topo
    if (href === "#" || href === "#hero") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      smoothNavigate(href, target);
    }
  });
});

// Links do menu mobile
document.querySelectorAll('.mobile-link[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#" || href === "#hero") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Fecha o menu mobile
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      smoothNavigate(href, target);
      // Fecha o menu mobile após clicar
      mobileMenu.classList.remove("open");
      menuToggle.classList.remove("active");
    }
  });
});

// Botão "Ver serviços" do Hero
const verServicosBtn = document.querySelector(".hero-buttons .btn-outline");
if (verServicosBtn) {
  verServicosBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector("#servicos");
    if (target) {
      smoothNavigate("#servicos", target);
    }
  });
}

/* ===================================================================
   WHATSAPP - Botão "Enviar mensagem" usa o texto do textarea
   Os outros botões do WhatsApp usam mensagem padrão
   =================================================================== */
const phoneNumber = "5585992648353";
const textarea = document.getElementById("customMessage");
const sendBtn = document.getElementById("sendWhatsappBtn");

const DEFAULT_MESSAGE =
  "Olá Gabriel! Vi seu site e quero criar um site para meu negócio. Meu nome é [seu nome] e meu negócio é [seu negócio]. Gostaria de saber mais sobre os valores e prazos.";

// Carrega a mensagem padrão no textarea
if (textarea) {
  textarea.value = DEFAULT_MESSAGE;
}

// Botão "Enviar mensagem no WhatsApp" (usa mensagem personalizada)
if (sendBtn) {
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const message = textarea ? textarea.value : DEFAULT_MESSAGE;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

/* ===================================================================
   E-MAIL - Abre o Gmail no navegador com o assunto pré-preenchido
   =================================================================== */
const emailLink = document.getElementById("emailLink");
const emailAddress = "gabriel.teixeira0417@gmail.com";
const emailSubject = "Orçamento para site - GL Dev";

if (emailLink) {
  emailLink.addEventListener("click", (e) => {
    e.preventDefault();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(emailSubject)}`;
    window.open(gmailUrl, "_blank");
  });
}

/* ===================================================================
   INICIALIZAÇÃO - Executa as funções quando a página carrega
   =================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
});
