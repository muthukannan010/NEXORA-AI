// assets/js/components/Dashboard.js
import { state } from '../state.js';

export function Dashboard() {
    const user = state.get('currentUser') || { user_metadata: { first_name: 'User' } };
    const firstName = user.user_metadata?.first_name || 'User';

    return `
        <div class="container dashboard-container fade-in">
            <div class="dashboard-header">
                <h1>Good morning, ${firstName} 👋</h1>
                <p>Here's your skin-health analysis overview.</p>
            </div>

            <div class="dashboard-stats-grid">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-chart-line"></i></div>
                    <div class="stat-details">
                        <h3>Total Scans</h3>
                        <div class="stat-value">12</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-regular fa-calendar-check"></i></div>
                    <div class="stat-details">
                        <h3>This Month</h3>
                        <div class="stat-value">5</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-bolt"></i></div>
                    <div class="stat-details">
                        <h3>Remaining Scans</h3>
                        <div class="stat-value">15</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fa-solid fa-percent"></i></div>
                    <div class="stat-details">
                        <h3>Average Confidence</h3>
                        <div class="stat-value">91%</div>
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
            <div class="table-responsive">
                <table class="scan-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Condition</th>
                            <th>Date</th>
                            <th>Confidence</th>
                            <th>Severity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td data-label="Image"><img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=100&q=80" alt="Scan" class="scan-img-thumb"></td>
                            <td data-label="Condition">Acne</td>
                            <td data-label="Date">Aug 14, 2026</td>
                            <td data-label="Confidence">92%</td>
                            <td data-label="Severity"><span class="badge badge-medium">Medium</span></td>
                            <td data-label="Action">
                                <div class="table-actions">
                                    <button class="btn-icon-small" title="View"><i class="fa-regular fa-eye"></i></button>
                                    <button class="btn-icon-small" title="Download"><i class="fa-solid fa-download"></i></button>
                                    <button class="btn-icon-small delete" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-label="Image"><img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=100&q=80" alt="Scan" class="scan-img-thumb"></td>
                            <td data-label="Condition">Eczema</td>
                            <td data-label="Date">Aug 12, 2026</td>
                            <td data-label="Confidence">87%</td>
                            <td data-label="Severity"><span class="badge badge-medium">Medium</span></td>
                            <td data-label="Action">
                                <div class="table-actions">
                                    <button class="btn-icon-small" title="View"><i class="fa-regular fa-eye"></i></button>
                                    <button class="btn-icon-small" title="Download"><i class="fa-solid fa-download"></i></button>
                                    <button class="btn-icon-small delete" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td data-label="Image"><img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=100&q=80" alt="Scan" class="scan-img-thumb"></td>
                            <td data-label="Condition">Clear Skin</td>
                            <td data-label="Date">Aug 10, 2026</td>
                            <td data-label="Confidence">94%</td>
                            <td data-label="Severity"><span class="badge badge-low">Low</span></td>
                            <td data-label="Action">
                                <div class="table-actions">
                                    <button class="btn-icon-small" title="View"><i class="fa-regular fa-eye"></i></button>
                                    <button class="btn-icon-small" title="Download"><i class="fa-solid fa-download"></i></button>
                                    <button class="btn-icon-small delete" title="Delete"><i class="fa-regular fa-trash-can"></i></button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

export function initDashboard(router) {
    if (!state.get('currentUser')) {
        router.navigateTo('/login');
        return;
    }
    // Logic for view, download, delete buttons would go here.
}
