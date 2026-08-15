/*
 * Analysis Animation and Progress Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    window.initAnimation = function() {
        const analyzeBtn = document.getElementById('analyze-btn');
        const analyzeAction = document.getElementById('analyze-action');
        const progressContainer = document.getElementById('progress-container');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        const scannerOverlay = document.getElementById('scanner-overlay');
        const removeBtn = document.getElementById('remove-btn');
        
        if (!analyzeBtn) return;

        analyzeBtn.addEventListener('click', () => {
            // Hide analyze button, show progress
            analyzeAction.style.display = 'none';
            progressContainer.classList.add('active');
            
            // Show scanning overlay on image
            scannerOverlay.classList.add('active');
            
            // Disable remove button during scan
            removeBtn.style.pointerEvents = 'none';
            removeBtn.style.opacity = '0.5';
            
            // Mock Analysis Progress
            let progress = 0;
            const messages = [
                "Initializing AI Model...",
                "Extracting feature vectors...",
                "Analyzing skin texture...",
                "Comparing with 10,000+ clinical cases...",
                "Calculating probability scores...",
                "Generating final report..."
            ];
            
            const interval = setInterval(() => {
                progress += Math.floor(Math.random() * 15) + 5; // Random increment
                if (progress > 100) progress = 100;
                
                progressBar.style.width = `${progress}%`;
                
                // Update text based on progress
                const messageIndex = Math.min(Math.floor((progress / 100) * messages.length), messages.length - 1);
                progressText.innerText = messages[messageIndex];
                
                if (progress === 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        // In an SPA, we navigate using our router if possible, else standard redirect
                        // Since we implemented SPA router, we can pushState or trigger click
                        if (typeof window.history.pushState === 'function' && document.querySelector('nav')) {
                            // Find router navigateTo function if exposed, or just trigger a link click
                            const a = document.createElement('a');
                            a.href = 'results.html';
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                        } else {
                            window.location.href = 'results.html';
                        }
                    }, 500);
                }
            }, 600);
        });
    };

    window.initAnimation();
});
