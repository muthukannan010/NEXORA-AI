// assets/js/components/Security.js

export function Security() {
    return `
        <div class="section fade-in" style="padding-top: 100px; min-height: calc(100vh - 76px);">
            <div class="container" style="max-width: 800px; margin: 0 auto;">
                
                <div class="profile-card slide-up">
                    <div class="profile-header" style="border-bottom: none; padding-bottom: 0;">
                        <div class="profile-title">
                            <h2>Security</h2>
                            <p>Update your password and secure your account.</p>
                        </div>
                    </div>
                    
                    <form id="security-form" style="margin-top: 24px;">
                        
                        <div class="glass-card" style="margin-bottom: 24px;">
                            <div class="form-group" style="margin-bottom: 20px;">
                                <label for="current-password">Current Password</label>
                                <input type="password" id="current-password" class="form-control" required>
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 20px;">
                                <label for="new-password">New Password</label>
                                <input type="password" id="new-password" class="form-control" required>
                                <small class="text-muted" style="font-size: 0.8rem; margin-top: 4px; display: block;">Must be at least 8 characters long.</small>
                            </div>

                            <div class="form-group">
                                <label for="confirm-password">Confirm New Password</label>
                                <input type="password" id="confirm-password" class="form-control" required>
                            </div>
                        </div>

                        <div class="profile-actions">
                            <button type="submit" class="btn btn-primary" id="update-password-btn">Update Password</button>
                        </div>
                    </form>

                </div>
                
            </div>
        </div>
    `;
}

export function initSecurity(router) {
    const form = document.getElementById('security-form');
    const updateBtn = document.getElementById('update-password-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (newPassword !== confirmPassword) {
                alert('New passwords do not match.');
                return;
            }
            
            if (newPassword.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }

            const originalText = updateBtn.innerHTML;
            updateBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Updating...';
            updateBtn.disabled = true;

            setTimeout(() => {
                alert('Password updated successfully!');
                updateBtn.innerHTML = originalText;
                updateBtn.disabled = false;
                form.reset();
            }, 800);
        });
    }
}
