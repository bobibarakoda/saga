<script>
/*<![CDATA[*/
        // Create a URL object from the current window location
        const currentUrl = new URL(window.location.href);
        const urlParams = currentUrl.searchParams;

        if (urlParams.has('saga')) {
            console.log("DEBUG SCRIPT: STEP 1 - URL check passed: '?saga' is in the URL.");

            const b = document.querySelectorAll('.product-container .buy-button');
            console.log("DEBUG SCRIPT: STEP 2 - Found buy buttons (b.length):", b.length);

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

            if (b.length > 0) {
                const firstProductContainer = document.querySelector('.product-container');
                console.log("DEBUG SCRIPT: STEP 3 - Found first product container:", firstProductContainer);
                if (firstProductContainer) {
                    smoothScrollTo(firstProductContainer, 2000);
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
