<script>
/*<![CDATA[*/
        // Create a URL object from the current window location
        const currentUrl = new URL(window.location.href);

        // Get the URLSearchParams object, which allows you to work with query parameters
        const urlParams = currentUrl.searchParams;

        // Check if the 'saga' parameter exists in the URL
        if (urlParams.has('saga')) {
            console.log("Script activated: '?saga' is in the URL."); // STEP 1: Check URL

            // Selects all elements with the class 'buy-button' that are inside an element with the class 'product-container'.
            const b = document.querySelectorAll('.product-container .buy-button');
            console.log("Found buy buttons (b.length):", b.length); // STEP 2: Check found buttons

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
                        console.log("Scrolling complete. Attempting to click button."); // STEP 4: After scroll
                        const r = b[Math.floor(Math.random() * b.length)];
                        if (r) {
                            console.log("Randomly selected button:", r); // STEP 5: Selected button
                            r.click(); // Trigger the click event on the randomly selected button
                            console.log("Button click triggered."); // STEP 6: Click triggered
                        } else {
                            console.log("Error: No random button found to click after scroll."); // Fallback
                        }
                    }
                }
                requestAnimationFrame(animation);
            }

            // Check if any buy buttons exist
            if (b.length > 0) {
                const firstProductContainer = document.querySelector('.product-container');
                console.log("Found first product container:", firstProductContainer); // STEP 3: Check first product container
                if (firstProductContainer) {
                    smoothScrollTo(firstProductContainer, 2000); // Scroll to the first product container over 2 seconds
                } else {
                    console.log("No element with class 'product-container' found to scroll to."); // Fallback
                }
            } else {
                console.log("No elements with class 'product-container .buy-button' found. Cannot proceed with scroll/click."); // Fallback
            }
        } else {
            console.log("Script NOT activated: '?saga' is NOT in the URL."); // Check if the initial condition fails
        }
/*]]>*/
</script>
