# Wireframe Specification — LearnPress Membership v4.1

## Skills Used

- `ux/wireframe-specification.md`
- `ux/user-flow.md`
- `product/product-brief.md`

---

## Screen 1: Admin — Edit Plan > Protected Content Tab

### Purpose
Admin tạo/sửa restriction rules cho một membership plan.

### Components
```text
+------------------------------------------------------------------+
| Edit Plan: Gold Membership                                        |
+------------------------------------------------------------------+
| [General] [Courses] [Protected Content] [Pricing] [Settings]     |
+------------------------------------------------------------------+
|                                                                    |
|  Protected Content Rules                                           |
|  ───────────────────────────────────────────────────────────────   |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  | Rule #1                                              [Delete] | |
|  |                                                               | |
|  | Content Type: [Dropdown: Post ▼]                              | |
|  | Select:       [Search/Select specific posts...      ]         | |
|  |               OR                                              | |
|  |               [✓] All posts                                   | |
|  |                                                               | |
|  | Restriction Mode: (●) Hide content only                       | |
|  |                   ( ) Hide completely from listing             | |
|  |                   ( ) Redirect to page                        | |
|  |                                                               | |
|  | Custom Message: [________________________________]             | |
|  |                 Leave blank to use default message             | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  | Rule #2                                              [Delete] | |
|  |                                                               | |
|  | Content Type: [Dropdown: Course Category ▼]                   | |
|  | Select:       [✓ Premium] [✓ VIP] [  Advanced]                | |
|  |                                                               | |
|  | Restriction Mode: ( ) Hide content only                       | |
|  |                   (●) Hide completely from listing             | |
|  |                   ( ) Redirect to page                        | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  [+ Add New Rule]                                                  |
|                                                                    |
|  ───────────────────────────────────────────────────────────────   |
|  [Save Plan]                                         [Cancel]      |
+------------------------------------------------------------------+
```

### User Actions
- Chọn tab "Protected Content"
- Add rule: chọn content type, select objects/taxonomy terms, chọn mode
- Delete rule
- Save Plan

### Content Type Dropdown Options
- Post
- Page
- Course (lp_course)
- Lesson (lp_lesson)
- Quiz (lp_quiz)
- Course Category
- Post Category
- Post Tag
- Custom Post Type (nếu registered)

### Empty State
```text
+--------------------------------------------------------------+
|                                                                |
|  No protection rules yet.                                      |
|                                                                |
|  Add rules to restrict content for this plan's members.        |
|                                                                |
|  [+ Add First Rule]                                            |
|                                                                |
+--------------------------------------------------------------+
```

---

## Screen 2: Admin — Membership Settings > Restriction

### Purpose
Cấu hình global restriction settings.

### Components
```text
+------------------------------------------------------------------+
| LearnPress > Membership > Settings                                |
+------------------------------------------------------------------+
| [General] [Plans] [Checkout] [Restriction] [Emails]              |
+------------------------------------------------------------------+
|                                                                    |
|  Content Restriction Settings                                      |
|  ───────────────────────────────────────────────────────────────   |
|                                                                    |
|  Default Restriction Mode:                                         |
|  (●) Hide content only                                            |
|  ( ) Hide completely from listing                                  |
|  ( ) Redirect to page                                             |
|                                                                    |
|  Default Redirect Page: [Select a page...         ▼]              |
|  (Only used when mode is "Redirect")                               |
|                                                                    |
|  Pricing Page URL: [https://example.com/membership-pricing  ]      |
|  (Used in CTA buttons on restricted content)                       |
|                                                                    |
|  Default Restricted Message:                                       |
|  +--------------------------------------------------------------+ |
|  | This content is restricted to members only.                   | |
|  | Please purchase a membership plan to access.                  | |
|  |                                                               | |
|  | [View Membership Plans]                                       | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  Show Login Link for Guests: [✓]                                  |
|                                                                    |
|  ───────────────────────────────────────────────────────────────   |
|  [Save Settings]                                                   |
+------------------------------------------------------------------+
```

### User Actions
- Set default restriction mode
- Set redirect page
- Set pricing page URL
- Edit default restricted message
- Toggle login link for guests

---

## Screen 3: Frontend — Restricted Content (Hide Content Only)

### Purpose
Non-member hoặc wrong-plan user thấy restricted message thay vì nội dung.

### Components
```text
+------------------------------------------------------------------+
|                        Site Header                                 |
+------------------------------------------------------------------+
|                                                                    |
|  Course: Advanced WordPress Development                            |
|  ═══════════════════════════════════════                           |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  🔒 Restricted Content                                        | |
|  |                                                               | |
|  |  This content is restricted to members of Gold Plan           | |
|  |  or Platinum Plan.                                            | |
|  |                                                               | |
|  |  [View Membership Plans →]        [Login →]                   | |
|  +--------------------------------------------------------------+ |
|                                                                    |
+------------------------------------------------------------------+
|                        Site Footer                                 |
+------------------------------------------------------------------+
```

### Permission Differences
- **Admin:** Thấy content bình thường (bypass restriction)
- **Member (correct plan):** Thấy content bình thường
- **Member (wrong plan):** Thấy restricted message + CTA
- **Logged-in (no plan):** Thấy restricted message + CTA
- **Guest:** Thấy restricted message + CTA + login link

---

## Screen 4: Frontend — Member-Only Block/Shortcode

### Purpose
Inline content chỉ member thấy được.

### Components — Member View
```text
+------------------------------------------------------------------+
|                                                                    |
|  Regular page content visible to everyone...                       |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  🎁 Exclusive Member Content                                  | |
|  |                                                               | |
|  |  Here is the premium download link: [Download PDF]            | |
|  |  And bonus video: [Watch Now]                                 | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  More regular content...                                           |
|                                                                    |
+------------------------------------------------------------------+
```

### Components — Non-Member View
```text
+------------------------------------------------------------------+
|                                                                    |
|  Regular page content visible to everyone...                       |
|                                                                    |
|  +--------------------------------------------------------------+ |
|  |  🔒 This content is available for members only.               | |
|  |  [View Membership Plans →]                                    | |
|  +--------------------------------------------------------------+ |
|                                                                    |
|  More regular content...                                           |
|                                                                    |
+------------------------------------------------------------------+
```

---

## Screen 5: Frontend — Pricing Block with Woo CTA

### Purpose
Pricing block hiển thị CTA phù hợp với checkout mode active.

### Components — Woo Mode Active
```text
+------------------------------------------------------------------+
|                    Membership Plans                                |
+------------------------------------------------------------------+
|                                                                    |
|  +------------------+  +------------------+  +------------------+ |
|  | Silver Plan      |  | ★ Gold Plan      |  | Platinum Plan    | |
|  |                  |  |   POPULAR         |  |                  | |
|  | $9.99/month      |  | $19.99/month     |  | $49.99/month     | |
|  |                  |  |                  |  |                  | |
|  | ✓ 5 Courses      |  | ✓ 20 Courses     |  | ✓ All Courses    | |
|  | ✓ Basic Content   |  | ✓ Premium Content |  | ✓ All Content    | |
|  | ✗ Downloads      |  | ✓ Downloads      |  | ✓ Downloads      | |
|  | ✗ Certificates   |  | ✓ Certificates   |  | ✓ Certificates   | |
|  |                  |  |                  |  |                  | |
|  | [Add to Cart 🛒] |  | [Add to Cart 🛒] |  | [Add to Cart 🛒] | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                    |
+------------------------------------------------------------------+
```

### Components — LP Checkout Mode Active
```text
|  | [Buy Now]        |  | [Buy Now]        |  | [Buy Now]        | |
```

### Error State — Already Active
```text
|  | ✅ Active         |  | [Add to Cart 🛒] |  | [Add to Cart 🛒] | |
|  | (Current Plan)   |  |                  |  |                  | |
```
