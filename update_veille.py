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
        return f"<p>Erreur lors de la mise à jour : {e}</p>"

def update_file(new_html):
    # CORRECTION : On pointe vers le dossier js/
    file_path = "js/content.js" 
    
    if not os.path.exists(file_path):
        print(f"Erreur : Le fichier {file_path} est introuvable !")
        exit(1)

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    if "" in content:
        pattern = r".*?"
        replacement = f"{new_html}"
        new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
        
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("Mise à jour réussie !")
    else:
        print("Erreur : Balises introuvables dans content.js")
        exit(1)

if __name__ == "__main__":
    news_html = get_news()
    update_file(news_html)