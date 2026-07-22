# images-demo

Paste reference screenshots / mockups here for the wireframe agent.

## How to use

1. Export or capture UI references (WordPress admin, LearnPress Tools, competitor screens, Figma exports, etc.).
2. Put image files in this folder (`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`).
3. Optionally rename clearly, e.g. `01-tools-menu.png`, `02-upload-step.png`.
4. Run:

```bash
npm run wireframe -- lp-ie-quiz
```

5. Paste `create-wireframe-by-agent.md` into your AI agent.

The agent will read every image in this folder and align HTML wireframes to layout patterns, density, and chrome from the references.
