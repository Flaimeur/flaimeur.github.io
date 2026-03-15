#!/usr/bin/env python3
"""
fetch_rss.py — Récupère les flux RSS et génère js/veille_data.js
             — En mode --email-only, génère uniquement le corps HTML de l'email

Usage:
    python scripts/fetch_rss.py             # mise à jour veille_data.js
    python scripts/fetch_rss.py --email-only # génère email_body.html
"""

import sys
import os
import urllib.request
import xml.etree.ElementTree as ET
import ssl
from datetime import datetime, timezone
from html import escape

# Désactiver la vérification SSL si nécessaire (utile pour les tests locaux sur macOS)
ssl_context = ssl._create_unverified_context()

# ── Configuration ────────────────────────────────────────────────────────────

RSS_FEEDS = [
    {
        "url": "https://dev.to/feed/tag/devops",
        "label": "DevOps",
        "color": "#0ea5e9",
        "icon": "fa-server",
    },
    {
        "url": "https://dev.to/feed/tag/quantumcomputing",
        "label": "Quantique",
        "color": "#8b5cf6",
        "icon": "fa-atom",
    },
]

MAX_PER_FEED = 10

# Chemin relatif depuis la racine du repo
OUTPUT_JS  = os.path.join(os.path.dirname(__file__), "..", "js", "veille_data.js")
OUTPUT_HTML = os.path.join(os.path.dirname(__file__), "..", "email_body.html")

# ── Helpers ──────────────────────────────────────────────────────────────────

def fetch_feed(url: str) -> list[dict]:
    """Retourne une liste d'articles {title, link, date} depuis un flux RSS."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    try:
        with urllib.request.urlopen(req, timeout=15, context=ssl_context) as res:
            raw = res.read()
    except Exception as e:
        print(f"[WARN] Impossible de récupérer {url}: {e}", file=sys.stderr)
        return []

    try:
        root = ET.fromstring(raw)
    except ET.ParseError as e:
        print(f"[WARN] Parse XML échoué pour {url}: {e}", file=sys.stderr)
        return []

    ns = ""
    items = root.findall(f"channel/item")
    articles = []
    for item in items[:MAX_PER_FEED]:
        title = item.findtext("title", "").strip()
        link  = item.findtext("link", "").strip()
        date  = item.findtext("pubDate", "").strip()
        if title and link:
            articles.append({"title": title, "link": link, "date": date})
    return articles


def format_date(raw: str) -> str:
    """Formate une date RSS en 'DD/MM/YYYY'."""
    for fmt in ("%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S GMT"):
        try:
            return datetime.strptime(raw, fmt).strftime("%d/%m/%Y")
        except ValueError:
            continue
    return raw[:16] if raw else "Récent"


# ── Génération veille_data.js ─────────────────────────────────────────────────

def build_js_card(article: dict, feed: dict) -> str:
    title = escape(article["title"])
    link  = escape(article["link"])
    date  = format_date(article["date"])
    label = feed["label"]
    color = feed["color"]
    icon  = feed["icon"]

    return f"""            <div class="stage-card animate-on-scroll" style="margin-bottom: 20px; opacity: 1;">
                <div class="stage-header">
                    <div class="stage-icon">
                        <i class="fas {icon}" style="color: {color};"></i>
                    </div>
                    <div class="stage-info">
                        <h3 class="news-title">
                            <a href="{link}" target="_blank">{title}</a>
                        </h3>
                        <div class="news-meta">
                            <span class="tag-quantum" style="background: {color}22; color: {color}; border: 1px solid {color}44; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem;">
                                <i class="fas {icon}"></i> {label}
                            </span>
                            <span class="news-date">{date}</span>
                        </div>
                    </div>
                </div>
            </div>"""


def generate_js(feeds_data: list[tuple]) -> str:
    cards = []
    for feed, articles in feeds_data:
        for article in articles:
            cards.append(build_js_card(article, feed))
    inner = "\n".join(cards)
    now = datetime.now(timezone.utc).strftime("%d/%m/%Y à %H:%M UTC")
    return (
        f"// Généré automatiquement par fetch_rss.py — {now}\n"
        f"window.veilleData = `\n{inner}`;\n"
    )


# ── Génération email HTML ─────────────────────────────────────────────────────

def generate_email_html(feeds_data: list[tuple]) -> str:
    now = datetime.now(timezone.utc).strftime("%d/%m/%Y")
    rows = ""
    for feed, articles in feeds_data:
        color = feed["color"]
        label = feed["label"]
        rows += f"""
        <tr>
          <td colspan="2" style="padding: 16px 0 8px 0; font-size: 1rem; font-weight: bold; color: {color}; border-bottom: 2px solid {color};">
            {label}
          </td>
        </tr>"""
        for art in articles:
            title = escape(art["title"])
            link  = escape(art["link"])
            date  = format_date(art["date"])
            rows += f"""
        <tr>
          <td style="padding: 8px 0; font-size: 0.9rem; vertical-align: top; width: 70%;">
            <a href="{link}" style="color: #1d4ed8; text-decoration: none;">{title}</a>
          </td>
          <td style="padding: 8px 0; font-size: 0.8rem; color: #6b7280; text-align: right; vertical-align: top;">
            {date}
          </td>
        </tr>"""

    return f"""<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><title>Veille Tech — {now}</title></head>
<body style="margin:0; padding:0; font-family: Arial, sans-serif; background: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding: 30px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td colspan="2" style="background: linear-gradient(135deg, #0ea5e9, #6366f1); padding: 28px 32px;">
              <h1 style="margin:0; color: white; font-size: 1.4rem;">📰 Veille Tech du {now}</h1>
              <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 0.9rem;">Recap automatique — DevOps &amp; Web Dev</p>
            </td>
          </tr>

          <!-- Articles -->
          <tr>
            <td colspan="2" style="padding: 24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                {rows}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td colspan="2" style="background: #f3f4f6; padding: 16px 32px; text-align: center; font-size: 0.78rem; color: #9ca3af;">
              Généré automatiquement via GitHub Actions · Portfolio de Bilal Lachkar
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    email_only = "--email-only" in sys.argv

    print("⬇️  Récupération des flux RSS…")
    feeds_data = []
    for feed in RSS_FEEDS:
        print(f"   → {feed['label']}: {feed['url']}")
        articles = fetch_feed(feed["url"])
        print(f"      {len(articles)} articles récupérés")
        feeds_data.append((feed, articles))

    if email_only:
        html = generate_email_html(feeds_data)
        path = os.path.abspath(OUTPUT_HTML)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"✅ Email HTML généré → {path}")
    else:
        js = generate_js(feeds_data)
        path = os.path.abspath(OUTPUT_JS)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(js)
        print(f"✅ veille_data.js mis à jour → {path}")


if __name__ == "__main__":
    main()
