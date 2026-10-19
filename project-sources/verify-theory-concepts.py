#!/usr/bin/env python3
"""Verify atomic-concept structural coverage of canonical bilingual Markdown.

Limits: this validates IDs, ordering and prescribed pieces; it cannot evaluate
explanatory accuracy, example quality, source legitimacy or true semantic parity.
"""
from __future__ import annotations
from pathlib import Path
import sys,re

if len(sys.argv)!=3:
    raise SystemExit('Usage: python verify-theory-concepts.py PA-S001-theory-es.md PA-S001-theory-en.md')
es,en=(Path(p) for p in sys.argv[1:])
for p in (es,en):
    if not p.is_file(): raise SystemExit(f'MISSING_CANONICAL_THEORY_PAYLOAD: {p}')

concept_pat=re.compile(r'<!-- concept: ([a-z0-9.\-]+) -->')
topic_pat=re.compile(r'<!-- topic: ([a-z0-9.\-]+) requires: ([a-z0-9.,\-]+) -->')
errors=[]; metadata=[]
for p in (es,en):
    text=p.read_text(encoding='utf-8')
    plain='## ' not in text and bool(re.search(r'^1\. (?:Objetivo|Objective)$',text,re.M))
    concepts=[(m.group(1),m.start()) for m in concept_pat.finditer(text)]
    topics=[(m.group(1),m.group(2).split(','),m.start()) for m in topic_pat.finditer(text)]
    integrations={m.group(1):m.start() for m in re.finditer(r'<!-- integration: ([a-z0-9.\-]+) -->',text)}
    if len(concepts)!=len(set(k for k,_ in concepts)):
        errors.append(f'{p.name}: duplicate concept IDs')
    concept_positions=dict(concepts)
    if len(topics)!=len(set(k for k,_,_ in topics)):
        errors.append(f'{p.name}: duplicate topic IDs')
    for t,required,start in topics:
        if not required: errors.append(f'{p.name}: empty concept inventory on {t}')
        stop=integrations.get(t)
        if not plain and t!='main.justifiable-system' and stop is None:
            errors.append(f'{p.name}: missing integration gate on {t}')
        for c in required:
            if c not in concept_positions:
                errors.append(f'{p.name}: {t} lacks atomic concept {c}')
            elif stop is not None and concept_positions[c]>stop:
                errors.append(f'{p.name}: integration {t} appears before concept {c}')
        if stop is not None and stop<start:
            errors.append(f'{p.name}: integration {t} occurs before topic start')
    # One retrieval card for each atomic concept, plus the main topic.
    for c,start in concepts:
        if (f'`fc.{c}`' if not plain else f'\nfc.{c}\n') not in text:
            errors.append(f'{p.name}: missing atomic retrieval card fc.{c}')
        if plain:
            next_start=min([position for _,position in concepts if position>start]+[len(text)])
            lesson=text[start:next_start]
            for level in (1,2,3):
                if not re.search(rf'^(?:Nivel|Level) {level} — ',lesson,re.M):
                    errors.append(f'{p.name}: {c} lacks Level {level} teaching')
    if ('`fc.main`' if not plain else '\nfc.main\n') not in text:
        errors.append(f'{p.name}: no Main Topic retrieval card')
    if len(re.findall(r'^(?:## )?\d+\. (?:Objetivo|Objective|Learning Preview|Concepts|Main Topic|Subtopics|Integración entre dominios|Cross-Domain Synthesis|Theory → Practice Map|Time Breakdown|Real-World Example|Production-Ready Example|Visual Learning Studio|Exercises|Curated Sources and References|Resources|Knowledge Mastery Checklist|End-of-Session Success Criteria|Bridge)',text,flags=re.M))<17:
        errors.append(f'{p.name}: appears to omit theory sections')
    if (not plain and ('```mermaid' not in text or '|---' not in text)) or (plain and (len(re.findall(r'^(?:flowchart|mindmap|sequenceDiagram)\b',text,re.M))<6 or not re.search(r'^(?:Problema|Problem)$',text,re.M))):
        errors.append(f'{p.name}: expected adjacent diagrams and comparisons are absent')
    metadata.append({'concept_ids':[c for c,_ in concepts], 'topics':[(t,refs) for t,refs,_ in topics]})
if metadata[0]!=metadata[1]:
    errors.append('ES/EN concept IDs or topic required-concept sets differ')

if errors:
    print('MISSING_ATOMIC_CONCEPT_COVERAGE — STRUCTURAL CHECK FAILED')
    for e in errors:print('- '+e)
    raise SystemExit(1)
print('STRUCTURAL THEORY CHECK PASS')
print(f"Atomic concepts per language: {len(metadata[0]['concept_ids'])}")
print(f"Compound topics per language: {len(metadata[0]['topics'])}")
print('Each concept has a retrieval card; the main topic is covered; ES/EN IDs match.')
print('IMPORTANT: editorial/semantic quality requires human review; not certified by this script.')
