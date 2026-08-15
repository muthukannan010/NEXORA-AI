// assets/js/components/Notifications.js

export function Notifications() {
    return `
        <div class="section fade-in" style="padding-top: 100px; min-height: calc(100vh - 76px);">
            <div class="container" style="max-width: 800px; margin: 0 auto;">
                
                <div class="profile-card slide-up">
                    <div class="profile-header" style="border-bottom: none; padding-bottom: 0; justify-content: space-between;">
                        <div class="profile-title">
                            <h2>Notifications</h2>
                            <p>Stay updated on your account and analysis results.</p>
                        </div>
                        <button class="btn btn-outline" style="font-size: 0.9rem; padding: 8px 16px;">Mark all as read</button>
                    </div>
                    
                    <div style="margin-top: 24px;">
                        <!-- Unread Notification -->
                        <div class="glass-card" style="padding: 16px; margin-bottom: 16px; border-left: 4px solid var(--primary); background: rgba(0, 168, 150, 0.05); display: flex; gap: 16px; align-items: flex-start;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fa-solid fa-brain"></i>
                            </div>
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                    <h4 style="font-size: 1rem; color: var(--text);">Analysis #123 Complete</h4>
                                    <span style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">Just now</span>
                                </div>
                                <p style="font-size: 0.9rem; color: var(--muted); margin-bottom: 8px;">Your recent skin analysis has been processed successfully. Click here to view the detailed report.</p>
                                <a href="/history/1" data-link style="font-size: 0.9rem; font-weight: 500; color: var(--primary); text-decoration: none;">View Report &rarr;</a>
                            </div>
                        </div>

                        <!-- Read Notification -->
                        <div class="glass-card" style="padding: 16px; margin-bottom: 16px; display: flex; gap: 16px; align-items: flex-start;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--border); color: var(--muted); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fa-solid fa-credit-card"></i>
                            </div>
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                    <h4 style="font-size: 1rem; color: var(--text);">Subscription renewing soon</h4>
                                    <span style="font-size: 0.8rem; color: var(--muted);">2 days ago</span>
                                </div>
                                <p style="font-size: 0.9rem; color: var(--muted); margin-bottom: 8px;">Your Pro subscription will renew on Sep 14, 2026. No action is required.</p>
                            </div>
                        </div>

                        <!-- Read Notification -->
                        <div class="glass-card" style="padding: 16px; display: flex; gap: 16px; align-items: flex-start;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--border); color: var(--muted); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                <i class="fa-solid fa-shield-halved"></i>
                            </div>
                            <div style="flex: 1;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                                    <h4 style="font-size: 1rem; color: var(--text);">Welcome to NEXORA ai</h4>
                                    <span style="font-size: 0.8rem; color: var(--muted);">1 week ago</span>
                                </div>
                                <p style="font-size: 0.9rem; color: var(--muted); margin-bottom: 8px;">Thanks for joining us! We're excited to help you on your skin health journey.</p>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    `;
}

export function initNotifications(router) {
    // Initialization logic for notifications
}
