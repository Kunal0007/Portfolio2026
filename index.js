document.addEventListener('DOMContentLoaded', function () {

// Typing animation for hero name
const nameInner = document.querySelector('.hero-name-inner');
const cursor = document.querySelector('.hero-cursor');
if (nameInner && cursor) {
    const text = 'Kunal Patil';
    let i = 0;
    setTimeout(() => {
        const type = () => {
            if (i < text.length) {
                nameInner.textContent += text[i];
                i++;
                setTimeout(type, 90);
            } else {
                cursor.classList.add('done');
                setTimeout(() => { cursor.style.display = 'none'; }, 4000);
            }
        };
        type();
    }, 400);
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth nav highlight
const sections = document.querySelectorAll('[id]');
const navLinks = document.querySelectorAll('.nav-links a');

// Smooth scroll on nav click
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 24;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }
    });
});

// Nav highlight on scroll
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
});

});