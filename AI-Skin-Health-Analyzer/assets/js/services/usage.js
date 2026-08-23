// assets/js/services/usage.js
// Scan usage tracking service

import { supabase } from './supabase.js';
import { state } from '../state.js';

/**
 * Fetch usage data for the current month.
 * @returns {Promise<{usage: object|null, error: Error|null}>}
 */
export async function fetchCurrentUsage() {
    const user = state.get('currentUser');
    if (!user) return { usage: null, error: new Error('Not authenticated') };

    const now = new Date();
    const month = now.getMonth() + 1; // 1-based
    const year = now.getFullYear();

    const { data, error } = await supabase
        .from('scan_usage')
        .select('*')
        .eq('user_id', user.id)
        .eq('month', month)
        .eq('year', year)
        .single();

    if (!error && data) {
        state.set('usage', data);
    }

    // If no record exists yet, return zero usage
    if (error?.code === 'PGRST116') {
        const emptyUsage = { user_id: user.id, month, year, used: 0, successful: 0, failed: 0 };
        state.set('usage', emptyUsage);
        return { usage: emptyUsage, error: null };
    }

    return { usage: data, error };
}

/**
 * Increment scan usage by 1. Called after a successful analysis.
 * @param {boolean} success
 * @returns {Promise<{error: Error|null}>}
 */
export async function incrementUsage(success = true) {
    const user = state.get('currentUser');
    if (!user) return { error: new Error('Not authenticated') };

    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    // Upsert: increment or create
    const { error } = await supabase.rpc('increment_scan_usage', {
        p_user_id: user.id,
        p_month: month,
        p_year: year,
        p_success: success
    });

    return { error };
}

/**
 * Calculate remaining scans.
 * @param {object} usage - Current usage record
 * @param {number} limit - Plan scan limit (-1 = unlimited)
 * @returns {number|string}
 */
export function getRemainingScans(usage, limit) {
    if (limit === -1) return 'Unlimited';
    return Math.max(0, limit - (usage?.used || 0));
}

/**
 * Check if the user can perform another scan.
 * @param {object} usage
 * @param {number} limit
 * @returns {boolean}
 */
export function canScan(usage, limit) {
    if (limit === -1) return true;
    return (usage?.used || 0) < limit;
}
