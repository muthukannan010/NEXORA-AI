// assets/js/components/Usage.js

export function Usage() {
    return `
        <div class="section fade-in" style="padding-top: 100px; min-height: calc(100vh - 76px);">
            <div class="container" style="max-width: 800px; margin: 0 auto;">
                
                <div class="profile-card slide-up">
                    <div class="profile-header" style="border-bottom: none; padding-bottom: 0;">
                        <div class="profile-title">
                            <h2>Usage & Billing</h2>
                            <p>Manage your subscription and track your scan usage.</p>
                        </div>
                    </div>
                    
                    <div class="glass-card" style="margin-top: 24px; padding: 24px; background: rgba(0, 168, 150, 0.05); border-left: 4px solid var(--primary);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                            <div>
                                <h3 style="margin-bottom: 4px;">Current Plan</h3>
                                <div style="font-size: 1.5rem; font-weight: 700; color: var(--primary);">Free Tier</div>
                            </div>
                            <div style="text-align: right;">
                                <h3 style="margin-bottom: 4px;">Renewal Date</h3>
                                <div style="font-size: 1.1rem; color: var(--text);">Sep 14, 2026</div>
                            </div>
                        </div>
                        
                        <div style="margin-top: 32px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span style="font-weight: 500;">Scans Used</span>
                                <span style="font-weight: 500;">5 / 10</span>
                            </div>
                            <div class="progress-track" style="height: 12px; border-radius: 6px;">
                                <div class="progress-fill" style="width: 50%; border-radius: 6px;"></div>
                            </div>
                            <p style="font-size: 0.85rem; color: var(--muted); margin-top: 8px;">You have 5 scans remaining this billing cycle.</p>
                        </div>
                        
                        <div style="margin-top: 32px; display: flex; gap: 16px;">
                            <a href="/plans" data-link class="btn btn-primary"><i class="fa-solid fa-arrow-up-right-dots"></i> Upgrade Plan</a>
                            <button class="btn btn-outline">Manage Billing</button>
                        </div>
                    </div>

                    <div class="glass-card" style="margin-top: 24px;">
                        <h3 style="margin-bottom: 16px;">Billing History</h3>
                        <table style="width: 100%; border-collapse: collapse; text-align: left;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <th style="padding: 12px 0;">Date</th>
                                    <th style="padding: 12px 0;">Description</th>
                                    <th style="padding: 12px 0;">Amount</th>
                                    <th style="padding: 12px 0;">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="4" style="padding: 24px 0; text-align: center; color: var(--muted);">No billing history available on the Free tier.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    `;
}

export function initUsage(router) {
    // Initialization logic for usage
}
