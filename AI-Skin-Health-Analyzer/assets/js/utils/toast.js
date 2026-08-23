// assets/js/utils/toast.js
// Centralized toast notification system.
// Replaces all alert() calls throughout the application.

let _toastContainer = null;

function getContainer() {
    if (!_toastContainer) {
        _toastContainer = document.getElementById('toast-container');
    }
    return _toastContainer;
}

/**
 * Show a toast notification.
 * @param {string} message - The message to display
 * @param {'success'|'error'|'warning'|'info'} type - Toast type
 * @param {number} duration - Duration in ms (default 4000)
 */
export function showToast(message, type = 'info', duration = 4000) {
    const container = getContainer();
    if (!container) {
        console.warn('Toast container not found. Falling back to console.');
        console.log(`[${type.toUpperCase()}] ${message}`);
        return;
    }

    const icons = {
        success: 'fa-circle-check',
        error: 'fa-circle-xmark',
        warning: 'fa-triangle-exclamation',
        info: 'fa-circle-info'
    };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <i class="fa-solid ${icons[type] || icons.info} toast-icon"></i>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close">&times;</button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('toast-visible');
    });

    const dismiss = () => {
        toast.classList.remove('toast-visible');
        toast.classList.add('toast-hiding');
        setTimeout(() => toast.remove(), 350);
    };

    toast.querySelector('.toast-close').addEventListener('click', dismiss);

    const timer = setTimeout(dismiss, duration);

    // Clear timer if manually dismissed
    toast.querySelector('.toast-close').addEventListener('click', () => clearTimeout(timer));
}

export const toast = {
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
};
