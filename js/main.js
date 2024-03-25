$(document).ready(function(){
    let list = $ (".page_dot>li.dotOn").index();
    let wid = $ (".main_tit").width();
    let count = $ (".tit_list>li").length;
    const $counters = $(".scroll_on");
    let height = $(".rolling_wrap").height();
    let num = $ (".rolling>li").length; 
    let max = height * num;
    let move = 0;

    let autonotice = setInterval(function(){
        move += height;
        $(".rolling").animate({"top" : -move},600,function(){
            if( move >= max ) {
                $(this).css("top",0)
                move = 0;
            };
        });
        $(".rolling").append($(".rolling>li").first().clone());
    },3000);

    $(".rolling_wrap").mouseenter(function(){
        clearInterval(autonotice);
    });

    $(".rolling_wrap").mouseleave(function(){
        autonotice = setInterval(function(){
            move += height;
            $(".rolling").animate({"top" : -move},600,function(){
                if( move >= max ) {
                    $(this).css("top",0)
                    move = 0;
                };
            });
            $(".rolling").append($(".rolling>li").first().clone());
        },3000);
    });

    
//-----review----------------------------------------------------------------------------------------------------

   // 노출 비율(%)과 애니메이션 반복 여부(true/false)를 설정합니다.
   const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
   const loop = false; // 애니메이션 반복 여부를 설정합니다. (true로 설정할 경우, 요소가 화면에서 사라질 때 다시 숨겨집니다.)

   // 윈도우의 스크롤 이벤트를 모니터링합니다.
   $(window).on('scroll', function() {
       // 각 "scroll_on" 클래스를 가진 요소에 대해 반복합니다.
       $counters.each(function() {
           const $el = $(this);
   
           // 요소의 위치 정보를 가져옵니다.
           const rect = $el[0].getBoundingClientRect();
           const winHeight = window.innerHeight; // 현재 브라우저 창의 높이
           const contentHeight = rect.bottom - rect.top; // 요소의 높이
           
           // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
           if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
               $el.addClass('active');
           }
           // 요소가 화면에서 완전히 사라졌을 때 처리합니다.
           if (loop && (rect.bottom <= 0 || rect.top >= window.innerHeight)) {
               $el.removeClass('active');
           }
       });
   }).scroll();

//-----gnb----------------------------------------------------------------------------------------------------

    $(".gnb>li").mouseenter(function(){
        $(".bg").stop().animate({"height":"350px"},100);
    });

    $("#header").mouseleave(function(){
        $(".bg").stop().animate({"height":"100px"},100);
    });


//-----banner----------------------------------------------------------------------------------------------------

$(".item_list").on("mousewheel", function (e) {
    let wheel = e.originalEvent.wheelDelta;
  
    if (wheel > 20) {
      //스크롤 올릴때
      $(".more_btn").show();
    } else {
      //스크롤 내릴때
      $(".more_btn").stop().fadeOut(300);
      
    }
  });
  

    $(".b_btn>li").click(function(){
        let list = $(this).index();
    
// 맨 위로 스크롤 이동

        $("#section .banner .wrap .item_wrap .item_list").stop().animate({ scrollTop: 0 });
        $(".more_btn").show();

        $("#section .banner .item_wrap").show();
        
        $(".item_wrap>ul").hide();
        $(".b_btn>li").removeClass("btnOn");
    
        $(".item_wrap>ul").eq(list).show();
        $(this).addClass("btnOn");
    });


    $(".b_bg").click(function(){       
        $("#section .banner .wrap .item_wrap").hide();
        $(".b_btn>li").removeClass("btnOn");

    

    });

//-----main_title----------------------------------------------------------------------------------------------------

    $(".page_dot>li").click(function(){

        list = $(this).index();

        $(".page_dot>li").removeClass("dotOn");
        $(".page_dot>li").eq(list).addClass("dotOn");

        $(".tit_list").stop().animate({"margin-left": -wid * list});
    });

    // 메인타이틀 오토 슬라이드
    setInterval(function(){
        
        if(list == count-1) {
            list = 0;
        } else {
            list ++ ;
        }

        $(".page_dot>li").removeClass("dotOn");
        $(".page_dot>li").eq(list).addClass("dotOn");

        $(".tit_list").stop().animate({"margin-left": "-100%"},function(){
            $(".tit_list>li").first().appendTo(".tit_list");
            $(".tit_list").css({"margin-left":"0%"});
        });
        
    }, 5000);

    // -----------------------------------------


    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.top_btn').fadeIn();
        } else {
            $('.top_btn').fadeOut();
        }
    });

    $('.top_btn').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // 모달 열기 버튼 클릭 이벤트
    $(".menu_icon").click(function() {
        // body 스크롤을 고정시킵니다.
        $('body').css('overflow', 'hidden');
        // 모달 창을 보이게 합니다.
        $(".modal_wrap").stop().fadeIn();
        $(".t_burgor").addClass("tOn");
        $(".m_burgor").addClass("mOn");
        $(".b_burgor").addClass("bOn");
    });

    // 모달 닫기 버튼 클릭 이벤트
    $(".close_btn").click(function() {
        // body 스크롤을 다시 활성화시킵니다.
        $('body').css('overflow', 'auto');
        // 모달 창을 숨깁니다.
        $(".modal_wrap").stop().fadeOut();
        $(".t_burgor").removeClass("tOn");
        $(".m_burgor").removeClass("mOn");
        $(".b_burgor").removeClass("bOn");
    });

    // 

    $(window).scroll(function() {
        let scrollPosition = $(this).scrollTop();
        
        $(".category>li").each(function() {
          
          if (scrollPosition > 300) {
            $(".series").addClass("show1");
            $(".closet").addClass("show2");
            $(".table").addClass("show3");
            $(".sofa").addClass("show4");
          }
        });
      }).scroll();

});

