---
name: reviewing-code
description: Use when running /engineering:review, or whenever asked to review a diff or PR for bugs and spec/constitution adherence. If the host project already has Anthropic's official code-review plugin configured, prefer that instead. Philosophy adapted from Superpowers' code-review discipline.
---

# Reviewing Code

## Scope discipline

Review the diff, not the codebase. Findings outside the changed lines belong in a separate
conversation, not this review — bundling them in makes the review noisy and harder to act on.

## Severity buckets

- **Critical** — will cause incorrect behavior, data loss, security issues, or crashes for
  realistic inputs.
- **Important** — likely to cause bugs under less common but plausible conditions, or
  violates an explicit spec/constitution requirement.
- **Minor** — style, naming, or small readability issues that don't affect correctness.

Every finding must cite `file:line` and state the concrete failure scenario — the specific
input or condition that triggers it — not a vague "this could be an issue."

## Checklist

1. **Correctness** — does the diff do what it claims, for the inputs that will actually
   occur? Check edge cases explicitly: empty input, boundary values, concurrent access,
   error paths.
2. **Spec/constitution adherence** — does the diff satisfy the relevant Functional
   Requirements from `Specification.md`? Does it violate any `.claude/CONSTITUTION.md`
   principle (e.g. tests-before-code, evidence-before-claims)?
3. **Missing coverage** — is there a behavior change with no corresponding test?
4. **Reuse/simplification** — does the diff reinvent something that already exists
   elsewhere in the codebase?
5. **Obvious security issues** — injection, unvalidated input crossing a trust boundary,
   secrets in code — flag these regardless of whether they were explicitly asked about.

## Explicit ignore-list

Do not report: issues a linter, type-checker, or CI step would already catch; pre-existing
issues outside the diff; pure style nitpicks with no correctness impact; deliberate,
documented scope decisions.

## Output

List findings most-severe-first. If nothing survives the checklist and ignore-list, say so
plainly — an empty finding list is a valid, useful result, not a failure to find something.

## Interop note

If the project already has Anthropic's official `code-review` plugin/command installed and
configured, prefer it for PR-based reviews — this skill exists as the fallback for projects
that only have this toolkit installed.
