---
name: implementation-planning
description: Use when running /spec:plan, after a Specification.md exists and before task breakdown — turns approved requirements into a technical approach, file structure, and testing strategy. Philosophy adapted from GitHub Spec-Kit's plan phase and BMAD-METHOD's architecture discipline.
---

# Implementation Planning

A plan translates an approved spec's WHAT/WHY into a concrete HOW: an approach, a file/module
structure, and a way to verify each requirement. It is still a document, not code.

## Process

1. **Read the spec and the constitution first.** If a functional requirement conflicts with a
   constitution principle, flag it explicitly to the user — do not silently resolve the
   conflict by picking whichever one is more convenient to implement.
2. **Propose 2-3 viable approaches** before committing to one. For each: what it costs, what
   it risks, what it makes easy later. Recommend one with a stated reason, not just "this is
   simplest."
3. **Decompose into files/modules with single responsibilities.** Each entry in the file
   structure table should be describable in one sentence. If a description needs "and," the
   module is probably doing two things. If the spec references a wireframe/prototype, every
   UI-facing module should name which one it implements — a module with UI responsibility and
   no wireframe behind it is either missing from the UX phase or scope creep.
4. **Map every functional requirement to a verification method.** FR-N in the spec should
   trace to a row in the testing strategy table. A requirement with no verification method is
   a requirement that will silently rot.
5. **Write an ADR for costly-to-reverse decisions.** Trigger conditions: choosing a framework
   or library that's expensive to swap later, defining a data model or API shape other code
   will depend on, or picking between architectures with materially different long-term
   consequences. Not every plan needs an ADR — most don't.

## Output discipline

- No code in the plan — pseudocode or interface sketches are fine if they clarify structure,
  but this is still a document Claude will read before writing real code, not the code
  itself.
- Every risk or open question gets written down, even if you have a leaning — surfacing it
  lets the user veto before implementation starts, which is much cheaper than after.

## Red flags

| Red flag | Why it matters |
|---|---|
| Only one approach was considered | Trade-offs are invisible when there's nothing to compare against |
| A file/module structure entry says "handles everything for X" | Single-responsibility violation waiting to happen |
| A spec requirement has no corresponding testing-strategy row | It will ship unverified |
| An ADR is written for a trivially reversible choice | Adds process weight where none is needed — reserve ADRs for real forks in the road |
