---
name: spec-writing
description: Use when running /spec:spec, or whenever turning a raw feature idea into a written specification — before any implementation planning or code. Philosophy adapted from GitHub Spec-Kit's spec-driven development approach.
---

# Spec Writing

A specification captures WHAT the system must do and WHY, for WHOM — never HOW. It is the
contract that `/spec:plan`, `/spec:tasks`, and `/engineering:implement` build on. Anyone who
reads it should understand the problem and the desired outcome without needing to know the
tech stack.

## Iron law

**No implementation detail in a spec.** No frameworks, no file names, no data models, no
class names, no API shapes. The moment you write "we'll use X to do Y," that content belongs
in `/spec:plan`, not here. If you catch yourself justifying a technical choice, stop and move
it out.

## Grounding in an existing UX design

If this feature has a `docs/ux/prototypes/<slug>.md` or matching wireframes, they are a
required input, not background reading — the calling command reads them before this skill
runs. Ground User Scenarios and Functional Requirements in what was actually designed: a
screen's states from the wireframe, a flow's steps from the prototype's screen sequence.
Describing user-facing structure this way ("the system MUST show a confirmation state after
submit") is still WHAT, not HOW — it only becomes implementation detail once it names a
component, file, or technology. If the spec would contradict the wireframe/prototype (a
different flow, a missing state), reconcile with the user explicitly rather than silently
picking one or the other.

## Process

1. **Restate the ask** in your own words back to the user before writing anything, to confirm
   you understand the problem, not just the request's literal text.
2. **Ask one clarifying question at a time** for anything genuinely ambiguous — don't
   front-load a giant questionnaire. Prioritize questions that would change the shape of the
   requirements if answered differently.
3. **Draft requirements as testable statements.** Each functional requirement should be
   phrasable as a pass/fail test by someone who has never seen the implementation. "The
   system should be fast" is not testable; "The system MUST return search results within 2
   seconds for catalogs under 10,000 items" is.
4. **Mark genuine ambiguity instead of guessing.** When a reasonable default isn't obvious,
   write `[NEEDS CLARIFICATION: specific question]` inline rather than silently picking one
   interpretation. A spec full of confident guesses is more dangerous than one with visible
   gaps, because the gaps get planned around while the wrong guesses get built.
5. **Write explicit non-goals.** "Out of Scope" is as important as "Functional Requirements"
   — it stops scope creep two commands later, when `/spec:plan` or `/engineering:implement`
   is tempted to "just add" something adjacent.

## Self-review checklist (run before finishing)

- [ ] No technology, file, or code-level detail anywhere in the document.
- [ ] Every functional requirement is independently testable.
- [ ] No contradictions between requirements.
- [ ] No unresolved placeholders like "TBD" without a `[NEEDS CLARIFICATION]` marker.
- [ ] Out-of-scope section exists and is specific, not just "everything else."
- [ ] Acceptance criteria map to the functional requirements, not to implementation steps.

## Red flags (stop and fix before continuing)

| Red flag | Why it matters |
|---|---|
| A requirement names a library, framework, or file | Leaked implementation detail — belongs in `/spec:plan` |
| A requirement uses "should" instead of "MUST"/"MUST NOT" | Signals it wasn't actually decided — resolve or mark `[NEEDS CLARIFICATION]` |
| You silently picked an interpretation because asking felt slow | The whole point of a spec is to make disagreements visible before code exists |
| The spec reads like a to-do list of coding steps | You've drifted into planning; move that content to `/spec:plan` |
| A related wireframe/prototype exists but the spec was written without opening it | Downstream `/spec:plan` and `/engineering:implement` will build something that doesn't match the design |
