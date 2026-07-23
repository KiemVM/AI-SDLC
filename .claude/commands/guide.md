---
description: Show all available AI SDLC commands, workflow order, and current feature status
allowed-tools: Glob, Read
disable-model-invocation: false
---

# /guide — AI SDLC Toolkit Cheat Sheet

Print the reference below, then append a live status section built from the repo.

## 1. Print this reference verbatim

```
AI SDLC Toolkit — Specification + Engineering phases

WORKFLOW ORDER
  /spec:spec <slug> "<desc>"   -> docs/specs/<slug>/Specification.md
  /spec:plan <slug>            -> docs/specs/<slug>/ImplementationPlan.md (+ ADRs)
  /spec:tasks <slug>           -> docs/specs/<slug>/Tasks.md
  /engineering:implement <Task-ID>  -> implement one task, test-first (TDD)
  /engineering:test <Task-ID|path>  -> backfill/strengthen coverage
  /engineering:review [PR#]         -> review the diff for bugs + spec/constitution fit
  /engineering:refactor [scope]     -> improve structure, tests must stay green

COMMAND REFERENCE
  /spec:spec        Write/update a feature spec — WHAT and WHY only, no tech detail.
  /spec:plan         Turn an approved spec into a technical approach + file structure.
  /spec:tasks         Break the plan into a small, ordered, testable task backlog.
  /engineering:implement   Implement one Task-ID, red-green-refactor.
  /engineering:test        Cross-check coverage against the spec's acceptance criteria.
  /engineering:review      Review a diff/PR: Critical/Important/Minor findings, file:line.
  /engineering:refactor    Restructure in small steps with tests green throughout.
  /guide                    This cheat sheet.

GOVERNANCE
  .claude/CONSTITUTION.md   Non-negotiable principles every command follows. Read it,
                            amend it directly, log changes in its Amendments section.

SKILLS BEHIND THE COMMANDS (auto-invocable by relevance, or via the commands above)
  spec-writing, implementation-planning, task-breakdown,
  test-driven-development, systematic-debugging,
  reviewing-code, refactoring, verification-before-completion

NOT YET BUILT (reserved folders exist for these)
  Business phase: /vision /prd /persona /architecture  -> docs/business/
  UX phase:       /user-journey /wireframe /prototype  -> docs/ux/
  Release phase:  /release

Full details: README.md
```

## 2. Then report live feature status

1. Glob `docs/specs/*/` to find existing feature slugs.
2. For each slug found, check which of `Specification.md`, `ImplementationPlan.md`,
   `Tasks.md` exist, and if `Tasks.md` exists, read it to count `[x]` vs `[ ]` tasks.
3. Print a short status table, e.g.:

```
CURRENT FEATURES
  <slug>   spec: done   plan: done   tasks: 2/5 done   -> next: /engineering:implement Task-3
```

4. If no `docs/specs/*/` folders exist yet, print: `No features started yet. Run /spec:spec <slug> "<description>" to begin.`

## Guardrails

- This command is read-only — never write or modify any file.
- Keep the live status section short (one line per feature); don't dump full file contents.
