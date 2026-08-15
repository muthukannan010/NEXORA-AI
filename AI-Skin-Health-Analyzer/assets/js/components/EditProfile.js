// assets/js/components/EditProfile.js
import { state } from '../state.js';

export function EditProfile() {
    const user = state.get('currentUser') || { 
        email: 'user@example.com', 
        user_metadata: { first_name: 'John', last_name: 'Doe', phone: '' }
    };
    
    const firstName = user.user_metadata?.first_name || '';
    const lastName = user.user_metadata?.last_name || '';
    const email = user.email || '';
    const phone = user.user_metadata?.phone || '';

    return `
        <div class="section profile-section fade-in">
            <div class="container profile-container">
                <div class="profile-card slide-up">
                    <div class="profile-header">
                        <div style="position: relative; display: inline-block;">
                            <img src="https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=00A896&color=fff&size=128" alt="Profile Avatar" class="profile-avatar" id="edit-avatar">
                            <button class="btn-icon" style="position: absolute; bottom: 0; right: 0; background: var(--primary); color: white; border: 2px solid var(--surface);"><i class="fa-solid fa-camera"></i></button>
                        </div>
                        <div class="profile-title">
                            <h2>Edit Profile</h2>
                            <p>Update your personal information.</p>
                        </div>
                    </div>
                    
                    <form id="edit-profile-form">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
                            <div class="form-group">
                                <label for="edit-fname">First Name</label>
                                <input type="text" id="edit-fname" class="form-control" value="${firstName}" required>
                            </div>
                            <div class="form-group">
                                <label for="edit-lname">Last Name</label>
                                <input type="text" id="edit-lname" class="form-control" value="${lastName}" required>
                            </div>
                        </div>

                        <div class="form-group" style="margin-bottom: 24px;">
                            <label for="edit-email">Email Address</label>
                            <input type="email" id="edit-email" class="form-control" value="${email}" disabled style="background: var(--background); cursor: not-allowed;">
                            <small class="text-muted" style="font-size: 0.8rem; margin-top: 4px; display: block;">Email cannot be changed.</small>
                        </div>

                        <div class="form-group" style="margin-bottom: 32px;">
                            <label for="edit-phone">Phone Number</label>
                            <input type="tel" id="edit-phone" class="form-control" value="${phone}" placeholder="+1 (555) 000-0000">
                        </div>
                        
                        <div class="profile-actions">
                            <button type="submit" class="btn btn-primary" id="save-profile-btn">Save Changes</button>
                            <a href="/profile" data-link class="btn btn-outline">Cancel</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

export function initEditProfile(router) {
    if (!state.get('currentUser')) {
        router.navigateTo('/login');
        return;
    }

    const form = document.getElementById('edit-profile-form');
    const saveBtn = document.getElementById('save-profile-btn');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
            saveBtn.disabled = true;

            // Mock save logic
            setTimeout(() => {
                const currentUser = state.get('currentUser');
                currentUser.user_metadata.first_name = document.getElementById('edit-fname').value;
                currentUser.user_metadata.last_name = document.getElementById('edit-lname').value;
                currentUser.user_metadata.phone = document.getElementById('edit-phone').value;
                state.set('currentUser', currentUser);
                
                alert('Profile updated successfully!');
                router.navigateTo('/profile');
            }, 800);
        });
    }
}
