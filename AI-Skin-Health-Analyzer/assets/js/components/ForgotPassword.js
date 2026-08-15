// assets/js/components/ForgotPassword.js
import { supabase } from '../services/supabase.js';

export function ForgotPassword() {
    return `
        <div class="auth-container fade-in">
            <div class="auth-left">
                <div class="auth-left-content">
                    <h1>NEXORA ai</h1>
                    <p>Don't worry, we'll help you get back into your account securely.</p>
                </div>
            </div>
            <div class="auth-right">
                <div class="auth-form-wrapper glass-card">
                    <h2>Forgot Password?</h2>
                    <p>Enter your email and we'll send you a reset link.</p>
                    
                    <form id="forgot-form">
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" class="form-control" placeholder="you@example.com" required>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;" id="reset-btn">
                            Send Reset Link <i class="fa-solid fa-envelope"></i>
                        </button>
                    </form>
                    
                    <div id="reset-success" style="display:none; margin-top: 24px; padding: 16px; background: rgba(34, 197, 94, 0.1); border-left: 4px solid var(--success); border-radius: 4px;">
                        <h4 style="color: var(--success); margin-bottom: 4px;"><i class="fa-solid fa-circle-check"></i> Reset link sent!</h4>
                        <p style="font-size: 0.9rem; margin-bottom: 0;">Please check your email for the reset link.</p>
                    </div>

                    <div class="auth-footer" style="margin-top: 32px;">
                        Remembered your password? <a href="/login" data-link>Back to Login</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initForgotPassword(router) {
    const forgotForm = document.getElementById('forgot-form');
    const resetBtn = document.getElementById('reset-btn');
    const successMsg = document.getElementById('reset-success');

    if (forgotForm) {
        forgotForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            
            const originalText = resetBtn.innerHTML;
            resetBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            resetBtn.disabled = true;

            try {
                if (typeof supabase !== 'undefined' && supabase.auth) {
                    const { error } = await supabase.auth.resetPasswordForEmail(email);
                    if (error) throw error;
                    
                    forgotForm.style.display = 'none';
                    successMsg.style.display = 'block';
                } else {
                    // Mock success
                    setTimeout(() => {
                        forgotForm.style.display = 'none';
                        successMsg.style.display = 'block';
                    }, 1000);
                }
            } catch (err) {
                console.error('Auth error', err);
                alert(err.message || 'Failed to send reset link');
                resetBtn.innerHTML = originalText;
                resetBtn.disabled = false;
            }
        });
    }
}
