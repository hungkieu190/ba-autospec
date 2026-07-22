# Code-to-Document — Implementation Plan (Prompt Spec)

> File này là **kế hoạch dạng prompt** để xây tool **code-to-document**.  
> Dùng làm spec cho dev + làm system context cho AI Agent khi implement / vận hành tool.

---

## 0. One-line mission

Xây tool CLI **code-to-document**: người dùng mô tả concept/feature trong `input.md` → tool sinh **prompt + lệnh paste** cho AI Agent → AI Agent **đọc code tham chiếu** + **bắt buộc đọc required skills** → xuất **2 file** (VI review + EN final) theo format `sample-request.md`.

---

## 1. Product definition

### 1.1 Tên tool
`code-to-document`

### 1.2 Mục tiêu
Chuyển **ý tưởng feature + codebase hiện có** thành **product documentation request** chuẩn (template `sample-request.md`), phục vụ bước tiếp theo (product docs / PRD / marketing / build).

### 1.3 Tác nhân chính
**AI Agent** (Claude / Cursor / Kilo / tương đương) là engine phân tích & sinh tài liệu.  
Tool Node.js chỉ lo: scaffold project, validate input, generate agent prompt, copy skills, hướng dẫn chạy.

### 1.4 Không làm gì
- Không tự viết PRD dài ngoài template output.
- Không sửa code trong `/code`.
- Không gọi LLM API trực tiếp (phase 1): workflow = generate prompt → user paste vào AI Agent chat.
- Không thay thế product manager; chỉ chuẩn hóa đầu vào.

---

## 2. Directory architecture

```
code-to-document/                 # root repo của tool
├── package.json
├── README.md
├── sample-request.md             # template output chuẩn (source of truth)
├── code-to-document-functions.md # file plan này
│
├── code/                         # CODE THAM CHIẾU (read-only cho Agent)
│   └── learnpress/               # ví dụ: source LearnPress / plugin liên quan
│       └── ...
│
├── skills/                       # REQUIRED LIB SKILLS (bắt buộc Agent đọc)
│   ├── README.md                 # index + thứ tự đọc
│   ├── business-analyst.md
│   ├── product-manager.md
│   ├── technical-writer.md
│   ├── documentation-engineer.md
│   ├── wordpress-master.md
│   ├── competitive-analyst.md
│   ├── market-researcher.md
│   ├── project-idea-validator.md
│   ├── codebase-orchestrator.md
│   ├── knowledge-synthesizer.md
│   └── prompt-engineer.md
│
├── templates/
│   ├── input.md                  # template cho projects/<name>/input.md
│   ├── agent-prompt.md.hbs       # template sinh agent-prompt.md (hoặc .md)
│   └── sample-request.md         # copy từ root sample-request.md
│
├── bin/
│   └── c2d.js                    # CLI entry (optional alias)
│
├── src/
│   ├── cli.js                    # commander / yargs entry
│   ├── commands/
│   │   ├── init.js               # npm run init
│   │   ├── generate.js           # npm run generate (sau khi có input.md)
│   │   ├── validate.js           # kiểm tra input/output
│   │   └── list.js               # liệt kê projects
│   ├── lib/
│   │   ├── paths.js
│   │   ├── scaffold.js
│   │   ├── prompt-builder.js
│   │   ├── skills.js
│   │   └── fs-utils.js
│   └── config.js
│
└── projects/                     # mỗi lần init = 1 project
    └── <project-slug>/
        ├── input.md              # user viết yêu cầu
        ├── meta.json             # name, createdAt, status
        ├── agent-prompt.md       # prompt đã generate (sau npm run generate)
        ├── RUN.txt               # 1 dòng lệnh / instruction paste vào Agent
        └── output/
            ├── product-request.vi.md   # bản VI để user check
            └── product-request.en.md   # bản EN final
```

### 2.1 Quy ước path (quan trọng)

| Path | Vai trò | Agent được phép |
|------|---------|-----------------|
| `/code` | Source tham chiếu (thường LearnPress) | **Read only** |
| `/skills` | Required skill lib | **Read only, bắt buộc đọc trước khi viết output** |
| `/projects/<name>/input.md` | Yêu cầu user | Read |
| `/projects/<name>/output/` | Kết quả | **Write only vào đây** |
| `/sample-request.md` | Schema output | Read, bám đúng sections |

---

## 3. CLI & npm scripts

### 3.1 package.json scripts

```json
{
  "name": "code-to-document",
  "version": "1.0.0",
  "type": "module",
  "bin": {
    "c2d": "./bin/c2d.js"
  },
  "scripts": {
    "init": "node src/cli.js init",
    "generate": "node src/cli.js generate",
    "validate": "node src/cli.js validate",
    "list": "node src/cli.js list"
  }
}
```

### 3.2 `npm run init`

**Hành vi:**
1. Prompt nhập:
   - `Project name` (bắt buộc) → slugify: `lp-ie-quiz`
   - `Display title` (optional)
   - `Short note` (optional)
2. Validate slug: `[a-z0-9-]+`, không trùng `projects/<slug>`
3. Tạo:
   ```
   projects/<slug>/
     input.md          # từ templates/input.md
     meta.json
     output/           # empty, có .gitkeep
   ```
4. In hướng dẫn:
   ```
   ✓ Created projects/lp-ie-quiz
   1. Edit: projects/lp-ie-quiz/input.md
   2. Run:  npm run generate -- --project lp-ie-quiz
   3. Paste RUN.txt vào AI Agent chat
   ```

### 3.3 `npm run generate -- --project <slug>`

**Hành vi:**
1. Đọc `projects/<slug>/input.md`
2. Fail nếu input còn placeholder quá nhiều / rỗng phần "Yêu cầu chính"
3. Sinh:
   - `projects/<slug>/agent-prompt.md` — full prompt cho Agent
   - `projects/<slug>/RUN.txt` — dòng paste ngắn + path tuyệt đối/tương đối
4. In:
   ```
   ✓ Generated agent-prompt.md
   ✓ Generated RUN.txt

   === PASTE THIS INTO AI AGENT ===
   Đọc và thực thi file: projects/lp-ie-quiz/agent-prompt.md
   (Workspace root = code-to-document)
   =================================
   ```

### 3.4 `npm run validate -- --project <slug>`

Kiểm tra:
- `input.md` có section bắt buộc
- `output/product-request.vi.md` + `.en.md` tồn tại (nếu đã chạy agent)
- Mỗi file output có đủ headings theo `sample-request.md`
- Báo missing sections

### 3.5 `npm run list`

Liệt kê projects + status (`draft` | `prompt-ready` | `documented`)

---

## 4. templates/input.md (user fills)

```markdown
# Code-to-Document Input

## Project Name
<!-- auto-filled by init, user may edit display name -->

## Request (mô tả càng chi tiết càng tốt)
<!-- BẮT BUỘC -->
Ví dụ: Tôi muốn lên concept cho tính năng X trong LearnPress.
- Bối cảnh:
- Người dùng:
- Pain point:
- Mong muốn:
- Ràng buộc:
- Tham chiếu code (nếu biết path):

## Focus Areas (optional)
- [ ] Product concept
- [ ] Feature scope
- [ ] Competitors
- [ ] Integrations
- [ ] Pricing hints
- [ ] Risks

## Code Hints (optional)
Paths trong /code cần ưu tiên đọc:
- code/learnpress/...

## Extra Notes
```

---

## 5. Required Skills Library

### 5.1 Nguyên tắc chọn lọc
Chỉ giữ skill **tối cần** cho pipeline:  
**đọc code → hiểu domain WP/LMS → phân tích product → cạnh tranh → viết docs 2 ngôn ngữ**.

Không copy cả `all-skills/`. Không skill infra/security/ML không liên quan.

### 5.2 Danh sách BẮT BUỘC (copy từ `all-skills/`)

| # | Source path | Target `skills/` | Vai trò trong pipeline |
|---|-------------|------------------|------------------------|
| 1 | `08-business-product/business-analyst.md` | `business-analyst.md` | Elicit requirements, gap analysis, scope |
| 2 | `08-business-product/product-manager.md` | `product-manager.md` | Prioritize must/nice, goals, metrics |
| 3 | `08-business-product/technical-writer.md` | `technical-writer.md` | Viết rõ, đúng audience, 2 ngôn ngữ |
| 4 | `06-developer-experience/documentation-engineer.md` | `documentation-engineer.md` | Cấu trúc docs, consistency, template fidelity |
| 5 | `08-business-product/wordpress-master.md` | `wordpress-master.md` | Domain WP plugin/theme, hooks, LMS context |
| 6 | `10-research-analysis/competitive-analyst.md` | `competitive-analyst.md` | Competitors / alternatives section |
| 7 | `10-research-analysis/market-researcher.md` | `market-researcher.md` | Target users, market framing |
| 8 | `10-research-analysis/project-idea-validator.md` | `project-idea-validator.md` | Validate idea, risks, out-of-scope |
| 9 | `09-meta-orchestration/codebase-orchestrator.md` | `codebase-orchestrator.md` | Map `/code`, đọc có hệ thống, không hallucinate |
| 10 | `09-meta-orchestration/knowledge-synthesizer.md` | `knowledge-synthesizer.md` | Gộp insight code + request → 1 product brief |
| 11 | `05-data-ai/prompt-engineer.md` | `prompt-engineer.md` | (Internal) chuẩn hóa cách Agent follow prompt |

### 5.3 skills/README.md — thứ tự đọc BẮT BUỘC

Agent **MUST** đọc theo thứ tự:

1. `skills/README.md` (protocol)
2. `skills/codebase-orchestrator.md`
3. `skills/wordpress-master.md` (nếu product liên quan WP/LearnPress)
4. `skills/business-analyst.md`
5. `skills/product-manager.md`
6. `skills/project-idea-validator.md`
7. `skills/competitive-analyst.md`
8. `skills/market-researcher.md`
9. `skills/knowledge-synthesizer.md`
10. `skills/documentation-engineer.md`
11. `skills/technical-writer.md`
12. `skills/prompt-engineer.md` (optional nếu đã rõ format)

### 5.4 Copy policy khi implement tool
- Script `npm run setup:skills` (optional) copy từ `all-skills/` → `skills/` theo map trên.
- Hoặc commit sẵn folder `skills/` trong repo.
- Agent **không** được đọc lung tung `all-skills/`; chỉ `skills/`.

---

## 6. Agent Prompt Spec (`agent-prompt.md`)

### 6.1 Mục tiêu prompt
Khi user paste `RUN.txt` / mở `agent-prompt.md`, Agent phải:

1. Đọc required skills (mục 5.3)
2. Đọc `projects/<slug>/input.md`
3. Đọc `sample-request.md` (schema output)
4. Khảo sát `/code` liên quan request (không đọc mù toàn repo nếu quá lớn — ưu tiên path hints + search)
5. Sinh đúng 2 file output
6. Không hỏi lan man; chỉ hỏi nếu **blocker** (thiếu hẳn product idea)

### 6.2 Template nội dung `agent-prompt.md` (tool generate)

```markdown
# CODE-TO-DOCUMENT — AGENT EXECUTION PROMPT

You are the **Code-to-Document Agent**.
Your job: turn a feature/product idea + existing codebase into a structured Product Documentation Generator Input.

## Hard rules
1. READ-ONLY on `/code` and `/skills`. Never modify them.
2. WRITE ONLY under: `projects/{{slug}}/output/`
3. You MUST read required skills in order listed in `skills/README.md` before drafting.
4. Output MUST follow sections of `sample-request.md` exactly (same headings).
5. Produce BOTH:
   - `projects/{{slug}}/output/product-request.vi.md` (Vietnamese, for human review)
   - `projects/{{slug}}/output/product-request.en.md` (English, FINAL)
6. EN file is source-of-truth quality: clear, professional, no placeholder leftovers.
7. VI file is faithful translation/adaptation of EN (or draft VI then polish EN — but final pair must be consistent).
8. Ground claims in `/code` when possible. If unknown, write `Unknown` — do not invent APIs/plugins.
9. Prefer concrete features inferred from code + input over generic fluff.

## Context paths
- Workspace root: code-to-document
- User input: `projects/{{slug}}/input.md`
- Code reference: `code/`
- Skills lib: `skills/`
- Output schema: `sample-request.md`
- Write to: `projects/{{slug}}/output/`

## Execution steps (mandatory order)
### Step 0 — Load protocol
- Read `skills/README.md`
- Read required skills in the mandated order (at least skim full files; internalize checklists)

### Step 1 — Load request + schema
- Read `projects/{{slug}}/input.md`
- Read `sample-request.md`

### Step 2 — Code reconnaissance
- Map relevant parts of `code/` (LearnPress / related plugins)
- Use Glob/Grep for feature keywords from input
- Note: existing modules, hooks, CPT, REST, templates, settings pages, integrations
- Build a short internal memo (do not write memo file unless useful):
  - What already exists
  - What is missing for the requested concept
  - Technical constraints visible in code

### Step 3 — Product synthesis
Apply mindsets from skills:
- BA: problem, users, requirements, scope
- PM: must-have vs nice-to-have, goals, metrics
- Validator: risks, out of scope
- Competitive: alternatives (from knowledge + any evidence; else Unknown)
- WP master: product type, integrations realistic for WP/LMS

### Step 4 — Write outputs
Create/overwrite:
1. `product-request.en.md`
2. `product-request.vi.md`

Each file MUST contain ALL sections from sample-request.md:

# Product Documentation Generator Input

## Project Name
## Product Idea
## Product Type
## Target Users
## User Roles
## Core Problem
## Proposed Solution
## Must-Have Features
## Nice-To-Have Features
## Out Of Scope
## Competitors Or Alternatives
## Integrations
## Pricing Or Revenue Model
## SEO Keywords
## Business Goals
## Success Metrics
## Risks Or Constraints
## Notes

### Step 5 — Self-check
- [ ] All sections present in BOTH files
- [ ] No empty critical sections (Product Idea, Core Problem, Solution, Must-Have)
- [ ] Features actionable and specific
- [ ] Out of Scope explicit
- [ ] EN is final quality; VI is reviewable Vietnamese
- [ ] No secrets, no invented proprietary competitor data presented as fact
- [ ] Project Name matches meta/input

### Step 6 — Done signal
Print short summary:
- Files written
- Top 5 must-have features
- Any `Unknown` fields that need human fill

## Embedded user input
{{INPUT_MD_CONTENT}}

## Project meta
- slug: {{slug}}
- created: {{createdAt}}
```

### 6.3 `RUN.txt` content example

```
Read and fully execute: projects/lp-ie-quiz/agent-prompt.md

Rules: follow that file exactly. Load skills/ first, analyze code/, write both output files under projects/lp-ie-quiz/output/.
```

---

## 7. Output contract (bám `sample-request.md`)

### 7.1 Hai file bắt buộc

| File | Language | Purpose |
|------|----------|---------|
| `output/product-request.vi.md` | Tiếng Việt | User review / chỉnh tay nhanh |
| `output/product-request.en.md` | English | Final handoff cho pipeline docs tiếp theo |

### 7.2 Section rules

- **Project Name**: slug hoặc display name rõ ràng  
- **Product Idea**: 1–3 đoạn, concrete  
- **Product Type**: một trong: WordPress Plugin, WordPress Theme, Shopify Theme, Shopify App, SaaS Product, LMS Add-on, eCommerce Extension, Other  
- **Target Users**: primary + secondary  
- **User Roles**: list  
- **Core Problem**: painful, specific  
- **Proposed Solution**: how product solves it  
- **Must-Have Features**: bullet, 5–12 items, testable  
- **Nice-To-Have Features**: bullet  
- **Out Of Scope**: explicit exclusions  
- **Competitors Or Alternatives**: list or `Unknown`  
- **Integrations**: LP, Woo, H5P, etc. based on code/input  
- **Pricing Or Revenue Model**: one-time / subscription / freemium / … / unknown  
- **SEO Keywords**: list or Unknown  
- **Business Goals**: business outcomes  
- **Success Metrics**: measurable  
- **Risks Or Constraints**: tech/market/legal/support  
- **Notes**: extra context, code findings summary  

### 7.3 Quality bar
- Không copy nguyên input thô vào mọi section.
- Features phải phản ánh **gap so với code hiện có** khi có thể.
- Nếu input mơ hồ: Agent suy luận có kiểm soát + ghi giả định trong Notes.

---

## 8. End-to-end user workflow

```
[1] Chuẩn bị code tham chiếu
    Đặt source vào: code/learnpress/ (hoặc monorepo con)

[2] Init project
    npm run init
    → nhập tên: lp-ie-quiz
    → tạo projects/lp-ie-quiz/input.md

[3] User viết yêu cầu
    Mở input.md, mô tả concept càng chi tiết càng tốt

[4] Generate agent pack
    npm run generate -- --project lp-ie-quiz
    → agent-prompt.md + RUN.txt

[5] Chạy AI Agent
    Mở AI Agent tại workspace root
    Paste nội dung RUN.txt (hoặc @ agent-prompt.md)
    Agent đọc skills + code + input → ghi output/

[6] Review
    Đọc output/product-request.vi.md
    Chỉnh nếu cần; EN là bản final
    npm run validate -- --project lp-ie-quiz

[7] Handoff
    Dùng product-request.en.md làm input cho Product Documentation Generator
```

---

## 9. Implementation prompts (cho dev Agent)

### 9.1 Prompt A — Bootstrap repo

```
Implement the code-to-document CLI tool per code-to-document-functions.md.

Phase 1 scope:
- package.json + npm scripts: init, generate, validate, list
- src/cli.js with commander
- commands: init, generate, validate, list
- templates/input.md
- scaffold projects/<slug>/ structure
- prompt-builder that injects input.md into agent-prompt.md template
- copy/create skills/ from the required skill map in section 5.2
  (source: all-skills/, destination: skills/)
- README with workflow

Do not implement LLM API calls.
Do not modify files under code/ except ensuring folder exists with .gitkeep.
```

### 9.2 Prompt B — Skills pack

```
From all-skills/, copy ONLY these files into skills/ (flatten names as in section 5.2):
- business-analyst, product-manager, technical-writer, documentation-engineer,
  wordpress-master, competitive-analyst, market-researcher, project-idea-validator,
  codebase-orchestrator, knowledge-synthesizer, prompt-engineer

Create skills/README.md with:
- purpose of required lib
- mandatory read order
- rule: Agent must not load other all-skills outside this folder
```

### 9.3 Prompt C — Agent runtime (paste target)

```
You are executing a code-to-document job.
Open and obey projects/<slug>/agent-prompt.md completely.
Produce product-request.vi.md and product-request.en.md under that project's output/.
```

---

## 10. meta.json schema

```json
{
  "name": "lp-ie-quiz",
  "title": "LearnPress Interactive Quiz",
  "createdAt": "2026-07-14T00:00:00.000Z",
  "updatedAt": "2026-07-14T00:00:00.000Z",
  "status": "draft",
  "paths": {
    "input": "projects/lp-ie-quiz/input.md",
    "agentPrompt": "projects/lp-ie-quiz/agent-prompt.md",
    "outputVi": "projects/lp-ie-quiz/output/product-request.vi.md",
    "outputEn": "projects/lp-ie-quiz/output/product-request.en.md"
  }
}
```

Status machine:
- `draft` — sau init
- `prompt-ready` — sau generate
- `documented` — sau khi validate thấy đủ 2 output files

---

## 11. Acceptance criteria

### Tool
- [ ] `npm run init` tạo đúng folder + input.md
- [ ] `npm run generate` tạo agent-prompt.md + RUN.txt có path đúng
- [ ] `skills/` chỉ còn skill essential (≤ 12 files + README)
- [ ] `code/` tồn tại, documented là read-only reference

### Agent job
- [ ] Agent đọc skills trước khi viết
- [ ] Agent tham chiếu code khi mô tả integrations/features
- [ ] Có đủ 2 file VI + EN
- [ ] EN/VI cùng structure `sample-request.md`
- [ ] Không còn placeholder `Feature 1` kiểu template trống
- [ ] Unknown fields dùng chữ `Unknown` thay vì bịa

### Quality
- [ ] Must-have features specific, có thể dev được
- [ ] Out of scope rõ
- [ ] Product Type hợp domain (thường LMS Add-on / WordPress Plugin với LearnPress)

---

## 12. Phase roadmap

### Phase 1 — MVP (làm ngay)
- CLI init/generate/validate/list
- Skills pack curated
- Agent prompt template
- Manual paste vào AI Agent
- Dual output VI/EN

### Phase 2 — UX
- `c2d init` interactive better (inquirer)
- Watch mode: generate khi save input.md
- Diff/validate section-by-section
- Example projects under `projects/_examples/`

### Phase 3 — Automation (optional)
- Optional `npm run agent` nếu có API key (Claude/OpenAI)
- Vẫn giữ mode paste-to-agent

---

## 13. Prompt tổng để implement toàn bộ (copy-paste)

```
Bạn là senior engineer. Hãy implement tool "code-to-document" theo đúng spec trong
file code-to-document-functions.md tại root workspace.

Yêu cầu cứng:
1) AI Agent là tác nhân chính phân tích; CLI chỉ scaffold + generate prompt.
2) Thư mục code/ là code tham chiếu read-only (LearnPress thường nằm trong đây).
3) npm run init: hỏi tên → tạo projects/<slug>/ + input.md + output/ + meta.json.
4) Sau khi user điền input.md: npm run generate -- --project <slug>
   → sinh agent-prompt.md + RUN.txt để paste vào AI Agent.
5) Agent phải đọc bộ skills required trong skills/ (copy/filter từ all-skills theo map section 5),
   đọc code/, đọc input, xuất:
   - projects/<slug>/output/product-request.vi.md
   - projects/<slug>/output/product-request.en.md
   đúng headings sample-request.md.
6) Không gọi LLM API ở phase 1.
7) Viết README ngắn: workflow 7 bước.

Deliverables:
- package.json, src/**, templates/**, skills/**, code/.gitkeep, projects/.gitkeep, README.md
- Không xóa all-skills/; skills/ là subset bắt buộc.
```

---

## 14. Prompt tổng để CHẠY 1 job (user paste vào AI Agent)

```
Thực thi job code-to-document.

1. Đọc và tuân thủ 100% file:
   projects/<SLUG>/agent-prompt.md
2. Đọc skills theo skills/README.md (bắt buộc).
3. Đọc projects/<SLUG>/input.md và sample-request.md.
4. Phân tích code trong code/ liên quan request.
5. Ghi output:
   - projects/<SLUG>/output/product-request.vi.md  (tiếng Việt — để review)
   - projects/<SLUG>/output/product-request.en.md  (English — FINAL)
6. Đủ mọi section của sample-request.md. Không bịa khi không biết — ghi Unknown.
7. Khi xong: tóm tắt files + must-have features + fields Unknown.
```

---

## 15. Open decisions (defaults đã chọn)

| Decision | Default |
|----------|---------|
| LLM API trong CLI | **Không** (phase 1) |
| Output languages | **VI + EN** |
| EN vs VI which is final | **EN final**, VI review |
| Skills location | `skills/` flatten, not nested categories |
| Code path | `code/` multi-package ok |
| Generate without --project | Fail; require flag hoặc prompt chọn |
| Overwrite output | Yes, overwrite on re-run agent |

---

## 16. Definition of Done cho plan này

Plan được coi là đủ khi dev có thể:
1. Tạo CLI theo section 3–4 không cần hỏi lại architecture
2. Copy đúng skill set section 5
3. Sinh agent prompt section 6
4. User chạy E2E section 8 ra 2 file output chuẩn section 7

---

*End of code-to-document plan / prompt spec.*
