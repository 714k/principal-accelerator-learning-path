#!/usr/bin/env python3
"""Verify the v12 Sources package. This does not test the Learning Site."""
import csv
import hashlib
import json
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
manifest = json.loads((root / "MANIFEST.json").read_text(encoding="utf-8"))
errors = []


def check(ok, message):
    if not ok:
        errors.append(message)


check(manifest.get("version") == "v12", "manifest version")
files = manifest["files"]
names = [item["filename"] for item in files]
check(len(files) == manifest["file_count"], "manifest file count")
check(len(names) == len(set(names)), "unique manifest files")
numbered = sorted(
    name[:2] for name in names if re.match(r"^\d{2}-.*\.md$", name)
)
check(numbered == [f"{i:02d}" for i in range(18)], "Sources 00–17")
check(manifest["source_count"] == 18, "manifest Sources count")
for item in files:
    path = root / item["filename"]
    if not path.is_file():
        errors.append("missing " + item["filename"])
        continue
    blob = path.read_bytes()
    digest = hashlib.sha1(b"blob " + str(len(blob)).encode() + b"\0" + blob).hexdigest()
    check(
        len(blob) == item["bytes"] and digest == item["git_blob_sha1"],
        "integrity " + item["filename"],
    )

settings = (root / "PROJECT-INSTRUCTIONS-SETTINGS.md").read_text(encoding="utf-8")
check(len(settings) <= 8000, "Project Instructions exceed 8000 characters")
for marker in (
    "Settings v12",
    "17-VISUAL-LEARNING-STUDIO-INTERACTIVE.md",
    "ONLY a router",
    "MANDATORY",
    "Do not silently",
):
    check(marker in settings, "Settings requirement: " + marker)
for name in names:
    if re.match(r"^\d{2}-.*\.md$", name):
        check(name in settings, "routing reference " + name)
operating = (root / "01-PROJECT-INSTRUCTIONS.md").read_text(encoding="utf-8")
for marker in ("Etapa 0: inventario editorial", "Ejemplo:", "Entregables de la sesión", "prettier --check", "PA-S003, punto 13"):
    check(marker in operating, "migrated operating requirement: " + marker)
protocol = (root / "16-EDITORIAL-REVIEW-PROTOCOL.md").read_text(encoding="utf-8")
check("5 recursos interactivos" in protocol and "al menos 3" in protocol, "Studio minima")
check("Entregables de la sesión" in protocol, "delivery section")
ux = (root / "14-ACCELERATED-LEARNING-UX.md").read_text(encoding="utf-8")
for mode in ("Mapa mental", "Flashcards", "Simulador", "Explorador de arquitectura", "Matriz de decisión"):
    check(f"**{mode}:**" in ux, "Studio behavior: " + mode)
studio = (root / "17-VISUAL-LEARNING-STUDIO-INTERACTIVE.md").read_text(encoding="utf-8")
for heading in ("Mapa mental interactivo", "Flashcards interactivas", "Simulador interactivo", "Explorador de arquitectura interactivo", "Matriz de decisión interactiva", "Definition of Done editorial y funcional", "Prompt de regeneración"):
    check(heading in studio, "Source 17: " + heading)
with (root / "SESSION-APP-TARGETS-120.csv").open(encoding="utf-8-sig", newline="") as file:
    sessions = list(csv.DictReader(file))
check([row["session"] for row in sessions] == [f"PA-S{i:03d}" for i in range(1, 121)], "120 sessions")

print("V12 SOURCE INTEGRITY:", "PASS" if not errors else "FAIL")
print(f"Manifest files: {len(files)}; Sources: {len(numbered)}; sessions: {len(sessions)}")
print(f"Settings characters: {len(settings)}")
for error in errors:
    print("ERROR:", error)
print("NOT CHECKED: published site, interactive behavior, accessibility, builds, live URLs, educational quality.")
sys.exit(bool(errors))
