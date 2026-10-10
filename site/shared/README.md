# Shared public-site source boundary

This directory reserves the logical shared boundary for compatible public site assets.

`diagrams/**/*.mmd` is the editable Mermaid source. `npm run build` converts each
source in a temporary directory, verifies a usable `viewBox`, adds localized SVG
title/description metadata, and copies only SVG artifacts to
`dist/es/shared/diagrams/` and `dist/en/shared/diagrams/`. Existing adjacent SVGs
are legacy snapshots and are not used for publication. The browser never receives
Mermaid source or a Mermaid runtime. Edit `.mmd` and rebuild.

Do not store private evidence, credentials, employer material, or learner conclusions here.
