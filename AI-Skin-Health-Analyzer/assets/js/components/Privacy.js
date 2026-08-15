// assets/js/components/privacy.js

export function Privacy() {
    return `
        <div class="section pt-0" style="padding-top: 100px; min-height: calc(100vh - 100px);">
            <div class="container" style="max-width: 800px; margin: 0 auto;">
                <header class="section-header text-center slide-up">
                    <h1 class="section-title">Privacy Policy</h1>
                    <p class="section-subtitle">Your privacy and data security are our top priority.</p>
                </header>

                <div class="glass-card slide-up" style="padding: 2rem;">
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">1. Data Collection</h3>
                    <p>When you use the AI Skin Health Analyzer, we process the images you upload solely for the purpose of generating the analysis report. We do not store these images permanently on our servers unless you explicitly opt-in to help improve our AI models.</p>
                    
                    <h3 style="color: var(--primary); margin-bottom: 1rem; margin-top: 2rem;">2. Data Security</h3>
                    <p>All data transmissions are encrypted using industry-standard protocols. Our application operates primarily on the client-side for immediate processing, minimizing the need for server round-trips for sensitive imagery where possible.</p>
                    
                    <h3 style="color: var(--primary); margin-bottom: 1rem; margin-top: 2rem;">3. Usage of Analysis</h3>
                    <p>The history feature utilizes local storage mechanisms (like Session Storage or Local Storage) to persist your scan history locally on your device for your convenience, unless synced via an authenticated account.</p>
                </div>
            </div>
        </div>
    `;
}
