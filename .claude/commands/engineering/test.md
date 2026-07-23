---
description: Strengthen or backfill test coverage for a task or area, against the spec's acceptance criteria
argument-hint: [Task-ID | file or directory path]
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
disable-model-invocation: false
---

# /engineering:test — Coverage & Edge Cases

Invoke the **test-driven-development** skill — new behavior still needs a test written first,
watched red, then green. If backfilling tests for pre-existing untested code, follow the
skill's guidance for testing existing code rather than skipping straight to assertions.

## Inputs

- `$ARGUMENTS`: a Task-ID or a file/directory path.
- The relevant `Specification.md`'s Functional Requirements / Acceptance Criteria — this is
  the coverage checklist, not the current implementation.

## Process

1. Resolve the target: the task's files, or the given path.
2. Cross-check each relevant FR-N / acceptance criterion against existing tests. List gaps.
3. For each gap: write the test first, watch it fail, implement/fix minimally, watch it pass.
4. If a test reveals an unexpected bug, invoke **systematic-debugging** before patching.
5. Invoke **verification-before-completion**: run the full suite fresh, report pass/fail
   counts.

## Guardrails

- Do not write tests that assert current (possibly buggy) behavior just to make them pass —
  check against the spec, not the implementation.
