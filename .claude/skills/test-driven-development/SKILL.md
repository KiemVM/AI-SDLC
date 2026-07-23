---
name: test-driven-development
description: Use when implementing any feature or bugfix, before writing any implementation code. Triggered by /engineering:implement and /engineering:test. Philosophy adapted from Superpowers and Matt Pocock's skills repo TDD discipline.
---

# Test-Driven Development

## Iron law

**No production code without a failing test first.** If you catch yourself writing
implementation before a test exists for it, stop, delete or shelve the code, and write the
test first. "I'll write the test after" is not a shortcut — it's how untested code gets
shipped, because the test-after version tends to assert whatever the code happens to do
rather than what it should do.

## The cycle

1. **RED** — write one test for the smallest next behavior. Run it. Confirm it fails, and
   confirm it fails for the reason you expect (not a typo, not a missing import). A test that
   passes immediately, or fails for the wrong reason, is not trustworthy yet.
2. **GREEN** — write the minimum code to make that test pass. Resist adding anything the
   current test doesn't require.
3. **REFACTOR** — with tests green, clean up naming, duplication, structure. Re-run tests
   after every change. If they go red, either fix forward immediately or revert the last
   step — don't accumulate uncertainty.
4. Repeat for the next smallest behavior.

## What makes a good test

- Minimal: tests one behavior, not three.
- Clear: a reader who has never seen the implementation understands what's being verified
  from the test alone.
- Behavioral, not implementational: it should survive a refactor that preserves behavior, and
  break when behavior actually changes.

## Rationalizations to reject

| What you might think | Why it's wrong |
|---|---|
| "This is too trivial to test" | Trivial code is where off-by-one and null-handling bugs hide cheapest to catch now |
| "I'll batch several behaviors into one test to save time" | You lose the signal of which behavior broke, and the red phase stops proving anything specific |
| "The test is basically the same as the implementation, so writing it after is fine" | That's exactly the failure mode this skill exists to prevent — the test should be written from the spec/requirement, not derived from code that already exists |
| "I already know this will work" | Confidence is not evidence; run it and watch it fail before you believe it |

## When a failure surprises you

If a test fails for a reason you don't immediately understand — hand off to the
**systematic-debugging** skill before attempting a fix. Guessing at fixes without
understanding the failure is how the same bug comes back later in a different shape.
