
(function(){

    $(window).on('beforeunload', function() {
        var todos = $('.localStor').html();
        if(todos){
            localStorage.setItem('todos', todos);
        }else{
            localStorage.clear();
        }
        
    });

    $(document).on('click','a',function(e){
         e.preventDefault(); 
    });

    if(localStorage.getItem('todos')){
         $('.localStor').html(localStorage.getItem('todos'));
    }

	var $input = $('.enter_task input');
    var $button = $('.enter_task button');
    var $button_clear = $('.clear');
    var flag = false;
    $input.focus();
  
    $button.on('click',function(e){
        e.preventDefault(); 
        if($input.val()!==""){
             var listItem = $('.enter_task input').val();
             AddTask(listItem);
             $input.val("").focus();
             //todos = $('.localStor').html();
             //localStorage.setItem('todos', todos);
        }else{
             $input.focus();
        }
    });

    $button_clear.on('click',function(e){
        e.preventDefault(); 
        $('.localStor').remove();
    });


        
        $(document).on('click','.icon',function(){

             if(flag) return false;
             flag = true;

             $('i',this).replaceWith('<i class="fa fa-check-square-o"></i>').attr({disabled: true});
             var self = $(this);
             RemoveListItem(self);
             $('.hr1').show(300);

             var listMarked = $(this).next().text();
             setTimeout(function(){
                 AddMarked(listMarked);
             },300);
             setTimeout(function(){
                 flag = false;
             },500);

             // setTimeout(function(){
             //     todos = $('.localStor').html();
             //     localStorage.setItem('todos', todos);
             // },2000);

             
        });
        
        $(document).on('click','.iconMarked',function(){ 
             if(flag) return false;
             flag = true;

             $('i',this).replaceWith('<i class="fa fa-square-o"></i>');

             var self = $(this);
             RemoveListItem(self);

             var listItem = $(this).next().text();
             setTimeout(function(){
                 AddTask(listItem);
             },300);
             setTimeout(function(){
                 flag = false;
             },500);

             setTimeout(function(){
                 if($('.finished').children().length < 2){
                     $('.hr1').hide(300);
                 }
             },700);  

             // setTimeout(function(){
             //     todos = $('.localStor').html();
             //     localStorage.setItem('todos', todos);
             // },2000);
        });

        $(document).on('click','.icon2',function(){
             var self = $(this);
             $(self.parent()).fadeOut(300);
             setTimeout(function(){
                 $(self.parent().parent()).slideUp(1000);
             },300)
             setTimeout(function(){
                 $(self.parent().parent()).remove();
             }, 2000);

             // setTimeout(function(){
             //     todos = $('.localStor').html();
             //     localStorage.setItem('todos', todos);
             // },2000);
        });
    
    

    function AddTask(listItem){
         $('.new').append('<div class="wrap"></div>');
         $('.new .wrap:empty').animate({height:'+=30px'});
         setTimeout(function(){
             $('.new .wrap:empty').append('<div class="create"><div class="icon" dissabled><a href=""><i class="fa fa-square-o"></i></a></div><div class="task"><li>'+ listItem +'</li></div><div class="icon2"><a href=""><i class="fa fa-times"></i></a></div></div>');
         },400)
    }

    function AddMarked(listMarked){
         $('.finished').prepend('<div class="wrap"></div>');
         $('.finished .wrap:empty').animate({height:'+=30px'})
         setTimeout(function(){
             $('.finished .wrap:empty').append('<div class="createMarked"><div class="iconMarked"><a href=""><i class="fa fa-check-square-o"></i></a></div><div class="task"><li>'+ listMarked +'</li></div><div class="icon2"><a href=""><i class="fa fa-times"></i></a></div></div>');
         },500)
    }

    function RemoveListItem(self){
         setTimeout(function(){
             $(self.parent()).fadeOut(300);
             $(self.parent().parent()).slideUp(1000);
         }, 300);
         setTimeout(function(){
             $(self.parent().parent()).remove();
         }, 2000);
    }
	         
})();