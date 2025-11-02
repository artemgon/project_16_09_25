// Task 1
const translations = {
    en: {
        title: "Registration",
        login: "Login",
        email: "Email",
        password: "Password",
        remember: "Remember me",
        submit: "Register",
        clear: "Clear all data",
        toggle: "UA",
        welcome: "Welcome, ",
        message: "Language changed",
        clearMessage: "All data cleared",
        guest: "Guest"
    },
    uk: {
        title: "Реєстрація",
        login: "Логін",
        email: "Електронна пошта",
        password: "Пароль",
        remember: "Запам'ятати мене",
        submit: "Зареєструватися",
        clear: "Очистити всі дані",
        toggle: "EN",
        welcome: "Ласкаво просимо, ",
        message: "Мову змінено",
        clearMessage: "Всі дані очищено",
        guest: "Гість"
    }
};

class App {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }

    init() {
        this.applyLanguage(this.currentLanguage);
        this.setupEventListeners();
        this.checkStoredLogin();
    }

    applyLanguage(lang) {
        document.getElementById('pageTitle').textContent = translations[lang].title;
        document.getElementById('login').placeholder = translations[lang].login;
        document.getElementById('email').placeholder = translations[lang].email;
        document.getElementById('password').placeholder = translations[lang].password;
        document.getElementById('rememberLabel').textContent = translations[lang].remember;
        document.getElementById('submitBtn').textContent = translations[lang].submit;
        document.getElementById('clearDataBtn').textContent = translations[lang].clear;
        document.getElementById('languageToggle').textContent = translations[lang].toggle;
    
        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        this.currentLanguage = lang;
    }

    showLanguageMessage() {
        const messageElement = document.getElementById('languageMessage');
        messageElement.textContent = translations[this.currentLanguage].message;
        messageElement.classList.remove('hidden');

        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 3000);
    }

    showClearMessage() {
        const messageElement = document.getElementById('languageMessage');
        messageElement.textContent = translations[this.currentLanguage].clearMessage;
        messageElement.classList.remove('hidden');

        setTimeout(() => {
            messageElement.classList.add('hidden');
        }, 3000);
    }

    // Task 2
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
    }

    getCookie(name) {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
    }

    deleteCookie(name) { 
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validatePassword(password) {
        return password.length >= 8;
    }

    checkStoredLogin() {
        const savedLogin = this.getCookie('userLogin');
        if (savedLogin) { 
            this.showWelcomeMessage(savedLogin);
        }
    }

    showWelcomeMessage(login) {
        const messageElement = document.getElementById('welcomeMessage');
        messageElement.textContent = translations[this.currentLanguage].welcome + login;
        messageElement.classList.remove('hidden');
    }

    // Task 3
    clearAllData() { 
        document.cookie.split(";").forEach(cookie => { 
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            this.deleteCookie(name);
        });

        localStorage.clear();

        document.getElementById('registrationForm').reset();

        document.getElementById('rememberMe').checked = false;

        const welcomeMessage = document.getElementById('welcomeMessage');
        welcomeMessage.classList.add('fade-out');
        setTimeout(() => { 
            welcomeMessage.classList.add('hidden');
            welcomeMessage.classList.remove('fade-out');
        }, 500);

        this.applyLanguage('en');
        
        this.showClearMessage();
    }

    // Event handlers
    setupEventListeners() { 
        // Task 1 
        document.getElementById('languageToggle').addEventListener('click', () => {
            const newLanguage = this.currentLanguage === 'en' ? 'uk' : 'en';
            this.applyLanguage(newLanguage);
            this.showLanguageMessage();
        });

        // Task 2 
        document.getElementById('registrationForm').addEventListener('submit', (e) => {
            e.preventDefault();

            const login = document.getElementById('login').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            if (!this.validateEmail(email)) {
                alert('Invalid email format');
                return;
            }

            if (!this.validatePassword(password)) { 
                alert('Password must be at least 8 characters long');
                return;
            }

            if (rememberMe) {
                this.setCookie('userLogin', login, 7);
            }

            this.showWelcomeMessage(login);
            document.getElementById('registrationForm').reset();
        });

        // Task 3
        document.getElementById('clearDataBtn').addEventListener('click', () => {
            this.clearAllData();
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new App();
});