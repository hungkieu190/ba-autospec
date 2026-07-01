# LearnPress MCP — Feature Guide (Phase 2)

Phase 2 turns the LearnPress MCP integration from read-only discovery into **controlled LMS content management**: an AI/MCP client can now create and edit courses, sections, lessons, quizzes, quiz questions, and enrollments — and read quiz questions — through the WordPress Abilities API / MCP Adapter.

- **Endpoint (alias):** `https://<site>/wp-json/lp/v1/mcp` → proxies to the default MCP adapter route.
- **Abilities:** 25 total — 8 read + 17 write.
- **Auth:** LearnPress MCP API key over HTTP Basic.
- **Safety:** strict input schemas, capability + key-scope checks, and **reversible-only deletes** (no hard delete).

---

## 1. Prerequisites
1. **Enable MCP** in LearnPress settings (MCP tab).
2. **Create an API key**: *wp-admin → LearnPress → Settings → MCP (API Keys)*. Choose a scope:
   - `read` — read tools only.
   - `write` — write tools only.
   - `read_write` — both (recommended for an authoring assistant).
3. The key owner must have the base capability (default **`manage_options`**, i.e. an admin). Filterable via `learn-press/mcp/api-keys/base-capability`.
4. You receive a **consumer key** (`ck_…`) and **consumer secret** (`cs_…`). Store the secret securely — it is shown once.

## 2. Authentication & endpoint
- **URL:** `https://<site>/wp-json/lp/v1/mcp`
- **Auth:** HTTP **Basic** — **username = `ck_…`**, **password = `cs_…`**. (Query-string `?ck=&cs=` is **not** supported — Basic only.)
- **Scope rule:** `read_write` satisfies everything; otherwise the granted scope must equal the tool's required scope (a `write`-only key cannot call read tools, and vice-versa).

## 3. Connecting a client
The adapter speaks MCP over Streamable HTTP. The easiest, proven bridge is `@automattic/mcp-wordpress-remote`.

**Codex CLI** (`~/.codex/config.toml`):
```toml
[mcp_servers.learnpress]
command = "npx"
args = ["-y", "@automattic/mcp-wordpress-remote@latest"]

[mcp_servers.learnpress.env]
WP_API_URL = "https://lp.test/wp-json/lp/v1/mcp"
WP_API_USERNAME = "ck_xxxxxxxx"
WP_API_PASSWORD = "cs_xxxxxxxx"
OAUTH_ENABLED = "false"
NODE_TLS_REJECT_UNAUTHORIZED = "0"   # only for self-signed local certs
```

**Claude Code** (`.mcp.json` in the project root, then restart + approve):
```json
{
  "mcpServers": {
    "learnpress": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@automattic/mcp-wordpress-remote@latest"],
      "env": {
        "WP_API_URL": "https://lp.test/wp-json/lp/v1/mcp",
        "WP_API_USERNAME": "ck_xxxxxxxx",
        "WP_API_PASSWORD": "cs_xxxxxxxx",
        "OAUTH_ENABLED": "false",
        "NODE_TLS_REJECT_UNAUTHORIZED": "0"
      }
    }
  }
}
```
> Secrets live in plaintext in these files — keep them out of shared/committed locations.

**Raw curl** (JSON-RPC over the endpoint):
```bash
curl -sk https://lp.test/wp-json/lp/v1/mcp \
  -u 'ck_xxxx:cs_xxxx' -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## 4. How the adapter exposes the tools
The adapter publishes three meta-tools; LearnPress abilities are run **through** them:
- `mcp-adapter-discover-abilities` — list all abilities.
- `mcp-adapter-get-ability-info` `{ability_name}` — schema/description for one ability.
- `mcp-adapter-execute-ability` `{ability_name, parameters}` — **run an ability**, e.g. `ability_name: "learnpress/create-course"`, `parameters: { "title": "…" }`.

In an MCP client these appear as `mcp__learnpress__mcp-adapter-execute-ability`, etc.

---

## 5. Ability reference

### Read tools (scope `read`)
| Ability | Required input | Optional input | Returns |
|---|---|---|---|
| `learnpress/get-courses` | — | `status`, `category`, `instructor`, `price_min`, `price_max`, `search`, `page`, `per_page` | `{ items[], pagination }` |
| `learnpress/get-course-details` | `course_id` | — | `{ course: {…, curriculum{sections[],items_count}} }` |
| `learnpress/list-lessons` | `course_id` | `section_id`, `status`, `page`, `per_page` | `{ items[], pagination }` |
| `learnpress/get-lesson-details` | `lesson_id` | — | `{ lesson: {…, materials[]} }` |
| `learnpress/list-quizzes` | `course_id` | `page`, `per_page` | `{ items[], pagination }` |
| `learnpress/get-quiz-details` | `quiz_id` | — | `{ quiz: {…, questions[]} }` (see privacy note) |
| `learnpress/get-student-progress` | `user_id`, `course_id` | — | `{ progress: {user, course, enrollment, result} }` |
| `learnpress/get-enrollments` | — | `course_id`, `user_id`, `status`, `page`, `per_page` | `{ items[], pagination }` |

### Course tools (scope `write`)
| Ability | Required | Optional | Notes |
|---|---|---|---|
| `learnpress/create-course` | `title` | `status`, `description`, `excerpt`, `instructor_id`, `category_ids[]`, `tag_ids[]`, `price`, `sale_price`, `duration`, `level`, `featured_image_id`, `requirements[]`, `target_audiences[]`, `features[]`, `faqs[{question,answer}]` | **Default status `draft`.** Returns `course_id, title, status, permalink, edit_url`. |
| `learnpress/update-course` | `course_id` | any create field | Updates only provided fields; returns the full course object. |
| `learnpress/delete-course` | `course_id` | — | **Trash** (reversible). Returns `trashed, course_id, previous_status, recovery`. |

### Section tools (scope `write`)
| Ability | Required | Optional | Notes |
|---|---|---|---|
| `learnpress/create-section` | `course_id`, `name` | `description`, `order` | |
| `learnpress/update-section` | `course_id`, `section_id` | `name`, `description`, `order` | |
| `learnpress/delete-section` | `course_id`, `section_id` | — | **Relationship-safe**: removes the section, **preserves** its lessons/quizzes; returns `affected_items` + `recovery`. |

### Lesson tools (scope `write`)
| Ability | Required | Optional | Notes |
|---|---|---|---|
| `learnpress/create-lesson` | `course_id`, `section_id`, `title` | `content`, `excerpt`, `status`, `duration`, `preview`, `video_intro`, `order` | **Default status `draft`.** |
| `learnpress/update-lesson` | `lesson_id` | `title`, `content`, `excerpt`, `status`, `duration`, `preview`, `video_intro`, `section_id` (move), `order` | |
| `learnpress/delete-lesson` | `lesson_id` | `course_id`, `section_id` (validate location) | **Trash + remove from curriculum** (reversible); returns `recovery`. |

### Quiz tools (scope `write`)
| Ability | Required | Optional | Notes |
|---|---|---|---|
| `learnpress/create-quiz` | `course_id`, `section_id`, `title` | `content`, `status`, `duration`, `passing_grade` (0–100), `retake_count`, `instant_check`, `negative_marking`, `show_correct_review`, `order` | **Default status `draft`.** |
| `learnpress/update-quiz` | `quiz_id` | settings above + `section_id` (move), `order` | |
| `learnpress/delete-quiz` | `quiz_id` | `course_id`, `section_id` | **Trash + remove from curriculum** (reversible). Question relationships/posts preserved. |

### Quiz question tools (scope `write`)
| Ability | Required | Optional | Notes |
|---|---|---|---|
| `learnpress/add-quiz-question` | `quiz_id`, `title`, `type` | `content`, `mark`, `order`, `answers[]`, `explanation`, `hint` | Returns `question_id, quiz_id, type, mark, answers_count`. |
| `learnpress/update-quiz-question` | `quiz_id`, `question_id` | `title`, `content`, `type`, `mark`, `order`, `answers[]`, `explanation`, `hint` | `answers` = desired set (omit to keep existing). |
| `learnpress/delete-quiz-question` | `quiz_id`, `question_id` | — | **Relationship-only**: detaches from the quiz, **keeps the question post**; returns `recovery`. |

`answers[]` items: `{ title (required), is_correct (bool), value?, answer_id? }`. Question `type`: `single_choice`, `multi_choice`, `true_or_false`, `fill_in_blanks`.

### Enrollment tools (scope `write`)
| Ability | Required | Optional | Notes |
|---|---|---|---|
| `learnpress/enroll-student` | `user_id`, `course_id` | `status` (`enrolled`/`purchased`), `start_time` | **Default `enrolled`.** Won't duplicate an active enrollment (returns it with `already_enrolled:true`). |
| `learnpress/update-enrollment` | `enrollment_id` | `user_id`, `course_id`, `status`, `graduation`, `start_time`, `end_time` | Validates state values; see guards below. |

---

## 6. Behavior & safety rules
- **Strict input** — every tool rejects unknown properties (`additionalProperties:false`).
- **Post status allowlist** — `draft`, `publish`, `pending`. New lessons/quizzes default to **draft**; courses default to **draft** (publish explicitly or via `update-course`).
- **Reversible deletes only** — no `force`/hard/permanent delete is exposed. Courses/lessons/quizzes are **trashed**; sections and quiz-questions are removed at the **relationship** level with their posts preserved. Every delete returns `recovery` metadata. Restore from *wp-admin → Trash* or re-create the relationship.
- **Quiz answer privacy** — `get-quiz-details` returns `is_correct`, `hint`, and `explanation` **only** to a privileged context (a user who can edit the quiz, or `manage_options`). Students/low-privilege keys get question + answer text **without** correctness.
- **Enrollment guards** — creation status is restricted to `enrolled`/`purchased` (use `update-enrollment` for finished/cancel); a `finished`/`completed` enrollment **cannot be silently reopened** to an active state. Valid statuses: `enrolled, finished, purchased, completed, cancel`; graduation: `in-progress, passed, failed`.
- **Answer validation** — `single_choice` needs ≥2 answers and exactly 1 correct; `multi_choice` needs ≥2 answers and ≥1 correct; `true_or_false` needs exactly 2 answers and 1 correct.
- **Capabilities** — every write/sensitive read checks the current user's capability (e.g. `edit_post`/`delete_post`) on top of the API-key scope.

## 7. Error responses
| HTTP | When | Example code |
|---|---|---|
| 400 | invalid input / invalid state | `lp_mcp_invalid_input` |
| 401 | missing/invalid auth | `learnpress_mcp_missing_auth`, `learnpress_mcp_api_key_required` |
| 403 | insufficient scope or capability | `learnpress_mcp_insufficient_scope`, `learnpress_mcp_missing_base_capability`, `lp_mcp_forbidden` |
| 404 | entity not found | `lp_mcp_not_found` |
| 500 | unexpected failure | `lp_mcp_internal_error` |

> Some MCP bridges surface non-success as a generic "tool error" — the underlying status/code is still produced by the abilities.

## 8. Worked example — build a course
Run these `execute-ability` calls in order, feeding each returned id into the next:
1. `create-course` `{ "title": "PHP Intermediate", "status": "draft", "price": 0, "level": "intermediate", "requirements": ["…"] }` → `course_id`.
2. `create-section` `{ "course_id", "name": "Object-Oriented PHP", "order": 1 }` → `section_id`. (Repeat per section.)
3. `create-lesson` `{ "course_id", "section_id", "title": "Classes & Objects", "content": "<p>…</p>", "status": "publish", "preview": true }`.
4. `create-quiz` `{ "course_id", "section_id", "title": "OOP Quiz", "status": "publish", "passing_grade": 80 }` → `quiz_id`.
5. `add-quiz-question` `{ "quiz_id", "title": "Which keyword inherits a class?", "type": "single_choice", "answers": [ {"title":"extends","is_correct":true}, {"title":"implements","is_correct":false} ] }`.
6. `update-course` `{ "course_id", "status": "publish" }` to go live.
7. Verify with `get-course-details` `{ "course_id" }`.

## 9. Tips & gotchas
- **Item ordering:** items append in creation order. When scripting in parallel, create **one item per section per pass** (or pass `order`) to avoid concurrent-order races.
- **Ampersands in titles** are returned HTML-entity-encoded (`&#038;`) — cosmetic; they render as `&`.
- **`free`** = `price: 0`. There is no prerequisite-course field in core; state it in `requirements`/`description`.
- **Idempotency:** re-running a create sequence makes a *new* course. Create once, then use the `update-*` tools.
- **Recovery:** keep the `recovery` block returned by delete tools — it has the course/section/order needed to restore.

## 10. Suggested prompts (create / update a course from a subject)
Give these to your MCP-connected assistant (Claude, Codex, etc.). The clearer the structure and constraints, the more consistent the result — name the **subject, level, audience, structure, pricing, and publish state**, and ask it to **verify and report IDs** at the end.

### Create — fill-in template
```
Using the LearnPress MCP tools, create a {level} course on "{subject}".

- Audience: {who it's for}
- Structure: {N} sections; each section = {M} lessons + 1 quiz with {K} questions
  (mix single_choice, multi_choice, and true_or_false; mark correct answers)
- Lessons: real HTML bodies — short intro, key concepts, one code/example block, a recap list
- Pricing: {free | $PRICE}; Level: {level}; Requirements: {prerequisites}
- Create the course as draft; create lessons/quizzes as published; make the first
  lesson of section 1 a preview; then publish the course at the end.
- When done, verify with get-course-details and report the course_id, edit URL, and curriculum.
```

### Create — ready examples
- `Create a beginner course on "JavaScript Fundamentals" via the LearnPress MCP tools — 4 sections, each with 2 lessons + a 3-question quiz, free, first lesson preview. Build it draft→publish and show me the course_id and curriculum.`
- `Create an intermediate course on "WordPress REST API for plugin developers": 5 sections (2 lessons + a quiz each), paid $49, level intermediate, requirements = PHP basics + WordPress plugin basics. Publish it and list the section/lesson/quiz IDs.`
- `Draft (don't publish yet) a course on "Docker for Beginners" — propose a 5-section outline first, wait for my OK, then build it with the LearnPress MCP tools.`

### Update — fill-in template
```
Using the LearnPress MCP tools, update course {course_id} ("{title}"):
{the precise change(s)}.
Keep everything else unchanged, then confirm with get-course-details.
```
If you don't know the id: `Find the course titled "{title}" with get-courses, then …`.

### Update — ready examples
- `In course 35491 (PHP Intermediate), add a section "Testing with PHPUnit" at the end with 2 lessons + a 3-question quiz, keep the course published.`
- `Make course 35491 paid: set price 39 and sale_price 29, add the category "Programming", and set featured image to attachment 1234.`
- `Publish course 35491 and change its level to "advanced".`
- `In the "OOP Fundamentals" quiz of course 35491, fix the inheritance question: make "extends" the only correct answer and add a hint.`
- `Rename section 141 to "OOP in PHP" and move it to position 1.`
- `Add an extra true/false question to every quiz in course 35491 about the section's topic.`

### Prompting tips
- **Let it plan first** for big courses: "propose the outline, wait for my approval, then build" — cheaper to correct an outline than a built course.
- **Be explicit about publish state** — items default to *draft*; say "publish lessons/quizzes and the course" if you want it live.
- **Free vs paid:** "free" → `price 0`; for paid give a number (and optional sale price).
- **Deletes are reversible** — "remove section X" trashes/detaches with recovery metadata; say so if you want it gone.
- **Ask for verification** — "confirm with get-course-details and report IDs" catches mistakes immediately.
- **Reference existing content** — "continue from course {id}" or "match the structure of course {id}" reuses a known-good shape.

---
*Phase 2 surface is intentionally scoped: assignments, Q&A, announcements, review moderation, bulk import/export, and hard delete are out of scope.*
