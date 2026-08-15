// assets/js/components/contact.js

export function Contact() {
    return `
        <div class="section pt-0" style="padding-top: 100px;">
            <div class="container">
                <header class="section-header text-center slide-up">
                    <h1 class="section-title">Get in Touch</h1>
                    <p class="section-subtitle">Have questions or feedback? We'd love to hear from you.</p>
                </header>

                <div class="contact-grid slide-up" style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1000px; margin: 0 auto;">
                    
                    <div class="contact-info">
                        <div class="glass-card" style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: center;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(0, 168, 150, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                <i class="fa-solid fa-location-dot"></i>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 0;">Our Location</h4>
                                <p style="margin-bottom: 0; font-size: 0.9rem;">123 Innovation Drive, Tech City</p>
                            </div>
                        </div>

                        <div class="glass-card" style="margin-bottom: 1.5rem; display: flex; gap: 1rem; align-items: center;">
                            <div style="width: 50px; height: 50px; border-radius: 50%; background: rgba(0, 168, 150, 0.1); color: var(--primary); display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                                <i class="fa-solid fa-envelope"></i>
                            </div>
                            <div>
                                <h4 style="margin-bottom: 0;">Email Us</h4>
                                <p style="margin-bottom: 0; font-size: 0.9rem;">support@skinorai.com</p>
                            </div>
                        </div>
                    </div>

                    <div class="contact-form glass-card">
                        <h3 style="margin-bottom: 1.5rem; color: var(--primary);">Send a Message</h3>
                        <form id="contact-form" style="display: flex; flex-direction: column; gap: 1rem;">
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Name</label>
                                <input type="text" style="width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: 8px; font-family: var(--font-family);" placeholder="Your Name" required>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Email</label>
                                <input type="email" style="width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: 8px; font-family: var(--font-family);" placeholder="your@email.com" required>
                            </div>
                            <div>
                                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Message</label>
                                <textarea style="width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); border-radius: 8px; font-family: var(--font-family); min-height: 120px;" placeholder="How can we help?" required></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Send Message <i class="fa-solid fa-paper-plane"></i></button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    `;
}

export function initContact() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Message sent successfully! We will get back to you soon.');
            form.reset();
        });
    }
}
