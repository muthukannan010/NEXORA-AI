// assets/js/components/VerifyEmail.js
import { resendVerification } from '../services/auth.js';
import { toast } from '../utils/toast.js';
import { state } from '../state.js';

export function VerifyEmail() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-left">
                <div class="auth-left-content">
                    <i class="fa-solid fa-microscope auth-brand-icon"></i>
                    <h1>NEXORA <span class="brand-ai">ai</span></h1>
                    <p>Almost there! Verify your email to access all features of your NEXORA ai account.</p>
                </div>
            </div>
            <div class="auth-right">
                <div class="auth-form-wrapper glass-card" style="text-align:center;">
                    <div class="auth-logo-mobile">
                        <i class="fa-solid fa-microscope"></i> NEXORA ai
                    </div>
                    
                    <div class="auth-icon-circle auth-icon-info" style="margin: 0 auto 24px;">
                        <i class="fa-regular fa-envelope"></i>
                    </div>
                    
                    <h2>Email Verification Required</h2>
                    <p>We sent a verification link to your email address.</p>
                    
                    <div class="verify-email-box" id="verify-email-display">
                        <i class="fa-solid fa-envelope-circle-check"></i>
                        <span id="user-email-display">your email</span>
                    </div>
                    
                    <p style="font-size: 0.9rem; color: var(--muted); margin-top: 0;">
                        Check your inbox and click the verification link. Also check your spam folder.
                    </p>

                    <div class="auth-disclaimer" style="margin: 20px 0; padding: 12px 16px; background: rgba(0,168,150,0.06); border-radius: var(--radius-md); font-size:0.85rem; color: var(--muted);">
                        <i class="fa-solid fa-circle-info"></i> 
                        The verification link will expire after 24 hours.
                    </div>

                    <button id="resend-verify-btn" class="btn btn-primary btn-full" style="margin-bottom: 12px;">
                        <i class="fa-solid fa-rotate-right"></i> Resend Verification Email
                    </button>
                    
                    <a href="/login" data-link class="btn btn-outline btn-full">
                        <i class="fa-solid fa-arrow-left"></i> Back to Login
                    </a>
                </div>
            </div>
        </div>
    `;
}

export function initVerifyEmail(router) {
    const user = state.get('currentUser');
    const emailDisplay = document.getElementById('user-email-display');
    const resendBtn = document.getElementById('resend-verify-btn');

    if (emailDisplay && user?.email) {
        emailDisplay.textContent = user.email;
    }

    if (resendBtn) {
        resendBtn.addEventListener('click', async () => {
            const email = user?.email;
            if (!email) {
                toast.error('No email address found. Please go back to login.');
                return;
            }

            const originalHTML = resendBtn.innerHTML;
            resendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            resendBtn.disabled = true;

            try {
                const { error } = await resendVerification(email);
                if (error) throw error;
                toast.success('Verification email resent! Please check your inbox.');
            } catch (err) {
                toast.error(err.message || 'Failed to resend verification email. Please try again.');
            } finally {
                resendBtn.innerHTML = originalHTML;
                resendBtn.disabled = false;
            }
        });
    }
}
