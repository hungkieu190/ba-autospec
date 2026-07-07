# API And Data Contracts

## REST Namespace

Use LearnPress REST registration filters and namespace:

```text
lp/v1/tutor-booking
```

All mutation endpoints must require nonce/current user validation and permission checks.

## Endpoints

| Method | Path | Purpose | Permission |
|---|---|---|---|
| `GET` | `/profiles` | List searchable tutor profiles | public |
| `GET` | `/profiles/{id}` | Get tutor profile detail | public |
| `GET` | `/profiles/{id}/slots` | Get available slots | public or logged-in |
| `POST` | `/holds` | Create checkout hold | logged-in student |
| `DELETE` | `/holds/{uuid}` | Release hold | hold owner/admin |
| `POST` | `/checkout` | Prepare LearnPress cart redirect | hold owner |
| `GET` | `/bookings` | List current user's bookings | logged-in |
| `GET` | `/bookings/{uuid}` | Get booking detail | owner/instructor/admin |
| `POST` | `/bookings/{uuid}/cancel` | Cancel booking | policy + ownership |
| `POST` | `/bookings/{uuid}/reschedule` | Reschedule booking | policy + ownership |
| `POST` | `/bookings/{uuid}/complete` | Mark complete | instructor/admin |
| `POST` | `/bookings/{uuid}/no-show` | Mark no-show | instructor/admin |
| `POST` | `/bookings/{uuid}/review` | Create review | student after completed |
| `GET` | `/instructor/availability` | Read own availability | instructor/admin |
| `PUT` | `/instructor/availability` | Save availability | instructor/admin |
| `POST` | `/google/connect` | Start/connect Google Calendar | instructor/admin |
| `POST` | `/google/disconnect` | Disconnect Google Calendar | instructor/admin |

## Slot Query

Request:

```http
GET /lp/v1/tutor-booking/profiles/123/slots?session_type_id=456&from=2026-07-08&to=2026-07-15&timezone=Asia/Bangkok
```

Response:

```json
{
  "profile_id": 123,
  "session_type_id": 456,
  "timezone": "Asia/Bangkok",
  "slots": [
    {
      "start_utc": "2026-07-08T03:00:00Z",
      "end_utc": "2026-07-08T04:00:00Z",
      "start_local": "2026-07-08T10:00:00+07:00",
      "end_local": "2026-07-08T11:00:00+07:00",
      "available": true
    }
  ]
}
```

Validation:

- [ ] `session_type_id` belongs to the profile.
- [ ] Date range does not exceed configured maximum.
- [ ] Timezone is a valid IANA timezone.
- [ ] Google busy time is merged before returning slots.

## Hold Creation

Request:

```json
{
  "profile_id": 123,
  "session_type_id": 456,
  "start_utc": "2026-07-08T03:00:00Z",
  "student_timezone": "Asia/Bangkok"
}
```

Response:

```json
{
  "booking_uuid": "9fd3d6a4-3e2e-4fd3-9d73-1e5d99589b7a",
  "status": "hold",
  "hold_expires_at": "2026-07-08T02:45:00Z",
  "checkout_url": "https://example.com/checkout/"
}
```

Rules:

- [ ] Create hold inside transaction or equivalent lock.
- [ ] Re-check availability immediately before hold insert.
- [ ] Reject if slot overlaps confirmed/pending/hold booking.
- [ ] Reject if slot overlaps Google busy time.

## Checkout Contract

LearnPress bridge must store these order item meta values:

- `_lp_tb_booking_uuid`
- `_lp_tb_profile_id`
- `_lp_tb_session_type_id`
- `_lp_tb_student_user_id`
- `_lp_tb_instructor_user_id`
- `_lp_tb_start_utc`
- `_lp_tb_end_utc`
- `_lp_tb_student_timezone`

Hooks:

- `learnpress/cart/add-item/item_type_lp_tb_session_type`
- `learnpress/cart/calculate_sub_total/item_type_lp_tb_session_type`
- `learnpress/order/add-item/item_type_lp_tb_session_type`
- `learn-press/checkout/add-order-item-meta`
- `learn-press/checkout-order-processed`

Checklist:

- [ ] Cart contains one booking item per checkout.
- [ ] Cart item price equals session type price.
- [ ] Checkout cannot proceed after hold expiry.
- [ ] Order item meta can reconstruct the booking.

## Booking List Response

```json
{
  "items": [
    {
      "booking_uuid": "9fd3d6a4-3e2e-4fd3-9d73-1e5d99589b7a",
      "status": "confirmed",
      "profile_id": 123,
      "session_type_id": 456,
      "start_utc": "2026-07-08T03:00:00Z",
      "end_utc": "2026-07-08T04:00:00Z",
      "display_time": "10:00 - 11:00",
      "timezone": "Asia/Bangkok",
      "can_cancel": true,
      "can_reschedule": true,
      "meeting_link": "https://meet.example/session"
    }
  ]
}
```

Checklist:

- [ ] Meeting link omitted if current user is not authorized.
- [ ] Actions reflect policy deadlines.
- [ ] Pagination parameters are supported.

## Error Shape

```json
{
  "code": "slot_unavailable",
  "message": "The selected slot is no longer available.",
  "data": {
    "status": 409,
    "field": "start_utc"
  }
}
```

Required error codes:

- `invalid_timezone`
- `invalid_session_type`
- `slot_unavailable`
- `hold_expired`
- `permission_denied`
- `booking_not_found`
- `policy_deadline_passed`
- `google_calendar_unavailable`
