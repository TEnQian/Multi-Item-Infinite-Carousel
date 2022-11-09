jQuery(document).ready(function($){

let activeSlide; 
let nos;
sliderSize();

//Function to set slider size, slider element size
function sliderSize(current){
        //Set breakpoint
        let tab = 1024;
        let mobile = 767;
    
        //Get wiewport width
        let viewport = $(window).width();
    
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
        
        //Assign latest data to global variable
        nos = numberOfSlide; 
        activeSlide = active;

        if(current){
            //Set active slide to current slide (after window resize)
                
            var currentSlide = $('.item.active').not('.cloned-item'); //Get slide item with 'active' class and is not a cloned item
            let index = $(item).index(currentSlide); //Get this slide item index in the slider
            var startSlide = index * divideWidth;
            $('.slider').css('transform','translateX(-'+startSlide+'px)'); //Let slider scroll to this item
            activeSlide = index;
        }

        else{
            //Add 'active' class to active item
            $(item[active]).addClass('active');
            //Let slider scroll to the real first item (pass through the clonned item)
            var startSlide = numberOfSlide * divideWidth;
            $('.slider').css('transform','translateX(-'+startSlide+'px)');
        }

}
    //Set a variable to decide scroll direction, -1 for backward, 1 for forward
     let direction = 1;

     //On click function of next button
     $('.next-btn').click(function(){
        direction = 1;
        runTheSlide(direction)
     })
 
     //On click function of previous button
     $('.prev-btn').click(function(){
        direction = -1;
        runTheSlide(direction);
     })

     function runTheSlide(direction){
         
         var divideWidth = $('.item').outerWidth(); //Get Item width, Use outerWidth() to include the 'padding' size
         const item = document.querySelectorAll('.item'); //Get Element Length;

        //Move Backward
         if(direction === -1){
             $('.slide-btn').addClass('disabled'); //Disabled click event to prevent multiple click on the same time
             $('.slider').css('transition','all 0.3s ease-out'); //Add transition effect for slider
             var prev = activeSlide - 1; //Get previous slide
             var prevSlide = divideWidth * prev; //Get scroll width
             $('.slider').css('transform','translateX(-'+prevSlide+'px)');  //Scroll to previous slide
             activeSlide = activeSlide - 1; //Active slide - 1
             setTimeout(function(){
                 $('.slider').css('transition','');//Remove transition effect
     
                 //Inifinity scroll function
                 if(activeSlide === nos - 1){
                     var theSlide = item.length - nos - 1;
                     var prevSlide = divideWidth * theSlide;
                     $('.slider').css('transform','translateX(-'+prevSlide+'px)');
                     activeSlide = theSlide;
                 }
                 $('.item').removeClass('active');
                 $(item[activeSlide]).addClass('active');
                 $('.slide-btn').removeClass('disabled'); //Enable button click event
             },300);  
         }
 
         //Move Forward
         else{
             $('.slide-btn').addClass('disabled'); //Disabled click event to prevent multiple click on the same time
             $('.slider').css('transition','all 0.3s ease-out'); //Add transition effect for slider
                 var next = activeSlide + 1; //Get next slide
                 var nextSlide = divideWidth * next; //Get scroll width
                 $('.slider').css('transform','translateX(-'+nextSlide+'px)'); //Scroll to next slide
                 activeSlide = activeSlide + 1; //Active slide + 1
                 setTimeout(function(){
                     $('.slider').css('transition',''); //Remove transition effect
                     //Inifinity scroll function
                     if(activeSlide === item.length - nos){
                         var nextSlide = divideWidth * nos;
                         $('.slider').css('transform','translateX(-'+nextSlide+'px)');
                         activeSlide = nos;
                     }
                     $('.item').removeClass('active');
                     $(item[activeSlide]).addClass('active');
                     $('.slide-btn').removeClass('disabled'); //Enable button click event
                 },300);
         }
     }
 
    //Get auto slide interval time
    let auto_slide_time = $('.auto-slide-time p').text();
    
    auto_slide_time = Number(auto_slide_time); //Change format to number

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

//Window Resize Event
$(window).on('resize',function(){   

    //Remove cloned item
    $('.cloned-item').remove();
    var current  =  1;
    //Tell the sliderSize() function there is a current slide
    sliderSize(current);
});
});
