// assets/js/services/plans.js
// Plans and subscriptions service

import { supabase } from './supabase.js';
import { state } from '../state.js';

/**
 * Fetch all available plans.
 * @returns {Promise<{plans: object[], error: Error|null}>}
 */
export async function fetchPlans() {
    const { data, error } = await supabase
        .from('plans')
        .select('*')
        .order('price', { ascending: true });

    return { plans: data || [], error };
}

/**
 * Fetch the current user's active subscription (with plan details).
 * @returns {Promise<{subscription: object|null, error: Error|null}>}
 */
export async function fetchUserSubscription() {
    const user = state.get('currentUser');
    if (!user) return { subscription: null, error: new Error('Not authenticated') };

    const { data, error } = await supabase
        .from('subscriptions')
        .select(`
            *,
            plans (
                id, name, price, currency, scan_limit, features
            )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!error && data) {
        state.set('currentPlan', data);
    }
    return { subscription: data, error };
}

/**
 * Get the scan limit for the current plan.
 * Returns -1 for unlimited, or the numeric limit.
 * @returns {number}
 */
export function getPlanScanLimit() {
    const plan = state.get('currentPlan');
    return plan?.plans?.scan_limit ?? 5; // Default free limit
}

/**
 * Check if a user-friendly plan name exists.
 * @returns {string}
 */
export function getPlanName() {
    const plan = state.get('currentPlan');
    return plan?.plans?.name || 'FREE';
}
