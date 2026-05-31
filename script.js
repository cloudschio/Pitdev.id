// ===== DARK / LIGHT MODE =====
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// ===== TYPING ANIMATION =====
const roles = [
  'Graphic Designer',
  'Freelancer',
  'UI/UX Enthusiast',
  'Digital Printing Operator'
];
let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typedText');

function typeWriter() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedText.textContent = current.substring(0, charIndex--);
  } else {
    typedText.textContent = current.substring(0, charIndex++);
  }
  if (!isDeleting && charIndex === current.length + 1) {
    isDeleting = true;
    setTimeout(typeWriter, 1800);
    return;
  }
  if (isDeleting && charIndex === -1) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeWriter, isDeleting ? 60 : 100);
}
typeWriter();

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('formName').value.trim();
  const email = document.getElementById('formEmail').value.trim();
  const message = document.getElementById('formMessage').value.trim();

  // Ganti dengan Form ID Formspree kamu
  const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

  submitBtn.disabled = true;
  btnText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    if (res.ok) {
      formStatus.textContent = '✅ Pesan berhasil dikirim! Terima kasih.';
      formStatus.className = 'form-status success';
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    formStatus.textContent = '❌ Gagal mengirim. Silakan hubungi via WhatsApp.';
    formStatus.className = 'form-status error';
  } finally {
    submitBtn.disabled = false;
    btnText.innerHTML = '<i class="fas fa-paper-plane"></i> Kirim Pesan';
  }
});
