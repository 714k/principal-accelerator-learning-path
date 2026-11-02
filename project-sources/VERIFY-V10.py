#!/usr/bin/env python3
"""Structural checks only; no academic/Code/Git certification."""
from pathlib import Path
import re,csv,sys
p=Path(__file__).resolve().parent
errors=[];results=[]
sources=[f for f in p.glob('*.md') if re.match(r'^\d\d-',f.name)]
if len(sources)!=17 or {int(f.name[:2]) for f in sources}!=set(range(17)):
 errors.append('Sources 00–16 missing, duplicated, or not exactly 17')
else:results.append('17 Sources 00–16')
need=['PROJECT-INSTRUCTIONS-SETTINGS.md','CODEX-SESSION-MASTER-PROMPT.md','SESSION-APP-TARGETS-120.csv','SESSION-OUTPUTS-120.md','EXAMPLE-PA-S001-INVENTORY.md','PA-S001-QUALITY-REFERENCE.md','INSTALL-REPLACE-ALL.md']
for n in need:
 if not (p/n).is_file():errors.append('missing '+n)
settings=(p/'PROJECT-INSTRUCTIONS-SETTINGS.md').read_text()
if len(settings)>8000:errors.append('Settings exceeded 8000 chars: '+str(len(settings)))
else:results.append('Settings: '+str(len(settings))+' chars (<8000)')
with (p/'SESSION-APP-TARGETS-120.csv').open(encoding='utf-8-sig',newline='') as f:rows=list(csv.DictReader(f))
ids=[f'PA-S{i:03d}' for i in range(1,121)]
if [r.get('session') for r in rows]!=ids:errors.append('App map does not cover PA-S001–PA-S120 consecutively')
else:results.append('120 consecutive target rows')
road=(p/'03-MASTER-ROADMAP.md').read_text()
if set(ids)-set(re.findall(r'PA-S\d{3}',road)):errors.append('Roadmap missing sessions')
else:results.append('120 roadmap sessions present')
app=(p/'09-PROJECTS-AND-APPS.md').read_text()
for s in ['PA-S004','PA-S039','Storybook','Design System']:
 if s not in app:errors.append('app map missing '+s)
else:results.append('Design System Storybook & S039 evolution')
for name in ['EXAMPLE-PA-S001-INVENTORY.md','PA-S001-QUALITY-REFERENCE.md']:
 t=(p/name).read_text()
 if len(re.findall(r'^# ',t,re.M))!=1:errors.append('Not one H1 in '+name)
 if re.search(r'\b(?:engineering|scope|quality|design|aipe|fpa)\.[a-z][a-z-]+\b',t):errors.append('Technical ID in example '+name)
results.append('Sample documents: one H1 and no machine concept IDs')
for name in ['01-PROJECT-INSTRUCTIONS.md','11-CODEX-GUIDELINES.md','CODEX-SESSION-MASTER-PROMPT.md','PROJECT-INSTRUCTIONS-SETTINGS.md']:
 t=(p/name).read_text()
 for phrase in ['PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY','DO NOT CHANGE APPLICATION CODE LOGIC FOR PRESENTATION']:
  if phrase not in t: errors.append(name+' missing firewall '+phrase)
results.append('Core content/code firewalls are present')
for name in ['01-PROJECT-INSTRUCTIONS.md','04-SESSION-TEMPLATE.md','05-LEARNING-METHODOLOGY.md','11-CODEX-GUIDELINES.md','12-ARTIFACT-AND-PUBLISHING-STANDARD.md','13-CANONICAL-SESSION-AUDIT.md','14-ACCELERATED-LEARNING-UX.md','15-ADAPTIVE-LEARNING-EXPERIENCE.md','16-EDITORIAL-REVIEW-PROTOCOL.md']:
 if len((p/name).read_text())<1000:errors.append('Suspiciously small '+name)
if errors:
 print('V10 STRUCTURAL CHECK: FAIL')
 for x in errors:print(' - '+x)
 sys.exit(1)
print('V10 STRUCTURAL CHECK: PASS')
for x in results:print(' + '+x)
print('Not covered: educational depth, case-source fact checking, approval state, real Git code, semantic ES/EN parity, runtime tests or device-level accessibility.')
