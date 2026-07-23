---
description: Write or update the living whole-system Architecture document (BMAD-style), distinct from per-feature plans and ADRs
argument-hint: [optional focus note]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git log:*)
disable-model-invocation: false
---

# /business:architecture — System Architecture

Invoke the **architecture-writing** skill. This document is the **current-state, whole-system**
picture — different from `/spec:plan`'s per-feature `ImplementationPlan.md` (tactical, one
feature) and from `docs/adr/` (point-in-time individual decisions). This file is living and
gets updated as the system evolves; ADRs explain *why* a past architectural change happened,
this file describes *what the architecture is now*.

## Inputs

- `docs/business/PRD.md` — REQUIRED. If missing, stop and tell the user to run `/business:prd`
  first.
- `.claude/CONSTITUTION.md`, existing `docs/adr/*.md`, and the actual codebase structure
  (Glob/Grep) if code already exists.
- Any existing `docs/architecture/Architecture.md` — ask before revising/overwriting; prefer
  updating in place since this is a living document.

## Process

1. Read the PRD, constitution, and existing ADRs.
2. If code already exists, ground the document in what's actually there (Glob the structure)
   rather than aspirational architecture that doesn't match reality.
3. Invoke **architecture-writing** for structure: major components, their responsibilities and
   boundaries, key data flows, cross-cutting decisions (auth, data storage, deployment model)
   and the PRD epics each component primarily serves.
4. Write `docs/architecture/Architecture.md`.
5. Report a summary and note which future ADRs (if any) are anticipated.

## Output template — docs/architecture/Architecture.md

```markdown
# Architecture: <Product Name>
PRD: docs/business/PRD.md
Last updated: YYYY-MM-DD

## Overview
<1 paragraph — the shape of the system>

## Components
| Component | Responsibility | Serves epics |
|---|---|---|

## Key Data Flows
- ...

## Cross-Cutting Decisions
- Auth: ...
- Data storage: ...
- Deployment: ...
(link to the ADR that recorded each, once one exists)

## Known Constraints / Technical Debt
- ...
```

## Guardrails

- Describe the system, don't re-litigate settled ADRs here — link to them instead.
- Keep it current-state; aspirational/future architecture belongs in Risks or a new ADR
  proposal, clearly labeled as not-yet-decided.
