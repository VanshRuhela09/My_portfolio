document.addEventListener('DOMContentLoaded', function() {
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#00ddeb' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#00ddeb', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const sections = document.querySelectorAll('section:not(#about)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    const taglineTextElement = document.getElementById('tagline-text');
    const taglines = [
        "Web Developer",
        "Programmer",
        "Problem Solver",
    ];
    let taglineIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 70;
    let deletingSpeed = 30;
    let pauseBetweenWords = 1500;

    function typeAndDeleteTagline() {
        const currentTagline = taglines[taglineIndex];

        if (isDeleting) {
            taglineTextElement.textContent = currentTagline.substring(0, charIndex - 1);
            charIndex--;
        } else {
            taglineTextElement.textContent = currentTagline.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTagline.length) {
            isDeleting = true;
            setTimeout(typeAndDeleteTagline, pauseBetweenWords);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            taglineIndex = (taglineIndex + 1) % taglines.length;
            setTimeout(typeAndDeleteTagline, 500);
        } else {
            const speed = isDeleting ? deletingSpeed : typingSpeed;
            setTimeout(typeAndDeleteTagline, speed);
        }
    }

    setTimeout(typeAndDeleteTagline, 1000);

    const navToggle = document.querySelector('.nav-toggle');
    const navUl = document.querySelector('nav ul');
    if (navToggle && navUl) {
        navToggle.addEventListener('click', () => {
            navUl.classList.toggle('open');
            navToggle.classList.toggle('open'); // Add this line
        });
    }
});