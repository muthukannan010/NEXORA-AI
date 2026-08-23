// assets/js/components/Profile.js
import { state } from '../state.js';
import { fetchProfile, getDisplayName, getAvatarUrl, getFullName } from '../services/profile.js';
import { getTotalScanCount } from '../services/scans.js';
import { fetchUserSubscription, getPlanName } from '../services/plans.js';
import { getSignedUrl } from '../services/storage.js';
import { toast } from '../utils/toast.js';

export function Profile() {
    return `
        <div class="section profile-section fade-in" style="padding-top: 100px;">
            <div class="container profile-container">
                <div class="profile-card slide-up">
                    <div class="profile-header">
                        <div class="profile-avatar-wrapper">
                            <div class="profile-avatar-skeleton" id="avatar-skeleton"></div>
                            <img id="profile-avatar-img" src="" alt="Profile" class="profile-avatar" style="display:none;">
                        </div>
                        <div class="profile-title">
                            <h2 id="profile-full-name"><span class="skeleton-line"></span></h2>
                            <p id="profile-email"><span class="skeleton-line short"></span></p>
                        </div>
                    </div>
                    
                    <div class="profile-stats">
                        <div class="stat-box">
                            <h4 id="ps-total-scans">--</h4>
                            <p>Total Scans</p>
                        </div>
                        <div class="stat-box">
                            <h4 id="ps-plan">--</h4>
                            <p>Current Plan</p>
                        </div>
                        <div class="stat-box">
                            <h4 id="ps-joined">--</h4>
                            <p>Joined</p>
                        </div>
                    </div>

                    <div class="profile-info-grid">
                        <div class="info-item">
                            <label>First Name</label>
                            <div class="info-value" id="pi-first">--</div>
                        </div>
                        <div class="info-item">
                            <label>Last Name</label>
                            <div class="info-value" id="pi-last">--</div>
                        </div>
                        <div class="info-item">
                            <label>Email Address</label>
                            <div class="info-value" id="pi-email">--</div>
                        </div>
                        <div class="info-item">
                            <label>Phone</label>
                            <div class="info-value" id="pi-phone">--</div>
                        </div>
                        <div class="info-item">
                            <label>Date of Birth</label>
                            <div class="info-value" id="pi-dob">--</div>
                        </div>
                        <div class="info-item">
                            <label>Preferred Language</label>
                            <div class="info-value" id="pi-lang">--</div>
                        </div>
                    </div>
                    
                    <div class="profile-actions">
                        <a href="/edit-profile" data-link class="btn btn-primary">
                            <i class="fa-solid fa-pen"></i> Edit Profile
                        </a>
                        <a href="/security" data-link class="btn btn-outline">
                            <i class="fa-solid fa-shield-halved"></i> Security
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export async function initProfile(router) {
    const user = state.get('currentUser');
    if (!user) { router.navigateTo('/login'); return; }

    try {
        const [profileResult, totalResult, subResult] = await Promise.allSettled([
            fetchProfile(),
            getTotalScanCount(),
            fetchUserSubscription()
        ]);

        const profile = profileResult.status === 'fulfilled' ? profileResult.value.profile : null;
        const total = totalResult.status === 'fulfilled' ? totalResult.value : 0;

        // Avatar
        const avatarSkeleton = document.getElementById('avatar-skeleton');
        const avatarImg = document.getElementById('profile-avatar-img');
        const avatarUrl = getAvatarUrl(profile, user);

        async function loadAvatar() {
            let src = avatarUrl;
            if (avatarUrl && !avatarUrl.startsWith('http')) {
                const { url } = await getSignedUrl(avatarUrl);
                src = url || `https://ui-avatars.com/api/?name=${getFullName(profile, user)}&background=00A896&color=fff&size=128`;
            }
            if (avatarImg) {
                avatarImg.src = src;
                avatarImg.onload = () => {
                    avatarSkeleton?.remove();
                    avatarImg.style.display = 'block';
                };
                avatarImg.onerror = () => {
                    avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getFullName(profile, user))}&background=00A896&color=fff&size=128`;
                    avatarImg.style.display = 'block';
                    avatarSkeleton?.remove();
                };
            }
        }
        loadAvatar();

        // Profile info
        const fullName = getFullName(profile, user);
        const email = user.email || '';
        const joinedDate = new Date(user.created_at || Date.now()).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
        const langMap = { en: 'English', hi: 'Hindi', ta: 'Tamil', te: 'Telugu', kn: 'Kannada' };

        const setText = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || '--'; };

        setText('profile-full-name', fullName);
        setText('profile-email', email);
        setText('pi-first', profile?.first_name || user.user_metadata?.first_name || '--');
        setText('pi-last', profile?.last_name || user.user_metadata?.last_name || '--');
        setText('pi-email', email);
        setText('pi-phone', profile?.phone || '--');
        setText('pi-dob', profile?.date_of_birth ? new Date(profile.date_of_birth).toLocaleDateString('en-IN') : '--');
        setText('pi-lang', langMap[profile?.preferred_language] || profile?.preferred_language || 'English');
        setText('ps-total-scans', String(total));
        setText('ps-plan', getPlanName());
        setText('ps-joined', joinedDate);
    } catch (err) {
        console.error('Profile load error:', err);
        toast.error('Unable to load profile data.');
    }
}
