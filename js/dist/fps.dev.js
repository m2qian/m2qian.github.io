"use strict";

if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
  var rAF = function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  }();

  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();

  var loop = function loop() {
    var now = Date.now();
    var fs = now - lastFameTime;
    var fps = Math.round(1000 / fs);
    lastFameTime = now; // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS

    allFrameCount++;
    frame++;

    if (now > 1000 + lastTime) {
      var fps = Math.round(frame * 1000 / (now - lastTime));

      if (fps <= 5) {
        var kd = "<span style=\"color:#bd0000\">\u5361\u6210ppt\uD83E\uDD22</span>";
      } else if (fps <= 15) {
        var kd = "<span style=\"color:red\">\u7535\u7ADE\u7EA7\u5E27\u7387\uD83D\uDE16</span>";
      } else if (fps <= 25) {
        var kd = "<span style=\"color:orange\">\u6709\u70B9\u96BE\u53D7\uD83D\uDE28</span>";
      } else if (fps < 35) {
        var kd = "<span style=\"color:#9338e6\">\u4E0D\u592A\u6D41\u7545\uD83D\uDE44</span>";
      } else if (fps <= 45) {
        var kd = "<span style=\"color:#08b7e4\">\u8FD8\u4E0D\u9519\u54E6\uD83D\uDE01</span>";
      } else {
        var kd = "<span style=\"color:#39c5bb\">\u5341\u5206\u6D41\u7545\uD83D\uDE0B</span>";
      }

      document.getElementById("fps").innerHTML = "FPS:".concat(fps, " ").concat(kd);
      frame = 0;
      lastTime = now;
    }

    ;
    rAF(loop);
  };

  loop();
} else {
  document.getElementById("fps").style = "display:none!important";
}