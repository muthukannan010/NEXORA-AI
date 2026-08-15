// assets/js/components/history.js

export function History() {
    return `
        <div class="section pt-0" style="padding-top: 100px; min-height: calc(100vh - 100px);">
            <div class="container">
                <h1 class="section-title fade-in">Scan History</h1>
                <p class="section-subtitle slide-up">Review your past skin health analyses and track your progress over time.</p>

                <!-- Controls -->
                <div class="glass-card slide-up" style="display: flex; flex-wrap: wrap; gap: 1rem; margin-bottom: 2rem; padding: 1.5rem; align-items: center;">
                    <div style="flex: 1; min-width: 250px; position: relative;">
                        <i class="fa-solid fa-search" style="position: absolute; left: 15px; top: 50%; transform: translateY(-50%); color: var(--text-light);"></i>
                        <input type="text" id="search-input" placeholder="Search by disease name..." style="width: 100%; padding: 10px 15px 10px 40px; border: 1px solid #e5e7eb; border-radius: 8px; font-family: var(--font-family); font-size: 1rem;">
                    </div>
                    
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <select style="padding: 10px 15px; border: 1px solid #e5e7eb; border-radius: 8px; font-family: var(--font-family);">
                            <option value="all">All Dates</option>
                            <option value="today">Today</option>
                        </select>
                        <select id="severity-filter" style="padding: 10px 15px; border: 1px solid #e5e7eb; border-radius: 8px; font-family: var(--font-family);">
                            <option value="all">All Severities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                </div>

                <!-- Table -->
                <div class="glass-card slide-up" style="overflow-x: auto; padding: 0;">
                    <table style="width: 100%; border-collapse: collapse; min-width: 800px; text-align: left;">
                        <thead>
                            <tr style="background: rgba(0, 168, 150, 0.05); border-bottom: 1px solid #e5e7eb;">
                                <th style="padding: 1rem 1.5rem;">Image</th>
                                <th style="padding: 1rem 1.5rem;">Date & Time</th>
                                <th style="padding: 1rem 1.5rem;">Predicted Condition</th>
                                <th style="padding: 1rem 1.5rem;">Confidence</th>
                                <th style="padding: 1rem 1.5rem;">Severity</th>
                                <th style="padding: 1rem 1.5rem;">Actions</th>
                            </tr>
                        </thead>
                        <tbody id="history-tbody">
                            <!-- Populated by JS -->
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    `;
}

export function initHistory() {
    const tbody = document.getElementById('history-tbody');
    
    // Mock Data
    const mockHistory = [
        { id: 1, date: '2026-08-01 10:30 AM', disease: 'Atopic Dermatitis (Eczema)', confidence: '94.2%', severity: 'Medium', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=100' },
        { id: 2, date: '2026-07-28 02:15 PM', disease: 'Benign Nevus (Mole)', confidence: '98.5%', severity: 'Low', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100' }
    ];

    if(tbody) {
        let html = '';
        mockHistory.forEach(item => {
            html += `
                <tr style="border-bottom: 1px solid #e5e7eb;">
                    <td data-label="Image" style="padding: 1rem 1.5rem;"><img src="${item.img}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover;"></td>
                    <td data-label="Condition" style="padding: 1rem 1.5rem; font-weight: 500;">${item.disease}</td>
                    <td data-label="Date" style="padding: 1rem 1.5rem;">${item.date}</td>
                    <td data-label="Confidence" style="padding: 1rem 1.5rem;">${item.confidence}</td>
                    <td data-label="Severity" style="padding: 1rem 1.5rem;"><span style="padding: 5px 10px; border-radius: 50px; font-size: 0.9rem; background: ${item.severity === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)'}; color: ${item.severity === 'Medium' ? 'var(--warning)' : 'var(--success)'}">${item.severity}</span></td>
                    <td data-label="Action" style="padding: 1rem 1.5rem;">
                        <div style="display: flex; gap: 8px; justify-content: flex-end;">
                            <a href="/history/${item.id}" data-link class="btn btn-outline" style="padding: 5px 10px;" title="View"><i class="fa-solid fa-eye"></i></a>
                            <button class="btn btn-outline" style="padding: 5px 10px;" title="Download Report"><i class="fa-solid fa-download"></i></button>
                            <button class="btn btn-outline" style="padding: 5px 10px; color: var(--danger); border-color: var(--danger);" title="Delete"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    }
}
