#!/usr/bin/env python3
from pathlib import Path
import re, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else '.')
errors=[]

def all_text(paths):
    return '\n'.join(p.read_text(encoding='utf-8',errors='ignore') for p in paths if p.exists())

# inspect likely generated html
html=list(root.glob('dist/**/*.html')) + list(root.glob('site/dist/**/*.html'))
texts={str(p):p.read_text(encoding='utf-8',errors='ignore') for p in html}
for lang in ('es','en'):
    homes=[(p,t) for p,t in texts.items() if re.search(rf'/(?:dist/)?{lang}/index\.html$',p.replace('\\','/'))]
    if homes:
        p,t=homes[0]
        if not re.search(r'dashboard|learning-progress|progress-dashboard|data-dashboard',t,re.I):
            errors.append(f'{p}: localized home does not expose dashboard semantics')
for p,t in texts.items():
    if 'Knowledge Mastery Checklist' in t or 'Knowledge Mastery' in t or 'Lista de' in t:
        if re.search(r'<input[^>]+type=["\']checkbox["\'][^>]*\bdisabled\b',t,re.I):
            errors.append(f'{p}: disabled checkbox found in trackable learning content')
    if 'apps/book' in t:
        errors.append(f'{p}: legacy apps/book appears in public generated HTML')

settings=root/'PROJECT-INSTRUCTIONS-SETTINGS.md'
if settings.exists() and len(settings.read_text(encoding='utf-8'))>=8000:
    errors.append('PROJECT-INSTRUCTIONS-SETTINGS.md is >= 8000 characters')

if errors:
    print('CANONICAL CONTRACT FAIL')
    for e in errors: print('-',e)
    sys.exit(1)
print('CANONICAL CONTRACT PASS (checked available generated output)')
