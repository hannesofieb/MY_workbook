<script>"use strict";

        document.addEventListener("click", event => {
            const img = event.target.closest(".toggle-image");
            if (img && img.nextElementSibling.tagName === "FIGCAPTION") {
                img.nextElementSibling.classList.toggle("hidden");
            }
        });
</script>

// What you could do is create a function which resizes your image and caption, by applying new class 
// names that have styling to make tgh eimage full page width