import requests
from googletrans import Translator
import os

def get_news():
    api_url = "https://dev.to/api/articles?tag=quantumcomputing&top=5"
    translator = Translator()
    
    try:
        r = requests.get(api_url, timeout=15)
        articles = r.json()
        html = ""
        
        if not articles:
            return "<p style='color: white;'>Aucune actualité trouvée.</p>"

        for art in articles:
            # Tentative de traduction
            try:
                # Utilisation de la version 3.1.0a0 de googletrans
                translation = translator.translate(art['title'], src='en', dest='fr')
                titre = translation.text
            except Exception as e:
                print(f"Erreur traduction : {e}")
                titre = art['title'] # Retour à l'anglais si bug

            html += f"""
            <div class="stage-card" style="margin-bottom: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
                <div class="stage-header" style="padding: 15px;">
                    <div class="stage-info">
                        <h3 style="font-size: 1rem; margin: 0 0 5px 0; color: #fff;">
                            <a href="{art['url']}" target="_blank" style="text-decoration:none; color:inherit;">{titre}</a>
                        </h3>
                        <span class="stage-role" style="color: #8b5cf6; font-size: 0.85rem; font-weight: bold;">Veille Quantique</span>
                    </div>
                </div>
            </div>"""
        return html
    except Exception as e:
        return f"<p style='color: white;'>Erreur script : {str(e)}</p>"

def update_file(new_html):
    # Chemin vers ton fichier de données
    file_path = "js/veille_data.js"
    content = f"window.veilleData = `{new_html}`;"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)