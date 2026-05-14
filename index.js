document.addEventListener('DOMContentLoaded', () => {
    // === TYPING ANIMATION ===
    const roles = ['AI/ML Engineer', 'LLM Orchestration Specialist', 'RAG Systems Architect', 'Agentic AI Developer', 'Data Scientist', 'Deep Learning Engineer'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typedEl = document.getElementById('typed-text');
    function typeEffect() {
        if (!typedEl) return;
        const current = roles[roleIndex];
        typedEl.textContent = current.substring(0, charIndex);
        if (!isDeleting && charIndex < current.length) { charIndex++; setTimeout(typeEffect, 80); }
        else if (!isDeleting) { setTimeout(() => { isDeleting = true; typeEffect(); }, 1800); }
        else if (isDeleting && charIndex > 0) { charIndex--; setTimeout(typeEffect, 40); }
        else { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeEffect, 400); }
    }
    typeEffect();

    // === MOBILE MENU TOGGLE ===
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        // Toggle menu open/close when hamburger is clicked
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
        // Close menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            }
        });
    }

    // === NAVBAR SCROLL ===
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        // Scroll progress bar
        if (scrollProgress) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgress.style.width = (window.scrollY / h * 100) + '%';
        }
    }, { passive: true });

    // === SECTION TITLE ANIMATION (underline grows when visible) ===
    const titleObserver = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.3 });
    document.querySelectorAll('.section-title').forEach(t => titleObserver.observe(t));

    // === ACTIVE NAV LINK ===
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 120) current = sec.id; });
        navLinks.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + current);
        });
    }, { passive: true });

    // === MOBILE MENU ===
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksEl = document.getElementById('nav-links');
    if (menuToggle && navLinksEl) {
        menuToggle.addEventListener('click', () => navLinksEl.classList.toggle('open'));
        navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinksEl.classList.remove('open')));
    }

    // === SCROLL REVEAL ===
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // === PROJECT FILTERS ===
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            document.querySelectorAll('.project-card').forEach(card => {
                const show = filter === 'all' || (card.dataset.category || '').includes(filter);
                card.style.display = show ? '' : 'none';
                if (show) card.style.animation = 'fadeUp 0.4s ease forwards';
            });
        });
    });

    // === BACK TO TOP ===
    const backBtn = document.getElementById('back-to-top');
    if (backBtn) {
        window.addEventListener('scroll', () => backBtn.classList.toggle('visible', window.scrollY > 500), { passive: true });
        backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // === BLOG TOGGLE ===
    document.querySelectorAll('.blog-toggle').forEach(btn => {
        btn.addEventListener('click', () => {
            const body = document.getElementById(btn.dataset.target);
            if (body) {
                body.classList.toggle('open');
                const isOpen = body.classList.contains('open');
                btn.innerHTML = isOpen ? '<i class="fas fa-times"></i> Close Post' : '<i class="fas fa-book-open"></i> Read Full Post';
                btn.classList.toggle('expanded', isOpen);
            }
        });
    });

    // === SMOOTH SCROLL ===
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
        });
    });

    // ========================================
    // 3D TILT EFFECT ON CARDS
    // ========================================
    const tiltCards = document.querySelectorAll('.project-card, .skill-category, .stat-card, .cert-card, .achievement-card, .experience-card');
    tiltCards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.transition = 'transform 0.15s ease-out, box-shadow 0.3s ease';
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03,1.03,1.03)`;
            card.style.boxShadow = `${-rotateY * 2.5}px ${rotateX * 2.5}px 35px rgba(99,102,241,0.18)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
            card.style.boxShadow = '';
        });
    });

    // ========================================
    // GLOBAL CURSOR-FOLLOW BACKGROUND PARALLAX
    // ========================================
    const hero = document.querySelector('.hero');
    const heroFloat = document.querySelector('.hero-float');
    const heroBg = document.querySelector('.hero-bg');
    const heroGrid = document.querySelector('.hero-grid');

    // Create a global glow that follows the cursor everywhere
    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = 'position:fixed;width:700px;height:700px;border-radius:50%;pointer-events:none;z-index:0;background:radial-gradient(circle,rgba(99,102,241,0.25) 0%,rgba(139,92,246,0.15) 30%,rgba(168,85,247,0.05) 55%,transparent 70%);transition:transform 0.1s ease-out;mix-blend-mode:multiply;';
    document.body.appendChild(cursorGlow);

    document.addEventListener('mousemove', (e) => {
        const mx = e.clientX;
        const my = e.clientY;
        const wx = window.innerWidth;
        const wy = window.innerHeight;
        const nx = (mx / wx - 0.5) * 2; // -1 to 1
        const ny = (my / wy - 0.5) * 2;

        // Move the global cursor glow
        cursorGlow.style.transform = `translate(${mx - 400}px, ${my - 400}px)`;

        // Shift the entire body background position
        document.body.style.backgroundPosition = `${50 + nx * 8}% ${50 + ny * 8}%`;

        // Move hero elements with parallax depth
        if (heroFloat) heroFloat.style.transform = `translate(${nx * 50}px, calc(-50% + ${ny * 50}px))`;
        if (heroBg) heroBg.style.backgroundPosition = `${20 + nx * 10}% ${50 + ny * 10}%`;
        if (heroGrid) heroGrid.style.backgroundPosition = `${nx * 15}px ${ny * 15}px`;

        // Subtle shift on all section backgrounds
        document.querySelectorAll('.section').forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top < wy && rect.bottom > 0) {
                sec.style.backgroundPosition = `${50 + nx * 2}% ${50 + ny * 2}%`;
            }
        });
    });

    // ========================================
    // PARALLAX SCROLL — sections shift subtly
    // ========================================
    const parallaxElements = document.querySelectorAll('.section-title, .hero-content, .about-image-wrap');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const speed = 0.03;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = (rect.top - window.innerHeight / 2) * speed;
                el.style.transform = `translateY(${offset}px)`;
            }
        });
    }, { passive: true });

    // ========================================
    // FLOATING PARTICLES in hero (lightweight)
    // ========================================
    const canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    canvas.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;';
    if (hero) {
        hero.insertBefore(canvas, hero.firstChild);
        const ctx = canvas.getContext('2d');
        let particles = [];
        function resizeCanvas() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        for (let i = 0; i < 40; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.4,
                dy: (Math.random() - 0.5) * 0.4,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99,102,241,${p.opacity})`;
                ctx.fill();
            });
            // Draw connecting lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // ========================================
    // MAGNETIC BUTTONS — subtle pull toward cursor
    // ========================================
    document.querySelectorAll('.btn, .hero-social a, .filter-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // ========================================
    // COUNTER ANIMATION for stat numbers
    // ========================================
    const statObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const num = parseFloat(text);
                if (isNaN(num)) return;
                const suffix = text.replace(/[\d.]/g, '');
                let current = 0;
                const step = num / 40;
                const isFloat = text.includes('.');
                const interval = setInterval(() => {
                    current += step;
                    if (current >= num) { current = num; clearInterval(interval); }
                    el.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;
                }, 30);
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number, .ach-value').forEach(el => statObserver.observe(el));
});

// Inject animation keyframes
const style = document.createElement('style');
style.textContent = '@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
document.head.appendChild(style);
