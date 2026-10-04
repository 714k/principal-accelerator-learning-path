# Technical Standards

These are defaults, not immutable technology mandates. A session may
deliberately compare or replace them when that choice is itself part of
the learning.

## Primary languages

-   TypeScript as the primary application/platform language.
-   Python when pedagogically or technically justified for AI/data
    workloads.

## Frontend

Use modern web platform practices. React and Angular are both valid
learning/production surfaces where comparison adds value.

## Backend

Node.js/TypeScript by default; Python services when appropriate.

## Data

-   PostgreSQL for relational work.
-   Redis for caching/ephemeral state.
-   Other stores only when justified by workload/learning objective.

## Testing

Use the applicable layers: - unit; - integration; - contract; - E2E; -
architecture/boundary tests; - accessibility; - performance; -
security; - AI evals.

## Delivery

-   containers where appropriate;
-   CI/CD;
-   feature flags/configuration/secrets;
-   cloud introduced progressively;
-   infrastructure as code when the curriculum reaches it.

Do not prematurely freeze a cloud provider, Kubernetes distribution,
vector database or model provider when comparing those choices is
educationally useful.

## Architecture documentation

Use: - ADRs; - RFCs; - C4-style diagrams where useful; - sequence
diagrams; - data-flow diagrams; - architecture reviews.

## Observability

Progress toward: - structured logs; - metrics; - traces; -
OpenTelemetry; - SLI/SLO/error-budget reasoning.

## Accessibility

Accessibility is a system quality, not a final checklist. Use semantic
HTML, keyboard behavior, focus management, automated checks and manual
validation where applicable.

## Security

Treat authentication, authorization, secrets, dependencies, input
boundaries, threat modeling and AI-specific threats as architecture
concerns.

## Metrics

Never hard-code invented "success metrics" into the public dashboard as
though measured. Fixture/demo data must be labeled. Prefer generated
machine-readable evidence from tests, benchmarks and evals.

## Repository quality

Do not disable lint/type/test/security rules merely to make Codex output
pass. Deviations must be reported and justified.
