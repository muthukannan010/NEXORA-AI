// assets/js/components/Footer.js

export function Footer() {
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-grid">
                    
                    <div class="footer-brand">
                        <a href="/" data-link class="navbar-brand">
                            <i class="fa-solid fa-microscope"></i> NEXORA ai
                        </a>
                        <p class="footer-description">Empowering individuals with advanced AI technology for accessible and accurate skin health monitoring.</p>
                        <div class="footer-socials">
                            <a href="#" class="social-link" aria-label="Github"><i class="fa-brands fa-github"></i></a>
                            <a href="#" class="social-link" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
                            <a href="#" class="social-link" aria-label="Twitter"><i class="fa-brands fa-twitter"></i></a>
                        </div>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-title">Product</h4>
                        <ul class="footer-links">
                            <li><a href="/analyzer" data-link>AI Analyzer</a></li>
                            <li><a href="/features" data-link>Features</a></li>
                            <li><a href="/history" data-link>Scan History</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-column">
                        <h4 class="footer-title">Resources</h4>
                        <ul class="footer-links">
                            <li><a href="/faq" data-link>FAQ</a></li>
                            <li><a href="/privacy" data-link>Privacy Policy</a></li>
                            <li><a href="#" data-link>Terms of Service</a></li>
                        </ul>
                    </div>

                    <div class="footer-column">
                        <h4 class="footer-title">Contact</h4>
                        <ul class="footer-contact">
                            <li><i class="fa-solid fa-envelope"></i> contact@skinor.ai</li>
                            <li><i class="fa-solid fa-location-dot"></i> San Francisco, CA</li>
                        </ul>
                    </div>

                </div>
                
                <div class="footer-bottom text-center">
                    <p>&copy; 2026 NEXORA ai. All rights reserved. Built as a Single Page Application.</p>
                </div>
            </div>
        </footer>
    `;
}
