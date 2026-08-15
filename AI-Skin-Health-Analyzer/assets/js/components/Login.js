// assets/js/components/Login.js
import { supabase } from '../services/supabase.js';
import { state } from '../state.js';

export function Login() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-left">
                <div class="auth-left-content">
                    <h1>NEXORA ai</h1>
                    <p>AI-Powered Skin Health Analysis. Upload a skin image or use your camera to receive AI-based informational insights about your skin.</p>
                </div>
            </div>
            <div class="auth-right">
                <div class="auth-form-wrapper glass-card">
                    <h2>Welcome Back</h2>
                    <p>Sign in to your account to continue</p>
                    
                    <form id="login-form">
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" class="form-control" placeholder="you@example.com" required>
                        </div>
                        
                        <div class="form-group">
                            <label for="password">Password</label>
                            <div class="password-input">
                                <input type="password" id="password" class="form-control" placeholder="••••••••" required>
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
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;" id="login-btn">
                            Login <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                    
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    
                    <button class="btn btn-google" id="google-login-btn">
                        <i class="fa-brands fa-google" style="color: #DB4437; margin-right: 8px;"></i> Continue with Google
                    </button>
                    
                    <div class="auth-footer">
                        Don't have an account? <a href="/register" data-link>Create Account</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initLogin(router) {
    const loginForm = document.getElementById('login-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const googleLoginBtn = document.getElementById('google-login-btn');

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            
            // Basic UI loading state
            const originalText = loginBtn.innerHTML;
            loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';
            loginBtn.disabled = true;

            try {
                // Mock Auth flow for demo. Replace with real Supabase later if keys provided.
                if (typeof supabase !== 'undefined' && supabase.auth) {
                    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    
                    state.set('currentUser', data.user);
                    state.set('session', data.session);
                    
                    // Show success toast (need to implement Toast system later)
                    console.log("Success: Profile authenticated");
                    router.navigateTo('/dashboard');
                } else {
                    // Mock success
                    setTimeout(() => {
                        state.set('currentUser', { id: '123', email });
                        router.navigateTo('/dashboard');
                    }, 1000);
                }
            } catch (err) {
                console.error('Auth error', err);
                alert(err.message || 'Invalid email or password');
            } finally {
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }
        });
    }

    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            alert('Google login coming soon.');
        });
    }
}
