---
name: persona-definition
description: Use when running /business:persona, or whenever defining a user persona that later UX work (journeys, wireframes) will reference. Philosophy adapted from BMAD-METHOD's discovery stage and the toolkit's UX extension.
---

# Persona Definition

A persona exists to make later UX and product decisions concrete: "would this persona
actually want this?" only works if the persona is specific enough to answer with. It is a
composite of real user patterns, not biographical fiction.

## Process

1. **Anchor in goals and pain points, not demographics.** Age, name, and hobbies are decoration
   unless they change a design decision — a persona is decision-relevant or it's noise.
2. **State the pain points that motivate using this product.** If a persona has no pain point
   the product addresses, question whether this persona is relevant at all.
3. **Note context of use concretely.** Device, environment, time pressure, and frequency of
   use all change what a good UX looks like — vague context produces vague wireframes later.
4. **Rate technical proficiency honestly**, and connect it to a UX implication (e.g. "Low
   proficiency → avoid jargon, favor guided flows over configuration").
5. **Link back to the vision/PRD.** A persona with no connection to any stated goal or epic is
   probably not worth designing for yet.

## Self-review checklist

- [ ] Every stated goal/pain point is decision-relevant (would change a UX or product choice).
- [ ] Context of use is concrete, not "uses the product sometimes."
- [ ] Technical proficiency rating has a stated UX implication.
- [ ] Persona connects to at least one vision goal or PRD epic.

## Red flags

| Red flag | Why it matters |
|---|---|
| Persona includes a fabricated name/backstory with no decision impact | Decoration that adds false confidence without adding design value |
| Goals list reads identically to another persona already defined | Probably the same persona, or the distinction hasn't been found yet |
| No pain point ties to anything the product actually does | This persona may not need this product at all |
