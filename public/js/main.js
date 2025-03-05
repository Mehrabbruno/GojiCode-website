/*---------- Toggle Navbar Visibility Start ----------*/
$('.nav-items-toggle').on('click', function() {
    $('.top-nav').toggleClass('active');
    $('.nav-items-toggle i').toggleClass('fa-bars fa-xmark')
});





/*---------- Toggling Navbar Color Start ----------*/
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





/*---------- Match Test Form Start ----------*/
let i = 0, max = 4;
const update = (i) => {
    $(".pagination-step, .form-step").css("transform", `translateX(-${i * 100}%)`);
    $(".pagination-step").eq(i).addClass("active").siblings().removeClass("active")
}
$(".pagination-left").click(() => i > 0 && (i--, update(i)));
$(".pagination-right").click(() => i < max && (i++, update(i)));
$(".pagination-step").click(function(){
    let i = $(this).index() - 1;
    $(this).addClass("active").siblings().removeClass("active"),
    update(i)
});
$(".form-input").click(function(){
    let $t = $(this),
        $s = $t.closest(".form-step"),
        i = $s.index(),
        cat = $s.data("match-category"),
        $c = $(`.form-value[data-match-category="${cat}"]`),
        val = $t.find("span").text().trim();
    
    if($t.hasClass("active")){
        $t.removeClass("active")
        $(".pagination-step").eq(i).removeClass("set")
        $c.removeClass("active").find(".value").html("NON-SELECTED")
    } else {
        $s.find(".form-input").removeClass("active")
        $t.addClass("active")
        $(".pagination-step").eq(i).addClass("set")
        $c.addClass("active").find(".value").html(val)
    }
});  
  




/*---------- Technoligien Page Start ----------*/

// Initialize all nested Swipers
const technologien_filter = new Swiper(".filter-wrapper", {
    slidesPerView: 'auto',
    spaceBetween: 1,
    freeMode: true
});

$(".category-parent").on('click', function(){
    $p = $(this).parent('.filter-category');
    if(!$p.hasClass('active')){
        $p.addClass('active')
    }else{
        $p.removeClass('active')
    }
})

$(".category-children").on("click", function() {
    var $clicked = $(this);
    var $techInfoWrapper = $(".tech-info-wrapper");
    var $infoDivs = $techInfoWrapper.children("div");
    var $projectCards = $(".project-card");

    if (!$clicked.hasClass("active")) {
    $(".category-children").removeClass("active");
    $clicked.addClass("active");

    var infoArray = [
        $clicked.data("info-1"),
        $clicked.data("info-2"),
        $clicked.data("info-3")
    ];
    $infoDivs.each(function(index) {
        $(this).html(infoArray[index] || "");
    });
    $techInfoWrapper.addClass("active");

    var parentCategory = $clicked.closest(".filter-category")
        .find(".category-parent")
        .text()
        .trim()
        .toLowerCase();
    var subCategory = $clicked.text().trim().toLowerCase();

    $projectCards.each(function() {
        var $card = $(this);
        var cardCategory = $card.data("project-category").toString().toLowerCase();

        var cardStackStr = $card.data("project-stack").toString().toLowerCase();
        var stacks = cardStackStr.split(",").map(function(s) { return s.trim(); });

        if (cardCategory === parentCategory && stacks.indexOf(subCategory) !== -1) {
        $card.show();
        } else {
        $card.hide();
        }
    });
    } else {
    $(".category-children").removeClass("active");
    $techInfoWrapper.removeClass("active");
    $projectCards.show();
    }
});





/*---------- Services Page Start ----------*/
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 'auto',  // Auto width for each slide
    spaceBetween: 20,       // Adjust space between slides as needed
    freeMode: true,         // Enable free scrolling mode
});
  