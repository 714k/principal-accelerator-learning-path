#!/usr/bin/env python3
from pathlib import Path
import re, sys, json
root=Path(sys.argv[1] if len(sys.argv)>1 else '.')
errors=[]; warnings=[]
html=list(root.glob('dist/**/*.html'))+list(root.glob('site/dist/**/*.html'))
texts={str(p):p.read_text(encoding='utf-8',errors='ignore') for p in html}
for lang in ('es','en'):
    homes=[(p,t) for p,t in texts.items() if re.search(rf'/(?:dist/)?{lang}/index\.html$',p.replace('\\','/'))]
    if homes:
        p,t=homes[0]
        if not re.search(r'dashboard|learning-progress|progress-dashboard|data-dashboard',t,re.I): errors.append(f'{p}: localized home lacks dashboard semantics')
for p,t in texts.items():
    if re.search(r'<input[^>]+type=["\']checkbox["\'][^>]*\bdisabled\b',t,re.I): errors.append(f'{p}: disabled checkbox found')
    if 'apps/book' in t: errors.append(f'{p}: legacy apps/book appears in public HTML')
    if re.search(r'PA-S\d{3}',p) and ('Main Topic' in t or 'Subtopic' in t or 'Subtema' in t):
        # Heuristic regression checks only; semantic audit is authoritative.
        if not re.search(r'pre[- ]?training|preentrenamiento|pre-entrenamiento',t,re.I): warnings.append(f'{p}: no observable pre-training marker found')
        if not re.search(r'pregunta gu[ií]a|guiding question',t,re.I): warnings.append(f'{p}: no observable guiding-question marker found')
        if not re.search(r'auto.?prueba|self.?check|recuperaci[oó]n|retrieval',t,re.I): warnings.append(f'{p}: no observable retrieval/self-check marker found')
        if not re.search(r'ejemplo|example',t,re.I): errors.append(f'{p}: no concrete-example marker found')
settings=root/'PROJECT-INSTRUCTIONS-SETTINGS.md'
if settings.exists() and len(settings.read_text(encoding='utf-8'))>=8000: errors.append('PROJECT-INSTRUCTIONS-SETTINGS.md is >= 8000 characters')
# Handoff firewall check if canonical prompt exists
for cand in [root/'CODEX-REGENERATE-SITE-CANONICAL.md', root/'docs/CODEX-REGENERATE-SITE-CANONICAL.md']:
    if cand.exists():
        s=cand.read_text(encoding='utf-8',errors='ignore')
        if 'PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY' not in s: errors.append(f'{cand}: missing theory firewall')
if warnings:
    print('CANONICAL CONTRACT WARNINGS')
    for w in warnings: print('-',w)
if errors:
    print('CANONICAL CONTRACT FAIL')
    for e in errors: print('-',e)
    sys.exit(1)
print('CANONICAL CONTRACT PASS (machine regression checks; semantic audit still required)')
