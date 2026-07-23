---
name: task-breakdown
description: Use when running /spec:tasks, after an ImplementationPlan.md exists — decomposes it into a small, orderable, testable task backlog. Philosophy adapted from GitHub Spec-Kit's tasks phase and Superpowers' planning discipline.
---

# Task Breakdown

A task backlog turns a plan into an ordered list of small, independently verifiable units of
work, ready for `/engineering:implement` to pick up one at a time.

## Sizing rule

Each task should be **the smallest unit of work that has its own complete test cycle** — a
task you could hand to a fresh reviewer and have them judge "done or not" without needing the
rest of the backlog for context. If a task description needs "and then," it's probably two
tasks. If a task is too small to write a meaningful test for on its own, merge it into its
neighbor.

## Process

1. Read the spec and the plan.
2. List every distinct piece of behavior the plan implies, in implementation order.
3. Apply the sizing rule to split or merge into right-sized tasks.
4. Order by dependency — a task that needs another task's output is listed after it, and the
   dependency is stated explicitly, not left implicit.
5. For each task, write: goal, files touched, dependencies, and a definition of done that
   references the spec's FR-N/acceptance criteria it satisfies.

## Output format

A checklist in `Tasks.md`, one section per task (`Task-1`, `Task-2`, ...), each with a status
checkbox, explicit `Depends on:` line, and a definition of done that is checkable by running
tests — not by reading code.

## Red flags

| Red flag | Why it matters |
|---|---|
| A task has no way to verify "done" except manual inspection | It isn't test-first-shaped; split until it is |
| Two tasks silently touch the same file with no stated dependency | Hidden merge/ordering conflict waiting to surface during `/engineering:implement` |
| A task's definition of done doesn't reference any FR-N | It may not be traceable back to the spec at all |
| The backlog has one giant task covering "the rest of the feature" | Defeats the purpose — break it down further |
