# AI Agent Task Checklists

## Rule

The coding agent must change `- [ ]` to `- [x]` only after the task is implemented and verified. Add a short verification note in the commit/response.

## 1. Repository And Setup

- [ ] Plugin folder exists at `learnpress-tutor-booking/`.
- [ ] Main plugin file defines constants and bootstrap.
- [ ] LearnPress dependency check exists.
- [ ] Add-on class extends `LP_Addon`.
- [ ] Activation and deactivation hooks exist.
- [ ] Basic tests or manual activation verification are documented.

## 2. LearnPress Integration

- [ ] Add-on loads on `learn-press/ready`.
- [ ] Settings section uses `learn-press/settings/addons/sections`.
- [ ] Settings fields use `learn-press/settings/addons/fields-tutor-booking`.
- [ ] Cart hooks support `lp_tb_session_type`.
- [ ] Checkout/order metadata is stored.
- [ ] Payment/order status hooks confirm bookings idempotently.
- [ ] Profile tabs are registered through LearnPress profile filters.
- [ ] Emails are registered through `learnpress/emails/register`.

## 3. Database And Migrations

- [ ] `lp_tb_profile` CPT registered.
- [ ] `lp_tb_session_type` CPT registered.
- [ ] Availability table created.
- [ ] Bookings table created.
- [ ] Reviews table created.
- [ ] Indexes support slot lookup and dashboard queries.
- [ ] Schema version option is stored and checked.

## 4. Domain Models

- [ ] Booking model maps all required fields.
- [ ] Session type model maps price/duration/profile.
- [ ] Availability model supports weekly/custom/holiday rules.
- [ ] Review model enforces one review per booking.
- [ ] Status constants are centralized.

## 5. Admin Settings

- [ ] Hold duration setting works.
- [ ] Cancel/reschedule deadline settings work.
- [ ] Default timezone setting works.
- [ ] Email settings work.
- [ ] Google Calendar settings work.
- [ ] Sensitive settings are not exposed to unauthorized users.

## 6. Instructor/Admin Workflow

- [ ] Instructor can create profile.
- [ ] Instructor can create session type.
- [ ] Instructor can set weekly availability.
- [ ] Instructor can add blocked dates.
- [ ] Instructor can view bookings.
- [ ] Instructor can mark complete/no-show.
- [ ] Instructor cannot access another instructor's private booking data.

## 7. Student Workflow

- [ ] Student can view tutor profile.
- [ ] Student can view slots in selected timezone.
- [ ] Student can create hold.
- [ ] Student can reach LearnPress Checkout.
- [ ] Student sees confirmed booking after payment.
- [ ] Student can cancel/reschedule within policy.
- [ ] Student can review completed booking.

## 8. Checkout/Order/Payment Lifecycle

- [ ] Hold is created before checkout.
- [ ] Hold expires if checkout is not completed.
- [ ] Payment success confirms booking.
- [ ] Repeated payment hook does not duplicate booking.
- [ ] Payment failure does not confirm booking.
- [ ] Refund/cancel status updates booking status.

## 9. Notifications/Integrations

- [ ] Student confirmation email sends once.
- [ ] Instructor booking email sends once.
- [ ] Cancel/reschedule emails send once.
- [ ] Google Calendar busy-time check affects slot availability.
- [ ] Google Calendar event is created for confirmed booking.
- [ ] Google Calendar event is updated/deleted when booking changes.

## 10. Dashboards/Profile Tabs

- [ ] Student profile tab lists bookings.
- [ ] Instructor profile tab lists bookings.
- [ ] Meeting links are permission-protected.
- [ ] Empty states render clearly.
- [ ] Direct URL access is protected.

## 11. Security/Privacy

- [ ] All mutation endpoints check nonce and permission.
- [ ] Inputs are sanitized and validated.
- [ ] Outputs are escaped.
- [ ] SQL uses `$wpdb->prepare`.
- [ ] Personal data exporter exists.
- [ ] Personal data eraser/anonymizer exists.

## 12. QA/Release

- [ ] Functional test pass is documented.
- [ ] Permission test pass is documented.
- [ ] Timezone/DST test pass is documented.
- [ ] Double-booking test pass is documented.
- [ ] Google Calendar degraded-mode test pass is documented.
- [ ] Release notes are prepared.
