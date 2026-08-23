// assets/js/services/api.js
// Centralized FastAPI backend client.
// Automatically attaches the Supabase access token to every request.

import { supabase } from './supabase.js';
import { BACKEND_URL } from '../config.js';

/**
 * Get the current Supabase access token.
 * @returns {Promise<string|null>}
 */
async function getAccessToken() {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token || null;
}

/**
 * Make an authenticated request to the FastAPI backend.
 * @param {string} endpoint - e.g. '/api/analyze'
 * @param {RequestInit} options - fetch options
 * @returns {Promise<any>}
 */
async function request(endpoint, options = {}) {
    const token = await getAccessToken();
    
    const headers = {
        ...options.headers,
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Only set Content-Type for non-FormData requests
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: response.statusText }));
        throw new Error(errorData.detail || `API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Check if the FastAPI backend is healthy.
 * @returns {Promise<boolean>}
 */
export async function checkBackendHealth() {
    try {
        await request('/api/health');
        return true;
    } catch {
        return false;
    }
}

/**
 * Send a skin image to the AI analysis endpoint.
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<{scan_id: string, prediction: string, confidence: number, severity: string}>}
 */
export async function analyzeImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    
    return request('/api/analyze', {
        method: 'POST',
        body: formData
    });
}

/**
 * Fetch user profile from FastAPI (if using backend-managed profiles).
 * @returns {Promise<object>}
 */
export async function fetchBackendProfile() {
    return request('/api/profile');
}

/**
 * Fetch scan history from FastAPI (if using backend).
 * @returns {Promise<object[]>}
 */
export async function fetchBackendHistory() {
    return request('/api/history');
}

/**
 * Fetch a single scan by ID from FastAPI.
 * @param {string} scanId
 * @returns {Promise<object>}
 */
export async function fetchBackendScanDetail(scanId) {
    return request(`/api/history/${scanId}`);
}

/**
 * Fetch usage data from FastAPI.
 * @returns {Promise<object>}
 */
export async function fetchBackendUsage() {
    return request('/api/usage');
}

/**
 * Fetch plans from FastAPI.
 * @returns {Promise<object[]>}
 */
export async function fetchBackendPlans() {
    return request('/api/plans');
}

/**
 * Fetch notifications from FastAPI.
 * @returns {Promise<object[]>}
 */
export async function fetchBackendNotifications() {
    return request('/api/notifications');
}

export const api = {
    checkHealth: checkBackendHealth,
    analyzeImage,
    fetchProfile: fetchBackendProfile,
    fetchHistory: fetchBackendHistory,
    fetchScanDetail: fetchBackendScanDetail,
    fetchUsage: fetchBackendUsage,
    fetchPlans: fetchBackendPlans,
    fetchNotifications: fetchBackendNotifications,
};
