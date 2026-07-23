---
description: Create or update a feature specification (Spec-Kit style) — the WHAT and WHY, not the HOW
argument-hint: [feature-slug] "[one-line feature description]"
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /spec:spec — Write a Feature Specification

You are creating the artifact that becomes the contract for `/spec:plan`, `/spec:tasks`, and
`/engineering:implement`. Invoke the **spec-writing** skill now for the quality bar and process.

## Inputs

- `$ARGUMENTS`: a feature slug and/or one-line description. Ask for both if missing.
- `.claude/CONSTITUTION.md` — read first, if present.
- Any existing `docs/specs/<slug>/Specification.md` — summarize it and ask the user whether to
  revise in place or start a new revision; never silently overwrite.

## Process

1. Read `.claude/CONSTITUTION.md` if it exists.
2. Derive `<slug>` (kebab-case) from `$ARGUMENTS`. Check `docs/specs/<slug>/` for existing
   artifacts.
3. Invoke **spec-writing** to run the clarifying-question loop and produce a spec meeting the
   quality bar: testable functional requirements, explicit out-of-scope,
   `[NEEDS CLARIFICATION: ...]` markers for genuine ambiguity, zero implementation detail (no
   tech stack, no file names).
4. Write `docs/specs/<slug>/Specification.md` using the template below.
5. Run the spec self-review checklist from the spec-writing skill before finishing.
6. Report a summary, list any open `[NEEDS CLARIFICATION]` markers, and point the user to
   `/spec:plan`.

## Output template — docs/specs/<slug>/Specification.md

```markdown
# Specification: <Feature Name>

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
- Do not resolve ambiguity by guessing; mark it and ask.
