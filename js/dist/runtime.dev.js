"use strict";

var now = new Date();

function createtime() {
  now.setTime(now.getTime() + 1e3);
  var e = new Date("11/01/2022 00:00:00"),
      t = Math.trunc(234e8 + (now - e) / 1e3 * 17),
      a = (t / 1496e5).toFixed(6),
      n = new Date("11/01/2022 00:00:00"),
      s = (now - n) / 1e3 / 60 / 60 / 24,
      o = Math.floor(s),
      r = (now - n) / 1e3 / 60 / 60 - 24 * o,
      i = Math.floor(r);
  1 == String(i).length && (i = "0" + i);
  var l = (now - n) / 1e3 / 60 - 1440 * o - 60 * i,
      b = Math.floor(l);
  1 == String(b).length && (b = "0" + b);
  var d = (now - n) / 1e3 - 86400 * o - 3600 * i - 60 * b,
      c = Math.round(d);
  1 == String(c).length && (c = "0" + c);
  var g = "";
  g = i < 18 && i >= 9 ? "<img class='boardsign' src='https://img.shields.io/badge/R\u5C0F\u5C4B-\u4E0A\u73ED\u6478\u9C7C\u4E2D-6adea8?style=social&logo=cakephp' title='\u4E0A\u73ED\u65F6\u95F4\u8FD8\u662F\u5F97\u660E\u786E\u81EA\u5DF1\u7684\u76EE\u6807\u5462'><span class='textTip'> <br> <b>\u672C\u7AD9\u5C45\u7136\u8FD0\u884C\u4E86 ".concat(o, " \u5929</span><span id='runtime'> ").concat(i, " \u5C0F\u65F6 ").concat(b, " \u5206 ").concat(c, " \u79D2 </b></span> <i id=\"heartbeat\" class='fas fa-heartbeat' style='color:red'></i> <br> <b>\u65C5\u884C\u8005 1 \u53F7\u5F53\u524D\u8DDD\u79BB\u5730\u7403 ").concat(t, " \u5343\u7C73\uFF0C\u7EA6\u4E3A ").concat(a, " \u4E2A\u5929\u6587\u5355\u4F4D \uD83D\uDE80</b> <br> <b><font size=2px>\u8FD9\u91CC\u6709\u4E00\u9897\u661F\u661F\uFF0C\u5B83\u7B49\u8FC7\u6625\u590F\u79CB\u51AC\u7684\u6D41\u8F6C\uFF0C\u7B49\u8FC7\u5C71\u5DDD\u6E56\u6CCA\u7684\u6668\u66AE\uFF0C\u7B49\u8FC7\u6F2B\u6F2B\u5B64\u706F\u7684\u957F\u591C\uFF0C\u5B83\u5728\u7B49\u4F60\uFF0C\u7B49\u4F60\u62AB\u661F\u6234\u6708\u8F7D\u7740\u5C81\u6708\u7684\u6668\u5149\u800C\u6765\u70B9\u4EAE\u5B83\u7684\u4E16\u754C\u2728</font></b> ") : "<img class='boardsign' src='https://img.shields.io/badge/R\u5C0F\u5C4B-\u6253\u70CA\u4F11\u606F\u5566-6adea8?style=social&logo=coffeescript' title='\u4E0B\u73ED\u4E86\u5C31\u8BE5\u60A0\u95F2\u4E00\u4E9B\u5566\uFF0C\u966A\u966A\u5973\u670B\u53CB\uFF0C\u64B8\u64B8\u732B~'><span class='textTip'> <br> <b>\u672C\u7AD9\u5C45\u7136\u8FD0\u884C\u4E86 ".concat(o, " \u5929</span><span id='runtime'> ").concat(i, " \u5C0F\u65F6 ").concat(b, " \u5206 ").concat(c, " \u79D2 </b></span> <i id=\"heartbeat\" class='fas fa-heartbeat' style='color:red'></i> <br> <b>\u65C5\u884C\u8005 1 \u53F7\u5F53\u524D\u8DDD\u79BB\u5730\u7403 ").concat(t, " \u5343\u7C73\uFF0C\u7EA6\u4E3A ").concat(a, " \u4E2A\u5929\u6587\u5355\u4F4D \uD83D\uDE80</b> <br> <b><font size=2px>\u8FD9\u91CC\u6709\u4E00\u9897\u661F\u661F\uFF0C\u5B83\u7B49\u8FC7\u6625\u590F\u79CB\u51AC\u7684\u6D41\u8F6C\uFF0C\u7B49\u8FC7\u5C71\u5DDD\u6E56\u6CCA\u7684\u6668\u66AE\uFF0C\u7B49\u8FC7\u6F2B\u6F2B\u5B64\u706F\u7684\u957F\u591C\uFF0C\u5B83\u5728\u7B49\u4F60\uFF0C\u7B49\u4F60\u62AB\u661F\u6234\u6708\u8F7D\u7740\u5C81\u6708\u7684\u6668\u5149\u800C\u6765\u70B9\u4EAE\u5B83\u7684\u4E16\u754C\u2728</font></b> "), document.getElementById("workboard") && (document.getElementById("workboard").innerHTML = g);
}

setInterval(function () {
  createtime();
}, 1e3);