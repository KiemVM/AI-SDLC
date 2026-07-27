---
name: decision-capture
description: Use when running /decide, or whenever a product/technical decision changes something already written (a spec, plan, architecture doc) mid-work — captures it as an ADR and finds what needs to be updated downstream. Philosophy adapted from GitHub Spec-Kit's ADR discipline and BMAD-METHOD's documentation-first governance.
---

# Decision Capture

A decision made mid-work and never written down doesn't disappear — it just goes underground.
It lives in chat history, in one person's memory, in a Slack thread nobody re-reads. The next
person (or the next `/engineering:implement` run) rebuilds against the old assumption because
nothing told them it changed. This skill's job is to make that impossible: every decision that
changes previously-written direction gets a durable, structured record, and an explicit check
for what else now needs to change.

## What counts as a decision worth capturing

Not everything does — a decision belongs here when it **changes or forecloses direction that
was already written down or already assumed** elsewhere: switching a technical approach
(rate-limiting library to Kong), reversing a scope call (an epic marked Should is now Must),
picking between two previously-open options. A decision that's purely local to one task with
no effect elsewhere doesn't need this — that's just normal implementation judgment.

## Process

1. **State the decision plainly**, not as a question or a hedge. "We're using Kong for
   rate-limiting" is a decision; "maybe Kong could work" is not yet one.
2. **Capture the context that forced it** — what was tried, what changed, why the old
   direction no longer holds. Future readers need to know *why*, not just *what*, especially
   when they're deciding whether this decision still applies to their situation.
3. **Check `docs/adr/DECISIONS.md` for anything this supersedes.** If found, mark the old ADR
   `Superseded by ADR-000N` — never delete or silently edit it; the record of "we used to
   think X" is itself valuable history.
4. **Write the ADR** using the standard template (Context / Decision / Consequences) — same
   shape whether it came from `/spec:plan`, `/engineering:refactor`, or `/decide`, so
   `docs/adr/` stays one consistent format regardless of when a decision happened.
5. **Propagate — this is the step that's easiest to skip and most important not to.** Search
   every spec, plan, task list, and the architecture doc for the old assumption. A grep on the
   literal old term isn't enough if the language differs ("rate limit" vs "throttling" vs
   "request quota") — think about what else, in plain language, depended on the old direction.
6. **Surface stale references, don't silently fix or silently ignore them.** The person who
   made the decision may not be the right person to also silently rewrite five other
   documents' worth of consequences — ask.

## Self-review checklist

- [ ] The decision is stated as a decision, not a question.
- [ ] Context explains why, not just what.
- [ ] Any superseded ADR is marked, not deleted.
- [ ] `docs/adr/DECISIONS.md` has a new row — the index is the thing people actually scan.
- [ ] Every plausibly-affected doc was searched, not just the one the user happened to
      mention.

## Red flags

| Red flag | Why it matters |
|---|---|
| A decision only exists in chat/conversation, never written to `docs/adr/` | It will be forgotten or contradicted the next time this comes up |
| `docs/adr/DECISIONS.md` wasn't updated even though a new ADR was written | The index drifts from reality, so nobody trusts it as the scan-first source |
| The propagation search used only the exact old keyword | Misses documents that describe the same thing in different words |
| A stale spec/plan was silently rewritten without telling the user | Removes their chance to catch a propagation mistake before it compounds |
