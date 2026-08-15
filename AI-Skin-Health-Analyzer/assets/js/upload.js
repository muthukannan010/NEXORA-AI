/*
 * Drag and Drop & File Upload Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    window.initUpload = function() {
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('file-input');
        const initialUI = document.getElementById('initial-ui');
        const previewContainer = document.getElementById('preview-container');
        const imagePreview = document.getElementById('image-preview');
        const removeBtn = document.getElementById('remove-btn');
        const analyzeAction = document.getElementById('analyze-action');
        
        if (!dropZone) return;

        // Prevent default drag behaviors
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
            document.body.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Highlight drop zone
        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropZone.classList.add('drag-over');
        }

        function unhighlight(e) {
            dropZone.classList.remove('drag-over');
        }

        // Handle dropped files
        dropZone.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            const dt = e.dataTransfer;
            const files = dt.files;
            handleFiles(files);
        }

        // Handle file input change
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if (files.length > 0) {
                const file = files[0];
                
                // Validate file type
                if (!file.type.match('image.*')) {
                    alert("Please select an image file (JPG, PNG).");
                    return;
                }
                
                // Validate file size (e.g., 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert("File size exceeds 5MB limit.");
                    return;
                }

                previewFile(file);
            }
        }

        function previewFile(file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function() {
                // Show preview
                imagePreview.src = reader.result;
                initialUI.style.display = 'none';
                previewContainer.classList.add('active');
                analyzeAction.classList.add('active');
                
                // Store in session storage for the results page
                sessionStorage.setItem('current_scan', reader.result);
            }
        }

        // Handle image removal
        removeBtn.addEventListener('click', () => {
            imagePreview.src = "";
            previewContainer.classList.remove('active');
            analyzeAction.classList.remove('active');
            initialUI.style.display = 'block';
            fileInput.value = ""; // Reset input
            sessionStorage.removeItem('current_scan');
        });
    };

    window.initUpload();
});
