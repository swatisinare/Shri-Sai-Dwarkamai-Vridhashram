document.addEventListener('DOMContentLoaded', function () {

    // ===== Gallery Filter =====
    var filterBtns = document.querySelectorAll('.filter-btn');
    var galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            filterBtns.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            var filter = btn.getAttribute('data-filter');

            galleryItems.forEach(function (item) {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                } else {
                    item.classList.remove('visible');
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ===== Lightbox =====
    var lightbox = document.querySelector('.lightbox');
    var lightboxImg = document.querySelector('.lightbox img');
    var lightboxClose = document.querySelector('.lightbox-close');
    var lightboxPrev = document.querySelector('.lightbox-btn.prev');
    var lightboxNext = document.querySelector('.lightbox-btn.next');
    var currentImageIndex = 0;

    function getVisibleItems() {
        return Array.from(document.querySelectorAll('.gallery-item.visible, .gallery-item:not(.hidden)'));
    }

    function openLightbox(index) {
        var items = getVisibleItems();
        if (index < 0 || index >= items.length) return;
        currentImageIndex = index;
        var img = items[index].querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    galleryItems.forEach(function (item, index) {
        item.classList.add('visible');
        item.addEventListener('click', function () {
            var visibleItems = getVisibleItems();
            var visibleIndex = visibleItems.indexOf(item);
            openLightbox(visibleIndex);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    if (lightboxNext) lightboxNext.addEventListener('click', function () {
        var items = getVisibleItems();
        var next = (currentImageIndex + 1) % items.length;
        openLightbox(next);
    });

    if (lightboxPrev) lightboxPrev.addEventListener('click', function () {
        var items = getVisibleItems();
        var prev = (currentImageIndex - 1 + items.length) % items.length;
        openLightbox(prev);
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') {
            var items = getVisibleItems();
            openLightbox((currentImageIndex + 1) % items.length);
        }
        if (e.key === 'ArrowLeft') {
            var items = getVisibleItems();
            openLightbox((currentImageIndex - 1 + items.length) % items.length);
        }
    });

});
