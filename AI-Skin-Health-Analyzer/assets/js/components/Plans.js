// assets/js/components/Plans.js

export function Plans() {
    return `
        <div class="section fade-in" style="padding-top: 100px; min-height: calc(100vh - 76px);">
            <div class="container text-center">
                <header class="section-header slide-up">
                    <h1 class="section-title">Upgrade Your Plan</h1>
                    <p class="section-subtitle">Choose the perfect plan for your skin health journey.</p>
                </header>

                <div class="pricing-grid slide-up" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px; margin-top: 48px;">
                    
                    <!-- Free Plan -->
                    <div class="glass-card pricing-card" style="padding: 40px 32px; position: relative;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 16px;">Free</h3>
                        <div class="price" style="font-size: 2.5rem; font-weight: 700; color: var(--text); margin-bottom: 24px;">$0<span style="font-size: 1rem; color: var(--muted); font-weight: 400;">/mo</span></div>
                        <p style="color: var(--muted); margin-bottom: 32px; min-height: 48px;">Basic AI analysis for occasional use.</p>
                        
                        <ul style="list-style: none; padding: 0; margin-bottom: 40px; text-align: left;">
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> 10 Scans per month</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> Basic analysis reports</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> 30-day history retention</li>
                            <li style="margin-bottom: 16px; color: var(--muted);"><i class="fa-solid fa-xmark" style="margin-right: 12px;"></i> PDF report downloads</li>
                            <li style="margin-bottom: 16px; color: var(--muted);"><i class="fa-solid fa-xmark" style="margin-right: 12px;"></i> Priority processing</li>
                        </ul>
                        
                        <button class="btn btn-outline" style="width: 100%; cursor: default;" disabled>Current Plan</button>
                    </div>

                    <!-- Pro Plan -->
                    <div class="glass-card pricing-card" style="padding: 40px 32px; position: relative; border-color: var(--primary); transform: scale(1.05); z-index: 1;">
                        <div style="position: absolute; top: -16px; left: 50%; transform: translateX(-50%); background: var(--primary); color: white; padding: 6px 16px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">RECOMMENDED</div>
                        <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--primary);">Pro</h3>
                        <div class="price" style="font-size: 2.5rem; font-weight: 700; color: var(--text); margin-bottom: 24px;">$9<span style="font-size: 1rem; color: var(--muted); font-weight: 400;">.99/mo</span></div>
                        <p style="color: var(--muted); margin-bottom: 32px; min-height: 48px;">Comprehensive insights and tracking for proactive users.</p>
                        
                        <ul style="list-style: none; padding: 0; margin-bottom: 40px; text-align: left;">
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> 50 Scans per month</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> Detailed analysis reports</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> Unlimited history retention</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> PDF report downloads</li>
                            <li style="margin-bottom: 16px; color: var(--muted);"><i class="fa-solid fa-xmark" style="margin-right: 12px;"></i> Priority processing</li>
                        </ul>
                        
                        <button class="btn btn-primary" style="width: 100%;">Select Plan</button>
                    </div>

                    <!-- Premium Plan -->
                    <div class="glass-card pricing-card" style="padding: 40px 32px; position: relative;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 16px;">Premium</h3>
                        <div class="price" style="font-size: 2.5rem; font-weight: 700; color: var(--text); margin-bottom: 24px;">$19<span style="font-size: 1rem; color: var(--muted); font-weight: 400;">.99/mo</span></div>
                        <p style="color: var(--muted); margin-bottom: 32px; min-height: 48px;">Unlimited access for families or power users.</p>
                        
                        <ul style="list-style: none; padding: 0; margin-bottom: 40px; text-align: left;">
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> Unlimited Scans</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> Detailed analysis reports</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> Unlimited history retention</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> PDF report downloads</li>
                            <li style="margin-bottom: 16px;"><i class="fa-solid fa-check" style="color: var(--success); margin-right: 12px;"></i> Priority processing</li>
                        </ul>
                        
                        <button class="btn btn-outline" style="width: 100%;">Select Plan</button>
                    </div>

                </div>
            </div>
        </div>
    `;
}

export function initPlans(router) {
    // Initialization logic for plans
}
