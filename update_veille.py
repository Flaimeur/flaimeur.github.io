import requests
from googletrans import Translator

def get_news():
    api_url = "https://dev.to/api/articles?tag=quantumcomputing&top=5"
    translator = Translator()
    
    try:
        r = requests.get(api_url, timeout=15)
        articles = r.json()
        html = ""
        
        if not articles:
            return "<p class='no-news'>En attente de nouvelles découvertes quantiques...</p>"

        for art in articles:
            try:
                translation = translator.translate(art['title'], src='en', dest='fr')
                titre_fr = translation.text
            except Exception:
                titre_fr = art['title']

            # On utilise les classes CSS de ton projet (ex: stage-card, animate)
            # Et on ajoute une icône de processeur quantique
            html += f"""
            <div class="stage-card animate-on-scroll" style="margin-bottom: 20px; opacity: 1;">
                <div class="stage-header">
                    <div class="stage-icon">
                        <i class="fas fa-atom fa-spin" style="color: #8b5cf6;"></i>
                    </div>
                    <div class="stage-info">
                        <h3 class="news-title">
                            <a href="{art['url']}" target="_blank">{titre_fr}</a>
                        </h3>
                        <div class="news-meta">
                            <span class="tag-quantum"><i class="fas fa-microchip"></i> Spécial Quantique</span>
                            <span class="news-date">Actualité FR</span>
                        </div>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p>Erreur système : {str(e)}</p>"

def update_file(new_html):
    file_path = "js/veille_data.js"
    content = f"window.veilleData = `{new_html}`;"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)