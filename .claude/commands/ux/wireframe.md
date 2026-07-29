---
description: Produce a low-fidelity wireframe (structure and content priority, not visual polish) for one screen
argument-hint: "[what this screen is for]" [optional-screen-slug-override]
allowed-tools: Read, Write, Edit, Glob, Grep
disable-model-invocation: false
---

# /ux:wireframe — Wireframe a Screen

Invoke the **wireframing** skill.

## Inputs

- `$ARGUMENTS`: a one-line purpose for this screen — REQUIRED, ask if missing. A screen-slug
  is auto-derived from it (kebab-case, 2-4 words); add your own as an extra word to override.
- The relevant `docs/ux/journeys/*.md` this screen supports, if one exists (not required to
  proceed, but reference it if found via Glob).

## Process

1. Derive `<screen-slug>` (kebab-case, 2-4 words) from the purpose, unless the user gave one
   explicitly.
2. Check `docs/ux/journeys/` for a journey that names this screen as a candidate; read it if
   found.
3. If a Figma MCP connector is available and authorized in this session, ask the user whether
   they'd prefer an actual Figma wireframe (via the `figma-use` skill) instead of a markdown
   one — otherwise default to the markdown/ASCII wireframe below without asking.
4. Invoke **wireframing** to lay out regions, key elements per region, and states
   (empty/loading/error/populated).
5. Write `docs/ux/wireframes/<screen-slug>.md`.
6. Report a summary (including the derived slug) and point the user to `/ux:prototype` once
   enough screens exist to link into a flow.

## Output template — docs/ux/wireframes/<screen-slug>.md

```markdown
# Wireframe: <Screen Name>
Supports journey: docs/ux/journeys/<slug>.md (if applicable)

## Purpose
<what this screen is for, in one sentence>

## Layout
\`\`\`
+----------------------------------------+
| Header: <what's here>                   |
+----------------------------------------+
| Nav       | Main content:               |
|           |  - <key element>            |
|           |  - <key element>             |
+----------------------------------------+
\`\`\`
(ASCII sketch — structure and priority, not pixels)

## Key Elements
| Element | Purpose | Priority |
|---|---|---|

## States
- Empty: ...
- Loading: ...
- Error: ...
- Populated: ...
```

## Guardrails

- This is structure and content priority, not visual design — no colors, fonts, or spacing
  decisions.
- Don't wireframe screens with no journey or persona need behind them; ask if the purpose
  is unclear.
