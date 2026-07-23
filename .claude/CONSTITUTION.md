# Project Constitution

This file is the non-negotiable contract every `/spec:*` and `/engineering:*` command and
skill in this toolkit must honor. Modeled on GitHub Spec-Kit's `constitution.md`. Keep it
short — this is process governance, not a design doc.

## Principles

1. **Spec is the contract.** `/engineering:implement` may not silently diverge from
   `docs/specs/<slug>/Specification.md`. If reality demands a change, update the spec first
   (re-run `/spec:spec`) — don't quietly drift.
2. **Tests before code.** Every behavior change is written test-first (see the
   `test-driven-development` skill). No exceptions without explicit user sign-off.
3. **Root cause over patches.** No fix ships without a root-cause investigation when behavior
   is unexpected (see the `systematic-debugging` skill).
4. **Small, reviewable units.** Tasks are bite-sized and independently testable. Refactors
   proceed in small steps with tests green throughout.
5. **Evidence before claims.** No command may report something as done, passing, or fixed
   without fresh command output proving it (see the `verification-before-completion` skill).
6. **Docs are durable, not disposable.** `Specification.md` / `ImplementationPlan.md` / ADRs /
   `Tasks.md` are the project's source of truth. Update them, don't bypass them; never
   silently overwrite without confirming with the user.

## Process rules for commands

- Every command reads this file before acting.
- Every command checks for existing artifacts under `docs/` before writing; ask before
  overwriting, never overwrite silently.
- `/engineering:implement` and `/engineering:test` MUST invoke `test-driven-development`;
  MUST invoke `systematic-debugging` before a second attempt at fixing the same failure.
- `/engineering:review` prefers the host project's own code-review tooling if present;
  otherwise it uses this toolkit's `reviewing-code` skill.
- `/engineering:refactor` requires a green test suite before starting and after every step.

## Amendments

Edit this file directly and add a line below. No formal versioning process for MVP.

- 2026-07-23 — Initial constitution created.

## Out of scope (for now)

Business, UX, and Release phase governance are not yet defined. `docs/business/`, `docs/ux/`,
and `docs/architecture/` are reserved, empty placeholders for a future pass.
