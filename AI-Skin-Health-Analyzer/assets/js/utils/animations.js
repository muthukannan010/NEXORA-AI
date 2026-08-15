// assets/js/utils/animation.js

export function initAnimation(router) {
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
        progressContainer.style.display = 'block';
        
        // Show scanning overlay on image
        scannerOverlay.style.display = 'block';
        
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
            progress += Math.floor(Math.random() * 15) + 5;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            const messageIndex = Math.min(Math.floor((progress / 100) * messages.length), messages.length - 1);
            progressText.innerText = messages[messageIndex];
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    // Navigate to results using the SPA router
                    if(router) {
                        router.navigateTo('/result');
                    }
                }, 500);
            }
        }, 600);
    });
}
