---
description: Turn an approved Specification into a technical Implementation Plan and any needed ADRs
argument-hint: [feature-slug]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git log:*), Bash(git show:*)
disable-model-invocation: false
---

# /spec:plan — Implementation Planning

Invoke the **implementation-planning** skill for process and structure.

## Inputs

- `docs/specs/<slug>/Specification.md` — REQUIRED. If missing, stop and tell the user to run
  `/spec:spec` first.
- `.claude/CONSTITUTION.md`.
- Existing codebase structure (Glob/Grep relevant directories) for architecture context.

## Process

1. Read the spec and constitution.
2. Propose 2-3 viable technical approaches with trade-offs; recommend one.
3. Decompose into file/module structure — one clear responsibility per file/module.
4. Define testing strategy: map each FR-N in the spec to how it will be verified.
5. For any decision with long-term consequences (framework choice, data model, API shape,
   anything expensive to reverse), write an ADR to `docs/adr/NNNN-<slug>-<decision>.md`.
6. Write `docs/specs/<slug>/ImplementationPlan.md`.
7. Confirm with the user before pointing them to `/spec:tasks`.

## Output template — ImplementationPlan.md

```markdown
# Implementation Plan: <Feature Name>
Spec: docs/specs/<slug>/Specification.md

## Approach
<chosen approach + why, trade-offs considered>

## File/Module Structure
| Path | Responsibility |
|------|-----------------|

## Testing Strategy
| Requirement | Verified by |
|---|---|

## Risks / Open Questions
- ...

## Related ADRs
- docs/adr/000N-....md
```

## Guardrails

- Documents only — do not start writing implementation code.
- Flag any spec requirement that conflicts with the constitution instead of silently
  resolving it.
