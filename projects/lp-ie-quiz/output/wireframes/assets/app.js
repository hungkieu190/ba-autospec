window.LPApp = {
  toastEl: null,
  init() {
    this.ensureToast();
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-action]");
      if (t && this[t.getAttribute("data-action")]) {
        e.preventDefault();
        this[t.getAttribute("data-action")](t, e);
      }
    });
  },
  ensureToast() {
    if (document.getElementById("lp-toast")) return;
    const el = document.createElement("div");
    el.id = "lp-toast";
    el.className =
      "fixed bottom-4 right-4 z-[100] hidden max-w-sm rounded shadow-lg bg-gray-900 text-white text-sm px-4 py-3";
    el.setAttribute("role", "status");
    document.body.appendChild(el);
  },
  toast(msg, ms = 2000) {
    this.ensureToast();
    const el = document.getElementById("lp-toast");
    el.textContent = msg;
    el.classList.remove("hidden");
    clearTimeout(this._t);
    this._t = setTimeout(() => el.classList.add("hidden"), ms);
  },
  getState() {
    try {
      return JSON.parse(sessionStorage.getItem("lp_ie_wf") || "{}");
    } catch {
      return {};
    }
  },
  setState(p) {
    const n = { ...this.getState(), ...p };
    sessionStorage.setItem("lp_ie_wf", JSON.stringify(n));
    return n;
  },
  getRole() {
    return sessionStorage.getItem("lp_import_role") || "admin";
  },

  /* samples */
  downloadMultiCsv() {
    this._dl("section_name,quiz_title,question_title,question_content,question_type,answers,correct_answer\nWeek 1,Biology Midterm,Cell structure basics,,single_choice,Nucleus|Mitochondria|Cell wall|Ribosome,1\nWeek 1,Biology Midterm,Capital city blank,\"Paris is the capital of [fib fill=\"\"France\"\" id=\"\"blank_country\"\" comparison=\"\"equal\"\" match_case=\"\"0\"\" ].\",fill_in_blanks,,\nWeek 2,Chemistry Quiz A,DNA is a double helix,,true_or_false,,true\nWeek 2,Chemistry Quiz A,Select prime numbers,,multi_choice,2|3|4|5,\"1,2,4\"\n", "multi-quiz-sample.csv", "text/csv");
  },
  downloadMultiJson() {
    this._dl(JSON.stringify({ version: 1, quizzes: [{ section_name: "Week 1", title: "Biology Midterm", questions: [] }] }, null, 2), "multi-quiz-sample.json", "application/json");
  },
  downloadQCsv() {
    this._dl("question_title,question_content,question_type,answers,correct_answer\nCell structure basics,,single_choice,Nucleus|Mitochondria|Cell wall|Ribosome,1\nSelect energy organelles,,multi_choice,Chloroplast|Mitochondria|Golgi|Lysosome,\"1,2\"\nDNA is a double helix,,true_or_false,,true\nCapital city blank,\"Paris is the capital of [fib fill=\"\"France\"\" id=\"\"blank_country\"\" comparison=\"\"equal\"\" match_case=\"\"0\"\" ].\",fill_in_blanks,,\n", "questions-sample.csv", "text/csv");
  },
  downloadQJson() {
    this._dl(JSON.stringify({ version: 1, questions: [] }, null, 2), "questions-sample.json", "application/json");
  },
  _dl(text, name, type) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    a.click();
    this.toast("Demo: " + name);
  },

  /* course list */
  renderCourses(q) {
    const ul = document.getElementById("course-list");
    if (!ul) return;
    const list = (window.LPImportFlow.courses || []).filter(
      (c) => !q || c.title.toLowerCase().includes(q.toLowerCase())
    );
    const sel = this.getState().courseId;
    ul.innerHTML = list
      .map(
        (c) => `<li><button type="button" data-action="selectCourse" data-id="${c.id}" data-title="${c.title}"
        class="w-full text-left px-3 py-2 text-sm border-b hover:bg-blue-50 ${String(sel) === String(c.id) ? "bg-blue-50 font-medium" : ""}">${c.title}</button></li>`
      )
      .join("");
  },
  selectCourse(btn) {
    this.setState({ courseId: btn.dataset.id, courseTitle: btn.dataset.title });
    const lab = document.getElementById("selected-course");
    const search = document.getElementById("course-search");
    if (lab) lab.textContent = btn.dataset.title;
    if (search) search.value = btn.dataset.title;
    document.getElementById("course-list")?.classList.remove("is-open");
    this.toast("Course: " + btn.dataset.title);
  },

  /* quiz list */
  renderQuizzes(q) {
    const ul = document.getElementById("quiz-list");
    if (!ul) return;
    const role = this.getRole();
    const list = (window.LPImportFlow.quizzesByRole[role] || []).filter(
      (x) => !q || x.title.toLowerCase().includes(q.toLowerCase())
    );
    const sel = this.getState().quizId;
    ul.innerHTML = list
      .map(
        (x) => `<li><button type="button" data-action="selectQuiz" data-id="${x.id}" data-title="${x.title}" data-questions="${x.questions}"
        class="w-full text-left px-3 py-2 text-sm border-b hover:bg-blue-50 ${String(sel) === String(x.id) ? "bg-blue-50 font-medium" : ""}">
        ${x.title}<span class="block text-xs text-gray-500">${x.questions} questions</span></button></li>`
      )
      .join("");
  },
  selectQuiz(btn) {
    this.setState({ quizId: btn.dataset.id, quizTitle: btn.dataset.title, currentQ: btn.dataset.questions });
    const lab = document.getElementById("selected-quiz");
    const search = document.getElementById("quiz-search");
    if (lab) lab.textContent = btn.dataset.title;
    if (search) search.value = btn.dataset.title;
    document.getElementById("quiz-list")?.classList.remove("is-open");
    this.toast("Quiz: " + btn.dataset.title);
  },

  onFileChange(input) {
    const f = input.files && input.files[0];
    const el = document.getElementById("file-name");
    if (!f) return;
    if (!/\.(csv|json)$/i.test(f.name)) {
      this.toast("Only .csv or .json");
      if (el) el.textContent = "No file";
      this.setState({ fileName: null });
      return;
    }
    if (el) el.textContent = f.name;
    this.setState({ fileName: f.name });
  },

  /* Flow A validate */
  validateQuizzes() {
    const s = this.getState();
    if (!s.courseId) {
      this.toast("Select a target course");
      return;
    }
    if (!s.fileName) {
      this.toast("Choose a multi-quiz file");
      return;
    }
    this.setState({
      flow: "quizzes",
      sectionName: "Week 1 (will create), Week 2 (will create)",
      multiCounts: window.LPImportFlow.multiCounts,
    });
    this.toast("Demo: multi-quiz validated");
    setTimeout(() => (location.href = "a02-quizzes-preview.html"), 350);
  },

  startQuizImport() {
    this.setState({ flow: "quizzes" });
    location.href = "a03-quizzes-progress.html";
  },

  runQuizProgress() {
    const bar = document.getElementById("progress-bar");
    const text = document.getElementById("progress-text");
    const qc = document.getElementById("stat-quizzes");
    const qq = document.getElementById("stat-questions");
    let n = 0;
    const total = 2;
    const tick = () => {
      n++;
      if (bar) bar.style.width = (n / total) * 100 + "%";
      if (text) text.textContent = n + " / " + total;
      if (qc) qc.textContent = String(n);
      if (qq) qq.textContent = String(n * 2);
      if (n >= total) {
        this.setState({ result: { quizzes: 2, questions: 3, failed: 0, skipped: 1 } });
        setTimeout(() => (location.href = "a04-quizzes-summary.html"), 600);
        return;
      }
      setTimeout(tick, 400);
    };
    tick();
  },

  /* Flow B validate */
  validateQuestions() {
    const s = this.getState();
    const dest = document.querySelector('input[name="qdest"]:checked')?.value || "existing";
    if (dest === "existing" && !s.quizId) {
      this.toast("Select a quiz");
      return;
    }
    if (!s.fileName) {
      this.toast("Choose a file");
      return;
    }
    this.setState({
      flow: "questions",
      qDest: dest,
      quizTitle: dest === "bank" ? "Content bank" : s.quizTitle,
      questionCounts: window.LPImportFlow.questionCounts,
    });
    this.toast("Demo: questions validated");
    setTimeout(() => (location.href = "b02-questions-preview.html"), 350);
  },

  startQuestionImport() {
    location.href = "b03-questions-progress.html";
  },

  runQuestionProgress() {
    const bar = document.getElementById("progress-bar");
    const text = document.getElementById("progress-text");
    let n = 0;
    const total = 50;
    const tick = () => {
      n = Math.min(total, n + 10);
      if (bar) bar.style.width = (n / total) * 100 + "%";
      if (text) text.textContent = n + " / " + total;
      if (n >= total) {
        this.setState({ result: { created: 48, updated: 2, failed: 0, skipped: 5 } });
        setTimeout(() => (location.href = "b04-questions-summary.html"), 500);
        return;
      }
      setTimeout(tick, 250);
    };
    tick();
  },

  hydrate() {
    const s = this.getState();
    document.querySelectorAll("[data-bind]").forEach((el) => {
      const k = el.getAttribute("data-bind");
      const map = {
        courseTitle: s.courseTitle || "Biology 101",
        sectionName: s.sectionName || "Imported quizzes",
        quizTitle: s.quizTitle || "—",
        quizCount: s.multiCounts?.quizzes ?? 2,
        valid: s.multiCounts?.valid ?? s.questionCounts?.valid ?? 0,
        invalid: s.multiCounts?.invalid ?? s.questionCounts?.invalid ?? 0,
        warning: s.questionCounts?.warning ?? 0,
        create: s.questionCounts?.create ?? 0,
        update: s.questionCounts?.update ?? 0,
        current: s.questionCounts?.current ?? s.currentQ ?? 0,
        rQuizzes: s.result?.quizzes ?? 2,
        rQuestions: s.result?.questions ?? s.result?.created ?? 0,
        rFailed: s.result?.failed ?? 0,
        rSkipped: s.result?.skipped ?? 0,
        rCreated: s.result?.created ?? 0,
        rUpdated: s.result?.updated ?? 0,
      };
      if (map[k] != null) el.textContent = String(map[k]);
    });
  },

  fillMultiTable() {
    const tb = document.getElementById("preview-tbody");
    if (!tb) return;
    tb.innerHTML = (window.LPImportFlow.multiQuizPreview || [])
      .map(
        (r) =>
          `<tr class="transition hover:bg-[#f8fbff]" data-status="${r.status}"><td class="px-3 py-3 font-medium text-[#646970]">${r.row}</td><td class="px-3 py-3">${r.section || ""}</td><td class="px-3 py-3 font-medium">${r.quiz}</td><td class="px-3 py-3">${this.statusBadge(r.status)}</td><td class="px-3 py-3">${r.title}</td><td class="px-3 py-3">${this.typeBadge(r.type)}</td><td class="px-3 py-3 text-[#646970]">${r.message}</td></tr>`
      )
      .join("");
  },

  fillQuestionTable() {
    const tb = document.getElementById("preview-tbody");
    if (!tb) return;
    tb.innerHTML = (window.LPImportFlow.questionPreview || [])
      .map(
        (r) =>
          `<tr class="transition hover:bg-[#f8fbff]" data-status="${r.status}"><td class="px-3 py-3 font-medium text-[#646970]">${r.row}</td><td class="px-3 py-3">${this.statusBadge(r.status)}</td><td class="px-3 py-3">${r.title}</td><td class="px-3 py-3">${this.typeBadge(r.type)}</td><td class="px-3 py-3 font-medium">${r.action}</td><td class="px-3 py-3 text-[#646970]">${r.message}</td></tr>`
      )
      .join("");
  },

  statusBadge(status) {
    const map = {
      valid: "bg-[#edfaef] text-[#007017] border-[#b8e6bf]",
      warning: "bg-[#fcf9e8] text-[#996800] border-[#f0d98b]",
      invalid: "bg-[#fcf0f1] text-[#b32d2e] border-[#facfd2]",
    };
    return `<span class="inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-bold ${map[status] || "bg-white text-[#646970] border-[#dcdcde]"}">${status}</span>`;
  },

  typeBadge(type) {
    return `<code class="rounded border border-[#dcdcde] bg-[#f6f7f7] px-2 py-1 text-xs text-[#1d2327]">${type}</code>`;
  },

  saveSettings() {
    this.toast("Demo: settings saved");
    document.getElementById("settings-saved")?.classList.remove("hidden");
  },

  showStatePanel(name) {
    document.querySelectorAll("[data-state-panel]").forEach((p) => {
      p.classList.toggle("hidden", p.getAttribute("data-state-panel") !== name);
    });
  },
};

document.addEventListener("DOMContentLoaded", () => LPApp.init());
