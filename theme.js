// Lógica y estado del tema (Modo Oscuro) aislado

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');
const logoImg = document.getElementById('app-brand-logo');

// Nombres de archivos de logo (ajustar si es necesario)
const LOGO_LIGHT = 'logo.png';
const LOGO_DARK = 'Logo Blanco.png';

// 1. Inicializar tema desde LocalStorage
function initTheme() {
    const savedTheme = localStorage.getItem('uin_app_theme') || 'light';
    applyTheme(savedTheme);
}

// 2. Aplicar un tema específico
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', 'sun');
            themeIcon.classList.add('text-warning'); // Sol amarillo opcional
        }
        if (logoImg) logoImg.src = LOGO_DARK;
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.setAttribute('data-lucide', 'moon');
            themeIcon.classList.remove('text-warning');
        }
        if (logoImg) logoImg.src = LOGO_LIGHT;
    }
    
    // Si la librería de iconos ya cargó, forzar a redibujar el botón particular
    if (window.lucide) {
        lucide.createIcons();
    }
}

// 3. Alternar tema (Toggle)
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Guardar en persistencia
    localStorage.setItem('uin_app_theme', newTheme);
    
    // Aplicar visualmente
    applyTheme(newTheme);
}

// Event Listeners
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// Ejecutar al cargar este script
initTheme();
