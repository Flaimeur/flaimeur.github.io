import requests
import xml.etree.ElementTree as ET
import os

def get_news():
    # Flux RSS en français (Thématique Cloud / DevOps)
    rss_url = "https://www.lemondeinformatique.fr/flux-rss/thematique/le-monde-du-cloud-computing/rss.xml"
    try:
        r = requests.get(rss_url, timeout=10)
        root = ET.fromstring(r.content)
        html = ""
        
        # On récupère les 5 derniers articles
        for item in root.findall('./channel/item')[:5]:
            title = item.find('title').text
            link = item.find('link').text
            
            html += f"""
            <div class="stage-card" style="margin-bottom: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="stage-header" style="padding: 15px;">
                    <div class="stage-info">
                        <h3 style="font-size: 1rem; margin: 0 0 5px 0; color: #fff;">
                            <a href="{link}" target="_blank" style="text-decoration:none; color:inherit;">{title}</a>
                        </h3>
                        <span class="stage-role" style="color: #8b5cf6; font-size: 0.85rem; font-weight: bold;">Actualité Tech</span>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p style='color: white;'>Erreur de récupération : {e}</p>"

def update_file(new_html):
    file_path = "js/veille_data.js"
    # Structure pour ton fichier JS (méthode window.veilleData)
    content = f"""window.veilleData = `
{new_html}
`;"""
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)