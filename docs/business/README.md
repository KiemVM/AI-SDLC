# docs/business/

Business-phase artifacts, created at runtime by the `/business:*` commands:

```
docs/business/
├── Vision.md          # from /business:vision — problem, target users, goals, success metrics
├── PRD.md              # from /business:prd — epic list derived from the vision
└── personas/
    └── <persona-slug>.md   # from /business:persona — one file per persona
```

Order: `/business:vision` → `/business:prd` → `/business:persona` (one run per persona) →
`/business:architecture`. `/business:prd` requires `Vision.md` to exist; `/business:architecture`
requires `PRD.md`.
