window.LPImportFlow = {
  courses: [
    { id: 1, title: "Biology 101" },
    { id: 2, title: "Chemistry Basics" },
    { id: 3, title: "Intro to LMS Demo" },
  ],
  quizzesByRole: {
    admin: [
      { id: 101, title: "Final Exam - Biology", questions: 24 },
      { id: 102, title: "Midterm Quiz - Math 101", questions: 40 },
      { id: 103, title: "Standalone Practice Quiz", questions: 12 },
    ],
    instructor: [
      { id: 101, title: "Final Exam - Biology", questions: 24 },
      { id: 103, title: "Standalone Practice Quiz", questions: 12 },
    ],
  },
  multiQuizPreview: [
    { row: 2, section: "Week 1", quiz: "Biology Midterm", status: "valid", title: "Cell structure basics", type: "single_choice", message: "-" },
    { row: 3, section: "Week 1", quiz: "Biology Midterm", status: "valid", title: "DNA is a double helix", type: "true_or_false", message: "-" },
    { row: 4, section: "Week 1", quiz: "Biology Midterm", status: "valid", title: "Capital city blank", type: "fill_in_blanks", message: "-" },
    { row: 5, section: "Week 2", quiz: "Chemistry Quiz A", status: "valid", title: "Select energy organelles", type: "multi_choice", message: "-" },
    { row: 6, section: "Week 2", quiz: "Chemistry Quiz A", status: "invalid", title: "(empty)", type: "single_choice", message: "Missing question_title" },
  ],
  questionPreview: [
    { row: 2, status: "valid", title: "Cell structure basics", type: "single_choice", action: "Create", message: "-" },
    { row: 5, status: "warning", title: "Mitochondria function", type: "multi_choice", action: "Update", message: "Title exists - will override" },
    { row: 6, status: "valid", title: "Capital city blank", type: "fill_in_blanks", action: "Create", message: "-" },
    { row: 8, status: "invalid", title: "(empty)", type: "single_choice", action: "Skip", message: "Missing question_title" },
  ],
  multiCounts: { quizzes: 2, valid: 3, invalid: 1 },
  questionCounts: { valid: 50, warning: 3, invalid: 5, create: 48, update: 2, current: 24 },
};
