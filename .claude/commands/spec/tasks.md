---
description: Break an Implementation Plan into a backlog of small, independently testable tasks
argument-hint: [feature-slug]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /spec:tasks — Task Breakdown

Invoke the **task-breakdown** skill.

## Inputs

- `docs/specs/<slug>/Specification.md` and `ImplementationPlan.md` — REQUIRED. If either is
  missing, stop and tell the user which command to run first (`/spec:spec` or `/spec:plan`).

## Process

1. Read the spec and plan.
2. Apply the task-breakdown skill's sizing rule: each task is the smallest unit with its own
   test cycle, worth a fresh reviewer's gate.
3. Order tasks by dependency; call out cross-task dependencies explicitly.
4. Write `docs/specs/<slug>/Tasks.md` as a checklist, IDs `Task-1`, `Task-2`, ...

## Output template — Tasks.md

```markdown
# Tasks: <Feature Name>
Plan: docs/specs/<slug>/ImplementationPlan.md

## Task-1 — <name>
- [ ] Status: Not started
- Depends on: none
- Goal: ...
- Files touched: ...
- Definition of done: tests pass, FR-N covered
```

## Guardrails

- Every task ends with an independently testable deliverable.
- Do not start implementing — that's `/engineering:implement`.
