//Can be apply to elementor post widget
//Create 'prev-btn' and 'next-btn' for user
//Add 'slide-btn' class for both next and prev button 

jQuery(document).ready(function($){

let activeSlide; 
let nos;
sliderSize();
var container = $('.thepost .ecs-post');

//Function to set slider size, slider element size
function sliderSize(current){
        //Set breakpoint
        let tab = 1024;
        let mobile = 767;
    
        //Get wiewport width
        let viewport = $(window).width();
    
        var numberOfSlide;
    
        //Check current viewport width and get number per slide in different viewport
        //This number can be any number
        if(viewport > tab){
            numberOfSlide = 5;
        }
    
        if(viewport > mobile && viewport<= tab){
            numberOfSlide = 3;
        }
    
        if(viewport < mobile){
            numberOfSlide = 1;
        }
    
        numberOfSlide = Number(numberOfSlide); //Change format to number
        //Set carousel item width based on number per slide;
        var divideWidth = $('.thepost .elementor-widget-container').width() / numberOfSlide; // 'thepost' can change to any class name
        divideWidth = ~~divideWidth;  //Remove decimal
        $('.thepost article').css('width',divideWidth+"px");
    
        //Get initial slider item
        const originalItem = document.querySelectorAll('.item');
    
        //Clone slider item
        //Add 'cloned-item' class to cloned item to differentiate cloned item and real item
        for(let i = 0; i<numberOfSlide; i++){
            $(originalItem[i]).clone().addClass('cloned-item').appendTo($(container)); 
            var j = i + 1;
            $(originalItem[originalItem.length - j]).clone().addClass('cloned-item').prependTo($(container));
        }
    
        //Get slider item after cloned
        const item = document.querySelectorAll('.thepost article');
        //Set total width for slider
        setTimeout(function(){
            var width = $('.thepost article').outerWidth();;
            var sliderWidth = item.length * width;
            $(container).css('width',sliderWidth+"px");
        },100);
        
        //Set active slide (real first item)
        let active = numberOfSlide;
        
        //Assign latest data to global variable
        nos = numberOfSlide; 
        activeSlide = active;

        if(current){
            //Set active slide to current slide (after window resize)
            var currentSlide = $('.thepost article.active').not('.cloned-item');
            let index = $(item).index(currentSlide);
            var startSlide = index * divideWidth;
            $(container).css('transform','translateX(-'+startSlide+'px)');
            activeSlide = index;
        }

        else{
            //Add 'active' class to active item
            $(item[active]).addClass('active');
            //Let slider scroll to the real first item (pass through the clonned item)
            var startSlide = numberOfSlide * divideWidth;
            $(container).css('transform','translateX(-'+startSlide+'px)');
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
         
         var divideWidth = $('.thepost article').outerWidth(); //Get Item width, Use outerWidth() to include the 'padding' size
         const item = document.querySelectorAll('.item'); //Get Element Length;

        //Move Backward
         if(direction === -1){
             $('.slide-btn').addClass('disabled'); //Disabled click event to prevent multiple click on the same time
             $(container).css('transition','all 0.3s ease-out'); //Add transition effect for slider
             var prev = activeSlide - 1; //Get previous slide
             var prevSlide = divideWidth * prev; //Get scroll width
             $(container).css('transform','translateX(-'+prevSlide+'px)');  //Scroll to previous slide
             activeSlide = activeSlide - 1; //Active slide - 1
             setTimeout(function(){
                 $(container).css('transition','');//Remove transition effect
     
                 //Inifinity scroll function
                 if(activeSlide === nos - 1){
                     var theSlide = item.length - nos - 1;
                     var prevSlide = divideWidth * theSlide;
                     $(container).css('transform','translateX(-'+prevSlide+'px)');
                     activeSlide = theSlide;
                 }
                 $(container).removeClass('active');
                 $(item[activeSlide]).addClass('active');
                 $('.slide-btn').removeClass('disabled'); //Enable button click event
             },300);  
         }
 
         //Move Forward
         else{
             $('.slide-btn').addClass('disabled'); //Disabled click event to prevent multiple click on the same time
             $(container).css('transition','all 0.3s ease-out'); //Add transition effect for slider
                 var next = activeSlide + 1; //Get next slide
                 var nextSlide = divideWidth * next; //Get scroll width
                 $(container).css('transform','translateX(-'+nextSlide+'px)'); //Scroll to next slide
                 activeSlide = activeSlide + 1; //Active slide + 1
                 setTimeout(function(){
                     $(container).css('transition',''); //Remove transition effect
                     //Inifinity scroll function
                     if(activeSlide === item.length - nos){
                         var nextSlide = divideWidth * nos;
                         $(container).css('transform','translateX(-'+nextSlide+'px)');
                         activeSlide = nos;
                     }
                     $('.thepost article').removeClass('active');
                     $(item[activeSlide]).addClass('active');
                     $('.slide-btn').removeClass('disabled'); //Enable button click event
                 },300);
         }
     }
 
    //Set auto slide interval time
    let auto_slide_time = 5000;
    
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
 
    //Set 'main-wrap' class for the container which contain slide and button, can change to any name
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
