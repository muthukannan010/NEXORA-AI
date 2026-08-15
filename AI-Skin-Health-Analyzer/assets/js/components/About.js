// assets/js/components/about.js

export function About() {
    return `
        <div class="section pt-0">
            <header class="section-header text-center slide-up" style="padding-top: 100px;">
                <h1 class="section-title">About SkinorAI</h1>
                <p class="section-subtitle">Revolutionizing dermatology through accessible, artificial intelligence-powered skin health analysis.</p>
            </header>

            <div class="container">
                <div class="about-grid fade-in" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; margin-top: 3rem;">
                    <div class="about-image">
                        <img src="https://images.unsplash.com/photo-1576091160550-2173ff9e5eb4?auto=format&fit=crop&w=600&q=80" alt="Medical Tech" style="width: 100%; border-radius: var(--border-radius); box-shadow: var(--soft-shadow);">
                    </div>
                    <div class="about-content">
                        <h3 style="color: var(--primary); font-size: 1.8rem; margin-bottom: 1rem;">Our Story</h3>
                        <p>SkinorAI was born from a vision to make early detection of skin conditions accessible to everyone. By combining deep learning with clinical data, we've created a platform that bridges the gap between technology and everyday healthcare.</p>
                        <p>We believe AI shouldn't replace doctors, but empower individuals to seek the right care at the right time.</p>
                    </div>
                </div>

                <div class="mission-vision fade-in" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 4rem;">
                    <div class="glass-card">
                        <i class="fa-solid fa-bullseye" style="font-size: 2.5rem; color: var(--primary); margin-bottom: 1rem;"></i>
                        <h3>Our Mission</h3>
                        <p>To provide instant, accurate, and accessible skin health insights using artificial intelligence, helping users take proactive steps toward better dermatological health.</p>
                    </div>
                    <div class="glass-card">
                        <i class="fa-regular fa-eye" style="font-size: 2.5rem; color: var(--accent); margin-bottom: 1rem;"></i>
                        <h3>Our Vision</h3>
                        <p>A world where no skin condition goes unnoticed or untreated due to a lack of access to early screening and preliminary medical guidance.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}
