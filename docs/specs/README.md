# docs/specs/

Each feature gets its own subfolder here, named with a kebab-case slug, created at runtime by
the `/spec:*` commands — nothing is pre-created:

```
docs/specs/<feature-slug>/
├── Specification.md       # from /spec:spec — WHAT and WHY
├── ImplementationPlan.md  # from /spec:plan — technical approach
└── Tasks.md                # from /spec:tasks — task backlog
```

Start a new feature with `/spec:spec <feature-slug> "<one-line description>"`.
