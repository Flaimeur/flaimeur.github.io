import requests
import xml.etree.ElementTree as ET

def get_news():
    # Sources variées pour maximiser les chances
    feeds = [
        "https://www.lemondeinformatique.fr/flux-rss/thematique/le-monde-du-cloud-computing/rss.xml",
        "https://www.programmez.com/rss.xml",
        "https://www.usine-digitale.fr/informatique-quantique/rss"
    ]
    
    keywords = ["quantique", "quantum", "qubit", "ordinateur", "calcul"]
    articles_quantiques = []
    articles_generaux = []
    headers = {'User-Agent': 'Mozilla/5.0'}

    for url in feeds:
        try:
            r = requests.get(url, headers=headers, timeout=10)
            root = ET.fromstring(r.content)
            for item in root.findall('./channel/item'):
                title = item.find('title').text
                link = item.find('link').text
                
                # On classe les articles
                if any(key in title.lower() for key in keywords):
                    articles_quantiques.append((title, link, "Spécial Quantique"))
                else:
                    articles_generaux.append((title, link, "Actualité Tech"))
        except:
            continue

    # Stratégie : On prend le quantique en priorité, puis on complète jusqu'à 5 articles
    selection = articles_quantiques[:5]
    if len(selection) < 5:
        selection += articles_generaux[:(5 - len(selection))]

    html = ""
    for title, link, tag in selection:
        html += f"""
        <div class="stage-card" style="margin-bottom: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <div class="stage-header" style="padding: 15px;">
                <div class="stage-info">
                    <h3 style="font-size: 1rem; margin: 0 0 5px 0; color: #fff;">
                        <a href="{link}" target="_blank" style="text-decoration:none; color:inherit;">{title}</a>
                    </h3>
                    <span class="stage-role" style="color: #8b5cf6; font-size: 0.85rem; font-weight: bold;">{tag}</span>
                </div>
            </div>
        </div>"""
    return html

def update_file(new_html):
    file_path = "js/veille_data.js"
    content = f"window.veilleData = `{new_html}`;"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)