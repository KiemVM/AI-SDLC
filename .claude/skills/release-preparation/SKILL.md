---
name: release-preparation
description: Use when running /release:release — gathers completed features, checks release readiness, and drafts changelog/release notes. Never performs the release itself (no git tag/push/deploy). Philosophy adapted from BMAD-METHOD's governance discipline and this toolkit's evidence-before-claims principle.
---

# Release Preparation

This skill exists to answer one question honestly: "is this actually ready to release, and
what changed?" — then draft the documentation, never execute the release itself. Performing
`git tag`, `git push`, or a deploy is explicitly out of scope (see
`.claude/CONSTITUTION.md` principle 7); this skill's output is always a draft for a human to
act on.

## Readiness gate (all must hold before drafting anything)

1. **Tests are green — fresh.** Run the full suite now; do not reuse a result from earlier in
   the conversation. This is the `verification-before-completion` discipline applied to the
   whole release, not one task.
2. **No open `[NEEDS CLARIFICATION]` markers** in any in-scope feature's `Specification.md`.
3. **Every in-scope feature's `Tasks.md` is fully checked off.** A partially-done feature is
   not release material unless the user explicitly says otherwise.

If any item fails, stop and list it as a blocker — do not draft the changelog or PR
description around an unmet gate. A caught blocker is the whole point of this skill.

## Process (once the gate passes)

1. Diff against the last changelog entry to find what's genuinely new.
2. Summarize each completed feature in one line, sourced from its `Specification.md`
   overview — not from guessing at what the code does.
3. Draft the changelog entry and a PR/release description.
4. List the manual commands a human would run next (tag, push, publish, deploy) — clearly
   labeled as suggestions, never executed by this skill.

## Red flags

| Red flag | Why it matters |
|---|---|
| Drafting release notes without running tests fresh in this turn | Violates evidence-before-claims — a stale "tests passed" claim is not evidence |
| A feature is included whose `Tasks.md` still has unchecked items | Ships something that was never verified as actually done |
| The skill (or the agent using it) runs `git push`/`git tag`/a deploy command | Out of bounds — this skill drafts, a human executes |
