// assets/js/components/ForgotPassword.js
import { resetPassword } from '../services/auth.js';
import { toast } from '../utils/toast.js';
import { isValidEmail } from '../utils/validation.js';

export function ForgotPassword() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-left">
                <div class="auth-left-content">
                    <i class="fa-solid fa-microscope auth-brand-icon"></i>
                    <h1>NEXORA <span class="brand-ai">ai</span></h1>
                    <p>Don't worry, we'll help you get back into your account securely. Check your email after submitting.</p>
                </div>
            </div>
            <div class="auth-right">
                <div class="auth-form-wrapper glass-card">
                    <div class="auth-logo-mobile">
                        <i class="fa-solid fa-microscope"></i> NEXORA ai
                    </div>

                    <div id="forgot-form-view">
                        <div class="auth-icon-header">
                            <div class="auth-icon-circle">
                                <i class="fa-solid fa-lock"></i>
                            </div>
                        </div>
                        <h2>Forgot Password?</h2>
                        <p class="auth-subtitle">Enter your email and we'll send you a reset link.</p>
                        
                        <form id="forgot-form" novalidate>
                            <div class="form-group">
                                <label for="forgot-email">Email Address</label>
                                <div class="input-icon-wrap">
                                    <i class="fa-regular fa-envelope input-icon"></i>
                                    <input type="email" id="forgot-email" class="form-control" placeholder="you@example.com" autocomplete="email" required>
                                </div>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-full" id="reset-btn">
                                Send Reset Link <i class="fa-solid fa-envelope"></i>
                            </button>
                        </form>
                    </div>

                    <div id="forgot-success-view" style="display:none; text-align:center;">
                        <div class="auth-icon-circle auth-icon-success" style="margin: 0 auto 24px;">
                            <i class="fa-solid fa-circle-check"></i>
                        </div>
                        <h2>Check Your Email</h2>
                        <p>We sent a password reset link to <strong id="sent-email"></strong>. Check your inbox (and spam folder).</p>
                        <p style="font-size:0.9rem; color:var(--muted);">Didn't receive it?</p>
                        <button id="resend-btn" class="btn btn-outline btn-full" style="margin-top:8px;">
                            <i class="fa-solid fa-rotate-right"></i> Resend Email
                        </button>
                    </div>

                    <div class="auth-footer" style="margin-top: 24px;">
                        Remembered your password? <a href="/login" data-link class="auth-link">Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initForgotPassword(router) {
    const forgotForm = document.getElementById('forgot-form');
    const resetBtn = document.getElementById('reset-btn');
    const formView = document.getElementById('forgot-form-view');
    const successView = document.getElementById('forgot-success-view');
    const sentEmailEl = document.getElementById('sent-email');
    const resendBtn = document.getElementById('resend-btn');
    let lastEmail = '';

    async function sendReset(email) {
        const originalHTML = resetBtn?.innerHTML;
        if (resetBtn) {
            resetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            resetBtn.disabled = true;
        }

        try {
            const { error } = await resetPassword(email);
            if (error) throw error;

            lastEmail = email;
            if (sentEmailEl) sentEmailEl.textContent = email;
            if (formView) formView.style.display = 'none';
            if (successView) successView.style.display = 'block';
            toast.success('Password reset link sent! Check your email.');
        } catch (err) {
            toast.error(err.message || 'Failed to send reset link. Please try again.');
            if (resetBtn) {
                resetBtn.innerHTML = originalHTML;
                resetBtn.disabled = false;
            }
        }
    }

    if (forgotForm) {
        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-email')?.value?.trim() || '';
            if (!isValidEmail(email)) {
                toast.error('Please enter a valid email address.');
                return;
            }
            await sendReset(email);
        });
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', async () => {
            if (!lastEmail) return;
            resendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Resending...';
            resendBtn.disabled = true;
            try {
                const { error } = await resetPassword(lastEmail);
                if (error) throw error;
                toast.success('Reset email resent successfully.');
            } catch (err) {
                toast.error('Failed to resend. Please try again.');
            } finally {
                resendBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Resend Email';
                resendBtn.disabled = false;
            }
        });
    }
}
