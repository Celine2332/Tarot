function createStars() {
    for (let i = 0; i < 27; i++) {
        const star = document.createElement('div');

        star.classList.add('star');

        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';

        star.style.animationDelay =
            Math.random() * 1.8 + 's';

        document.body.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createStars();
});