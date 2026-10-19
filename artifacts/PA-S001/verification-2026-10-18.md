# PA-S001 Build verification — 2026-10-18

## Scope and sources

This existing repository had prepared staged changes before this Build. The new ES/EN `theory.md` files were materialized from the text between the two canonical markers in the supplied handoff, with only outer blank lines normalized. The two declared source-file SHA-256 values in the handoff do not match the bytes embedded between its markers. The materialized files hash to:

- ES: `5a8926f36af1ab9f69f856610f9f2f5f48cf92ba633da69637194aa06ae23d7f`
- EN: `4b2c8287e5dd3854244b419dfcc32ed340409c6b3891e8d8a37c0f9b1f02ef4f`

The prompt declares `04abeb81bbb3f5885f09deace42ae216ba251cdfef3f9d08799a4aaa63770a6f` for ES and `0fa598abff5457df8ee92159698f135e59d26f47021ee8eb7aabd00a9ede38f2` for EN. No missing text was reconstructed from those hashes.

## Commands and outcomes

| Command | Outcome |
|---|---|
| `npm run check` | Passed: ESLint, TypeScript, 12 tests, static build; 14 HTML pages and 20 SVG source diagrams generated. |
| `python3 project-sources/verify-accelerated-learning-contract.py --prompt <handoff> --es site/es/sessions/PA-S001/theory.md --en site/en/sessions/PA-S001/theory.md` | Passed heuristic structural check after the checker was updated to recognize the supplied plain-text format. |
| `python3 project-sources/verify-theory-concepts.py site/es/sessions/PA-S001/theory.md site/en/sessions/PA-S001/theory.md` | Passed: 24 concepts and seven topic records per locale, card coverage and parity. |
| `python3 project-sources/verify-learning-site-contract.py` | Passed machine regression check. |
| `BASE_PATH=/accelerator/ npm run build` | Passed; generated static subpath build. |
| `git diff --check` | Passed for new working-tree changes. |
| `git diff --cached --check` | Reports pre-existing staged whitespace in learner context and example theory files; those files were preserved. |

## Rendered inspection

Puppeteer loaded `/es/`, `/en/`, both PA-S001 sessions, both P0 project pages, and `/portfolio/` at 390, 820, and 1440 CSS pixels. Every route returned HTTP 200 with no page-level horizontal overflow or page JavaScript errors. The final session markup has one H1, 12 study controls, 25 cards, and three visual modes per locale. At 390 pixels, all seven session SVG images loaded when eager loading was requested; CSS scaled them to content width. A separate `/accelerator/` preview returned HTTP 200 for both dashboards, sessions and P0 project pages with no horizontal overflow. All 40 copied SVG files parsed as XML and had a viewBox, accessible title, description, and image role.

Browser interaction checks confirmed that a study mark wrote to `pa-study-v1:PA-S001:exercise:atomic-scope` in localStorage and remained checked after reload; the mark was then cleared. Flashcard flip exposed the answer, Next advanced the counter from 1/25 to 2/25, the Light/Dark control persisted the dark choice, and reduced-motion media changed scroll behavior to `auto`. With JavaScript disabled, all 25 card answers and the three-layer theory content remained in the document; the page now states that study boxes do not persist in that mode.

The content integrity test compares every non-diagram source line against the rendered ES/EN theory after normalizing HTML entities and citation spacing. It found no lost prose or code lines. Flashcard column labels are represented by card structure and controls rather than repeated as a raw table header.

Manual visual inspection used phone session and desktop dashboard screenshots. It is a layout review, not a WCAG conformance audit or semantic translation review.

## Dependencies and limits

`marked` was removed because the supplied canonical payload is rendered by local tooling. React and Astro remain unselected candidates; Mermaid CLI is retained only for build-time SVG. The Node executable here is v22.22.0 while `package.json` declares Node 24.12–24.x. `npm uninstall -D marked` reported the engine mismatch and three low-severity audit findings. No production deployment, commit, push or PR was performed. Canonical progress remains `Not started`, and mastery remains `not-assessed`.
