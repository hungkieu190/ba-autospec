# Wireframe Specification

## Purpose

Use this skill to plan which screens need wireframes and to define per-screen requirements. Actual wireframe rendering is delegated to `ux/html-wireframe.md` and (for WordPress admin screens) `ux/wp-admin-ui.md`.

## Output Format Change

Wireframes are no longer ASCII art. All wireframes must be HTML5 + Tailwind CSS files that open directly in a browser. See `ux/html-wireframe.md` for the full rendering spec.

## Required Per-Screen Planning

For each screen in the Screen List, document:
- Screen name and ID.
- Module it belongs to.
- Target user roles.
- Is this a wp-admin screen? (Yes/No)
- Components: list all controls, tables, forms, modals, blocks.
- States: normal, empty, error, permission-denied.
- Navigation: what triggers this screen, where it goes after each action.

## WordPress Admin Screens

If the product type is WordPress Plugin or LMS Add-on and the screen lives in wp-admin:
- Apply `ux/wp-admin-ui.md` for chrome (sidebar, admin bar, tabs, form tables, notices).
- Apply `ux/html-wireframe.md` for the main content area layout.

## Non-WordPress Screens

If the product is not a WordPress plugin/add-on:
- Apply `ux/html-wireframe.md` and include a Design System Block at the top of the output file.
- The design system must define color tokens, typography scale, spacing scale, and component examples before the first screen wireframe.

## Screen List Format

Document screens in a table:

| ID | Screen Name | Module | Role | WP Admin? |
|---|---|---|---|---|
| S01 | Example screen | Example module | Admin | Yes |

## Rules

- Every screen in the Screen List must have a corresponding HTML wireframe.
- Wireframe files go in `projects/<slug>/output/wireframes/`.
- Do not produce ASCII wireframes. If ASCII appears in the output, it is an error.
- If the screen count exceeds 10, combine all screens into one `wireframes.html` with a navigation sidebar.
