# Wireframe Inventory & Mapping Document

## Project Summary

- **Project:** Memberships & Subscriptions Add-on for LearnPress
- **Format:** Multi-file HTML5 + Tailwind CSS v2.0
- **Root Directory:** `projects/learnpress-membership/output/wireframes/`

---

## Screen Inventory

| ID | File | Screen Name | Role | WP Admin? | States Covered | Key Demos / JS Interactions |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | `s01-edit-plan-unified.html` | Edit Plan - Unified Form | Admin | Yes | Normal, Saved, 1-1 Woo Mapped | Single-page form (Plan Details + Woo 1-1 Mapping + Restrict Content Table with Dual Target Scope Picker: All Items vs Specific Items/Taxonomies). |
| S02 | `s02-edit-plan-errors.html` | Edit Plan - Error & Dependency Warnings | Admin | Yes | Error, Warning, Validation | Woo Subscriptions missing notice, Product re-assignment warning, field validation failure. |
| S03 | `s03-membership-settings.html` | Membership Settings - Dependencies | Admin | Yes | Active, Missing Dependencies | Dependencies health check list, Guest checkout enforcement, Success redirect config. |
| S04 | `s04-pricing-restricted-cta.html` | Pricing / Restricted Message CTA | Guest / Student | No | Normal, Popular, Restricted | Pricing cards with Buy CTAs + Frontend restriction mode previews (Partial Excerpt Paywall & Full Lock). |
| S05 | `s05-membership-dashboard.html` | Membership Dashboard / Profile | Student | No | Active Plan, Empty State | LearnPress student profile tab, active plan details, renew button, empty state preview. |
| S06 | `s06-woo-checkout-success.html` | Woo Checkout Success | Student / Customer | No | Completed, Pending, Error | Order complete confirmation, instant plan activation message, pending/error state previews. |

---

## Quality & Rules Checklist

- [x] **Multi-File Architecture:** Created `index.html` hub + individual self-contained `sXX-*.html` files (HTML5 + Tailwind CSS CDN, no assets folder required).
- [x] **WP Admin Chrome:** Includes WP top bar and expanded `LearnPress ➔ Membership` sub-menu on all admin screens.
- [x] **No Sub-tabs in Edit Plan:** Unified single-page form matching production screenshot layout.
- [x] **1-to-1 WooCommerce Product Mapping:** Woo product dropdown specifies exact product ID, price, direct Woo edit link, and mapped product badge.
- [x] **Standalone Browser Loading:** All HTML files open directly in any web browser with Tailwind CSS CDN and relative paths.
- [x] **Accessibility & Labels:** Semantic HTML5 elements (`<aside>`, `<main>`, `<nav>`, `<header>`), visible focus rings, aria-labels on controls.

---

## Navigation Hub

- [Index Hub Page](index.html)
- [S01: Edit Plan - Unified Form](s01-edit-plan-unified.html)
- [S02: Edit Plan - Validation & Warnings](s02-edit-plan-errors.html)
- [S03: Membership Settings](s03-membership-settings.html)
- [S04: Pricing & Restricted CTA](s04-pricing-restricted-cta.html)
- [S05: Student Dashboard](s05-membership-dashboard.html)
- [S06: Woo Checkout Success](s06-woo-checkout-success.html)
