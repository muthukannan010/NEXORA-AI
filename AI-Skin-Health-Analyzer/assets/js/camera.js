/*
 * Camera Integration Logic using WebRTC
 */

document.addEventListener('DOMContentLoaded', () => {
    // We wrap this in a function to be re-initialized by the SPA router if needed
    window.initCamera = function() {
        const startCameraBtn = document.getElementById('start-camera-btn');
        const cameraContainer = document.getElementById('camera-container');
        const initialUI = document.getElementById('initial-ui');
        const video = document.getElementById('video');
        const canvas = document.getElementById('canvas');
        const captureBtn = document.getElementById('capture-btn');
        const closeCameraBtn = document.getElementById('close-camera-btn');
        const previewContainer = document.getElementById('preview-container');
        const imagePreview = document.getElementById('image-preview');
        const analyzeAction = document.getElementById('analyze-action');
        
        let stream = null;

        if (!startCameraBtn) return; // Not on analyzer page

        startCameraBtn.addEventListener('click', async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                video.srcObject = stream;
                
                initialUI.style.display = 'none';
                cameraContainer.classList.add('active');
            } catch (err) {
                console.error("Error accessing camera: ", err);
                alert("Could not access camera. Please ensure permissions are granted.");
            }
        });

        closeCameraBtn.addEventListener('click', stopCamera);

        captureBtn.addEventListener('click', () => {
            // Draw video frame to canvas
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Get image data
            const imageDataUrl = canvas.toDataURL('image/jpeg');
            
            // Stop camera
            stopCamera();
            
            // Show preview
            imagePreview.src = imageDataUrl;
            initialUI.style.display = 'none';
            cameraContainer.classList.remove('active');
            previewContainer.classList.add('active');
            analyzeAction.classList.add('active');
            
            // Store image data for analysis (mock)
            sessionStorage.setItem('current_scan', imageDataUrl);
        });

        function stopCamera() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                video.srcObject = null;
            }
            cameraContainer.classList.remove('active');
            initialUI.style.display = 'block';
        }
        
        // Clean up on page leave (handled by router ideally, but good practice)
        window.addEventListener('beforeunload', stopCamera);
    };

    // Initialize on direct load
    window.initCamera();
});
