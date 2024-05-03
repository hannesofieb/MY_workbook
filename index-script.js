
document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector(".container");
    var overlay = document.getElementById("overlay");
    var refreshButton = document.getElementById("refreshButton");
    var filterButtons = document.querySelectorAll(".filter");

    var itemsArray = Array.from(document.querySelectorAll(".item")); // Array of all .item elements
    var itemsShuffled = []; // Array to store shuffled items

    // Function to shuffle array and assign it to itemsShuffled
    function shuffleItems() {
        // Create a copy of itemsArray
        var shuffledItems = itemsArray.slice();
        
        // Shuffle the copied array
        for (var i = shuffledItems.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffledItems[i];
            shuffledItems[i] = shuffledItems[j];
            shuffledItems[j] = temp;
        }
        
        // Assign the shuffled array to itemsShuffled
        itemsShuffled = shuffledItems;
    }

    // Function to show only the first 12 items
    function showFirst12() {
        container.innerHTML = ""; // Clear container
        
        // Loop through the first 12 items in itemsShuffled and append them to the container
        for (var i = 0; i < 12; i++) {
            container.appendChild(itemsShuffled[i]);
        }
    }

    // Function to show only items with specific class
    function filterItems(classToDisplay) {
        // Clear container
        container.innerHTML = "";
        
        // Loop through itemsArray and display items with the specified class
        itemsArray.forEach(function(item) {
            if (item.classList.contains(classToDisplay) || classToDisplay === "all") {
                container.appendChild(item);
            }
        });
    }

    // Initial randomization of items
    shuffleItems();
    showFirst12();

    // Event listener for filter button click
    filterButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var classToDisplay = button.id;
            filterItems(classToDisplay);
        });
    });

    // Event listener for refresh button click
    refreshButton.addEventListener("click", function() {
        shuffleItems(); // Shuffle items
        showFirst12(); // Display first 12 shuffled items
    });

    // Event listener for clicking on item
    itemsArray.forEach(function(item) {
        item.addEventListener("click", function() {
            if (!item.classList.contains("full-screen")) {
                // Remove full-screen class from all items
                itemsArray.forEach(function(item) {
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
        itemsArray.forEach(function(item) {
            item.classList.remove("full-screen");
        });
        // Hide overlay
        overlay.style.opacity = "0";
        overlay.style.pointerEvents = "none";
    });
});





// Generated through prompt engineering with ChatGPT, then i personally tweaked a few details to fit my code