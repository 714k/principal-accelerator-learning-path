# PA-S001 — mechanical Build verification (2026-10-19)

## Source and scope

Repository: `/home/tlak/training/principal-accelerator-learning-path` at the existing Git baseline. The learner supplied `PA-S001-payload/` with both canonical files. `python3 PA-S001-payload/verify-payload.py` exited 0; direct `wc -c` and `sha256sum` agreed:

| Build source | Bytes | SHA-256 |
| --- | ---: | --- |
| `site/content/canonical/PA-S001-theory-es.md` | 45,577 | `4a29a68ec5ca5ed0b73c19c45ce7f4c18f3dba7824cfd8944c90db2e1a04af99` |
| `site/content/canonical/PA-S001-theory-en.md` | 41,953 | `b63622e5fc36c562c83b7cc6c62a7858d4bf6aee99a8f2680267b367d15eb333` |

The build reads these copies byte for byte. Earlier `site/{es,en}/sessions/PA-S001/theory.md` files remain in the repository but are not build inputs. Existing changes in `project-sources/` were left untouched. The ZIP named in the v2 handoff was no longer present when checked; the learner supplied the complete unpacked directory, and its verifier and hashes passed. No new dependencies, framework decision, application algorithm, or hosting action were introduced.

## Content and behavior

- The source gate checks hashes, final newline, 17 concept IDs in sequence, one main topic, six subtopics, separate scope lessons before synthesis, three substantive reading levels, 24 retrieval questions/answers, and four exercise plus eight checklist IDs shared across ES/EN.
- The renderer retains authored paragraphs, tables, code, sources, links, and sequence. The Level 3 paragraphs use native `details`; the summary has three points. A source-to-rendered-HTML test compares substantive prose lines in order in both languages, in addition to heading and ID tests.
- The Studio has a Mermaid source at `site/shared/diagrams/PA-S001/canonical-map.mmd` and a generated accessible SVG with a responsive `viewBox`, localized title and description. The map and 24 source-linked cards are in the HTML. A readable list of all 24 IDs provides a narrow-screen alternative to the dense diagram.
- Twelve study controls use the same stable IDs in both languages and only local study storage. The dashboard displays an empty mark state until a mark has been saved. Canonical progress and mastery remain separate.

## Commands and observed results

| Command/check | Result |
| --- | --- |
| `python3 PA-S001-payload/verify-payload.py` | exit 0; both files passed size, SHA-256, UTF-8 and final newline |
| `wc -c` and `sha256sum` on supplied and copied files | exit 0; all four checks matched expected values |
| `npm run lint`, `npm run typecheck`, `npm test` during integration | initial lint and tests failed on the first parser/test draft; fixed without disabling rules; typecheck passed |
| `npm run check` on the shell's Node 22.22.0 | exit 0; lint, typecheck, 6 tests and build passed |
| `PATH=/home/tlak/.nvm/versions/node/v24.21.0/bin:$PATH npm run check` | exit 0 on the declared Node 24 line; 6 tests passed; 14 HTML pages and 21 SVG sources generated |
| Python internal link/fragment/asset inspection of `dist/**/*.html` | 811 local references checked; 0 broken targets or fragments |
| Headless Chromium at 390×844, 768×1024, 1440×900 on both session routes | 17 lessons, 24 cards, 12 controls and SVG found; no document horizontal overflow |
| Headless Chromium interactions | exercise mark survived reload and language switch; unmark propagated back; theme survived reload; card next/flip worked |
| Headless Chromium dashboard with fresh storage | initial counts showed `— / 4` and `— / 8`; after one ES exercise mark, EN showed `1 / 4` while untouched checks remained `— / 8` |
| Headless Chromium without JavaScript | all 24 answers visible, 17 native Level 3 disclosures present, theory and SVG present |
| Headless Chromium keyboard/focus | first Tab reached skip link with visible outline; native Level 3 disclosure opened |
| `git diff --check` | exit 0 |

The first browser script timed out because its locator selected a hidden previous card after moving to card 2. A corrected locator selected the visible card and the interaction check passed. This was an automation selector error, not a site failure.

The study activity history now uses a `pa-study-v2` key so events from the previous six-exercise/six-check version cannot appear as activity for the new four-exercise/eight-check contract. Per-item IDs from the supplied theory remain shared across languages.

Inspected output: `dist/es/sessions/PA-S001/index.html`, `dist/en/sessions/PA-S001/index.html`, localized dashboards and `dist/{es,en}/shared/diagrams/PA-S001/canonical-map.svg`. Screenshots: `preview-es-phone.png`, `preview-en-desktop.png`, `preview-es-level3-phone.png`, and `preview-es-studio-phone.png` in this directory. The phone map itself is visually dense; the visible 24-link list keeps every topic readable without zoom or pan.

## Limits and learner review

These are mechanical checks, not evidence of comprehension, semantic translation equivalence, Web Content Accessibility Guidelines conformance, production availability, learning gains, or professional impact. External citations were preserved from the supplied text; live link availability was not revalidated. The learner still owns the P0 boundary decision and architecture alternatives, four exercise answers, a real AI use-case decision, portfolio case studies and public claims, semantic ES/EN review, evidence interpretation, and any L1–L5 assessment. `project-sources/07-PROGRESS.md` remains `Not started`; no `Completed` status is inferred. Hosting requires a separate explicit request.
