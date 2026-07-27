---
description: Capture a product/technical decision made mid-work (any phase), record it durably, and find what downstream docs need updating
argument-hint: [slug] "[decision one-liner]"
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /decide — Capture and Propagate a Decision

Invoke the **decision-capture** skill. This command exists for the case none of the other 15
commands own: a decision that changes something already written — mid-`/engineering:implement`,
mid-conversation, whenever — not neatly tied to `/spec:plan`'s upfront planning pass or
`/engineering:refactor`'s structural cleanup. Without a place to land, decisions like this get
lost in chat and never reach the docs that depended on the old approach.

## Inputs

- `$ARGUMENTS`: a slug for this decision and a one-line statement of what was decided. Ask for
  whichever is missing.
- `.claude/CONSTITUTION.md`.
- `docs/adr/DECISIONS.md` — the running index; read it to pick the next ADR number and to
  check whether this decision supersedes an existing one.

## Process

1. Read the constitution and `docs/adr/DECISIONS.md`.
2. Invoke **decision-capture** to write the ADR: context, the decision itself, consequences,
   and — if this replaces an earlier decision — mark that ADR `Superseded by ADR-000N` (never
   delete it).
3. Write `docs/adr/NNNN-<slug>-<decision>.md` using `docs/adr/template.md`.
4. Append a row to `docs/adr/DECISIONS.md` (see format below) — this is the one file to scan
   for "what has been decided," so it must stay current every time this command runs.
5. **Propagate**: Grep `docs/specs/*/Specification.md`, `docs/specs/*/ImplementationPlan.md`,
   `docs/specs/*/Tasks.md`, and `docs/architecture/Architecture.md` for terms tied to the old
   approach (from the decision's context, not just the exact old keyword). List every match as
   a file that now may be stale.
6. For each stale file found, ask the user whether to update it now or leave a flagged
   follow-up note in that file's own "Open Questions"/"Risks" section — do not silently update
   or silently ignore either way.
7. Report a summary: the ADR written, its `DECISIONS.md` entry, and the propagation list with
   what was updated vs. flagged.

## docs/adr/DECISIONS.md row format

```markdown
| 000N | YYYY-MM-DD | <one-line decision> | Accepted | supersedes 000M (if any) | <slugs/files affected> |
```

## Guardrails

- Every decision gets an ADR — this command never just appends to the index without one; the
  index is a summary view, the ADR is the record.
- Never skip the propagation grep, even for a decision that feels self-contained — that
  assumption is exactly how decisions get lost.
- Do not silently rewrite a spec/plan/task file — always surface what you found and let the
  user choose update-now vs. flag-for-later.
