# docs/release/

```
docs/release/
└── CHANGELOG.md   # appended to by /release:release
```

`/release:release` is documentation-only: it checks a readiness gate (tests green, no open
`[NEEDS CLARIFICATION]` markers, all in-scope tasks checked off), then drafts a new
`CHANGELOG.md` entry plus a PR/release description (the latter is chat output, not written to
disk). It never runs `git tag`, `git push`, publishes, or deploys — see
`.claude/CONSTITUTION.md` principle 7. Those stay manual, human-confirmed actions.
