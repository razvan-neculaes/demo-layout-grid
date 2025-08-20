document.querySelectorAll('.footer-col').forEach((col) => {
    const button = col.querySelector('.toggle-button');
    const content = col.querySelector('.collapsible-content');

    button.addEventListener('click', () => {
        const isActive = col.classList.toggle('active');
        button.textContent = isActive ? '-' : '+';
    });
});
