import requests
import re
import os

def get_news():
    api_url = "https://dev.to/api/articles?tag=quantumcomputing&top=5"
    try:
        r = requests.get(api_url, timeout=10)
        articles = r.json()
        html = ""
        for art in articles:
            html += f"""
            <div class="stage-card" style="margin-bottom: 15px; cursor: default;">
                <div class="stage-header" style="background: rgba(139, 92, 246, 0.1);">
                    <div class="stage-info">
                        <h3 style="font-size: 1rem;"><a href="{art['url']}" target="_blank" style="text-decoration:none; color:inherit;">{art['title']}</a></h3>
                        <span class="stage-role" style="color: #8b5cf6;">{art['readable_publish_date']}</span>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p>Erreur : {e}</p>"

def update_file(new_html):
    file_path = "js/veille_data.js"
    
    # On écrase complètement le fichier avec la nouvelle structure propre
    content = f"""export const veilleData = `
{new_html}
`;"""

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)