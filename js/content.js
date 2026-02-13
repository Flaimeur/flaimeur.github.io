export const appContents = {
  // --- 1. PROFIL ---
  profile: `
        <div style="text-align:center; margin-bottom:20px;">
            <h2>Bilal Lachkar</h2>
            <span style="background:#ea580c; color:white; padding:4px 12px; border-radius:15px; font-size:0.8rem; font-weight:bold;">BTS SIO SLAM</span>
        </div>

        <div class="bio-box" style="margin-bottom:20px;">
            <h3 style="margin-top:0; font-size:1.1rem; color:#ea580c;">🚀 Futur Ingénieur DevOps</h3>
            <p>Passionné par le code et l'infrastructure, je veux rendre les applications déployables, scalables et maintenables.</p>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
            <div class="info-card">
                <h4 style="margin:0 0 10px 0;">🎓 Formation</h4>
                <p style="font-size:0.9rem; margin:0;">
                    <b>BTS SIO option SLAM</b><br>
                    <i>Lycée Louis Armand, Paris 15</i>
                </p>
            </div>
            <div class="info-card">
                <h4 style="margin:0 0 10px 0;">🎯 Objectifs</h4>
                <p style="font-size:0.9rem; margin:0;">
                    Devenir DevOps, maîtriser le Cloud et la CI/CD.
                </p>
            </div>
        </div>

        <p class="text-secondary" style="text-align:center; font-style:italic;">
            "J'aime quand le code est propre, carré et optimisé."
        </p>
    `,

  // --- 2. GITHUB ---
  github: `
        <div class="gh-profile-layout">
            <div class="gh-sidebar-profile">
                <div class="gh-avatar-large">
                    <img src="https://github.com/Flaimeur.png" alt="Flaimeur Avatar">
                </div>
                
                <div class="gh-names" style="margin-top:15px; text-align:left; width:100%;">
                    <h1 style="font-size:1.6rem; margin:0; line-height:1.2;">Flaimeur</h1>
                    <span class="text-secondary" style="font-size:1.3rem; font-weight:300;">Flaimeur</span>
                </div>
                
                <a href="https://github.com/Flaimeur" target="_blank" class="gh-edit-btn" 
                   style="text-decoration:none; display:block; width:100%; box-sizing:border-box; margin-top:15px; color:#c9d1d9; background-color:#21262d; border:1px solid #30363d; padding:5px 16px; border-radius:6px; text-align:center; font-weight:500; font-size:0.9rem; transition: background 0.2s;">
                    View Profile
                </a>
            </div>

            <div class="gh-content">
                <div class="text-secondary" style="font-size:0.8rem; margin-bottom:10px;">Flaimeur / README.md</div>
                
                <div class="gh-readme">
                    <h3 style="margin-top:0; font-size:1.5rem;">👋 Hi, I'm @Flaimeur</h3>
                    <ul class="text-secondary" style="list-style:none; padding:0; line-height:1.8;">
                        <li>👀 I’m interested in web development, video games, networking.</li>
                        <li>🌱 I’m currently learning [React, Node.js, cybersecurity]</li>
                        <li>📫 How to reach me: idk</li>
                        <li>👨 Pronouns: he/him</li>
                        <li>⚡ Fun fact: nothing</li>
                    </ul>
                </div>

                <div class="gh-pinned-title" style="margin-top:20px;">
                    <span style="font-size:1rem;">Popular repositories</span>
                </div>
                
                <div class="gh-pinned-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:15px; margin-top:10px;">
                    
                    <div class="gh-repo-card">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <a href="https://github.com/Flaimeur/flaimeur.github.io" class="gh-repo-link" style="color:#58a6ff; text-decoration:none; font-weight:bold; display:flex; gap:5px;"><i data-lucide="book" width="16"></i> flaimeur.github.io</a>
                            <span class="text-secondary" style="border:1px solid; border-color:var(--header-text); border-radius:10px; padding:0 7px; font-size:0.7rem;">Public</span>
                        </div>
                        <div class="gh-repo-desc text-secondary" style="font-size:0.8rem; margin-top:5px;">Portfolio V2 🐧</div>
                        <div class="text-secondary" style="margin-top:15px; font-size:0.75rem; display:flex; gap:15px; align-items:center;">
                            <span style="display:flex; align-items:center; gap:3px;"><span class="gh-lang-dot" style="background:#f1e05a; width:10px; height:10px; border-radius:50%; display:inline-block;"></span> JavaScript</span>
                            <span style="display:flex; align-items:center; gap:3px;"><i data-lucide="star" width="14"></i> 1</span>
                        </div>
                    </div>

                    <div class="gh-repo-card">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <a href="https://github.com/Flaimeur/flaimeur-portfolio-v1" class="gh-repo-link" style="color:#58a6ff; text-decoration:none; font-weight:bold; display:flex; gap:5px;"><i data-lucide="book" width="16"></i> flaimeur-portfolio-v1</a>
                            <span class="text-secondary" style="border:1px solid; border-color:var(--header-text); border-radius:10px; padding:0 7px; font-size:0.7rem;">Public</span>
                        </div>
                        <div class="gh-repo-desc text-secondary" style="font-size:0.8rem; margin-top:5px;">Portfolio V1</div>
                        <div class="text-secondary" style="margin-top:15px; font-size:0.75rem; display:flex; gap:10px;">
                            <span style="display:flex; align-items:center; gap:3px;"><span class="gh-lang-dot" style="background:#f1e05a; width:10px; height:10px; border-radius:50%; display:inline-block;"></span> JavaScript</span>
                        </div>
                    </div>

                    <div class="gh-repo-card">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <a href="https://github.com/Flaimeur/PharmaSI" class="gh-repo-link" style="color:#58a6ff; text-decoration:none; font-weight:bold; display:flex; gap:5px;"><i data-lucide="book" width="16"></i> PharmaSI</a>
                            <span class="text-secondary" style="border:1px solid; border-color:var(--header-text); border-radius:10px; padding:0 7px; font-size:0.7rem;">Public</span>
                        </div>
                        <div class="text-secondary" style="margin-top:15px; font-size:0.75rem; display:flex; gap:10px;">
                            <span style="display:flex; align-items:center; gap:3px;"><span class="gh-lang-dot" style="background:#178600; width:10px; height:10px; border-radius:50%; display:inline-block;"></span> C#</span>
                        </div>
                    </div>

                    <div class="gh-repo-card">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <a href="https://github.com/Flaimeur/Flaimeur" class="gh-repo-link" style="color:#58a6ff; text-decoration:none; font-weight:bold; display:flex; gap:5px;"><i data-lucide="book" width="16"></i> Flaimeur</a>
                            <span class="text-secondary" style="border:1px solid; border-color:var(--header-text); border-radius:10px; padding:0 7px; font-size:0.7rem;">Public</span>
                        </div>
                        <div class="gh-repo-desc text-secondary" style="font-size:0.8rem; margin-top:5px;">Config files for my GitHub profile.</div>
                    </div>
                </div>
            </div>
        </div>
    `,

  // --- 3. STAGES ---
  stages: `
        <h2>Mon Parcours</h2>
        <p class="text-secondary">Cliquez pour voir les détails.</p>
        <div class="stage-list">
            <div class="stage-card" data-action="toggle-stage">
                <div class="stage-header">
                    <div class="stage-logo"><i data-lucide="layout-dashboard"></i></div>
                    <div class="stage-info"><h3>Reenbow</h3><span class="stage-role">Dev mai 2025 - juin 2025</span></div>
                </div>
                <div class="stage-details"><p>- Tests et retours UX sur l’application Universe BTP.<br>- Prospection automatisée (Make, Lemlist, Dropcontact).<br>- Mise en place d’un scoring des leads et d’un reporting automatisé.<br>- Création d’ un tableau de bord Notion pour le suivi des campagnes.</p></div>
            </div>

            <div class="stage-card" data-action="toggle-stage">
                <div class="stage-header">
                    <div class="stage-logo"><i data-lucide="smartphone"></i></div>
                    <div class="stage-info"><h3>MINUTE PHONE</h3><span class="stage-role">Tech janv. 2024 - févr. 2024</span></div>
                </div>
                <div class="stage-details"><p>- Réparation hardware<br>- Relations clientèles<br>- Mise en rayonnage</p></div>
            </div>

            <div class="stage-card" data-action="toggle-stage">
                <div class="stage-header">
                    <div class="stage-logo"><i data-lucide="camera"></i></div>
                    <div class="stage-info"><h3>Boomker Concept</h3><span class="stage-role">Photographie commercial sept. 2023 - oct. 2023</span></div>
                </div>
                <div class="stage-details"><p>- Photographie <br>- Prise vidéo<br>- Montage photo/vidéo sur Adobe Photoshop</p></div>
            </div>

            <div class="stage-card" data-action="toggle-stage">
                <div class="stage-header">
                    <div class="stage-logo"><i data-lucide="headphones"></i></div>
                    <div class="stage-info"><h3>Deezer</h3><span class="stage-role">Dev mars 2023 - avr. 2023</span></div>
                </div>
                <div class="stage-details"><p>- SQL, Data analysis & Data extraction from Database<br>- Python<br>- HTML, création d'un portfolio <br>- Metadata Curation & Content Creation</p></div>
            </div>

            <div class="stage-card" data-action="toggle-stage">
                <div class="stage-header">
                    <div class="stage-logo"><i data-lucide="headphones"></i></div>
                    <div class="stage-info"><h3>Deezer</h3><span class="stage-role">Dev nov. 2022 - déc. 2022</span></div>
                </div>
                <div class="stage-details"><p>- SQL Initiation, Data analysis<br>- Python initiation, création de Blind Test<br>- Utilisation d’API Deezer</p></div>
            </div>

            <div class="stage-card" data-action="toggle-stage">
                <div class="stage-header">
                    <div class="stage-logo"><i data-lucide="gamepad-2"></i></div>
                    <div class="stage-info"><h3>Micromania</h3><span class="stage-role">Assistant commercial mai 2022 - juin 2022</span></div>
                </div>
                <div class="stage-details"><p>- Relations clientèles<br>- Test de console<br>- Mise en rayonnage</p></div>
            </div>

        </div>
    `,

  // --- 4. COMPÉTENCES (Amélioré) ---
  competences: `
        <h2>Mes Compétences</h2>
        <p class="text-secondary" style="margin-bottom: 25px;">Technologies et outils que j'utilise au quotidien.</p>
        
        <div class="skill-container">
            <div class="skill-section">
                <h3 class="text-secondary" style="display:flex; align-items:center; gap:8px;">
                    <i data-lucide="palette" width="18"></i> DESIGN
                </h3>
                <div class="skills-grid">
                    <span class="skill figma">Figma</span>
                </div>
            </div>

            <div class="skill-section">
                <h3 class="text-secondary" style="display:flex; align-items:center; gap:8px;">
                    <i data-lucide="monitor" width="18"></i> FRONT-END
                </h3>
                <div class="skills-grid">
                    <span class="skill html">HTML</span>
                    <span class="skill css">CSS</span>
                    <span class="skill js">JavaScript</span>
                    <span class="skill react">React</span>
                </div>
            </div>

            <div class="skill-section">
                <h3 class="text-secondary" style="display:flex; align-items:center; gap:8px;">
                    <i data-lucide="server" width="18"></i> BACK-END
                </h3>
                <div class="skills-grid">
                    <span class="skill php">PHP</span>
                    <span class="skill python">Python</span>
                    <span class="skill node">Node.js</span>
                </div>
            </div>

            <div class="skill-section">
                <h3 class="text-secondary" style="display:flex; align-items:center; gap:8px;">
                    <i data-lucide="container" width="18"></i> DEVOPS & OUTILS
                </h3>
                <div class="skills-grid">
                    <span class="skill" style="background:#e0f2fe; color:#0369a1;">Docker</span>
                    <span class="skill" style="background:#f3e8ff; color:#7e22ce;">Git</span>
                    <span class="skill" style="background:#fee2e2; color:#b91c1c;">Linux</span>
                </div>
            </div>
        </div>
    `,

  // --- 5. SYNTHÈSE ---
  synthese: `
        <h2>Tableau de Synthèse</h2>
        <p class="subtitle text-secondary">Accès au tableau Google Sheets</p>
        <div class="sheet-embed-container">
            <a href="https://docs.google.com/spreadsheets/d/1Cq1e443zRg0Iu35bX141mebjJ1j8dp8ZV35W2S8iU_w/edit?gid=781355869#gid=781355869" target="_blank" class="open-sheet-btn">
                <i data-lucide="external-link" size="16"></i> Ouvrir dans Google Sheets
            </a>
            <iframe class="sheet-frame" src="https://docs.google.com/spreadsheets/d/1Cq1e443zRg0Iu35bX141mebjJ1j8dp8ZV35W2S8iU_w/preview?gid=781355869"></iframe>
        </div>
    `,

  // --- 6. PROJETS ---
  projets: `
        <h2>Mes Réalisations</h2>
        <div class="project-list">
            <div class="project-card">
                <h3>💬 Projet 1 : Chatbex</h3>
                <p class="text-secondary">Plateforme de communication conçue pour créer des communautés en ligne.
Elle permet aux utilisateurs de discuter en temps réel via des messages texte, des appels vocaux et vidéo.</p>
            <div class="tags"><span class="tag">#</span><span class="tag">#</span><span class="tag">#</span></div>
            </div>
            <div class="project-card">
                <h3>⛏️ Projet 2 : Serveur Minecraft</h3>
                <p class="text-secondary">J’ai conçu et administré un serveur Minecraft, en gérant l’hébergement, la configuration des plugins/mods et l’optimisation des performances. Ce projet m’a permis de développer des compétences en gestion de serveurs, en scripting et en administration de communauté.</p>
                <div class="tags"><span class="tag">Linux</span><span class="tag">Java</span><span class="tag">Python</span></div>
            </div>
        </div>
    `,

  // --- 7. VEILLE ---
  veille: `
        <div class="center">
            <h2>Veille Technologique</h2>
            <p class="text-secondary" style="margin-bottom: 20px;">Flux automatique sur l'Informatique Quantique & DevOps</p>
            <div id="veille-content" style="width: 100%; max-width: 600px; text-align: left;">
                <div class="quantum-box">
                    <i data-lucide="atom" class="spin-icon" style="width:80px; height:80px;"></i>
                    <h3>Initialisation...</h3>
                    <p>Le script récupère les dernières actualités.</p>
                </div>
                </div>
        </div>
    `,

  // --- 8. CV (Chemin corrigé) ---
  cv: `
        <div class="center">
            <h2>Curriculum Vitae</h2>
            <iframe src="asset/cv.pdf" class="cv-preview" title="Mon CV"></iframe>
            <a href="asset/cv.pdf" download class="download-btn">
                <i data-lucide="download"></i> Télécharger le CV
            </a>
        </div>
    `,

  // --- 9. CONTACT ---
  contact: `
        <div class="contact-container">
            <h2>Ping me 📌</h2>
            <p class="text-secondary">Envoyez-moi un message, il arrivera directement sur mon Discord !</p>
            
            <div class="social-glow-row">
                <a href="https://www.linkedin.com/in/bilal-lachkar" target="_blank" class="glow-btn linkedin">
                    <i data-lucide="linkedin"></i>
                </a>
                <a href="https://github.com/Flaimeur" target="_blank" class="glow-btn github">
                    <i data-lucide="github"></i>
                </a>
            </div>

            <form class="contact-form" id="contact-form">
                <div class="form-group">
                    <input type="text" name="nom" placeholder="Votre Nom" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Votre Email" required>
                </div>
                <div class="form-group">
                    <textarea name="message" rows="5" placeholder="Votre Message..." required></textarea>
                </div>
                <button type="submit" class="submit-btn">
                    Envoyer le message 🚀
                </button>
            </form>
        </div>
    `,
};
