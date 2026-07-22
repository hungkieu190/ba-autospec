# 05 — QA & Documentation: Import Quiz Questions CSV

## Test strategy

| Area | Approach |
| --- | --- |
| Functional | AC-01…AC-20 from PRD; CSV matrix per type |
| Permission | Admin vs instructor vs student/subscriber |
| Regression | Quiz edit, question create manual, Tools other tabs, Backup & Migration existing features |
| Security | Upload abuse, nonce, cap bypass, temp file residual, CSV formula injection in logs |
| Performance | Shared hosting profile: 100 / 1.000 / near-limit rows |
| Compatibility | Common wp-admin browsers; UTF-8 Vietnamese |
| Accessibility | WCAG 2.1 AA smoke on import screens |
| Edge | BOM, `;` delimiter, multiline quotes, empty answers TF, override re-import |

**Automated tests:** không bắt buộc framework mới; manual + checklist (theo quyết định product).

**Reference hosting:** shared hosting cơ bản (low memory, ~30s max execution)—batch must complete.

---

## Functional test cases

| ID | Area | Scenario | Preconditions | Steps | Expected | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| T-A01 | Entry | Import Quizzes tab | Cap OK | Open Import/Export | Tab Import Quizzes present; not under Tools | P0 |
| T-A02 | Multi | 2 quiz_titles across 2 section_names | Course selected | Upload multi CSV | Creates 2 sections if missing and 2 quizzes under those sections | P0 |
| T-A03 | Multi | Same section_name + quiz_title | — | Import | Questions under one quiz | P0 |
| T-A04 | Multi | No course | — | Validate | Error: select course | P0 |
| T-A05 | Multi | Missing quiz_title | — | Validate | Clear error / no groups | P0 |
| T-A06 | Multi | Empty section_name | Default section in UI | Validate/import | Uses default section name and creates it if missing | P0 |
| T-B01 | Entry | Import Questions tab | Cap OK | Open Import/Export | Separate from Import Quizzes | P0 |
| T-B02 | Q | Existing quiz | Editable quiz | Import questions | Attached + types correct | P0 |
| T-B03 | Q | Content bank | — | Import | Questions not on any quiz | P0 |
| T-C01 | Format | CSV+JSON samples | — | Download both kinds | Multi + questions templates | P0 |
| T-C02 | UX | Course/quiz list | — | Focus search | List hidden until focus | P0 |
| T-F03 | Upload | Oversize | Max 10MB | Upload > limit | Reject | P0 |
| T-F04 | Parse | Semicolon CSV | Excel EU style | Upload | Detected; rows parse | P0 |
| T-F05 | Parse | BOM UTF-8 | Excel export | Upload | Headers match | P0 |
| T-F06 | Type | Alias multiple_choice | Valid row | Import | multi_choice created | P0 |
| T-F07 | Type | single correct | answers A\|B\|C correct 2 | Import | Only B true | P0 |
| T-F08 | Type | multi correct 1,3 | 4 answers | Import | 1 and 3 true | P0 |
| T-F09 | Type | TF auto answers | empty answers, correct true | Import | True/False; true marked | P0 |
| T-F09A | Type | Fill-in-blanks shortcode | `[fib fill="France" id="blank_country"]` in question_content | Import | Creates fill_in_blanks question with `_blanks` answer meta | P0 |
| T-F10 | Validate | Missing title | — | Preview | Invalid row; count++ | P0 |
| T-F11 | Validate | Mark negative | — | Preview | Invalid | P1 |
| T-F12 | Import | Skip invalid continue | Mixed file | Import | Only valid written | P0 |
| T-F13 | Batch | 1000 rows | Shared host | Import | Completes; progress updates | P0 |
| T-F14 | Status | Default publish | No status col | Import | publish and visible in LearnPress course/quiz queries | P0 |
| T-F15 | Position | Insert start | Quiz has Qs | Import start | New at top order | P1 |
| T-F16 | Position | After N | N=2 | Import | Insert after 2 | P1 |
| T-F17 | Override | Re-import same titles | Prior import | Import again | Updated not duplicated | P0 |
| T-F18 | Preview meta | Counts | Quiz 10 Qs, 5 create 2 update | Preview | Shows 10, projected totals | P0 |
| T-F19 | Error log | Text download | Invalid rows | Download | Row + reason text | P0 |
| T-F20 | Summary nav | Choose edit quiz | Done | Click Edit quiz | Quiz editor opens | P1 |
| T-F21 | Settings | Lower max rows | Admin | Set 10; upload 20 | Reject or invalid file-level | P0 |
| T-F22 | Unicode | Vietnamese | — | Import | Stored correctly | P0 |
| T-F23 | Standalone quiz | Quiz not in course | — | Select + import | Success | P1 |
| T-F24 | Answers max | 11 answers | Max 10 | Preview | Invalid | P1 |
| T-H01 | History | Import Quizzes success | Course selected | Finish import | History row shows user, date, course, file, quizzes/questions counts | P1 |
| T-H02 | History | Import Questions success | Existing quiz | Finish import | History row shows target quiz, created/updated counts | P1 |
| T-H03 | History | Mixed invalid rows | Mixed file | Finish import | History detail shows invalid row messages and completed_with_errors | P1 |
| T-H04 | History permissions | Instructor account | Open history | Shows own/editable jobs only | P1 |
| T-H05 | History log | Leave summary then return | Open history detail | Error log still downloadable | P1 |

---

## Permission tests

| ID | Scenario | Actor | Expected | Priority |
| --- | --- | --- | --- | --- |
| T-P01 | Open tool | Admin | Access | P0 |
| T-P02 | Open tool | Instructor with quizzes | Access | P0 |
| T-P03 | Open tool | Subscriber/student | Denied | P0 |
| T-P04 | Quiz list | Admin | All quizzes searchable | P0 |
| T-P05 | Quiz list | Instructor | Only editable scope | P0 |
| T-P06 | API import other quiz | Instructor crafts request | Server 403; no write | P0 |
| T-P07 | Settings limits | Instructor | No access / no save | P0 |
| T-P08 | Missing nonce | Any | Fail safe | P0 |

---

## Security tests

| ID | Scenario | Expected | Priority |
| --- | --- | --- | --- |
| T-S01 | PHP/JS upload renamed .csv | Reject or non-exec storage; never web-executable path | P0 |
| T-S02 | Path traversal filename | Safe handling | P0 |
| T-S03 | Temp file after job | Deleted | P0 |
| T-S04 | XSS in question_title preview | Escaped in admin UI | P0 |
| T-S05 | CSV formula in error log | Safe text handling | P1 |
| T-S06 | Capability escalation | Blocked | P0 |

---

## Performance tests

| ID | Scenario | Expected | Priority |
| --- | --- | --- | --- |
| T-PERF01 | 100 valid rows shared host | < reasonable wall time; no timeout | P0 |
| T-PERF02 | 1000 valid rows shared host | Completes via batches | P0 |
| T-PERF03 | Near max rows setting | Controlled reject or complete per settings | P1 |
| T-PERF04 | Progress UI responsiveness | Updates without full page freeze | P1 |

---

## Regression focus

- Manual create/edit question in LP still works.
- Existing Backup & Migration backup/restore flows unchanged.
- Other LearnPress Tools pages load.
- Quiz front-end taking for students after import when quiz/questions are published; explicit draft rows remain hidden until published.

---

## Edge cases

| Case | Expected |
| --- | --- |
| Empty file | File error |
| Header only | 0 data rows message |
| Multiline quoted field | Parses as one cell |
| correct_answer out of range | Invalid row |
| Duplicate titles within same CSV | Define: last wins or first create then update—document; prefer sequential process so later row overrides earlier created in same job |
| Concurrent two tabs import same quiz | Second job blocked or queued safely |
| mark empty | Default 1 |
| Pipe in answer text | Invalid or split wrong—document limitation |

---

## Definition of Ready for QA

- [ ] PRD AC frozen
- [ ] Template file attached
- [ ] Wireframes reviewed
- [ ] Settings defaults set
- [ ] Shared hosting test environment available
- [ ] Instructor test account with limited quizzes

## Definition of Done

- [ ] P0 tests pass
- [ ] Permission matrix pass
- [ ] 1000-row perf pass
- [ ] 0 critical security
- [ ] EN docs published in add-on docs
- [ ] Release notes entry in Backup & Migration

---

## Documentation outline (English only)

Host: **existing Backup & Migration documentation** (no separate marketing site).

| Page | Audience | Purpose |
| --- | --- | --- |
| Import quiz questions (overview) | Admin, Instructor | What it does / MVP limits |
| Download and fill the CSV template | Author | Column reference + examples |
| Run an import (Import/Export) | Author | Step-by-step Configure → Preview → Import |
| Validation errors and text log | Author | How to fix rows |
| View import history | Admin, Instructor | Who imported what, when, target, counts, errors |
| Import settings (limits) | Admin | File size, rows, answers |
| FAQ | All | Override behavior, publish default, explicit draft rows, types supported |
| Troubleshooting | Support | Timeout, encoding, delimiter, permissions |
| Changelog | All | Feature added to Backup & Migration |

**Not in MVP docs:** developer hooks, REST public API reference, Vietnamese locale docs.

### FAQ topics

1. Which question types are supported?
2. Why do imported questions publish by default, and when should I use draft?
3. What happens if I import the same file twice?
4. Can instructors import any quiz?
5. How do I encode multiple answers and correct answers?
6. How do True/False rows work?
7. What are default limits and who changes them?
8. Why is there no export yet?
9. Where is the tool in admin?
10. Where can I see previous imports?
11. Does deleting history delete imported quizzes/questions?
12. Excel saves with `;` - will it work?

### Troubleshooting topics

| Symptom | Checks |
| --- | --- |
| Upload rejected | Extension, size, settings |
| All rows invalid | Headers, type slugs, correct indices |
| Timeout | Batch; reduce rows; hosting limits |
| Quiz not in list | Instructor permissions; create quiz |
| Duplicates | Override title rules; same quiz only |
| Unexpected section | Check `section_name`; blank values use the UI default section |
| Broken Unicode | Save CSV UTF-8 |

---

## Assumptions, Decisions, And Validation Items

### Decisions

- Manual QA primary; no mandated PHPUnit suite for this module.
- Docs EN only, inside add-on docs.
- Shared hosting is performance gate.

### Assumptions

- Support team uses text error logs as first response artifact.
- Same-job duplicate titles: sequential last-write wins.

### Validation items

- Confirm shared hosting exact php.ini for CI-like manual bench.
- Confirm a11y audit tool (axe) optional but recommended.

---

## Next Actions

| Owner | Action |
| --- | --- |
| QA | Expand T-* into test management tool |
| Engineering | Provide seed CSV fixtures (valid, mixed, stress) |
| Docs | Draft EN pages before release |
| Support | Add macros linking FAQ + template |
