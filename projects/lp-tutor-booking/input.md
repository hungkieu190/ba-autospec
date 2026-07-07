# Product Documentation Generator Input

## Project Name

lp-tutor-booking

---

## Product Idea

LearnPress Tutor Booking is an official LearnPress add-on that enables instructors to sell and manage one-to-one tutoring, coaching, mentoring, consultation, and group learning sessions directly from their LearnPress website.

Unlike generic appointment booking plugins, this add-on is designed specifically for the LearnPress ecosystem. It focuses on scheduling, booking management, payments, and tutor reviews while reusing the existing LearnPress learning experience.

The add-on allows instructors to define their availability, receive bookings, accept payments through LearnPress Checkout, host online sessions using their preferred meeting platform, and manage tutoring appointments from the LearnPress dashboard.

Students can browse available time slots, book tutoring sessions, complete payment, join online meetings, manage upcoming appointments, and rate their tutors after each completed session without leaving the LearnPress website.

The add-on does not replace or extend LearnPress learning features such as lessons, assignments, quizzes, certificates, or course progress. It is purely a booking and appointment management solution for live tutoring sessions.

---

## Product Type

LMS Add-on

---

## Target Users

### Primary Users

- LearnPress website owners
- Individual instructors
- Tutors
- Coaches
- Mentors
- Consultants
- Online educators

### Secondary Users

- Students
- Educational organizations
- Training centers
- Coaching businesses
- Corporate learning teams

---

## User Roles

- Admin
- Instructor
- Student

---

## Core Problem

LearnPress provides an excellent platform for structured online courses but currently lacks a native solution for scheduling and selling live tutoring sessions.

Many instructors rely on multiple third-party services such as Calendly, WooCommerce Bookings, Amelia, Google Calendar, and Zoom Scheduling. This results in fragmented workflows, inconsistent user experiences, duplicated management, and additional subscription costs.

---

## Proposed Solution

Develop a native Tutor Booking system tightly integrated with LearnPress.

The add-on should allow instructors to publish their availability, receive tutoring bookings, collect payments through LearnPress Checkout, manage upcoming sessions, and receive tutor reviews.

Students should be able to complete the entire booking process—from selecting a time slot to joining an online meeting and reviewing the tutor—without leaving the LearnPress website.

The add-on focuses solely on booking management and scheduling while preserving the existing LearnPress learning workflow.

---

## Must-Have Features

### Instructor Availability Management

- Weekly recurring schedules
- Custom available dates
- Holiday blocking
- Buffer time between sessions
- Minimum booking notice
- Maximum advance booking period

### Tutor Booking Calendar

- Browse available dates
- View available time slots
- Select session duration
- Book tutoring sessions

### Multiple Session Types

- One-to-one
- Group Session
- Consultation
- Coaching
- Mentoring
- Office Hour
- Interview Preparation
- Exam Review

### Flexible Pricing

- Fixed duration pricing
- Hourly pricing
- Multiple duration options

Examples:

- 30 minutes
- 60 minutes
- 90 minutes

### LearnPress Checkout Integration

- Reuse existing LearnPress checkout
- Reuse existing payment gateways
- Booking → Checkout → Payment → Booking Confirmation workflow

### Booking Management

Instructor Dashboard

- Upcoming Sessions
- Today's Sessions
- Completed Sessions
- Cancelled Sessions

Student Dashboard

- My Sessions
- Upcoming Sessions
- Session History
- Cancel Booking
- Reschedule Booking
- Join Meeting

### Booking Status

- Pending
- Confirmed
- Completed
- Cancelled
- No Show
- Refunded

### Meeting Support

Support manual meeting links from services such as:

- Zoom
- Google Meet
- Jitsi
- BigBlueButton
- Custom Meeting URL

### Email Notifications

Instructor

- New Booking
- Booking Cancelled

Student

- Booking Confirmed
- Session Reminder
- Booking Cancelled

### Tutor Reviews

Students can submit ratings and reviews after completing a tutoring session.

---

## Nice-To-Have Features

### Google Calendar Synchronization

- Two-way sync
- Busy time detection

### Outlook Calendar Integration

### Apple Calendar Integration

### ICS Export

### Session Packages

Examples:

- Single Session
- 5 Sessions
- 10 Sessions
- Monthly Package

### Credit System

Students purchase session credits and redeem them when booking tutoring sessions.

### Recurring Sessions

Examples:

- Every Monday
- Weekly coaching sessions
- Multi-week tutoring schedule

---

## Out Of Scope

- Lesson management
- Assignment management
- Homework submission
- Quiz management
- Course progress tracking
- Certificate generation
- Native video conferencing platform
- Video streaming infrastructure
- AI voice transcription
- AI-generated homework
- AI learning recommendations
- Complete CRM system
- Payment gateway development
- Calendar provider implementation
- Mobile application

---

## Competitors Or Alternatives

- Calendly
- Amelia
- Bookly
- Simply Schedule Appointments
- WooCommerce Bookings
- Tutor LMS Appointment Booking
- TutorCruncher
- Acuity Scheduling
- Google Calendar Appointment Schedule
- Manual scheduling via email

---

## Integrations

### LearnPress

- Courses
- Instructor Profile
- Student Dashboard
- Checkout
- Orders
- Coupons
- Emails

### Meeting Platforms

- Zoom
- Google Meet
- Jitsi
- BigBlueButton

### Calendar

- Google Calendar
- Outlook Calendar
- Apple Calendar
- ICS

### Payment

Reuse existing LearnPress payment gateways.

---

## Pricing Or Revenue Model

- Premium LearnPress Add-on
- One-time purchase
- Included in LearnPress Pro Bundle

---

## SEO Keywords

- LearnPress Tutor Booking
- LearnPress Appointment
- LearnPress Booking
- LearnPress Coaching
- LearnPress Mentoring
- LearnPress Live Session
- LearnPress One-to-One Learning
- Tutor Booking WordPress
- WordPress Tutor Booking Plugin
- LMS Appointment Booking

---

## Business Goals

- Expand LearnPress beyond self-paced learning.
- Increase the value of the LearnPress add-on ecosystem.
- Enable instructors to monetize tutoring services.
- Reduce dependence on third-party booking platforms.
- Increase customer retention.
- Increase average revenue per LearnPress customer.
- Strengthen LearnPress as a complete LMS platform for live and self-paced learning.

---

## Success Metrics

- Number of Tutor Booking add-on sales
- Number of active Tutor Booking websites
- Number of tutoring sessions booked
- Booking revenue
- Session completion rate
- Customer retention
- Instructor satisfaction
- Student satisfaction
- Renewal rate
- Support ticket volume

---

## Risks Or Constraints

### Technical

- Timezone handling
- Calendar synchronization
- Booking conflict detection
- Meeting platform compatibility
- Scalability for high booking volume

### Market

- Strong competition from mature booking plugins
- High user expectations for scheduling features

### Support

- Third-party meeting APIs
- Calendar synchronization issues
- Timezone confusion

### Business

- Maintaining compatibility with future LearnPress versions
- Supporting multiple payment gateways

---

## Notes

LearnPress Tutor Booking should be positioned as a native booking and scheduling extension for LearnPress rather than a generic appointment booking plugin.

The add-on should complement the existing LearnPress ecosystem instead of replacing it.

All learning-related functionality—including lessons, quizzes, assignments, certificates, and course progress—remains the responsibility of LearnPress and its existing add-ons.

Tutor Booking is responsible only for scheduling, booking management, payments, meeting access, and tutor reviews, ensuring that live tutoring sessions become a seamless extension of the LearnPress learning experience.

---

## Confirmed Decisions From Q&A

This section is the source of truth for answers already resolved in `questions.md`. Future generated documents must treat these items as confirmed scope, requirements, assumptions, or validation items instead of open questions.

### Product Context

- Product status: no prototype, mockup, or MVP yet.
- Product direction: completely new LearnPress add-on, not a replacement for an existing add-on.
- Minimum LearnPress version: LearnPress 4.4.1.
- Compatibility target: LearnPress core only for v1.0.
- WordPress Multisite compatibility: not required.

### Market Validation

- This is a team-researched strategic product plan.
- Existing user workflow pain has been observed through survey/research: instructors currently rely on manual tools such as email, Google Calendar, and Google Form.
- There is no data for how many LearnPress sites currently use third-party booking add-ons.
- Tutor LMS benchmark: Tutor LMS uses an integration with a third-party plugin, FluentBooking. LearnPress Tutor Booking should be built as a native LearnPress booking system.
- Target market: global.

### Users And Permissions

- Admin can manage bookings across the whole site, including viewing all bookings, cancelling/confirming when needed, and exporting reports.
- One instructor can have multiple tutor profiles with different subjects, schedules, and prices.
- A student can book multiple instructors. The product should include a configurable option to limit active sessions per student.
- No intermediate role such as School Manager or Corporate Account is required for v1.0.
- Guests can view public marketing pages if needed, but booking availability and booking actions require registration and login.

### Booking Scope And Business Rules

- Group sessions support multiple students per session.
- Instructor can configure max seats for group sessions.
- Group session confirmation can happen automatically when the session reaches the configured capacity.
- Only students can cancel their own booking in the standard flow.
- Default cancellation deadline: 24 hours before session start.
- Cancellation deadline must be configurable.
- No cancellation penalty is required for v1.0.
- Students can reschedule by selecting another available slot.
- Default reschedule deadline: 24 hours before session start.
- Reschedule deadline must be configurable.
- Reschedule count is unlimited unless site owner configures a limit in the future.
- Booking is automatically confirmed after successful LearnPress payment.
- No manual instructor approval is required in the default v1.0 flow.
- No Show status is triggered 30 minutes after session end if there is no completion action.
- Instructor can set different prices per session type.
- Coupon/discount support is out of scope for v1.0.
- Holiday blocking must support one-off blocked dates without affecting the recurring weekly schedule.

### Meeting Support

- Instructor enters the meeting link once and can reuse it for relevant sessions.
- v1.0 supports manual meeting links for Zoom, Google Meet, Jitsi, BigBlueButton, or custom meeting URL.
- Auto-generating Zoom or Google Meet links through provider APIs is not required for v1.0.
- Student can join a session through the email link or through the Join Meeting button in the student dashboard.
- No session recap screen is required for v1.0.

### Calendar And Conflict Detection

- Google Calendar integration is included in v1.0.
- Google Calendar scope for v1.0: sync bookings with Google Calendar and use Google Calendar busy time to prevent conflicts.
- Booking conflict detection must check both Tutor Booking internal bookings and connected Google Calendar busy time.
- Outlook Calendar and Apple Calendar are roadmap items after v1.0.
- ICS export remains a nice-to-have roadmap item unless Engineering decides it is low-cost enough for v1.0.

### Timezone

- Instructor can set their timezone in settings.
- Student-facing booking calendar displays time in the student's timezone.
- System should store booking times in UTC and convert for display.
- Confirmation emails should show the student timezone and include instructor timezone where useful to reduce confusion.

### Payments, Pricing, And Revenue

- Pricing: USD 39 for 1 site license.
- Product has one commercial version only.
- No freemium version.
- No subscription/annual renewal model is planned at this stage.
- For launch, position as an independent LearnPress add-on, not as an included Pro Bundle feature.
- All payments go through the site owner's LearnPress payment account.
- Instructor payout is out of scope; site owner is responsible for paying instructors outside the product.
- Refunds follow LearnPress order policy and are handled manually through the LearnPress order system.

### UX And Frontend

- Student can discover instructors through a listing page of all instructors in the system.
- Student can also book from an individual instructor profile.
- Tutor profile can appear on a dedicated page, in a LearnPress profile tab, or embedded in a course page.
- Instructor dashboard should be available in both wp-admin and the frontend LearnPress dashboard.
- The full booking flow must be responsive for mobile.
- Reviews can be submitted after session completion.
- Instructor reply to reviews is planned for the future, not v1.0.

### Technical And Integrations

- Public webhooks are required, including events such as new booking and session completed.
- Multi-currency follows the currency configured in the LearnPress site.
- Email notifications use the LearnPress email system.
- Booking data must support GDPR requirements, including export and deletion flows where applicable.
- Site owner/admin should be able to export booking data.
- No specific performance SLA has been set, but the calendar must be designed for practical production use.

### Go-To-Market

- Distribution channel: ThimPress.com.
- Landing page: dedicated landing page on learnpresslms.com.
- Launch channel: blog announcement.
- Demo/sandbox site: required before purchase.
- No case study or beta testimonial is available for launch.
- No comparison/alternative SEO pages are planned for launch; focus on the product page and blog.

### QA And Acceptance

- Highest-risk edge cases: timezone mismatch, double-booking during concurrent checkout, and payment success without booking creation.
- Automated testing is not required by the current product answer, but Engineering may still add tests for high-risk booking logic.
- Browser/device compatibility: test across common modern desktop and mobile browsers.
- WCAG 2.1 AA is not a formal requirement.
- Definition of Done is not formally specified; generated documentation should propose a practical DoD for the team.

### Documentation

- User documentation language: English.
- Developer documentation for hooks, filters, API, and extension points is not required for v1.0.
- Help center: help.thimpress.com.
- Documentation format: text-based docs with image screenshots.

### Production Wording Rules

- Final production documents must not contain internal/meta wording about fabrication, user-answer provenance, unresolved-version notes, or answered items still being unresolved.
- If a fact lacks external evidence, write it professionally as "Assumption", "Cần xác minh", or "Validation item".
- If a question has been answered in `questions.md`, convert it into a decision, requirement, roadmap item, or validation item. Do not keep answered items as open questions.
