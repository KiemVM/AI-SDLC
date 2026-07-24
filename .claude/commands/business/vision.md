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
- Whether source code already exists in this project (this command works the same for a
  brand-new project and an existing one — see step 2 below).
- Any existing `docs/business/Vision.md` — summarize it and ask whether to revise in place or
  start a new revision; never silently overwrite.

## Process

1. Read `.claude/CONSTITUTION.md` if it exists.
2. Check whether source code already exists (Glob for common project manifests —
   `package.json`, `requirements.txt`, `go.mod`, `pom.xml`, etc. — and top-level `src/`/`lib/`
   dirs). If found, invoke **vision-writing**'s brownfield-grounding step first: skim the
   README and top-level structure, summarize the current product in 2-3 sentences, and confirm
   that with the user before moving on. Skip this step entirely for a new/empty project.
3. Invoke **vision-writing** to run the discovery loop: problem, target market/users,
   opportunity, high-level goals, success metrics, explicit non-goals.
4. Write `docs/business/Vision.md` using the template below. This grounding step never
   produces its own file — it's context for this conversation only, and `Vision.md` still
   needs your explicit confirmation before this command writes it.
5. Report a summary and point the user to `/business:prd` next.

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
