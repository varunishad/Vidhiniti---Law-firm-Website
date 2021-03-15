// //--------------------------DISCLAIMER-----------------------
// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }
  
//   function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//     var expires = "expires=" + d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
//   }
  
//   function setDisclaimer() {
//     setCookie('isCheck', 'true', 10)
//   }
  
//   function deleteDisclaimer() {
//     setCookie('isCheck', 'false', 0)
//   }
  
//   function hideDisclaimer() {
//     if ($(".disclaimer #accept").is(':checked')) {
//       $('.disclaimer').fadeOut();
//       setDisclaimer();
//     } else {
//       // $('.disclaimer .error').css('display','block');
//       $('.disclaimer .error').fadeIn();
//     }
//   }
  
//   function showDisclaimer() {
//     deleteDisclaimer();
//     $('.disclaimer').fadeIn();
//   }
  
//   function checkDisclaimer() {
//     var isCheck = getCookie("isCheck");
//     //alert(23);
//     if (isCheck === "true") {
//       //hideDisclaimer();
//       $('.disclaimer').css("display", "none");
//       // setTimeout(function(){
//       // $('.disclaimer').fadeOut();
//     // },0);
//     } else {
//       showDisclaimer();
//     }
//   }
  
// //   setTimeout(function(){
//     checkDisclaimer();
// //   },0);
  
//   //showDisclaimer();
  
//   $('.disclaimer .btn').on('click', function () {
//     hideDisclaimer();
//   });