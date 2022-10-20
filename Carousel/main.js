jQuery(document).ready(function($){
    let tab = 1024;
    let mobile = 767;
    let viewport = $(window).width();

    var numberOfSlide;

    if(viewport > tab){
        numberOfSlide = $('.pc-num').text();
    }

    if(viewport > mobile && viewport<= tab){
        numberOfSlide = $('.tab-num').text();
    }

    if(viewport < mobile){
        numberOfSlide = $('.mob-num').text();
    }

    numberOfSlide = Number(numberOfSlide);
    
    var divideWidth = $('.slider-wrap').width() / numberOfSlide;
    divideWidth = ~~divideWidth;
    $('.item').css('width',divideWidth+"px");

    

    var originalItem = document.querySelectorAll('.item');

    for(let i = 0; i<numberOfSlide; i++){
        $(originalItem[i]).clone().appendTo($('.slider'));
        var j = i + 1;
        $(originalItem[originalItem.length - j]).clone().prependTo($('.slider'));
    }

    // $(originalItem[0]).clone().appendTo($('.slider'));
    // $(originalItem[1]).clone().appendTo($('.slider'));
    // $(originalItem[2]).clone().appendTo($('.slider'));

    // $(originalItem[originalItem.length - 1]).clone().prependTo($('.slider'));
    // $(originalItem[originalItem.length - 2]).clone().prependTo($('.slider'));
    // $(originalItem[originalItem.length - 3]).clone().prependTo($('.slider'));

    const item = document.querySelectorAll('.item');
    setTimeout(function(){
        var width = $('.item').outerWidth();;
        var sliderWidth = item.length * width;
        $('.slider').css('width',sliderWidth+"px");
    },100);

    var startSlide = numberOfSlide * divideWidth;
    $('.slider').css('transform','translateX(-'+startSlide+'px)');
    

    let active = numberOfSlide;
    $('.next-btn').click(function(){
        $('.slider').css('transition','all 0.3s ease-out');
            var next = active + 1;
            var nextSlide = divideWidth * next;
            $('.slider').css('transform','translateX(-'+nextSlide+'px)');
            active = active + 1;
            setTimeout(function(){
                $('.slider').css('transition','');
                if(active === item.length - numberOfSlide){
                    console.log(123);
                    var nextSlide = divideWidth * numberOfSlide;
                    $('.slider').css('transform','translateX(-'+nextSlide+'px)');
                    active = numberOfSlide;
                }
            },300);
    })

    $('.prev-btn').click(function(){
        $('.slider').css('transition','all 0.3s ease-out');
        var prev = active - 1;
        var prevSlide = divideWidth * prev;
        $('.slider').css('transform','translateX(-'+prevSlide+'px)');    
        active = active - 1;
        setTimeout(function(){
            $('.slider').css('transition','');
            if(active === numberOfSlide - 1){
                console.log(item.length)
                var theSlide = item.length - numberOfSlide - 1;
                var prevSlide = divideWidth * theSlide;
                $('.slider').css('transform','translateX(-'+prevSlide+'px)');
                active = theSlide;
            }
        },300);  
    })

$(window).resize(function(){
    viewport = $(window).width();
    if(viewport > tab){
        numberOfSlide = $('.pc-num').text();
    }

    if(viewport > mobile && viewport<= tab){
        numberOfSlide = $('.tab-num').text();
    }

    if(viewport < mobile){
        numberOfSlide = $('.mob-num').text();
    }

    numberOfSlide = Number(numberOfSlide);
    divideWidth = $('.slider-wrap').width() / numberOfSlide;
    divideWidth = ~~divideWidth;
    $('.item').css('width',divideWidth+"px");

    setTimeout(function(){
        var width = $('.item').outerWidth();;
        var sliderWidth = item.length * width;
        $('.slider').css('width',sliderWidth+"px");
    },100);
    var resizeSlide = active * divideWidth;
    $('.slider').css('transform','translateX(-'+resizeSlide+'px)');
})
});