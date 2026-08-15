// assets/js/components/VerifyEmail.js

export function VerifyEmail() {
    return `
        <div class="auth-container fade-in" style="align-items: center; justify-content: center; min-height: calc(100vh - 76px); background: var(--background);">
            <div class="auth-form-wrapper glass-card" style="text-align: center;">
                <div style="font-size: 3rem; color: var(--primary); margin-bottom: 16px;">
                    <i class="fa-regular fa-envelope"></i>
                </div>
                <h2>Email Verification Required</h2>
                <p>We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.</p>
                
                <div style="margin: 32px 0;">
                    <button class="btn btn-outline" id="resend-btn" style="width: 100%; margin-bottom: 16px;">
                        Resend Verification Email
                    </button>
                    <a href="/login" data-link class="btn btn-primary" style="width: 100%;">
                        Back to Login
                    </a>
                </div>
            </div>
        </div>
    `;
}

export function initVerifyEmail(router) {
    const resendBtn = document.getElementById('resend-btn');
    
    if (resendBtn) {
        let countdown = 0;
        resendBtn.addEventListener('click', () => {
            if (countdown > 0) return;
            
            // Mock resend logic
            console.log("Resend email clicked");
            
            countdown = 60;
            resendBtn.disabled = true;
            
            const timer = setInterval(() => {
                countdown--;
                resendBtn.innerHTML = `Resend in ${countdown}s`;
                
                if (countdown <= 0) {
                    clearInterval(timer);
                    resendBtn.disabled = false;
                    resendBtn.innerHTML = 'Resend Verification Email';
                }
            }, 1000);
        });
    }
}
