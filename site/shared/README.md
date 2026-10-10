# Shared public-site source boundary

This directory reserves the logical shared boundary for compatible public site assets.

`diagrams/**/*.mmd` is the editable Mermaid source. `npm run build` converts each
source to its adjacent `.svg`, verifies a usable `viewBox`, adds SVG title/description
metadata, and copies only the SVG artifacts to `dist/shared/diagrams/`. The browser
never receives Mermaid source or a Mermaid runtime. Do not hand-edit generated SVGs;
change the `.mmd` source and rebuild.

Do not store private evidence, credentials, employer material, or learner conclusions here.
