// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Navbar Background on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.98)";
    navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.3)";
  } else {
    navbar.style.background = "rgba(15, 23, 42, 0.95)";
    navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.1)";
  }
});

// Animated Skill Bars
const skillBars = document.querySelectorAll(".skill-progress");
const skillsSection = document.querySelector(".skills");

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.style.width;
          bar.style.width = "0";
          setTimeout(() => {
            bar.style.width = width;
          }, 100);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Form Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  });
}

// Parallax Effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-card");

  parallaxElements.forEach((el) => {
    const speed = 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Dynamic Year in Footer
const footer = document.querySelector(".footer p");
if (footer) {
  const currentYear = new Date().getFullYear();
  footer.innerHTML = footer.innerHTML.replace("2024", currentYear);
}

// ========== MAGICAL CURSOR EFFECTS ==========
// Pastel colors matching the theme
const pastelColors = [
  "#E6C7C2", // Soft Nude Pink
  "#C9A3A6", // Dusty Rose
  "#F5D5C8", // Light Peach
  "#FFE5E5", // Pale Pink
  "#E8D4D4", // Soft Mauve
];

// Particle array
const particles = [];
let isMouseDown = false;

// Detect if device is mobile/tablet
const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );

// Particle class
class Particle {
  constructor(x, y, isClick = false) {
    this.x = x;
    this.y = y;
    this.size = isClick ? Math.random() * 8 + 4 : Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * (isClick ? 4 : 2);
    this.speedY = Math.random() * (isClick ? -8 : -3) - 1;
    this.gravity = isClick ? 0.15 : 0.1;
    this.opacity = 1;
    this.color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.isHeart = Math.random() > 0.7; // 30% chance of heart
    this.isClick = isClick;
    this.fadeSpeed = isClick ? 0.015 : 0.02;
    this.element = this.createElement();
    document.body.appendChild(this.element);
  }

  createElement() {
    const particle = document.createElement("div");
    particle.style.position = "fixed";
    particle.style.left = this.x + "px";
    particle.style.top = this.y + "px";
    particle.style.pointerEvents = "none";
    particle.style.zIndex = "9999";
    particle.style.userSelect = "none";

    if (this.isHeart) {
      particle.innerHTML = "💖";
      particle.style.fontSize = this.size + "px";
    } else {
      particle.innerHTML = "✨";
      particle.style.fontSize = this.size + "px";
    }

    particle.style.opacity = this.opacity;
    particle.style.transform = `rotate(${this.rotation}deg)`;
    particle.style.filter = `drop-shadow(0 0 ${this.size}px ${this.color})`;
    particle.style.transition = "opacity 0.3s ease";

    return particle;
  }

  update() {
    // Physics
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.opacity -= this.fadeSpeed;

    // Update DOM
    this.element.style.left = this.x + "px";
    this.element.style.top = this.y + "px";
    this.element.style.opacity = this.opacity;
    this.element.style.transform = `rotate(${this.rotation}deg) scale(${this.opacity})`;

    // Remove if faded
    if (this.opacity <= 0) {
      this.element.remove();
      return false;
    }
    return true;
  }
}

// Create particles on mouse move
let lastMouseX = 0;
let lastMouseY = 0;
let particleThrottle = 0;

function createCursorTrail(e) {
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);

  if (!x || !y) return;

  // Calculate distance moved
  const dx = x - lastMouseX;
  const dy = y - lastMouseY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Only create particles if mouse moved significantly
  if (distance > 10) {
    particleThrottle++;

    // Throttle particle creation (every 2nd frame for smooth performance)
    if (particleThrottle % 2 === 0) {
      particles.push(new Particle(x, y, false));

      // Limit particles for performance (mobile: 30, desktop: 50)
      const maxParticles = isMobile ? 30 : 50;
      if (particles.length > maxParticles) {
        const removed = particles.shift();
        if (removed && removed.element) {
          removed.element.remove();
        }
      }
    }

    lastMouseX = x;
    lastMouseY = y;
  }
}

// Create burst on click
function createClickBurst(e) {
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);

  if (!x || !y) return;

  // Create burst of 8-12 particles
  const burstCount = isMobile ? 6 : 10;
  for (let i = 0; i < burstCount; i++) {
    particles.push(new Particle(x, y, true));
  }
}

// Animation loop
function animateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].update()) {
      particles.splice(i, 1);
    }
  }
  requestAnimationFrame(animateParticles);
}

// Event listeners
if (!isMobile) {
  // Desktop: mouse events
  document.addEventListener("mousemove", createCursorTrail);
  document.addEventListener("click", createClickBurst);
} else {
  // Mobile: touch events (lighter version)
  document.addEventListener("touchmove", (e) => {
    if (Math.random() > 0.7) {
      // Reduce frequency on mobile
      createCursorTrail(e);
    }
  });
  document.addEventListener("touchstart", createClickBurst);
}

// Start animation
animateParticles();

// Certificate Modal View
function viewCertificate(img) {
  const modal = document.getElementById("certificateModal");
  const modalImg = document.getElementById("modalImage");
  const caption = document.getElementById("caption");

  modal.style.display = "flex";
  modalImg.src = img.src;
  caption.innerHTML = img.alt;
  document.body.style.overflow = "hidden";
}

// Close modal
const modal = document.getElementById("certificateModal");
const closeBtn = document.querySelector(".modal-close");

closeBtn.onclick = function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
};

// Close when clicking outside the image
modal.onclick = function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
};

// Close with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.style.display === "flex") {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
