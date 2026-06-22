# User Flow — LearnPress Membership v4.1

## Skills Used

- `ux/user-flow.md`
- `product/product-brief.md`
- `product/prd.md`

---

## Admin Flow: Tạo Restriction Rule

```mermaid
flowchart TD
    A[Admin mở Dashboard] --> B[LearnPress > Membership > Plans]
    B --> C[Edit Plan hoặc Create New Plan]
    C --> D[Tab: Protected Content]
    D --> E{Chọn content type}
    E -->|Post/Page| F[Chọn specific posts/pages hoặc all]
    E -->|Course/Lesson/Quiz| G[Chọn LP objects hoặc all]
    E -->|Taxonomy| H[Chọn taxonomy term - category/tag]
    F --> I[Chọn restriction mode]
    G --> I
    H --> I
    I -->|Hide content only| J[User thấy title, restricted message thay nội dung]
    I -->|Hide completely| K[Content ẩn khỏi listing/query/search]
    I -->|Redirect| L[Chọn redirect page]
    J --> M[Save Rule]
    K --> M
    L --> M
    M --> N[Rule active, frontend enforced]
```

---

## Admin Flow: Cấu Hình Woo Checkout

```mermaid
flowchart TD
    A[Admin có WooCommerce + learnpress-woo-payment active] --> B[WooCommerce > Products > Add New]
    B --> C[Tạo WC Product cho Membership Plan]
    C --> D[Map WC Product với courses thuộc plan]
    D --> E[Set giá, billing cycle, trial nếu có Woo Subscriptions]
    E --> F[Publish Product]
    F --> G[LearnPress > Membership > Settings]
    G --> H{Enable WooCommerce Checkout?}
    H -->|Yes| I[Pricing block auto hiển thị Woo CTA]
    H -->|No| J[Pricing block giữ LP checkout CTA]
    I --> K[Frontend sẵn sàng bán qua Woo]
```

---

## Student Flow: Mua Membership via LP Checkout

```mermaid
flowchart TD
    A[Student truy cập course page] --> B{Course restricted?}
    B -->|No| C[Xem course bình thường]
    B -->|Yes| D[Thấy restricted message + CTA pricing link]
    D --> E[Click CTA → Pricing page]
    E --> F[Chọn Membership Plan]
    F --> G{LP Checkout mode active?}
    G -->|Yes| H[Add to LP Cart]
    H --> I[LP Checkout + Payment]
    I --> J{Payment thành công?}
    J -->|Yes| K[LP Order completed]
    K --> L[MembershipCheckout::activate_membership]
    L --> M[Member active, courses enrolled]
    M --> N[Student truy cập được restricted content]
    J -->|No| O[Payment failed → retry]
```

---

## Student Flow: Mua Membership via WooCommerce Checkout

```mermaid
flowchart TD
    A[Student truy cập pricing page] --> B[Thấy Woo CTA - Add to Cart]
    B --> C{Đã có active membership cho plan này?}
    C -->|Yes| D[Block - hiển thị Already Active message]
    C -->|No| E[Add to Woo Cart]
    E --> F[Woo Checkout - gateways, coupon, tax]
    F --> G{Woo Payment thành công?}
    G -->|Yes| H[Woo Order processing/completed]
    H --> I[LPWooOrderHandler tạo LP Order]
    I --> J[LP Order có item_type lp_membership + _plan_id]
    J --> K[MembershipCheckout::on_order_completed]
    K --> L[Member active, courses enrolled]
    L --> M[Student truy cập được restricted content]
    G -->|No| N[Payment failed → Woo retry]
```

---

## Guest Flow: Truy Cập Restricted Content

```mermaid
flowchart TD
    A[Guest truy cập page/post/course] --> B{Content restricted?}
    B -->|No| C[Xem bình thường]
    B -->|Yes| D{Restriction mode?}
    D -->|Hide content only| E[Thấy title + restricted message + CTA]
    D -->|Hide completely| F[Content không xuất hiện trong listing/search]
    D -->|Redirect| G[Redirect đến page được chọn]
    E --> H[CTA: Link đến pricing page]
    H --> I[Guest click → Pricing page]
    I --> J{Login required?}
    J -->|Yes| K[Login/Register → rồi mua membership]
    J -->|No - Woo guest checkout| L[Tạo account rồi mua]
```

---

## Woo Subscriptions Lifecycle Flow (Phase 4)

```mermaid
flowchart TD
    A[Student mua Membership via Woo Subscription] --> B[Woo Subscription Active]
    B --> C[Member Active]
    C --> D{Subscription event?}
    D -->|Renewal payment success| E[Extend membership, member vẫn active]
    D -->|Payment failed| F[Member suspended, access revoked]
    D -->|Cancel| G[Member cancelled khi subscription end]
    D -->|On-hold/Suspend| H[Member suspended, access revoked]
    D -->|Resubscribe| I[Member re-activated]
    D -->|Expired| J[Member expired, access revoked]
    F --> K{Retry payment?}
    K -->|Success| L[Member re-activated]
    K -->|Failed again| M[Subscription cancelled → member cancelled]
```

---

## Abandonment Points

| Flow | Abandonment Point | Mitigation |
| --- | --- | --- |
| LP Checkout | Payment page — gateway complexity | Clear payment instructions, multiple gateway options |
| Woo Checkout | Woo checkout form — too many fields | Recommend simple checkout layout |
| Pricing page | Không biết plan nào phù hợp | Clear plan comparison, highlight popular plan |
| Restricted content | Frustrated bị block → leave | Friendly message, clear CTA, show partial content preview |
| Guest → Login | Registration form friction | Social login option, simple form |
