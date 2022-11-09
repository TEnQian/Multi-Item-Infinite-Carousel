jQuery(document).ready(function($){
    mainFunction();
function mainFunction(){
    clearInterval(autoInterval);

     //Set breakpoint
     let tab = 1024;
     let mobile = 767;
 
     //Get wiewport width
     let viewport = $(window).width();
 
     //Get auto slide interval time
     let auto_slide_time = $('.auto-slide-time p').text();
 
     auto_slide_time = Number(auto_slide_time); //Change format to number
 
     var numberOfSlide;
 
     //Check current viewport width and get number per slide in different viewport
     if(viewport > tab){
         numberOfSlide = $('.pc-num').text();
     }
 
     if(viewport > mobile && viewport<= tab){
         numberOfSlide = $('.tab-num').text();
     }
 
     if(viewport < mobile){
         numberOfSlide = $('.mob-num').text();
     }
 
     numberOfSlide = Number(numberOfSlide); //Change format to number
     //Set carousel item width based on number per slide;
     var divideWidth = $('.slider-wrap').width() / numberOfSlide;
     divideWidth = ~~divideWidth;  //Remove decimal
     $('.item').css('width',divideWidth+"px");
 
     //Get initial slider item
     const originalItem = document.querySelectorAll('.item');
 
     //Clone slider item
     //Add 'cloned-item' class to cloned item to differentiate cloned item and real item
     for(let i = 0; i<numberOfSlide; i++){
         $(originalItem[i]).clone().addClass('cloned-item').appendTo($('.slider')); 
         var j = i + 1;
         $(originalItem[originalItem.length - j]).clone().addClass('cloned-item').prependTo($('.slider'));
     }
 
     //Get slider item after cloned
     const item = document.querySelectorAll('.item');
 
     //Set total width for slider
     setTimeout(function(){
         var width = $('.item').outerWidth();;
         var sliderWidth = item.length * width;
         $('.slider').css('width',sliderWidth+"px");
     },100);
     
     //Set active slide (real first item)
     let active = numberOfSlide;
 
     //Add 'active' class to active item
     $(item[active]).addClass('active');

    //Let slider scroll to the real first item (pass through the clonned item)
    var startSlide = numberOfSlide * divideWidth;
    $('.slider').css('transform','translateX(-'+startSlide+'px)');
 
     let direction = 1;
     //On click function of next button
     $('.next-btn').click(function(){
         let a = 1;
        runTheSlide(a)
     })
 
     //On click function of previous button
     $('.prev-btn').click(function(){
        let a = -1;
        runTheSlide(a);
     })
 
     function runTheSlide(direction){
         //Move Backward
         if(direction === -1){
             $('.slide-btn').addClass('disabled'); //Disabled click event to prevent multiple click on the same time
             $('.slider').css('transition','all 0.3s ease-out'); //Add transition effect for slider
             var prev = active - 1; //Get previous slide
             var prevSlide = divideWidth * prev; //Get scroll width
             $('.slider').css('transform','translateX(-'+prevSlide+'px)');  //Scroll to previous slide
             active = active - 1; //Active slide - 1
             setTimeout(function(){
                 $('.slider').css('transition','');//Remove transition effect
     
                 //Inifinity scroll function
                 if(active === numberOfSlide - 1){
                     var theSlide = item.length - numberOfSlide - 1;
                     var prevSlide = divideWidth * theSlide;
                     $('.slider').css('transform','translateX(-'+prevSlide+'px)');
                     active = theSlide;
                 }
                 $('.item').removeClass('active');
                 $(item[active]).addClass('active');
                 $('.slide-btn').removeClass('disabled'); //Enable button click event
             },300);  
         }
 
         //Move Forward
         else{
             $('.slide-btn').addClass('disabled'); //Disabled click event to prevent multiple click on the same time
             $('.slider').css('transition','all 0.3s ease-out'); //Add transition effect for slider
                 var next = active + 1; //Get next slide
                 var nextSlide = divideWidth * next; //Get scroll width
                 $('.slider').css('transform','translateX(-'+nextSlide+'px)'); //Scroll to next slide
                 active = active + 1; //Active slide + 1
                 setTimeout(function(){
                     $('.slider').css('transition',''); //Remove transition effect
                     //Inifinity scroll function
                     if(active === item.length - numberOfSlide){
                         var nextSlide = divideWidth * numberOfSlide;
                         $('.slider').css('transform','translateX(-'+nextSlide+'px)');
                         active = numberOfSlide;
                     }
                     $('.item').removeClass('active');
                     $(item[active]).addClass('active');
                     $('.slide-btn').removeClass('disabled'); //Enable button click event
                 },300);
         }
     }
 
     var autoInterval;
 
     //Auto slide function
     function autoSlide(){
         autoInterval =  setInterval(function(){
             let a = 1;
             runTheSlide(a);
         },auto_slide_time);
     }
 
     //Stop auto slide function
     function stopAutoSlide(){
         clearInterval(autoInterval);
     }
 
     //Run auto slide function by default
     autoSlide();
 
     //Stop auto slide when mouse hover on the slider
     $('.main-wrap').mouseover(function(){
         stopAutoSlide();
     })
 
     //Restart auto slide when mouse leave the slider
     $('.main-wrap').mouseleave(function(){
         autoSlide();
     })
}

//Event on window resize
$(window).resize(function(){
    $('.cloned-item').remove();//Remove cloned item
    
    //Unbind Button Click Event;
    $('.next-btn').click(function(){
        return;
    })
    $('.prev-btn').click(function(){
        return;
    })
    
    //Run the slider again
    mainFunction();
});
});
