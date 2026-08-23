// assets/js/services/storage.js
// Supabase Storage service for profile avatars and scan images.
// Bucket: skin-images (must be PRIVATE in Supabase dashboard)

import { supabase } from './supabase.js';

const BUCKET = 'skin-images';

/**
 * Upload a profile avatar image.
 * @param {string} userId
 * @param {File} file
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export async function uploadAvatar(userId, file) {
    const ext = file.name.split('.').pop().toLowerCase();
    const path = `${userId}/profile/avatar.${ext}`;

    const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) return { url: null, error: uploadError };

    // Get a public URL (only works if bucket is public, otherwise use signed URL)
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return { url: data?.publicUrl || null, error: null };
}

/**
 * Upload a scan image.
 * @param {string} userId
 * @param {File|Blob} file
 * @param {string} scanId
 * @returns {Promise<{url: string|null, path: string|null, error: Error|null}>}
 */
export async function uploadScanImage(userId, file, scanId) {
    const ext = file.type === 'image/jpeg' ? 'jpg' : 'png';
    const path = `${userId}/scans/${scanId}.${ext}`;

    const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { upsert: true, contentType: file.type || 'image/jpeg' });

    if (uploadError) return { url: null, path: null, error: uploadError };

    return { url: path, path, error: null };
}

/**
 * Get a signed URL for a private scan image.
 * @param {string} path - The storage path (e.g., userId/scans/xyz.jpg)
 * @param {number} expiresIn - Seconds until expiry (default 3600)
 * @returns {Promise<{url: string|null, error: Error|null}>}
 */
export async function getSignedUrl(path, expiresIn = 3600) {
    if (!path) return { url: null, error: null };
    
    // If it's already a full URL, return as-is
    if (path.startsWith('http')) return { url: path, error: null };

    const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(path, expiresIn);

    return { url: data?.signedUrl || null, error };
}

/**
 * Delete a file from storage.
 * @param {string} path
 * @returns {Promise<{error: Error|null}>}
 */
export async function deleteStorageFile(path) {
    const { error } = await supabase.storage.from(BUCKET).remove([path]);
    return { error };
}
