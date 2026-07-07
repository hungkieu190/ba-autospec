# Implementation Backlog

## Milestone 0: Scaffold

- [ ] Create plugin folder `learnpress-tutor-booking/`.
- [ ] Add main plugin file with header, constants, autoload/bootstrap.
- [ ] Add LearnPress active/version check.
- [ ] Add `LP_Addon` subclass.
- [ ] Add activation/deactivation classes.
- [ ] Add basic PHPUnit/WP test bootstrap if available.
- [ ] Verify plugin activates with LearnPress active.

## Milestone 1: Database And Domain

- [ ] Register CPT `lp_tb_profile`.
- [ ] Register CPT `lp_tb_session_type`.
- [ ] Create availability table migration.
- [ ] Create bookings table migration.
- [ ] Create reviews table migration.
- [ ] Store schema version option.
- [ ] Add rollback-safe migration checks.
- [ ] Add domain classes for profile, session type, availability rule, booking, review.
- [ ] Verify tables and indexes after activation.

## Milestone 2: Settings And Permissions

- [ ] Add LearnPress Addons settings section `tutor-booking`.
- [ ] Add settings fields for hold duration, deadlines, timezone, email flags, Google Calendar.
- [ ] Sanitize all settings.
- [ ] Implement `Permission_Service`.
- [ ] Map capabilities for admin, instructor, student, guest.
- [ ] Add direct permission tests for profile, booking, and admin actions.

## Milestone 3: Instructor Setup

- [ ] Build instructor profile admin UI or profile tab UI.
- [ ] Build session type CRUD UI.
- [ ] Build weekly availability editor.
- [ ] Build custom date/holiday block editor.
- [ ] Validate duration, price, timezone, and meeting link.
- [ ] Verify instructor cannot edit another instructor's profile.

## Milestone 4: Slot Engine

- [ ] Implement timezone conversion service.
- [ ] Implement weekly availability expansion.
- [ ] Implement custom date and holiday override logic.
- [ ] Implement buffer before/after session.
- [ ] Merge existing booking conflicts.
- [ ] Merge Google Calendar busy time conflicts.
- [ ] Add tests for DST, overlapping slots, and blocked dates.

## Milestone 5: Student Booking UI

- [ ] Build tutor/session selection UI.
- [ ] Build slot picker with timezone display.
- [ ] Build hold creation action.
- [ ] Show hold expiry state.
- [ ] Redirect to LearnPress Checkout.
- [ ] Handle slot unavailable after user selection.
- [ ] Verify mobile layout.

## Milestone 6: LearnPress Checkout Bridge

- [ ] Register `lp_tb_session_type` as purchasable item.
- [ ] Implement cart add-item hook.
- [ ] Implement cart subtotal hook.
- [ ] Store booking metadata on cart/order item.
- [ ] Validate hold before checkout.
- [ ] Link order/order item to booking row.
- [ ] Verify payment success confirms exactly one booking.
- [ ] Verify payment fail/cancel releases or expires hold.

## Milestone 7: Booking Lifecycle

- [ ] Implement hold cleanup.
- [ ] Implement payment confirmation idempotency.
- [ ] Implement cancellation policy.
- [ ] Implement reschedule policy.
- [ ] Implement complete action.
- [ ] Implement no-show action.
- [ ] Implement refund/order cancellation handling.
- [ ] Add lifecycle tests for every status transition.

## Milestone 8: Dashboards

- [ ] Add Student Dashboard tab in LearnPress profile.
- [ ] Add Instructor Dashboard tab in LearnPress profile.
- [ ] Render upcoming and past bookings.
- [ ] Render cancel/reschedule actions.
- [ ] Hide unauthorized meeting links.
- [ ] Add empty states.
- [ ] Add direct URL access tests.

## Milestone 9: Emails And Notifications

- [ ] Register LearnPress email classes.
- [ ] Add email templates in add-on.
- [ ] Send student confirmation email.
- [ ] Send instructor notification email.
- [ ] Send cancellation email.
- [ ] Send reschedule email.
- [ ] Add reminder scheduling if MVP settings require it.
- [ ] Verify no duplicate emails on repeated payment hooks.

## Milestone 10: Google Calendar

- [ ] Add Calendar provider interface.
- [ ] Implement Google OAuth/token storage.
- [ ] Read busy time for instructor calendar.
- [ ] Create/update/delete Google event for booking lifecycle.
- [ ] Store `google_event_id` on booking.
- [ ] Add fallback behavior when Google API is unavailable.
- [ ] Verify booking can still fail safely when busy-time check fails.

## Milestone 11: Reviews

- [ ] Allow review only after completed booking.
- [ ] Enforce one review per booking.
- [ ] Add review moderation status.
- [ ] Display approved reviews on tutor profile if required.
- [ ] Add permission and ownership tests.

## Milestone 12: Privacy, QA, Release

- [ ] Add personal data exporter.
- [ ] Add personal data eraser/anonymizer.
- [ ] Add admin cleanup for expired holds.
- [ ] Run functional QA matrix.
- [ ] Run security/permission QA matrix.
- [ ] Run PDF/docs review if docs are shipped.
- [ ] Prepare release notes.
