# QA And Definition Of Done

## Definition Of Done

The MVP is done only when:

- [ ] Plugin activates with LearnPress active.
- [ ] Plugin fails gracefully when LearnPress is missing.
- [ ] Instructor can create profile, session type, and availability.
- [ ] Student can select slot and complete LearnPress Checkout.
- [ ] Successful payment confirms exactly one booking.
- [ ] Booking appears in Student Dashboard.
- [ ] Booking appears in Instructor Dashboard.
- [ ] Google Calendar sync and busy-time conflict checks work or fail safely.
- [ ] Cancellation and reschedule policies are enforced.
- [ ] Emails send once per lifecycle event.
- [ ] Permission checks protect private booking data.
- [ ] Personal data export/erase is implemented.
- [ ] All checklists in `05-ai-agent-task-checklists.md` are complete or have documented blockers.

## Functional QA

- [ ] Instructor creates profile.
- [ ] Instructor creates multiple session types.
- [ ] Instructor sets weekly availability.
- [ ] Instructor blocks a holiday.
- [ ] Student sees available slots.
- [ ] Student cannot book blocked slot.
- [ ] Student completes checkout.
- [ ] Confirmed booking appears in both dashboards.
- [ ] Student cancels within deadline.
- [ ] Student cannot cancel after deadline.
- [ ] Student reschedules within deadline.
- [ ] Instructor marks booking complete.
- [ ] Student leaves one review.

## Checkout QA

- [ ] Cart item price matches session type price.
- [ ] Order item contains booking metadata.
- [ ] Hold expiry prevents stale checkout.
- [ ] Payment success is idempotent.
- [ ] Payment failure leaves no confirmed booking.
- [ ] Refund/cancel status updates booking status.

## Timezone And Conflict QA

- [ ] Slot stores UTC.
- [ ] Slot displays in student timezone.
- [ ] Slot displays in instructor timezone.
- [ ] DST boundary date is correct.
- [ ] Two students cannot confirm the same slot.
- [ ] Hold prevents simultaneous checkout for same slot.
- [ ] Google Calendar busy time blocks slot.

## Security QA

- [ ] Guest cannot create hold if login is required.
- [ ] Student cannot view another student's private booking.
- [ ] Instructor cannot view another instructor's private booking.
- [ ] Student cannot mark complete/no-show.
- [ ] REST mutation endpoints reject missing nonce.
- [ ] REST mutation endpoints reject invalid capability.
- [ ] All SQL is prepared.
- [ ] All rendered values are escaped.

## Email QA

- [ ] Student confirmation email content is correct.
- [ ] Instructor notification email content is correct.
- [ ] Cancellation email content is correct.
- [ ] Reschedule email content is correct.
- [ ] Duplicate payment hook does not duplicate email.

## Google Calendar QA

- [ ] Instructor connects Google Calendar.
- [ ] Busy-time lookup affects availability.
- [ ] Confirmed booking creates event.
- [ ] Rescheduled booking updates event.
- [ ] Cancelled booking deletes or updates event.
- [ ] API failure returns safe error and does not double-book.

## Release Checklist

- [ ] Minimum LearnPress version documented.
- [ ] Minimum WordPress/PHP versions documented.
- [ ] Admin settings documented.
- [ ] Instructor guide documented.
- [ ] Student booking guide documented.
- [ ] Google Calendar setup guide documented.
- [ ] Known limitations documented.
- [ ] Changelog/release notes prepared.
