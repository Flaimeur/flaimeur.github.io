import requests
import xml.etree.ElementTree as ET

def get_news():
    # Source alternative très fiable en français
    rss_url = "https://www.programmez.com/rss.xml"
    try:
        # On ajoute un 'User-Agent' pour que le site ne bloque pas le robot
        headers = {'User-Agent': 'Mozilla/5.0'}
        r = requests.get(rss_url, headers=headers, timeout=15)
        root = ET.fromstring(r.content)
        html = ""
        
        # On prend les 5 derniers articles du flux
        items = root.findall('./channel/item')
        if not items:
            return "<p style='color: white;'>Aucun article trouvé pour le moment.</p>"

        for item in items[:5]:
            title = item.find('title').text
            link = item.find('link').text
            
            html += f"""
            <div class="stage-card" style="margin-bottom: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="stage-header" style="padding: 15px;">
                    <div class="stage-info">
                        <h3 style="font-size: 1rem; margin: 0 0 5px 0; color: #fff;">
                            <a href="{link}" target="_blank" style="text-decoration:none; color:inherit;">{title}</a>
                        </h3>
                        <span class="stage-role" style="color: #8b5cf6; font-size: 0.85rem; font-weight: bold;">Actualité Tech FR</span>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p style='color: white;'>Erreur de récupération : {str(e)}</p>"

def update_file(new_html):
    file_path = "js/veille_data.js"
    content = f"window.veilleData = `{new_html}`;"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)