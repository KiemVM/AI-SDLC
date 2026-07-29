---
description: Define a user persona — role, goals, pain points — that later UX and spec work reference
argument-hint: "[role/one-liner]" [optional-slug-override]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /business:persona — Define a Persona

Invoke the **persona-definition** skill. Personas are the bridge BMAD's business docs and
this toolkit's UX phase share — `/ux:user-journey` requires one to exist.

## Inputs

- `$ARGUMENTS`: a one-line role/description — REQUIRED, ask if missing. A slug is auto-derived
  from it (kebab-case, 2-4 words); add your own as an extra word to override.
- `docs/business/Vision.md` / `PRD.md` if present, for context (not required to proceed).
- `.claude/CONSTITUTION.md`.
- Any existing `docs/business/personas/<slug>.md` — ask before revising/overwriting.

## Process

1. Read the constitution and, if present, the vision/PRD for context.
2. Derive `<slug>` (kebab-case, 2-4 words) from the role/description, unless the user gave
   one explicitly. State it in your final summary so the user can rename before
   `/ux:user-journey <slug> ...` references it.
3. Invoke **persona-definition** to run the discovery loop: role, goals, pain points, context
   of use, technical proficiency, and how this persona relates to the product's goals.
4. Write `docs/business/personas/<slug>.md`.
5. Report a summary and point the user to `/ux:user-journey <slug> ...` next.

## Output template — docs/business/personas/<slug>.md

```markdown
# Persona: <Name/Role>

## Summary
<1-2 sentences — who this is>

## Goals
- What this persona is trying to achieve when using the product.

## Pain Points
- Current frustrations or obstacles, with or without this product.

## Context of Use
- When/where/how often they'd use the product; device, environment, urgency.

## Technical Proficiency
- Low | Medium | High, with a note on what that implies for UX decisions.

## Relationship to Vision/PRD
- Which goals/epics this persona is most relevant to.
```

## Guardrails

- A persona is a composite of real user patterns, not a single named individual with a
  fabricated life story — keep it to what's actually decision-relevant.
- Do not invent goals/pain points with no basis in the vision/PRD or user input; ask if
  unsure.
