// assets/js/services/auth.js
// Supabase Authentication service layer

import { supabase } from './supabase.js';
import { state } from '../state.js';

/**
 * Register a new user.
 * @param {object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.firstName
 * @param {string} params.lastName
 * @returns {Promise<{data, error}>}
 */
export async function signUp({ email, password, firstName, lastName }) {
    const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
            data: {
                first_name: firstName.trim(),
                last_name: lastName.trim(),
                full_name: `${firstName.trim()} ${lastName.trim()}`
            }
        }
    });
    return { data, error };
}

/**
 * Sign in with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{data, error}>}
 */
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
    });
    if (!error && data.user) {
        state.set('currentUser', data.user);
        state.set('session', data.session);
    }
    return { data, error };
}

/**
 * Sign out the current user.
 * @returns {Promise<{error}>}
 */
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        state.set('currentUser', null);
        state.set('session', null);
        state.set('profile', null);
        state.set('currentPlan', null);
        state.set('usage', null);
    }
    return { error };
}

/**
 * Get the current session without re-fetching from server.
 * @returns {Promise<{session, user}>}
 */
export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (session) {
        state.set('currentUser', session.user);
        state.set('session', session);
    }
    return { session, error };
}

/**
 * Send a password reset email.
 * @param {string} email
 * @returns {Promise<{error}>}
 */
export async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/security`
    });
    return { error };
}

/**
 * Update the current user's password.
 * @param {string} newPassword
 * @returns {Promise<{error}>}
 */
export async function updatePassword(newPassword) {
    const { data, error } = await supabase.auth.updateUser({ password: newPassword });
    return { data, error };
}

/**
 * Resend email verification.
 * @param {string} email
 * @returns {Promise<{error}>}
 */
export async function resendVerification(email) {
    const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email.trim()
    });
    return { error };
}

/**
 * Subscribe to auth state changes.
 * @param {function} callback - Called with (event, session)
 * @returns {function} Unsubscribe function
 */
export function onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
}
