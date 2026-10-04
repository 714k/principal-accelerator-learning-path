# Principal Engineer Accelerator — P0

PA-S001: Engineering foundations + baseline evidence.
Node.js 24.12+ (24.x), npm, Git; Bash for the bootstrap.
On Windows use Git Bash or WSL, not PowerShell for the .sh command.

```bash
npm ci
npm run check
npm run dev
```

If no package-lock.json exists yet, use npm install once, inspect the lockfile,
then commit it together with the sources. npm ci is for subsequent installs.
Local URL: http://localhost:4173/ . Changes require rebuilding/restarting npm run dev;
this first slice intentionally has no hot reload.

Canonical public sources: site/{es,en}/{sessions/PA-S001,projects/engineering-book}/page.json.
App: apps/book/. Generated deployment artifact: dist/ (never edit by hand).
The build refuses to replace an unmanaged nonempty dist/ directory.
The local server binds only to loopback and is not a production server.

No learner mastery, benchmark, accessibility certification, or deployment is claimed.
Read docs/PA-S001-BUILD.md and complete the learner-owned ADR and failure experiment.
Initial ES/EN chapters are labeled editorial syntheses; full theory publication remains
an explicit Codex task. Light/dark follow system settings; manual selection belongs to PA-S006.
