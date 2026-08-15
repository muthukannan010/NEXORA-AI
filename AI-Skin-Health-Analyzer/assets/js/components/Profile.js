// assets/js/components/Profile.js
import { state } from '../state.js';
import { supabase } from '../services/supabase.js';

export function Profile() {
    const user = state.get('currentUser') || { 
        email: 'user@example.com', 
        user_metadata: { first_name: 'John', last_name: 'Doe' },
        created_at: new Date().toISOString()
    };
    
    const firstName = user.user_metadata?.first_name || 'User';
    const lastName = user.user_metadata?.last_name || '';
    const email = user.email || '';
    
    const joinedDate = new Date(user.created_at || Date.now()).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return `
        <div class="section profile-section fade-in">
            <div class="container profile-container">
                <div class="profile-card slide-up">
                    <div class="profile-header">
                        <img src="https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=00A896&color=fff&size=128" alt="Profile Avatar" class="profile-avatar">
                        <div class="profile-title">
                            <h2>User Profile</h2>
                            <p>Manage your account settings and preferences.</p>
                        </div>
                    </div>
                    
                    <div class="profile-stats">
                        <div class="stat-box">
                            <h4>12</h4>
                            <p>Total Scans</p>
                        </div>
                        <div class="stat-box">
                            <h4>Pro</h4>
                            <p>Subscription</p>
                        </div>
                    </div>

                    <div class="profile-info-grid">
                        <div class="info-item">
                            <label>First Name</label>
                            <div class="info-value">${firstName}</div>
                        </div>
                        <div class="info-item">
                            <label>Last Name</label>
                            <div class="info-value">${lastName}</div>
                        </div>
                        <div class="info-item">
                            <label>Email Address</label>
                            <div class="info-value">${email}</div>
                        </div>
                        <div class="info-item">
                            <label>Joined Date</label>
                            <div class="info-value">${joinedDate}</div>
                        </div>
                    </div>
                    
                    <div class="profile-actions">
                        <a href="/edit-profile" data-link class="btn btn-primary"><i class="fa-solid fa-pen"></i> Edit Profile</a>
                        <button id="logout-btn" class="btn btn-outline" style="color: var(--danger); border-color: var(--danger);"><i class="fa-solid fa-right-from-bracket"></i> Logout</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function initProfile(router) {
    if (!state.get('currentUser')) {
        router.navigateTo('/login');
        return;
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            if (typeof supabase !== 'undefined' && supabase.auth) {
                await supabase.auth.signOut();
            }
            state.set('currentUser', null);
            state.set('session', null);
            router.navigateTo('/');
        });
    }
}
