// Check if the current URL ends with '/?saga'
const currentUrl = window.location.href;
if (currentUrl.endsWith('/?saga')) {

    // Selects all elements with the class 'buy-button' that are inside an element with the class 'product-container'.
    const b = document.querySelectorAll('.product-container .buy-button');

    // Function to smoothly scroll to an element
    function smoothScrollTo(element, duration) {
        const start = window.scrollY;
        const target = element.getBoundingClientRect().top + window.scrollY;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Ensure progress doesn't exceed 1

            // Easing function for a more natural scroll (e.g., easeInOutQuad)
            const easeInOutQuad = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            window.scrollTo(0, start + distance * easeInOutQuad);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // This 'else' block runs once the scrolling is complete.
                // Randomly select and "click" the buy button immediately after scroll ends.
                const r = b[Math.floor(Math.random() * b.length)];
                if (r) {
                    r.click(); // Trigger the click event on the randomly selected button
                }
            }
        }
        requestAnimationFrame(animation);
    }

    // Check if any buy buttons exist
    if (b.length > 0) {
        // Scroll to the first product container (or a good general target)
        const firstProductContainer = document.querySelector('.product-container');
        if (firstProductContainer) {
            smoothScrollTo(firstProductContainer, 2000); // Scroll to the first product container over 2 seconds
        }
    }
}