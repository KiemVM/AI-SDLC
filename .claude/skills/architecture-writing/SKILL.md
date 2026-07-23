---
name: architecture-writing
description: Use when running /business:architecture, after a PRD exists — documents the current-state whole-system architecture. Philosophy adapted from BMAD-METHOD's Architect-stage documentation-first approach.
---

# Architecture Writing

This produces the **living, whole-system** architecture document — distinct from
`implementation-planning` (per-feature, tactical, produced by `/spec:plan`) and from
individual ADRs (point-in-time decision records). Think of it as: ADRs are the diary entries,
this document is the current summary they add up to.

## Process

1. **Ground in what exists, not what's aspirational.** If code already exists, read its
   actual structure before describing it — a document that doesn't match reality actively
   misleads anyone who reads it next.
2. **Describe components by responsibility and boundary**, not by file path. A component
   entry should answer "what does this own, and what does it explicitly not own?"
3. **Trace components back to PRD epics.** If a component serves no epic, question why it
   exists; if an epic has no component, the architecture may be incomplete.
4. **Record cross-cutting decisions** (auth, data storage, deployment model) with a pointer to
   the ADR that decided them — this document summarizes, ADRs justify.
5. **Keep it current.** This is not a one-time deliverable; re-run `/business:architecture`
   as the system evolves rather than letting it silently drift out of date.

## Self-review checklist

- [ ] Every component has a stated responsibility and boundary.
- [ ] Every PRD epic maps to at least one component (or the gap is flagged).
- [ ] Cross-cutting decisions point to ADRs rather than re-arguing them here.
- [ ] Nothing described here has visibly diverged from the actual codebase, if one exists.

## Red flags

| Red flag | Why it matters |
|---|---|
| A component's responsibility overlaps heavily with another's | Boundary isn't actually clear — a future `/engineering:refactor` will hit this |
| The document describes code that doesn't exist yet as if it does | Misleads anyone using this as ground truth |
| A cross-cutting decision is explained at length instead of linking an ADR | Duplicates and risks diverging from the actual decision record |
