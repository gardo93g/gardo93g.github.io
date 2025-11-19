$(document).ready(function(){
    
    // Carousel General (Para TreeCloud y Personal Projects)
    $(".project-carousel").owlCarousel({
        loop: true,
        margin: 15,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        responsive: {
            0: { items: 1 },
            600: { items: 2 },
            1000: { items: 2 }
        }
    });

    // Carousel Single (Para columnas divididas en Kubiak)
    $(".single-item-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        dots: true,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000
    });

    // Navbar shrink effect
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.navbar').addClass('shrink');
        } else {
            $('.navbar').removeClass('shrink');
        }
    });
    
    // Smooth scroll for anchor links (si no lo tenías antes)
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });
});