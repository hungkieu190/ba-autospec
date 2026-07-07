# MVP Scope And Architecture

## MVP Scope

Confirmed MVP behavior:

1. Instructor creates a tutor profile.
2. Instructor creates paid session types with duration and price.
3. Instructor defines weekly availability plus custom blocked dates/holidays.
4. Student opens a tutor/session booking UI.
5. Student selects session type, date, slot, and timezone.
6. System creates a temporary hold and redirects to LearnPress Checkout.
7. Payment success confirms the booking.
8. Student and instructor receive emails.
9. Booking appears in Student Dashboard and Instructor Dashboard.
10. Student can cancel/reschedule within configured deadline.
11. Instructor can mark complete or no-show.
12. Student can review after completion.
13. Google Calendar syncs confirmed bookings and reads busy time for conflict detection.

## Out Of Scope For MVP

- Marketplace commission payout.
- Multi-instructor sessions.
- Recurring subscription tutoring packages.
- Native mobile app.
- Advanced analytics dashboard.
- Zoom/Google Meet API meeting creation beyond storing meeting links.
- Complex refund automation beyond LearnPress/payment gateway behavior.

## Plugin Structure

Expected folder:

```text
learnpress-tutor-booking/
  learnpress-tutor-booking.php
  inc/
    class-plugin.php
    class-activator.php
    class-deactivator.php
    addon/class-lp-addon-tutor-booking.php
    admin/
      class-settings.php
      class-profile-metabox.php
      class-session-type-metabox.php
    domain/
      class-booking.php
      class-session-type.php
      class-availability-rule.php
      class-review.php
    services/
      class-permission-service.php
      class-timezone-service.php
      class-availability-service.php
      class-booking-service.php
      class-checkout-service.php
      class-email-service.php
      class-google-calendar-service.php
      interface-calendar-provider.php
    integrations/
      class-learnpress-cart.php
      class-learnpress-checkout.php
      class-learnpress-profile.php
      class-learnpress-emails.php
    rest/
      class-rest-controller.php
      class-slots-controller.php
      class-bookings-controller.php
      class-availability-controller.php
    templates/
      profile/
      booking/
      emails/
  assets/
    src/
    dist/
  tests/
```

## Data Model

### CPT: `lp_tb_profile`

Purpose: instructor/tutor public profile.

Meta:

- `_lp_tb_user_id`
- `_lp_tb_display_name`
- `_lp_tb_bio`
- `_lp_tb_subjects`
- `_lp_tb_timezone`
- `_lp_tb_meeting_link`
- `_lp_tb_status`

### CPT: `lp_tb_session_type`

Purpose: purchasable LearnPress item.

Meta:

- `_lp_tb_profile_id`
- `_lp_tb_duration_minutes`
- `_lp_tb_price`
- `_lp_tb_currency`
- `_lp_tb_buffer_before_minutes`
- `_lp_tb_buffer_after_minutes`
- `_lp_tb_status`

### Table: `wp_lp_tutor_booking_availability`

Columns:

- `id` bigint unsigned primary key
- `profile_id` bigint unsigned
- `instructor_user_id` bigint unsigned
- `rule_type` varchar(20): `weekly`, `custom`, `holiday`
- `weekday` tinyint nullable
- `start_time_local` time nullable
- `end_time_local` time nullable
- `date_local` date nullable
- `timezone` varchar(64)
- `is_available` tinyint(1)
- `created_at` datetime
- `updated_at` datetime

Indexes:

- `(profile_id, rule_type)`
- `(instructor_user_id, weekday)`
- `(date_local)`

### Table: `wp_lp_tutor_booking_bookings`

Columns:

- `id` bigint unsigned primary key
- `booking_uuid` char(36) unique
- `status` varchar(30)
- `profile_id` bigint unsigned
- `session_type_id` bigint unsigned
- `student_user_id` bigint unsigned
- `instructor_user_id` bigint unsigned
- `order_id` bigint unsigned nullable
- `order_item_id` bigint unsigned nullable
- `start_utc` datetime
- `end_utc` datetime
- `student_timezone` varchar(64)
- `instructor_timezone` varchar(64)
- `price` decimal(18,6)
- `currency` varchar(10)
- `meeting_link` text nullable
- `google_event_id` varchar(191) nullable
- `hold_expires_at` datetime nullable
- `cancelled_at` datetime nullable
- `cancelled_by` bigint unsigned nullable
- `created_at` datetime
- `updated_at` datetime

Indexes:

- unique `(instructor_user_id, start_utc, end_utc, status)` for active statuses where supported; otherwise enforce in service transaction.
- `(student_user_id, start_utc)`
- `(instructor_user_id, start_utc)`
- `(order_id)`
- `(status, hold_expires_at)`

### Table: `wp_lp_tutor_booking_reviews`

Columns:

- `id` bigint unsigned primary key
- `booking_id` bigint unsigned unique
- `profile_id` bigint unsigned
- `student_user_id` bigint unsigned
- `rating` tinyint unsigned
- `content` text
- `status` varchar(20)
- `created_at` datetime

## Booking Status Lifecycle

```text
hold -> pending_payment -> confirmed -> completed
                               |-> no_show
                               |-> cancelled
                               |-> refunded
hold -> expired
```

Rules:

- `hold`: slot reserved before checkout.
- `pending_payment`: LearnPress order created but not paid.
- `confirmed`: payment complete.
- `completed`: instructor marks session complete.
- `no_show`: instructor marks no-show.
- `cancelled`: user/admin cancellation.
- `refunded`: order/payment refund event.
- `expired`: hold or pending payment timed out.

## Core Services

- `Permission_Service`: central role and ownership checks.
- `Timezone_Service`: UTC/local conversion, IANA timezone validation, DST handling.
- `Availability_Service`: weekly/custom/holiday rules, Google busy time merge, slot generation.
- `Booking_Service`: hold, confirm, cancel, reschedule, complete, no-show.
- `Checkout_Service`: LearnPress cart/order bridge.
- `Google_Calendar_Service`: OAuth tokens, event sync, busy-time lookup.
- `Email_Service`: dispatch booking emails through LearnPress email classes.

## Architecture Checklist

- [ ] Create activation migration with versioned schema.
- [ ] Add uninstall/cleanup policy only after retention decision is documented.
- [ ] Keep LearnPress integration in `integrations/`.
- [ ] Keep business logic in `services/`.
- [ ] Keep REST controllers thin.
- [ ] Add unit tests for availability, timezone, and booking conflict rules.
