/**
 * SIRENCORP — WhatsApp Project Estimator & Spec Dispatcher
 * Calculates real-time cost estimates in INR (₹) and builds pre-formatted WhatsApp specifications.
 */

import { launchWhatsApp } from './whatsapp.js';

export const CalculatorData = {
  projectTypes: [
    {
      id: "landing",
      title: "Landing Page",
      desc: "Single high-converting page for launches, ads, or campaigns.",
      basePrice: 14999,
      timelineDays: "5 - 7 Days"
    },
    {
      id: "corporate",
      title: "Corporate Website",
      desc: "5 - 10 pages for established businesses, agencies, and firms.",
      basePrice: 29999,
      timelineDays: "10 - 14 Days"
    },
    {
      id: "ecommerce",
      title: "E-Commerce + WhatsApp Store",
      desc: "Product catalog, WhatsApp ordering, Razorpay/Stripe checkout.",
      basePrice: 44999,
      timelineDays: "14 - 21 Days"
    },
    {
      id: "custom-app",
      title: "Custom Web Application",
      desc: "Fullstack web app, custom logic, authentication, database.",
      basePrice: 69999,
      timelineDays: "3 - 4 Weeks"
    }
  ],

  addons: [
    {
      id: "wa-bot",
      label: "WhatsApp CRM & Lead Dispatcher",
      desc: "Routes inquiries straight to WhatsApp with customer specs.",
      price: 5999
    },
    {
      id: "insta-sync",
      label: "Instagram Live Feed & DM Integration",
      desc: "Embeds dynamic stories, post showcases, and direct DMs.",
      price: 3999
    },
    {
      id: "speed-seo",
      label: "Lighthouse 99+ Speed & Technical SEO",
      desc: "Sub-400ms loading, rich schema tags, Google Indexing.",
      price: 4999
    },
    {
      id: "cms-admin",
      label: "Custom CMS Admin Dashboard",
      desc: "Easily edit text, images, blogs, and products without coding.",
      price: 8999
    },
    {
      id: "motion",
      label: "Custom Micro-Animations & Radar FX",
      desc: "Bespoke transitions, hover physics, and interactive elements.",
      price: 4499
    },
    {
      id: "care-plan",
      label: "1-Year Priority Care & Upkeep",
      desc: "Continuous updates, backups, security, and developer support.",
      price: 9999
    }
  ],

  urgency: {
    standard: { label: "Standard Delivery", multiplier: 1.0 },
    express: { label: "Express Sprint (7-day rush)", multiplier: 1.25 }
  }
};

let currentConfig = {
  projectType: "landing",
  selectedAddons: ["wa-bot", "speed-seo"],
  urgency: "standard"
};

/**
 * Initialize Calculator UI
 */
export function initCalculator() {
  const typesContainer = document.getElementById("calcTypesGrid");
  const addonsContainer = document.getElementById("calcAddonsGrid");
  const urgencySelect = document.getElementById("calcUrgency");
  const whatsappSendBtn = document.getElementById("calcSendWhatsApp");

  if (!typesContainer || !addonsContainer) return;

  // Render Project Type Options
  typesContainer.innerHTML = CalculatorData.projectTypes.map(type => `
    <div class="calc-option-card ${type.id === currentConfig.projectType ? 'selected' : ''}" data-type-id="${type.id}">
      <span class="calc-option-title">${type.title}</span>
      <span class="calc-option-desc">${type.desc}</span>
      <span class="mono" style="font-size: 0.8rem; color: var(--blue); margin-top: 6px;">From ₹${type.basePrice.toLocaleString('en-IN')}</span>
    </div>
  `).join("");

  // Render Add-on Checkboxes
  addonsContainer.innerHTML = CalculatorData.addons.map(addon => {
    const isChecked = currentConfig.selectedAddons.includes(addon.id);
    return `
      <div class="calc-check-row ${isChecked ? 'checked' : ''}" data-addon-id="${addon.id}">
        <div class="calc-check-left">
          <div class="custom-checkbox">${isChecked ? '✓' : ''}</div>
          <div>
            <div style="font-weight: 500; font-size: 0.9rem; color: var(--text);">${addon.label}</div>
            <div style="font-size: 0.76rem; color: var(--text-muted);">${addon.desc}</div>
          </div>
        </div>
        <span class="mono" style="font-size: 0.82rem; color: var(--amber); white-space: nowrap;">+₹${addon.price.toLocaleString('en-IN')}</span>
      </div>
    `;
  }).join("");

  // Event Listeners for Project Types
  typesContainer.querySelectorAll(".calc-option-card").forEach(card => {
    card.addEventListener("click", () => {
      typesContainer.querySelectorAll(".calc-option-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      currentConfig.projectType = card.getAttribute("data-type-id");
      updateCalculations();
    });
  });

  // Event Listeners for Addons
  addonsContainer.querySelectorAll(".calc-check-row").forEach(row => {
    row.addEventListener("click", () => {
      const addonId = row.getAttribute("data-addon-id");
      const idx = currentConfig.selectedAddons.indexOf(addonId);
      if (idx > -1) {
        currentConfig.selectedAddons.splice(idx, 1);
        row.classList.remove("checked");
        row.querySelector(".custom-checkbox").textContent = "";
      } else {
        currentConfig.selectedAddons.push(addonId);
        row.classList.add("checked");
        row.querySelector(".custom-checkbox").textContent = "✓";
      }
      updateCalculations();
    });
  });

  // Urgency Dropdown
  if (urgencySelect) {
    urgencySelect.addEventListener("change", (e) => {
      currentConfig.urgency = e.target.value;
      updateCalculations();
    });
  }

  // Send via WhatsApp Button
  if (whatsappSendBtn) {
    whatsappSendBtn.addEventListener("click", () => {
      const specText = formatWhatsAppSpec();
      launchWhatsApp(specText, "line1");
    });
  }

  updateCalculations();
}

/**
 * Recalculate totals and update the UI summary
 */
function updateCalculations() {
  const selectedType = CalculatorData.projectTypes.find(t => t.id === currentConfig.projectType) || CalculatorData.projectTypes[0];
  let subtotal = selectedType.basePrice;

  currentConfig.selectedAddons.forEach(addonId => {
    const addon = CalculatorData.addons.find(a => a.id === addonId);
    if (addon) subtotal += addon.price;
  });

  const urgencyMult = CalculatorData.urgency[currentConfig.urgency]?.multiplier || 1.0;
  const total = Math.round(subtotal * urgencyMult);

  // Update Summary DOM elements
  const typeDisplay = document.getElementById("calcSummaryType");
  const addonsCount = document.getElementById("calcSummaryAddons");
  const timelineDisplay = document.getElementById("calcSummaryTimeline");
  const totalPriceDisplay = document.getElementById("calcSummaryTotal");

  if (typeDisplay) typeDisplay.textContent = selectedType.title;
  if (addonsCount) addonsCount.textContent = `${currentConfig.selectedAddons.length} selected`;
  if (timelineDisplay) {
    timelineDisplay.textContent = currentConfig.urgency === "express" ? "5 - 7 Days (Sprint)" : selectedType.timelineDays;
  }
  if (totalPriceDisplay) {
    totalPriceDisplay.textContent = `₹${total.toLocaleString('en-IN')}`;
  }
}

/**
 * Builds formatted text payload for WhatsApp transmission
 */
export function formatWhatsAppSpec() {
  const selectedType = CalculatorData.projectTypes.find(t => t.id === currentConfig.projectType);
  const addonNames = currentConfig.selectedAddons.map(id => {
    const a = CalculatorData.addons.find(item => item.id === id);
    return a ? `• ${a.label}` : null;
  }).filter(Boolean);

  let subtotal = selectedType.basePrice;
  currentConfig.selectedAddons.forEach(addonId => {
    const addon = CalculatorData.addons.find(a => a.id === addonId);
    if (addon) subtotal += addon.price;
  });
  const urgencyMult = CalculatorData.urgency[currentConfig.urgency]?.multiplier || 1.0;
  const total = Math.round(subtotal * urgencyMult);
  const timeline = currentConfig.urgency === "express" ? "5-7 Days Express" : selectedType.timelineDays;

  return `*🚨 SIRENCORP WEBSITE PROJECT SPECIFICATION*
----------------------------------------
*📦 Project Type:* ${selectedType.title}
*⏱️ Estimated Timeline:* ${timeline}
*✨ Selected Add-ons:*
${addonNames.length ? addonNames.join("\n") : "• Standard Core Architecture"}
*💰 Estimated Investment:* ₹${total.toLocaleString('en-IN')}

_Hi SirenCorp Team, I've customized this project specification on your website and would like to confirm availability and schedule a kickoff call!_`;
}
