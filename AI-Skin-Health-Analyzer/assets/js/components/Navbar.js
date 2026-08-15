// assets/js/components/Navbar.js
import { state } from '../state.js';

export function Navbar() {
    const isLoggedIn = !!state.get('currentUser');

    const loggedOutMenu = `
        <li><a href="/" data-link class="nav-link">Home</a></li>
        <li><a href="/about" data-link class="nav-link">About</a></li>
        <li><a href="/features" data-link class="nav-link">Features</a></li>
        <li><a href="/how-it-works" data-link class="nav-link">How It Works</a></li>
        <li><a href="/faq" data-link class="nav-link">FAQ</a></li>
        <li><a href="/contact" data-link class="nav-link">Contact</a></li>
    `;

    const loggedOutCta = `
        <button id="theme-toggle" class="btn btn-icon" aria-label="Toggle Dark Mode" style="background:none; border:none; color:var(--text); cursor:pointer; font-size:1.2rem; margin-right: 16px;">
            <i class="fa-solid fa-moon"></i>
        </button>
        <a href="/login" data-link class="nav-link" style="margin-right: 16px; font-weight: 600;">Login</a>
        <a href="/register" data-link class="btn btn-primary">Get Started</a>
    `;

    const loggedInMenu = `
        <li><a href="/dashboard" data-link class="nav-link">Dashboard</a></li>
        <li><a href="/analyzer" data-link class="nav-link">AI Analyzer</a></li>
        <li><a href="/history" data-link class="nav-link">History</a></li>
        <li><a href="/plans" data-link class="nav-link">Plans</a></li>
    `;

    const loggedInCta = `
        <button id="theme-toggle" class="btn btn-icon" aria-label="Toggle Dark Mode" style="background:none; border:none; color:var(--text); cursor:pointer; font-size:1.2rem; margin-right: 16px;">
            <i class="fa-solid fa-moon"></i>
        </button>
        <div class="nav-notifications">
            <button class="btn-icon" id="notification-toggle" style="background:none; border:none; color:var(--text); cursor:pointer; font-size:1.2rem; margin-right: 16px; position:relative;">
                <i class="fa-regular fa-bell"></i>
                <span class="notification-badge" style="position:absolute; top:-5px; right:-5px; background:var(--danger); color:#fff; font-size:0.6rem; border-radius:50%; width:16px; height:16px; display:flex; align-items:center; justify-content:center;">3</span>
            </button>
        </div>
        <div class="nav-profile dropdown">
            <button class="profile-toggle" id="profile-toggle" style="background:none; border:none; display:flex; align-items:center; gap:8px; cursor:pointer; color:var(--text); font-family:var(--font-family); font-weight:500;">
                <div class="avatar" style="width:36px; height:36px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:600;">MK</div>
                <span class="user-name">User Name</span>
                <i class="fa-solid fa-chevron-down" style="font-size:0.8rem;"></i>
            </button>
            <div class="dropdown-menu" id="profile-dropdown" style="display:none; position:absolute; top:100%; right:0; background:var(--surface); border:1px solid var(--border); border-radius:var(--radius-md); box-shadow:var(--soft-shadow); padding:8px 0; min-width:200px; margin-top:16px;">
                <a href="/dashboard" data-link class="dropdown-item" style="display:block; padding:8px 16px; color:var(--text); text-decoration:none;">Dashboard</a>
                <a href="/profile" data-link class="dropdown-item" style="display:block; padding:8px 16px; color:var(--text); text-decoration:none;">My Profile</a>
                <a href="/plans" data-link class="dropdown-item" style="display:block; padding:8px 16px; color:var(--text); text-decoration:none;">My Plan</a>
                <a href="/usage" data-link class="dropdown-item" style="display:block; padding:8px 16px; color:var(--text); text-decoration:none;">Usage</a>
                <a href="/history" data-link class="dropdown-item" style="display:block; padding:8px 16px; color:var(--text); text-decoration:none;">Scan History</a>
                <a href="/settings" data-link class="dropdown-item" style="display:block; padding:8px 16px; color:var(--text); text-decoration:none;">Settings</a>
                <a href="/security" data-link class="dropdown-item" style="display:block; padding:8px 16px; color:var(--text); text-decoration:none;">Security</a>
                <hr style="border:none; border-top:1px solid var(--border); margin:8px 0;">
                <a href="#" id="logout-btn" class="dropdown-item" style="display:block; padding:8px 16px; color:var(--danger); text-decoration:none;">Logout</a>
            </div>
        </div>
    `;

    return `
        <nav class="navbar" id="main-navbar">
            <div class="container navbar-container">
                <a href="${isLoggedIn ? '/dashboard' : '/'}" data-link class="navbar-brand">
                    <i class="fa-solid fa-microscope"></i> NEXORA ai
                </a>
                
                <button class="navbar-toggle" id="navbar-toggle" aria-label="Toggle navigation">
                    <i class="fa-solid fa-bars"></i>
                </button>
                
                <div class="navbar-collapse" id="navbar-collapse">
                    <ul class="navbar-menu" id="navbar-menu">
                        ${isLoggedIn ? loggedInMenu : loggedOutMenu}
                    </ul>
                    <div class="navbar-cta" style="display:flex; align-items:center; position:relative;">
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

    // Theme Toggle Logic
    if (themeToggle) {
        const updateThemeIcon = () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            themeToggle.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        };
        
        updateThemeIcon(); // init state
        
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
            const isVisible = profileDropdown.style.display === 'block';
            profileDropdown.style.display = isVisible ? 'none' : 'block';
        });

        document.addEventListener('click', (e) => {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.style.display = 'none';
            }
        });
    }

    // Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a real app we would call supabase.auth.signOut() here
            state.set('currentUser', null);
            state.set('session', null);
            // Assuming router is globally accessible or we dispatch an event
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new Event('popstate'));
            
            // Re-render navbar
            const appContainer = document.getElementById('app');
            // We need a better way to re-render the navbar, typically done via state subscribe.
            // But since this is a simple demo, a reload might suffice, or a custom event.
            window.location.reload(); 
        });
    }
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile toggle
    if (toggleBtn && navbarCollapse) {
        // Remove existing listeners by cloning
        const newToggleBtn = toggleBtn.cloneNode(true);
        toggleBtn.parentNode.replaceChild(newToggleBtn, toggleBtn);
        
        newToggleBtn.addEventListener('click', () => {
            navbarCollapse.classList.toggle('active');
            const icon = newToggleBtn.querySelector('i');
            if (navbarCollapse.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu on link click (mobile)
        const links = navbarCollapse.querySelectorAll('a[data-link]');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navbarCollapse.classList.remove('active');
                const icon = newToggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
}
