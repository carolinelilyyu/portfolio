$(document).ready(function () {
    let $btns = $('.project-area .button-group button');


    $btns.click(function (e) {

        $('.project-area .button-group button').removeClass('active');
        e.target.classList.add('active');

        let selector = $(e.target).attr('data-filter');
        $('.project-area .grid').isotope({
            filter: selector
        });

        return false;
    })

    $('.project-area .button-group #btn1').trigger('click');

    // $('.project-area .grid .test-popup-link').magnificPopup({
    //     type: 'image',
    //     tLoading: 'Loading image #%curr%...',
    //     gallery: { enabled: true },
    //     image: {
    //         tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
    //     },
    //     callbacks: {
    //         open : function(){
    //             $("test-popup-link").css("filter", "brightness(0.5)");
    //             console.log($("test-popup-link").src)
    //         }
    //     }
    // });


    // Owl-carousel

    $('.site-main .about-area .owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        dots: true,
        responsive: {
            0: {
                items: 1
            },
            560: {
                items: 2
            }
        }
    })

    // sticky navigation menu

    let nav_offset_top = $('.header_area').height() + 50;

    function navbarFixed() {
        if ($('.header_area').length) {
            $(window).scroll(function () {
                let scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top) {
                    $('.header_area .main-menu').addClass('navbar_fixed');
                } else {
                    $('.header_area .main-menu').removeClass('navbar_fixed');
                }
            })
        }
    }

    navbarFixed();

});