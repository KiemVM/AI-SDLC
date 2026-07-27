---
description: Show all available AI SDLC commands, workflow order, and current feature status
allowed-tools: Glob, Read
disable-model-invocation: false
---

# /guide — AI SDLC Toolkit Cheat Sheet

Print the reference below, then append a live status section built from the repo.

## 1. Print this reference verbatim

```
AI SDLC Toolkit — Business -> UX -> Specification -> Engineering -> Release

WORKFLOW ORDER
  BUSINESS
    /business:vision                          -> docs/business/Vision.md
    /business:prd                              -> docs/business/PRD.md
    /business:persona <slug> "<role>"          -> docs/business/personas/<slug>.md
    /business:architecture                     -> docs/architecture/Architecture.md
  UX
    /ux:user-journey <persona> <journey> "..." -> docs/ux/journeys/<persona>-<journey>.md
    /ux:wireframe <screen> "<purpose>"         -> docs/ux/wireframes/<screen>.md
    /ux:prototype <slug> "<flow>"              -> docs/ux/prototypes/<slug>.md
  SPECIFICATION
    /spec:spec <slug> "<desc>"                 -> docs/specs/<slug>/Specification.md
    /spec:plan <slug>                          -> docs/specs/<slug>/ImplementationPlan.md (+ ADRs)
    /spec:tasks <slug>                         -> docs/specs/<slug>/Tasks.md
  ENGINEERING
    /engineering:implement <Task-ID>           -> implement one task, test-first (TDD)
    /engineering:test <Task-ID|path>           -> backfill/strengthen coverage
    /engineering:review [PR#]                  -> review the diff for bugs + spec/constitution fit
    /engineering:refactor [scope]              -> improve structure, tests must stay green
  RELEASE
    /release:release [version]                 -> readiness gate + changelog/PR notes draft (docs only)

  ANY PHASE
    /decide <slug> "<decision>"                -> capture a mid-work decision (ADR + DECISIONS.md index),
                                                   then find what's now stale downstream

  /guide                                        -> this cheat sheet

Not every project needs to start at Business — jump straight to /spec:spec if you already
know the feature. Business/UX exist for when you want that discipline upstream. /decide isn't
part of the linear flow — run it any time a decision changes direction that's already written
down (e.g. switching a technical approach mid-implementation).

GOVERNANCE
  .claude/CONSTITUTION.md   Non-negotiable principles every command follows. Read it,
                            amend it directly, log changes in its Amendments section.
                            Includes: no command tags/pushes/deploys without a human (/release
                            only drafts).

SKILLS (auto-invocable by relevance, or via the commands above)
  vision-writing, prd-writing, persona-definition, architecture-writing,
  user-journey-mapping, wireframing, prototyping,
  spec-writing, implementation-planning, task-breakdown,
  test-driven-development, systematic-debugging,
  reviewing-code, refactoring, verification-before-completion,
  release-preparation, decision-capture

Full details: README.md
```

## 2. Then report live status

1. Glob `docs/business/Vision.md`, `docs/business/PRD.md`, `docs/architecture/Architecture.md`
   to report which Business-phase artifacts exist.
2. Glob `docs/business/personas/*.md`, `docs/ux/journeys/*.md`, `docs/ux/wireframes/*.md`,
   `docs/ux/prototypes/*.md` and report counts.
3. Glob `docs/specs/*/` to find existing feature slugs. For each slug, check which of
   `Specification.md`, `ImplementationPlan.md`, `Tasks.md` exist, and if `Tasks.md` exists,
   read it to count `[x]` vs `[ ]` tasks.
4. Read `docs/adr/DECISIONS.md` and count its rows.
5. Print a short status block, e.g.:

```
CURRENT STATE
  Business: Vision done, PRD done, Architecture not started
  UX: 2 personas, 1 journey, 3 wireframes, 0 prototypes
  Decisions logged: 3 (see docs/adr/DECISIONS.md)
  Features:
    <slug>   spec: done   plan: done   tasks: 2/5 done   -> next: /engineering:implement Task-3
```

6. If nothing exists yet anywhere, print:
   `No artifacts yet. Start with /business:vision, or jump straight to /spec:spec if you already know the feature.`

## Guardrails

- This command is read-only — never write or modify any file.
- Keep the live status section short; don't dump full file contents.
