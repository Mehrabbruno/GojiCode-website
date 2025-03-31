




/*---------- Toggle Navbar Visibility Start ----------*/
$('.nav-items-toggle').on('click', function() {
    $('.top-nav').toggleClass('active');
    $('.nav-items-toggle i').toggleClass('fa-bars fa-xmark')
});

$(function() {
    let savedLang = localStorage.getItem('lang');
    if (!savedLang || !translations[savedLang]) {
    savedLang = 'en';
    localStorage.removeItem('lang');
    }

    setLanguage(savedLang);

    $('.lang-btn').click(function() {
    const chosen = $(this).data('lang');
    if (translations[chosen] && chosen !== $('html').attr('lang')) {
        setLanguage(chosen);
        localStorage.setItem('lang', chosen);
    }
    });

    function setLanguage(lang) {
    $('html').attr('lang', lang);
    document.title = translations[lang].pageTitle || '';
    $('.lang-btn').removeClass('active')
        .filter(`[data-lang="${lang}"]`)
        .addClass('active');
    $('[data-i18n]').each(function() {
        const key = $(this).data('i18n');
        $(this).html(translations[lang][key] || '');
    });
    }
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





/*---------- Toggling Navbar Glossy Start ----------*/
$(function() {
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $('.top-nav').addClass('glossy');
        } else {
            $('.top-nav').removeClass('glossy');
        }
    });
});






/*---------- Map Drag and Tooltip Start ----------*/
$(function(){
    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;

    const $svg = $('#map');
    const $pan = $('#panGroup');

    // On mouse/touch start
    $svg.on('mousedown touchstart', function(e) {
    e.preventDefault();
    isDragging = true;
    const evt = e.type === 'touchstart' ? e.originalEvent.touches[0] : e;
    startX = evt.clientX - currentX;
    startY = evt.clientY - currentY;
    });

    // On move
    $(document).on('mousemove touchmove', function(e) {
    if (!isDragging) return;
    const evt = e.type === 'touchmove' ? e.originalEvent.touches[0] : e;
    currentX = evt.clientX - startX;
    currentY = evt.clientY - startY;
    $pan.attr('transform', `translate(${currentX},${currentY})`);
    });

    // On release
    $(document).on('mouseup touchend', function() {
    isDragging = false;
    });
});

// Global object with detailed data
const projectTooltips = {
    projects_1: '<ul><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a></ul>',
    projects_2: '<ul><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a></ul>',
    projects_3: '<ul><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a></ul>',
    projects_4: '<ul><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a></ul>',
    projects_5: '<ul><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a></ul>',
    projects_6: '<ul><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a></ul>',
    projects_7: '<ul><a href="technologien.html"><li>Project Name</li></a><a href="technologien.html"><li>Project Name</li></a></ul>'
};

$(function() {
    $('.project-country').each(function() {
        const projectId = $(this).data('project-id');
        const content = projectTooltips[projectId] || '';
        
        const $temp = $(content);
        const count = $temp.find('li').length;
        const scaleFactor = 1 + (count * 0.1);
        const cx = bbox.x + bbox.width / 2;
        const cy = bbox.y + bbox.height / 2;
        const transformStr = `translate(${cx}, ${cy}) scale(${scaleFactor}) translate(${-cx}, ${-cy})`;
        $(this).attr('transform', transformStr);
    });
});


$(function(){
    const $tooltip = $('#tooltip');
    $('.project-country')
        .on('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            const left = rect.left + rect.width / 2 + window.scrollX;
            const top  = rect.top + rect.height + window.scrollY;
            const projectId = $(this).data('project-id');
            const content = projectTooltips[projectId] || 'Default info goes here';
            $tooltip
                .html(content)
                .css({ left, top })
                .show();
        })
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





/*---------- Technologien Section Start ----------*/
if ($('.technologien-slider').length) {
    var technologien_swiper = new Swiper('.technologien-slider', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        freeMode: true,
        freeModeMomentum: false,
        speed: 100000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        }
    });

    function updateSwiperAutoplay() {
        technologien_swiper.update(); // recalc layout after hiding/showing slides

        // Sum widths of all currently visible slides (including margin)
        let totalWidth = 0;
        $('.technologien-slider .swiper-slide:visible').each(function() {
            totalWidth += $(this).outerWidth(true);
        });

        const marginLeft = 60;
        const containerWidth = $('.technologien-slider').width() - marginLeft;

        if (totalWidth > containerWidth) {
            technologien_swiper.autoplay.start();
        } else {
            technologien_swiper.autoplay.stop();
        }
    }

    updateSwiperAutoplay();
    $(window).on('resize', updateSwiperAutoplay);

    $('.services-category.technologien-card').on('click', function() {
        var $btn    = $(this);
        var filter  = $btn.data('filter');
        var isActive = $btn.hasClass('active');

        $('.services-category.technologien-card').removeClass('active');

        if (isActive) {
            // Deactivate → show all
            $('.technologien-slider .swiper-slide').show();
        } else {
            $btn.addClass('active');
            $('.technologien-slider .swiper-slide')
                .hide()
                .filter(`[data-category="${filter}"]`)
                .show();
        }
        updateSwiperAutoplay();
    });
}
  
  



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
$('.category-toggle').on('click', function() {
    var filter = $(this).data('filter');

    // 1️⃣ Toggle active class
    $('.category-toggle').removeClass('active');
    $('.category-toggle[data-filter="' + filter + '"]').addClass('active');

    // 2️⃣ Show/hide cards
    if (filter === 'all') {
    $('.package-card').show();
    } else {
    $('.package-card').hide()
                        .filter('[data-category="' + filter + '"]')
                        .show();
    }
});




/*---------- Project Page Start ----------*/
var swiper = new Swiper('.portfolio-section .projects-slider, .images-container', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    freeMode: true,
    freeModeMomentum: false,
    speed: 4000,
    autoplay: {
        delay: 0,
        disableOnInteraction: false,
    },
});

// When a project card is clicked, update the background image in section-3
$('.projects-slider .project-card').on('click', function() {
    $('.projects-slider .project-card').removeClass('active')
    $(this).addClass('active')    
    var bgUrl = $(this).data('bg');
    $('.cover-section-wrapper .section-3').css('background-image', 'url(' + bgUrl + ')');
});

$(".project-grid-section .services-category").on("click", function() {
    var $clicked = $(this);
    var filter = $clicked.data("filter").toString().toLowerCase(); // e.g. "apps"
    var $serviceCards = $(".project-grid .project-card");

    // If the clicked category is not active, apply the filter
    if (!$clicked.hasClass("active")) {
    // Remove 'active' from all categories, then add to the clicked one
    $(".services-category").removeClass("active");
    $clicked.addClass("active");

    // Show/hide cards based on whether their data-category includes the filter
    $serviceCards.each(function() {
        var $card = $(this);
        // Convert the card's categories into an array of trimmed, lowercase strings
        var cardCategories = $card
        .data("category")
        .toString()
        .toLowerCase()
        .split(",")
        .map(function(item) {
            return item.trim();
        });

        // Show the card if it includes the selected filter; otherwise, hide it
        if (cardCategories.includes(filter)) {
            $card.show();
        } else {
            $card.hide();
        }
    });
    } 
    else {
    // If the same category is clicked again, deactivate and show all cards
    $clicked.removeClass("active");
    $serviceCards.show();
    }
});





/*---------- Contact Form Start ----------*/
$(".trigger-form, .close-btn").on("click", function() {
    var formValue = $(this).data("form");
    $(".contact-form-container")
    .toggleClass("active")
    .attr("data-form", formValue);
});