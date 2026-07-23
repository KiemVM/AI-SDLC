---
description: Turn an approved Vision into a Product Requirements Document — the product-level epic list
argument-hint: [optional refinement note]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /business:prd — Write the PRD

Invoke the **prd-writing** skill. A PRD works at the **product** level (epics — clusters of
related capability), not the feature level. Each epic here is a future candidate for
`/spec:spec <slug>` once it's ready to be built — the PRD does not replace a feature spec, it
scopes which specs will eventually get written.

## Inputs

- `docs/business/Vision.md` — REQUIRED. If missing, stop and tell the user to run
  `/business:vision` first.
- `.claude/CONSTITUTION.md`.
- Any existing `docs/business/PRD.md` — ask before revising/overwriting.

## Process

1. Read the vision and constitution.
2. Invoke **prd-writing** to derive epics from the vision's goals, each with a one-paragraph
   scope and priority — not implementation detail, not a task breakdown.
3. Write `docs/business/PRD.md`.
4. Report a summary and point the user to `/business:persona` and `/business:architecture`
   next (either order is fine; both read the PRD).

## Output template — docs/business/PRD.md

```markdown
# PRD: <Product Name>
Vision: docs/business/Vision.md

## Status
Draft | Approved

## Summary
<1 paragraph, product-level>

## Epics
### Epic-1: <name>
- Priority: Must | Should | Could
- Scope: <1 paragraph — what capability this unlocks>
- Future spec slug: <slug> (to be created via /spec:spec when this epic is picked up)

## Out of Scope (product-level)
- ...

## Constraints
- <business, legal, timeline constraints that shape the product, not the tech>
```

## Guardrails

- Epics describe capability, not implementation — no tech stack, no file structure.
- Do not silently invent epics the vision doesn't support; if scope feels underspecified,
  ask rather than guess.
