// assets/js/components/Dashboard.js
import { state } from '../state.js';
import { getDisplayName } from '../services/profile.js';
import { fetchScanHistory, getTotalScanCount, getMonthScanCount } from '../services/scans.js';
import { fetchCurrentUsage, getRemainingScans } from '../services/usage.js';
import { fetchUserSubscription, getPlanScanLimit, getPlanName } from '../services/plans.js';
import { getSignedUrl } from '../services/storage.js';
import { toast } from '../utils/toast.js';

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
}

function severityBadge(severity) {
    const map = { high: 'badge-high', medium: 'badge-medium', low: 'badge-low' };
    return `<span class="badge ${map[(severity || '').toLowerCase()] || 'badge-low'}">${severity || 'N/A'}</span>`;
}

export function Dashboard() {
    const user = state.get('currentUser');
    const profile = state.get('profile');
    const firstName = getDisplayName(profile, user);
    const greeting = getGreeting();

    return `
        <div class="container dashboard-container fade-in" style="padding-top: 100px; padding-bottom: 60px;">
            <div class="dashboard-header">
                <div>
                    <h1>${greeting}, ${firstName} 👋</h1>
                    <p>Here's your skin-health analysis overview.</p>
                </div>
                <a href="/analyzer" data-link class="btn btn-primary">
                    <i class="fa-solid fa-camera"></i> New Scan
                </a>
            </div>

            <div class="dashboard-stats-grid" id="stats-grid">
                <div class="stat-card skeleton-card">
                    <div class="stat-icon"><i class="fa-solid fa-chart-line"></i></div>
                    <div class="stat-details">
                        <h3>Total Scans</h3>
                        <div class="stat-value" id="stat-total"><span class="skeleton-text">--</span></div>
                    </div>
                </div>
                <div class="stat-card skeleton-card">
                    <div class="stat-icon"><i class="fa-regular fa-calendar-check"></i></div>
                    <div class="stat-details">
                        <h3>This Month</h3>
                        <div class="stat-value" id="stat-month"><span class="skeleton-text">--</span></div>
                    </div>
                </div>
                <div class="stat-card skeleton-card">
                    <div class="stat-icon"><i class="fa-solid fa-bolt"></i></div>
                    <div class="stat-details">
                        <h3>Remaining Scans</h3>
                        <div class="stat-value" id="stat-remaining"><span class="skeleton-text">--</span></div>
                    </div>
                </div>
                <div class="stat-card skeleton-card">
                    <div class="stat-icon"><i class="fa-solid fa-star"></i></div>
                    <div class="stat-details">
                        <h3>Current Plan</h3>
                        <div class="stat-value" id="stat-plan"><span class="skeleton-text">--</span></div>
                    </div>
                </div>
            </div>

            <h2 class="dashboard-section-title">Quick Actions</h2>
            <div class="quick-actions-grid">
                <a href="/analyzer" data-link class="action-card">
                    <i class="fa-solid fa-camera"></i>
                    <span>Start New Scan</span>
                </a>
                <a href="/history" data-link class="action-card">
                    <i class="fa-solid fa-clock-rotate-left"></i>
                    <span>View History</span>
                </a>
                <a href="/usage" data-link class="action-card">
                    <i class="fa-solid fa-chart-pie"></i>
                    <span>View Usage</span>
                </a>
                <a href="/profile" data-link class="action-card">
                    <i class="fa-solid fa-user"></i>
                    <span>My Profile</span>
                </a>
            </div>

            <h2 class="dashboard-section-title">Recent Analysis</h2>
            <div id="recent-scans-container">
                <div class="loading-state">
                    <i class="fa-solid fa-spinner fa-spin"></i> Loading recent scans...
                </div>
            </div>
        </div>
    `;
}

export async function initDashboard(router) {
    const user = state.get('currentUser');
    if (!user) {
        router.navigateTo('/login');
        return;
    }

    // Load stats and recent scans in parallel
    try {
        const [totalCount, monthCount, usageResult, subResult, historyResult] = await Promise.allSettled([
            getTotalScanCount(),
            getMonthScanCount(),
            fetchCurrentUsage(),
            fetchUserSubscription(),
            fetchScanHistory({ limit: 5 })
        ]);

        // Update stat cards
        const total = totalCount.status === 'fulfilled' ? totalCount.value : 0;
        const month = monthCount.status === 'fulfilled' ? monthCount.value : 0;
        const usage = usageResult.status === 'fulfilled' ? usageResult.value.usage : null;
        const limit = getPlanScanLimit();
        const remaining = getRemainingScans(usage, limit);
        const planName = getPlanName();

        const statEl = (id, val) => {
            const el = document.getElementById(id);
            if (el) { el.innerHTML = val; el.closest('.stat-card')?.classList.remove('skeleton-card'); }
        };

        statEl('stat-total', String(total));
        statEl('stat-month', String(month));
        statEl('stat-remaining', String(remaining));
        statEl('stat-plan', `<span style="font-size:1rem; color:var(--primary);">${planName}</span>`);

        // Render recent scans
        const scans = historyResult.status === 'fulfilled' ? historyResult.value.scans : [];
        renderRecentScans(scans, router);
    } catch (err) {
        console.error('Dashboard load error:', err);
        toast.error('Unable to load some dashboard data.');
    }
}

async function renderRecentScans(scans, router) {
    const container = document.getElementById('recent-scans-container');
    if (!container) return;

    if (!scans || scans.length === 0) {
        container.innerHTML = `
            <div class="empty-state glass-card">
                <i class="fa-regular fa-image empty-icon"></i>
                <h3>No skin analyses yet</h3>
                <p>Upload a skin image to get started with your first AI analysis.</p>
                <a href="/analyzer" data-link class="btn btn-primary">
                    <i class="fa-solid fa-camera"></i> Start Your First Scan
                </a>
            </div>`;
        return;
    }

    let rows = '';
    for (const scan of scans) {
        let imgSrc = 'https://via.placeholder.com/60x60?text=Scan';
        if (scan.image_url) {
            try {
                const { url } = await getSignedUrl(scan.image_url);
                if (url) imgSrc = url;
            } catch { /* use placeholder */ }
        }

        const date = new Date(scan.created_at).toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        rows += `
            <tr>
                <td data-label="Image"><img src="${imgSrc}" alt="Scan" class="scan-img-thumb" loading="lazy"></td>
                <td data-label="Condition"><strong>${scan.prediction || 'Unknown'}</strong></td>
                <td data-label="Date">${date}</td>
                <td data-label="Confidence">${scan.confidence ? scan.confidence.toFixed(1) + '%' : 'N/A'}</td>
                <td data-label="Severity">${severityBadge(scan.severity)}</td>
                <td data-label="Action">
                    <div class="table-actions">
                        <a href="/history/${scan.id}" data-link class="btn-icon-small" title="View"><i class="fa-regular fa-eye"></i></a>
                        <button class="btn-icon-small delete" title="Delete" data-scan-id="${scan.id}"><i class="fa-regular fa-trash-can"></i></button>
                    </div>
                </td>
            </tr>`;
    }

    container.innerHTML = `
        <div class="table-responsive glass-card" style="padding:0;">
            <table class="scan-table">
                <thead>
                    <tr>
                        <th>Image</th><th>Condition</th><th>Date</th>
                        <th>Confidence</th><th>Severity</th><th>Action</th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
        <div style="text-align:center; margin-top:16px;">
            <a href="/history" data-link class="btn btn-outline">View All History</a>
        </div>`;

    // Bind delete buttons
    container.querySelectorAll('.delete[data-scan-id]').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!confirm('Delete this scan?')) return;
            const { deleteScan } = await import('../services/scans.js');
            const { error } = await deleteScan(btn.dataset.scanId);
            if (error) { toast.error('Failed to delete scan.'); return; }
            toast.success('Scan deleted.');
            btn.closest('tr')?.remove();
        });
    });
}
