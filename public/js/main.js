$('.nav-items-toggle').on('click', function() {
    $('.top-nav').toggleClass('active');
});



// Toggling Navbar class
$(function() {
    var $sections = $('.page-section');
    var lastTheme = null;
    var options = {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px -100% 0px'
    };

    var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
        var theme = $(entry.target).data('theme');
        if (theme !== lastTheme) {
            if(theme == "dark"){
                $(".top-nav").addClass('dark-bg')
            }else{
                $(".top-nav").removeClass('dark-bg')
            }
            lastTheme = theme;
        }
        }
    });
    }, options);

    $sections.each(function() {
    observer.observe(this);
    });
});
  
// Match Test Form
let i = 0, max = 4;
const update = () => $(".pagination-step, .form-step").css("transform", `translateX(-${i * 100}%)`);
$(".pagination-left").click(() => i > 0 && (i--, update()));
$(".pagination-right").click(() => i < max && (i++, update()));

$(".pagination-step").click(function(){
    let i = $(this).index() - 1;
    $(this).addClass("active").siblings().removeClass("active"),
    $(".form-step").css("transform", `translateX(-${i * 100}%)`);
});

$(".form-input").click(function(){
    const $t = $(this), i = $t.closest(".form-step").index();
    $t.hasClass("active")
    ? ($t.removeClass("active"), $(".pagination-step").eq(i).removeClass("set"))
    : ($t.closest(".form-step").find(".form-input").removeClass("active"), $t.addClass("active"), $(".pagination-step").eq(i).addClass("set"));
});
  

  
  
  