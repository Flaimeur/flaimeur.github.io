import requests
from googletrans import Translator

def get_news():
    # Utilisation de l'API Dev.to (Stable et 100% Quantique)
    api_url = "https://dev.to/api/articles?tag=quantumcomputing&top=5"
    translator = Translator()
    
    try:
        r = requests.get(api_url, timeout=15)
        articles = r.json()
        html = ""
        
        if not articles:
            return "<p style='color: white; text-align:center;'>🚀 En attente de nouvelles découvertes quantiques...</p>"

        for art in articles:
            # Système de traduction avec sécurité
            original_title = art['title']
            try:
                # On force la source en anglais et la destination en français
                translation = translator.translate(original_title, src='en', dest='fr')
                titre_final = translation.text
            except Exception:
                # Si Google Traduction bug, on garde le titre original pour ne pas avoir de vide
                titre_final = original_title

            html += f"""
            <div class="stage-card" style="margin-bottom: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="stage-header" style="padding: 15px;">
                    <div class="stage-info">
                        <h3 style="font-size: 1rem; margin: 0 0 5px 0; color: #fff;">
                            <a href="{art['url']}" target="_blank" style="text-decoration:none; color:inherit;">{titre_final}</a>
                        </h3>
                        <span class="stage-role" style="color: #8b5cf6; font-size: 0.85rem; font-weight: bold;">Veille Quantique FR</span>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p style='color: white; text-align:center;'>Erreur système : {str(e)}</p>"

def update_file(new_html):
    file_path = "js/veille_data.js"
    # On s'assure que la variable window.veilleData est bien formée
    content = f"window.veilleData = `{new_html}`;"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)