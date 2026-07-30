import { supabase } from '../supabase.js'

let authMode = 'login'; // 'login', 'register', 'forgot', 'reset'

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
const forgotPwdLink = document.getElementById('forgot-pwd-link');
const passwordGroup = document.getElementById('password-group');
const authSwitchContainer = document.getElementById('auth-switch-container');
const backToLoginContainer = document.getElementById('back-to-login-container');
const backToLoginLink = document.getElementById('back-to-login-link');

function setMode(mode) {
    authMode = mode;
    messageBox.style.display = 'none';
    
    if (mode === 'login') {
        title.textContent = 'Iniciar Sesión';
        subtitle.textContent = 'Ingresa para acceder a tus conjuntos y mensajes.';
        btn.textContent = 'Entrar';
        passwordGroup.style.display = 'block';
        emailInput.parentElement.style.display = 'block';
        generatePwdBtn.style.display = 'none';
        forgotPwdLink.style.display = 'inline-block';
        authSwitchContainer.style.display = 'block';
        backToLoginContainer.style.display = 'none';
        switchText.textContent = '¿No tienes cuenta?';
        switchLink.textContent = 'Regístrate aquí';
        passwordInput.required = true;
        emailInput.required = true;
    } else if (mode === 'register') {
        title.textContent = 'Crear Cuenta';
        subtitle.textContent = 'Regístrate para guardar y clasificar tus mensajes.';
        btn.textContent = 'Registrarse';
        passwordGroup.style.display = 'block';
        emailInput.parentElement.style.display = 'block';
        generatePwdBtn.style.display = 'inline-block';
        forgotPwdLink.style.display = 'none';
        authSwitchContainer.style.display = 'block';
        backToLoginContainer.style.display = 'none';
        switchText.textContent = '¿Ya tienes cuenta?';
        switchLink.textContent = 'Inicia sesión aquí';
        passwordInput.required = true;
        emailInput.required = true;
    } else if (mode === 'forgot') {
        title.textContent = 'Recuperar Contraseña';
        subtitle.textContent = 'Ingresa tu correo y te enviaremos un enlace para restablecerla.';
        btn.textContent = 'Enviar enlace';
        passwordGroup.style.display = 'none';
        emailInput.parentElement.style.display = 'block';
        authSwitchContainer.style.display = 'none';
        backToLoginContainer.style.display = 'block';
        passwordInput.required = false;
        emailInput.required = true;
    } else if (mode === 'reset') {
        title.textContent = 'Nueva Contraseña';
        subtitle.textContent = 'Escribe tu nueva contraseña segura.';
        btn.textContent = 'Actualizar Contraseña';
        passwordGroup.style.display = 'block';
        emailInput.parentElement.style.display = 'none';
        generatePwdBtn.style.display = 'inline-block';
        forgotPwdLink.style.display = 'none';
        authSwitchContainer.style.display = 'none';
        backToLoginContainer.style.display = 'none';
        passwordInput.required = true;
        emailInput.required = false;
    }
}

switchLink.addEventListener('click', () => {
    setMode(authMode === 'login' ? 'register' : 'login');
});

forgotPwdLink?.addEventListener('click', () => {
    setMode('forgot');
});

backToLoginLink?.addEventListener('click', () => {
    setMode('login');
});

togglePasswordBtn.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordBtn.innerHTML = type === 'password' 
        ? '<i data-lucide="eye" style="width: 18px; height: 18px;"></i>' 
        : '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>';
    lucide.createIcons();
});

generatePwdBtn.addEventListener('click', () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passwordInput.value = password;
    passwordInput.setAttribute('type', 'text');
    togglePasswordBtn.innerHTML = '<i data-lucide="eye-off" style="width: 18px; height: 18px;"></i>';
    lucide.createIcons();
    showMessage('Contraseña generada. ¡Guárdala antes de continuar!');
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
    const originalText = btn.textContent;
    btn.innerHTML = 'Cargando...';
    messageBox.style.display = 'none';

    try {
        if (authMode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            window.location.href = '/index.html';
        } else if (authMode === 'register') {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            showMessage('¡Registro exitoso! Ya puedes iniciar sesión con tu nueva cuenta.');
            setMode('login');
            emailInput.value = email;
            passwordInput.value = '';
        } else if (authMode === 'forgot') {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: window.location.origin + '/auth.html?type=recovery'
            });
            if (error) throw error;
            showMessage('Te hemos enviado un enlace de recuperación a tu correo.');
        } else if (authMode === 'reset') {
            const { error } = await supabase.auth.updateUser({ password });
            if (error) throw error;
            showMessage('Contraseña actualizada con éxito. Redirigiendo...');
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 1500);
        }
    } catch (error) {
        let errorMsg = 'Ha ocurrido un error. Inténtalo de nuevo.';
        if (error.message.includes('Invalid login credentials')) errorMsg = 'Correo o contraseña incorrectos.';
        if (error.message.includes('User already registered')) errorMsg = 'El correo ya está registrado.';
        showMessage(errorMsg, true);
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
});

window.addEventListener('DOMContentLoaded', async () => {
    // Detectar si venimos de un enlace de recuperación de contraseña
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(window.location.search);
    
    if (hash.includes('type=recovery') || urlParams.get('type') === 'recovery') {
        setMode('reset');
        return; // No comprobar auth normal, ya estamos en el flujo de reseteo (Supabase auto-loggea temporalmente)
    }

    const { data } = await supabase.auth.getSession();
    if (data.session && authMode !== 'reset') {
        window.location.href = '/index.html';
    } else {
        setMode('login');
    }
});
