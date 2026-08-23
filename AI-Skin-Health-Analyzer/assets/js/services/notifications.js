// assets/js/services/notifications.js
// Notifications service

import { supabase } from './supabase.js';
import { state } from '../state.js';

/**
 * Fetch all notifications for the current user.
 * @returns {Promise<{notifications: object[], error: Error|null}>}
 */
export async function fetchNotifications() {
    const user = state.get('currentUser');
    if (!user) return { notifications: [], error: new Error('Not authenticated') };

    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

    if (!error && data) {
        state.set('notifications', data);
    }
    return { notifications: data || [], error };
}

/**
 * Get count of unread notifications.
 * @returns {Promise<number>}
 */
export async function getUnreadCount() {
    const user = state.get('currentUser');
    if (!user) return 0;

    const { count } = await supabase
        .from('notifications')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

    return count || 0;
}

/**
 * Mark a single notification as read.
 * @param {string} notificationId
 * @returns {Promise<{error: Error|null}>}
 */
export async function markAsRead(notificationId) {
    const user = state.get('currentUser');
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id);

    return { error };
}

/**
 * Mark all notifications as read.
 * @returns {Promise<{error: Error|null}>}
 */
export async function markAllAsRead() {
    const user = state.get('currentUser');
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

    return { error };
}
