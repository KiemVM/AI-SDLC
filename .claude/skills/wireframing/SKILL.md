---
name: wireframing
description: Use when running /ux:wireframe, or whenever laying out a screen's structure and content priority before visual design or implementation. Philosophy adapted from the toolkit's UX extension and low-fidelity wireframing practice.
---

# Wireframing

A wireframe answers "what's on this screen and what matters most," not "what does it look
like." Low fidelity is a feature, not a limitation — it keeps the conversation on structure
and priority instead of color and font, which come later (or in a real design tool).

## Process

1. **Start from the journey step this screen serves**, if one exists. A screen with no
   journey step behind it should be questioned before wireframing it.
2. **Define regions before elements** — header, navigation, main content, sidebar — then
   place elements within regions, not the other way around.
3. **Rank elements by priority within each region.** Not everything is equally important; the
   wireframe should make clear what the user's eye should hit first.
4. **Cover the states, not just the happy path.** Empty, loading, and error states are where
   real products most often ship nothing — decide them now, not during implementation.
5. **Stay content-first.** ASCII/text sketches are fine and often clearer than trying to
   simulate visual fidelity in markdown — resist the urge to over-specify pixels, colors, or
   fonts here.

## Self-review checklist

- [ ] Every element has a stated purpose — nothing is "just because."
- [ ] All four states (empty/loading/error/populated) are addressed, even briefly.
- [ ] No visual design decisions (color, font, spacing) have leaked in.
- [ ] The wireframe traces back to a journey step or an explicit stated purpose.

## Red flags

| Red flag | Why it matters |
|---|---|
| The wireframe specifies a color or font | Premature visual design — belongs to an actual design tool/pass, not this artifact |
| An element exists with no stated purpose | Likely clutter that will make the real screen harder to build and use |
| Only the "populated, everything worked" state is described | Error/empty/loading states are exactly where products under-invest and it shows |
