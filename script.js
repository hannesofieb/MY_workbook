window.addEventListener('load', function() {
    const container = document.querySelector('.container');
    const flexItems = document.querySelectorAll('.flex-item');
    let totalWidth = 0;

    // Calculate the total width of flex items
    flexItems.forEach(item => {
        totalWidth += item.getBoundingClientRect().width;
    });

    console.log('Total Width:', totalWidth);

    // Get viewport width
    const viewportWidth = window.innerWidth;

    console.log('Viewport Width:', viewportWidth);

    // Set container width to the minimum of total width and viewport width
    container.style.width = `${Math.min(totalWidth, viewportWidth)}px`;

    console.log('Container Width:', container.style.width);

    // Calculate the overlap amount per flex item
    const overlapAmount = (totalWidth - viewportWidth) / (flexItems.length - 3);

    console.log('Overlap Amount:', overlapAmount);

    // Apply negative margin to create overlap
    flexItems.forEach((item, index) => {
        if (index !== 0) {
            item.style.marginLeft = `-${overlapAmount}px`;
        }
    });
});