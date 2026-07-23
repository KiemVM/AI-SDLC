# docs/ux/

UX-phase artifacts, created at runtime by the `/ux:*` commands:

```
docs/ux/
├── journeys/
│   └── <persona-slug>-<journey-slug>.md   # from /ux:user-journey
├── wireframes/
│   └── <screen-slug>.md                    # from /ux:wireframe
└── prototypes/
    └── <prototype-slug>.md                 # from /ux:prototype
```

Order: `/ux:user-journey` (needs a persona from `docs/business/personas/`) → `/ux:wireframe`
(one per screen the journey implies) → `/ux:prototype` (stitches wireframes into a flow, and
checks readiness before handing off to `/spec:spec`).
