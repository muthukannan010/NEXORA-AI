// assets/js/components/EditProfile.js
import { state } from '../state.js';
import { fetchProfile, updateProfile, getAvatarUrl } from '../services/profile.js';
import { uploadAvatar, getSignedUrl } from '../services/storage.js';
import { toast } from '../utils/toast.js';

export function EditProfile() {
    return `
        <div class="section profile-section fade-in" style="padding-top: 100px;">
            <div class="container profile-container">
                <div class="profile-card slide-up">
                    <div class="profile-header">
                        <div class="profile-avatar-edit-wrapper">
                            <img id="edit-avatar-img" src="https://ui-avatars.com/api/?name=User&background=00A896&color=fff&size=128" alt="Profile Avatar" class="profile-avatar">
                            <label for="avatar-upload" class="avatar-edit-btn" title="Change photo">
                                <i class="fa-solid fa-camera"></i>
                            </label>
                            <input type="file" id="avatar-upload" accept="image/jpeg,image/png,image/webp" style="display:none;">
                        </div>
                        <div class="profile-title">
                            <h2>Edit Profile</h2>
                            <p>Update your personal information.</p>
                        </div>
                    </div>
                    
                    <form id="edit-profile-form" novalidate>
                        <div class="form-row-2" style="margin-bottom: 24px;">
                            <div class="form-group">
                                <label for="edit-fname">First Name <span class="required">*</span></label>
                                <input type="text" id="edit-fname" class="form-control" required autocomplete="given-name">
                            </div>
                            <div class="form-group">
                                <label for="edit-lname">Last Name <span class="required">*</span></label>
                                <input type="text" id="edit-lname" class="form-control" required autocomplete="family-name">
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 24px;">
                            <label for="edit-email">Email Address</label>
                            <input type="email" id="edit-email" class="form-control" disabled style="opacity:0.6; cursor:not-allowed;">
                            <small class="form-hint">Email cannot be changed here.</small>
                        </div>

                        <div class="form-row-2" style="margin-bottom: 24px;">
                            <div class="form-group">
                                <label for="edit-phone">Phone Number</label>
                                <input type="tel" id="edit-phone" class="form-control" placeholder="+91 98765 43210" autocomplete="tel">
                            </div>
                            <div class="form-group">
                                <label for="edit-dob">Date of Birth</label>
                                <input type="date" id="edit-dob" class="form-control">
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 32px;">
                            <label for="edit-lang">Preferred Language</label>
                            <select id="edit-lang" class="form-control">
                                <option value="en">English</option>
                                <option value="hi">Hindi</option>
                                <option value="ta">Tamil</option>
                                <option value="te">Telugu</option>
                                <option value="kn">Kannada</option>
                            </select>
                        </div>
                        
                        <div class="profile-actions">
                            <button type="submit" class="btn btn-primary" id="save-profile-btn">
                                <i class="fa-solid fa-check"></i> Save Changes
                            </button>
                            <a href="/profile" data-link class="btn btn-outline">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

export async function initEditProfile(router) {
    const user = state.get('currentUser');
    if (!user) { router.navigateTo('/login'); return; }

    // Load existing profile data
    const { profile } = await fetchProfile().catch(() => ({ profile: null }));

    // Populate form
    const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
    setVal('edit-fname', profile?.first_name || user.user_metadata?.first_name || '');
    setVal('edit-lname', profile?.last_name || user.user_metadata?.last_name || '');
    setVal('edit-email', user.email || '');
    setVal('edit-phone', profile?.phone || '');
    setVal('edit-dob', profile?.date_of_birth || '');
    setVal('edit-lang', profile?.preferred_language || 'en');

    // Load avatar
    const avatarImg = document.getElementById('edit-avatar-img');
    if (avatarImg) {
        const rawUrl = getAvatarUrl(profile, user);
        if (rawUrl && !rawUrl.startsWith('http')) {
            const { url } = await getSignedUrl(rawUrl);
            if (url) avatarImg.src = url;
        } else if (rawUrl) {
            avatarImg.src = rawUrl;
        }
    }

    // Avatar upload preview
    const avatarUpload = document.getElementById('avatar-upload');
    if (avatarUpload && avatarImg) {
        avatarUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Image too large. Maximum size is 5MB.');
                return;
            }
            const reader = new FileReader();
            reader.onload = (ev) => { avatarImg.src = ev.target.result; };
            reader.readAsDataURL(file);
        });
    }

    // Form submission
    const form = document.getElementById('edit-profile-form');
    const saveBtn = document.getElementById('save-profile-btn');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const firstName = document.getElementById('edit-fname')?.value?.trim() || '';
            const lastName = document.getElementById('edit-lname')?.value?.trim() || '';

            if (!firstName || !lastName) {
                toast.error('First name and last name are required.');
                return;
            }

            const originalHTML = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            saveBtn.disabled = true;

            try {
                let avatarUrl = profile?.avatar_url;

                // Upload new avatar if selected
                const avatarFile = avatarUpload?.files[0];
                if (avatarFile) {
                    toast.info('Uploading profile photo...');
                    const { url, error: uploadErr } = await uploadAvatar(user.id, avatarFile);
                    if (uploadErr) {
                        toast.warning('Profile photo upload failed — profile will be updated without new photo.');
                    } else {
                        avatarUrl = url;
                    }
                }

                const updates = {
                    first_name: firstName,
                    last_name: lastName,
                    phone: document.getElementById('edit-phone')?.value?.trim() || null,
                    date_of_birth: document.getElementById('edit-dob')?.value || null,
                    preferred_language: document.getElementById('edit-lang')?.value || 'en',
                    avatar_url: avatarUrl
                };

                const { error } = await updateProfile(updates);
                if (error) throw error;

                toast.success('Profile updated successfully!');
                router.navigateTo('/profile');
            } catch (err) {
                console.error('Profile update error:', err);
                toast.error(err.message || 'Failed to update profile. Please try again.');
            } finally {
                saveBtn.innerHTML = originalHTML;
                saveBtn.disabled = false;
            }
        });
    }
}
