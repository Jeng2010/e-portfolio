// ==================== NEW FEATURES ====================

// Loading Screen
window.addEventListener("load", () => {
  const loadingScreen = document.querySelector(".loading-screen");
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 1500);
});

// Scroll Progress Bar
window.addEventListener("scroll", () => {
  const scrollProgress = document.querySelector(".scroll-progress");
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.width = scrollPercentage + "%";
});

// Custom Cursor
const cursor = document.querySelector(".custom-cursor");
const follower = document.querySelector(".custom-cursor-follower");

let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;

  followerX += dx * 0.1;
  followerY += dy * 0.1;

  follower.style.left = followerX + "px";
  follower.style.top = followerY + "px";

  requestAnimationFrame(animateFollower);
}

animateFollower();

// Cursor hover effects
const hoverElements = document.querySelectorAll(
  "a, button, .btn, .project-card, .skill-card, .tag-clickable",
);
hoverElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    follower.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    follower.classList.remove("active");
  });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

themeToggle.addEventListener("click", () => {
  const theme = body.getAttribute("data-theme");
  const newTheme = theme === "light" ? "dark" : "light";

  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);

  // Add rotation animation
  themeToggle.style.transform = "rotate(360deg)";
  setTimeout(() => {
    themeToggle.style.transform = "rotate(0deg)";
  }, 300);
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Typing Animation
const typingTexts = [
  "BS in Information Technology",
  "Web Developer",
  "IT Student",
  "Tech Enthusiast",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector(".typing-text");
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenTexts = 2000;

function type() {
  const currentText = typingTexts[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(type, delayBetweenTexts);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % typingTexts.length;
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(type, speed);
}

// Start typing animation
setTimeout(type, 1000);

// Timeline Animation on Scroll
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("aos-animate");
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".timeline-item").forEach((item) => {
  timelineObserver.observe(item);
});

// Enhanced Form Validation with Animation
const formInputs = document.querySelectorAll(
  ".contact-form input, .contact-form textarea",
);
formInputs.forEach((input) => {
  input.addEventListener("invalid", (e) => {
    e.preventDefault();
    input.style.animation = "shake 0.5s";
    setTimeout(() => {
      input.style.animation = "";
    }, 500);
  });

  input.addEventListener("input", () => {
    if (input.validity.valid) {
      input.style.borderColor = "var(--accent-color)";
    }
  });
});

// Add shake animation to CSS if not present
const style = document.createElement("style");
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
  }
`;
document.head.appendChild(style);

// Parallax Effect for Shapes
window.addEventListener("scroll", () => {
  const shapes = document.querySelectorAll(".shape");
  const scrolled = window.pageYOffset;

  shapes.forEach((shape, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.05}deg)`;
  });
});

// ==================== END NEW FEATURES ====================

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

// Navbar Background on Scroll - Removed (now handled by CSS)
// The navbar now uses CSS backdrop-filter for glassmorphism effect

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

// Form Submission with Enhanced Animation
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Button loading state
    submitBtn.textContent = "✓ Sending...";
    submitBtn.style.background = "var(--gradient)";
    submitBtn.disabled = true;

    // Simulate sending (replace with actual form submission)
    setTimeout(() => {
      submitBtn.textContent = "✓ Message Sent!";
      submitBtn.style.background =
        "linear-gradient(135deg, #10b981 0%, #34d399 100%)";

      // Success animation
      submitBtn.style.transform = "scale(1.1)";
      setTimeout(() => {
        submitBtn.style.transform = "scale(1)";
      }, 200);

      // Reset form and button
      setTimeout(() => {
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;

        // Show custom success message
        showSuccessMessage();
      }, 2000);
    }, 1500);
  });
}

// Custom Success Message
function showSuccessMessage() {
  const message = document.createElement("div");
  message.className = "success-message";
  message.innerHTML =
    '<i class="fas fa-check-circle"></i> Thank you! I will get back to you soon.';
  message.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: var(--gradient);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(16, 185, 129, 0.4);
    z-index: 10000;
    animation: slideIn 0.5s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
  `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = "slideOut 0.5s ease";
    setTimeout(() => message.remove(), 500);
  }, 3000);
}

// Add animations for success message
const successStyle = document.createElement("style");
successStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(successStyle);

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

// ========== CERTIFICATE TAG FUNCTIONALITY ==========
// Get all clickable tags
const certificateTags = document.querySelectorAll(".tag-clickable");
const certificateCards = document.querySelectorAll(".certificate-card");

// Tag click handler with filtering and animation
certificateTags.forEach((tag) => {
  tag.addEventListener("click", function (e) {
    e.stopPropagation();
    const clickedTag = this.dataset.tag;

    // Add ripple effect
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    // Toggle active state
    const isActive = this.classList.contains("active");

    if (isActive) {
      // If clicking active tag, show all certificates
      this.classList.remove("active");
      certificateCards.forEach((card) => {
        card.style.display = "block";
        card.style.animation = "certificateFadeIn 0.5s ease forwards";
      });
    } else {
      // Remove active from all tags
      certificateTags.forEach((t) => t.classList.remove("active"));

      // Add active to clicked tag
      this.classList.add("active");

      // Filter certificates
      certificateCards.forEach((card) => {
        const cardTags = Array.from(
          card.querySelectorAll(".tag-clickable"),
        ).map((t) => t.dataset.tag);

        if (cardTags.includes(clickedTag)) {
          card.style.display = "block";
          card.style.animation = "certificateFadeIn 0.5s ease forwards";
        } else {
          card.style.display = "none";
        }
      });
    }

    // Add click animation feedback
    this.style.transform = "scale(0.9)";
    setTimeout(() => {
      this.style.transform = "";
    }, 150);
  });

  // Add hover sound effect (optional - visual feedback)
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.05)";
  });

  tag.addEventListener("mouseleave", function () {
    if (!this.classList.contains("active")) {
      this.style.transform = "";
    }
  });
});

// Add tooltip functionality
certificateTags.forEach((tag) => {
  tag.setAttribute("title", `Filter by ${tag.textContent}`);
});

// Double-click to search tag on Google (bonus feature)
certificateTags.forEach((tag) => {
  let clickCount = 0;
  let clickTimer = null;

  tag.addEventListener("click", function (e) {
    clickCount++;

    if (clickCount === 1) {
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 400);
    } else if (clickCount === 2) {
      clearTimeout(clickTimer);
      clickCount = 0;

      // Open Google search for the tag
      const searchTerm = this.textContent;
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`;

      // Show confirmation with animation
      const originalText = this.textContent;
      this.textContent = "🔍 Searching...";

      setTimeout(() => {
        window.open(searchUrl, "_blank");
        this.textContent = originalText;
      }, 500);
    }
  });
});
