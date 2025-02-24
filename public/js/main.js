$('.nav-items-toggle').on('click', function() {
    $('.top-nav').toggleClass('active');
});


var swiper = new Swiper(".page-sections", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    // mousewheel: true,
    freefreeMode: true,
});