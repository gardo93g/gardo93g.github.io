$(document).ready(function(){
    
    // Carousel para TreeCloud (Ancho normal, puede mostrar 2)
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

    // Carousel para Kubiak (Columnas divididas) y otros de un solo item
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

    // Video Hover Effect (Optional, if you prefer hover over autoplay)
    /*
    $(".project-card").hover(function(){
        $(this).find("video").get(0).play();
    }, function(){
        $(this).find("video").get(0).pause();
    });
    */
});