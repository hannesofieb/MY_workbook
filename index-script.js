const figures = document.querySelectorAll('.item');

        figures.forEach(figure => {
            figure.addEventListener('click', () => {
                figure.classList.toggle('fullscreen');
            });
        });