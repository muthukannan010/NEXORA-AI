// assets/js/components/Register.js
import { supabase } from '../services/supabase.js';
import { state } from '../state.js';

export function Register() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-left">
                <div class="auth-left-content">
                    <h1>NEXORA ai</h1>
                    <p>Join us to unlock AI-Powered Skin Health Analysis. Keep track of your skin health journey with a secure account.</p>
                </div>
            </div>
            <div class="auth-right">
                <div class="auth-form-wrapper glass-card">
                    <h2>Create Your Account</h2>
                    <p>Sign up to get started</p>
                    
                    <form id="register-form">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                            <div class="form-group">
                                <label for="first-name">First Name</label>
                                <input type="text" id="first-name" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label for="last-name">Last Name</label>
                                <input type="text" id="last-name" class="form-control" required>
                            </div>
                        </div>
                        
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
                            <small class="text-muted" style="font-size: 0.8rem; margin-top: 4px; display: block;">Must be at least 8 characters.</small>
                        </div>

                        <div class="form-group">
                            <label for="confirm-password">Confirm Password</label>
                            <div class="password-input">
                                <input type="password" id="confirm-password" class="form-control" placeholder="••••••••" required>
                            </div>
                        </div>
                        
                        <div class="auth-options">
                            <label class="checkbox-label" style="align-items: flex-start;">
                                <input type="checkbox" id="terms" required style="margin-top: 4px;">
                                <span style="line-height: 1.4;">I agree to the <a href="/terms" data-link>Terms of Service</a> and <a href="/privacy" data-link>Privacy Policy</a></span>
                            </label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;" id="register-btn">
                            Create Account <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                    
                    <div class="auth-divider">
                        <span>OR</span>
                    </div>
                    
                    <button class="btn btn-google" id="google-register-btn">
                        <i class="fa-brands fa-google" style="color: #DB4437; margin-right: 8px;"></i> Continue with Google
                    </button>
                    
                    <div class="auth-footer">
                        Already have an account? <a href="/login" data-link>Login here</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initRegister(router) {
    const registerForm = document.getElementById('register-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const registerBtn = document.getElementById('register-btn');
    const googleBtn = document.getElementById('google-register-btn');

    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            confirmPasswordInput.setAttribute('type', type);
            togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fa-regular fa-eye"></i>' : '<i class="fa-regular fa-eye-slash"></i>';
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;
            
            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            if (password.length < 8) {
                alert("Password must be at least 8 characters long.");
                return;
            }
            
            const originalText = registerBtn.innerHTML;
            registerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating...';
            registerBtn.disabled = true;

            try {
                if (typeof supabase !== 'undefined' && supabase.auth) {
                    const { data, error } = await supabase.auth.signUp({ 
                        email, 
                        password,
                        options: {
                            data: {
                                first_name: document.getElementById('first-name').value,
                                last_name: document.getElementById('last-name').value
                            }
                        }
                    });
                    if (error) throw error;
                    
                    // Show success & redirect to verify
                    router.navigateTo('/verify-email');
                } else {
                    // Mock success
                    setTimeout(() => {
                        router.navigateTo('/verify-email');
                    }, 1000);
                }
            } catch (err) {
                console.error('Auth error', err);
                alert(err.message || 'Registration failed');
            } finally {
                registerBtn.innerHTML = originalText;
                registerBtn.disabled = false;
            }
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            alert('Google signup coming soon.');
        });
    }
}
