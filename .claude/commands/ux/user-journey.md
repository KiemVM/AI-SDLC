---
description: Map a persona through a scenario end to end — goal, steps, touchpoints, pain points
argument-hint: [persona-slug] [journey-slug] "[scenario one-liner]"
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /ux:user-journey — Map a User Journey

Invoke the **user-journey-mapping** skill.

## Inputs

- `$ARGUMENTS`: a persona slug, a journey slug, and a one-line scenario. Ask for whichever is
  missing.
- `docs/business/personas/<persona-slug>.md` — REQUIRED. If missing, stop and tell the user to
  run `/business:persona <persona-slug>` first.
- `docs/business/Vision.md` / `PRD.md` if present, for goal context.

## Process

1. Read the persona (and vision/PRD if present).
2. Invoke **user-journey-mapping** to walk the scenario: trigger, steps, touchpoints,
   emotional highs/lows, where it could fail, and what success looks like.
3. Write `docs/ux/journeys/<persona-slug>-<journey-slug>.md`.
4. Report a summary and point the user to `/ux:wireframe` for the journey's key screens.

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
