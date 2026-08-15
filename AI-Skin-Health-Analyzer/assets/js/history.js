/*
 * History Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    window.initHistory = function() {
        const tbody = document.getElementById('history-tbody');
        const searchInput = document.getElementById('search-input');
        const severityFilter = document.getElementById('severity-filter');
        const pagination = document.getElementById('pagination');
        
        if (!tbody) return;

        // Mock Data
        const mockHistory = [
            { id: 1, date: '2026-08-01 10:30 AM', disease: 'Atopic Dermatitis (Eczema)', confidence: '94.2%', severity: 'Medium', img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=100' },
            { id: 2, date: '2026-07-28 02:15 PM', disease: 'Benign Nevus (Mole)', confidence: '98.5%', severity: 'Low', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=100' },
            { id: 3, date: '2026-07-15 09:00 AM', disease: 'Suspected Melanoma', confidence: '87.3%', severity: 'High', img: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=100' },
            { id: 4, date: '2026-06-20 11:45 AM', disease: 'Contact Dermatitis', confidence: '91.0%', severity: 'Medium', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100' }
        ];

        let filteredData = [...mockHistory];

        function renderTable(data) {
            tbody.innerHTML = '';
            
            if (data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="6" class="text-center" style="padding: 2rem;">No history found matching your criteria.</td></tr>';
                return;
            }

            data.forEach(item => {
                let badgeClass = 'severity-low';
                if (item.severity === 'High') badgeClass = 'severity-high';
                if (item.severity === 'Medium') badgeClass = 'severity-medium';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><img src="${item.img}" alt="Scan" class="thumbnail"></td>
                    <td>${item.date}</td>
                    <td style="font-weight: 500; color: var(--text-dark);">${item.disease}</td>
                    <td>${item.confidence}</td>
                    <td><span class="tag ${badgeClass.includes('high') ? 'warning' : ''}" style="background: ${badgeClass.includes('high') ? 'rgba(239, 68, 68, 0.1)' : badgeClass.includes('medium') ? 'rgba(245, 158, 11, 0.1)' : 'rgba(34, 197, 94, 0.1)'}; color: ${badgeClass.includes('high') ? 'var(--danger-color)' : badgeClass.includes('medium') ? 'var(--warning-color)' : 'var(--success-color)'}">${item.severity}</span></td>
                    <td>
                        <div class="action-btns">
                            <button class="btn-icon view" title="View Report" onclick="location.href='results.html'"><i class="fa-solid fa-eye"></i></button>
                            <button class="btn-icon delete" title="Delete Record" onclick="alert('Record deleted (Mock)')"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function filterData() {
            const searchTerm = searchInput.value.toLowerCase();
            const severity = severityFilter.value;

            filteredData = mockHistory.filter(item => {
                const matchesSearch = item.disease.toLowerCase().includes(searchTerm);
                const matchesSeverity = severity === 'all' || item.severity.toLowerCase() === severity;
                return matchesSearch && matchesSeverity;
            });

            renderTable(filteredData);
            renderPagination(); // Assuming 1 page for mock
        }

        function renderPagination() {
            // Simplified pagination for mock
            pagination.innerHTML = `
                <button class="page-btn"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="page-btn active">1</button>
                <button class="page-btn"><i class="fa-solid fa-chevron-right"></i></button>
            `;
        }

        // Event Listeners
        if (searchInput) searchInput.addEventListener('input', filterData);
        if (severityFilter) severityFilter.addEventListener('change', filterData);

        // Initial Render
        renderTable(filteredData);
        renderPagination();
    };

    window.initHistory();
});
