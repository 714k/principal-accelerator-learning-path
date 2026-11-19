"""Structural checks only; run with --complete to require every section."""
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from collections import Counter

schema = json.loads(Path(__file__).with_name('SESSION-SCHEMA.json').read_text())
class Node:
    def __init__(self, tag, attrs, parent=None):
        self.tag, self.attrs, self.parent, self.children = tag, dict(attrs), parent, []
        self.text = ''
    def descendants(self):
        for child in self.children:
            yield child
            yield from child.descendants()
class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.root=Node('root',[]); self.node=self.root
    def handle_starttag(self, tag, attrs):
        child=Node(tag,attrs,self.node); self.node.children.append(child)
        if tag not in {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}: self.node=child
    def handle_startendtag(self, tag, attrs): self.handle_starttag(tag,attrs); self.handle_endtag(tag)
    def handle_endtag(self,tag):
        parent=self.node
        while parent.parent:
            if parent.tag==tag: self.node=parent.parent; return
            parent=parent.parent
    def handle_data(self, data):
        node=self.node
        while node:
            node.text+=data
            node=node.parent

def validate(path, complete=False, expected_subtopics=None):
    parser=Parser(); parser.feed(path.read_text()); nodes=list(parser.root.descendants()); errors=[]; pending=[]
    def check(ok, message):
        if not ok: errors.append(message)
    check(sum(n.tag=='h1' for n in nodes)==1,'require exactly one H1')
    for heading in [n for n in nodes if n.tag=='h1']:
        siblings=heading.parent.children
        following=siblings[siblings.index(heading)+1:]
        check(bool(following) and following[0].tag=='p' and bool(following[0].text.strip()),'H1 must be immediately followed by a capability paragraph')
    ids=Counter(n.attrs['id'] for n in nodes if 'id' in n.attrs)
    check(all(v==1 for v in ids.values()),'duplicate anchors')
    for n in nodes:
        href=n.attrs.get('href','')
        if href.startswith('#'): check(href[1:] in ids,f'unresolved anchor {href}')
    sections=[n for n in nodes if 'data-section' in n.attrs]; by_id={n.attrs['data-section']:n for n in sections}; order=schema['sections']
    check(len(by_id)==len(sections),'duplicate section')
    for key in order:
        if key not in by_id: pending.append(key)
    actual=[n.attrs['data-section'] for n in sections if n.attrs['data-section'] in order]
    check(actual==[k for k in order if k in by_id],'incorrect section order')
    if 'estimated-time' in by_id:
        tables=[n for n in by_id['estimated-time'].descendants() if n.tag=='table']
        check(len(tables)==1,'estimated time requires one table')
        if len(tables)==1:
            rows=[n for n in tables[0].descendants() if n.tag=='tr']
            cells=[[c.text.strip() for c in row.children if c.tag in ('th','td')] for row in rows]
            headers=['Activity','Time'] if any(n.tag=='html' and n.attrs.get('lang','').startswith('en') for n in nodes) else schema['estimatedTimeColumns']
            check(bool(cells) and cells[0]==headers and all(len(r)==2 for r in cells),'estimated time requires Activity/Time columns')
            check(len(cells)>=3 and cells[-1][0]==schema['estimatedTimeTotal'],'estimated time requires a Total row')
    subtopics=[n for n in sections if re.match(schema['subtopicPattern'],n.attrs['data-section'])]
    if expected_subtopics is not None:
        expected_ids={f'subtopic-{i}' for i in range(1,expected_subtopics+1)}
        observed_ids={n.attrs['data-section'] for n in subtopics}
        pending.extend(sorted(expected_ids-observed_ids))
        check(observed_ids<=expected_ids,'unexpected subtopic(s)')
    for sub in subtopics: check(sub.parent is by_id.get('main-topic'),'subtopic must nest under main-topic')
    for n in nodes:
        if 'data-concept' in n.attrs:
            children=list(n.descendants()); check(bool(n.attrs.get('data-concept-id')),'concept missing ID'); check(any('data-definition' in c.attrs for c in children),'missing definition');check(any('data-example' in c.attrs for c in children),'missing example')
    scopes=[n for n in nodes if 'data-studio-scope' in n.attrs]; scope_map={n.attrs['data-studio-scope']:n for n in scopes}; count=0
    check(len(scopes)==len(scope_map),'duplicate Studio scope')
    expected={k:k for k in ['main-topic',*[n.attrs['data-section'] for n in subtopics]] if k in by_id}
    if 'global-studio' in by_id: expected['global']='global-studio'
    concept_ids={n.attrs.get('data-concept-id') for n in nodes if 'data-concept' in n.attrs}
    for scope,key in expected.items():
        if scope not in scope_map: pending.append('studio '+scope); continue
        parent=by_id[key]; scope_node=scope_map[scope]; check(scope_node in list(parent.descendants()),f'{scope} studio outside section')
        widgets=[n for n in scope_node.descendants() if 'data-widget' in n.attrs]; modes={n.attrs['data-widget'] for n in widgets};count+=len(modes)
        required=set(schema['allModes'] if scope in ['main-topic','global'] else schema['subtopicRequiredModes']); minimum=5 if scope in ['main-topic','global'] else 3
        check(required<=modes and len(modes)>=minimum,f'{scope} missing required modes')
        check(modes<=set(schema['allModes']),f'{scope} unknown modes')
        for widget in widgets:
            coverage=set(widget.attrs.get('data-coverage','').split()); check(bool(coverage) and coverage<=concept_ids,f'{scope} invalid concept coverage')
        if scope!='global':
            check(any('data-diagram' in n.attrs for n in parent.children),'missing chapter-local technical diagram '+scope)
    print(f'{path.name}: {len(actual)}/19 sections, {len(subtopics)} subtopics, {count} declared widgets; structural only')
    for item in pending: print('PENDING:',item)
    for item in errors: print('FAIL:',item)
    if complete and pending: errors.append('incomplete candidate')
    print('FAIL' if errors else 'PASS (structural; depth and behavior not certified)')
    return not errors

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('html',type=Path);p.add_argument('--complete',action='store_true');p.add_argument('--expected-subtopics',type=int);args=p.parse_args();raise SystemExit(0 if validate(args.html,args.complete,args.expected_subtopics) else 1)
