# APPLY THIS BASELINE

Use this folder as the current Project Sources baseline.

## Required project setup

1. Replace the matching Project Source files `00`–`13` with these versions.
2. Replace the Project Instructions text with `PROJECT-INSTRUCTIONS-SETTINGS.md`.
3. Keep `/ui-reference/` in the repository root.
4. Do not delete local `site/` improvements before regeneration. Git/current repository implementation is the preserve-and-extend baseline.
5. For an immediate repair of the existing Learning Site, run Codex with `CODEX-REGENERATE-SITE-CANONICAL.md`.
6. For future `PA-Sxxx` sessions, the generated Codex prompt must inline the hard Learning Site gates from `11-CODEX-GUIDELINES.md`; a prompt that only says “follow the Sources” is incomplete.

## Critical observable requirements

- `/es/` and `/en/` are real dashboards from PA-S001 onward.
- Trackable Exercise/Mastery checkboxes are enabled, toggleable, persisted study state with stable ES/EN IDs.
- Checked study items never imply L1–L5 mastery or Completed status.
- Existing dashboard/navigation/Visual Learning Studio/accessibility capabilities are preserved on regeneration.
- `apps/book/` is legacy only.
- Rendered HTML is inspected after canonical checks.

## Optional local hard-fail helper

Run:

```bash
python verify-learning-site-contract.py <repository-root>
```

It inspects available generated HTML for several regressions. Repository-native tests remain authoritative and should be expanded to cover the full contract.

## Learning-text migration
This baseline also upgrades the content-generation contract. Existing and future theory pages must be migrated to the Learning Text Ergonomics Contract. Run the canonical Codex regeneration prompt to bring the renderer/schema forward; do not manually rewrite only PA-S001 and leave future sessions unchanged.
