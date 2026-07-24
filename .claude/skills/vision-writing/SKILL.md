---
name: vision-writing
description: Use when running /business:vision, or whenever capturing a product's problem, target users, and success criteria at the highest level, before any PRD or feature work. Philosophy adapted from BMAD-METHOD's Analyst-stage discovery.
---

# Vision Writing

A vision statement is the top of the artifact chain: `/business:prd`, `/business:persona`,
`/business:architecture`, and eventually every feature spec should trace back to it. Get this
right and everything downstream has a north star; get it vague and every later document
inherits the vagueness.

## Grounding in an existing codebase (brownfield adoption)

If this product already has source code (the calling command detected project manifests or a
`src/`/`lib/` tree), skim the README and top-level structure *before* starting the discovery
loop below, and summarize what you found back to the user in 2-3 sentences. A vision written
for an existing product should acknowledge what's already built, not read as if starting from
zero — the discovery questions in step 1-5 still apply, but they're now "what should this
become next," not "what should this be." This grounding is conversational context only: it
does not change the `Vision.md` template, and it never produces a file of its own.

## Process

1. **Establish the problem before the solution.** Ask what's broken or missing today, for
   whom, and why it matters enough to build something. Resist jumping to "what we'll build"
   before the problem is concrete.
2. **Name the target users/market specifically.** "Everyone" is not a target market. Push for
   a specific enough description that a persona could later be drawn from it.
3. **State goals as outcomes, not features.** "Reduce investigation time for SOC analysts"
   is a goal; "add a dashboard" is a feature — the latter belongs to the PRD or later, not
   here.
4. **Make success measurable.** Each success metric should be something you could actually
   check later — a number, a rate, a survey result — not a feeling.
5. **Write explicit non-goals.** What this product deliberately will not try to be, so scope
   discipline exists from the very first document onward.

## Self-review checklist

- [ ] No feature list — goals are outcomes, not deliverables.
- [ ] No technology or UI detail.
- [ ] Every goal has a corresponding, checkable success metric.
- [ ] Non-goals section exists and is specific.

## Red flags

| Red flag | Why it matters |
|---|---|
| A goal reads like a feature ("add X") | Feature-shaped goals foreclose solution space too early — reframe as the outcome X would produce |
| Target users described as "everyone" or "all businesses" | Too broad to build a coherent product or persona from |
| A success metric can't be measured with real data | It won't be checkable later, so it won't actually gate anything |
| Vision written for an existing product with no acknowledgment of what's already built | Reads as disconnected from reality; the user will discount the whole document |
