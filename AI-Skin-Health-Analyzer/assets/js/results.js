/*
 * Results Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    window.initResults = function() {
        // Tab Switching Logic
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });

        // Load image from session storage if available
        const currentScan = sessionStorage.getItem('current_scan');
        if (currentScan) {
            const resultImg = document.getElementById('result-image');
            if (resultImg) resultImg.src = currentScan;
        }

        // Set current date
        const dateEl = document.getElementById('report-date');
        if (dateEl) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            dateEl.innerText = new Date().toLocaleDateString('en-US', options);
        }

        // Animate Confidence Meter
        setTimeout(() => {
            const meterFill = document.getElementById('confidence-meter');
            if (meterFill) meterFill.style.width = '94.2%';
        }, 500);

        // Render Mock Probability Chart
        const chartContainer = document.getElementById('probability-chart');
        if (chartContainer) {
            const probabilities = [
                { name: 'Psoriasis', value: 3.5 },
                { name: 'Contact Dermatitis', value: 1.8 },
                { name: 'Ringworm', value: 0.5 }
            ];

            let chartHTML = '';
            probabilities.forEach(prob => {
                chartHTML += `
                    <div class="chart-bar-row">
                        <div class="chart-label">${prob.name}</div>
                        <div class="chart-bar-wrapper">
                            <div class="chart-bar-fill" style="width: ${prob.value}%;"></div>
                        </div>
                        <div class="chart-value">${prob.value}%</div>
                    </div>
                `;
            });
            chartContainer.innerHTML = chartHTML;
        }

        // PDF Download Mock
        const downloadBtn = document.getElementById('download-pdf');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                alert("Generating PDF... (This is a mock action for the frontend prototype)");
            });
        }
    };

    window.initResults();
});
