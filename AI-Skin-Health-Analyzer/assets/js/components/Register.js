// assets/js/components/Register.js
import { signUp } from '../services/auth.js';
import { toast } from '../utils/toast.js';
import { isValidEmail, validatePassword, passwordsMatch, getAuthErrorMessage, clearFormErrors } from '../utils/validation.js';
import { state } from '../state.js';

export function Register() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-left">
                <div class="auth-left-content">
                    <i class="fa-solid fa-microscope auth-brand-icon"></i>
                    <h1>NEXORA <span class="brand-ai">ai</span></h1>
                    <p>Join us to unlock AI-Powered Skin Health Analysis. Keep track of your skin health journey with a secure account.</p>
                    <div class="auth-features">
                        <div class="auth-feature-item"><i class="fa-solid fa-check"></i> Free to get started</div>
                        <div class="auth-feature-item"><i class="fa-solid fa-check"></i> No credit card required</div>
                        <div class="auth-feature-item"><i class="fa-solid fa-check"></i> Your data stays private</div>
                    </div>
                </div>
            </div>
            <div class="auth-right">
                <div class="auth-form-wrapper glass-card">
                    <div class="auth-logo-mobile">
                        <i class="fa-solid fa-microscope"></i> NEXORA ai
                    </div>
                    <h2>Create Your Account</h2>
                    <p class="auth-subtitle">Sign up to get started — it's free</p>
                    
                    <div id="auth-error-banner" class="auth-error-banner" style="display:none;"></div>
                    
                    <form id="register-form" novalidate>
                        <div class="form-row-2">
                            <div class="form-group">
                                <label for="first-name">First Name</label>
                                <input type="text" id="first-name" class="form-control" placeholder="John" autocomplete="given-name" required>
                            </div>
                            <div class="form-group">
                                <label for="last-name">Last Name</label>
                                <input type="text" id="last-name" class="form-control" placeholder="Doe" autocomplete="family-name" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="reg-email">Email Address</label>
                            <div class="input-icon-wrap">
                                <i class="fa-regular fa-envelope input-icon"></i>
                                <input type="email" id="reg-email" class="form-control" placeholder="you@example.com" autocomplete="email" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="reg-password">Password</label>
                            <div class="password-input">
                                <div class="input-icon-wrap">
                                    <i class="fa-solid fa-lock input-icon"></i>
                                    <input type="password" id="reg-password" class="form-control" placeholder="Min. 8 characters" autocomplete="new-password" required>
                                </div>
                                <button type="button" class="password-toggle" id="toggle-password" aria-label="Toggle Password Visibility">
                                    <i class="fa-regular fa-eye"></i>
                                </button>
                            </div>
                            <div class="password-strength" id="password-strength" style="margin-top:8px; display:none;">
                                <div class="strength-bar">
                                    <div class="strength-fill" id="strength-fill"></div>
                                </div>
                                <span class="strength-label" id="strength-label"></span>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="confirm-password">Confirm Password</label>
                            <div class="input-icon-wrap">
                                <i class="fa-solid fa-lock input-icon"></i>
                                <input type="password" id="confirm-password" class="form-control" placeholder="••••••••" autocomplete="new-password" required>
                            </div>
                        </div>
                        
                        <div class="auth-options" style="margin-bottom: 20px;">
                            <label class="checkbox-label" style="align-items: flex-start;">
                                <input type="checkbox" id="terms" required style="margin-top: 3px;">
                                <span>I agree to the <a href="/terms" data-link class="auth-link">Terms of Service</a> and <a href="/privacy" data-link class="auth-link">Privacy Policy</a></span>
                            </label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary btn-full" id="register-btn">
                            Create Account <i class="fa-solid fa-arrow-right"></i>
                        </button>
                    </form>
                    
                    <div class="auth-divider"><span>OR</span></div>
                    
                    <button class="btn btn-google btn-full" disabled title="Google login coming soon">
                        <i class="fa-brands fa-google" style="color: #DB4437; margin-right: 8px;"></i> Continue with Google
                        <span class="coming-soon-badge">Soon</span>
                    </button>
                    
                    <div class="auth-footer">
                        Already have an account? <a href="/login" data-link class="auth-link">Login here</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initRegister(router) {
    if (state.get('currentUser')) {
        router.navigateTo('/dashboard');
        return;
    }

    const form = document.getElementById('register-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('reg-password');
    const confirmInput = document.getElementById('confirm-password');
    const registerBtn = document.getElementById('register-btn');
    const errorBanner = document.getElementById('auth-error-banner');
    const strengthEl = document.getElementById('password-strength');
    const strengthFill = document.getElementById('strength-fill');
    const strengthLabel = document.getElementById('strength-label');

    function showError(msg) {
        if (errorBanner) {
            errorBanner.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> ${msg}`;
            errorBanner.style.display = 'flex';
            errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
    function hideError() {
        if (errorBanner) errorBanner.style.display = 'none';
    }

    // Password toggle
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', () => {
            const isPassword = passwordInput.type === 'password';
            passwordInput.type = isPassword ? 'text' : 'password';
            confirmInput.type = isPassword ? 'text' : 'password';
            togglePasswordBtn.querySelector('i').className = isPassword
                ? 'fa-regular fa-eye-slash'
                : 'fa-regular fa-eye';
        });
    }

    // Password strength indicator
    if (passwordInput && strengthEl) {
        passwordInput.addEventListener('input', () => {
            const val = passwordInput.value;
            if (!val) { strengthEl.style.display = 'none'; return; }
            strengthEl.style.display = 'flex';

            let score = 0;
            if (val.length >= 8) score++;
            if (val.length >= 12) score++;
            if (/[A-Z]/.test(val)) score++;
            if (/[0-9]/.test(val)) score++;
            if (/[^a-zA-Z0-9]/.test(val)) score++;

            const levels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
            const colors = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e', '#00A896'];
            const pct = (score / 5) * 100;

            if (strengthFill) {
                strengthFill.style.width = `${pct}%`;
                strengthFill.style.background = colors[score] || '#ef4444';
            }
            if (strengthLabel) {
                strengthLabel.textContent = levels[score] || 'Weak';
                strengthLabel.style.color = colors[score] || '#ef4444';
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideError();
            clearFormErrors(form);

            const firstName = document.getElementById('first-name')?.value?.trim() || '';
            const lastName = document.getElementById('last-name')?.value?.trim() || '';
            const email = document.getElementById('reg-email')?.value?.trim() || '';
            const password = passwordInput?.value || '';
            const confirmPassword = confirmInput?.value || '';
            const termsChecked = document.getElementById('terms')?.checked;

            // Validate
            if (!firstName) { showError('Please enter your first name.'); return; }
            if (!lastName) { showError('Please enter your last name.'); return; }
            if (!isValidEmail(email)) { showError('Please enter a valid email address.'); return; }

            const pwValidation = validatePassword(password);
            if (!pwValidation.valid) { showError(pwValidation.message); return; }

            const matchValidation = passwordsMatch(password, confirmPassword);
            if (!matchValidation.valid) { showError(matchValidation.message); return; }

            if (!termsChecked) { showError('You must agree to the Terms & Privacy Policy to continue.'); return; }

            const originalHTML = registerBtn.innerHTML;
            registerBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating account...';
            registerBtn.disabled = true;

            try {
                const { data, error } = await signUp({ email, password, firstName, lastName });
                if (error) throw error;

                toast.success('Account created! Please check your email to verify your account.');
                router.navigateTo('/verify-email');
            } catch (err) {
                showError(getAuthErrorMessage(err));
            } finally {
                registerBtn.innerHTML = originalHTML;
                registerBtn.disabled = false;
            }
        });
    }
}
