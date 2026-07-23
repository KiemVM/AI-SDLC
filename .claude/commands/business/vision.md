---
description: Capture the product's problem, target users, and success criteria at the highest level (BMAD-style vision)
argument-hint: [optional focus note]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /business:vision — Write the Product Vision

Invoke the **vision-writing** skill for process and quality bar. This is the first artifact
in the pipeline — everything downstream (`/prd`, `/persona`, `/architecture`, and eventually
every feature spec) should trace back to it.

## Inputs

- `$ARGUMENTS`: optional focus note (e.g. a specific angle the user wants emphasized).
- `.claude/CONSTITUTION.md`.
- Any existing `docs/business/Vision.md` — summarize it and ask whether to revise in place or
  start a new revision; never silently overwrite.

## Process

1. Read `.claude/CONSTITUTION.md` if it exists.
2. Invoke **vision-writing** to run the discovery loop: problem, target market/users,
   opportunity, high-level goals, success metrics, explicit non-goals.
3. Write `docs/business/Vision.md` using the template below.
4. Report a summary and point the user to `/business:prd` next.

## Output template — docs/business/Vision.md

```markdown
# Vision: <Product Name>

## Status
Draft | Approved

## Problem
<What problem exists today, for whom, and why it's worth solving>

## Target Users / Market
<Who this is for>

## Opportunity
<Why now, why us — brief>

## Goals
- G-1: <high-level, outcome-oriented goal>

## Success Metrics
- <measurable signal that the goals were met>

## Non-Goals
- <explicitly out of scope at the product level>
```

## Guardrails

- Stay at the product level — no feature lists, no tech stack, no UI detail. Those belong to
  `/business:prd`, `/business:architecture`, and the UX phase respectively.
- Do not resolve ambiguity by guessing; ask.
