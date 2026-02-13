import requests
import xml.etree.ElementTree as ET

def get_news():
    # Source spécialisée en sciences et technologies (très riche en quantique)
    rss_url = "https://www.techno-science.net/flux-rss-thematique-18.xml"
    
    # Mots-clés pour filtrer et être sûr de rester dans le sujet
    keywords = ["quantique", "quantum", "qubit", "ordinateur", "calcul", "atome", "physique"]
    articles_found = []
    html = ""

    headers = {'User-Agent': 'Mozilla/5.0'}

    try:
        r = requests.get(rss_url, headers=headers, timeout=15)
        root = ET.fromstring(r.content)
        
        for item in root.findall('./channel/item'):
            title = item.find('title').text
            link = item.find('link').text
            
            # On vérifie si c'est bien du quantique
            if any(key in title.lower() for key in keywords):
                articles_found.append((title, link))

        # Si le flux spécialisé est vide, on prend les news tech générales en secours
        if not articles_found:
            return "<p style='color: #8b5cf6; text-align:center;'>🚀 En attente de nouvelles découvertes quantiques aujourd'hui...</p>"

        for title, link in articles_found[:5]:
            html += f"""
            <div class="stage-card" style="margin-bottom: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="stage-header" style="padding: 15px;">
                    <div class="stage-info">
                        <h3 style="font-size: 1rem; margin: 0 0 5px 0; color: #fff;">
                            <a href="{link}" target="_blank" style="text-decoration:none; color:inherit;">{title}</a>
                        </h3>
                        <span class="stage-role" style="color: #8b5cf6; font-size: 0.85rem; font-weight: bold;">Spécial Quantique FR</span>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p style='color: white;'>Erreur de connexion aux sources : {str(e)}</p>"

def update_file(new_html):
    file_path = "js/veille_data.js"
    content = f"window.veilleData = `{new_html}`;"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)