---
description: Implement one task test-first (TDD), from the task backlog
argument-hint: [Task-ID]
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
disable-model-invocation: false
---

# /engineering:implement — Implement a Task (TDD)

Invoke the **test-driven-development** skill now; follow it strictly. If you hit a failure
you don't understand, invoke **systematic-debugging** before attempting another fix.

## Inputs

- `$ARGUMENTS`: a Task-ID (e.g. `Task-1`) from `docs/specs/<slug>/Tasks.md`. Ask if
  missing/ambiguous.
- The feature's `Specification.md` and `ImplementationPlan.md`.
- `.claude/CONSTITUTION.md`.

## Process

1. Locate the task; read its goal, files touched, and definition of done.
2. RED: write one failing test for the smallest next behavior. Run it. Confirm it fails for
   the right reason.
3. GREEN: write minimal code to pass. Run tests.
4. REFACTOR: clean up while staying green.
5. Repeat steps 2-4 until the task's definition of done is met.
6. Invoke **verification-before-completion**: run the full test command fresh, read the
   output, only then claim success.
7. Update `Tasks.md`: check off the task, note files touched.

## Guardrails

- No production code without a failing test first — no exceptions without explicit user
  sign-off.
- Do not silently expand scope beyond this task; if the plan turns out wrong, stop and flag
  it.
