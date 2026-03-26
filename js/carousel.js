document.addEventListener('DOMContentLoaded', function () {

    var track = document.querySelector('.carousel-track');
    var slides = document.querySelectorAll('.testimonial-card');
    var prevBtn = document.querySelector('.carousel-btn.prev');
    var nextBtn = document.querySelector('.carousel-btn.next');
    var dotsContainer = document.querySelector('.carousel-dots');

    if (!track || slides.length === 0) return;

    var currentIndex = 0;
    var autoInterval = null;
    var touchStartX = 0;
    var touchEndX = 0;

    // Create dots
    slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    });

    var dots = dotsContainer.querySelectorAll('.dot');

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

        dots.forEach(function (d) { d.classList.remove('active'); });
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        var next = (currentIndex + 1) % slides.length;
        goToSlide(next);
    }

    function prevSlide() {
        var prev = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prev);
    }

    if (nextBtn) nextBtn.addEventListener('click', function () {
        nextSlide();
        resetAutoPlay();
    });

    if (prevBtn) prevBtn.addEventListener('click', function () {
        prevSlide();
        resetAutoPlay();
    });

    function startAutoPlay() {
        autoInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoInterval);
        startAutoPlay();
    }

    startAutoPlay();

    var wrapper = document.querySelector('.carousel-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', function () {
            clearInterval(autoInterval);
        });
        wrapper.addEventListener('mouseleave', function () {
            startAutoPlay();
        });
    }

    if (track) {
        track.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            var diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                resetAutoPlay();
            }
        }, { passive: true });
    }

});
