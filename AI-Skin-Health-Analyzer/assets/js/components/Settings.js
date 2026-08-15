// assets/js/components/Settings.js

export function Settings() {
    return `
        <div class="section fade-in" style="padding-top: 100px; min-height: calc(100vh - 76px);">
            <div class="container" style="max-width: 800px; margin: 0 auto;">
                
                <div class="profile-card slide-up">
                    <div class="profile-header" style="border-bottom: none; padding-bottom: 0;">
                        <div class="profile-title">
                            <h2>Settings</h2>
                            <p>Manage your account preferences and data.</p>
                        </div>
                    </div>
                    
                    <form id="settings-form" style="margin-top: 24px;">
                        
                        <!-- Account Preferences -->
                        <div class="glass-card" style="margin-bottom: 24px;">
                            <h3 style="margin-bottom: 16px; font-size: 1.25rem;">Account Preferences</h3>
                            
                            <div class="form-group" style="margin-bottom: 16px;">
                                <label class="checkbox-label" style="align-items: center;">
                                    <input type="checkbox" checked>
                                    <span>Receive email notifications for new analysis results</span>
                                </label>
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 16px;">
                                <label class="checkbox-label" style="align-items: center;">
                                    <input type="checkbox" checked>
                                    <span>Receive promotional emails and updates</span>
                                </label>
                            </div>

                            <div class="form-group">
                                <label for="theme-select">App Theme</label>
                                <select id="theme-select" class="form-control" style="width: 100%; max-width: 300px;">
                                    <option value="system">System Default</option>
                                    <option value="light" selected>Light Mode</option>
                                    <option value="dark">Dark Mode</option>
                                </select>
                            </div>
                        </div>

                        <!-- Data Management -->
                        <div class="glass-card" style="margin-bottom: 24px;">
                            <h3 style="margin-bottom: 16px; font-size: 1.25rem;">Data Management</h3>
                            <p style="font-size: 0.9rem; color: var(--muted); margin-bottom: 16px;">Download a copy of your personal data and analysis history.</p>
                            <button type="button" class="btn btn-outline"><i class="fa-solid fa-download"></i> Download My Data</button>
                        </div>

                        <div class="profile-actions" style="margin-bottom: 32px;">
                            <button type="submit" class="btn btn-primary">Save Settings</button>
                        </div>
                    </form>

                    <!-- Delete Account -->
                    <div class="glass-card" style="border-color: var(--danger);">
                        <h3 style="margin-bottom: 8px; font-size: 1.25rem; color: var(--danger);">Delete Account</h3>
                        <p style="font-size: 0.9rem; color: var(--muted); margin-bottom: 16px;">Once you delete your account, there is no going back. Please be certain.</p>
                        <button type="button" class="btn btn-outline" style="color: var(--danger); border-color: var(--danger);">Delete Account</button>
                    </div>

                </div>
                
            </div>
        </div>
    `;
}

export function initSettings(router) {
    const form = document.getElementById('settings-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Settings saved successfully!');
        });
    }
}
