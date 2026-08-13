/**
 * SIRENCORP — Instagram Integration & Showcase Engine
 * Handles Instagram profile sync, interactive story highlights viewer,
 * dynamic post lightbox, live likes counter simulation, and direct DM routing.
 */

export const InstagramConfig = {
  handle: "sirencorp.studio",
  profileUrl: "https://instagram.com",
  directUrl: "https://ig.me/m/sirencorp.studio",
  followers: "4,820",
  postsCount: "142",
  followingCount: "219"
};

export const InstagramStories = [
  {
    id: "launches",
    title: "🚀 Launches",
    heading: "Recent Shipped Projects",
    subtitle: "Bengaluru · Q3 2026",
    badge: "Case Studies",
    content: "Shipped 12 high-converting web apps this month. Sub-second load times across 4G & 5G mobile connections with instant WhatsApp lead capture.",
    color: "#ff4757",
    bgPattern: "radial-gradient(circle at 50% 50%, #2a1b24 0%, #0d0e12 100%)",
    stat: "99/100 Mobile Speed"
  },
  {
    id: "stack",
    title: "🛠️ Stack",
    heading: "No Sluggish Builders",
    subtitle: "Architecture & Performance",
    badge: "Clean Code",
    content: "We write clean, high-performance HTML5, CSS3, JavaScript, and custom backend APIs. No bloated plugins that slow down your visitor's phone.",
    color: "#3b82f6",
    bgPattern: "radial-gradient(circle at 50% 50%, #17243b 0%, #0d0e12 100%)",
    stat: "< 0.4s First Paint"
  },
  {
    id: "whatsapp-crm",
    title: "💬 WhatsApp Bot",
    heading: "Direct Social Commerce",
    subtitle: "Conversational Pipelines",
    badge: "Integration",
    content: "Every button on your site can route qualified customer inquiries straight to your phone with pre-formatted quotes and specs.",
    color: "#25D366",
    bgPattern: "radial-gradient(circle at 50% 50%, #152d22 0%, #0d0e12 100%)",
    stat: "+240% Chat Conversion"
  },
  {
    id: "local",
    title: "📍 Studio HQ",
    heading: "Local in Bengaluru",
    subtitle: "Direct Human Access",
    badge: "Karnataka, India",
    content: "No anonymous support queues across 12-hour timezone delays. You have direct phone and WhatsApp access to the senior engineer building your site.",
    color: "#ffb020",
    bgPattern: "radial-gradient(circle at 50% 50%, #2e2617 0%, #0d0e12 100%)",
    stat: "Dual Lines Open"
  }
];

export const InstagramPosts = [
  {
    id: "post-1",
    title: "SirenCorp Signal Design System 2.0",
    tag: "UI Architecture",
    likes: 342,
    comments: 28,
    date: "2 DAYS AGO",
    gradient: "linear-gradient(135deg, #1e222b 0%, #ff475733 100%)",
    icon: "⚡",
    caption: "Full breakdown of our dark-mode signal design system built for speed, contrast, and ultra-high readability on OLED screens."
  },
  {
    id: "post-2",
    title: "Sub-400ms Landing Pages for D2C Brands",
    tag: "Speed Engineering",
    likes: 518,
    comments: 42,
    date: "4 DAYS AGO",
    gradient: "linear-gradient(135deg, #1e222b 0%, #3b82f633 100%)",
    icon: "🏎️",
    caption: "Why every 100ms of latency reduction delivers an average 8.4% increase in sales conversion rates for Indian D2C businesses."
  },
  {
    id: "post-3",
    title: "Interactive WhatsApp Spec Dispatchers",
    tag: "Conversion Tooling",
    likes: 429,
    comments: 31,
    date: "1 WEEK AGO",
    gradient: "linear-gradient(135deg, #1e222b 0%, #25D36633 100%)",
    icon: "💬",
    caption: "How we turned static quote forms into dynamic WhatsApp spec dispatchers that generate immediate client conversations."
  },
  {
    id: "post-4",
    title: "Inside the Bengaluru Dev Studio",
    tag: "Studio Dispatch",
    likes: 671,
    comments: 54,
    date: "2 WEEKS AGO",
    gradient: "linear-gradient(135deg, #1e222b 0%, #ffb02033 100%)",
    icon: "🏢",
    caption: "A look inside our development workstation in Bengaluru. Real humans, custom code, zero template factories."
  }
];

/**
 * Initialize Instagram Highlights & Grid Feed
 */
export function initInstagramModule() {
  renderStoryHighlights();
  renderInstagramGrid();
  initStoryViewer();
  initPostLightbox();
}

function renderStoryHighlights() {
  const container = document.getElementById("instaStoriesBar");
  if (!container) return;

  container.innerHTML = InstagramStories.map((story, index) => `
    <div class="insta-story-item" data-story-index="${index}" tabindex="0" role="button" aria-label="View story ${story.title}">
      <div class="insta-story-ring">
        <div class="insta-story-inner">
          ${story.title.split(" ")[0]}
        </div>
      </div>
      <span class="insta-story-title">${story.title.split(" ").slice(1).join(" ") || story.title}</span>
    </div>
  `).join("");
}

function renderInstagramGrid() {
  const container = document.getElementById("instaGrid");
  if (!container) return;

  // Retrieve saved likes from localStorage
  const savedLikes = JSON.parse(localStorage.getItem("sirencorp_insta_likes") || "{}");

  container.innerHTML = InstagramPosts.map((post, index) => {
    const isLiked = !!savedLikes[post.id];
    const currentLikes = post.likes + (isLiked ? 1 : 0);

    return `
      <div class="insta-post-card" data-post-index="${index}">
        <div class="insta-post-bg" style="background: ${post.gradient};">
          <div style="font-size: 2.2rem; margin-bottom: 8px;">${post.icon}</div>
          <div style="font-family: 'Oswald', sans-serif; font-size: 1.1rem; line-height: 1.2; text-transform: uppercase;">
            ${post.title}
          </div>
          <div style="font-family: 'IBM Plex Mono', monospace; font-size: 0.72rem; color: var(--blue); margin-top: 4px;">
            #${post.tag.replace(/\s+/g, '')}
          </div>
        </div>
        <div class="insta-post-overlay">
          <div class="insta-overlay-metrics">
            <span class="insta-like-trigger ${isLiked ? 'liked' : ''}" data-post-id="${post.id}">
              <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <b class="like-count">${currentLikes}</b>
            </span>
            <span>
              <svg viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>
              <b>${post.comments}</b>
            </span>
          </div>
          <button class="btn btn-insta btn-sm" style="margin-top: 6px;">
            View on Instagram
          </button>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Story Modal Viewer Logic
 */
let currentStoryIndex = 0;
let storyTimer = null;
let storyProgress = 0;
const STORY_DURATION_MS = 5000;

function initStoryViewer() {
  const modalBackdrop = document.getElementById("storyModal");
  if (!modalBackdrop) return;

  const closeBtn = modalBackdrop.querySelector(".modal-close-btn");
  const fillBar = document.getElementById("storyFillBar");
  const headingEl = document.getElementById("storyHeading");
  const subEl = document.getElementById("storySub");
  const contentEl = document.getElementById("storyContent");
  const statEl = document.getElementById("storyStat");
  const badgeEl = document.getElementById("storyBadge");
  const cardBody = document.getElementById("storyCardBody");

  const openStory = (index) => {
    currentStoryIndex = index;
    modalBackdrop.classList.add("open");
    renderStorySlide(index);
    startStoryProgress();
  };

  const closeStory = () => {
    modalBackdrop.classList.remove("open");
    clearInterval(storyTimer);
  };

  const renderStorySlide = (index) => {
    const data = InstagramStories[index];
    if (!data) return;

    if (headingEl) headingEl.textContent = data.heading;
    if (subEl) subEl.textContent = data.subtitle;
    if (contentEl) contentEl.textContent = data.content;
    if (statEl) statEl.textContent = data.stat;
    if (badgeEl) badgeEl.textContent = data.badge;
    if (cardBody) cardBody.style.background = data.bgPattern;
  };

  const startStoryProgress = () => {
    clearInterval(storyTimer);
    storyProgress = 0;
    const interval = 50;
    const step = (interval / STORY_DURATION_MS) * 100;

    storyTimer = setInterval(() => {
      storyProgress += step;
      if (fillBar) fillBar.style.width = `${Math.min(storyProgress, 100)}%`;

      if (storyProgress >= 100) {
        if (currentStoryIndex < InstagramStories.length - 1) {
          currentStoryIndex++;
          renderStorySlide(currentStoryIndex);
          storyProgress = 0;
        } else {
          closeStory();
        }
      }
    }, interval);
  };

  // Bind clicks on story triggers
  document.querySelectorAll(".insta-story-item").forEach(item => {
    item.addEventListener("click", () => {
      const idx = parseInt(item.getAttribute("data-story-index"), 10);
      openStory(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeStory);

  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeStory();
  });

  // Story tap left / right navigation
  const storyContainer = modalBackdrop.querySelector(".story-modal-container");
  if (storyContainer) {
    storyContainer.addEventListener("click", (e) => {
      if (e.target.closest(".modal-close-btn") || e.target.closest("a") || e.target.closest("button")) return;
      const rect = storyContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      if (clickX < rect.width / 3) {
        // Go to previous story
        if (currentStoryIndex > 0) {
          currentStoryIndex--;
          renderStorySlide(currentStoryIndex);
          startStoryProgress();
        }
      } else {
        // Advance to next story
        if (currentStoryIndex < InstagramStories.length - 1) {
          currentStoryIndex++;
          renderStorySlide(currentStoryIndex);
          startStoryProgress();
        } else {
          closeStory();
        }
      }
    });
  }
}

/**
 * Post Lightbox & Direct DM Action
 */
function initPostLightbox() {
  // Bind Like Button Clicks with localStorage persistence
  document.querySelectorAll(".insta-like-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const postId = btn.getAttribute("data-post-id");
      const post = InstagramPosts.find(p => p.id === postId);
      if (!post) return;

      const savedLikes = JSON.parse(localStorage.getItem("sirencorp_insta_likes") || "{}");
      const isLiked = !savedLikes[postId];
      savedLikes[postId] = isLiked;
      localStorage.setItem("sirencorp_insta_likes", JSON.stringify(savedLikes));

      const countEl = btn.querySelector(".like-count");
      if (countEl) {
        countEl.textContent = post.likes + (isLiked ? 1 : 0);
      }
      btn.classList.toggle("liked", isLiked);
      btn.style.color = isLiked ? "#ff4757" : "#ffffff";
    });
  });

  // Clicking an Instagram card opens Instagram direct or preview
  document.querySelectorAll(".insta-post-card").forEach(card => {
    card.addEventListener("click", () => {
      window.open(InstagramConfig.profileUrl, "_blank", "noopener,noreferrer");
    });
  });

  // Direct DM Buttons across page
  document.querySelectorAll("[data-insta-dm]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      window.open(InstagramConfig.directUrl, "_blank", "noopener,noreferrer");
    });
  });
}
