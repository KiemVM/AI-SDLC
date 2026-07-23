---
description: Prepare release documentation — changelog, readiness checklist, PR/release notes draft. Never tags, pushes, or deploys.
argument-hint: [optional version/tag label]
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(git log:*), Bash(git diff:*), Bash(git status:*)
disable-model-invocation: false
---

# /release:release — Prepare a Release

Invoke the **release-preparation** skill. Per `.claude/CONSTITUTION.md` principle 7, this
command is **documentation only** — it never runs `git tag`, `git push`, publishes a package,
or deploys anything. It drafts what a human runs manually.

## Inputs

- `docs/specs/*/Tasks.md` (Glob) — to determine which features are complete since the last
  release.
- `docs/release/CHANGELOG.md` — read the most recent entry to know the cutoff.
- `.claude/CONSTITUTION.md`.
- Current test suite (run fresh — do not reuse a stale result).

## Process

1. Read the constitution and the changelog's most recent entry.
2. Glob `docs/specs/*/Tasks.md`; for each feature completed (all tasks checked) since the last
   changelog entry, note its slug and a one-line summary from its `Specification.md`.
3. Invoke **release-preparation** to run the readiness gate:
   - Full test suite is green (run it now, fresh — this is the
     `verification-before-completion` evidence for the whole release, not just one task).
   - No `[NEEDS CLARIFICATION]` markers remain open in any in-scope spec.
   - Every in-scope feature's `Tasks.md` is fully checked off.
   Any unmet item is a **blocker** — list it, don't paper over it.
4. If there are no blockers, draft a new entry in `docs/release/CHANGELOG.md` and a PR/release
   description (chat output, not written to disk).
5. Print the manual commands the user would run next (tag, push, publish, deploy) — labeled
   clearly as suggestions to run themselves, not something this command executes.

## Output — docs/release/CHANGELOG.md entry template

```markdown
## [$ARGUMENTS or "Unreleased"] - YYYY-MM-DD

### Added
- <feature summary> (docs/specs/<slug>/)

### Fixed
- ...

### Changed
- ...
```

## Output — PR/release description (chat only, not written to a file)

```markdown
## Summary
<1-3 bullets, user-facing>

## Included features
- <slug>: <one-line summary>

## Test plan
- [ ] Full suite green (evidence: <fresh run output>)
```

## Guardrails

- Never execute `git tag`, `git push`, `gh release create`, `npm publish`, or any deploy
  command. Print them as suggested next steps only.
- If any readiness item fails, stop at the blocker list — do not draft the changelog/PR
  description until blockers are resolved or the user explicitly overrides.
