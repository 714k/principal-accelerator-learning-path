#!/usr/bin/env python3
"""Verify transferred v11 files against the tracked manifest; structural check only."""
from pathlib import Path
import csv, hashlib, json, sys
root=Path(__file__).resolve().parent
manifest=json.loads((root/"MANIFEST.json").read_text(encoding="utf-8"))
errors=[]
def check(ok,msg):
    if not ok: errors.append(msg)
check(manifest.get("version")=="v11","manifest version")
files=manifest["files"]
check(len(files)==29,"expected 29 package files")
check(len([x for x in files if x["filename"][:2].isdigit() and x["filename"][2:3]=="-"])==17,"expected 17 Sources")
for x in files:
    p=root/x["filename"]
    if not p.is_file():
        errors.append("missing "+x["filename"])
        continue
    blob=p.read_bytes()
    digest=hashlib.sha1(b"blob "+str(len(blob)).encode()+b"\0"+blob).hexdigest()
    check(len(blob)==x["bytes"] and digest==x["git_blob_sha1"],"integrity "+x["filename"])
settings=root/"PROJECT-INSTRUCTIONS-SETTINGS.md"
if settings.exists():
    s=settings.read_text(encoding="utf-8")
    check(len(s)<=8000,"Project Instructions exceed 8000 characters")
with (root/"SESSION-APP-TARGETS-120.csv").open(encoding="utf-8-sig",newline="") as f:
    rows=list(csv.DictReader(f))
check([x["session"] for x in rows]==[f"PA-S{i:03d}" for i in range(1,121)],"session count/sequence")
print("V11 SOURCE INTEGRITY:", "PASS" if not errors else "FAIL")
for error in errors: print("ERROR:",error)
print("NOT CHECKED: published site, accessibility, tests, live URLs, educational quality.")
sys.exit(bool(errors))
