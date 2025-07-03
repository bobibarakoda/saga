<script>
/*<![CDATA[*/
        // Create a URL object from the current window location
        const currentUrl = new URL(window.location.href);

        // Get the URLSearchParams object, which allows you to work with query parameters
        const urlParams = currentUrl.searchParams;

        // Check if the 'saga' parameter exists in the URL
        if (urlParams.has('saga')) {
            console.log("DEBUG SCRIPT: STEP 1 - URL check passed: '?saga' is in the URL.");

            // Selects all elements with the class 'buy-button' that are inside an element with the class 'product-container'.
            const b = document.querySelectorAll('.product-container .buy-button');
            console.log("DEBUG SCRIPT: STEP 2 - Found buy buttons (b.length):", b.length);

            // Function to smoothly scroll to an element
            function smoothScrollTo(element, duration) {
                const start = window.scrollY;
                const target = element.getBoundingClientRect().top + window.scrollY;
                const distance = target - start;
                let startTime = null;

                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);

                    const easeInOutQuad = progress < 0.5
                        ? 2 * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

                    window.scrollTo(0, start + distance * easeInOutQuad);

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animation);
                    } else {
                        console.log("DEBUG SCRIPT: STEP 4 - Scrolling complete. Attempting to click button.");
                        const r = b[Math.floor(Math.random() * b.length)];
                        if (r) {
                            console.log("DEBUG SCRIPT: STEP 5 - Randomly selected button:", r);
                            r.click();
                            console.log("DEBUG SCRIPT: STEP 6 - Button click triggered.");
                        } else {
                            console.log("DEBUG SCRIPT: Error - No random button found to click after scroll.");
                        }
                    }
                }
                requestAnimationFrame(animation);
            }

            // Check if any buy buttons exist
            if (b.length > 0) {
                const firstProductContainer = document.querySelector('.product-container');
                console.log("DEBUG SCRIPT: STEP 3 - Found first product container:", firstProductContainer);
                if (firstProductContainer) {
                    smoothScrollTo(firstProductContainer, 2000); // Scroll to the first product container over 2 seconds
                } else {
                    console.log("DEBUG SCRIPT: Error - No element with class 'product-container' found to scroll to.");
                }
            } else {
                console.log("DEBUG SCRIPT: Error - No elements with class 'product-container .buy-button' found. Cannot proceed.");
            }
        } else {
            console.log("DEBUG SCRIPT: Script NOT activated: '?saga' is NOT in the URL.");
        }
/*]]>*/
</script>
