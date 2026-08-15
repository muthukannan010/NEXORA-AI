// assets/js/utils/upload.js

export function initUpload() {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const initialUi = document.getElementById('initial-ui');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removeBtn = document.getElementById('remove-btn');
    const replaceBtn = document.getElementById('replace-btn');
    const analyzeAction = document.getElementById('analyze-action');

    if (!dropZone) return;

    // Handle Drag and Drop
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = 'rgba(0, 168, 150, 0.05)';
        dropZone.style.borderColor = 'var(--secondary)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = '';
        dropZone.style.borderColor = 'var(--primary)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = '';
        dropZone.style.borderColor = 'var(--primary)';
        
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    // Handle File Input
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file (JPG, PNG).');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const dataUrl = e.target.result;
            imagePreview.src = dataUrl;
            
            // Hide initial UI, show preview
            initialUi.style.display = 'none';
            previewContainer.style.display = 'block';
            analyzeAction.style.display = 'block';
            
            // Store for results page
            sessionStorage.setItem('current_scan', dataUrl);
        };
        reader.readAsDataURL(file);
    }

    // Handle Remove Image
    removeBtn.addEventListener('click', () => {
        imagePreview.src = '';
        previewContainer.style.display = 'none';
        analyzeAction.style.display = 'none';
        initialUi.style.display = 'block';
        fileInput.value = ''; // Reset input
        sessionStorage.removeItem('current_scan');
    });

    if (replaceBtn) {
        replaceBtn.addEventListener('click', () => {
            fileInput.click();
        });
    }
}
