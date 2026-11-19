"""Verify release integrity, installable sources, routing, schema, and roadmap."""
from pathlib import Path
import argparse
import hashlib
import json
import re
import zipfile

root = Path(__file__).parent
base = '9c30f62eb48a4c420f9c791c0627e7fa2d11712f'
sources = sorted(root.glob('[0-9][0-9]-*.md'))
installable = [p.name for p in sources] + ['SESSION-HTML-REFERENCE.html']

def file_entry(path):
    data = path.read_bytes()
    return {'filename': path.name, 'bytes': len(data),
            'git_blob_sha1': hashlib.sha1(f'blob {len(data)}\0'.encode()+data).hexdigest()}

def manifest():
    files = [file_entry(p) for p in sorted(root.iterdir())
             if p.is_file() and p.name != 'MANIFEST.json' and not p.name.startswith('VERIFY-')]
    return {'version':'v14','source_count':len(sources),'file_count':len(files),
            'base_commit':base,'verification':'Git blob SHA-1 and byte counts. Verifiers and manifest excluded.',
            'installable_sources':installable,'files':files}

parser=argparse.ArgumentParser()
parser.add_argument('--refresh', action='store_true')
parser.add_argument('--zip', type=Path)
args=parser.parse_args()
assert [int(p.name[:2]) for p in sources] == list(range(24))
assert len(installable)==25
settings=(root/'PROJECT-INSTRUCTIONS-SETTINGS.md').read_text()
assert len(settings)<8000
for name in installable: assert name in settings, name
assert 'Bare PA-Sxxx invokes Source 23' in settings
schema=json.loads((root/'SESSION-SCHEMA.json').read_text())
embedded=re.search(r'```json\s*(\{.*?\})\s*```', (root/'19-HTML-SESSION-STANDARD.md').read_text(), re.S)
assert embedded and json.loads(embedded.group(1))==schema
assert schema['version']=='v14' and schema['defaultMode']=='integral'
assert len(schema['sections'])==19 and schema['sections'][:2]==['structure','estimated-time'] and schema['initialSectionCount']==6
assert [schema['minimumMain'],schema['minimumSubtopic'],schema['minimumGlobal']]==[5,3,5]
assert schema['requiredHeader']==['h1','capability-paragraph'] and schema['estimatedTimeColumns']==['Actividad','Tiempo']
roadmap=(root/'03-MASTER-ROADMAP.md').read_text()
assert {int(x) for x in re.findall(r'PA-S(\d{3})',roadmap)}==set(range(1,121))
if args.refresh:
    (root/'MANIFEST.json').write_text(json.dumps(manifest(),ensure_ascii=False,indent=2)+'\n')
assert json.loads((root/'MANIFEST.json').read_text())==manifest()
if args.zip:
    with zipfile.ZipFile(args.zip) as archive:
        assert len(archive.namelist())==25 and set(archive.namelist())==set(installable)
        assert archive.testzip() is None
        for name in installable: assert archive.read(name)==(root/name).read_bytes(),name
print(f'PASS v14: {len(sources)} numbered contracts, {len(installable)} upload sources, {len(manifest()["files"])} hashed files, 120 sessions, Settings {len(settings)} characters')
