import { appContents } from './content.js';

// Sélection des éléments du DOM
const menuView = document.getElementById('menu-view');
const bottomBar = document.getElementById('bottom-bar');
const appWindow = document.getElementById('app-window');
const appHeader = document.getElementById('app-header');
const appTitle = document.getElementById('app-title');
const appBody = document.getElementById('app-body');

export function openApp(appConfig) {
    // 1. Animation de sortie du menu
    menuView.classList.remove('fade-in');
    menuView.classList.add('zoom-exit');
    bottomBar.style.opacity = '0';

    setTimeout(() => {
        // 2. Préparation de la fenêtre
        menuView.classList.add('hidden');
        
        appTitle.innerText = appConfig.title;
        appHeader.style.backgroundColor = appConfig.color;
        
        // Injection du HTML
        appBody.innerHTML = appContents[appConfig.id] || "<p>Contenu en construction...</p>";

        // Gestion padding spécial GitHub
        if (appConfig.id === 'github') appBody.classList.add('no-padding');
        else appBody.classList.remove('no-padding');

        // 3. Affichage de la fenêtre
        appWindow.classList.remove('hidden');
        appWindow.classList.add('fade-in-up');
        
        // Rafraîchir les icônes Lucide nouvellement injectées
        if(window.lucide) window.lucide.createIcons();

    }, 500);
}

export function closeApp() {
    appWindow.classList.add('hidden');
    appWindow.classList.remove('fade-in-up');

    menuView.classList.remove('hidden');
    menuView.classList.remove('zoom-exit');
    menuView.classList.add('fade-in');
    bottomBar.style.opacity = '1';
}