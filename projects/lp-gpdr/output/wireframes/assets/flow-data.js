/**
 * LearnPress Cookie Consent - Flow Data & Mock State (Updated with Legal Consents & Audit Log)
 */
window.LP_Cookie_Data = {
  // Default Settings State (synced with localStorage)
  defaultSettings: {
    enabled: true,
    consentVersion: "1.0",
    bannerPosition: "bottom-bar", // bottom-bar, top-bar, float-left, float-right, center-modal
    bannerTheme: "light",         // light, dark
    title: "Cookie Privacy Notice",
    description: "We use cookies to enhance your learning experience and analyze site traffic. Read our Privacy Policy and Cookie Policy for more details.",
    privacyUrl: "/privacy-policy",
    cookieUrl: "/cookie-policy",
    btnAcceptAllText: "Accept All",
    btnRejectAllText: "Reject All",
    btnCustomizeText: "Customize",
    btnSaveText: "Save Preferences",
    showAnalytics: true,
    showMarketing: true,
    showPreferences: true,
    detectedConflicts: [
      { name: "Complianz GDPR", active: true, notice: "Warning: Detected active plugin 'Complianz GDPR'. Running two cookie banners may cause UX conflicts." }
    ]
  },

  // Default Categories
  categories: [
    {
      id: "essential",
      name: "Essential Cookies",
      badge: "ALWAYS ON",
      required: true,
      description: "Necessary for basic website functionality, user login sessions, and course progress tracking. Cannot be disabled."
    },
    {
      id: "analytics",
      name: "Analytics Cookies",
      badge: "OPTIONAL",
      required: false,
      description: "Helps us measure site traffic, course completion rates, and improve overall educational content."
    },
    {
      id: "marketing",
      name: "Marketing Cookies",
      badge: "OPTIONAL",
      required: false,
      description: "Used to deliver relevant course recommendations and targeted promotional offers."
    },
    {
      id: "preferences",
      name: "Preferences Cookies",
      badge: "OPTIONAL",
      required: false,
      description: "Remembers your language preferences, theme settings, and UI customizations."
    }
  ],

  // Mock Legal Consents List (Tutor LMS Legal Consents counterpart)
  defaultLegalConsents: [
    {
      id: "lc_01",
      title: "Student Terms of Service & Privacy Agreement",
      location: "registration", // registration, login, checkout, instructor_registration
      type: "mandatory",       // mandatory, optional, text_only
      status: "enabled",
      content: "I agree to the LearnPress Student Terms of Service and Privacy Policy before creating an account."
    },
    {
      id: "lc_02",
      title: "Course Purchase Checkout Terms",
      location: "checkout",
      type: "mandatory",
      status: "enabled",
      content: "I confirm I have read and agree to the Course Refund Policy and Digital Content Access Terms."
    },
    {
      id: "lc_03",
      title: "Promotional Newsletter Opt-in",
      location: "registration",
      type: "optional",
      status: "enabled",
      content: "I would like to receive weekly emails about new courses, discounts, and educational events."
    },
    {
      id: "lc_04",
      title: "Instructor Academic Qualification Declaration",
      location: "instructor_registration",
      type: "mandatory",
      status: "enabled",
      content: "I certify under penalty of perjury that all submitted credentials and course materials are my original work."
    },
    {
      id: "lc_05",
      title: "GDPR Data Processing Information Notice",
      location: "login",
      type: "text_only",
      status: "enabled",
      content: "Notice: Login sessions are monitored for fraud prevention and security audit compliance."
    }
  ],

  // Mock Consent Audit Log Records (Timestamp, IP, User Agent, CSV Export)
  defaultAuditLogs: [
    { id: "LOG-1008", user: "student_alex@example.com", type: "Cookie Consent (Accepted All)", ip: "118.69.182.45", browser: "Chrome 126.0 (Windows 11)", timestamp: "2026-07-24 10:15:22" },
    { id: "LOG-1007", user: "instructor_sarah@example.com", type: "Instructor Reg Consent (lc_04)", ip: "14.241.220.10", browser: "Safari 17.4 (macOS)", timestamp: "2026-07-24 09:42:10" },
    { id: "LOG-1006", user: "guest_visitor_88@guest", type: "Checkout Consent (lc_02)", ip: "27.72.105.89", browser: "Firefox 127.0 (Android)", timestamp: "2026-07-24 08:30:14" },
    { id: "LOG-1005", user: "new_student_99@example.com", type: "Registration Consent (lc_01)", ip: "113.161.78.12", browser: "Edge 126.0 (Windows 11)", timestamp: "2026-07-24 07:11:05" },
    { id: "LOG-1004", user: "student_david@example.com", type: "Cookie Consent (Customized)", ip: "171.244.30.22", browser: "Safari Mobile (iOS 17.5)", timestamp: "2026-07-23 21:05:44" }
  ],

  getSettings: function () {
    const saved = localStorage.getItem("lp_cookie_admin_settings");
    if (saved) {
      try {
        return Object.assign({}, this.defaultSettings, JSON.parse(saved));
      } catch (e) {}
    }
    return Object.assign({}, this.defaultSettings);
  },

  saveSettings: function (newSettings) {
    localStorage.setItem("lp_cookie_admin_settings", JSON.stringify(newSettings));
  },

  getLegalConsents: function () {
    const saved = localStorage.getItem("lp_legal_consents_list");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return this.defaultLegalConsents;
  },

  saveLegalConsents: function (list) {
    localStorage.setItem("lp_legal_consents_list", JSON.stringify(list));
  },

  getAuditLogs: function () {
    const saved = localStorage.getItem("lp_consent_audit_logs");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return this.defaultAuditLogs;
  },

  addAuditLogRecord: function (record) {
    const logs = this.getAuditLogs();
    logs.unshift(record);
    localStorage.setItem("lp_consent_audit_logs", JSON.stringify(logs));
  },

  exportCSV: function () {
    const logs = this.getAuditLogs();
    let csvContent = "data:text/csv;charset=utf-8,ID,User/Email,Consent Type,IP Address,Browser/User Agent,Timestamp\n";
    logs.forEach(row => {
      csvContent += `"${row.id}","${row.user}","${row.type}","${row.ip}","${row.browser}","${row.timestamp}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `learnpress_consent_audit_log_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  resetSettings: function () {
    localStorage.removeItem("lp_cookie_admin_settings");
    localStorage.removeItem("lp_cookie_user_consent");
    localStorage.removeItem("lp_legal_consents_list");
    localStorage.removeItem("lp_consent_audit_logs");
  },

  getConsent: function () {
    const saved = localStorage.getItem("lp_cookie_user_consent");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return null;
  },

  saveConsent: function (consentData) {
    localStorage.setItem("lp_cookie_user_consent", JSON.stringify(consentData));
  }
};
