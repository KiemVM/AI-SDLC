---
description: Map a persona through a scenario end to end — goal, steps, touchpoints, pain points
argument-hint: <persona-slug> "[scenario one-liner]" [optional-journey-slug-override]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /ux:user-journey — Map a User Journey

Invoke the **user-journey-mapping** skill.

## Inputs

- `$ARGUMENTS`: an existing persona-slug — REQUIRED, this is a lookup key, not derived. If
  omitted or it doesn't match a file, Glob `docs/business/personas/` and list what's available
  rather than guessing. Also a one-line scenario — REQUIRED, ask if missing.
- `docs/business/personas/<persona-slug>.md` — REQUIRED. If missing, stop and tell the user to
  run `/business:persona` first.
- `docs/business/Vision.md` / `PRD.md` if present, for goal context.

## Process

1. Resolve `<persona-slug>` against `docs/business/personas/`; read it (and vision/PRD if
   present).
2. Derive `<journey-slug>` (kebab-case, 2-4 words) from the scenario, unless the user gave one
   explicitly.
3. Invoke **user-journey-mapping** to walk the scenario: trigger, steps, touchpoints,
   emotional highs/lows, where it could fail, and what success looks like.
4. Write `docs/ux/journeys/<persona-slug>-<journey-slug>.md`.
5. Report a summary (including the derived journey-slug) and point the user to `/ux:wireframe`
   for the journey's key screens.

## Output template — docs/ux/journeys/<persona-slug>-<journey-slug>.md

```markdown
# User Journey: <Journey Name>
Persona: docs/business/personas/<persona-slug>.md

## Scenario
<1-2 sentences — what triggers this journey>

## Steps
| # | Action | Touchpoint | Persona's goal at this step | Risk of drop-off |
|---|---|---|---|---|

## Emotional Arc
<brief — where frustration or delight peaks>

## Success Criteria
- The persona achieves <goal> in <bounded number of steps/time>, without <known pain point>.

## Candidate Screens
- <screen names that steps above imply — feeds /ux:wireframe>
```

## Guardrails

- Ground every step in the persona's actual goals/pain points — don't invent steps the
  persona has no motivation for.
- Do not design UI here — screens are named as candidates only; layout is `/ux:wireframe`'s
  job.
