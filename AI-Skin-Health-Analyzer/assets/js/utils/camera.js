// assets/js/utils/camera.js

export function initCamera() {
    const startCameraBtn = document.getElementById('start-camera-btn');
    const cameraContainer = document.getElementById('camera-container');
    const closeCameraBtn = document.getElementById('close-camera-btn');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureBtn = document.getElementById('capture-btn');
    const initialUi = document.getElementById('initial-ui');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const analyzeAction = document.getElementById('analyze-action');
    
    let stream = null;

    if (!startCameraBtn) return;

    startCameraBtn.addEventListener('click', async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            video.srcObject = stream;
            
            initialUi.style.display = 'none';
            cameraContainer.style.display = 'block';
        } catch (err) {
            console.error("Error accessing camera: ", err);
            alert("Could not access the camera. Please ensure permissions are granted.");
        }
    });

    closeCameraBtn.addEventListener('click', () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        cameraContainer.style.display = 'none';
        initialUi.style.display = 'block';
    });

    captureBtn.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        
        // Stop camera
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        // Show preview
        cameraContainer.style.display = 'none';
        imagePreview.src = imageDataUrl;
        previewContainer.style.display = 'block';
        analyzeAction.style.display = 'block';
        
        // Save to session storage for results page
        sessionStorage.setItem('current_scan', imageDataUrl);
    });
}
