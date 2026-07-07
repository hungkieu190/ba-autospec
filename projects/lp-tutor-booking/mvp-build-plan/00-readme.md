# LearnPress Tutor Booking MVP Build Plan

## Goal

Build an MVP implementation plan for a LearnPress add-on that lets instructors define paid tutoring sessions, lets students book available slots, routes payment through LearnPress Checkout, and confirms bookings after successful payment.

Primary sources:

- `projects/lp-tutor-booking/input.md`
- `projects/lp-tutor-booking/questions.md`
- `projects/lp-tutor-booking/output/03-prd.md`
- `projects/lp-tutor-booking/output/04-ux-and-wireframe.md`
- `references/learnpress/core/`

Source-of-truth rule: if generated output conflicts with answered decisions in `input.md` or `questions.md`, use `input.md` and `questions.md`.

## Required Reading Order

1. `00-readme.md`
2. `01-learnpress-integration-analysis.md`
3. `02-mvp-scope-and-architecture.md`
4. `03-api-and-data-contracts.md`
5. `04-implementation-backlog.md`
6. `05-ai-agent-task-checklists.md`
7. `06-qa-and-dod.md`

## Agent Rules

- [ ] Do not edit LearnPress core in `references/learnpress/core/`.
- [ ] Build a standalone add-on, expected plugin folder `learnpress-tutor-booking/`.
- [ ] Mark a task as `- [x]` only after implementation and verification.
- [ ] If blocked, keep the task unchecked and add `Blocker:` directly under it.
- [ ] Store all booking times in UTC and display them in the viewer's timezone.
- [ ] Prevent double booking in the database/service layer, not only in the UI.
- [ ] Treat Google Calendar as MVP scope: booking sync plus busy-time conflict detection.

## Output Files

| File | Purpose |
|---|---|
| `01-learnpress-integration-analysis.md` | LearnPress hooks, classes, and extension points |
| `02-mvp-scope-and-architecture.md` | MVP scope, plugin architecture, data model, lifecycle |
| `03-api-and-data-contracts.md` | REST endpoints and service contracts |
| `04-implementation-backlog.md` | Milestone backlog for coding agents |
| `05-ai-agent-task-checklists.md` | Central checkbox checklist |
| `06-qa-and-dod.md` | QA matrix and Definition of Done |

## Startup Checklist

- [ ] Read `input.md` and confirm Google Calendar v1.0 includes sync and busy-time conflict checks.
- [ ] Read PRD/UX and note any outdated Google Calendar scope as superseded by `input.md`.
- [ ] Read `references/learnpress/core/inc/abstracts/abstract-addon.php`.
- [ ] Read `references/learnpress/core/inc/class-lp-checkout.php`.
- [ ] Read `references/learnpress/core/inc/cart/class-lp-cart.php`.
- [ ] Read `references/learnpress/core/inc/order/class-lp-order.php`.
- [ ] Read `references/learnpress/core/inc/user/class-lp-profile.php`.
- [ ] Read `references/learnpress/core/inc/class-lp-emails.php`.
- [ ] Read all files in `mvp-build-plan/`.
