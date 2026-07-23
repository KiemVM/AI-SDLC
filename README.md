# AI SDLC Toolkit

A copy-paste `.claude/` toolkit that gives Claude Code a disciplined
spec → plan → tasks → implement → test → review → refactor workflow, distilled from four
AI-assisted software development methodologies. This repo *is* the toolkit — copy `.claude/`
(and the `docs/` scaffold, if you want the folder conventions too) into any project to use it
there.

> **Quick start:** once installed, run `/guide` at any time for a full cheat sheet of every
> command, the workflow order, and the status of features already in progress under
> `docs/specs/`.

## What this is

A **hybrid** of slash commands and Agent Skills: each command (`/spec:spec`,
`/engineering:implement`, ...) is a thin, explicit entrypoint that names the skill(s) it
invokes for the actual methodology. Commands give you a predictable interface; skills carry
the reusable engineering discipline and can also auto-activate by relevance outside the
command itself. This pass covers the **Specification** and **Engineering** phases only — the
seven commands used daily once a feature is underway. Business, UX, and Release phases are
deliberately deferred (see Roadmap).

## Install

**Option A — npx (recommended, no cloning needed):**

```bash
cd <your-project>
npx github:KiemVM/AI-SDLC
```

This copies `.claude/` (commands, skills, constitution) and the `docs/` scaffold (folder
conventions, ADR template) into the current directory. Existing files are left untouched.

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

| Command | Phase | Goal | Writes |
|---|---|---|---|
| `/spec:spec <slug> "<desc>"` | Specification | Turn an idea into a testable spec (WHAT/WHY only) | `docs/specs/<slug>/Specification.md` |
| `/spec:plan <slug>` | Specification | Turn the spec into a technical approach | `docs/specs/<slug>/ImplementationPlan.md`, optional ADRs |
| `/spec:tasks <slug>` | Specification | Break the plan into a small, ordered task backlog | `docs/specs/<slug>/Tasks.md` |
| `/engineering:implement <Task-ID>` | Engineering | Implement one task, test-first | source + tests, checks off the task |
| `/engineering:test <Task-ID\|path>` | Engineering | Backfill/strengthen coverage against acceptance criteria | additional tests |
| `/engineering:review [PR#]` | Engineering | Review a diff/PR for bugs and spec/constitution adherence | findings (chat output) |
| `/engineering:refactor [scope]` | Engineering | Improve structure in small, test-verified steps, no behavior change | source changes, optional ADR |

## Skills behind the commands

| Skill | Used by | Trigger |
|---|---|---|
| `spec-writing` | `/spec:spec` | Turning a feature idea into a spec |
| `implementation-planning` | `/spec:plan` | Turning an approved spec into a technical plan |
| `task-breakdown` | `/spec:tasks` | Turning a plan into a task backlog |
| `test-driven-development` | `/engineering:implement`, `/engineering:test` | Any implementation or bugfix, before writing code |
| `systematic-debugging` | `/engineering:implement`, `/engineering:test` | Any unexplained bug or test failure |
| `reviewing-code` | `/engineering:review` | Reviewing a diff or PR |
| `refactoring` | `/engineering:refactor` | Structural improvement without behavior change |
| `verification-before-completion` | all engineering commands | Before claiming anything is done, passing, or fixed |

## The constitution

`.claude/CONSTITUTION.md` holds the non-negotiable principles every command and skill here
follows: spec-is-the-contract, tests-before-code, root-cause-over-patches,
small-reviewable-units, evidence-before-claims, docs-are-durable. Every command reads it
before acting. Amend it directly and log the change in its Amendments section — no formal
versioning for this MVP.

## Folder conventions

```
docs/
├── specs/<feature-slug>/    # Specification.md, ImplementationPlan.md, Tasks.md — created at runtime
├── adr/                     # Architecture Decision Records, numbered NNNN-slug-decision.md
├── business/                # reserved — future /vision /prd /persona /architecture
├── ux/                      # reserved — future /user-journey /wireframe /prototype
└── architecture/            # reserved — future living Architecture.md (BMAD-style)
```

## Credits

This toolkit combines ideas from four sources — see `docs/AI_SDLC_Frameworks_Gamma_Premium.md`
and `docs/Claude_Code_AI_SDLC_Slides.md` for the fuller comparison this design is based on:

- **[BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)** — documentation-first
  governance; borrowed: durable artifacts as a contract, the constitution/ADR discipline, the
  reserved `docs/business/` and `docs/architecture/` conventions for later.
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

## Roadmap

Not built in this pass, but the folder layout leaves room for them:

- **Business phase**: `/vision`, `/prd`, `/persona`, `/architecture` → `docs/business/`
- **UX phase**: `/user-journey`, `/wireframe`, `/prototype` → `docs/ux/`
- **Release phase**: `/release`
