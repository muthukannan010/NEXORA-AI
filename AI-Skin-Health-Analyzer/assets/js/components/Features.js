// assets/js/components/Features.js

export function Features() {
    return `
        <div class="section pt-0">
            <header class="section-header text-center slide-up" style="padding-top: 100px;">
                <h1 class="section-title">Platform Features</h1>
                <p class="section-subtitle">Discover all the tools we provide to help you monitor and understand your skin health.</p>
            </header>

            <div class="container">
                <div class="features-grid slide-up" style="animation-delay: 0.1s;">
                    
                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-brain"></i></div>
                        <h3>AI Detection</h3>
                        <p>Advanced machine learning model trained to identify over 50+ common skin conditions with high precision.</p>
                    </div>

                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-image"></i></div>
                        <h3>Image Scan</h3>
                        <p>Upload existing high-resolution photos for a detailed analysis of your skin concerns.</p>
                    </div>

                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-camera"></i></div>
                        <h3>Camera Integration</h3>
                        <p>Use your device's camera to capture live images directly into our secure platform.</p>
                    </div>

                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-file-medical"></i></div>
                        <h3>Detailed Reports</h3>
                        <p>Receive comprehensive breakdowns including probabilities, symptoms, and medical recommendations.</p>
                    </div>

                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-clock-rotate-left"></i></div>
                        <h3>Scan History</h3>
                        <p>Keep track of your past scans to monitor changes in your skin over time.</p>
                    </div>

                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-capsules"></i></div>
                        <h3>Treatments</h3>
                        <p>Get informational suggestions on possible natural care and medical treatments.</p>
                    </div>

                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-shield-halved"></i></div>
                        <h3>Prevention</h3>
                        <p>Learn dietary and lifestyle practices that may help prevent future flare-ups.</p>
                    </div>

                    <div class="glass-card feature-card">
                        <div class="feature-icon"><i class="fa-solid fa-lock"></i></div>
                        <h3>Data Security</h3>
                        <p>Your images are processed securely and are never shared with third parties without consent.</p>
                    </div>

                </div>
            </div>
        </div>
    `;
}
