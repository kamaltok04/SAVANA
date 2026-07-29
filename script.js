/* ==========================================================================
   SAVANA - Interactive Engine & Dynamic Effects (Multi-Page Version)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. ACTIVE PAGE NAVIGATION HIGHLIGHTING
     ------------------------------------------------------------------------ */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ------------------------------------------------------------------------
     2. STICKY HEADER SCROLL BEHAVIOR
     ------------------------------------------------------------------------ */
  const header = document.getElementById('site-header');
  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();

  /* ------------------------------------------------------------------------
     3. DYNAMIC HERO CANVAS NODE CONSTELLATION ANIMATION (Home Page)
     ------------------------------------------------------------------------ */
  const canvas = document.getElementById('hero-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 140 };

    const resizeCanvas = () => {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initParticles();
    };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2.5 + 1;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.85 ? '#ff8a7a' : '#2ec4b6';
        this.alpha = Math.random() * 0.6 + 0.3;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((width * height) / 16000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#2ec4b6';
            ctx.globalAlpha = (1 - dist / 110) * 0.18;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      requestAnimationFrame(animateParticles);
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    resizeCanvas();
    animateParticles();
  }

  /* ------------------------------------------------------------------------
     4. INTERACTIVE STEP SWITCHER (How It Works Page)
     ------------------------------------------------------------------------ */
  const stepTabs = document.querySelectorAll('.step-tab-btn');
  const stepActiveNum = document.getElementById('step-active-num');
  const stepActiveTitle = document.getElementById('step-active-title');
  const stepActiveDesc = document.getElementById('step-active-desc');
  const stepActiveFeatures = document.getElementById('step-active-features');
  const stepCodePreview = document.getElementById('step-code-preview');

  const stepData = {
    1: {
      num: 'Step 01 / 05',
      title: '1. Project Creation',
      desc: 'Users create a digital workspace where every project is organized with development tools, documentation, assets, and collaboration features.',
      features: [
        'Instant workspace initialization with customizable dev environments',
        'Automated document generation and asset repository structuring',
        'Role-based permission setup and team workspace invitations'
      ],
      code: `$ savana init my-digital-platform\n[INFO] Initializing workspace structure...\n[SUCCESS] Connected to SAVANA Ecosystem Cloud\n[SUCCESS] Created /docs, /src, /assets, and AI Copilot config\n✓ Project creation ready for development.`
    },
    2: {
      num: 'Step 02 / 05',
      title: '2. Intelligent Development',
      desc: 'Integrated AI assists with planning, content generation, automation, code assistance, workflow optimization, and project management.',
      features: [
        'AI Copilot code generation & real-time syntax linting',
        'Automated workflow planning and backlog task creation',
        'Smart dependency resolution & optimization suggestions'
      ],
      code: `// SAVANA AI Development Engine\nconst project = await savana.ai.generateModule({\n  type: "Fullstack SaaS App",\n  auth: true,\n  database: "Scalable Cloud Grid"\n});\nconsole.log(project.status); // "Optimized & Built in 1.4s"`
    },
    3: {
      num: 'Step 03 / 05',
      title: '3. Collaborative Workspace',
      desc: 'Teams collaborate in real time by sharing resources, managing tasks, tracking progress, and coordinating development activities.',
      features: [
        'Multi-user live editing and shared cloud terminal sessions',
        'Integrated task Kanban boards and automated sprint tracking',
        'Instant preview links for pull requests and staging builds'
      ],
      code: `[TEAM ACTIVITY LOG]\n> Sarah (Frontend Lead) joined workspace #dev-alpha\n> Alex (AI Eng) updated /models/vision.py\n> Live Session Sync: 4 active contributors\n✓ Conflict check passed (0 merge collisions).`
    },
    4: {
      num: 'Step 04 / 05',
      title: '4. Deployment Engine',
      desc: 'Projects can be packaged, tested, and deployed through scalable infrastructure designed for modern digital applications.',
      features: [
        'One-click multi-region edge deployment with global CDN',
        'Automated CI/CD pipeline verification and vulnerability scanning',
        'Auto-scaling cluster management for high-traffic applications'
      ],
      code: `$ savana deploy --prod --region global\n[BUILD] Compiling web application bundle...\n[TEST] Running automated test suite (48/48 passed)\n[DEPLOY] Edge distribution active across 240+ POPS\n✓ Production Live URL: https://app.savana.dev`
    },
    5: {
      num: 'Step 05 / 05',
      title: '5. Continuous Evolution',
      desc: 'Built-in analytics, automation, and AI recommendations continuously improve project performance, productivity, and long-term scalability.',
      features: [
        'Real-time traffic monitoring & performance bottleneck detection',
        'Automated security patch suggestions and version upgrades',
        'AI insights for resource usage and cost optimization'
      ],
      code: `[SAVANA HEALTH & EVOLUTION MONITOR]\n> Uptime: 99.99% | Avg Latency: 18ms\n> AI Insight: Cache hit ratio optimal at 94.2%\n> Recommendation: Scale worker pool +2 units for peak hours\n✓ Auto-tuning scheduled successfully.`
    }
  };

  stepTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const stepId = tab.getAttribute('data-step');
      stepTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (stepData[stepId] && stepActiveTitle) {
        const data = stepData[stepId];
        stepActiveNum.textContent = data.num;
        stepActiveTitle.textContent = data.title;
        stepActiveDesc.textContent = data.desc;
        stepCodePreview.textContent = data.code;

        stepActiveFeatures.innerHTML = data.features.map(feat => `
          <li>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ${feat}
          </li>
        `).join('');
      }
    });
  });

  /* ------------------------------------------------------------------------
     5. AUTH MODAL SYSTEM
     ------------------------------------------------------------------------ */
  const modalOverlay = document.getElementById('auth-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openLoginBtn = document.getElementById('open-login-btn');
  const openSignupBtn = document.getElementById('open-signup-btn');
  const authForm = document.getElementById('auth-form');

  const openModal = (mode = 'signup') => {
    if (!modalOverlay) return;
    if (mode === 'login') {
      modalTitle.textContent = 'Welcome back to SAVANA';
      modalSubtitle.textContent = 'Enter your credentials to access your workspaces.';
      modalSubmitBtn.textContent = 'Log In to Workspace';
    } else {
      modalTitle.textContent = 'Get Started with SAVANA';
      modalSubtitle.textContent = 'Enter your details to create your developer workspace.';
      modalSubmitBtn.textContent = 'Create Free Account';
    }
    modalOverlay.classList.add('active');
  };

  const closeModal = () => {
    if (modalOverlay) modalOverlay.classList.remove('active');
  };

  if (openLoginBtn) openLoginBtn.addEventListener('click', () => openModal('login'));
  if (openSignupBtn) openSignupBtn.addEventListener('click', () => openModal('signup'));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.querySelectorAll('.trigger-auth').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-action') || 'signup';
      openModal(action.toLowerCase().includes('log') ? 'login' : 'signup');
    });
  });

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('input-email').value;
      closeModal();
      showToast(`Welcome! Account authentication initiated for ${email}`);
      authForm.reset();
    });
  }

  /* ------------------------------------------------------------------------
     6. TOAST NOTIFICATIONS & UTILITY INTERACTIONS
     ------------------------------------------------------------------------ */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2ec4b6" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  document.querySelectorAll('.utility-card, .capability-card').forEach(card => {
    card.addEventListener('click', () => {
      const text = card.querySelector('.utility-card-text, .capability-title');
      if (text) {
        showToast(`Feature highlighted: ${text.textContent.trim()}`);
      }
    });
  });

  /* Newsletter Form */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to SAVANA updates!');
      newsletterForm.reset();
    });
  }

  /* Mobile Navigation Toggle */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = '';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '72px';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(7, 19, 14, 0.98)';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid rgba(46, 196, 182, 0.2)';
      }
    });
  }

});
