---
name: refactoring
description: Use when running /engineering:refactor, or when code needs structural improvement without changing behavior. Philosophy adapted from Matt Pocock's skills repo architecture-evolution approach.
---

# Refactoring

Refactoring changes structure, never behavior. If a step changes what the code does, it isn't
a refactor — it's a feature change or a bug fix, and belongs in
`/engineering:implement`/`/engineering:test` with a test written first.

## Preconditions

The full test suite must be green before starting. A refactor on top of a red suite has no
safety net — you can't tell whether a new failure was caused by your change or was already
there.

## Process

1. Identify smells: duplication that has shown up three or more times (rule of three),
   names that no longer describe what the code does, a function or file doing more than one
   job, or a module that's become hard to navigate or extend.
2. Make **one small change at a time.** Rename, extract, or move — pick one operation, apply
   it, and stop.
3. Run the full test suite after every single step (via **verification-before-completion**).
   If it goes red and the cause isn't immediately obvious, revert the last step rather than
   debugging forward on top of an uncertain change.
4. Repeat until the identified smell is resolved.

## Escalation signals — when this becomes an architecture decision

If the refactor reveals a deeper structural issue — the same duplication keeps reappearing
across many files, or a module's responsibilities keep growing no matter how it's split —
stop mid-task and propose the change as an ADR in `docs/adr/` rather than continuing to patch
symptoms locally. Architecturally significant changes deserve a written decision, not a quiet
series of small edits.

## Guardrails

- Never mix a refactor step with a behavior change, even a "obviously correct" one spotted
  along the way — note it and route it separately.
- Don't refactor code you're not currently working in "while you're at it" — scope creep in
  a refactor is still scope creep.
