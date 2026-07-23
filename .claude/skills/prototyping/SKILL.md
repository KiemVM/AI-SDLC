---
name: prototyping
description: Use when running /ux:prototype, after wireframes exist — stitches them into a flow and checks readiness for specification. Philosophy adapted from the toolkit's UX extension (Wireframe -> Prototype -> Specification).
---

# Prototyping

A prototype at this stage is a **flow-level spec**: which screens connect, what triggers each
transition, and whether the whole thing actually satisfies the journey it was built for. Its
real job is to be the last UX gate before `/spec:spec` — if the flow isn't coherent yet, a
feature spec built on top of it will inherit the confusion.

## Process

1. **Sequence the screens** in the order the journey implies, not the order they happened to
   be wireframed in.
2. **Name every transition's trigger explicitly.** "Then the user sees screen B" is not a
   trigger; "tapping Submit on screen A, if validation passes" is.
3. **Cross-check against the journey's success criteria** — does this flow actually get the
   persona to the stated success condition, or does it stop short?
4. **Run the readiness checklist honestly.** An unmet item here is cheap to fix now and
   expensive to discover mid-implementation.
5. **Surface open UX questions explicitly** rather than resolving them by assumption — mark
   them, the same discipline `spec-writing` uses for `[NEEDS CLARIFICATION]`.

## Self-review checklist

- [ ] Every transition has an explicit, unambiguous trigger.
- [ ] The flow's end state matches the journey's stated success criteria.
- [ ] No screen appears in the flow without a clear reason tied to the journey.
- [ ] Every open question is listed, not silently resolved.

## Red flags

| Red flag | Why it matters |
|---|---|
| A transition's trigger is vague ("eventually gets to screen C") | Ambiguity here becomes an implementation guess later |
| The flow diverges from the journey's success criteria without explanation | The prototype may be solving a different problem than the one that was scoped |
| The readiness checklist is marked all-met without genuine review | Passes a gate that isn't actually cleared, pushing the problem downstream |
