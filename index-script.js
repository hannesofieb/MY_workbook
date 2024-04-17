
document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector(".container");
    var items = Array.from(document.querySelectorAll(".item"));
    var overlay = document.getElementById("overlay");
    var refreshButton = document.getElementById("refreshButton");

    // Function to shuffle array
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    // Function to show only the first 12 items
    function showFirst12(array) {
        array.slice(0, 12).forEach(function(item) {
            item.style.display = "block";
            container.appendChild(item);
        });
    }

    // Initial randomization and showing first 12
    items = shuffleArray(items);
    showFirst12(items);

    // Event listener for button click
    refreshButton.addEventListener("click", function() {
        // Clear container
        container.innerHTML = "";
        
        // Shuffle array again
        items = shuffleArray(items);

        // Show first 12 items
        showFirst12(items);
    });

    items.forEach(function(item) {
        item.addEventListener("click", function() {
            if (!item.classList.contains("full-screen")) {
                // Remove full-screen class from all items
                items.forEach(function(item) {
                    item.classList.remove("full-screen");
                });
                // Add full-screen class to clicked item
                item.classList.add("full-screen");
                // Show overlay
                overlay.style.opacity = "1";
                overlay.style.pointerEvents = "auto";
            } else {
                // Remove full-screen class from clicked item
                item.classList.remove("full-screen");
                // Hide overlay
                overlay.style.opacity = "0";
                overlay.style.pointerEvents = "none";
            }
        });
    });

    // Add event listener to overlay to return image to original view
    overlay.addEventListener("click", function() {
        // Remove full-screen class from all items
        items.forEach(function(item) {
            item.classList.remove("full-screen");
        });
        // Hide overlay
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
    });
});


// Generated through prompt engineering with ChatGPT, then i personally tweaked a few details to fit my code