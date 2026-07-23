---
name: systematic-debugging
description: Use when encountering any bug, test failure, or unexpected behavior — before proposing or attempting a fix. Triggered from /engineering:implement and /engineering:test on unexplained failures. Philosophy adapted from Superpowers' systematic debugging methodology.
---

# Systematic Debugging

## Iron law

**No fixes without root-cause investigation.** A fix for a bug you don't understand is a
guess wearing a patch's clothing. It may make the symptom go away while leaving the actual
defect in place, ready to resurface somewhere else.

## The four phases

1. **Root Cause Investigation.** Reproduce the failure reliably. Read the actual error,
   stack trace, or diff between expected and actual output — don't skim it, read it. Trace
   backward from the symptom to the point where behavior first diverges from expectation.
2. **Pattern Analysis.** Is this failure isolated, or does it recur elsewhere in the
   codebase? Check whether the same class of mistake exists in similar code — a bug found
   once is often a bug that exists in several places.
3. **Hypothesis and Testing.** Form a specific, falsifiable hypothesis about the cause.
   Test it directly — with a minimal reproduction, a targeted log, or a debugger — before
   writing any fix. If the hypothesis is wrong, form a new one; don't fix around an
   unconfirmed guess.
4. **Implementation.** Once the root cause is confirmed, fix it via the
   **test-driven-development** skill: the failing case becomes (or already is) a test, then
   the minimal correct fix makes it pass. Change one thing at a time.

## Evidence-gathering for multi-component systems

When the failure spans components (e.g. a request that crosses a boundary — network, process,
service), isolate which side is misbehaving before touching either: reproduce with the
smallest possible input, check logs/output at each boundary, and confirm where expected and
actual first diverge, rather than adjusting both sides at once.

## The three-strikes rule

If three distinct fix attempts for the same failure have not resolved it, stop. This is a
signal that the mental model of the system is wrong, not that the next attempt will get
lucky. Step back, question the architecture or assumptions, and escalate to the user with
what's been tried and ruled out.

## Red flags

| Red flag | Why it matters |
|---|---|
| "Let me just try changing this and see if it helps" | That's a guess, not a hypothesis — it hasn't been tested against evidence |
| A fix is applied without first reproducing the failure | Untraceable — you can't confirm the fix addressed the actual cause |
| The same bug reappears after being "fixed" | The root cause was never actually found |
| Multiple unrelated changes made at once while debugging | Impossible to tell which change (if any) actually fixed it |
