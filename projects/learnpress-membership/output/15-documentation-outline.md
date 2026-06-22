# Documentation Outline — LearnPress Membership v4.1

## Skills Used

- `docs/documentation-outline.md`
- `product/prd.md`
- `qa/test-plan.md`

---

## Documentation Pages

| Page | Purpose | Audience | Notes |
| --- | --- | --- | --- |
| Installation & Activation | Hướng dẫn cài đặt, activate license, requirements | Admin / Buyer | PHP 8.x+, WP 6.x+, LearnPress required. Woo optional. |
| Getting Started | Quick start guide: tạo plan đầu tiên, add courses, publish pricing | Admin | Task-based, kèm screenshots |
| Membership Plans | Cách tạo, sửa, xóa plans. Cấu hình billing, courses, settings | Admin | Liên kết với restrict content |
| Content Restriction — Setup | Cách tạo restriction rules trong edit Plan. Chọn content type, objects, taxonomy, mode | Admin | Task-based, kèm screenshots |
| Content Restriction — How It Works | Giải thích 3 restriction modes, priority, OR logic, default message | Admin | Conceptual overview |
| Content Restriction — Shortcodes & Blocks | Cách dùng `[lp_member_content]`, `[lp_non_member_content]`, Gutenberg block | Admin / Content Editor | Code examples |
| WooCommerce Checkout Setup | Cách tạo WC product cho plan, enable Woo mode, CTA switch | Admin | Requires Woo + learnpress-woo-payment |
| WooCommerce Order Mapping | Cách Woo order → LP order → membership activation. Status mapping. | Admin / Support | Troubleshooting-oriented |
| WooCommerce Subscriptions (Phase 4) | Trial setup, subscription lifecycle, renewal, cancel, suspend | Admin | Requires Woo Subscriptions |
| Pricing Page & Block | Cách tạo pricing page, dùng pricing block/shortcode, customize | Admin | Kèm example layout |
| Membership Settings | Tất cả settings: restriction defaults, pricing page URL, messages, checkout mode | Admin | Reference page |
| Roles & Permissions | Quyền của mỗi role: Admin, Instructor, Student, Guest. Ai tạo rules, ai xem content | Admin / Support | Match PRD permission matrix |
| Member Management | Cách xem, edit, activate, deactivate, extend members | Admin | Admin tasks |
| Restricted Content Messages | Cách customize restricted message, CTA, login link. Default vs custom | Admin | Templates, CSS classes |
| Integrations | LearnPress core, WooCommerce, learnpress-woo-payment, Woo Subscriptions, Elementor, Gutenberg | Admin / Developer | Prerequisites per integration |
| Troubleshooting | Known issues: cache conflicts, page builder preview, REST API, search visibility | All users | Support-focused |
| FAQ | Common questions: pricing, compatibility, restrict vs enroll, LP vs Woo checkout, trial, upgrade | Prospects / Users | Include buying objections |
| Hooks & Filters | Developer reference: tất cả action/filter hooks exposed bởi restriction engine, Woo integration | Developer | Code examples, use cases |
| Public API (Helpers) | `lp_membership_is_content_restricted()`, `lp_membership_user_can_access_content()`, `lp_membership_get_content_required_plans()` | Developer | Parameters, return values, examples |
| Extension Tutorials | Cách extend restriction rules, custom message templates, custom restriction modes | Developer | Step-by-step tutorials |
| Changelog | Release history v4.1.x | All users | Semantic versioning format |
| Migration / Upgrade Guide | Từ version hiện tại → v4.1. Data migration notes, breaking changes nếu có | Admin | Quan trọng cho existing users |

---

## Documentation Priority

| Priority | Pages | Lý do |
| --- | --- | --- |
| **P1 — Ship cùng Phase 1-2** | Installation, Getting Started, Membership Plans, Content Restriction Setup, Content Restriction How It Works, Shortcodes & Blocks, Settings, Roles & Permissions, Troubleshooting, FAQ, Changelog, Upgrade Guide | Core restriction features |
| **P2 — Ship cùng Phase 3** | WooCommerce Checkout Setup, WooCommerce Order Mapping, Pricing Page & Block, Integrations | Woo integration features |
| **P3 — Ship cùng Phase 4** | WooCommerce Subscriptions | Subscription lifecycle |
| **P4 — Ongoing** | Hooks & Filters, Public API, Extension Tutorials, Member Management | Developer-focused, iterative |

---

## Documentation Standards

- **Ngôn ngữ:** Tiếng Anh
- **Format:** Markdown, kèm screenshots
- **Structure:** Task-based (What do you want to do? → How to do it)
- **Search optimization:** Title tags, headings, keywords cho help center search
- **Support deflection:** Troubleshooting và FAQ phải cover top support scenarios
