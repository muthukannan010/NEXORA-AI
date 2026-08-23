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
import { supabase } from './services/supabase.js';
import { fetchProfile } from './services/profile.js';
import { getUnreadCount } from './services/notifications.js';
import { toast } from './utils/toast.js';

// Routes that require authentication
const PROTECTED_ROUTES = [
    '/dashboard', '/analyzer', '/result', '/history', '/profile',
    '/edit-profile', '/usage', '/plans', '/notifications',
    '/settings', '/security'
];

// Regex patterns for dynamic protected routes
const PROTECTED_PATTERNS = [/^\/history\/.+/];

function isProtectedRoute(path) {
    if (PROTECTED_ROUTES.includes(path)) return true;
    return PROTECTED_PATTERNS.some(p => p.test(path));
}

// Re-render navbar and update notification badge
async function refreshNavbar() {
    const navbarEl = document.getElementById('navbar-container');
    if (navbarEl) {
        navbarEl.innerHTML = Navbar();
        initNavbar();
        // Update unread notification badge
        if (state.get('currentUser')) {
            try {
                const count = await getUnreadCount();
                const badge = document.querySelector('.notification-badge');
                if (badge) {
                    badge.textContent = count;
                    badge.style.display = count > 0 ? 'flex' : 'none';
                }
            } catch { /* silently ignore */ }
        }
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const appContainer = document.getElementById('app');

    // Render the app shell (navbar + router-view + footer)
    appContainer.innerHTML = `
        <div id="navbar-container">${Navbar()}</div>
        <main id="router-view"></main>
        ${Footer()}
        <div id="toast-container" aria-live="polite"></div>
    `;

    // Initialize shell components
    initNavbar();
    initScrollAnimations();

    // Apply saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Initialize Router
    const router = new Router('router-view', PROTECTED_ROUTES, PROTECTED_PATTERNS);

    // Register all routes
    router.addRoute('/', Hero, initHero);
    router.addRoute('/about', About);
    router.addRoute('/features', Features);
    router.addRoute('/analyzer', Analyzer, () => initAnalyzer(router), true);
    router.addRoute('/result', Result, initResult, true);
    router.addRoute('/history', History, initHistory, true);
    router.addRoute('/history/:id', ScanDetail, () => initScanDetail(router), true);
    router.addRoute('/profile', Profile, () => initProfile(router), true);
    router.addRoute('/edit-profile', EditProfile, () => initEditProfile(router), true);
    router.addRoute('/usage', Usage, () => initUsage(router), true);
    router.addRoute('/plans', Plans, () => initPlans(router), true);
    router.addRoute('/notifications', Notifications, () => initNotifications(router), true);
    router.addRoute('/settings', Settings, () => initSettings(router), true);
    router.addRoute('/security', Security, () => initSecurity(router), true);
    router.addRoute('/faq', Faq, initFaq);
    router.addRoute('/contact', Contact, initContact);
    router.addRoute('/privacy', Privacy);
    router.addRoute('/login', Login, () => initLogin(router));
    router.addRoute('/register', Register, () => initRegister(router));
    router.addRoute('/forgot-password', ForgotPassword, () => initForgotPassword(router));
    router.addRoute('/verify-email', VerifyEmail, () => initVerifyEmail(router));
    router.addRoute('/dashboard', Dashboard, () => initDashboard(router), true);

    // ─── AUTH STATE BOOTSTRAP ─────────────────────────────────────────────────
    // Restore session on page load (handles page refresh)
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            state.set('currentUser', session.user);
            state.set('session', session);
            // Fetch profile in background
            fetchProfile().catch(() => {});
        }
    } catch (err) {
        console.error('Session restore failed:', err);
    }

    // Listen for auth state changes (login, logout, token refresh, session expiry)
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
            state.set('currentUser', session.user);
            state.set('session', session);
            await fetchProfile().catch(() => {});
            await refreshNavbar();
        } else if (event === 'SIGNED_OUT') {
            state.set('currentUser', null);
            state.set('session', null);
            state.set('profile', null);
            state.set('currentPlan', null);
            state.set('usage', null);
            await refreshNavbar();
            // If on a protected page, redirect to login
            if (isProtectedRoute(window.location.pathname)) {
                toast.info('Your session has ended. Please sign in again.');
                router.navigateTo('/login');
            }
        } else if (event === 'TOKEN_REFRESHED') {
            state.set('session', session);
        } else if (event === 'USER_UPDATED') {
            state.set('currentUser', session.user);
            await refreshNavbar();
        } else if (event === 'PASSWORD_RECOVERY') {
            // User clicked reset link — navigate to security page
            router.navigateTo('/security');
        }
    });

    // Re-render navbar when currentUser state changes
    state.subscribe(async (key) => {
        if (key === 'currentUser') {
            await refreshNavbar();
        }
    });

    // ─── INITIAL ROUTE LOAD ───────────────────────────────────────────────────
    router.loadRoute(window.location.pathname);
});
