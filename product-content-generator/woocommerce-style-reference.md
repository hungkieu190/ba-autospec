# WooCommerce Product Page Style Reference

## Purpose

Use this local reference instead of re-fetching WooCommerce product pages every time. It captures the structure, tone, and content patterns observed from WooCommerce product pages, especially WooCommerce Subscriptions.

Do not copy WooCommerce text verbatim. Use this as a style and structure guide only.

## Page Structure Pattern

### 1. Marketplace Context

- Breadcrumbs: Marketplace / WooCommerce extensions / Category / Product.
- Product icon.
- Product name.
- Vendor/byline.
- One-sentence promise.
- Hero/banner image.

### 2. Purchase Panel

- Billing/license option.
- Price.
- Discounted multi-year option if available.
- Primary CTA: Buy now / Add to cart.
- Secondary CTA: View demo.
- Reviews/rating only when verified.
- Latest version only when verified.
- Active installs only when verified.
- Product comparison link/module when relevant.

### 3. Subscription Includes / Trust Block

Common trust elements:

- Product updates and improvements.
- Customer support.
- Money-back guarantee.
- Documentation link.
- Feature requests link.
- Get support link.

Only include items that are true or mark as `Cần validate`.

### 4. Compatibility And Quality Modules

WooCommerce pages often include:

- Extension information: PHP, WordPress, WooCommerce requirements.
- Quality checks.
- Compatibility with standard WooCommerce flows/extensions.
- Cart and Checkout Blocks compatibility.
- HPOS compatibility.
- Countries/availability.

Never claim compatibility without evidence.

### 5. Top Feature Bullets

Place high-value feature bullets near the top. Each bullet should be practical and linkable in spirit:

- Multiple schedules/options.
- Payment gateway/integration support.
- Manual and automatic flows.
- Failed payment/retry/recovery.
- Customer self-management.
- Notifications/emails.
- Reporting.
- New or recently added capabilities.

For non-subscription products, adapt these to the product's actual capabilities.

### 6. Benefit-Led Narrative Section

WooCommerce product copy uses a plain commercial narrative:

- Start with a business question or pain.
- Explain the outcome the product enables.
- Tie recurring operations to revenue, predictability, automation, or lower admin effort.
- Use concrete examples.

Example structure:

```text
Can your store/course/site do [desired business outcome] without manual work?
With [Product], you can [core capability] so [business result].
```

### 7. Feature Sections

Feature sections are short and concrete:

- Heading: feature name.
- Visual/screenshot suggestion.
- 1 short paragraph explaining what it does.
- Optional link/reference to docs.

Good heading examples by pattern:

- Free trials and sign-up fees.
- Subscription management.
- Synchronized payments.
- Flexible product options.
- Subscription coupons.
- Variable subscriptions.
- Subscriber account management.
- Upgrades/downgrades.
- Multiple subscriptions.
- Customer emails.

For other products, use equivalent concrete feature headings.

### 8. Outcome CTA Section

WooCommerce often repeats a benefit-led CTA section after features:

- Restate the business outcome.
- Mention tracking/management/control.
- Make the value feel operational and measurable.

### 9. Getting Started

Use a simple numbered list:

1. Download, install, and activate.
2. Configure the first product/plan/rule/workflow.
3. Use documentation to customize settings.
4. Start selling/managing/automating.

Adapt steps to the product.

### 10. FAQ

FAQ answers should be direct and support-oriented:

- Can I do X?
- What is the difference between A and B?
- Do I need another extension?
- Does this use external service functionality or site-managed functionality?
- Can customers manage their own settings/access/subscription?
- Is this compatible with [platform feature]?

### 11. Reviews And Related Products

If data exists:

- Customer review summary.
- Review categories.
- Related products.
- Related add-ons.

If no data exists, do not fabricate it.

## Tone And Copy Style

- Practical, clear, marketplace-oriented.
- Merchant/site-owner focused.
- Confident but not hype-heavy.
- Short paragraphs.
- Specific feature names.
- Concrete business outcomes.
- Technical terms are acceptable when buyers expect them.
- Avoid exaggerated SaaS language.

## CTA Style

Use simple CTA labels:

- Buy now.
- Add to cart.
- View demo.
- Read documentation.
- Compare options.
- Get support.

## Evidence Rules

- Ratings require source data.
- Active installs require source data.
- Latest version requires source data.
- Compatibility claims require source data.
- Pricing and discounts require source data.
- Guarantee/support claims require source data.
- If missing, use `Cần validate` or omit from final buyer-facing copy.

## Required Product Content Output Style

When generating product content, prefer this order:

1. Product header and one-line promise.
2. Pricing/CTA/trust block.
3. Compatibility/support summary.
4. Top feature bullets.
5. Benefit-led narrative section.
6. Feature sections.
7. Getting started.
8. FAQ.
9. Related/comparison content.
