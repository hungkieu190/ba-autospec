/**
 * Import/Export chrome - tabs: Import Quizzes | Import Questions | Settings
 */
window.LPChrome = {
  screens: [
    { id: "index", file: "index.html", label: "Hub" },
    { id: "a01", file: "a01-quizzes-configure.html", label: "A01 Quizzes" },
    { id: "a02", file: "a02-quizzes-preview.html", label: "A02 Preview" },
    { id: "a03", file: "a03-quizzes-progress.html", label: "A03 Progress" },
    { id: "a04", file: "a04-quizzes-summary.html", label: "A04 Summary" },
    { id: "b01", file: "b01-questions-configure.html", label: "B01 Questions" },
    { id: "b02", file: "b02-questions-preview.html", label: "B02 Preview" },
    { id: "b03", file: "b03-questions-progress.html", label: "B03 Progress" },
    { id: "b04", file: "b04-questions-summary.html", label: "B04 Summary" },
    { id: "s05", file: "s05-import-settings.html", label: "S05 Settings" },
    { id: "s06", file: "s06-empty-error-states.html", label: "S06 States" },
  ],

  mount(options = {}) {
    const {
      activeScreen = "a01",
      ieTab = "import_quizzes",
      roleLabel = "Admin",
    } = options;

    const root = document.getElementById("wp-chrome");
    if (!root) return;

    const role = (sessionStorage.getItem("lp_import_role") || "admin").toLowerCase();
    const howdy = role === "instructor" ? "Howdy, Instructor" : "Howdy, Admin";

    root.innerHTML = `
      <!-- WP Top Admin Bar -->
      <div class="fixed left-0 right-0 top-0 z-50 flex h-8 w-full items-center gap-4 bg-[#1d2327] px-4 text-xs text-gray-200 shadow-sm font-sans select-none">
        <span class="font-bold text-white flex items-center gap-1">
          <svg class="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M12.158 12.786l-2.698 7.84h-.051l-2.672-7.84h5.421zm2.26-6.19c.79 0 1.488.293 1.488 1.002 0 .546-.343 1.093-.728 1.835l-2.316 4.707-.96-3.13 2.516-4.414zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm.179 17.593c-.456.03-.836.046-1.14.046-.735 0-1.468-.046-2.18-.137l2.808-8.204 2.807 8.204a11.905 11.905 0 01-2.295.09zM4.093 13.11c.218-.08.435-.138.65-.138.534 0 .973.342.973.874 0 .493-.308.974-.683 1.623l-.934 1.764A9.92 9.92 0 014.093 13.11zm15.422.39a9.9 9.9 0 01-1.077 3.328l-2.585-7.55 1.554-2.736c.462-.78.847-1.17.847-1.637 0-.39-.244-.702-.821-.702-.128 0-.308.016-.487.047L19.515 13.5zm-5.772-9.45c2.194 0 3.733 1.597 3.733 3.548 0 1.547-.923 3.354-1.95 5.253L12 20.354l-3.526-7.463c-1.026-1.9-1.95-3.706-1.95-5.253 0-1.95 1.54-3.548 3.733-3.548 1.258 0 2.296.53 3.486 1.482.26.21.503.447.747.7.244-.253.487-.49.747-.7 1.19-.95 2.228-1.482 3.486-1.482z"/></svg>
          WordPress
        </span>
        <span class="hover:text-blue-400 cursor-pointer transition">LearnPress Import/Export</span>
        <span class="ml-auto flex items-center gap-2 hover:text-blue-400 cursor-pointer">
          <div class="h-5 w-5 rounded-full bg-slate-600 flex items-center justify-center font-bold text-[10px] text-white">A</div>
          ${howdy}
        </span>
      </div>

      <div class="flex min-h-screen pt-8 font-sans antialiased text-[#1d2327]">
        <!-- WP Sidebar -->
        <aside class="min-h-screen w-56 shrink-0 bg-[#1d2327] text-[14px] text-gray-300 select-none">
          <div class="border-b border-white/5 px-4 py-4 flex items-center gap-3">
            <div class="h-7 w-7 rounded bg-[#2271b1] flex items-center justify-center font-bold text-white text-sm">LP</div>
            <div>
              <div class="text-[10px] font-bold uppercase tracking-wider text-gray-500">LearnPress LMS</div>
              <div class="font-semibold text-white text-xs">Operations Dashboard</div>
            </div>
          </div>
          
          <nav class="py-2 space-y-0.5">
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-white/5 hover:text-white transition text-gray-400">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              Dashboard
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-white/5 hover:text-white transition text-gray-400">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              Courses
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-white/5 hover:text-white transition text-gray-400">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
              Quizzes
            </a>
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-white/5 hover:text-white transition text-gray-400">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Questions
            </a>
            
            <div class="h-px bg-white/5 my-2"></div>
            
            <a href="#" class="flex items-center gap-3 border-l-4 border-[#72aee6] bg-[#2c3338] px-3 py-2 font-semibold text-white transition">
              <svg class="h-4 w-4 text-[#72aee6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
              Import/Export
            </a>
            
            <a href="#" class="flex items-center gap-3 px-4 py-2 hover:bg-white/5 hover:text-white transition text-gray-400">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Settings
            </a>
          </nav>
        </aside>

        <!-- WP Content Frame -->
        <div class="min-w-0 flex-1 bg-[#f6f7f7] pb-12">
          <!-- WP Page Title Area -->
          <div class="px-8 pb-3 pt-6 flex items-center justify-between">
            <div>
              <span class="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#135e96]">Plugin Extension</span>
              <h1 class="m-0 text-[24px] font-normal text-[#1d2327] mt-1">LearnPress – Backup &amp; Migration</h1>
            </div>
            
            <!-- Quick Role Switcher -->
            <div class="flex items-center gap-2 border border-[#dcdcde] bg-white px-3 py-1.5 rounded shadow-sm text-xs">
              <span class="text-gray-500 font-medium">Test Role:</span>
              <select id="role-toggle" class="rounded border border-[#c3c4c7] bg-white px-1.5 py-0.5 text-xs font-semibold focus:border-blue-500 focus:outline-none">
                <option value="admin" ${role === "admin" ? "selected" : ""}>Administrator</option>
                <option value="instructor" ${role === "instructor" ? "selected" : ""}>lp_instructor</option>
              </select>
            </div>
          </div>

          <!-- WP Sub Navigation Tabs -->
          <div class="px-8 mb-5">
            <nav class="flex flex-wrap gap-1 border-b border-[#dcdcde] text-[13.5px]">
              ${this._tab("Export", false, "index.html")}
              ${this._tab("Import", false, "index.html")}
              ${this._tab("Import Quizzes", ieTab === "import_quizzes", "a01-quizzes-configure.html")}
              ${this._tab("Import Questions", ieTab === "import_questions", "b01-questions-configure.html")}
              ${this._tab("Quiz Import Settings", ieTab === "settings", "s05-import-settings.html")}
            </nav>
          </div>

          <!-- Prototype Status Banner -->
          <div class="mx-8 mb-5 flex flex-wrap items-center gap-3 border-l-4 border-[#3b82f6] bg-blue-50/50 px-4 py-2.5 text-xs text-blue-900 rounded-r">
            <span class="font-bold flex items-center gap-1">
              <svg class="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Prototype Preview
            </span>
            <span>Current view: <strong>${options.roleLabel || activeScreen}</strong> flow screen.</span>
            <div class="ml-auto flex items-center gap-2 text-gray-500">
              <a href="index.html" class="text-blue-600 font-semibold hover:underline">← Hub Index</a>
              <span>/</span>
              ${this.screens
                .filter((s) => s.id !== "index")
                .map(
                  (s) =>
                    `<a href="${s.file}" class="${s.id === activeScreen ? "font-bold text-blue-700" : "hover:text-blue-600"}">${s.label}</a>`
                )
                .join('<span class="text-gray-300">/</span>')}
            </div>
          </div>

          <!-- Main Interactive Viewport -->
          <main id="wireframe-main" class="px-8"></main>
        </div>
      </div>
    `;

    const main = document.getElementById("wireframe-main");
    const content = document.getElementById("screen-content");
    if (main && content) {
      main.appendChild(content);
      content.classList.remove("hidden");
    }

    document.getElementById("role-toggle")?.addEventListener("change", (e) => {
      sessionStorage.setItem("lp_import_role", e.target.value);
      location.reload();
    });
  },

  _tab(label, active, href) {
    const base = "inline-flex min-h-[38px] items-center rounded-t border border-b-0 px-4 py-1.5 text-[13px] no-underline transition select-none cursor-pointer";
    if (active) {
      return `<span class="${base} relative top-px border-[#dcdcde] border-t-2 border-t-[#2271b1] bg-white font-semibold text-[#1d2327]">${label}</span>`;
    }
    return `<a href="${href || "#"}" class="${base} border-transparent bg-transparent text-[#50575e] hover:bg-white/40 hover:text-blue-600">${label}</a>`;
  },
};
