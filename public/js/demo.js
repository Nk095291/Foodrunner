$(window).ready(function(){
  $(window).on('scroll' , solve);
  let bar = $('.bar');
  let flag = true;
  bar.on('click', show);
  $('nav ul a').on('click',show);
  function show(){
    if($(window).width()>650)
      return;
    let barline = $('.com').toArray();
    $(barline[0]).toggleClass('line1');
    $(barline[1]).toggleClass('line2');
    $(barline[2]).toggleClass('line3');
    $('nav ul').toggleClass('showmenu');
    let links = $('nav ul a').toArray();
    links.forEach((e, i) => {
        if (flag) {
            let delay = (i/10);
            $(e).css({
                "animation": `animate 1s linear ${delay}s`
            });
        }
        else {

            $(e).css({
                "animation": "none"
            });
        }
    })
    flag=!flag;

  }
  function solve(){
    let array = $('.ae').toArray();
    let array2 = $('.ae2').toArray();
    let wintop  = $(window).scrollTop();
    let winbottom = $(window).height()+wintop;
    let section_height = $('header')[0].offsetHeight;   //$("header") give us array of objects
    let nav = $('nav');
    let nav_height = nav[0].offsetHeight;

    //up  to down animation
    array.forEach(e=>{
     let etop = e.offsetTop;
     let ebottom = e.offsetHeight+etop;

     if(winbottom>=etop&&wintop<etop)
     {
        $(e).addClass('animated fadeInUp delay-0.5s');
        $(e).removeClass('fadeOutUp');
 
     }
     //--------------------- if you want more animation---------------- 
    // else if(wintop>=etop &&wintop<=ebottom)
    // {
    //     $(e).addClass('animated fadeOutUp delay-0.5s');
    //     $(e).removeClass('fadeInUp');
    // }
    // else if(wintop>=ebottom)
    // {
    //     $(e).removeClass('animated fadeOutUp delay-0.5s');
    // }
    // else
    //  {
    //   $(e).removeClass('animated fadeInUp delay-0.5s');
    //  }
    });
    
    //left to right animation
    array2.forEach(e=>{
      let etop = e.offsetTop;
      let ebottom = e.offsetHeight+etop;
 
      if(winbottom>=etop&&wintop+nav_height+10<etop)
      {
         $(e).addClass('animated fadeInLeft delay-0.1s');
      }
      //------------------------if you want more animation
    //  else if(wintop>=ebottom)
    //  {
    //      $(e).removeClass('animated fadeInLeft delay-0.1s');
      
    //  }
    //  else
    //  {
    //   $(e).removeClass('animated fadeInLeft delay-0.1s');
    //  }
     });

     if(wintop>section_height)
     {
        nav.addClass('sticky');
     }
     else {
      nav.removeClass('sticky');
     }


  }
});
