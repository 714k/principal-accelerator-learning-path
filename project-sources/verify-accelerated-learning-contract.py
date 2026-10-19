#!/usr/bin/env python3
"""Heuristic regressions only; manual source/semantic/accessibility review required.

Usage:
 python verify-accelerated-learning-contract.py --prompt CODEX-SESSION-MASTER-PROMPT.md
 python verify-accelerated-learning-contract.py --prompt ... --es theory-es.md --en theory-en.md

Checks that content starts with three-point summary and uses minimum three-level
study structure. Does not judge educational quality or code behavior.
"""
import argparse, pathlib, re, sys

def has(t,pat): return bool(re.search(pat,t,flags=re.I|re.M))
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--prompt',type=pathlib.Path, required=True)
parser.add_argument('--es',type=pathlib.Path)
parser.add_argument('--en',type=pathlib.Path)
a=parser.parse_args()
errors=[]
if not a.prompt.is_file(): errors.append(f'Missing Codex prompt: {a.prompt}')
else:
 t=a.prompt.read_text(encoding='utf-8')
 tokens=[
 'SÍNTESIS EN 30 SEGUNDOS', '30-SECOND SYNTHESIS',
 'KEYWORD SIGNALING', 'THREE-LAYER READING',
 'CAUSAL CHUNKS', 'INTERACTIVE RECOMMENDATIONS',
 'PUBLISH VERBATIM SEMANTICS; DO NOT REAUTHOR THEORY',
 'DO NOT CHANGE APPLICATION CODE LOGIC FOR PRESENTATION',
 'MISSING_CANONICAL_THEORY_PAYLOAD', 'MISSING_ATOMIC_CONCEPT_COVERAGE',
 'Dashboard', 'Tracking', 'Visual Learning Studio', 'Mermaid→SVG',
 ]
 for token in tokens:
  if token.casefold() not in t.casefold(): errors.append(f'Prompt missing inline contract: {token}')
if bool(a.es) != bool(a.en): errors.append('ES and EN files must both be provided')
if a.es and a.en:
 for language,p in [('es',a.es),('en',a.en)]:
  if not p.is_file(): errors.append(f'Missing theory: {p}');continue
  t=p.read_text(encoding='utf-8')
  summary='SÍNTESIS EN 30 SEGUNDOS' if language=='es' else '30-SECOND SYNTHESIS'
  m=re.search(r'^\s*>\s*\*\*'+re.escape(summary)+r'\*\*',t,flags=re.M|re.I)
  plain=False
  if not m:
   m=re.search(r'^'+re.escape(summary)+r'\s*$',t,flags=re.M|re.I)
   plain=bool(m)
  if not m: errors.append(f'{p.name}: missing exact summary block');continue
  ob=re.search(r'^\s*##\s+(?:\d+\.\s*)?(?:Objetivo|Objective)\b',t,flags=re.M|re.I)
  if ob and m.start()>ob.start(): errors.append(f'{p.name}: summary appears after Objective')
  # Four or more lines could signal unintentional summary growth.
  trailing=t[m.end():].splitlines()
  lines=[]
  for line in trailing:
   if plain:
    if line.strip(): lines.append((len(lines)+1,line.strip()))
    if len(lines)==4: break
   elif line.startswith('>'):
    mm=re.match(r'^>\s*([1-9])\.\s+(.+)',line)
    if mm: lines.append((int(mm.group(1)),mm.group(2)))
   elif line.strip(): break
  if plain:
   # The fourth nonempty line is the reading convention, not a synthesis idea.
   lines=lines[:3] if len(lines)==4 and re.match(r'^(Convención de lectura|Reading convention)\.',lines[3][1],re.I) else lines
  if [number for number,_ in lines]!=[1,2,3]:errors.append(f'{p.name}: synthesis must contain exactly three numbered ideas; got {len(lines)}')
  for n in (1,2,3):
   if not has(t,rf'^(?:#{{2,5}}\s+)?(?:Nivel {n}|Level {n})\s+—'): errors.append(f'{p.name}: no Level {n} content')
  # Check author-level inline term help examples outside fenced blocks.
  outside=re.sub(r'```[\s\S]*?```','',t)
  for term,description in re.findall(r'\[([^\[\]\n:]+)::\s*([^\[\]\n]+)\]',outside):
   if len(description.split())>10:errors.append(f'{p.name}: tooltip [{term}] contains more than 10 words')
if errors:
 print('ACCELERATED LEARNING STRUCTURAL CHECK FAIL')
 for e in errors:print(' -',e)
 sys.exit(1)
print('ACCELERATED LEARNING STRUCTURAL CHECK PASS (heuristic only).')
print('Still required: inspect semantic accuracy, actual site accessibility, HTML and code diff.')
