# Project Constitution

This file is the non-negotiable contract every command and skill in this toolkit must honor,
across all five phases (Business, UX, Specification, Engineering, Release). Modeled on GitHub
Spec-Kit's `constitution.md`. Keep it short — this is process governance, not a design doc.

## Principles

1. **Upstream docs are the contract for downstream ones.** `PRD.md` may not silently diverge
   from `Vision.md`; a feature's `Specification.md` may not silently diverge from the relevant
   `Persona.md`/`PRD.md` epic; `/engineering:implement` may not silently diverge from its
   `Specification.md`. If reality demands a change, update the upstream artifact first
   (re-run the command that owns it) — don't quietly drift downstream instead.
2. **Tests before code.** Every behavior change is written test-first (see the
   `test-driven-development` skill). No exceptions without explicit user sign-off.
3. **Root cause over patches.** No fix ships without a root-cause investigation when behavior
   is unexpected (see the `systematic-debugging` skill).
4. **Small, reviewable units.** Tasks are bite-sized and independently testable. Refactors
   proceed in small steps with tests green throughout.
5. **Evidence before claims.** No command may report something as done, passing, fixed, or
   release-ready without fresh command output proving it (see the
   `verification-before-completion` skill).
6. **Docs are durable, not disposable.** `Vision.md`, `PRD.md`, persona files, `Architecture.md`,
   `Specification.md`, `ImplementationPlan.md`, ADRs, `Tasks.md`, journey/wireframe/prototype
   files, and `CHANGELOG.md` are the project's source of truth. Update them, don't bypass them;
   never silently overwrite without confirming with the user.
7. **No irreversible actions without explicit confirmation.** No command in this toolkit
   performs `git tag`, `git push`, publishing, or deployment on its own — those stay manual,
   confirmed actions outside this toolkit's automation (see `/release`'s guardrails).

## Process rules for commands

- Every command reads this file before acting.
- Every command checks for existing artifacts under `docs/` before writing; ask before
  overwriting, never overwrite silently.
- `/engineering:implement` and `/engineering:test` MUST invoke `test-driven-development`;
  MUST invoke `systematic-debugging` before a second attempt at fixing the same failure.
- `/engineering:review` prefers the host project's own code-review tooling if present;
  otherwise it uses this toolkit's `reviewing-code` skill.
- `/engineering:refactor` requires a green test suite before starting and after every step.
- `/prd` requires `docs/business/Vision.md` to exist first; `/architecture` requires
  `docs/business/PRD.md`; `/spec:spec` should check whether a relevant persona/PRD epic exists
  and reference it if so, without blocking on it.
- `/user-journey` requires a persona file under `docs/business/personas/`; `/wireframe`
  should reference the journey it supports when one exists; `/prototype` should reference the
  wireframes it stitches together.
- `/release` requires a green test suite and no unresolved `[NEEDS CLARIFICATION]` markers in
  any in-scope spec before drafting release notes, and never performs the release itself —
  see principle 7.

## Amendments

Edit this file directly and add a line below. No formal versioning process for MVP.

- 2026-07-23 — Initial constitution created (Specification + Engineering phases).
- 2026-07-23 — Extended to cover Business, UX, and Release phases (principles 1, 6, 7 updated
  or added; process rules for the eight new commands added).
