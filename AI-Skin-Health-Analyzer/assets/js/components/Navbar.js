// assets/js/components/Navbar.js
import { state } from '../state.js';
import { getDisplayName, getInitials } from '../services/profile.js';

export function Navbar() {
    const user = state.get('currentUser');
    const profile = state.get('profile');
    const isLoggedIn = !!user;

    const displayName = isLoggedIn ? getDisplayName(profile, user) : '';
    const initials = isLoggedIn ? getInitials(profile, user) : '';

    const loggedOutMenu = `
        <li><a href="/" data-link class="nav-link">Home</a></li>
        <li><a href="/about" data-link class="nav-link">About</a></li>
        <li><a href="/features" data-link class="nav-link">Features</a></li>
        <li><a href="/faq" data-link class="nav-link">FAQ</a></li>
        <li><a href="/contact" data-link class="nav-link">Contact</a></li>
    `;

    const loggedOutCta = `
        <button id="theme-toggle" class="btn-icon theme-btn" aria-label="Toggle Dark Mode">
            <i class="fa-solid fa-moon"></i>
        </button>
        <a href="/login" data-link class="nav-link nav-login">Login</a>
        <a href="/register" data-link class="btn btn-primary">Get Started</a>
    `;

    const loggedInMenu = `
        <li><a href="/dashboard" data-link class="nav-link">Dashboard</a></li>
        <li><a href="/analyzer" data-link class="nav-link">AI Analyzer</a></li>
        <li><a href="/history" data-link class="nav-link">History</a></li>
        <li><a href="/plans" data-link class="nav-link">Plans</a></li>
    `;

    const loggedInCta = `
        <button id="theme-toggle" class="btn-icon theme-btn" aria-label="Toggle Dark Mode">
            <i class="fa-solid fa-moon"></i>
        </button>
        <div class="nav-notifications">
            <a href="/notifications" data-link class="btn-icon notification-btn" id="notification-toggle" aria-label="Notifications">
                <i class="fa-regular fa-bell"></i>
                <span class="notification-badge" style="display:none;">0</span>
            </a>
        </div>
        <div class="nav-profile dropdown">
            <button class="profile-toggle" id="profile-toggle" aria-expanded="false">
                <div class="nav-avatar" aria-hidden="true">${initials}</div>
                <span class="user-name">${displayName}</span>
                <i class="fa-solid fa-chevron-down nav-chevron"></i>
            </button>
            <div class="dropdown-menu" id="profile-dropdown" aria-hidden="true">
                <a href="/dashboard" data-link class="dropdown-item"><i class="fa-solid fa-gauge-high"></i> Dashboard</a>
                <a href="/profile" data-link class="dropdown-item"><i class="fa-regular fa-user"></i> My Profile</a>
                <a href="/plans" data-link class="dropdown-item"><i class="fa-solid fa-star"></i> My Plan</a>
                <a href="/usage" data-link class="dropdown-item"><i class="fa-solid fa-chart-pie"></i> Usage</a>
                <a href="/history" data-link class="dropdown-item"><i class="fa-solid fa-clock-rotate-left"></i> Scan History</a>
                <a href="/settings" data-link class="dropdown-item"><i class="fa-solid fa-gear"></i> Settings</a>
                <a href="/security" data-link class="dropdown-item"><i class="fa-solid fa-shield-halved"></i> Security</a>
                <hr class="dropdown-divider">
                <a href="#" id="logout-btn" class="dropdown-item dropdown-item-danger"><i class="fa-solid fa-right-from-bracket"></i> Logout</a>
            </div>
        </div>
    `;

    return `
        <nav class="navbar" id="main-navbar">
            <div class="container navbar-container">
                <a href="${isLoggedIn ? '/dashboard' : '/'}" data-link class="navbar-brand">
                    <i class="fa-solid fa-microscope"></i> NEXORA <span class="brand-ai">ai</span>
                </a>
                
                <button class="navbar-toggle" id="navbar-toggle" aria-label="Toggle navigation" aria-expanded="false">
                    <i class="fa-solid fa-bars"></i>
                </button>
                
                <div class="navbar-collapse" id="navbar-collapse">
                    <ul class="navbar-menu" id="navbar-menu">
                        ${isLoggedIn ? loggedInMenu : loggedOutMenu}
                    </ul>
                    <div class="navbar-cta">
                        ${isLoggedIn ? loggedInCta : loggedOutCta}
                    </div>
                </div>
            </div>
        </nav>
    `;
}

export function initNavbar() {
    const navbar = document.getElementById('main-navbar');
    const toggleBtn = document.getElementById('navbar-toggle');
    const navbarCollapse = document.getElementById('navbar-collapse');
    const themeToggle = document.getElementById('theme-toggle');
    const profileToggle = document.getElementById('profile-toggle');
    const profileDropdown = document.getElementById('profile-dropdown');
    const logoutBtn = document.getElementById('logout-btn');

    // Theme Toggle
    if (themeToggle) {
        const updateThemeIcon = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            themeToggle.innerHTML = isDark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        };
        updateThemeIcon();
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon();
        });
    }

    // Profile Dropdown Toggle
    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = profileDropdown.classList.contains('open');
            profileDropdown.classList.toggle('open', !isOpen);
            profileToggle.setAttribute('aria-expanded', String(!isOpen));
            profileDropdown.setAttribute('aria-hidden', String(isOpen));
        });

        document.addEventListener('click', (e) => {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('open');
                profileToggle.setAttribute('aria-expanded', 'false');
                profileDropdown.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                const { signOut } = await import('../services/auth.js');
                const { toast } = await import('../utils/toast.js');
                profileDropdown?.classList.remove('open');
                await signOut();
                toast.success('You have been logged out.');
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new Event('popstate'));
            } catch (err) {
                console.error('Logout error:', err);
            }
        });
    }

    // Scroll effect
    if (navbar) {
        const handleScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // Mobile toggle
    if (toggleBtn && navbarCollapse) {
        // Clone to remove stale listeners
        const newToggleBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);

        newToggleBtn.addEventListener('click', () => {
            const isOpen = navbarCollapse.classList.toggle('active');
            newToggleBtn.setAttribute('aria-expanded', String(isOpen));
            const icon = newToggleBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars';
            }
        });

        navbarCollapse.querySelectorAll('a[data-link]').forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('active');
                newToggleBtn.setAttribute('aria-expanded', 'false');
                const icon = newToggleBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }
}
