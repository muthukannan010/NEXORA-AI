// assets/js/components/Login.js
import { signIn } from '../services/auth.js';
import { toast } from '../utils/toast.js';
import { isValidEmail, getAuthErrorMessage, clearFormErrors } from '../utils/validation.js';
import { state } from '../state.js';
import { fetchProfile } from '../services/profile.js';

export function Login() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-left">
                <div class="auth-left-content">
                    <i class="fa-solid fa-microscope auth-brand-icon"></i>
                    <h1>NEXORA <span class="brand-ai">ai</span></h1>
                    <p>AI-Powered Skin Health Analysis. Upload a skin image or use your camera to receive AI-based informational insights about your skin.</p>
                    <div class="auth-features">
                        <div class="auth-feature-item"><i class="fa-solid fa-check"></i> AI Skin Analysis</div>
                        <div class="auth-feature-item"><i class="fa-solid fa-check"></i> Secure & Private</div>
                        <div class="auth-feature-item"><i class="fa-solid fa-check"></i> Scan History</div>
                    </div>
                </div>
            </div>
            <div class="auth-right">
                <div class="auth-form-wrapper glass-card">
                    <div class="auth-logo-mobile">
                        <i class="fa-solid fa-microscope"></i> NEXORA ai
                    </div>
                    <h2>Welcome Back</h2>
                    <p class="auth-subtitle">Sign in to your account to continue</p>
                    
                    <div id="auth-error-banner" class="auth-error-banner" style="display:none;"></div>
                    
                    <form id="login-form" novalidate>
                        <div class="form-group">
                            <label for="login-email">Email Address</label>
                            <div class="input-icon-wrap">
                                <i class="fa-regular fa-envelope input-icon"></i>
                                <input type="email" id="login-email" class="form-control" placeholder="you@example.com" autocomplete="email" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="login-password">Password</label>
                            <div class="password-input">
                                <div class="input-icon-wrap">
                                    <i class="fa-solid fa-lock input-icon"></i>
                                    <input type="password" id="login-password" class="form-control" placeholder="••••••••" autocomplete="current-password" required>
                                </div>
                                <button type="button" class="password-toggle" id="toggle-password" aria-label="Toggle Password Visibility">
                                    <i class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                        </div>
                        
                        <div class="auth-options">
                            <label class="checkbox-label">
                                <input type="checkbox" id="remember">
                                Remember me
                            </label>
                            <a href="/forgot-password" data-link class="forgot-link">Forgot Password?</a>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-full" id="login-btn">
                            Login <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                    
                    <div class="auth-divider"><span>OR</span></div>
                    
                    <button class="btn btn-google btn-full" id="google-login-btn" disabled title="Google login coming soon">
                        <i class="fa-brands fa-google" style="color: #DB4437; margin-right: 8px;"></i> Continue with Google
                        <span class="coming-soon-badge">Soon</span>
                    </button>
                    
                    <div class="auth-footer">
                        Don't have an account? <a href="/register" data-link class="auth-link">Create Account</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initLogin(router) {
    // If already logged in, go to dashboard
    if (state.get('currentUser')) {
        const redirect = sessionStorage.getItem('auth_redirect') || '/dashboard';
        sessionStorage.removeItem('auth_redirect');
        router.navigateTo(redirect);
        return;
    }

    const loginForm = document.getElementById('login-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('login-password');
    const emailInput = document.getElementById('login-email');
    const loginBtn = document.getElementById('login-btn');
    const errorBanner = document.getElementById('auth-error-banner');

    function showError(msg) {
        if (errorBanner) {
            errorBanner.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${msg}`;
            errorBanner.style.display = 'flex';
        }
    }
    function hideError() {
        if (errorBanner) errorBanner.style.display = 'none';
    }

    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.querySelector('i').className = isPassword
                ? 'fa-regular fa-eye-slash'
                : 'fa-regular fa-eye';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideError();
            clearFormErrors(loginForm);

            const email = emailInput?.value?.trim() || '';
            const password = passwordInput?.value || '';

            if (!email || !isValidEmail(email)) {
                showError('Please enter a valid email address.');
                emailInput?.focus();
                return;
            }
            if (!password) {
                showError('Please enter your password.');
                passwordInput?.focus();
                return;
            }

            const originalHTML = loginBtn.innerHTML;
            loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;

            try {
                const { data, error } = await signIn(email, password);
                if (error) throw error;

                // Check email verified
                if (!data.user.email_confirmed_at) {
                    toast.warning('Please verify your email address first.');
                    router.navigateTo('/verify-email');
                    return;
                }

                // Fetch profile after login
                await fetchProfile().catch(() => {});

                toast.success('Welcome back!');
                const redirect = sessionStorage.getItem('auth_redirect') || '/dashboard';
                sessionStorage.removeItem('auth_redirect');
                router.navigateTo(redirect);
            } catch (err) {
                const msg = getAuthErrorMessage(err);
                showError(msg);
                if (msg.toLowerCase().includes('verify')) {
                    router.navigateTo('/verify-email');
                }
            } finally {
                loginBtn.innerHTML = originalHTML;
                loginBtn.disabled = false;
            }
        });
    }
}
