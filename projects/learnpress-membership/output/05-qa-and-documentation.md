# 05 - QA And Documentation

## QA Strategy

QA must protect two things: new WooCommerce membership checkout behavior and existing LearnPress membership behavior. The highest-risk areas are subscription lifecycle, guest checkout, duplicate purchase, refund/cancel behavior and regression in LP checkout.

## Definition Of Ready For QA

| Item | Ready Criteria |
| --- | --- |
| Requirements | Functional requirements and acceptance criteria in `03-prd.md` are approved. |
| Lifecycle mapping | Backend/product provides status matrix for Woo order and Woo Subscriptions. |
| Test data | At least one membership plan, one Woo product mapping, one subscription plan, one active student, one guest, one expired/cancelled member. |
| Dependencies | WordPress 6.0+, PHP 7.2+, LearnPress 4.0.0+, WooCommerce 6.0.0+, LearnPress Woo Payment 4.0.0+, Woo Subscriptions version confirmed. |
| Wireframes | `04-ux-and-wireframe.md` and `output/wireframes/wireframes.html` available. |

## Test Case Matrix

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- | --- | --- |
| QA-001 | Woo checkout | Logged-in customer buys membership via Woo checkout | Woo mode enabled, product mapped | Buy membership through Woo checkout | LP membership becomes active and user lands on membership dashboard | High |
| QA-002 | Guest checkout | Guest starts membership checkout | Woo mode enabled | Click Buy as guest | User is forced to login/register before activation | High |
| QA-003 | LP checkout regression | Customer buys membership via existing LP checkout | LP checkout enabled | Complete LP checkout | Existing activation flow still works | High |
| QA-004 | Duplicate purchase | Active member buys same active plan again | Active membership exists | Try to buy same plan | Purchase is blocked or redirected to defined renewal flow | High |
| QA-005 | Woo order processing | Woo order moves to processing | Pending order exists | Change order status | Membership status follows approved mapping | High |
| QA-006 | Woo order completed | Woo order moves to completed | Processing order exists | Complete order | Membership remains active, no duplicate record | High |
| QA-007 | Woo order failed | Woo order moves to failed | Pending/processing order exists | Mark failed | Membership access follows approved mapping | High |
| QA-008 | Woo order refunded | Full refund | Active membership via Woo | Refund order | Access follows approved refund policy | High |
| QA-009 | Partial refund | Partial refund | Active membership via Woo | Apply partial refund | Membership behavior matches approved policy | Medium |
| QA-010 | Subscription active | Woo Subscription active | Subscription product mapping exists | Activate subscription | Membership active | High |
| QA-011 | Subscription on-hold | Subscription payment issue | Active subscription | Set on-hold | Membership follows approved mapping | High |
| QA-012 | Subscription cancelled | Customer/admin cancels | Active subscription | Cancel subscription | Membership follows approved mapping | High |
| QA-013 | Subscription expired | Subscription expires | Subscription exists | Expire subscription | Membership status/access updates | High |
| QA-014 | Renewal | Renewal order paid | Active subscription | Trigger renewal | Membership extends/continues once only | High |
| QA-015 | Resubscribe | Customer resubscribes | Expired/cancelled subscription | Resubscribe | Membership resumes correctly | Medium |
| QA-016 | Switch | Customer switches subscription | Switch enabled | Switch product/plan | Membership updates without duplicate access | Medium |
| QA-017 | CTA display | Pricing block and shortcode | Woo mode active | View pricing areas | Correct Buy CTA appears | Medium |
| QA-018 | Course page CTA | Course page needs membership | Woo mode active | View course page | Correct membership CTA appears | Medium |
| QA-019 | Profile renew | Member profile renew button | Expired or renewable member | Click renew | Goes to correct purchase path | Medium |
| QA-020 | Email CTA | Membership email contains purchase/renew link | Email enabled | Trigger email | Link resolves to correct purchase path | Medium |
| QA-021 | Restrict content admin | Admin creates rule row | Phase 2 build | Add rule in plan edit tab | Rule saves and displays in table | High |
| QA-022 | Restrict access allowed | User has required plan | Phase 2 build | Open restricted content | Full content visible | High |
| QA-023 | Restrict access denied | Guest/no plan | Phase 2 build | Open restricted content | Content body hidden and message shown | High |
| QA-024 | Wrong plan | User has non-required plan | Phase 2 build | Open restricted content | Wrong-plan message shown | Medium |
| QA-025 | Permission | Instructor tries to configure rules | Instructor account | Access plan edit/restrict UI | No config access | High |
| QA-026 | Security | XSS in restricted message | Admin enters HTML/script | Save and render message | Unsafe scripts are sanitized/escaped | High |
| QA-027 | Security | Order spoofing attempt | Non-owner user | Try to activate/view another order | Access denied | High |
| QA-028 | Performance | Checkout activation baseline | Test site ready | Complete purchase repeatedly | No obvious slow activation; baseline recorded | Medium |
| QA-029 | Compatibility | Popular Woo gateway | Gateway enabled | Complete payment | Membership activation works | Medium |
| QA-030 | Regression | Existing cron/reminder/profile | Existing member data | Run lifecycle checks | Existing behavior preserved | High |

## Permission Testing

| Role | Must Test |
| --- | --- |
| Admin | Can configure plan, Woo checkout and restriction rules. |
| Manager | Can view/support context only; cannot configure rules. |
| Instructor | Cannot configure membership/restriction rules. |
| Student/Customer | Can buy/view own membership only. |
| Guest | Cannot activate membership without account. |

## Regression Testing Focus

| Existing Area | Regression Risk |
| --- | --- |
| Plan-course mapping | New Woo/restriction settings must not break course access. |
| LP checkout | Must still activate membership. |
| Member activation | Must not duplicate or skip active member. |
| Expiry cron | Existing expiry behavior must remain. |
| Reminder email | Existing reminders must still trigger. |
| Profile tab | Existing display logic should remain. |
| Shortcode/pricing block | Existing output should not break when Woo mode disabled. |

## Documentation Outline

User-facing docs should be written in English. Developer docs are not required for this release.

| Page | Purpose | Audience | Notes |
| --- | --- | --- | --- |
| Installation | Install and activate the add-on | Admin/Buyer | Include required versions. |
| Requirements | Explain LearnPress, WooCommerce, LearnPress Woo Payment and Woo Subscriptions requirements | Admin | Keep dependency table clear. |
| Create A Membership Plan | Configure plan basics | Admin | Update existing docs. |
| Sell Memberships With WooCommerce Checkout | Configure Woo purchase path | Admin | Main phase 1 doc. |
| Set Up Woo Subscriptions For Memberships | Subscription billing setup | Admin | Include status expectations without backend internals. |
| Configure Pricing Blocks And CTAs | Show Buy Now links | Admin | Pricing block, shortcode, course page, email. |
| Manage Members | View membership status and orders | Admin/Manager | Support-oriented but not deep troubleshooting. |
| Student Membership Dashboard | Explain student/customer view | Student/Customer | LP profile tab and Woo account page. |
| Restrict Content By Plan | Phase 2 admin guide | Admin | Plan edit tab + table rule builder. |
| FAQ | Buying objections and setup questions | Prospects/Admin | Pricing, compatibility, subscriptions, guest checkout. |
| Changelog | Release history | All users | Mention Woo checkout first, Restrict Content when shipped. |

## FAQ Topics

| Question | Answer Direction |
| --- | --- |
| Can I sell LearnPress memberships through WooCommerce? | Yes, with WooCommerce checkout enabled for membership. |
| Is Woo Subscriptions required? | Required for subscription billing. One-time membership behavior depends on plan setup. |
| Can guests buy a membership? | They must login/register before activation. |
| Does this replace WooCommerce Memberships? | It is a LearnPress-native membership add-on, not a clone of WooCommerce Memberships. |
| Can instructors create restriction rules? | No, admin-only in current scope. |
| Is there a free version? | No, paid add-on only. |
| How long do updates/support last? | 1 year. |

## Assumptions And Open Questions

| Item | Status |
| --- | --- |
| Deep troubleshooting docs | User said not needed now; add later if support tickets appear. |
| Developer docs | Out of scope for current launch. |
| Refund/cancel behavior | Needs final product decision before docs. |
| Woo Subscriptions version | Needs confirmation. |

## Next Actions

| Owner | Action |
| --- | --- |
| QA | Convert matrix to test cases in the test management tool. |
| Product | Approve lifecycle mapping policy before QA starts. |
| Docs | Draft English setup docs in the order listed above. |
| Engineering | Provide dependency/version details and known limitations for docs. |
