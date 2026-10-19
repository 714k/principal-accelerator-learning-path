# Current Verification — v5 accelerated-learning format update

**Scope:** source contracts, project-settings prompt, generic Codex session prompt and explicit site regeneration prompt. This package does not run against or modify the user's live repository, application code, rendered site or published PA-S001 pages.

## Executed checks

- Project Instructions: **7800 Python code points / 7803 UTF-16 code units**, both under 8,000.
- Generic session Codex master contains five accelerated-learning rules **inline**: **PASS**.
- Existing-site regeneration prompt contains five accelerated-learning rules **inline**: **PASS**.
- Demonstration ES/EN Markdown: exactly three preview points before objective, 3 reading levels, and tooltip ≤10 words: **PASS (heuristics only)**.
- Negative test: a Codex prompt missing all five gates is rejected: **PASS**.
- Previously authored PA-S001 ES/EN sample: original 24-concept/7-topic ID and retrieval coverage preserved by copying files unchanged: **PASS**.
- Application runtime source files changed in this package: **none**. No repository was inspected, built or tested.

## Important limitations

- The prior PA-S001 sample was generated before this new contract. It is preserved, not silently rewritten by Codex. To migrate it, ChatGPT must update **both** canonical theory companions first, then the user explicitly requests Codex publication.
- The structural verifier does not validate pedagogy, tooltips in a live browser, accordion accessibility, the quality of cited sources, or code behavior. Those require inspection and tests on the actual implementation.
- Three reading levels apply to substantive concepts; not every incidental term needs its own accordion.
- Study-mode `PA-Sxxx` still produces only two ES/EN theory artifacts. Codex/site/app work still requires a separate explicit instruction.

## Example commands

```bash
python verify-accelerated-learning-contract.py --prompt CODEX-SESSION-MASTER-PROMPT.md --es examples/FORMAT-DEMO-es.md --en examples/FORMAT-DEMO-en.md
python verify-accelerated-learning-contract.py --prompt CODEX-REGENERATE-SITE-CANONICAL.md
python verify-theory-concepts.py examples/PA-S001-theory-es.md examples/PA-S001-theory-en.md
```
