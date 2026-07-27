# AI SDLC Toolkit

A copy-paste toolkit that gives your AI coding agent a disciplined, five-phase
Business → UX → Specification → Engineering → Release workflow, distilled from four
AI-assisted software development methodologies. Works with **Claude Code** and **Codex CLI**.
This repo *is* the toolkit — install it into any project with one command (see below).

> **Quick start:** on Claude Code, run `/guide` at any time for a full cheat sheet of every
> command, the workflow order, and the status of features already in progress under
> `docs/specs/`.

## What this is

A **hybrid** of slash commands and Agent Skills: each command (`/business:vision`,
`/spec:spec`, `/engineering:implement`, ...) is a thin, explicit entrypoint that names the
skill(s) it invokes for the actual methodology. Commands give you a predictable interface;
skills carry the reusable engineering discipline and can also auto-activate by relevance
outside the command itself. All five phases from the original design docs are implemented:
17 commands, 17 skills — see "Multi-agent support" below for how Codex CLI gets the same 17
skills without a separate command layer.

## Install

**Option A — npx (recommended, no cloning needed):**

```bash
cd <your-project>
npx github:KiemVM/AI-SDLC                    # Claude Code (default)
npx github:KiemVM/AI-SDLC --target codex      # Codex CLI
npx github:KiemVM/AI-SDLC --target both       # both
```

This installs the toolkit for your chosen agent(s) plus the `docs/` scaffold (folder
conventions, ADR/changelog templates — shared by both agents). Existing files are left
untouched.

```bash
npx github:KiemVM/AI-SDLC --dest ../some-other-project   # install elsewhere
npx github:KiemVM/AI-SDLC --force                          # overwrite existing files
npx github:KiemVM/AI-SDLC --dry-run                         # preview without writing
```

**Option B — manual copy**, for the Claude Code target only, if you already have this repo
checked out locally (the Codex target is generated, not static — use Option A or
`node scripts/build-codex-skills.js` directly instead of copying):

```bash
cp -r .claude docs <your-project>/
```

```powershell
Copy-Item -Recurse .claude,docs <your-project>/
```

## Multi-agent support

`.claude/` (commands + skills) is the **single source of truth**. Codex CLI has no reliable
project-scoped equivalent of Claude Code's thin "commands" layer yet — only project-scoped
Skills (`.codex/skills/<name>/SKILL.md`, the same open [SKILL.md standard](https://agentskills.io)
Claude Code uses). So instead of hand-maintaining a second, easily-drifting copy of every
command and skill, `scripts/build-codex-skills.js` renders `.codex/skills/` from `.claude/` at
install time: each Codex skill is a merge of the matching Claude command's Inputs/Process/
Output-template/Guardrails plus the skill's own methodology, so it's a self-contained
entrypoint (Codex has no separate place to put that content). Two commands that share a skill
(`/engineering:implement` and `/engineering:test` both use `test-driven-development`) merge
into one skill with two workflow subsections; `/guide`, which has no backing skill, becomes
its own skill for Codex.

Edit `.claude/` only — `.codex/skills/` is always derived from it, never hand-edited, so the
two can't drift. On Codex, skills auto-activate by relevance or via `$skill-name`/`/skills`;
there's no `/namespace:command` syntax there the way there is on Claude Code.

## The workflow

```
Business  ->  UX  ->  Specification  ->  Engineering  ->  Release
```

The command syntax below (`/business:vision`, `/spec:spec`, ...) is Claude Code's. On Codex
CLI the same workflow is available as Skills with the same names (e.g. `spec-writing`,
`test-driven-development`) — see "Multi-agent support" above.

| Command | Phase | Goal | Writes |
|---|---|---|---|
| `/business:vision` | Business | Problem, target users, goals, success metrics | `docs/business/Vision.md` |
| `/business:prd` | Business | Vision → product-level epic list | `docs/business/PRD.md` |
| `/business:persona <slug> "<role>"` | Business | Define a user persona | `docs/business/personas/<slug>.md` |
| `/business:architecture` | Business | Living whole-system architecture doc | `docs/architecture/Architecture.md` |
| `/ux:user-journey <persona> <journey> "<scenario>"` | UX | Walk a persona through a scenario | `docs/ux/journeys/<persona>-<journey>.md` |
| `/ux:wireframe <screen> "<purpose>"` | UX | Low-fidelity screen structure | `docs/ux/wireframes/<screen>.md` |
| `/ux:prototype <slug> "<flow>"` | UX | Stitch wireframes into a flow, check readiness | `docs/ux/prototypes/<slug>.md` |
| `/spec:spec <slug> "<desc>"` | Specification | Turn an idea into a testable spec (WHAT/WHY only) | `docs/specs/<slug>/Specification.md` |
| `/spec:plan <slug>` | Specification | Turn the spec into a technical approach | `docs/specs/<slug>/ImplementationPlan.md`, optional ADRs |
| `/spec:tasks <slug>` | Specification | Break the plan into a small, ordered task backlog | `docs/specs/<slug>/Tasks.md` |
| `/engineering:implement <Task-ID>` | Engineering | Implement one task, test-first | source + tests, checks off the task |
| `/engineering:test <Task-ID\|path>` | Engineering | Backfill/strengthen coverage against acceptance criteria | additional tests |
| `/engineering:review [PR#]` | Engineering | Review a diff/PR for bugs and spec/constitution adherence | findings (chat output) |
| `/engineering:refactor [scope]` | Engineering | Improve structure in small, test-verified steps, no behavior change | source changes, optional ADR |
| `/release:release [version]` | Release | Readiness gate + changelog/release notes draft — never tags/pushes/deploys | `docs/release/CHANGELOG.md` entry, PR description (chat) |
| `/decide <slug> "<decision>"` | — (any phase) | Capture a mid-work decision and find what's now stale downstream | ADR + `docs/adr/DECISIONS.md` row |
| `/guide` | — | Cheat sheet + live feature status | (read-only) |

Not every project needs to start at Business — if you already have a clear feature in mind,
jump straight to `/spec:spec`. The upstream phases exist for when you want that discipline.
`/decide` isn't part of the linear flow — run it whenever a decision changes direction that's
already written down (see "Decision log" below).

## Skills behind the commands

| Skill | Used by | Trigger |
|---|---|---|
| `vision-writing` | `/business:vision` | Capturing the product's problem/users/goals |
| `prd-writing` | `/business:prd` | Deriving epics from an approved vision |
| `persona-definition` | `/business:persona` | Defining a user persona |
| `architecture-writing` | `/business:architecture` | Documenting the current whole-system architecture |
| `user-journey-mapping` | `/ux:user-journey` | Walking a persona through a scenario |
| `wireframing` | `/ux:wireframe` | Laying out a screen's structure and priority |
| `prototyping` | `/ux:prototype` | Stitching wireframes into a flow, checking readiness |
| `spec-writing` | `/spec:spec` | Turning a feature idea into a spec |
| `implementation-planning` | `/spec:plan` | Turning an approved spec into a technical plan |
| `task-breakdown` | `/spec:tasks` | Turning a plan into a task backlog |
| `test-driven-development` | `/engineering:implement`, `/engineering:test` | Any implementation or bugfix, before writing code |
| `systematic-debugging` | `/engineering:implement`, `/engineering:test` | Any unexplained bug or test failure |
| `reviewing-code` | `/engineering:review` | Reviewing a diff or PR |
| `refactoring` | `/engineering:refactor` | Structural improvement without behavior change |
| `verification-before-completion` | all implement/test/refactor/release commands | Before claiming anything is done, passing, fixed, or release-ready |
| `release-preparation` | `/release:release` | Checking release readiness and drafting notes |
| `decision-capture` | `/decide` (also `/spec:plan`, `/engineering:refactor` for their own ADRs) | A decision changes direction that's already written down |

## The constitution

`.claude/CONSTITUTION.md` holds the non-negotiable principles every command and skill here
follows: upstream docs are the contract for downstream ones, tests-before-code,
root-cause-over-patches, small-reviewable-units, evidence-before-claims, docs-are-durable, and
no irreversible actions (git tag/push/deploy) without explicit human confirmation. Every
command reads it before acting. Amend it directly and log the change in its Amendments
section — no formal versioning for this toolkit.

## Decision log

Mid-work decisions (a scope reversal, a technical approach swap — "switch rate-limiting to
Kong") have a home other than chat: run `/decide <slug> "<decision>"` from any phase. It
writes an ADR, appends a row to `docs/adr/DECISIONS.md` (the one file to scan for "what's been
decided"), and greps existing specs/plans/tasks/architecture docs for anything that now
contradicts the decision so it doesn't silently go stale. `/spec:plan` and
`/engineering:refactor` write to the same ADR/index format for decisions made in their normal
flow — `/decide` exists for everything that doesn't fit neatly into either.

## Folder conventions

```
docs/
├── business/
│   ├── Vision.md
│   ├── PRD.md
│   └── personas/<persona-slug>.md
├── ux/
│   ├── journeys/<persona-slug>-<journey-slug>.md
│   ├── wireframes/<screen-slug>.md
│   └── prototypes/<prototype-slug>.md
├── specs/<feature-slug>/    # Specification.md, ImplementationPlan.md, Tasks.md
│                            # (Tasks.md checkboxes are updated by /engineering:implement)
├── architecture/Architecture.md   # living, whole-system — distinct from adr/ and specs/*/ImplementationPlan.md
├── adr/
│   ├── DECISIONS.md         # scannable index of every decision — check here first
│   └── NNNN-slug-decision.md   # written by /spec:plan, /engineering:refactor, or /decide
└── release/CHANGELOG.md
```

Engineering (`/engineering:implement`, `/test`, `/review`, `/refactor`) has no dedicated
`docs/` folder of its own — its real output is source code and tests in the host project
(wherever those live, e.g. `src/`, `tests/`), not `docs/`. Its only durable footprint under
`docs/` is checking off tasks in `specs/<slug>/Tasks.md` and, when a refactor is
architecturally significant, adding an ADR.

## Credits

This toolkit combines ideas from four sources — see `docs/AI_SDLC_Frameworks_Gamma_Premium.md`,
`docs/AI_SDLC_UX_Extension.md`, and `docs/Claude_Code_AI_SDLC_Slides.md` for the fuller
comparison this design is based on:

- **[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)** — documentation-first
  governance; borrowed: durable artifacts as a contract (Vision/PRD/Architecture), the
  Analyst/PM/Architect discovery discipline behind `/business:*`, and the constitution/ADR
  pattern.
- **[GitHub Spec-Kit](https://github.com/github/spec-kit)** — spec-driven development;
  borrowed: the spec → plan → tasks → implement command shape and the `constitution.md`
  pattern (adapted here as `.claude/CONSTITUTION.md`).
- **[Matt Pocock's `skills` repo](https://github.com/mattpocock/skills)** — engineering-first
  Agent Skills; borrowed: the SKILL.md structure for TDD and architecture-evolution
  (refactoring) discipline.
- **[obra/Superpowers](https://github.com/obra/superpowers)** — execution-first Agent Skills;
  borrowed: iron-law framing, systematic debugging's four-phase process, and
  verification-before-completion as a standalone gate.
- **[SKILL.md open standard](https://agentskills.io)** — the shared skill format that Claude
  Code, Codex CLI, and 30+ other tools read; what makes this toolkit's multi-agent support
  possible without maintaining separate skill content per agent.

All skill content in this toolkit is original prose written for this project, structurally
informed by how the above frameworks shape their own skills, not copied from them.
