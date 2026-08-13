/**
 * SIRENCORP — Main Application Logic & Initialization
 */

import { initWhatsAppWidget, launchWhatsApp } from './whatsapp.js';
import { initInstagramModule } from './instagram.js';
import { initCalculator } from './calculator.js';

// Project Portfolio Data for interactive preview modal
export const PortfolioProjects = [
  {
    id: "proj-1",
    title: "Aura Audio Labs",
    category: "E-Commerce / D2C",
    speedScore: "99/100",
    desc: "Direct-to-consumer audiophile brand website with dynamic sound demos, custom product configurator, and instant WhatsApp customer concierge.",
    stack: ["HTML5", "Modern CSS", "Web Audio API", "WhatsApp Commerce", "Razorpay"],
    stats: "3.4x conversion bump, 0.38s load time",
    mockupColor: "linear-gradient(135deg, #1b212f 0%, #3b82f633 100%)",
    icon: "🎧"
  },
  {
    id: "proj-2",
    title: "Verve Architecture Studio",
    category: "Architecture & Real Estate",
    speedScore: "98/100",
    desc: "Immersive portfolio showcase with high-res blueprints, interactive floorplans, and direct WhatsApp project consultation dispatch.",
    stack: ["Vanilla JS", "WebGL Micro-Transitions", "WhatsApp Router", "Cloudflare CDN"],
    stats: "+180% high-ticket architect leads",
    mockupColor: "linear-gradient(135deg, #1f1b24 0%, #ff475733 100%)",
    icon: "🏛️"
  },
  {
    id: "proj-3",
    title: "Pulse Logistics Platform",
    category: "SaaS / B2B Web App",
    speedScore: "100/100",
    desc: "Real-time dispatch management dashboard and corporate website for Bengaluru freight logistics network.",
    stack: ["Modern ES6+", "REST API", "Live Telemetry", "WhatsApp Alert Webhooks"],
    stats: "Sub-250ms TTFB across India",
    mockupColor: "linear-gradient(135deg, #1b2820 0%, #25D36633 100%)",
    icon: "🚚"
  },
  {
    id: "proj-4",
    title: "Kavya Gourmet Roast",
    category: "Food & Beverage",
    speedScore: "99/100",
    desc: "Artisanal coffee roastery website with subscription builder, brewing guides, and WhatsApp 1-tap bean re-orders.",
    stack: ["CSS Grid", "Instant Checkout", "Instagram Reel Embeds", "WhatsApp CRM"],
    stats: "45% returning customer rate via WhatsApp",
    mockupColor: "linear-gradient(135deg, #2b2216 0%, #ffb02033 100%)",
    icon: "☕"
  },
  {
    id: "proj-5",
    title: "Helios Energy Solutions",
    category: "Corporate / CleanTech",
    speedScore: "98/100",
    desc: "Solar installation quote estimator and enterprise portal for commercial solar power projects across South India.",
    stack: ["Clean HTML/CSS", "Solar ROI Calculator", "WhatsApp Spec Sender"],
    stats: "₹1.8Cr pipeline generated in 60 days",
    mockupColor: "linear-gradient(135deg, #17243b 0%, #3b82f644 100%)",
    icon: "☀️"
  },
  {
    id: "proj-6",
    title: "Zenith Dental Care",
    category: "Healthcare / Clinic",
    speedScore: "100/100",
    desc: "Modern multi-location dental clinic website with 1-click WhatsApp appointment booking and doctor profile showcases.",
    stack: ["Semantic HTML", "Schema.org Clinic SEO", "Instant WhatsApp Scheduler"],
    stats: "+220 new monthly patient appointments",
    mockupColor: "linear-gradient(135deg, #281923 0%, #ff475744 100%)",
    icon: "🦷"
  }
];

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Sub-Systems
  initBengaluruClock();
  initScrollHeader();
  initIntersectionObserver();
  initMobileNav();
  initPortfolio();
  initPortfolioModal();
  initFaqAccordion();
  initCallActions();
  initInquiryForm();

  // Initialize Modules
  initWhatsAppWidget();
  initInstagramModule();
  initCalculator();
});

/**
 * Live Bengaluru IST Clock
 */
function initBengaluruClock() {
  const clockEl = document.getElementById("bengaluruClock");
  if (!clockEl) return;

  const update = () => {
    const options = {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    const istTime = new Intl.DateTimeFormat("en-US", options).format(new Date());
    clockEl.textContent = `${istTime} IST (BLR)`;
  };

  update();
  setInterval(update, 1000);
}

/**
 * Sticky Nav Background Blur on Scroll
 */
function initScrollHeader() {
  const header = document.querySelector("header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }, { passive: true });
}

/**
 * Scroll Reveal Animations
 */
function initIntersectionObserver() {
  const revealElements = document.querySelectorAll(".reveal");
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById("menuToggle");
  const drawer = document.getElementById("mobileNavDrawer");
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      toggleBtn.classList.remove("active");
    } else {
      drawer.classList.add("open");
      toggleBtn.classList.add("active");
    }
  });

  // Close drawer when clicking any link inside
  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.classList.remove("active");
    });
  });
}

/**
 * Render Portfolio Grid & Category Filters
 */
function initPortfolio() {
  const grid = document.getElementById("portfolioGrid");
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!grid) return;

  const render = (category = "all") => {
    const filtered = category === "all"
      ? PortfolioProjects
      : PortfolioProjects.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));

    grid.innerHTML = filtered.map((proj) => `
      <div class="portfolio-card" data-proj-id="${proj.id}">
        <div class="portfolio-thumb">
          <div class="portfolio-mockup-canvas" style="background: ${proj.mockupColor};">
            <span style="font-size: 3.5rem; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.5));">${proj.icon}</span>
          </div>
          <div class="portfolio-overlay">
            <button class="btn btn-primary btn-sm view-case-btn" data-proj-id="${proj.id}">
              Inspect Build Details
            </button>
          </div>
        </div>
        <div class="portfolio-info">
          <div class="portfolio-meta">
            <span class="portfolio-category">${proj.category}</span>
            <span class="portfolio-score">⚡ ${proj.speedScore}</span>
          </div>
          <h3>${proj.title}</h3>
          <p>${proj.desc}</p>
          <div class="portfolio-stack">
            ${proj.stack.map(s => `<span class="stack-badge">${s}</span>`).join("")}
          </div>
        </div>
      </div>
    `).join("");

    // Bind inspect buttons
    grid.querySelectorAll(".portfolio-card, .view-case-btn").forEach(card => {
      card.addEventListener("click", (e) => {
        const id = card.getAttribute("data-proj-id");
        if (id) openProjectModal(id);
      });
    });
  };

  render("all");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-filter") || "all";
      render(cat);
    });
  });
}

/**
 * Project Details Modal
 */
function initPortfolioModal() {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const closeBtn = modal.querySelector(".modal-close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
}

function openProjectModal(id) {
  const modal = document.getElementById("projectModal");
  const proj = PortfolioProjects.find(p => p.id === id);
  if (!modal || !proj) return;

  const titleEl = document.getElementById("modalProjTitle");
  const catEl = document.getElementById("modalProjCategory");
  const descEl = document.getElementById("modalProjDesc");
  const statsEl = document.getElementById("modalProjStats");
  const stackEl = document.getElementById("modalProjStack");
  const iconEl = document.getElementById("modalProjIcon");
  const waBtn = document.getElementById("modalProjWaBtn");

  if (titleEl) titleEl.textContent = proj.title;
  if (catEl) catEl.textContent = `${proj.category} · Speed Score ${proj.speedScore}`;
  if (descEl) descEl.textContent = proj.desc;
  if (statsEl) statsEl.textContent = `🚀 Key Metric Impact: ${proj.stats}`;
  if (iconEl) iconEl.textContent = proj.icon;

  if (stackEl) {
    stackEl.innerHTML = proj.stack.map(s => `<span class="badge badge-blue">${s}</span>`).join("");
  }

  if (waBtn) {
    waBtn.onclick = () => {
      const msg = `Hi SirenCorp, I saw your portfolio build "${proj.title}" (${proj.category}) and I want something similar built for my business.`;
      launchWhatsApp(msg, "line1");
    };
  }

  modal.classList.add("open");
}

/**
 * FAQ Accordion
 */
function initFaqAccordion() {
  document.querySelectorAll(".faq-item").forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(other => other.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    }
  });
}

/**
 * Click-to-Copy and Direct Phone Handlers
 */
function initCallActions() {
  document.querySelectorAll(".call-card-item, [data-copy-num]").forEach(card => {
    card.addEventListener("click", async (e) => {
      // If clicking child buttons specifically, don't trigger the copy
      if (e.target.closest(".action-icon-btn") || e.target.closest("a")) return;

      const num = card.getAttribute("data-num");
      const display = card.getAttribute("data-display") || num;
      if (num) {
        try {
          await navigator.clipboard.writeText(num);
          showToast(`Copied ${display} to clipboard`);
        } catch (err) {
          showToast(`Direct Line: ${display}`);
        }
      }
    });
  });
}

/**
 * Quick Inquiry Form Handler (Dual WhatsApp & Form Submit)
 */
function initInquiryForm() {
  const form = document.getElementById("quickInquiryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("inqName")?.value || "Client";
    const phone = document.getElementById("inqPhone")?.value || "";
    const type = document.getElementById("inqType")?.value || "Website Project";
    const notes = document.getElementById("inqNotes")?.value || "";

    const formattedMsg = `*🚨 NEW PROJECT INQUIRY — SIRENCORP WEBSITE*
------------------------------------
*Name:* ${name}
*Phone / WhatsApp:* ${phone}
*Scope:* ${type}
*Details:* ${notes || 'Ready to discuss requirements'}
------------------------------------
_Sent via SirenCorp Quick Inquiry Form_`;

    showToast("Opening WhatsApp with your inquiry spec...");
    setTimeout(() => {
      launchWhatsApp(formattedMsg, "line1");
      form.reset();
    }, 600);
  });
}

/**
 * Toast Notification Helper
 */
let toastTimeout;
export function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}
