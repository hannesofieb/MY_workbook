document.addEventListener("DOMContentLoaded", function() {
    var container = document.querySelector(".container");
    var overlay = document.getElementById("overlay");
    var refreshButton = document.getElementById("refreshButton");
    var filterButtons = document.querySelectorAll(".filter");

    var itemsArray = Array.from(document.querySelectorAll(".item")); // Array of all .item elements
    var itemsShuffled = []; // Array to store shuffled items

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
    function showFirst12() {
        container.innerHTML = ""; // Clear container
        
        // Loop through the first 12 items in itemsShuffled and append them to the container
        for (var i = 0; i < 12; i++) {
            container.appendChild(itemsShuffled[i]);
        }
    }

    // Function to show only items with specific class and shuffle them before display
    function filterAndShuffleItems(classToDisplay) {
        // Clear container
        container.innerHTML = "";

        // Create an array to store filtered items
        var filteredItems = [];

        // Loop through itemsArray and add items with the specified class to filteredItems
        itemsArray.forEach(function(item) {
            if (item.classList.contains(classToDisplay) || classToDisplay === "all") {
                filteredItems.push(item);
            }
        });

        // Shuffle filtered items
        filteredItems = shuffleArray(filteredItems);

        // Loop through the first 12 items in filteredItems and append them to the container
        for (var i = 0; i < 12 && i < filteredItems.length; i++) {
            container.appendChild(filteredItems[i]);
        }
    }

    // Initial randomization of items
    itemsShuffled = shuffleArray(itemsArray);
    showFirst12();

    // Event listener for filter button click
    filterButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            var classToDisplay = button.id;
            filterAndShuffleItems(classToDisplay);
        });
    });

    // Event listener for refresh button click
    refreshButton.addEventListener("click", function() {
        itemsShuffled = shuffleArray(itemsArray); // Shuffle items
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