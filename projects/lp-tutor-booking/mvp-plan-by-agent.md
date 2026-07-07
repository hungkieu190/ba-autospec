# [create-mvp-build-plan-by-agent]

You are an AI coding and planning agent working directly in this repository.

## Mission

Create or update the MVP implementation plan for project `lp-tutor-booking`.

Output must be a Markdown plan in:

`projects/lp-tutor-booking/mvp-build-plan/`

The plan must be detailed enough for another AI coding agent to start implementation immediately without re-guessing scope, dependencies, work order, data model, API contracts, acceptance criteria, or completion checklists.

## Required Source Files

Read these files first:

1. `projects/lp-tutor-booking/input.md`
2. `projects/lp-tutor-booking/questions.md`
3. Main product documents in `projects/lp-tutor-booking/output/`:

- `projects/lp-tutor-booking/output/01-discovery.md`
- `projects/lp-tutor-booking/output/02-product-strategy.md`
- `projects/lp-tutor-booking/output/03-prd.md`
- `projects/lp-tutor-booking/output/04-ux-and-wireframe.md`
- `projects/lp-tutor-booking/output/05-qa-and-documentation.md`
- `projects/lp-tutor-booking/output/06-seo-and-marketing.md`
- `projects/lp-tutor-booking/output/07-build-or-not-build.md`

If any file is missing, record that in `00-readme.md` and continue with the available sources.

## Required LearnPress Reference

This project is a LearnPress product or LearnPress add-on. Use the shared LearnPress source reference at:

`references/learnpress/core/`

Before writing the plan, read and cross-check at least these files/areas when present:

- `references/learnpress/core/learnpress.php`
- `references/learnpress/core/inc/abstracts/abstract-addon.php`
- `references/learnpress/core/inc/admin/settings/class-lp-settings-addons.php`
- `references/learnpress/core/inc/cart/class-lp-cart.php`
- `references/learnpress/core/inc/class-lp-checkout.php`
- `references/learnpress/core/inc/order/class-lp-order.php`
- `references/learnpress/core/inc/order/lp-order-functions.php`
- `references/learnpress/core/inc/user/class-lp-profile.php`
- `references/learnpress/core/inc/user/class-lp-profile-tabs.php`
- `references/learnpress/core/inc/rest-api/class-lp-core-api.php`
- `references/learnpress/core/inc/abstracts/abstract-rest-controller.php`
- `references/learnpress/core/inc/class-lp-emails.php`
- `references/learnpress/core/inc/emails/class-lp-email.php`
- `references/learnpress/core/templates/profile/`
- `references/learnpress/core/templates/emails/`
- `references/learnpress/core/inc/WPGDPR/`

In `01-learnpress-integration-analysis.md`, document:

- Add-on bootstrap strategy.
- Required hooks, filters, and actions, with the LearnPress source file where each was found.
- Which parts use public hooks or extension points.
- Which parts must not modify LearnPress core.
- Version-sensitive assumptions to verify when LearnPress changes.


## Required Output Files

Create or update exactly these files:

- `projects/lp-tutor-booking/mvp-build-plan/00-readme.md`
- `projects/lp-tutor-booking/mvp-build-plan/01-learnpress-integration-analysis.md`
- `projects/lp-tutor-booking/mvp-build-plan/02-mvp-scope-and-architecture.md`
- `projects/lp-tutor-booking/mvp-build-plan/03-api-and-data-contracts.md`
- `projects/lp-tutor-booking/mvp-build-plan/04-implementation-backlog.md`
- `projects/lp-tutor-booking/mvp-build-plan/05-ai-agent-task-checklists.md`
- `projects/lp-tutor-booking/mvp-build-plan/06-qa-and-dod.md`

## Source-Of-Truth Rules

1. `input.md` and answered decisions in `questions.md` are the source of truth.
2. If `output/` conflicts with `input.md` or `questions.md`, use `input.md` and `questions.md`.
3. Do not keep answered items as open questions.
4. Do not include internal/meta wording such as "user answered", "unclear version", "open question", or "do not fabricate".
5. Use production-safe labels: `Assumption`, `Validation item`, `Dependency`, or `Decision needed before implementation`.

## Technical Plan Requirements

The plan must cover:

- MVP scope and out of scope.
- Expected plugin/app folder structure.
- Data model: post types, taxonomies, custom tables, options, meta keys, indexes, migration/versioning.
- Service layer and module boundaries.
- REST API or AJAX contracts.
- Permission and capability matrix.
- Frontend/admin screens.
- Checkout, payment, and order lifecycle when relevant.
- Email, notification, webhook, and third-party integration lifecycle when relevant.
- Privacy export/erase when personal data is stored.
- Error states, edge cases, race conditions, and rollback paths.
- QA matrix and Definition of Done.

## Checklist Rules

Every milestone and implementation task must use Markdown checkboxes:

`- [ ] Clear task description`

The coding agent may change it to:

`- [x] Clear task description`

only after implementation and verification are complete.

In `05-ai-agent-task-checklists.md`, create one consolidated checklist in implementation order:

1. Repository and setup
2. Platform/LearnPress integration
3. Database and migrations
4. Domain models
5. Admin settings
6. Instructor/admin workflow
7. Student/customer workflow
8. Checkout/order/payment lifecycle
9. Notifications/integrations
10. Dashboards/profile tabs
11. Security/privacy
12. QA/release

## Output Quality

- Write concise, implementation-ready Markdown.
- Vietnamese output is preferred for product/business explanations; English technical terms are allowed.
- Do not write generic tasks. Each task must name the related file, module, hook, API, or data structure when known.
- Do not copy long source code from references.
- Do not edit source references.
- Do not expand beyond MVP unless the item is clearly marked as out of scope, v1.1, or v2.
- The plan must be readable in order from `00-readme.md` to `06-qa-and-dod.md`.
