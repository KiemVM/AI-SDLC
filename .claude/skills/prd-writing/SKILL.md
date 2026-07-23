---
name: prd-writing
description: Use when running /business:prd, after a Vision.md exists — derives a product-level epic list from the vision's goals. Philosophy adapted from BMAD-METHOD's PM-stage discovery.
---

# PRD Writing

A PRD sits between the vision (why/for whom) and feature specs (what a single feature does).
Its job is to decompose the vision's goals into **epics** — coherent clusters of capability —
at a level still too coarse to implement directly. Each epic becomes a candidate slug for a
future `/spec:spec` run.

## Process

1. **Read the vision's goals first.** Every epic should trace to at least one vision goal; an
   epic with no goal behind it is scope creep at the product level.
2. **Decompose into epics, not features or tasks.** An epic is "capability a user gains," not
   "screen we'll build" or "function we'll write" — those are UX phase and engineering phase
   concerns respectively.
3. **Prioritize honestly.** Must/Should/Could, and be willing to put things in Could — a PRD
   where everything is Must isn't prioritized at all.
4. **Note constraints, not solutions.** Business, legal, or timeline constraints belong here;
   how to satisfy them technically belongs to `/business:architecture` or `/spec:plan`.

## Boundary with feature specs

Do not write functional requirements here — that's `/spec:spec`'s job, one feature at a time,
once an epic is picked up for implementation. If you catch yourself writing "the system MUST
...", that sentence belongs in a Specification.md, not the PRD.

## Self-review checklist

- [ ] Every epic traces to a vision goal.
- [ ] No epic contains implementation detail (tech, file structure, UI layout).
- [ ] Priorities are differentiated, not all "Must."
- [ ] Each epic has a future spec slug noted, even if not yet built.

## Red flags

| Red flag | Why it matters |
|---|---|
| An epic reads like a functional requirement ("MUST validate email format") | Too granular — that belongs in a feature spec |
| An epic has no traceable vision goal | Likely scope creep slipping in without justification |
| Every epic is priority "Must" | Prioritization didn't actually happen |
