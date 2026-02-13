import requests
import re
import os

def get_news():
    # On cible Quantum Computing et DevOps pour varier
    api_url = "https://dev.to/api/articles?tag=quantumcomputing&top=5"
    try:
        r = requests.get(api_url, timeout=10)
        articles = r.json()
        html = ""
        for art in articles:
            # L'indentation ici est cruciale pour Python
            html += f"""
            <div class="stage-card" style="margin-bottom: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="stage-header" style="padding: 15px;">
                    <div class="stage-info">
                        <h3 style="font-size: 1rem; margin: 0 0 5px 0; color: #fff;">
                            <a href="{art['url']}" target="_blank" style="text-decoration:none; color:inherit;">{art['title']}</a>
                        </h3>
                        <span class="stage-role" style="color: #8b5cf6; font-size: 0.85rem; font-weight: bold;">{art['readable_publish_date']}</span>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p style='color: white;'>Erreur de récupération : {e}</p>"

def update_file(new_html):
    file_path = "js/veille_data.js"
    
    # Utilisation de window.veilleData pour la compatibilité avec ton index.html
    content = f"""window.veilleData = `
{new_html}
`;"""

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)