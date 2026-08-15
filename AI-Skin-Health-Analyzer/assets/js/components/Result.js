// assets/js/components/Result.js

export function Result() {
    return `
        <div class="section result-section">
            <div class="container">
                
                <div class="results-header fade-in">
                    <div>
                        <h1 class="section-title">Analysis Complete</h1>
                        <p class="section-subtitle">Report generated on <span id="report-date"></span></p>
                    </div>
                    <div class="action-buttons">
                        <a href="/analyzer" data-link class="btn btn-outline"><i class="fa-solid fa-arrow-left"></i> New Scan</a>
                        <button class="btn btn-outline" onclick="window.print()"><i class="fa-solid fa-print"></i> Print</button>
                        <button class="btn btn-outline" id="download-pdf"><i class="fa-solid fa-download"></i> PDF</button>
                    </div>
                </div>

                <div class="disclaimer-panel fade-in">
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    <div>
                        <strong>Medical Disclaimer</strong>
                        <p>This tool provides AI-based informational results and is not a medical diagnosis. Consult a qualified healthcare professional for diagnosis and treatment.</p>
                    </div>
                </div>

                <!-- Primary Result Section -->
                <div class="result-primary-grid glass-card slide-up">
                    <div class="result-image-wrapper">
                        <img id="result-image" src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=600&q=80" alt="Analyzed Skin">
                    </div>
                    
                    <div class="result-details">
                        <div class="severity-badge warning">Medium Severity</div>
                        <h2>Model Prediction: Atopic Dermatitis (Eczema)</h2>
                        
                        <div class="confidence-section">
                            <div class="confidence-header">
                                <span>AI Confidence</span>
                                <span>94.2%</span>
                            </div>
                            <div class="progress-track">
                                <div id="confidence-meter" class="progress-fill success-fill"></div>
                            </div>
                            <p style="font-size: 0.8rem; color: var(--muted); margin-top: 8px; line-height: 1.4;">Confidence reflects the model's prediction score and does not confirm a diagnosis.</p>
                        </div>

                        <div class="result-probability">
                            <h4>Other Possibilities</h4>
                            <div id="probability-chart"></div>
                        </div>
                    </div>
                </div>

                <!-- Detail Cards Grid -->
                <div class="result-details-grid slide-up" style="animation-delay: 0.1s;">
                    
                    <div class="glass-card detail-card">
                        <div class="card-icon"><i class="fa-solid fa-circle-info"></i></div>
                        <h3>Description</h3>
                        <p>Atopic dermatitis (eczema) is a condition that makes your skin red and itchy. It's common in children but can occur at any age.</p>
                    </div>

                    <div class="glass-card detail-card">
                        <div class="card-icon"><i class="fa-solid fa-clipboard-list"></i></div>
                        <h3>Symptoms</h3>
                        <ul>
                            <li>Dry skin</li>
                            <li>Itching, especially at night</li>
                            <li>Red to brownish-gray patches</li>
                        </ul>
                    </div>

                    <div class="glass-card detail-card">
                        <div class="card-icon"><i class="fa-solid fa-magnifying-glass-chart"></i></div>
                        <h3>Causes</h3>
                        <p>Often linked to an overactive immune system responding to an irritant or allergen. Genetics also play a role in skin barrier function.</p>
                    </div>

                    <div class="glass-card detail-card">
                        <div class="card-icon"><i class="fa-solid fa-leaf"></i></div>
                        <h3>Supportive Natural Care</h3>
                        <ul>
                            <li>Apply coconut oil or sunflower seed oil to moisturize (may help support symptom relief)</li>
                            <li>Colloidal oatmeal baths to soothe itching</li>
                        </ul>
                    </div>

                    <div class="glass-card detail-card">
                        <div class="card-icon"><i class="fa-solid fa-staff-snake"></i></div>
                        <h3>General Medical Information</h3>
                        <p>Standard treatments may include topical corticosteroids, calcineurin inhibitors, or barrier repair creams prescribed by a dermatologist.</p>
                    </div>

                    <div class="glass-card detail-card">
                        <div class="card-icon"><i class="fa-solid fa-apple-whole"></i></div>
                        <h3>Foods / Lifestyle Information</h3>
                        <ul>
                            <li>Eat fatty fish (rich in Omega-3s) and probiotic-rich foods</li>
                            <li>Avoid highly processed foods and refined sugars</li>
                            <li>Wear soft, breathable fabrics like cotton</li>
                        </ul>
                    </div>

                    <div class="glass-card detail-card">
                        <div class="card-icon"><i class="fa-solid fa-shield-halved"></i></div>
                        <h3>Prevention</h3>
                        <ul>
                            <li>Moisturize skin at least twice a day</li>
                            <li>Take shorter baths or showers (10-15 minutes)</li>
                            <li>Use mild soaps without dyes or perfumes</li>
                        </ul>
                    </div>

                    <div class="glass-card detail-card recommended-action">
                        <div class="card-icon"><i class="fa-solid fa-user-doctor"></i></div>
                        <h3>Doctor Guidance</h3>
                        <p>Based on visual indicators of moderate inflammation, consulting a dermatologist for a definitive diagnosis and personalized treatment plan is recommended.</p>
                    </div>

                    <div class="glass-card detail-card" style="border-left: 4px solid var(--danger);">
                        <div class="card-icon"><i class="fa-solid fa-triangle-exclamation" style="color: var(--danger);"></i></div>
                        <h3>Emergency Warning Signs</h3>
                        <ul>
                            <li>Pus or yellow crusting (possible infection)</li>
                            <li>Fever or chills accompanying the rash</li>
                            <li>Sudden and severe spreading of the rash</li>
                        </ul>
                        <p style="font-size: 0.8rem; margin-top: 8px;">If you experience any of these, please seek immediate medical attention.</p>
                    </div>

                </div>
            </div>
        </div>
    `;
}

export function initResult() {
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
                <div class="prob-row">
                    <div class="prob-name">${prob.name}</div>
                    <div class="progress-track prob-track">
                        <div class="progress-fill prob-fill" style="width: ${prob.value}%;"></div>
                    </div>
                    <div class="prob-value">${prob.value}%</div>
                </div>
            `;
        });
        chartContainer.innerHTML = chartHTML;
    }
}
