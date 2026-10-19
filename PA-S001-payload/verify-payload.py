#!/usr/bin/env python3
"""Verify the unmodified PA-S001 canonical payload before any site edit."""
from pathlib import Path
import hashlib
import sys

base = Path(__file__).resolve().parent
expected = {
    "PA-S001-theory-es.md": (45577, "4a29a68ec5ca5ed0b73c19c45ce7f4c18f3dba7824cfd8944c90db2e1a04af99"),
    "PA-S001-theory-en.md": (41953, "b63622e5fc36c562c83b7cc6c62a7858d4bf6aee99a8f2680267b367d15eb333"),
}
failed = False
for name, (size, digest) in expected.items():
    path = base / name
    if not path.is_file():
        print(f"MISSING_CANONICAL_THEORY_PAYLOAD: {name} absent", file=sys.stderr)
        failed = True
        continue
    data = path.read_bytes()
    got = hashlib.sha256(data).hexdigest()
    try:
        data.decode("utf-8")
        utf8 = True
    except UnicodeDecodeError:
        utf8 = False
    okay = len(data) == size and got == digest and utf8 and data.endswith(b"\n")
    print(f"{name}: {len(data)} bytes SHA-256 {got} UTF-8={utf8} final-newline={data.endswith(bytes([10]))} {'PASS' if okay else 'FAIL'}")
    failed |= not okay
if failed:
    sys.exit("MISSING_CANONICAL_THEORY_PAYLOAD")
print("Canonical ES/EN payload verified")
