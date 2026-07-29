/**
 * LearnPress Cookie Consent - Shared Interactive App Logic
 */
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Toast Container
  if (!document.getElementById("lp-toast-container")) {
    const toastContainer = document.createElement("div");
    toastContainer.id = "lp-toast-container";
    toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }
});

// Toast Helper
window.showToast = function (message, type = "info") {
  const container = document.getElementById("lp-toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgClass = type === "success" ? "bg-emerald-600" : type === "warning" ? "bg-amber-600" : type === "error" ? "bg-rose-600" : "bg-indigo-600";
  
  toast.className = `${bgClass} text-white text-sm font-medium px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 pointer-events-auto transition-all transform translate-y-2 opacity-0 duration-200`;
  toast.innerHTML = `
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("translate-y-2", "opacity-0");
    setTimeout(() => toast.remove(), 200);
  }, 3000);
};

// Global LP_Cookie JS API Mock
window.LP_Cookie = {
  getConsent: function () {
    return window.LP_Cookie_Data ? window.LP_Cookie_Data.getConsent() : null;
  },
  hasCategory: function (category) {
    const consent = this.getConsent();
    if (!consent) return false;
    return consent.categories && consent.categories[category] === true;
  },
  openSettings: function () {
    const modal = document.getElementById("lp-cookie-preferences-modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      document.body.style.overflow = "hidden";
    } else {
      window.location.href = "s03-preferences-modal.html";
    }
  },
  acceptAll: function () {
    const settings = window.LP_Cookie_Data.getSettings();
    const consent = {
      status: "accepted_all",
      version: settings.consentVersion,
      timestamp: new Date().toISOString(),
      categories: {
        essential: true,
        analytics: true,
        marketing: true,
        preferences: true
      }
    };
    window.LP_Cookie_Data.saveConsent(consent);
    window.showToast("All cookies accepted successfully!", "success");
    
    // Dispatch JS Custom Event
    document.dispatchEvent(new CustomEvent("learnpress/cookie/consent_updated", { detail: consent }));
  },
  rejectAll: function () {
    const settings = window.LP_Cookie_Data.getSettings();
    const consent = {
      status: "rejected_all",
      version: settings.consentVersion,
      timestamp: new Date().toISOString(),
      categories: {
        essential: true,
        analytics: false,
        marketing: false,
        preferences: false
      }
    };
    window.LP_Cookie_Data.saveConsent(consent);
    window.showToast("Optional cookies rejected. Essential cookies stay active.", "info");
    
    // Dispatch JS Custom Event
    document.dispatchEvent(new CustomEvent("learnpress/cookie/consent_updated", { detail: consent }));
  }
};
