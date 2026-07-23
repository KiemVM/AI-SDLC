---
description: Review the working diff (or a PR) for correctness bugs and spec/constitution adherence
argument-hint: [optional PR number or base-branch]
allowed-tools: Read, Glob, Grep, Bash(git diff:*), Bash(git log:*), Bash(git show:*), Bash(gh pr view:*), Bash(gh pr diff:*)
disable-model-invocation: false
---

# /engineering:review — Code Review

Before invoking the bundled skill: if this project already has Anthropic's official
`code-review` plugin/command configured, prefer that for PR-based review and treat this
command as the fallback. Otherwise, invoke this toolkit's **reviewing-code** skill.

## Inputs

- The working diff (`git diff` against the base branch), or the PR's diff if `$ARGUMENTS` is a
  PR number and `gh` is available.
- The relevant `docs/specs/<slug>/Specification.md` (acceptance criteria) and
  `.claude/CONSTITUTION.md`, if this diff maps to a known feature.

## Process

1. Determine the diff scope.
2. Invoke **reviewing-code** to classify findings as Critical / Important / Minor, citing
   file:line.
3. Cross-check the diff against the feature's acceptance criteria and the constitution's
   principles.
4. Report findings; do not silently fix them — route fixes through `/engineering:refactor` or
   a follow-up `/engineering:implement`.

## Guardrails

- Ignore issues a linter/typechecker/CI would already catch.
- Ignore pre-existing issues outside the diff.
- Always cite file and line.
