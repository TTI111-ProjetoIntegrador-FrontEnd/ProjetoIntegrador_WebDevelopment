let lastScrollTop = 0;
const footer = document.getElementById('rodape');
const scrollThreshold = 1; // Change this value to adjust when the footer appears

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold && scrollTop > lastScrollTop) {
        footer.classList.remove('hidden'); // Show footer when scrolling down past the threshold
    } else {
        footer.classList.add('hidden'); // Hide footer when scrolling up
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});
