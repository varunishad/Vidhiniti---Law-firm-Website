$(document).ready(function () {

  //--------------------------DISCLAIMER-----------------------
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function setDisclaimer() {
  setCookie('isCheck', 'true', 10)
}

function deleteDisclaimer() {
  setCookie('isCheck', 'false', 0)
}

function hideDisclaimer() {
  if ($(".disclaimer #accept").is(':checked')) {
    $('.disclaimer').fadeOut();
    setDisclaimer();
  } else {
    // $('.disclaimer .error').css('display','block');
    $('.disclaimer .error').fadeIn();
  }
}

function showDisclaimer() {
  deleteDisclaimer();
  $('.disclaimer').fadeIn();
}

function checkDisclaimer() {
  var isCheck = getCookie("isCheck");
  //alert(23);
  if (isCheck === "true") {
    //hideDisclaimer();
    $('.disclaimer').css("display", "none");
    // $('.disclaimer').fadeOut();
  } else {
    showDisclaimer();
  }
}

checkDisclaimer();

//showDisclaimer();

$('.disclaimer .btn').on('click', function () {
  hideDisclaimer();
});
  
  //-------------------------page transition----------------------
  var curPage = 1;
  // var curNav = 1;
  var numOfPages = $(".skwpage").length;
  var animTime = 1000;
  var scrolling = false;
  var pgPrefix = ".skwpage-";


  function pagination() {
    scrolling = true;

    $(pgPrefix + curPage).removeClass("inactive").addClass("active");
    // curNav = curPage;
    console.log('Cp', curPage)
    $(pgPrefix + (curPage - 1)).addClass("inactive");
    $(pgPrefix + (curPage + 1)).removeClass("active");

    $('.mainmenu li a').removeClass('highlight').addClass('navbar');
    $('.mainmenu li').eq(curPage - 1).find('a').addClass('highlight').removeClass('navbar');
    $('.mainmenu-mbl li a').removeClass('highlight-mbl').addClass('navbar-mbl');
    $('.mainmenu-mbl li').eq(curPage - 1).find('a').addClass('highlight-mbl').removeClass('navbar-mbl');

    setTimeout(function () {
      scrolling = false;
    }, animTime);
  };

  function pagiup() {
    scrolling = true;

    $('section .skwpage').addClass('active').addClass('inactive');
    $(pgPrefix + 5).removeClass('inactive');

    // $(pgPrefix ).removeClass("active");
    // $(pgPrefix + curPage).removeClass("inactive").addClass("active");
    // $(pgPrefix + (curPage - 1)).addClass("inactive");
    // $(pgPrefix + (curPage + 1)).removeClass("active");

    setTimeout(function () {
      scrolling = false;
    }, animTime);
  };

  function pagidown() {
    scrolling = true;

    $('section .skwpage').removeClass("active")
    // $(pgPrefix + curPage).removeClass("inactive").addClass("active");
    // $(pgPrefix + (curPage - 1)).addClass("inactive");
    // $(pgPrefix + (curPage + 1)).removeClass("active");

    setTimeout(function () {
      scrolling = false;
    }, animTime);
  };

  function navigateUp() {
    if (curPage === 1) {
      curPage = 6;
      pagiup();
    }
    curPage--;
    pagination();
  };

  function navigateDown() {
    if (curPage === numOfPages) {
      curPage = 0;
      pagidown();
    }
    curPage++;
    pagination();
  };

  $(document).on("wheel mousewheel DOMMouseScroll", function (e) {
    // console.log(e.originalEvent.deltaY);
    // console.log(e.originalEvent.detail);
    if (scrolling) return;
    if (-e.originalEvent.deltaY > 0 || e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      navigateUp();
    } else {
      navigateDown();
    }
  });

  $(document).on("keydown", function (e) {
    if (scrolling) return;
    if (e.which === 38) {
      navigateUp();
    } else if (e.which === 40) {
      navigateDown();
    }
  });

  //--------------------Moile phn Swipe Event----------------------

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches || // browser API
      evt.originalEvent.touches; // jQuery
  }

  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      /*most significant*/
      if (xDiff > 0) {
        /* left swipe */
      } else {
        /* right swipe */
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
        navigateDown();
      } else {
        /* down swipe */
        navigateUp();
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };

  // ------------------------PC Navigation menu-------------------------- 

  $('.mainmenu li a').click(function () {

    $('.mainmenu li a').removeClass('highlight').addClass('navbar');
    $(this).addClass('highlight').removeClass('navbar');

    for (let i = 0; i < numOfPages; i++) {
      if ($('.mainmenu li').eq(i).find('a').hasClass('highlight')) {

        var curNav = i + 1;
        if (curNav < curPage) {
          $('section .skwpage').removeClass('active').removeClass('inactive');
          for (let j = 0; j < curNav; j++) {
            $('section').eq(j).find('.skwpage').addClass('active');
            $('section').eq(j - 1).find('.skwpage').addClass('inactive');
            curPage = j + 1;
          }
          console.log(curNav);
          console.log(curPage);
        } else if (curNav > curPage) {
          console.log('lastpage=', curPage);
          for (let k = 0; k < curNav; k++) {
            $('section').eq(k - 1).find('.skwpage').addClass('inactive');
            $('section').eq(4).find('.skwpage').removeClass('inactive');
            $('section').eq(k).find('.skwpage').addClass('active').removeClass('inactive');

            curPage = k + 1;
          }
          console.log(curNav);
          console.log(curPage);
        }
      }
    }
  });

  // ------------------------Mobile Navigation menu-------------------------- 

  $('.mainmenu-mbl li a').click(function () {

    $('.mainmenu-mbl li a').removeClass('highlight-mbl').addClass('navbar-mbl');
    $(this).addClass('highlight-mbl').removeClass('navbar-mbl');

    for (let i = 0; i < numOfPages; i++) {
      if ($('.mainmenu-mbl li').eq(i).find('a').hasClass('highlight-mbl')) {
        var curNav = i + 1;
        if (curNav < curPage) {
          $('section .skwpage').removeClass('active').removeClass('inactive');
          for (let j = 0; j < curNav; j++) {
            $('section').eq(j).find('.skwpage').addClass('active');
            $('section').eq(j - 1).find('.skwpage').addClass('inactive');
            curPage = j + 1;
          }
          // console.log(curNav);
          // console.log(curPage);
        } else if (curNav > curPage) {
          for (let k = 0; k < curNav; k++) {
            $('section').eq(k - 1).find('.skwpage').addClass('inactive');
            $('section').eq(4).find('.skwpage').removeClass('inactive');
            $('section').eq(k).find('.skwpage').addClass('active').removeClass('inactive');

            curPage = k + 1;
          }
          // console.log(curNav);
          // console.log(curPage);
        }
      }
    }
    $('header').addClass('nav-close');
    $('header').removeClass('nav-open');
  });

  //------------------------- Scroll down button PC -------------------------

  $('#scrl').on('click', function () {
    if (($('.mainmenu li:last-child a').hasClass('highlight')) || ($('.mainmenu-mbl li:last-child a').hasClass('highlight-mbl'))) {
      $('.mainmenu li:last-child a').removeClass('highlight').addClass('navbar');
      $('.mainmenu-mbl li:last-child a').removeClass('highlight-mbl')
      $('.mainmenu li:first-child a').addClass('highlight').removeClass('navbar');
      $('.mainmenu-mbl li:first-child a').addClass('highlight-mbl')
      for (let l = 1; l < 4; l++) {
        $('section').eq(l).find('.skwpage').removeClass('active');
      }
      $('section').eq(4).find('.skwpage').removeClass('inactive').removeClass('active');
      $('section').eq(0).find('.skwpage').removeClass('inactive').addClass('active');
      curPage=1;
    } 
    // else if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //   $('.mainmenu-mbl li a.highlight-mbl').parent().next().find('a').click();
    //   curPage = curNav + 1;
    //  }
    else if ($('.mbl-nav').css('display') == 'inline-block')
    {
      $('.mainmenu-mbl li a.highlight-mbl').parent().next().find('a').click();
      curPage = curNav + 1;
    }
     else {   
      $('.mainmenu li a.highlight').parent().next().find('a').click();
      curPage = curNav + 1;
      console.log('curP',curPage);

    }
  });

  //------------------------- Scroll down button Mobile -------------------------

  // $('#scrl').on('click', function () {
  //   if ($('.mainmenu-mbl li:last-child a').hasClass('highlight-mbl')) {
  //     $('.mainmenu-mbl li').eq(0).find('a').click();
  //   } else {
  //     $('.mainmenu-mbl li a.highlight-mbl').parent().next().find('a').click();
  //   }
  // });

  // }
});
// },1000);