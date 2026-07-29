---
description: Create or update a feature specification (Spec-Kit style) — the WHAT and WHY, not the HOW
argument-hint: "[feature description]" [optional-slug-override]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /spec:spec — Write a Feature Specification

You are creating the artifact that becomes the contract for `/spec:plan`, `/spec:tasks`, and
`/engineering:implement`. Invoke the **spec-writing** skill now for the quality bar and process.

## Inputs

- `$ARGUMENTS`: a one-line feature description — REQUIRED, ask if missing. A slug is
  auto-derived from it (kebab-case, 2-4 words) — you don't need to invent one; to control it
  yourself, add it as an extra word, e.g. `/spec:spec "Add OAuth login to the API" oauth-login`.
- `.claude/CONSTITUTION.md` — read first, if present.
- Any `docs/ux/prototypes/<slug>.md` or `docs/ux/wireframes/*.md` related to this feature
  (matching slug, or referenced by a matching `docs/ux/journeys/*.md`) — if this feature went
  through the UX phase, its design is a required input, not optional context.
- Any existing `docs/specs/<slug>/Specification.md` — summarize it and ask the user whether to
  revise in place or start a new revision; never silently overwrite.

## Process

1. Read `.claude/CONSTITUTION.md` if it exists.
2. Derive `<slug>` (kebab-case, 2-4 words capturing the core noun phrase) from the
   description, unless the user gave one explicitly. Check `docs/specs/<slug>/` for existing
   artifacts. State the slug in your final summary so the user can rename it before it's
   referenced by `/spec:plan <slug>` and later commands.
3. Glob `docs/ux/prototypes/` and `docs/ux/wireframes/` for anything matching this slug. If
   found, read it/them fully — this feature's User Scenarios and Functional Requirements must
   be consistent with the designed flow, not written independently of it. If nothing matches
   but the user mentions a UX flow exists, ask where it lives rather than proceeding without
   it.
4. Invoke **spec-writing** to run the clarifying-question loop and produce a spec meeting the
   quality bar: testable functional requirements, explicit out-of-scope,
   `[NEEDS CLARIFICATION: ...]` markers for genuine ambiguity, zero implementation detail (no
   tech stack, no file names).
5. Write `docs/specs/<slug>/Specification.md` using the template below.
6. Run the spec self-review checklist from the spec-writing skill before finishing.
7. Report a summary, list any open `[NEEDS CLARIFICATION]` markers, and point the user to
   `/spec:plan`.

## Output template — docs/specs/<slug>/Specification.md

```markdown
# Specification: <Feature Name>
Related UX: docs/ux/prototypes/<slug>.md (if applicable)

## Status
Draft | Clarified | Approved

## Overview
<1-2 paragraph summary of the problem and desired outcome>

## User Scenarios
- As a <role>, I want <capability>, so that <benefit>.

## Functional Requirements
- FR-1: The system MUST ... (testable, unambiguous)

## Out of Scope
- ...

## Open Questions
- [NEEDS CLARIFICATION: ...]

## Acceptance Criteria
- [ ] ...
```

## Guardrails

- Do not propose technology choices, file structures, or code — that is `/spec:plan`'s job.
- If a related wireframe/prototype exists, do not write requirements that contradict it (e.g.
  a different screen flow or missing a state it defines) — reconcile with the user instead of
  silently diverging. Referencing user-facing structure from the wireframe (what the user
  sees/can do) is fine; that's still WHAT, not HOW.
- Do not resolve ambiguity by guessing; mark it and ask.
