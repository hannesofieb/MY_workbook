function captionAppear(){
    document.addEventListener("click", event => {
        const img = event.target.closest(".toggle-image");
        if (img && img.nextElementSibling.tagName === "FIGCAPTION") {
            img.nextElementSibling.classList.toggle("hidden");
        }
    });
}

// What you could do is create a function which resizes your image and caption, by applying new class 
// names that have styling to make tgh eimage full page width


function pageScroll() {
    window.scrollBy(1,0);
    scrolldelay = setTimeout(pageScroll,10);
}

function scrollHorizontally(e) {
    e = window.event || e;
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    var scrollSpeed = 60; // Janky jank <<<<<<<<<<<<<<
    document.documentElement.scrollLeft -= (delta * scrollSpeed);
    document.body.scrollLeft -= (delta * scrollSpeed);
    e.preventDefault();
  }
  