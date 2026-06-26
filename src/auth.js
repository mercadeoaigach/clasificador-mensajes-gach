import { supabase } from '../supabase.js'

let isLoginMode = true;

const form = document.getElementById('auth-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const title = document.getElementById('form-title');
const subtitle = document.getElementById('form-subtitle');
const btn = document.getElementById('submit-btn');
const switchText = document.getElementById('switch-text');
const switchLink = document.getElementById('switch-link');
const messageBox = document.getElementById('auth-message');
const togglePasswordBtn = document.getElementById('toggle-password');
const generatePwdBtn = document.getElementById('generate-pwd-btn');

// Cambiar entre Login y Registro
switchLink.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    messageBox.style.display = 'none'; // ocultar mensajes anteriores

    if (isLoginMode) {
        title.textContent = 'Iniciar Sesión';
        subtitle.textContent = 'Ingresa para acceder a tus conjuntos y mensajes.';
        btn.textContent = 'Entrar';
        switchText.textContent = '¿No tienes cuenta?';
        switchLink.textContent = 'Regístrate aquí';
        generatePwdBtn.style.display = 'none';
    } else {
        title.textContent = 'Crear Cuenta';
        subtitle.textContent = 'Regístrate para guardar y clasificar tus mensajes.';
        btn.textContent = 'Registrarse';
        switchText.textContent = '¿Ya tienes cuenta?';
        switchLink.textContent = 'Inicia sesión aquí';
        generatePwdBtn.style.display = 'inline-block'; // Solo mostrar al registrarse
    }
});

// Toggle password visibility
togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Change icon
    togglePasswordBtn.innerHTML = type === 'password' 
        ? '<i data-lucide="eye" style="width: 18px; height: 18px;"></i>' 
        : '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>';
    lucide.createIcons();
});

// Generate secure password
generatePwdBtn.addEventListener('click', () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < 16; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    passwordInput.value = password;
    passwordInput.setAttribute('type', 'text');
    togglePasswordBtn.innerHTML = '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>';
    lucide.createIcons();
    showMessage('Contraseña segura generada. ¡Asegúrate de guardarla en un lugar seguro antes de registrarte!');
});

function showMessage(msg, isError = false) {
    messageBox.textContent = msg;
    messageBox.className = isError ? 'msg-error' : 'msg-success';
    messageBox.style.display = 'block';
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    
    btn.disabled = true;
    btn.innerHTML = 'Cargando...';
    messageBox.style.display = 'none';

    try {
        if (isLoginMode) {
            // Login
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) throw error;
            
            // Redirect to main app
            window.location.href = '/index.html';

        } else {
            // Register
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) throw error;

            showMessage('¡Registro exitoso! Revisa tu correo electrónico para confirmar tu cuenta (recibirás un enlace).');
        }
    } catch (error) {
        let errorMsg = 'Ha ocurrido un error. Inténtalo de nuevo.';
        if (error.message.includes('Invalid login credentials')) errorMsg = 'Correo o contraseña incorrectos.';
        if (error.message.includes('User already registered')) errorMsg = 'El correo ya está registrado.';
        showMessage(errorMsg, true);
    } finally {
        btn.disabled = false;
        btn.textContent = isLoginMode ? 'Entrar' : 'Registrarse';
    }
});

// Comprobar si ya hay sesión iniciada al cargar la página
window.addEventListener('DOMContentLoaded', async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        window.location.href = '/index.html';
    }
});
