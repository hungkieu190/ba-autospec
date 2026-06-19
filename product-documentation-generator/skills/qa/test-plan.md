# Test Plan

## Purpose

Use this skill to create a QA-ready test strategy from the PRD, user flows, permission matrix, and platform constraints.

## Required Test Areas

- Functional testing.
- Permission testing.
- Regression testing.
- Security testing.
- Performance testing.
- Compatibility testing.
- Accessibility testing.
- Edge cases.

## Test Case Format

| ID | Area | Scenario | Preconditions | Steps | Expected Result | Priority |
| --- | --- | --- | --- | --- | --- | --- |

## Quality Planning Rules

- Test scenarios must map to acceptance criteria.
- Include positive, negative, and boundary cases.
- Permission testing must cover every role and capability.
- Security tests should include access control, data validation, CSRF/XSS risks, sensitive data exposure, and abuse cases where relevant.
- Performance tests should define realistic user volume, data volume, and response expectations.
- Regression tests should focus on core workflows, integrations, and previously risky areas.

## Definition of Ready for QA

- Requirements are testable.
- Acceptance criteria are complete.
- Designs or wireframes are available for UI work.
- Dependencies and test data are identified.
- Risks and assumptions are documented.
