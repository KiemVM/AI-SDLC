# docs/adr/

Architecture Decision Records for choices that are costly to reverse or that other work will
depend on. Written by `/spec:plan` (when a feature's technical approach involves such a
decision) or `/engineering:refactor` (when a refactor reveals a structural/architectural
change worth recording).

## Numbering

Files are named `NNNN-<slug>-<decision>.md`, zero-padded, sequential across the whole
project (not per-feature). Use `template.md` as the starting point for a new record.

## Status values

`Proposed` → `Accepted` → optionally `Superseded by ADR-000M` if a later decision replaces
this one. Superseded records are kept, not deleted — they're still part of the project's
history.
