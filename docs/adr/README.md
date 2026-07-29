# docs/adr/

Architecture Decision Records for choices that are costly to reverse or that other work will
depend on. Written by `/spec:plan` (when a feature's technical approach involves such a
decision), `/engineering:refactor` (when a refactor reveals a structural/architectural change
worth recording), or `/decide` (for a decision that arises mid-work, at any phase, and changes
something already written).

## DECISIONS.md — check this first

`DECISIONS.md` is the single scannable index of every ADR — a row per decision, so you don't
have to open every file to know what's been decided. All three commands above append to it;
if an ADR exists without a row here, that's a bug in whichever command wrote it.

## Filenames

Files are named `YYYY-MM-DD-<slug>.md` — date plus slug, not a sequential counter. This is
deliberate: a sequential `NNNN` number is assigned independently on each branch, so two people
working in parallel can each pick "the next number" for two different decisions without
either branch knowing about the other. Since their slugs differ, the resulting filenames
differ too (e.g. `0005-rate-limit-kong.md` vs `0005-auth-oauth.md`) — git sees two unrelated
new files and merges both silently, with no conflict to force a fix, leaving two ADRs that
both claim to be "0005." Date+slug avoids this by construction: a collision would require the
same slug on the same day, which either means it's genuinely the same decision (should be a
revision, not a new ADR) or is vanishingly unlikely. Use `template.md` as the starting point
for a new record.

## Status values

`Proposed` → `Accepted` → optionally `Superseded by <YYYY-MM-DD-slug>` if a later decision
replaces this one. Superseded records are kept, not deleted — they're still part of the
project's history.
