# WordPress Admin UI

## Purpose

Use this skill when producing HTML wireframes for screens that run inside wp-admin. WordPress admin has a fixed, well-known chrome that must be reproduced faithfully so stakeholders can evaluate the UI in realistic context.

## When to Apply

Apply this skill for every admin screen where:
- The product type is WordPress Plugin, LMS Add-on, or eCommerce Extension.
- The screen URL would be under `/wp-admin/`.
- The screen is accessed by Admin, Manager, or Developer roles.

Do NOT apply this skill to frontend screens (site visitor, student, customer flows). Use `html-wireframe.md` for those.

## WP Admin Chrome Structure

Reproduce these regions in every admin wireframe:

```
+------+--------------------------------------------------+
| WP   | Admin Bar: [site name] [+ New] [Howdy, Admin ▼] |
| logo +--------------------------------------------------+
|      | [Screen Title]          [Help ▼] [Screen Options ▼] |
+------+--------------------------------------------------+
| LEFT | MAIN CONTENT AREA                               |
| SIDE |                                                 |
| BAR  |                                                 |
|      |                                                 |
+------+-------------------------------------------------+
```

## Left Sidebar Tailwind Implementation

Sidebar must be `w-48 bg-gray-900 text-gray-100 min-h-screen` with:
- WordPress logo block at top: `bg-gray-800 p-3`.
- Menu items: `px-3 py-2 text-sm hover:bg-gray-700 cursor-pointer`.
- Active item: `bg-blue-600 text-white`.
- Submenu: `pl-6 bg-gray-950 text-gray-300 text-xs py-1`.

Minimum sidebar menu items to show (match real WP admin):
- Dashboard
- Posts
- Pages
- Comments
- Appearance
- Plugins
- Users
- Settings
- **[Plugin Menu Item]** (highlighted as the current plugin's menu entry, expanded to show sub-items)

## Admin Bar Tailwind Implementation

Top bar: `w-full h-8 bg-gray-800 text-gray-200 text-xs flex items-center px-3 gap-4 fixed top-0 z-50`.

Show: WP logo, site name, "+ New" dropdown trigger, "Howdy, Admin" with avatar placeholder.

## Main Content Area

Below admin bar and beside sidebar: `ml-48 mt-8 p-6 bg-gray-100 min-h-screen`.

### WP Admin Typography (Tailwind mappings)

- Page title `<h1>`: `text-2xl font-normal text-gray-900 mb-4`
- Section title `<h2>`: `text-base font-semibold text-gray-800 mb-2`
- WP form table label: `text-sm font-medium text-gray-700 w-48 align-top pt-2`
- WP form table input: `border border-gray-300 rounded px-2 py-1 text-sm w-80 focus:ring-2 focus:ring-blue-500 focus:outline-none`
- Description text below input: `text-xs text-gray-500 mt-1`

### WP Admin Color Tokens (Tailwind)

- Primary button (Save): `bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded`
- Secondary button: `bg-white border border-gray-300 text-gray-700 text-sm px-4 py-1.5 rounded hover:bg-gray-50`
- Danger button (Delete): `bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded`
- Notice success: `border-l-4 border-green-500 bg-white p-3 text-sm text-green-800 mb-4`
- Notice warning: `border-l-4 border-yellow-500 bg-white p-3 text-sm text-yellow-800 mb-4`
- Notice error: `border-l-4 border-red-500 bg-white p-3 text-sm text-red-800 mb-4`
- Table: `w-full border-collapse bg-white shadow-sm`
- Table header: `bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wide px-3 py-2 border-b border-gray-200`
- Table row: `px-3 py-2 text-sm text-gray-700 border-b border-gray-100 hover:bg-gray-50`
- Card/postbox: `bg-white border border-gray-200 rounded shadow-sm p-4 mb-4`

### WP Admin Tabs (for Plan Edit screens)

Tabs: `flex border-b border-gray-200 mb-6 gap-0`
Tab item: `px-4 py-2 text-sm text-gray-600 border-b-2 border-transparent hover:text-gray-900 cursor-pointer -mb-px`
Active tab: `border-b-2 border-blue-500 text-blue-600 font-medium`

### WP Admin Modal / Thickbox

Modal overlay: `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`
Modal box: `bg-white rounded shadow-lg w-full max-w-lg p-6`
Modal header: `flex justify-between items-center mb-4 pb-3 border-b border-gray-200`
Modal title: `text-base font-semibold text-gray-900`
Modal close: `text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer`

## Plugin-Specific Menu Entry

Always show the plugin's own menu entry in the sidebar, expanded, showing its sub-pages. Label it clearly with the plugin name. Example for a Membership plugin:

```
> Memberships          ← expanded, highlighted
  - All Plans
  - Add New Plan
  - Members
  - Settings
  - Restriction Rules
```

## Rules

- All admin wireframes must include the full WP chrome (admin bar + sidebar + main area).
- Never show admin screens as standalone panels without the WP chrome.
- Match WP admin's actual typography feel: clean, utilitarian, not consumer-app styled.
- Use `form-table` pattern (label left, input right in a table) for settings screens.
- Show `Screen Options` and `Help` toggles in the top right of every screen (even if non-functional in wireframe).
- Add `<!-- WP Admin wireframe — [Screen Name] — [Role] -->` comment at top of each screen section.
