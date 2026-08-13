/**
 * SIRENCORP — WhatsApp Integration Engine
 * Handles dual-line routing, interactive quick-chat popup, pre-filled inquiry templates,
 * and seamless deep-linking to WhatsApp Desktop / Mobile / Web.
 */

export const WhatsAppConfig = {
  line1: {
    number: "919692281388",
    display: "+91 96922 81388",
    label: "Line 1 — Studio Dispatch",
    leadName: "Anto / SirenCorp Lead"
  },
  line2: {
    number: "916371055013",
    display: "+91 63710 55013",
    label: "Line 2 — Technical Lead",
    leadName: "SirenCorp Engineering"
  },
  defaultLine: "line1"
};

/**
 * Format a WhatsApp URL given phone number and text payload
 */
export function createWhatsAppUrl(text = "", lineKey = "line1") {
  const line = WhatsAppConfig[lineKey] || WhatsAppConfig.line1;
  const encodedText = encodeURIComponent(text.trim());
  return `https://wa.me/${line.number}?text=${encodedText}`;
}

/**
 * Direct launch WhatsApp in new tab
 */
export function launchWhatsApp(text = "", lineKey = "line1") {
  const url = createWhatsAppUrl(text, lineKey);
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Quick Chat Presets
 */
export const WhatsAppPrompts = [
  {
    id: "quote",
    label: "⚡ Get a Quick Website Quote",
    text: "Hi SirenCorp! I'd like to get a quote for a new website. My business is [Your Business Type] and I'm looking to launch by [Timeline]."
  },
  {
    id: "urgent",
    label: "🚀 Need Website Ready in 7 Days",
    text: "Hi SirenCorp, I need a high-performance website built urgently within 7 days. Can we discuss scope and kickoff today?"
  },
  {
    id: "redesign",
    label: "🎨 Redesign My Existing Website",
    text: "Hey SirenCorp team! I currently have a website but it needs a modern redesign, better mobile experience, and faster loading speeds."
  },
  {
    id: "commerce",
    label: "🛍️ E-Commerce + WhatsApp Ordering",
    text: "Hello! I want an online store with direct WhatsApp catalog ordering and instant payment integration for my brand."
  },
  {
    id: "talk",
    label: "💬 Direct Chat with Studio Lead",
    text: "Hi SirenCorp, I'd like to connect directly with your lead developer to discuss custom web engineering."
  }
];

/**
 * Initialize WhatsApp Widget & Quick Buttons
 */
export function initWhatsAppWidget() {
  const triggerBtn = document.getElementById("waTriggerBtn");
  const chatWindow = document.getElementById("waChatWindow");
  const closeBtn = document.getElementById("waCloseBtn");
  const promptContainer = document.getElementById("waQuickOptions");
  const sendBtn = document.getElementById("waSendBtn");
  const inputBox = document.getElementById("waInputBox");
  const lineSelector = document.getElementById("waLineSelector");

  let currentLine = WhatsAppConfig.defaultLine;

  if (promptContainer) {
    promptContainer.innerHTML = WhatsAppPrompts.map(p => `
      <button class="wa-prompt-pill" data-prompt-id="${p.id}">
        ${p.label}
      </button>
    `).join("");

    promptContainer.querySelectorAll(".wa-prompt-pill").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-prompt-id");
        const found = WhatsAppPrompts.find(p => p.id === id);
        if (found) {
          launchWhatsApp(found.text, currentLine);
        }
      });
    });
  }

  if (triggerBtn && chatWindow) {
    triggerBtn.addEventListener("click", () => {
      const isOpen = chatWindow.classList.contains("open");
      if (isOpen) {
        chatWindow.classList.remove("open");
      } else {
        chatWindow.classList.add("open");
        if (inputBox) inputBox.focus();
      }
    });
  }

  if (closeBtn && chatWindow) {
    closeBtn.addEventListener("click", () => {
      chatWindow.classList.remove("open");
    });
  }

  // Handle manual input text send
  const handleSend = () => {
    const text = inputBox ? inputBox.value.trim() : "";
    if (text) {
      launchWhatsApp(text, currentLine);
      if (inputBox) inputBox.value = "";
      if (chatWindow) chatWindow.classList.remove("open");
    } else {
      launchWhatsApp("Hi SirenCorp! I'd like to talk about building a website.", currentLine);
    }
  };

  if (sendBtn) {
    sendBtn.addEventListener("click", handleSend);
  }

  if (inputBox) {
    inputBox.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
      }
    });
  }

  // Bind all explicit WhatsApp buttons with data-wa-target or data-wa-line
  document.querySelectorAll("[data-wa-action]").forEach(el => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const line = el.getAttribute("data-wa-line") || "line1";
      const customMsg = el.getAttribute("data-wa-msg") || "Hi SirenCorp! I'm reaching out from your website.";
      launchWhatsApp(customMsg, line);
    });
  });
}
