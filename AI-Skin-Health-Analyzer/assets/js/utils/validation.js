// assets/js/utils/validation.js
// Form validation utilities

/**
 * Validates an email address.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim());
}

/**
 * Validates password strength (min 8 chars, at least 1 letter + 1 number).
 * @param {string} password
 * @returns {{ valid: boolean, message: string }}
 */
export function validatePassword(password) {
    if (!password || password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long.' };
    }
    if (!/[a-zA-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one letter.' };
    }
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number.' };
    }
    return { valid: true, message: '' };
}

/**
 * Check if two passwords match.
 * @param {string} password
 * @param {string} confirm
 * @returns {{ valid: boolean, message: string }}
 */
export function passwordsMatch(password, confirm) {
    if (password !== confirm) {
        return { valid: false, message: 'Passwords do not match.' };
    }
    return { valid: true, message: '' };
}

/**
 * Returns a user-friendly error message from a Supabase error object.
 * @param {Error|object} error
 * @returns {string}
 */
export function getAuthErrorMessage(error) {
    if (!error) return 'An unknown error occurred.';
    const msg = error.message || error.error_description || '';
    
    const map = {
        'Invalid login credentials': 'Invalid email or password. Please try again.',
        'Email not confirmed': 'Please verify your email address before logging in.',
        'User already registered': 'An account with this email already exists.',
        'Password should be at least 6 characters': 'Password must be at least 6 characters.',
        'Email rate limit exceeded': 'Too many requests. Please wait a moment and try again.',
        'User not found': 'No account found with this email address.',
        'Token has expired or is invalid': 'This link has expired. Please request a new one.',
        'New password should be different from the old password': 'New password must be different from your current password.',
    };

    for (const [key, friendly] of Object.entries(map)) {
        if (msg.toLowerCase().includes(key.toLowerCase())) {
            return friendly;
        }
    }

    return msg || 'Something went wrong. Please try again.';
}

/**
 * Sets an error state on a form field.
 * @param {string} fieldId - The input element id
 * @param {string} message - The error message
 */
export function setFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.classList.add('field-error');
    let errorEl = field.parentElement.querySelector('.field-error-msg');
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'field-error-msg';
        field.parentElement.appendChild(errorEl);
    }
    errorEl.textContent = message;
}

/**
 * Clears all error states on a form.
 * @param {HTMLFormElement} form
 */
export function clearFormErrors(form) {
    if (!form) return;
    form.querySelectorAll('.field-error').forEach(el => el.classList.remove('field-error'));
    form.querySelectorAll('.field-error-msg').forEach(el => el.remove());
}
