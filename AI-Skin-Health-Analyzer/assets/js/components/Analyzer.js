// assets/js/components/Analyzer.js
import { initCamera } from '../utils/camera.js';
import { initUpload } from '../utils/upload.js';
import { initAnimation } from '../utils/animations.js';

export function Analyzer() {
    return `
        <div class="section" style="min-height: calc(100vh - 80px);">
            <div class="container" style="max-width: 900px;">
                <header class="section-header text-center slide-up">
                    <h1 class="section-title">AI Skin Analyzer</h1>
                    <p class="section-subtitle">Upload a clear image of your skin to get started with the analysis.</p>
                </header>

                <!-- Upload Card -->
                <div class="glass-card fade-in text-center analyzer-card" id="drop-zone">
                    <div id="initial-ui" class="analyzer-initial">
                        <div class="upload-icon-box">
                            <i class="fa-solid fa-cloud-arrow-up"></i>
                        </div>
                        <h3>Upload Image</h3>
                        <p>Drag & Drop your image here or select below</p>
                        
                        <div class="analyzer-actions">
                            <label for="file-input" class="btn btn-primary">
                                <i class="fa-solid fa-image"></i> Choose Image
                            </label>
                            <input type="file" id="file-input" accept="image/jpeg, image/png, image/jpg, image/webp" style="display: none;">
                            
                            <button id="start-camera-btn" class="btn btn-outline">
                                <i class="fa-solid fa-camera"></i> Open Camera
                            </button>
                        </div>
                    </div>

                    <!-- Camera UI (Hidden initially) -->
                    <div id="camera-container" class="camera-ui" style="display: none;">
                        <button id="close-camera-btn" class="action-btn close-btn"><i class="fa-solid fa-times"></i></button>
                        <video id="video" autoplay playsinline></video>
                        <canvas id="canvas" style="display: none;"></canvas>
                        <div class="camera-controls">
                            <button id="capture-btn" class="capture-btn"></button>
                        </div>
                    </div>

                    <!-- Image Preview UI (Hidden initially) -->
                    <div id="preview-container" class="preview-ui" style="display: none; position: relative;">
                        <div class="preview-actions" style="position: absolute; top: 16px; right: 16px; display: flex; gap: 8px; z-index: 10;">
                            <button id="replace-btn" class="action-btn" style="background: rgba(0,0,0,0.5); color: white; border: none; border-radius: var(--radius-md); padding: 8px 16px; cursor: pointer;">
                                <i class="fa-solid fa-rotate"></i> Replace
                            </button>
                            <button id="remove-btn" class="action-btn remove-btn" style="background: rgba(239, 68, 68, 0.8); color: white; border: none; border-radius: var(--radius-md); padding: 8px 16px; cursor: pointer;">
                                <i class="fa-solid fa-trash"></i> Remove
                            </button>
                        </div>
                        <img id="image-preview" src="" alt="Skin Preview" style="width: 100%; max-height: 400px; object-fit: contain; border-radius: var(--radius-md);">
                        
                        <!-- Scanning Overlay -->
                        <div id="scanner-overlay" class="scanner-overlay" style="display: none;">
                            <div id="scanner-line" class="scanner-line"></div>
                            <div class="scanning-text">Analyzing visual features...</div>
                        </div>
                    </div>

                </div>

                <!-- Action Button & Progress -->
                <div id="analyze-action" class="text-center analyze-action-container" style="display: none;">
                    <button id="analyze-btn" class="btn btn-primary btn-large">
                        <i class="fa-solid fa-brain"></i> Analyze Skin
                    </button>
                </div>

                <div id="progress-container" class="progress-container text-center" style="display: none;">
                    <div class="progress-track">
                        <div id="progress-bar" class="progress-fill"></div>
                    </div>
                    <p id="progress-text" class="progress-text">Preparing image...</p>
                </div>

            </div>
        </div>
    `;
}

export function initAnalyzer(router) {
    // We pass the router instance here so animation.js can call router.navigateTo('/result')
    initUpload();
    initCamera();
    initAnimation(router);
}
