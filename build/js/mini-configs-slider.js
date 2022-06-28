const miniConfigsSlider = new Swiper('.js-mini-configs-slider', {
    loop: false,
    navigation: {
        nextEl: '.mini-configs-slider .swiper-button-next',
        prevEl: '.mini-configs-slider .swiper-button-prev'
    },
    slidesPerView: 1,
    breakpoints: {
        1200: {
            allowTouchMove: false,
            shortSwipes: false,
            simulateTouch: false,
            slidesPerView: 2
        }
    }
});
