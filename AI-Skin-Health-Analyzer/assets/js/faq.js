/*
 * FAQ Accordion Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            // Close other open items
            const currentActive = document.querySelector('.accordion-item.active');
            if (currentActive && currentActive !== item) {
                currentActive.classList.remove('active');
                currentActive.querySelector('.accordion-content').style.maxHeight = 0;
            }
            
            // Toggle current item
            item.classList.toggle('active');
            
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });
});
