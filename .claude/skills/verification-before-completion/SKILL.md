---
name: verification-before-completion
description: Use before claiming any task, test run, fix, or review is complete/passing — requires fresh command output as evidence, not memory or assumption. Invoked at the tail of /engineering:implement, /engineering:test, and per-step inside /engineering:refactor. Philosophy adapted from Superpowers' verification-before-completion skill.
---

# Verification Before Completion

## Iron law

**No completion claims without fresh evidence.** "The tests should pass now" is not the same
sentence as "the tests passed" — only the second is something you're allowed to say, and only
after you've actually run the command and read its output in this turn.

## The gate

Before saying something is done, passing, fixed, or working:

1. Identify the specific command that proves it (the test runner, the build command, the
   reproduction steps for a bug).
2. Run it fresh — not a cached result, not a run from three steps ago before further edits.
3. Read the full output, not just the exit code or the last line — a truncated read can miss
   a failure buried above a misleading final "done" message.
4. Only then state the claim, and state it precisely (e.g. "42 tests passed, 0 failed" rather
   than "tests pass").

## Common failure modes this catches

| Claim | Required evidence |
|---|---|
| "Tests pass" | Fresh full test-suite run, output read, pass count matches expected test count |
| "Build succeeds" | Fresh build command run to completion, no error-level output |
| "Bug is fixed" | The original reproduction steps re-run and confirmed to no longer fail, plus a regression test now in place |
| "Requirements are met" | Each relevant FR-N/acceptance criterion checked against actual behavior, not against intent |

## Why this is a separate skill, not just "run tests"

Under time pressure, it's easy to reason "I made the right change, so it should be fine" and
skip the run. This skill exists specifically to interrupt that shortcut — the whole value is
in treating verification as mandatory and non-optional, every time, even when confidence is
high.
