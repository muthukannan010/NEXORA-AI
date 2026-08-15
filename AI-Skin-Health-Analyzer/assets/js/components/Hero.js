// assets/js/components/Hero.js

export function Hero() {
    return `
        <header class="hero section">
            <!-- Animated Background Elements -->
            <div class="hero-bg-shape shape-1"></div>
            <div class="hero-bg-shape shape-2"></div>
            
            <div class="container hero-grid">
                <div class="hero-content fade-in">
                    <div class="hero-badge">
                        <i class="fa-solid fa-shield-halved"></i> AI-Powered Skin Analysis
                    </div>
                    <h1>Understand Your Skin.<br>Care for it with AI.</h1>
                    <p>Upload a skin image or use your camera to receive AI-based informational insights about your skin.</p>
                    
                    <div class="hero-buttons">
                        <a href="/analyzer" data-link class="btn btn-primary">
                            Start Free Scan <i class="fa-solid fa-camera"></i>
                        </a>
                        <a href="/how-it-works" data-link class="btn btn-outline">
                            How it works <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </div>
                    
                    <div class="hero-stats">
                        <div class="stat-item">
                            <h3>AI</h3>
                            <p>Prototype</p>
                        </div>
                        <div class="stat-item">
                            <h3>50+</h3>
                            <p>Conditions</p>
                        </div>
                        <div class="stat-item">
                            <h3>Fast</h3>
                            <p>Results</p>
                        </div>
                    </div>
                </div>
                
                <div class="hero-image-container slide-up">
                    <div class="image-wrapper glass-card">
                        <img src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80" alt="AI Skin Scan Preview">
                        
                        <!-- Floating Badge -->
                        <div class="floating-badge">
                            <i class="fa-solid fa-check-circle"></i>
                            <div>
                                <span>Model Prediction</span>
                                <strong>Processing...</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    `;
}

export function initHero() {
    // Basic CSS animations are handled by classes fade-in and slide-up
}
