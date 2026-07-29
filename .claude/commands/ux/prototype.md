---
description: Stitch wireframes into a clickable-flow-level prototype spec and check readiness for specification
argument-hint: "[flow description]" [optional-prototype-slug-override]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /ux:prototype — Define a Prototype Flow

Invoke the **prototyping** skill.

## Inputs

- `$ARGUMENTS`: a one-line flow description — REQUIRED, ask if missing. A prototype-slug is
  auto-derived from it (kebab-case, 2-4 words); add your own as an extra word to override.
- `docs/ux/wireframes/*.md` — REQUIRED (at least the screens this flow links). If none exist,
  stop and tell the user to run `/ux:wireframe` first.
- The relevant `docs/ux/journeys/*.md`, to validate the flow actually satisfies it.

## Process

1. Derive `<prototype-slug>` (kebab-case, 2-4 words) from the flow description, unless the
   user gave one explicitly.
2. Glob `docs/ux/wireframes/` and read the screens this flow will link.
3. If a Figma MCP connector is available and authorized, ask whether the user wants an actual
   interactive Figma prototype (via `figma-use`) instead of/alongside the markdown flow spec
   — otherwise default to the markdown flow spec without asking.
4. Invoke **prototyping** to define the screen sequence, transitions/triggers between them,
   and cross-check against the journey's success criteria.
5. Write `docs/ux/prototypes/<prototype-slug>.md`.
6. Run the skill's readiness checklist (below) and report which items are met.
7. Point the user to `/spec:spec` for whichever feature this flow is ready to become — mention
   the derived slug so it can be reused as the spec slug if it fits.

## Output template — docs/ux/prototypes/<prototype-slug>.md

```markdown
# Prototype: <Flow Name>
Journey: docs/ux/journeys/<slug>.md

## Screen Sequence
1. docs/ux/wireframes/<a>.md — triggered by: <entry point>
2. docs/ux/wireframes/<b>.md — triggered by: <action on screen 1>
...

## Transitions
| From | Trigger | To |
|---|---|---|

## Readiness for Specification
- [ ] Every step of the source journey is covered by a screen in this flow.
- [ ] Every transition has a clear, unambiguous trigger.
- [ ] No screen exists in this flow without a stated purpose from the journey.
- [ ] Open UX questions are listed below, not silently resolved.

## Open Questions
- [NEEDS CLARIFICATION: ...]
```

## Guardrails

- Don't mark readiness items met if they aren't — an honest "not ready yet" is more useful
  than a rubber-stamped checklist.
- Do not begin `/spec:spec` from inside this command — hand off explicitly instead.
