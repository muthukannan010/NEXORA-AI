// assets/js/services/scans.js
// Scan history CRUD operations against the Supabase 'scan_history' table.

import { supabase } from './supabase.js';
import { state } from '../state.js';

/**
 * Fetch the current user's scan history.
 * @param {object} options
 * @param {number} options.limit
 * @param {number} options.offset
 * @returns {Promise<{scans: object[], error: Error|null}>}
 */
export async function fetchScanHistory({ limit = 50, offset = 0 } = {}) {
    const user = state.get('currentUser');
    if (!user) return { scans: [], error: new Error('Not authenticated') };

    const { data, error } = await supabase
        .from('scan_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

    return { scans: data || [], error };
}

/**
 * Fetch a single scan by ID (only accessible by owner).
 * @param {string} scanId
 * @returns {Promise<{scan: object|null, error: Error|null}>}
 */
export async function fetchScanById(scanId) {
    const user = state.get('currentUser');
    if (!user) return { scan: null, error: new Error('Not authenticated') };

    const { data, error } = await supabase
        .from('scan_history')
        .select(`
            *,
            skin_diseases (
                name, description, symptoms, causes, supportive_care,
                medical_info, foods_lifestyle, prevention, doctor_guidance,
                emergency_signs, severity_level
            )
        `)
        .eq('id', scanId)
        .eq('user_id', user.id)
        .single();

    return { scan: data, error };
}

/**
 * Save a new scan result to the database.
 * @param {object} scanData
 * @returns {Promise<{scan: object|null, error: Error|null}>}
 */
export async function saveScan(scanData) {
    const user = state.get('currentUser');
    if (!user) return { scan: null, error: new Error('Not authenticated') };

    const { data, error } = await supabase
        .from('scan_history')
        .insert({
            user_id: user.id,
            ...scanData
        })
        .select()
        .single();

    return { scan: data, error };
}

/**
 * Delete a scan by ID (only accessible by owner — enforced via RLS).
 * @param {string} scanId
 * @returns {Promise<{error: Error|null}>}
 */
export async function deleteScan(scanId) {
    const user = state.get('currentUser');
    if (!user) return { error: new Error('Not authenticated') };

    const { error } = await supabase
        .from('scan_history')
        .delete()
        .eq('id', scanId)
        .eq('user_id', user.id);

    return { error };
}

/**
 * Get the total scan count for the current user.
 * @returns {Promise<number>}
 */
export async function getTotalScanCount() {
    const user = state.get('currentUser');
    if (!user) return 0;

    const { count } = await supabase
        .from('scan_history')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id);

    return count || 0;
}

/**
 * Get scan count for the current month.
 * @returns {Promise<number>}
 */
export async function getMonthScanCount() {
    const user = state.get('currentUser');
    if (!user) return 0;

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    const { count } = await supabase
        .from('scan_history')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', start)
        .lte('created_at', end);

    return count || 0;
}
