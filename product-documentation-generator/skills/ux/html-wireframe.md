# HTML Wireframe

## Purpose

Use this skill to produce interactive, browser-ready HTML5 + Tailwind CSS wireframes for every screen listed in the UX document. Wireframes replace ASCII art and must be openable directly in a browser with no build step.

## When to Apply

Apply this skill for every screen in the Screen List of `04-ux-and-wireframe.md`. Produce one self-contained HTML file per wireframe screen OR one combined HTML file containing all screens navigable via a sidebar/tab menu.

## Output Format

- Language: HTML5 with inline Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`).
- File location: `projects/<slug>/output/wireframes/` directory. One file per screen or one combined file `wireframes.html`.
- Self-contained: No external build step, no Node.js, no PostCSS. Open directly in browser.
- Fidelity: Low-to-mid fidelity. Show structure, layout, controls, states. Do NOT add real images or final copy. Use placeholder text and placeholder colors.
- Responsiveness: Use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) where the product has responsive requirements.

## Required Per-Screen Content

For each screen, the HTML wireframe must show:
- Screen name as a visible heading.
- All major layout regions (sidebar, header, content area, footer, modal).
- All interactive controls: buttons, inputs, dropdowns, checkboxes, toggles, tabs, modals.
- Empty state variant (clearly labeled).
- Error state variant (clearly labeled) when relevant.
- Permission-based differences: show what admin sees vs. what non-admin sees using separate labeled sections or a toggle.

## Tailwind Usage Rules

- Use only Tailwind utility classes. No custom CSS unless absolutely unavoidable.
- Color palette: use Tailwind slate/gray/zinc for neutral, blue/indigo for primary actions, red for errors, green for success.
- Typography: `font-sans`, `text-sm` for body, `text-base` for labels, `text-lg` / `text-xl` for headings.
- Spacing: follow Tailwind 4/8/12/16/24/32 scale.
- Borders and shadows: `border border-gray-200`, `rounded-md`, `shadow-sm` for cards and inputs.
- Focus states: always include `focus:ring-2 focus:ring-indigo-500 focus:outline-none` on interactive elements.

## WordPress Admin UI Rule

If the product type is WordPress Plugin or LMS Add-on and the screen is an admin screen (wp-admin context), apply the wp-admin-ui skill instead of generic Tailwind. See `ux/wp-admin-ui.md`.

## Non-WordPress Design System Rule

If the product type is NOT a WordPress plugin/add-on, define a design system section at the top of the wireframe file before any screens. See Design System Block below.

## Design System Block (non-WordPress products only)

Insert a dedicated `<section id="design-system">` at the top of the wireframe file containing:
- Color tokens: primary, secondary, surface, border, text-muted, error, success, warning.
- Typography scale: headings h1-h4, body, label, caption with Tailwind class mapping.
- Spacing scale: named sizes (xs, sm, md, lg, xl) with Tailwind class mapping.
- Component examples: primary button, secondary button, input field, card, badge, alert, modal shell.
- Design rationale: 2-3 sentences explaining color and layout choices for this product type.

## Interaction Notes

Add comments in HTML (`<!-- -->`) above interactive elements to describe intended behavior:
- What happens on click/focus/change.
- What data the element sends or receives.
- What state changes occur.

These comments serve as developer handoff notes.

## Accessibility

- All interactive elements must have `aria-label` or associated `<label>`.
- Use semantic HTML: `<nav>`, `<main>`, `<aside>`, `<section>`, `<header>`, `<footer>`, `<button>`, `<form>`.
- Color contrast must meet WCAG AA minimum (Tailwind defaults satisfy this for most combinations).

## Rules

- Do NOT produce ASCII wireframes. HTML wireframes are the required output.
- Do NOT use Tailwind CDN JIT play mode or custom config; use the standard CDN script only.
- Do NOT include real screenshots, CDN images, or placeholder image services.
- Use inline SVG or Tailwind bg-color blocks to represent image placeholder areas.
- Every screen must include a visible label: "WIREFRAME — [Screen Name] — [Role]".
- If a screen has multiple states (empty, filled, error), show each state as a labeled subsection within the same HTML page.
