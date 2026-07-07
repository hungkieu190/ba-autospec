# LearnPress Reference

LearnPress core source lives in:

```text
references/learnpress/core/
```

Use this folder when planning or implementing:

- LearnPress add-ons.
- LearnPress-first products.
- Features that depend on LearnPress checkout, order, profile, REST API, email, GDPR, course, lesson, quiz, or instructor behavior.

Run this workflow from the repo root:

```bash
npm run mvp:plan -- <project-name> --learnpress
```

The generated prompt will ask the AI agent to read the LearnPress reference before creating `projects/<project-name>/mvp-build-plan/`.
