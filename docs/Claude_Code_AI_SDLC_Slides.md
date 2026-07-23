# Additional Slides – Applying AI SDLC in Claude Code

## Slide 1 – Organizing AI SDLC in Claude Code

**Key message**

Don't install multiple frameworks directly. Organize the project by SDLC phases.

```text
soc-ai/

├── .claude/
│   └── commands/
│       ├── business/
│       ├── ux/
│       ├── spec/
│       ├── engineering/
│       └── release/
│
├── docs/
│   ├── business/
│   ├── architecture/
│   ├── ux/
│   ├── specs/
│   └── adr/
│
├── src/
├── tests/
└── README.md
```

---

## Slide 2 – Command Mapping

| Command | Phase | Based on |
|---------|-------|----------|
| `/vision` | Business | BMAD |
| `/prd` | Business | BMAD |
| `/persona` | Business | BMAD |
| `/architecture` | Business | BMAD |
| `/user-journey` | UX | Custom |
| `/wireframe` | UX | Custom |
| `/prototype` | UX | Custom |
| `/spec` | Specification | Spec-Kit |
| `/plan` | Specification | Spec-Kit |
| `/tasks` | Specification | Spec-Kit |
| `/implement` | Engineering | Matt Skills |
| `/test` | Engineering | Matt Skills |
| `/review` | Engineering | Matt Skills |
| `/refactor` | Engineering | Matt Skills |
| `/release` | Release | BMAD |

---

## Slide 3 – Demo: Create a New Project

```bash
mkdir soc-ai
cd soc-ai
claude
```

Run:

```text
/vision
```

Output:

- docs/business/Vision.md

Then:

```text
/prd
/persona
/architecture
```

Outputs:

- PRD.md
- Persona.md
- Architecture.md

**Project foundation completed.**

---

## Slide 4 – Demo: Build a Feature

Feature:

> AI Investigation Assistant

Commands:

```text
/spec
```

↓

Specification.md

```text
/plan
```

↓

ImplementationPlan.md

```text
/tasks
```

↓

Task backlog

Example:

- Task 1 – Alert Repository
- Task 2 – IOC Service
- Task 3 – LLM Adapter
- Task 4 – Investigation Workflow

---

## Slide 5 – Engineering Workflow

For each task:

```text
/implement Task-1
```

↓

Generate implementation

```text
/test Task-1
```

↓

Generate unit tests

```text
/review
```

↓

Review code

```text
/refactor
```

↓

Improve quality

```text
/release
```

↓

Prepare merge & release

---

## Slide 6 – Complete AI SDLC Workflow

```text
Business
    /vision
    /prd
    /persona
    /architecture

        ↓

UX
    /user-journey
    /wireframe
    /prototype

        ↓

Specification
    /spec
    /plan
    /tasks

        ↓

Engineering
    /implement
    /test
    /review
    /refactor

        ↓

Release
    /release
```

---

## Slide 7 – Cheat Sheet

| Goal | Command |
|------|---------|
| Create vision | `/vision` |
| Write PRD | `/prd` |
| Define personas | `/persona` |
| Design UX | `/wireframe` |
| Create specification | `/spec` |
| Plan implementation | `/plan` |
| Generate tasks | `/tasks` |
| Implement feature | `/implement` |
| Generate tests | `/test` |
| Review code | `/review` |
| Refactor | `/refactor` |
| Prepare release | `/release` |

---

## Slide 8 – Build Your Own Claude Commands

```text
.claude/

└── commands/

    business/
        vision.md
        prd.md
        persona.md
        architecture.md

    ux/
        wireframe.md
        user-journey.md

    spec/
        spec.md
        plan.md
        tasks.md

    engineering/
        implement.md
        test.md
        review.md
        refactor.md

    release/
        release.md
```

Each command is simply a reusable prompt.

- BMAD → Business prompts
- Spec-Kit → Specification prompts
- Matt Skills → Engineering prompts

This creates a unified AI SDLC experience inside Claude Code.
