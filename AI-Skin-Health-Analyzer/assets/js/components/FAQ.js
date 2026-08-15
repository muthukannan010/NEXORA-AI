// assets/js/components/faq.js

export function Faq() {
    return `
        <div class="section pt-0" style="padding-top: 100px; min-height: calc(100vh - 100px);">
            <div class="container">
                <header class="section-header text-center slide-up">
                    <h1 class="section-title">Frequently Asked Questions</h1>
                    <p class="section-subtitle">Find answers to common questions about how SkinorAI works and how to use it effectively.</p>
                </header>

                <div class="faq-container slide-up" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
                    
                    <!-- FAQ Item 1 -->
                    <div class="glass-card faq-item" style="padding: 1.5rem; cursor: pointer;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 1.1rem; color: var(--primary);">
                            <span>How accurate is the AI prediction?</span>
                            <i class="fa-solid fa-chevron-down" style="transition: transform 0.3s ease;"></i>
                        </div>
                        <div class="faq-answer" style="display: none; margin-top: 1rem; color: var(--text-light);">
                            <p>Our AI model is trained on over 10,000 clinically validated images and currently boasts a 95% accuracy rate for common conditions. However, it is an informational tool and should never replace a professional medical diagnosis.</p>
                        </div>
                    </div>

                    <!-- FAQ Item 2 -->
                    <div class="glass-card faq-item" style="padding: 1.5rem; cursor: pointer;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 1.1rem; color: var(--primary);">
                            <span>Is my data and photo kept private?</span>
                            <i class="fa-solid fa-chevron-down" style="transition: transform 0.3s ease;"></i>
                        </div>
                        <div class="faq-answer" style="display: none; margin-top: 1rem; color: var(--text-light);">
                            <p>Absolutely. We employ strict data encryption and adhere to healthcare data privacy standards. Your images are only used for the instant analysis and are not stored permanently without your explicit consent.</p>
                        </div>
                    </div>
                    
                    <!-- FAQ Item 3 -->
                    <div class="glass-card faq-item" style="padding: 1.5rem; cursor: pointer;">
                        <div class="faq-question" style="display: flex; justify-content: space-between; align-items: center; font-weight: 600; font-size: 1.1rem; color: var(--primary);">
                            <span>What should I do if the severity is high?</span>
                            <i class="fa-solid fa-chevron-down" style="transition: transform 0.3s ease;"></i>
                        </div>
                        <div class="faq-answer" style="display: none; margin-top: 1rem; color: var(--text-light);">
                            <p>If the analyzer flags a high severity condition, we strongly recommend scheduling an appointment with a certified dermatologist immediately. Do not attempt to self-treat severe conditions based solely on AI feedback.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `;
}

export function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.fa-chevron-down');
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                // Close others
                document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
                document.querySelectorAll('.faq-item .fa-chevron-down').forEach(i => i.style.transform = 'rotate(0deg)');
                
                // Open clicked
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}
