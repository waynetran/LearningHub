#!/usr/bin/env python3
"""
Scan every .html file under research/ and build a search-index.json the
client-side search script can load.

Each document in the index has:
  url       — site-root-relative path (e.g. "math/calculus.html")
  title     — <title> text, minus the " — …" suffix
  track     — ai-ml / math / cs / hub
  kind      — hub / track-hub / subject / deep-dive
  subtitle  — the page's h1 subtitle (one line promise), if any
  headings  — [{id, text}] for every h2/h3/h4 with an id
  body      — cleaned-up text excerpt (first ~1200 chars of main content)
  terms     — flat list of lowercased tokens drawn from title, subtitle, headings
"""

import json
import os
import re
from html.parser import HTMLParser

ROOT = os.path.dirname(os.path.abspath(__file__))

# -------------------------------------------------------------------- parsing

class Extractor(HTMLParser):
    """Pull title, h1 subtitle, all headings with ids, and body text."""

    SKIP_TAGS = {"script", "style", "svg", "nav"}  # ignore text inside these

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.subtitle = ""
        self.headings = []
        self.body_chunks = []
        self._stack = []
        self._skip_depth = 0
        self._capture = None  # None | "title" | "subtitle" | "heading" | "body"
        self._current_heading = None
        self._buf = []

    # ---------- helpers
    def _flush_buf(self):
        text = "".join(self._buf).strip()
        self._buf = []
        return text

    def _attr(self, attrs, key):
        for k, v in attrs:
            if k == key:
                return v
        return None

    def _class(self, attrs):
        return (self._attr(attrs, "class") or "").split()

    # ---------- tag handlers
    def handle_starttag(self, tag, attrs):
        self._stack.append(tag)
        if tag in self.SKIP_TAGS:
            self._skip_depth += 1
            return
        if self._skip_depth:
            return

        cls = self._class(attrs)

        if tag == "title":
            self._buf = []
            self._capture = "title"

        elif tag in ("h1", "h2", "h3", "h4"):
            hid = self._attr(attrs, "id")
            self._flush_capture_to_body()
            self._buf = []
            self._capture = "heading"
            self._current_heading = {"level": tag, "id": hid, "text": ""}

        elif tag == "p" and "subtitle" in cls:
            self._flush_capture_to_body()
            self._buf = []
            self._capture = "subtitle"

        elif tag == "p" and ("lede" in cls or "subj-lede" in cls or "track-lede" in cls):
            # promote lede paragraphs into the body excerpt
            self._flush_capture_to_body()
            self._buf = []
            self._capture = "body"

        elif tag == "p" and self._capture not in ("title", "subtitle", "heading"):
            # regular body paragraph — accumulate into body
            self._flush_capture_to_body()
            self._buf = []
            self._capture = "body"

    def handle_endtag(self, tag):
        if tag in self.SKIP_TAGS and self._skip_depth:
            self._skip_depth -= 1
            # reset any capture after emerging from a skipped region
            self._buf = []
            self._capture = None
            if self._stack and self._stack[-1] == tag:
                self._stack.pop()
            return

        if self._skip_depth:
            if self._stack and self._stack[-1] == tag:
                self._stack.pop()
            return

        if tag == "title" and self._capture == "title":
            self.title = self._flush_buf()
            self._capture = None
        elif tag in ("h1", "h2", "h3", "h4") and self._capture == "heading":
            text = self._flush_buf()
            self._current_heading["text"] = text
            if self._current_heading["level"] != "h1" and self._current_heading["id"]:
                self.headings.append({
                    "id": self._current_heading["id"],
                    "text": text,
                })
            self._capture = None
            self._current_heading = None
        elif tag == "p" and self._capture == "subtitle":
            text = self._flush_buf()
            if not self.subtitle:
                self.subtitle = text
            # also add to body
            self.body_chunks.append(text)
            self._capture = None
        elif tag == "p" and self._capture == "body":
            text = self._flush_buf()
            if text:
                self.body_chunks.append(text)
            self._capture = None

        if self._stack and self._stack[-1] == tag:
            self._stack.pop()

    def _flush_capture_to_body(self):
        if self._capture == "body":
            text = "".join(self._buf).strip()
            if text:
                self.body_chunks.append(text)
        self._buf = []
        self._capture = None

    def handle_data(self, data):
        if self._skip_depth or self._capture is None:
            return
        # drop raw KaTeX/$$ math — we don't want $ literals polluting search
        self._buf.append(data)


# -------------------------------------------------------------------- discovery

def iter_html_files():
    """Yield (site_relative_path, abs_path) for every .html under research/."""
    for dirpath, dirnames, filenames in os.walk(ROOT):
        # skip hidden dirs
        dirnames[:] = [d for d in dirnames if not d.startswith(".") and d != "node_modules"]
        for fn in filenames:
            if fn.endswith(".html"):
                abs_p = os.path.join(dirpath, fn)
                rel = os.path.relpath(abs_p, ROOT).replace(os.sep, "/")
                yield rel, abs_p


def classify(rel_path):
    """Return (track, kind) for a given site-relative path."""
    if rel_path == "index.html":
        return ("hub", "hub")
    if rel_path == "ai-ml.html":
        return ("ai-ml", "track-hub")
    if rel_path.startswith("math/"):
        return ("math", "track-hub" if rel_path.endswith("/index.html") else "subject")
    if rel_path.startswith("cs/"):
        return ("cs", "track-hub" if rel_path.endswith("/index.html") else "subject")
    if rel_path.startswith("topics/"):
        return ("ai-ml", "deep-dive")
    return ("hub", "page")


# -------------------------------------------------------------------- main

def clean_text(s):
    s = re.sub(r"\s+", " ", s).strip()
    # strip inline math — anything between $...$ or $$...$$
    s = re.sub(r"\$\$[^$]*\$\$", "", s)
    s = re.sub(r"\$[^$]*\$", "", s)
    # strip latex backslash commands
    s = re.sub(r"\\[a-zA-Z]+\{?", "", s)
    s = re.sub(r"[{}]", "", s)
    return re.sub(r"\s+", " ", s).strip()


def build_document(rel_path, abs_path):
    with open(abs_path, "r", encoding="utf-8") as f:
        html = f.read()

    p = Extractor()
    try:
        p.feed(html)
    except Exception as e:
        print(f"  WARN parsing {rel_path}: {e}")

    title = clean_text(p.title)
    # strip the " — Charuvi ..." suffix
    title = re.sub(r"\s*[—–-]\s*Charuvi.*$", "", title)
    title = re.sub(r"\s*[—–-]\s*Deep Dive.*$", "", title)
    title = re.sub(r"\s*[—–-]\s*Learning Hub.*$", "", title)

    subtitle = clean_text(p.subtitle)
    headings = [
        {"id": h["id"], "text": clean_text(h["text"])}
        for h in p.headings
        if h.get("id") and h.get("text")
    ]
    body_joined = clean_text(" ".join(p.body_chunks))
    # trim the body to a reasonable search corpus
    body = body_joined[:2000]

    track, kind = classify(rel_path)

    # build a terms bag for fast prefix matching
    bag = " ".join([title, subtitle, " ".join(h["text"] for h in headings)])
    bag_tokens = sorted(set(re.findall(r"[a-z][a-z0-9]{1,}", bag.lower())))

    return {
        "url": rel_path,
        "title": title or rel_path,
        "track": track,
        "kind": kind,
        "subtitle": subtitle[:240],
        "headings": headings[:40],
        "body": body,
        "terms": bag_tokens[:120],
    }


def main():
    docs = []
    for rel, abs_p in sorted(iter_html_files()):
        doc = build_document(rel, abs_p)
        docs.append(doc)
        print(f"  indexed {rel:45s}  headings={len(doc['headings']):2d}  body={len(doc['body'])}")

    payload = {"version": 1, "count": len(docs), "docs": docs}

    # Write a JS file that assigns the index to a global. Using a script tag
    # means the site works from file:// with no HTTP server required.
    js_path = os.path.join(ROOT, "search-index.js")
    with open(js_path, "w", encoding="utf-8") as f:
        f.write("/* Auto-generated by build-search-index.py — do not edit. */\n")
        f.write("window.__charuviSearchIndex = ")
        json.dump(payload, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    js_size = os.path.getsize(js_path)
    print(f"\nWrote {js_path}  ({js_size/1024:.1f} KB, {len(docs)} documents)")


if __name__ == "__main__":
    main()
