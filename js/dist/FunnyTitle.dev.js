"use strict";

// <!--浏览器恶搞标题-->
var OriginTitle = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    $('[rel="icon"]').attr('href', "/img/trhx2.png");
    document.title = '┭┮﹏┭┮_网页崩溃了！';
    clearTimeout(titleTime);
  } else {
    $('[rel="icon"]').attr('href', "/img/trhx2.png");
    document.title = '😏嘿，是不是骗到你小子了' + OriginTitle;
    titleTime = setTimeout(function () {
      document.title = OriginTitle;
    }, 2000);
  }
});