
    $(function(){
      SyntaxHighlighter.all();
    });
    $(window).load(function(){
      $('.flexslider').flexslider({
        animation: "fade",
        animationLoop: "true",
        start: function(slider){
          $('body').removeClass('loading');
        }
      });
    });