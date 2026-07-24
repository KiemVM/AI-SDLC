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
2. If this project already has tests, detect its existing conventions first (test
   runner/config file, existing test file naming and location, assertion/mocking style) via
   Glob/Grep, and follow them for this task. Only introduce a new test tool if the project
   genuinely has none yet, and say so explicitly rather than silently picking one.
3. RED: write one failing test for the smallest next behavior. Run it. Confirm it fails for
   the right reason.
4. GREEN: write minimal code to pass. Run tests.
5. REFACTOR: clean up while staying green.
6. Repeat steps 3-5 until the task's definition of done is met.
7. Invoke **verification-before-completion**: run the full test command fresh, read the
   output, only then claim success.
8. Update `Tasks.md`: check off the task, note files touched.

## Guardrails

- No production code without a failing test first — no exceptions without explicit user
  sign-off.
- Do not silently expand scope beyond this task; if the plan turns out wrong, stop and flag
  it.
