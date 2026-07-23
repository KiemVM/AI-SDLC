---
name: user-journey-mapping
description: Use when running /ux:user-journey, after a persona exists — walks that persona through a scenario end to end. Philosophy adapted from the toolkit's UX extension (Business Goal -> Persona -> Journey -> Wireframe -> Prototype).
---

# User Journey Mapping

A journey is the bridge between a persona (who) and wireframes (what screens). It exists to
answer: given this persona's actual goals and pain points, what does success look like
step-by-step, and where could it fail?

## Process

1. **Start from the persona's goal, not a feature.** The journey should read as "the persona
   wants X, so they do..." not "the app has a flow where..."
2. **Walk it step by step**, naming the touchpoint (screen, notification, external channel)
   at each step — vague steps like "user interacts with the app" produce vague wireframes
   later.
3. **Mark the emotional arc.** Where does friction peak? Where's the moment of relief or
   accomplishment? This tells `/ux:wireframe` where to invest the most design care.
4. **Identify drop-off risk per step.** A step with high drop-off risk is a design priority,
   not an afterthought.
5. **Define success concretely**, bounded by time or step count where possible, and tied back
   to the persona's original goal.
6. **List candidate screens** as a bridge to `/ux:wireframe` — names only, no layout.

## Self-review checklist

- [ ] Every step ties back to the persona's stated goal.
- [ ] Each step names a concrete touchpoint, not a vague interaction.
- [ ] At least one drop-off risk is identified, or the journey is trivial enough that none
      exists (state that explicitly).
- [ ] Success criteria are concrete and traceable to the persona's goal.

## Red flags

| Red flag | Why it matters |
|---|---|
| Steps describe UI ("clicks the blue button") instead of intent | Premature UI commitment before wireframing has happened |
| No step is marked as risky/frustrating | Either the journey is genuinely trivial, or friction points were missed |
| The journey doesn't match anything in the persona's goals/pain points | Likely designed from assumption rather than the actual persona document |
