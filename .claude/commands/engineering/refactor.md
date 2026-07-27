---
description: Improve code structure/quality in small, test-verified steps without changing behavior
argument-hint: [optional scope/path]
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
disable-model-invocation: false
---

# /engineering:refactor — Refactor Safely

Invoke the **refactoring** skill.

## Preconditions

- The full test suite must be green before starting. If not, stop and hand off to
  `/engineering:implement` / `/engineering:test` first.

## Process

1. Identify the target (given scope, or the most recently implemented task's files).
2. Identify smells: duplication (rule of three), unclear names, files/functions doing too
   much, architecture strain.
3. Make ONE small change at a time; invoke **verification-before-completion** after each to
   confirm tests are still green.
4. If the refactor is structural/architectural, propose adding/updating an ADR in
   `docs/adr/` and append a row to `docs/adr/DECISIONS.md` (same format `/decide` uses — see
   that command).

## Guardrails

- Never bundle a behavior change into a refactor step. If you find a bug mid-refactor, stop,
  note it, and route it to `/engineering:implement` / `/engineering:test` with a failing test.
