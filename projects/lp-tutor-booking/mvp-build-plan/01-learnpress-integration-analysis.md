# LearnPress Integration Analysis

## Summary

LearnPress 4.4.x has enough extension points to build Tutor Booking as a separate add-on:

- Add-on bootstrap through `LP_Addon`.
- Add-on settings through LearnPress Addons settings filters.
- Custom purchasable item type through cart/order hooks.
- Booking confirmation through payment/order lifecycle hooks.
- Student and instructor dashboards through profile tabs.
- REST controllers through LearnPress core API filters.
- Emails through `learnpress/emails/register`.
- Privacy export/erase through WordPress privacy filters, following LearnPress patterns.

Do not modify LearnPress core.

## Add-On Bootstrap

Reference files:

- `references/learnpress/core/learnpress.php`
- `references/learnpress/core/inc/abstracts/abstract-addon.php`

Implementation target:

- `learnpress-tutor-booking/learnpress-tutor-booking.php`
- `learnpress-tutor-booking/inc/class-lp-addon-tutor-booking.php`

Required behavior:

- [ ] Main plugin file checks LearnPress is active before loading add-on classes.
- [ ] Add-on class extends `LP_Addon`.
- [ ] Use a stable slug such as `tutor-booking`.
- [ ] Set `require_version` to the LearnPress version supported by the add-on.
- [ ] Load add-on on `learn-press/ready`.
- [ ] Do not include add-on runtime files before LearnPress is ready.

## Settings Integration

Reference file:

- `references/learnpress/core/inc/admin/settings/class-lp-settings-addons.php`

Hooks:

- `learn-press/settings/addons/sections`
- `learn-press/settings/addons/fields-tutor-booking`

Settings to implement:

- Booking hold duration.
- Cancellation deadline.
- Reschedule deadline.
- Default timezone.
- Email enable/disable flags.
- Google Calendar OAuth/app credentials.
- Google Calendar sync enable/disable flag.

Checklist:

- [ ] Add `tutor-booking` settings section.
- [ ] Register fields with defaults.
- [ ] Sanitize all saved values.
- [ ] Hide sensitive credentials from ordinary users.

## Cart And Checkout

Reference files:

- `references/learnpress/core/inc/course/lp-course-functions.php`
- `references/learnpress/core/inc/cart/class-lp-cart.php`
- `references/learnpress/core/inc/class-lp-checkout.php`
- `references/learnpress/core/inc/order/class-lp-order.php`

Relevant hooks:

- `learn-press/purchase/item-types/can-purchase`
- `learnpress/cart/add-item/item_type_{post_type}`
- `learnpress/cart/calculate_sub_total/item_type_{post_type}`
- `learnpress/order/add-item/item_type_{post_type}`
- `learn-press/checkout/add-order-item-meta`
- `learn-press/checkout/update-order-meta`
- `learn-press/checkout-order-processed`

MVP strategy:

- Use CPT `lp_tb_session_type` as the purchasable LearnPress item.
- Use a custom booking table for each actual booked slot.
- Create a temporary hold before redirecting to LearnPress Checkout.
- Store booking intent metadata on the LearnPress order item.
- Confirm the booking only after successful payment/order completion.

Checklist:

- [ ] Register custom item type as purchasable.
- [ ] Add selected session type to LearnPress cart.
- [ ] Calculate subtotal from the session type price.
- [ ] Store booking hold ID, session type ID, instructor ID, student ID, start/end UTC, and timezone in order item meta.
- [ ] Release or expire holds when checkout is abandoned or payment fails.

## Payment And Order Lifecycle

Reference files:

- `references/learnpress/core/inc/order/class-lp-order.php`
- `references/learnpress/core/inc/order/lp-order-functions.php`

Relevant hooks:

- `learn-press/payment-pre-complete`
- `learn-press/payment-complete`
- `learn-press/payment-complete-order-status-{status}`
- `learn-press/order/status-changed`
- `learn-press/order/status-{new_status}`
- `learn-press/order/status-{old_status}-to-{new_status}`

Requirements:

- [ ] Booking confirmation is idempotent.
- [ ] Booking row stores `order_id` and `order_item_id`.
- [ ] Unique slot constraint prevents duplicate confirmed bookings.
- [ ] Failed/refunded/cancelled payment does not leave a confirmed booking unless policy explicitly allows it.
- [ ] Expired holds can be cleaned by WP-Cron and by manual admin action.

## Profile Tabs

Reference files:

- `references/learnpress/core/inc/user/class-lp-profile.php`
- `references/learnpress/core/inc/user/class-lp-profile-tabs.php`
- `references/learnpress/core/templates/profile/`

Hooks:

- `learn-press/get-profile-tabs`
- `learn-press/profile-content`
- `learn-press/profile-section-content`

Tabs/sections:

- Student: upcoming bookings, past bookings, cancel/reschedule actions.
- Instructor: booking calendar, availability, sessions, students, reviews.

Checklist:

- [ ] Student booking tab is visible only to the owner or admin.
- [ ] Instructor booking tab is visible only to instructor/admin users.
- [ ] Meeting links are visible only to authorized users and only for confirmed bookings.
- [ ] Cancel/reschedule buttons follow policy deadlines.

## REST API

Reference files:

- `references/learnpress/core/inc/rest-api/class-lp-core-api.php`
- `references/learnpress/core/inc/abstracts/abstract-rest-controller.php`

Filters:

- `learn-press/core-api/includes`
- `learn-press/core-api/controllers`

Namespace:

- `lp/v1/tutor-booking`

Checklist:

- [ ] Register controllers through LearnPress core API filters.
- [ ] Use permission callbacks for every mutation endpoint.
- [ ] Validate nonce/current user/capability.
- [ ] Return structured validation errors.

## Emails

Reference files:

- `references/learnpress/core/inc/class-lp-emails.php`
- `references/learnpress/core/inc/emails/class-lp-email.php`
- `references/learnpress/core/templates/emails/`

Hook:

- `learnpress/emails/register`

Email classes:

- Booking confirmed to student.
- Booking confirmed to instructor.
- Booking cancelled.
- Booking rescheduled.
- Booking reminder.

Checklist:

- [ ] Register email classes through `learnpress/emails/register`.
- [ ] Keep templates in the add-on, not LearnPress core.
- [ ] Include variables for date, time, timezone, instructor, student, meeting link, and booking status.

## Privacy

Reference files:

- `references/learnpress/core/inc/WPGDPR/ExportPersonalData.php`
- `references/learnpress/core/inc/WPGDPR/ErasePersonalData.php`

WordPress filters:

- `wp_privacy_personal_data_exporters`
- `wp_privacy_personal_data_erasers`

Checklist:

- [ ] Export student booking data.
- [ ] Export instructor booking data.
- [ ] Erase or anonymize PII according to retention policy.
- [ ] Do not delete accounting/order records if they must be retained.

## Integration Risks

| Risk | Mitigation |
|---|---|
| LearnPress cart expects post-based items | Use CPT `lp_tb_session_type` as purchasable item |
| Payment hooks can run more than once | Idempotency key and unique DB constraints |
| WP-Cron is not guaranteed | Add manual admin cleanup action |
| Profile tab permissions can leak data | Central permission service and direct URL tests |
| Timezone/DST errors | Store UTC plus IANA timezone ID |
| Google OAuth complexity | Isolate provider behind `Calendar_Provider_Interface` |
