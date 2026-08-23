// assets/js/services/profile.js
// Profile CRUD operations against the Supabase 'profiles' table.

import { supabase } from './supabase.js';
import { state } from '../state.js';

/**
 * Fetch the current user's profile.
 * @returns {Promise<{profile: object|null, error: Error|null}>}
 */
export async function fetchProfile() {
    const user = state.get('currentUser');
    if (!user) return { profile: null, error: new Error('Not authenticated') };

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (!error && data) {
        state.set('profile', data);
    }
    return { profile: data, error };
}

/**
 * Update the current user's profile.
 * @param {object} updates - Fields to update
 * @returns {Promise<{profile: object|null, error: Error|null}>}
 */
export async function updateProfile(updates) {
    const user = state.get('currentUser');
    if (!user) return { profile: null, error: new Error('Not authenticated') };

    const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();

    if (!error && data) {
        state.set('profile', data);
    }
    return { profile: data, error };
}

/**
 * Get avatar URL — returns storage avatar, or falls back to ui-avatars.com
 * @param {object} profile
 * @param {object} user
 * @returns {string}
 */
export function getAvatarUrl(profile, user) {
    if (profile?.avatar_url && !profile.avatar_url.startsWith('http')) {
        // It's a storage path — will need signed URL (handled in component)
        return profile.avatar_url;
    }
    if (profile?.avatar_url) return profile.avatar_url;
    
    const firstName = profile?.first_name || user?.user_metadata?.first_name || 'U';
    const lastName = profile?.last_name || user?.user_metadata?.last_name || '';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName + '+' + lastName)}&background=00A896&color=fff&size=128`;
}

/**
 * Get the user's display name from profile or auth metadata.
 * @param {object} profile
 * @param {object} user
 * @returns {string}
 */
export function getDisplayName(profile, user) {
    if (profile?.first_name) return profile.first_name;
    if (user?.user_metadata?.first_name) return user.user_metadata.first_name;
    return user?.email?.split('@')[0] || 'User';
}

/**
 * Get the user's full name.
 * @param {object} profile
 * @param {object} user
 * @returns {string}
 */
export function getFullName(profile, user) {
    if (profile?.first_name || profile?.last_name) {
        return `${profile.first_name || ''} ${profile.last_name || ''}`.trim();
    }
    const meta = user?.user_metadata || {};
    return `${meta.first_name || ''} ${meta.last_name || ''}`.trim() || user?.email || 'User';
}

/**
 * Get initials for avatar fallback.
 * @param {object} profile
 * @param {object} user
 * @returns {string}
 */
export function getInitials(profile, user) {
    const firstName = profile?.first_name || user?.user_metadata?.first_name || '';
    const lastName = profile?.last_name || user?.user_metadata?.last_name || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
}
