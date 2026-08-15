// assets/js/utils/scrollAnimations.js

export function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const observeElements = () => {
        const animatedElements = document.querySelectorAll('.slide-up, .fade-in, .feature-card, .detail-card');
        animatedElements.forEach((el, index) => {
            // Remove previous inline animations to let classes handle it
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    };

    // Initial observe
    observeElements();

    // Re-observe on DOM changes (for SPA navigation)
    const routerView = document.getElementById('router-view');
    if (routerView) {
        const mutationObserver = new MutationObserver(() => {
            observeElements();
        });
        mutationObserver.observe(routerView, { childList: true, subtree: true });
    }
}
