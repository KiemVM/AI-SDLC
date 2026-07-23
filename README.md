# AI SDLC Toolkit

A copy-paste `.claude/` toolkit that gives Claude Code a disciplined, five-phase
Business → UX → Specification → Engineering → Release workflow, distilled from four
AI-assisted software development methodologies. This repo *is* the toolkit — copy `.claude/`
(and the `docs/` scaffold, if you want the folder conventions too) into any project to use it
there.

> **Quick start:** once installed, run `/guide` at any time for a full cheat sheet of every
> command, the workflow order, and the status of features already in progress under
> `docs/specs/`.

## What this is

A **hybrid** of slash commands and Agent Skills: each command (`/business:vision`,
`/spec:spec`, `/engineering:implement`, ...) is a thin, explicit entrypoint that names the
skill(s) it invokes for the actual methodology. Commands give you a predictable interface;
skills carry the reusable engineering discipline and can also auto-activate by relevance
outside the command itself. All five phases from the original design docs are implemented:
15 commands, 16 skills.

## Install

**Option A — npx (recommended, no cloning needed):**

```bash
cd <your-project>
npx github:KiemVM/AI-SDLC
```

This copies `.claude/` (commands, skills, constitution) and the `docs/` scaffold (folder
conventions, ADR and changelog templates) into the current directory. Existing files are left
untouched.

```bash
npx github:KiemVM/AI-SDLC --dest ../some-other-project   # install elsewhere
npx github:KiemVM/AI-SDLC --force                          # overwrite existing files
npx github:KiemVM/AI-SDLC --dry-run                         # preview without writing
```

**Option B — manual copy**, if you already have this repo checked out locally:

```bash
cp -r .claude docs <your-project>/
```

```powershell
Copy-Item -Recurse .claude,docs <your-project>/
```

Both `.claude/` and the `docs/` scaffold are needed together either way.

## The workflow

```
Business  ->  UX  ->  Specification  ->  Engineering  ->  Release
```

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
| `/guide` | — | Cheat sheet + live feature status | (read-only) |

Not every project needs to start at Business — if you already have a clear feature in mind,
jump straight to `/spec:spec`. The upstream phases exist for when you want that discipline.

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

## The constitution

`.claude/CONSTITUTION.md` holds the non-negotiable principles every command and skill here
follows: upstream docs are the contract for downstream ones, tests-before-code,
root-cause-over-patches, small-reviewable-units, evidence-before-claims, docs-are-durable, and
no irreversible actions (git tag/push/deploy) without explicit human confirmation. Every
command reads it before acting. Amend it directly and log the change in its Amendments
section — no formal versioning for this toolkit.

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
├── adr/                     # Architecture Decision Records, numbered NNNN-slug-decision.md
│                            # (written by /spec:plan and, for structural changes, /engineering:refactor)
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

All skill content in this toolkit is original prose written for this project, structurally
informed by how the above frameworks shape their own skills, not copied from them.
