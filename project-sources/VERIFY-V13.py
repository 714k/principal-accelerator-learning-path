"""Verify package integrity, required files, routing and unchanged 120-session sequence."""
from pathlib import Path
import hashlib
import json
import re

root=Path(__file__).parent
manifest=json.loads((root/'MANIFEST.json').read_text())
assert manifest['version']=='v13'
assert manifest['source_count']==23
assert manifest['file_count']==len(manifest['files'])
for entry in manifest['files']:
    data=(root/entry['filename']).read_bytes()
    assert len(data)==entry['bytes'],entry['filename']
    assert hashlib.sha1(f'blob {len(data)}\0'.encode()+data).hexdigest()==entry['git_blob_sha1'],entry['filename']
sources=sorted(root.glob('[0-9][0-9]-*.md'))
assert [int(p.name[:2]) for p in sources]==list(range(23))
settings=(root/'PROJECT-INSTRUCTIONS-SETTINGS.md').read_text()
assert len(settings)<8000
for source in sources: assert source.name in settings, source.name
for name in ['SESSION-SCHEMA.json','SESSION-HTML-REFERENCE.html']: assert name in settings and (root/name).exists()
schema=json.loads((root/'SESSION-SCHEMA.json').read_text())
assert len(schema['sections'])==19 and schema['sections'][:2]==['structure','estimated-time'] and schema['initialSectionCount']==6
assert [schema['minimumMain'],schema['minimumSubtopic'],schema['minimumGlobal']]==[5,3,5]
roadmap=(root/'03-MASTER-ROADMAP.md').read_text()
assert {int(x) for x in re.findall(r'PA-S(\d{3})',roadmap)}==set(range(1,121))
print(f'PASS v13: {len(sources)} numbered contracts, 2 reference files, {len(manifest["files"])} hashed files, 120 sessions, Settings {len(settings)} characters')
