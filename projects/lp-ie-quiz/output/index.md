# LearnPress – Backup & Migration Tool (Import Quizzes + Questions) — Output Index

## Main Documents

| File | Purpose |
| --- | --- |
| [01-discovery.md](01-discovery.md) | Discovery + build recommendation |
| [02-product-strategy.md](02-product-strategy.md) | Positioning, scope, roadmap |
| [03-prd.md](03-prd.md) | Two screens, multi-quiz format, AC |
| [04-ux-and-wireframe.md](04-ux-and-wireframe.md) | Flows A/B, screen list |
| [05-qa-and-documentation.md](05-qa-and-documentation.md) | Test plan + docs outline |
| [06-seo-and-marketing.md](06-seo-and-marketing.md) | In-product/docs copy |
| [07-build-or-not-build.md](07-build-or-not-build.md) | **Build Now** |
| [import-history-plan.md](import-history-plan.md) | Phase 1.1 import audit/history plan |
| [backend-ui-style-brief.md](backend-ui-style-brief.md) | Backend UI redesign brief |

## Supporting Files

| File | Purpose |
| --- | --- |
| [quality-report.md](quality-report.md) | Package QA |
| [asana-task.html](asana-task.html) | Asana task + Copy |
| [wireframes/index.html](wireframes/index.html) | Wireframe hub (2 flows) |
| [mvp/](mvp/) | Implemented `learnpress-import-export` |

## Key Decisions

| Decision | Value |
| --- | --- |
| Host | LearnPress – Backup & Migration Tool |
| Packaging | Free module in existing add-on |
| **Screen A** | **Import Quizzes** — multi-quiz file with optional `section_name` → **select course** → create/find sections → create quizzes + questions |
| **Screen B** | **Import Questions** — questions only → existing quiz **or** content bank |
| Entry | Import/Export tabs only (not Tools) |
| Formats | CSV + JSON; multi-quiz via `section_name` + `quiz_title` / `quizzes[].section_name` + title |
| Types | single_choice, multi_choice, true_or_false, fill_in_blanks |
| Error report | Text/log |
| Docs | English, add-on docs |
