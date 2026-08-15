// assets/js/app.js

import { Router } from './router.js';
import { Navbar, initNavbar } from './components/Navbar.js';
import { Hero, initHero } from './components/Hero.js';
import { Footer } from './components/Footer.js';
import { About } from './components/About.js';
import { Features } from './components/Features.js';
import { Analyzer, initAnalyzer } from './components/Analyzer.js';
import { Result, initResult } from './components/Result.js';
import { History, initHistory } from './components/History.js';
import { ScanDetail, initScanDetail } from './components/ScanDetail.js';
import { Profile, initProfile } from './components/Profile.js';
import { EditProfile, initEditProfile } from './components/EditProfile.js';
import { Usage, initUsage } from './components/Usage.js';
import { Plans, initPlans } from './components/Plans.js';
import { Notifications, initNotifications } from './components/Notifications.js';
import { Settings, initSettings } from './components/Settings.js';
import { Security, initSecurity } from './components/Security.js';
import { Faq, initFaq } from './components/FAQ.js';
import { Contact, initContact } from './components/Contact.js';
import { Privacy } from './components/Privacy.js';
import { Login, initLogin } from './components/Login.js';
import { Register, initRegister } from './components/Register.js';
import { ForgotPassword, initForgotPassword } from './components/ForgotPassword.js';
import { VerifyEmail, initVerifyEmail } from './components/VerifyEmail.js';
import { Dashboard, initDashboard } from './components/Dashboard.js';
import { initScrollAnimations } from './utils/scrollAnimations.js';
import { state } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
    
    const appContainer = document.getElementById('app');
    
    // Render the app shell
    appContainer.innerHTML = `
        <div id="navbar-container">${Navbar()}</div>
        <main id="router-view"></main>
        ${Footer()}
    `;
    
    // Initialize Shell Components
    initNavbar();
    initScrollAnimations();

    // Re-render Navbar when user state changes
    state.subscribe((key) => {
        if (key === 'currentUser') {
            document.getElementById('navbar-container').innerHTML = Navbar();
            initNavbar();
        }
    });

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize Router pointing to the router-view inside #app
    const router = new Router('router-view');

    // Register Routes
    router.addRoute('/', Hero, initHero);
    router.addRoute('/about', About);
    router.addRoute('/features', Features);
    
    // We pass router to initAnalyzer so it can trigger navigation after the animation finishes
    router.addRoute('/analyzer', Analyzer, () => initAnalyzer(router));
    
    router.addRoute('/result', Result, initResult);
    router.addRoute('/history', History, initHistory);
    router.addRoute('/history/:id', ScanDetail, () => initScanDetail(router));
    router.addRoute('/profile', Profile, () => initProfile(router));
    router.addRoute('/edit-profile', EditProfile, () => initEditProfile(router));
    router.addRoute('/usage', Usage, () => initUsage(router));
    router.addRoute('/plans', Plans, () => initPlans(router));
    router.addRoute('/notifications', Notifications, () => initNotifications(router));
    router.addRoute('/settings', Settings, () => initSettings(router));
    router.addRoute('/security', Security, () => initSecurity(router));
    router.addRoute('/faq', Faq, initFaq);
    router.addRoute('/contact', Contact, initContact);
    router.addRoute('/privacy', Privacy);
    router.addRoute('/login', Login, () => initLogin(router));
    router.addRoute('/register', Register, () => initRegister(router));
    router.addRoute('/forgot-password', ForgotPassword, () => initForgotPassword(router));
    router.addRoute('/verify-email', VerifyEmail, () => initVerifyEmail(router));
    router.addRoute('/dashboard', Dashboard, () => initDashboard(router));

    // Initial Load
    router.loadRoute(window.location.pathname);
});
