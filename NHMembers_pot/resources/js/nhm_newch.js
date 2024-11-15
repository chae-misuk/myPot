var selectselfOff;
function conFix() {
    selectselfOff = window.scrollY;
    $('body').css('top', - selectselfOff).addClass('scroll_off');
}
function conUnFix() {
    $('body').css('top', '').removeClass('scroll_off');
    window.scrollTo(0, selectselfOff); // 스크롤 위치
}

//카운팅
function numCost(el) {
    var $thisCost = el; // 숫자 값
    var CountContText = $thisCost.text().replace(/,/g,'');
    $({ val : 0}).animate({ val : CountContText}, {
        duration: 500,
        step: function(){
            var num = numberWithCommas(Math.floor(this.val));
            $thisCost.text(num);
        },
        complete: function(){
            var num = numberWithCommas(Math.floor(this.val));
            $thisCost.text(num);
        }
    });
    function numberWithCommas(x){
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

// 팝업
function openlayer(getName) {
    var lp = $('#' + getName);
    var lpH = lp.innerHeight() + 10;
    var lpObj = lp.children('.pop_inner');
    var lpObjClose = lp.find('.pop_close, .btn_close');
    var lpObjTabbable = lpObj.find('button, input:not([type="hidden"]), select, iframe, textarea, [href], [tabindex]:not([tabindex="-1"])');
    var lpObjTabbableFirst = lpObjTabbable && lpObjTabbable.first();
    var lpObjTabbableLast = lpObjTabbable && lpObjTabbable.last();
    var lpOuterObjHidden = $('#wrap, .skipnav, .balloons a'); // 레이어 바깥 영역의 요소
    // var all = $('.masthead, .page_footer').add(lp);
    var tabDisable;

    lp.addClass('on');
    if(lp.is('.type_btm')) {
        lp.show().stop().animate({bottom : 0}, 200);
        var lpMHE = $(window).height() - 150;
        if( lpH > lpMHE ){
            lp.find('.pop_con').addClass('scroll').css('max-height', lpMHE - 110);
            lp.find('.pop_con.scroll').scrollTop(0);
        }
        // lp.siblings('.type_ctr, .type_ctr02, .type_ctr03, .type_evt, .type_pit').removeClass('on').hide();
    }
    else {
        lp.show();
    }
    setTimeout(function(){
        if($('.layer_pop.on').length > 1){
            $('.layer_pop').siblings('.overlay').remove();
            if(lp.is('.type_btm')){
                var lpbH = lp.siblings('.type_btm.on').innerHeight() + 10;
                lp.siblings('.type_btm.on').hide().animate({bottom : - lpbH}, 200);
                if($('.overlay').length === 1){
                } else {
                    lp.before('<div class="overlay"></div>');
                }
            } else if(lp.is('.type_ctr, .type_ctr02, .type_ctr03, .type_evt, .type_pit')){
                lp.siblings('.type_ctr, .type_ctr02, .type_ctr03, .type_evt, .type_pit').removeClass('on').hide();
                if($('.overlay').length === 1){
                    lp.before('<div class="overlay"></div>');
                } else {
                    lp.before('<div class="overlay"></div>');
                }
            } else if(lp.is('.type_full')){
                lp.siblings('.type_ctr, .type_ctr02, .type_ctr03, .type_evt, .type_pit').removeClass('on').hide();
                lp.siblings('.type_full').removeClass('on');
            } 
        } else {
            conFix();
            lp.before('<div class="overlay"></div>');
        }

        lp.find('.btn_back').on('click', function(){
            if(lp.is('.type_full')){
                if(lp.siblings('.layer_pop').length === 0){
                    $('.overlay').remove();
                }
            }
        })
    }, 1);

    // 팝업 닫기
    function lpClose() {
        if (tabDisable === true) lpObj.attr('tabindex', '-1');
        if(lp.parents().is('#wrap')){
            // 레이어팝업이 #wrap안에 위치한 특수한 경우 별도 제어(샘플 - 금융상품몰)
            $('#header, .tab_sub2, #dataContent > .product_list').removeAttr('aria-hidden'); // 레이어 바깥 영역 해제
        } else {
            // 일반적인 레이어팝업 위치
            lpOuterObjHidden.removeAttr('aria-hidden'); // 레이어 바깥 영역 해제
        }

        lp.removeClass('on');
        lp.find('.pop_con').removeClass('scroll').removeAttr('style');
        if($('body').find('.layer_pop.on')){
            if(lp.is('.type_btm')) {
                lp.stop().animate({bottom : - lpH}, 200);
                lp.siblings(".overlay").remove();
                setTimeout(function(){
                    $('.type_btm').find('.tar_focus').removeClass('tar_focus');
                    $('.tar_focus').focus(); // 레이어 닫은 후 원래 있던 곳으로 초점 이동
                    lp.removeClass('on').hide();
                    $('.type_btm.on').removeClass('on');
                }, 100);
            } else {
                lp.hide();
                lp.find('.tar_focus').removeClass('tar_focus');
                $('.tar_focus').focus(); // 레이어 닫은 후 원래 있던 곳으로 초점 이동
                lp.siblings(".overlay").remove();
                $('.layer_pop.on').before('<div class="overlay"></div>');
            }
        } else {
            lp.siblings(".overlay").remove();
        }
        setTimeout(function(){
            if($('body').find('.layer_pop').is(':visible')){
                lpOuterObjHidden.attr('aria-hidden', 'true'); // 레이어 바깥 영역을 스크린리더가 읽지 않게
            } else {
                lpOuterObjHidden.removeAttr('aria-hidden'); // 레이어 바깥 영역 해제
                conUnFix(); // 레이어 닫은 후 body 스크롤 해제 및 화면 최상단으로 이동 방지
            }
        }, 300);
        $('.prevFocus').remove();
    }

    if(lp.parents().is('#wrap')){
        // 레이어팝업이 #wrap안에 위치한 특수한 경우 별도 제어(샘플 - 금융상품몰)
        $('#header, .tab_sub2, #dataContent > .product_list').attr('aria-hidden', 'true'); // 레이어 바깥 영역을 스크린리더가 읽지 않게
    } else {
        // 일반적인 레이어팝업 위치
        lpOuterObjHidden.attr('aria-hidden', 'true'); // 레이어 바깥 영역을 스크린리더가 읽지 않게
    }

    lpObj.prepend('<a href="#none" class="prevFocus" title="Focushidden"></a>');
    $('.prevFocus').focus().on('keydown', function(event) {
        if (event.shiftKey && (event.keyCode || event.which) === 9) {
            event.preventDefault();
            lpObjTabbableLast.focus();
        }   
    })
    lpObjTabbable.length ? lpObjTabbableFirst.on('keydown', function(event) {
        // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
        if (event.shiftKey && (event.keyCode || event.which) === 9) {
            // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
            event.preventDefault();
            lpObjTabbableLast.focus();
        }
    }) : lpObj.attr('tabindex', '0').focus().on('keydown', function(event){
        tabDisable = true;
        if ((event.keyCode || event.which) === 9) event.preventDefault();
        // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
    });

    lpObjTabbableLast.on('keydown', function(event) {
        if (!event.shiftKey && (event.keyCode || event.which) === 9) {
            // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
            event.preventDefault();
            lpObjTabbableFirst.focus();
        }
    });

    lpObjClose.on('click', lpClose); // 닫기 버튼 클릭 시 레이어 닫기

    // 오버레이 클릭시 닫기
    $("body").on('click', '.overlay', function(){
        // .layer_pop 안에 data-mode="allover 가 있는 경우 오버레이 클릭시 팝업 안닫힘.
        if($('body').find('[data-mode="allover"]').length === 0) {
            // 바텀팝업이 1개 이상인 경우 팝업 제어
            if($('.type_btm.on').length > 1){
                if($(this).next('.layer_pop').is('.type_ctr.on, .type_ctr02.on, .type_ctr03.on, .type_evt.on, .type_pit.on, .type_pit02.on')){
                    $('.type_btm.on').before('<div class="overlay"></div>');
                    $(this).next('.layer_pop').removeClass('on').hide();
                    $('.tar_focus').focus();
                } 
                // 클릭타겟 레이어가 바텀팝업인 경우
                else if($(this).next('.layer_pop').is('.type_btm')) {
                    setTimeout(function(){
                        $('.layer_pop.on').removeClass('on');
                        $(".overlay").remove();
                        $('.type_btm.on').find('.pop_con').removeClass('scroll').removeAttr('style');
                    }, 1);

                    var lpbH2 = $(this).next('.type_btm.on').innerHeight() + 10;
                    $(this).next('.type_btm.on').addClass('add').stop().animate({bottom : - lpbH2}, 200);
                    setTimeout(function(){
                        $('.type_btm').css('display', 'none').removeClass('add');
                    }, 200);
                }
                $('.type_btm').find('.tar_focus').removeClass('tar_focus');
                $('.tar_focus').focus();
            } 
            else if($('.type_ctr.on, .type_ctr02.on, .type_ctr03.on, .type_evt.on, .type_pit.on, .type_pit02.on').length === 1){
                $('.type_ctr.on, .type_ctr02.on, .type_ctr03.on, .type_evt.on, .type_pit.on, .type_pit02.on').removeClass('on').hide();
                setTimeout(function(){
                    $('.type_btm.on').show().stop().animate({bottom : 0}, 200);
                    $('.tar_focus').focus();
                }, 200);
            }  
            else {
                $(this).next('.type_btm.on').removeClass('on').addClass('add').stop().animate({bottom : - lpH}, 200);
                setTimeout(function(){
                    $('.type_btm.add').css('display', 'none').removeClass('add');
                }, 200);
            }
            
            if($('body').find('.layer_pop.on')){
                $(".overlay").remove();
                $('.layer_pop.on').before('<div class="overlay"></div>');
            } else {
                $(".overlay").remove();
            }
        }
        if(lp.parents().is('#wrap')){
            // 레이어팝업이 #wrap안에 위치한 특수한 경우 별도 제어(샘플 - 금융상품몰)
            $('#header, .tab_sub2, #dataContent > .product_list').removeAttr('aria-hidden'); // 레이어 바깥 영역 해제
        } else {
            // 일반적인 레이어팝업 위치
            lpOuterObjHidden.removeAttr('aria-hidden'); // 레이어 바깥 영역 해제
        }
        setTimeout(function(){
            if($('body').find('.layer_pop').is(':visible')){
                lpOuterObjHidden.attr('aria-hidden', 'true'); // 레이어 바깥 영역을 스크린리더가 읽지 않게
            } else {
                lpOuterObjHidden.removeAttr('aria-hidden'); // 레이어 바깥 영역 해제
                conUnFix();
            }
        }, 300);
        
        $('.prevFocus').remove();
    });
};

// 토스트 팝업
function toast() {
    var actToast = $('.toast_box');
    actToast.addClass('act');
    actToast.attr('aria-hidden', 'false');

    setTimeout(function(){
        actToast.removeClass('act');
        actToast.attr('aria-hidden', 'true');
    }, 3000);
}

// 로딩
function loadingAni() {
    $('.type_loading').show();
}
function loadingAniEnd() {
    $('.type_loading').hide();
}

// 메뉴
function opengnb() {
    var btnTar = $('.btn_menu');
    var btnTar02 = $('<button type="button" class="btn_menu on" aria-label="전체메뉴 닫기" aria-haspopup="true" aria-controls="menu" onclick="openTopGnb()"></button>');
    var menuTar = $('.menu');

    $('.gnb').append(btnTar02);
    if($('#wrap').hasClass('allone')){
        $('.top').append(btnTar02);
    }
    
    if(menuTar.hasClass('on')){
        menuTar.removeClass('on');
        menuTar.attr('aria-hidden', 'true');
        conUnFix(); // 레이어 닫은 후 body 스크롤 해제 및 화면 최상단으로 이동 방지
        $('#contents, #footer').removeAttr('aria-hidden');
        $('.btn_menu.on').remove();
        btnTar.show().focus();

    } else {
        menuTar.show();
        menuTar.attr('aria-hidden', 'false');
        btnTar.hide();
        $('.btn_menu.on').show().focus();
        setTimeout(function() {
            menuTar.addClass('on');
        }, 1);
        conFix(); // 레이어 열린 상태에서 body 스크롤되는 문제 방지
        $('#contents, #footer').attr('aria-hidden', 'true');
        $('.menu_inner').scrollTop(0);
    }

    menuTar.find('button:last, [href]:last').on('keydown', function(event) {
        if (!event.shiftKey && (event.keyCode || event.which) === 9) {
            event.preventDefault();
            $('.btn_menu').focus();
        }
    })
}

function setAddID(name){
    return `${name}${Math.random().toString(36).substring(2, 16)}`;
}

$(function(){
    //numCost($('[data-mode="count"]'));

    $('.gnb a').on('click', function(){
        $('.gnb').find('.on').removeClass('on').removeAttr('title');;
        $(this).addClass('on').attr('title', '선택됨');
    });

    if($('.wrap_landing').find('span.img').is(':visible')){
        $('.wrap_landing').addClass('ty01')
    }
    // footer
    $('footer button').on('click', function(){
        var footOffTop = $('#footer').offset().top ;
        $(this).toggleClass('on');
        $(this).siblings('div').toggle();
        if($(this).is('.on')){
            $(this).attr('aria-expanded', 'false');
        } else {
            $(this).attr('aria-expanded', 'true');
            $(window).scrollTop(footOffTop);
        }
    });
    $(window).scroll(function(){
        var scTop = $(window).scrollTop();
        var inHei = $(window).innerHeight();
        if (scTop > 100) {
            $('#btnTop').show();
        } else {
            $('#btnTop').hide();
        }
        if($('#footer').is(':visible')){
            var footTop = $('#footer').offset().top ;
            var footHei = $('#footer').innerHeight();
            if (scTop + inHei > footTop) {
                $('#btnTop').addClass('fix').css('bottom', footHei + 27);
            } else {
                $('#btnTop').removeClass('fix').css('bottom', '3.5rem');
            }
        } else if ($('.wrap_action').is(':visible')) {
            var btnTop = $('.wrap_action').offset().top ;
            var btnHei = $('.wrap_action').innerHeight();
            if (scTop + inHei > btnTop) {
                $('#btnTop').css('bottom', btnHei + 27);
            } else {
                $('#btnTop').css('bottom', '3.5rem');
            }
        }
        else {
            $('#btnTop').removeClass('fix').css('bottom', '3.5rem');
        }
        // 카드애니메이션
        $('[data-mode="load"]').each(function(i){
            var cardTop = $(this).offset().top - $(window).height();
            var winTop = $(window).scrollTop();
            if( winTop > cardTop ){
                $(this).addClass('active');
            }
        });
        $('[data-mode="step"]').each(function(i){
            var stepTop = $(this).offset().top - $(window).height()/2;
            var winTop02 = $(window).scrollTop();
            var stepPa = $(this).closest('.con_t4');
            if(stepPa.closest('.ui_cont').is('.active')){
                if( winTop02 > stepTop ){
                    $(this).addClass('motion');
                }
            }
        });
    })

    $('#btnTop').on('click', function(){
        var Topset = $('body').offset().top;
        $('html, body').animate({scrollTop : Topset}, 400);
    });

    // 카드애니메이션
    if($(window).scrollTop() == 0){
        $('[data-mode="load"]').each(function(i){
            var cardTop = $(this).offset().top - $(window).height();
            var winTop = $(window).scrollTop();
            if(winTop > cardTop){
                $(this).addClass('active');
            }
        });
        $('[data-mode="step"]').each(function(i){
            var stepTop = $(this).offset().top - $(window).height()/2;
            var winTop02 = $(window).scrollTop();
            var stepPa = $(this).closest('.con_t4');
            if(stepPa.closest('.ui_cont').is('.active')){
                if( winTop02 > stepTop ){
                    $(this).addClass('motion');
                }
            }
        });
    }

    // accodion
    $('.faq_list li .ans').each(function(){
        var ansTar = $(this).parents('li');
        var ansIdx = ansTar.index() + 1;

        $(this).attr('id', 'faqli' + ansIdx);
        $(this).siblings('a').attr('aria-controls', 'faqli' + ansIdx);
    });
    $('.faq_list li .qst').on('click', function(){
        var accTar = $(this);
        var accTarPa = accTar.parents('li');
        var accIdx = accTarPa.index() + 1;

        accTarPa.toggleClass('on');
        accTarPa.siblings('li').removeClass('on');
        accTarPa.siblings('li').find('.qst').attr('aria-expanded', 'false');
        if(accTar.attr('aria-expanded') === 'true' ){
            accTar.attr('aria-expanded', 'false');
        } else {
            accTar.attr('aria-expanded', 'true');
        }
    });

    $('.area_toggle1').find('.tit [data-toggle="btn"]').attr('aria-expanded', 'false');
    $('.area_toggle1 .active').find('.tit [data-toggle="btn"]').attr('aria-expanded', 'true');
    $('[data-toggle="btn"]').on('click', function(){
        var areaTar = $(this);
        var areaTarcls = areaTar.closest('.tit');
        var areaTarPa = areaTar.parents('dl, li');
        var areaIdx = areaTarPa.index() + 1;
        var areaNewid = areaTarcls.siblings('[data-toggle="cont"]');

        areaTarPa.toggleClass('active');
        areaTar.attr('aria-controls', 'tgcon' + areaIdx);
        areaNewid.attr('id', 'tgcon' + areaIdx);
        if(areaTar.parents().is('li')){
            areaTar.attr('aria-controls', 'tgcon2' + areaIdx);
            areaNewid.attr('id', 'tgcon2' + areaIdx);
        }
        if(areaTar.attr('aria-expanded') === 'true' ){
            areaTar.attr('aria-expanded', 'false');
        } else {
            areaTar.attr('aria-expanded', 'true');
        }
    });

    // popup
    $('.layer_pop.type_btm').each(function(){
        var lpHE = $(this).innerHeight() + 10;
        $(this).css('bottom', - lpHE);
    })
    $('.btn_layer').on('click', function(){
        $(this).addClass('tar_focus');
        if($(this).parents().is('#wrap')){
            $('#wrap').find('.tar_focus').removeClass('tar_focus');
            $(this).addClass('tar_focus');
        } else if ($(this).parents().is('.layer_pop')) {
            $(this).parents('.layer_pop').find('.tar_focus').removeClass('tar_focus');
            $(this).addClass('tar_focus');
        }
    });

    if($('#contents .wrap_action button').is(':visible')){
        $('#content, #sub_content').addClass('type02');
    }

    var pages = $('[data-page="comp"]');
    if($('#wrap').find(pages).length > 0){
        $('#wrap').addClass('comp_wr');
    }

    var agent = navigator.userAgent.toLowerCase();
    if( agent.indexOf("iphone") > -1 || agent.indexOf("ipad") > -1 || agent.indexOf("ipod") > -1 ) {
        // IOS인 경우
        var inpHeiT = $('.inp_txt input');
        inpHeiT.on('click', function(e){
        var inpHeiY = e.clientY; 
        var inpHeiY0 = $(this).offset().top - 65;
        var inpHeiY01 = $(this).position().top + 15;
        var inpHeiY02 = $(window).height();
        var inpHeiY02_2 = $(window).height() / 2.5;
        var inpHeiYSum = inpHeiY02 - inpHeiY; 
        if(inpHeiYSum < inpHeiY02_2){
            $('#wrap, .type_full .pop_inner').css('padding-bottom', inpHeiY02_2);
            $('html, body').animate({scrollTop : inpHeiY0}, 400);
            $('.type_full .pop_inner').animate({scrollTop : inpHeiY01}, 400);
        }
        })
    }

    $('.inp_txt .util').prev('input[type="tel"], span').css('text-align', 'right');
    $('.inp_txt .util.ty02').prev('span').addClass('inp_ty');

    $('[data-label="tooltip"]').on('click', function(){
        var tollBtn = $(this);
        var tollPosT = $(this).position().top;
        var tollHei = $(this).innerHeight();
        var tollSum = tollPosT + tollHei;
        var tollTar = $('#' + $(this).attr('aria-controls'));
        var tollTar2 = tollTar.innerHeight();
        var tollTarPop = tollBtn.parents('.pop_inner').innerHeight();
        var tollTarPopSum = tollTarPop - tollSum - 136;
        var tollTarPopSum1 = tollTarPop - tollSum - 85;
        var tollTarPopSum2 = tollPosT - tollTar2;

        $('.tooltip').hide();
        if(tollBtn.parents().is('.pop_con')) {
            if(tollBtn.parents().find('.wrap_action').is(':visible')){
                if(tollTar2 > tollTarPopSum){
                    tollTar.show().css({top:tollTarPopSum2});
                    tollBtn.addClass('reverse');
                } else {
                    tollTar.show().css({top:tollSum});
                }
            } else {
                if(tollTar2 > tollTarPopSum1){
                    tollTar.show().css({top:tollTarPopSum2});
                    tollBtn.addClass('reverse');
                } else {
                    tollTar.show().css({top:tollSum});
                }
            }
        } else {
            tollTar.show().css({top:tollSum});
        }

        tollTar.find('.close').on('click', function(){
            tollTar.hide();
            tollBtn.removeClass('reverse');
            $('.tar_focus').focus().removeClass('tar_focus');
        })

        var tollTarTabbable = tollTar.find('button, [href]');
        var tollTarTabbableFirst = tollTarTabbable && tollTarTabbable.first();
        var tollTarTabbableLast = tollTarTabbable && tollTarTabbable.last();
        tollTarTabbable.focus();
        tollTarTabbableFirst.on('keydown', function(event) {
            if (event.shiftKey && (event.keyCode || event.which) === 9) {
                event.preventDefault();
                tollTarTabbableLast.focus();
            }
        });
        tollTarTabbableLast.on('keydown', function(event) {
            if (!event.shiftKey && (event.keyCode || event.which) === 9) {
                event.preventDefault();
                tollTarTabbableFirst.focus();
            }
        });

    });

    $('.btn_set3 button').on('click', function(){
        var Tar = $(this);
        var Atar = Tar.parents('.btn_set3');

        Atar.find('.active').removeClass('active').removeAttr('title');
        Tar.addClass('active').attr('title', '선택됨');
    });

    //탭버튼 : 기본 셋팅
    $('[data-mode="tablist"] li').each(function(i, obj){
        var _tab_ul = $(obj).parent('ul'),
            _tab_li = $(obj),
            _tab_el = _tab_li.find('> a'),
            _tab_con = _tab_el.attr('href');

        _tab_ul.attr('role','tablist');
        _tab_el.attr({
            'id':setAddID('uiTabbtn'),
            'role':"tab",
            'aria-selected':"false"
        });
        $(_tab_con).attr({
            'tabindex':"0",
            'role':"tabpanel",
            //'aria-labelledby':_tab_el.attr('id')
        })

        if(_tab_li.hasClass('active')) _tab_el.attr('aria-selected','true');
    });

    //탭버튼 : 클릭이벤트
    $(document).on('click.tab','[data-mode="tablist"] li > a', function(e){
        e.preventDefault();
        $(window).scrollTop(0);

        var _el = $(this);
        var _el_li = _el.parents('ul').find('> li');
        var _el_btn = _el_li.find('> a');

        _el_btn.each(function(i, tar){
            var _el_con = $(tar).attr('href');
            $(tar).attr('aria-selected','false');
            $(_el_con).removeClass('active');
        });

        _el.parent('li').addClass('active').siblings('li').removeClass('active');
        _el.attr('aria-selected','true');
        $(_el.attr('href')).addClass('active');
        $('[role="tabpanel"]').find('li').removeClass('motion');
    });

    // 스크롤 체크 후 버튼제어
    // $.fn.hasScrollBar = function() {
    //     return (this.prop("scrollHeight") == 0 && this.prop("clientHeight") == 0) || (this.prop("scrollHeight") > this.prop("clientHeight"));
    // };
    // if($("body").hasScrollBar() ){
    //     $('#content .wrap_action, #sub_content .wrap_action').addClass('enved');
    //     $('.layer_pop .wrap_action').removeClass('enved');
    // }

    if($('#contents').innerHeight() > $(window).height()){
        $('#content .wrap_action, #sub_content .wrap_action').addClass('enved');
        $('.layer_pop .wrap_action').removeClass('enved');
    }
});