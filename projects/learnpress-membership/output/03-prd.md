# 03 - PRD

## Objectives

| ID | Objective | Success Signal |
| --- | --- | --- |
| OBJ-01 | Cho phép admin bán membership plan thông qua WooCommerce checkout. | User có thể mua plan bằng Woo checkout và membership được kích hoạt đúng. |
| OBJ-02 | Giữ LearnPress là nơi quản lý membership status và student experience. | Student thấy membership trong LearnPress profile tab và Woo account page. |
| OBJ-03 | Hỗ trợ subscription billing bằng Woo Subscriptions. | Subscription lifecycle không tạo duplicate member hoặc access mismatch. |
| OBJ-04 | Không phá flow hiện tại của LP checkout, plan-course mapping, member activation, expiry cron, reminder email, profile tab và pricing block. | Regression tests pass. |
| OBJ-05 | Chuẩn bị foundation cho Restrict Content phase sau. | UX/PRD có scope rõ cho table rule builder trong plan edit tab. |

## User Stories

```text
As an Admin
I want to connect membership plans with WooCommerce checkout
So that I can sell membership plans using Woo gateways, coupons, tax, invoices and subscriptions.
```

```text
As a Guest
I want to be required to login or register before buying a membership
So that my purchased membership can be attached to a user account.
```

```text
As a Student/Customer
I want to buy a membership through WooCommerce and land on the membership dashboard
So that I can confirm my access and continue learning.
```

```text
As a Manager/Support user
I want to view membership and order context
So that I can support customers without changing configuration.
```

```text
As an Admin in the Restrict Content phase
I want to create restriction rules from the plan edit tab using a table rule builder
So that I can protect content by plan without learning a separate rule system.
```

## Functional Requirements

### Phase 1 - WooCommerce Membership Checkout

| ID | Requirement | Priority | User Role | Notes |
| --- | --- | --- | --- | --- |
| FR-001 | Admin can enable membership purchase through WooCommerce for a membership plan. | Must | Admin | Exact settings UI follows existing plugin patterns. |
| FR-002 | System supports purchasing membership as a LearnPress item through LearnPress payment flow. | Must | Student/Customer | Existing mode must remain available. |
| FR-003 | System supports purchasing membership as a WooCommerce product through Woo checkout. | Must | Student/Customer | Uses Woo payment methods. |
| FR-004 | Woo checkout flow requires login/register before membership activation. | Must | Guest | Guest checkout cannot activate anonymous membership. |
| FR-005 | A paid Woo order creates or links the required LearnPress order record for membership tracking. | Must | System | Backend decides implementation details. |
| FR-006 | Membership activation is determined from Woo order/subscription status where Woo checkout is used. | Must | System | Full mapping to be defined by backend. |
| FR-007 | Woo Subscriptions status coverage includes active, on-hold, cancelled, expired, pending-cancel, payment failed, renewal, switch and resubscribe. | Must | System | Required because subscription billing depends on it. |
| FR-008 | Active duplicate membership purchase is blocked unless product defines a renewal/upgrade flow. | Should | Student/Customer | Prevent accidental duplicate active memberships. |
| FR-009 | Pricing block and shortcode can show Woo purchase CTA when Woo mode is active. | Must | Guest/Student | User requested pricing block and shortcode. |
| FR-010 | Course page, restricted message, profile renew button and email can link to the correct membership purchase path. | Should | Guest/Student | Exact email coverage can follow existing email hooks. |
| FR-011 | After purchase, customer can land on membership dashboard. | Must | Student/Customer | Success state from questions.md. |
| FR-012 | Student can view membership in LearnPress profile tab and Woo account page. | Must | Student/Customer | Profile tab keeps current display logic. |
| FR-013 | Existing LP checkout and membership lifecycle continue to work. | Must | Admin/System | Regression-critical. |

### Phase 2 - Restrict Content

| ID | Requirement | Priority | User Role | Notes |
| --- | --- | --- | --- | --- |
| FR-101 | Admin can configure Restrict Content from the plan edit tab. | Must | Admin | No separate instructor setup. |
| FR-102 | Restriction UI uses a table rule builder. | Must | Admin | No wizard in first restriction release. |
| FR-103 | Admin can restrict post/page, course, lesson, quiz, question and custom post type. | Must | Admin | First targeting level: whole post type. |
| FR-104 | If multiple plans can access content, user is allowed when they have at least one required plan. | Must | System | OR logic. |
| FR-105 | Restriction mode for first release is hide content only. | Must | Guest/Student | No hide from query/listing or redirect in first scope. |
| FR-106 | Restricted message supports guest, logged-in non-member, expired member, cancelled/refunded member, wrong plan and pending payment states. | Must | Guest/Student | Message is customizable. |
| FR-107 | Restricted message CTA points to pricing page. | Must | Guest/Student | User answer. |
| FR-108 | Gutenberg/shortcode-specific conditional content is not included. | Out | Admin | All restriction configured and checked through plan. |

## Non-Functional Requirements

| Area | Requirement |
| --- | --- |
| Compatibility | Minimum support targets: WordPress 6.0, PHP 7.2, LearnPress 4.0.0, WooCommerce 6.0.0, LearnPress Woo Payment 4.0.0, Woo Subscriptions version to be confirmed. |
| Reliability | Woo order/subscription events must be idempotent and must not create duplicate memberships. |
| Security | Admin settings require proper capability checks and nonce validation; users must not bypass access through direct URLs or order spoofing. |
| Accessibility | Admin UI and frontend messages should use labels, visible focus states and readable contrast. |
| Maintainability | Backend may choose function/class names; product docs should define behavior, not implementation names. |
| Performance | QA must baseline checkout activation and restriction checks; exact numeric target is not set by product input. |
| Localization | Marketplace/product copy targets English global market; internal spec remains Vietnamese. |

## Permission Matrix

| Capability | Admin | Manager | Instructor | Student | Customer | Guest |
| --- | --- | --- | --- | --- | --- | --- |
| Configure Woo checkout for membership | Yes | No | No | No | No | No |
| Configure membership plan | Yes | No | No | No | No | No |
| Create/edit restriction rules | Yes | No | No | No | No | No |
| View membership/order support context | Yes | View/support | No | Own only | Own only | No |
| Buy membership | No | No | No | Yes | Yes | Login/register required |
| View membership status | No | No | No | Own only | Own only | No |
| Access restricted content | Based on membership | Based on membership | Based on membership | Based on membership | Based on membership | No |

## Acceptance Criteria

### Woo Checkout

| ID | Criteria |
| --- | --- |
| AC-WOO-01 | Given Woo mode is enabled for a plan, when a logged-in customer purchases the mapped membership through Woo checkout, then the membership becomes active according to Woo order/subscription status. |
| AC-WOO-02 | Given a guest tries to purchase membership, when checkout starts, then the user must login or register before membership can be activated. |
| AC-WOO-03 | Given Woo order is paid, when membership activation runs, then required LearnPress order/member records are created or linked once only. |
| AC-WOO-04 | Given the same event is received again, when lifecycle handling runs, then no duplicate active membership is created. |
| AC-WOO-05 | Given a membership is already active, when customer tries to buy duplicate membership, then purchase is blocked or routed to a defined renewal flow. |
| AC-WOO-06 | Given Woo Subscriptions status changes, when status is active/on-hold/cancelled/expired/pending-cancel/payment failed/renewal/switch/resubscribe, then membership status follows the backend-defined mapping. |
| AC-WOO-07 | Given purchase succeeds, when customer reaches success state, then user is directed to membership dashboard. |
| AC-WOO-08 | Given existing LP checkout flow, when a membership is purchased without Woo mode, then existing activation, expiry and profile behavior still works. |

### Restrict Content

| ID | Criteria |
| --- | --- |
| AC-RES-01 | Given admin edits a plan, when they open Restrict Content tab, then they can add/edit/delete rows in a table rule builder. |
| AC-RES-02 | Given a post type is restricted to one or more plans, when a user has at least one required active plan, then content is visible. |
| AC-RES-03 | Given a guest or wrong-plan user opens restricted content, then the content body is hidden and custom message is shown. |
| AC-RES-04 | Given restricted message is shown, then CTA points to pricing page. |
| AC-RES-05 | Given user is expired, cancelled/refunded or pending payment, then message context matches that state. |
| AC-RES-06 | Given admin preview or admin user, then admin can still manage content without being blocked by frontend restriction. |

## Dependencies

| Dependency | Required For | Status |
| --- | --- | --- |
| LearnPress core | Membership plan/member/order lifecycle | Required |
| WooCommerce | Woo cart/checkout/order/payment | Required for Woo checkout phase |
| LearnPress Woo Payment | Integration bridge | Required |
| Woo Subscriptions | Subscription billing | Expected required dependency for subscription plans |
| Existing membership add-on v4.0.0 | Plan/member foundation | Required |

## Feature Comparison

| Capability | Existing add-on | Phase 1 | Phase 2 |
| --- | --- | --- | --- |
| Membership plan/member model | Yes | Keep | Keep |
| LP checkout membership purchase | Yes | Keep | Keep |
| Woo checkout membership purchase | No | Yes | Yes |
| Woo Subscriptions lifecycle | Limited/unclear | Yes | Yes |
| Course-plan access | Yes | Keep | Keep |
| Restrict post/page/course content | No dedicated engine | No | Yes |
| Admin table rule builder | No | No | Yes |
| Developer API/docs | No/limited | Out | Out until needed |

## Success Metrics

| Metric | Target Direction |
| --- | --- |
| License revenue | Increase after marketplace release. |
| Woo checkout membership purchases | Increase over time. |
| Access mismatch tickets | Keep low. |
| Duplicate purchase incidents | Zero known production incidents. |
| LP checkout regression | Zero critical regressions. |
| Subscription lifecycle defects | Reduce before stable release. |

## Assumptions And Open Questions

| Item | Status |
| --- | --- |
| Exact Woo status to member lifecycle mapping | Backend decision required. |
| Refund/cancel access behavior | User uncertain: suggested keeping access to end of period. Product must confirm. |
| Woo Subscriptions minimum version | Not specified. |
| Restrict Content object/taxonomy targeting beyond whole post type | Not in initial scope. |

## Next Actions

| Owner | Action |
| --- | --- |
| Product | Confirm phase 1 acceptance criteria and refund/cancel behavior. |
| Engineering | Produce technical design for Woo order, LP order and subscription lifecycle. |
| QA | Convert acceptance criteria into test cases before implementation starts. |
| Design | Use plan edit tab and table rule builder as UX foundation. |
| Docs | Prepare English admin setup guide for Woo checkout. |
