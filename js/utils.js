export function updateClock(elementId) {
    const clock = document.getElementById(elementId);
    if(clock) {
        const now = new Date();
        clock.innerText = now.toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
    }
}

// Une fonction simple pour gérer le thème sombre
export function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}