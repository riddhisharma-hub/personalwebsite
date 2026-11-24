// 1. Artist / Engineer Theme Toggle (remembers choice on reload)
const themeBtn = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
  themeBtn.textContent = '☀️ Artist Mode';
}

themeBtn.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  themeBtn.textContent = isDark ? '☀️ Artist Mode' : '🌙 Engineer Mode';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 2. Interactive Polaroid: click to cycle captions
const polaroid = document.querySelector('.photo');
const caption = document.querySelector('.photo figcaption');
const captions = [
  'me, 2026',
  'debugging at 2 AM ⚡',
  'part artist, part engineer',
  'probably sketching a layout 🎨'
];
let captionIndex = 0;

polaroid.addEventListener('click', () => {
  captionIndex = (captionIndex + 1) % captions.length;
  caption.textContent = captions[captionIndex];
});

// 3. Smooth Scroll-Reveal for sections
const sections = document.querySelectorAll('section');
sections.forEach(sec => sec.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

sections.forEach(sec => observer.observe(sec));

// 4. One-Click Copy Email
const mailLink = document.querySelector('.contact-links a[href^="mailto:"]');
const email = 'riddhi.prsharma@gmail.com';

mailLink.addEventListener('click', (e) => {
  e.preventDefault();
  navigator.clipboard.writeText(email).then(() => {
    const originalText = mailLink.textContent;
    mailLink.textContent = 'Email Copied! ✓';
    setTimeout(() => {
      mailLink.textContent = originalText;
    }, 2000);
  });
});

// 5. Click-to-Stamp Artsy Doodles (ignores clicks on links/buttons/polaroid)
const doodles = ['✦', '⚡', '🎨', '★', '✿', '✨'];

document.addEventListener('click', (e) => {
  if (e.target.closest('a, button, .photo')) return;

  const stamp = document.createElement('span');
  stamp.className = 'doodle-stamp';
  stamp.textContent = doodles[Math.floor(Math.random() * doodles.length)];
  stamp.style.left = `${e.clientX}px`;
  stamp.style.top = `${e.clientY}px`;
  document.body.appendChild(stamp);

  setTimeout(() => stamp.remove(), 900);
});