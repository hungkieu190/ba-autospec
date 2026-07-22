# 07 — Build or Not Build: Import Quiz Questions CSV

## Final recommendation

# **Build Now**

Ship MVP **Import Quiz Questions from CSV** as a free module inside **LearnPress – Backup & Migration Tool** (không add-on mới, không core merge).

---

## Why build now

| Argument | Evidence |
| --- | --- |
| Gap kỹ thuật rõ | LearnPress có Tools + order CSV export; không có quiz question CSV import (recon + input) |
| Pain cao | Tạo quiz lớn thủ công chậm/sai; spreadsheet đã là workflow author |
| Feasibility mạnh | `LP_Question_CURD` / `LP_Quiz_CURD` / answer storage sẵn |
| Scope MVP kiểm soát được | 2 screens; multi-quiz→course; questions→quiz/bank; 4 LearnPress core types |
| Packaging đơn giản | Free trong add-on hiện có; không phụ thuộc pricing/SKU mới |
| Ownership rõ | Một LearnPress Dev team maintain |
| Support signal | Nhiều request chatbot/ticket (chưa có thống kê formal nhưng đủ định hướng ops) |

## Why not reject / delay

| Counter-argument | Response |
| --- | --- |
| Chưa có survey formal | Không block: pain + gap + feasibility đủ cho internal tool; validation qua UAT + post-release tickets |
| Risk support do CSV | Mitigate bằng template, validation, text error log, EN docs |
| Timeout hosting | Batch + settings limits + shared-hosting AC |
| Brand “Export” chưa có | Accept: Export Phase 2; MVP import solves primary pain |

---

## Expected ROI

| Dimension | Assessment |
| --- | --- |
| Direct revenue | **Low / none** (free) |
| Retention & perceived toolkit quality | **Medium–High** |
| Support cost reduction (migrate questions) | **Medium** nếu docs tốt |
| Strategic fit Backup & Migration | **High** |
| Engineering ROI | **High**: effort vừa, value instructor rõ |

ROI chủ yếu **non-cash**: time-to-publish quiz, fewer manual errors, ecosystem completeness.

---

## Estimated development cost

Ước lượng relative (không có timesheet team):

| Workstream | Effort (relative) | Notes |
| --- | --- | --- |
| CSV parse + validate | M | Delimiter/BOM/edges |
| Import batch + CURD mapping | M | Types + override |
| Admin UI multi-step | S–M | Import/Export screen |
| REST + AJAX progress | S–M | Dual transport |
| Settings | S | Three limits |
| Permission scoping | S–M | Instructor quiz list |
| QA (manual + perf) | M | 1000-row shared host |
| EN docs + template | S | Critical for support |

**MVP total:** khoảng **S–M engineering cycle** (vừa), thấp hơn full migration suite.

## Estimated maintenance cost

| Area | Level | Notes |
| --- | --- | --- |
| Bugfix CSV edge cases | Medium initially → Low | Stabilize after 1–2 releases |
| LP core API drift | Low–Medium | Follow CURD changes |
| Support questions format | Medium | Deflect via docs |
| Security upload path | Low ongoing | Standard WP practices |

Phase 2 (export, mapping, undo) tăng maintenance rõ—giữ ngoài MVP.

---

## Revenue potential

| Model | Decision |
| --- | --- |
| Paid SKU | Không |
| Freemium limits | Không |
| PRO bundle differentiator | Không bắt buộc; free addon feature |
| Indirect | Stickiness LearnPress + Backup & Migration completeness |

**Không** dùng revenue gate cho go/no-go. Success = adoption + support deflection + quality metrics.

---

## Strategic fit

| Fit | Score | Note |
| --- | --- | --- |
| LearnPress product line | High | Native APIs only |
| Backup & Migration mission | High | Content move/import |
| Team structure | High | Single Dev team |
| Monetization strategy | Neutral | Free by design |
| Marketing engine | Low need | Docs + changelog đủ |

---

## Consistency with discovery

| Discovery item | Decision alignment |
| --- | --- |
| Market Opportunity ~7.0 | Build Now |
| Complexity ~5.5 | Shipable MVP |
| Risks timeout/permissions/CSV | Explicit AC + mitigations |
| Phase 2 list | Explicitly deferred |
| No market research fluff | Docs avoid survey language; focus engineering delivery |

---

## Go / No-Go criteria

### Go (ship MVP) when

- [ ] AC-01…AC-20 P0 pass  
- [ ] Permission matrix pass  
- [ ] 1.000-row shared hosting pass  
- [ ] 0 critical security on upload/caps  
- [ ] EN docs + template published  
- [ ] Override + publish default + explicit draft + 4 LearnPress core types verified  

### Hold if

- Cannot map answers correctly via CURD on current LP version  
- Shared hosting cannot complete 1.000 rows even with batching (revisit Action Scheduler early)  

### Reject only if

- Leadership forces core merge or paid SKU conflict against free addon decision—re-scope packaging, not the user problem  

---

## Phased commitment

| Phase | Commitment |
| --- | --- |
| **Now** | Import Quizzes (multi→selected course, grouped by section_name + quiz_title) + Import Questions (quiz/bank); CSV/JSON; batch; settings |
| **Later** | Export, bank, mapping, history/undo, images |
| **Not now** | Marketing site, developer hooks, new roles, non-CSV formats |

---

## Assumptions, Decisions, And Validation Items

### Decisions

- **Build Now**
- Free module in **LearnPress – Backup & Migration Tool**
- MVP boundary enforced

### Assumptions

- Chatbot/ticket demand continues post-ship; measure via support tags
- Override-by-title acceptable until external IDs Phase 2

### Validation items

- Post-release: adoption event + ticket trend 90 days  
- Perf benchmark on real shared host plan  

---

## Next Actions

| Owner | Action |
| --- | --- |
| Leadership | Approve Build Now + free packaging |
| Product | Cut sprint backlog from PRD FR list |
| Engineering | Start spike parse + batch CURD |
| QA | Prep fixtures + shared host bench |
| Docs | Template + import guide EN |
