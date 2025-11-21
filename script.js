// --- NAVBAR SHRINK ---
$(window).on('scroll', function () {
    if ($(document).scrollTop() > 50) {
        $('.navbar').addClass('shrink');
    } else {
        $('.navbar').removeClass('shrink');
    }
});

// --- SHOWCASE LOGIC (REPLACES CAROUSEL) ---
function changeShowcase(sectionId, videoSrc, title, desc, triggerElement) {
    // 1. Update Video
    const videoEl = document.getElementById(sectionId + '-video');

    // Fade out effect
    videoEl.style.opacity = 0;

    setTimeout(() => {
        videoEl.src = videoSrc; // Direct src update for immediate load
        videoEl.load();
        videoEl.play();

        // Update Text
        document.getElementById(sectionId + '-title').innerText = title;
        document.getElementById(sectionId + '-desc').innerText = desc;

        // Fade in
        videoEl.style.opacity = 1;
    }, 200);

    // 2. Update Active State in Menu
    const container = document.getElementById(sectionId + '-showcase');
    const triggers = container.querySelectorAll('.mechanic-trigger');
    triggers.forEach(t => t.classList.remove('active'));
    triggerElement.classList.add('active');
}

// --- SMOOTH SCROLL FIX ---
$('a[href^="#"]').on('click', function (event) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 70
        }, 800);
    }
});
