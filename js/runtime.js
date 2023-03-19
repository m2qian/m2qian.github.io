var now = new Date();
function createtime() {
  now.setTime(now.getTime() + 1e3);
  var e = new Date("11/01/2022 00:00:00"),
    t = Math.trunc(234e8 + ((now - e) / 1e3) * 17),
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
  let g = "";
  (g =
    i < 18 && i >= 9
      ? `<img class='boardsign' src='https://img.shields.io/badge/R小屋-上班摸鱼中-6adea8?style=social&logo=cakephp' title='上班时间还是得明确自己的目标呢'><span class='textTip'> <br> <b>本站居然运行了 ${o} 天</span><span id='runtime'> ${i} 小时 ${b} 分 ${c} 秒 </b></span> <i id="heartbeat" class='fas fa-heartbeat' style='color:red'></i> <br> <b>旅行者 1 号当前距离地球 ${t} 千米，约为 ${a} 个天文单位 🚀</b> <br> <b><font size=2px>这里有一颗星星，它等过春夏秋冬的流转，等过山川湖泊的晨暮，等过漫漫孤灯的长夜，它在等你，等你披星戴月载着岁月的晨光而来点亮它的世界✨</font></b> `
      : `<img class='boardsign' src='https://img.shields.io/badge/R小屋-打烊休息啦-6adea8?style=social&logo=coffeescript' title='下班了就该悠闲一些啦，陪陪女朋友，撸撸猫~'><span class='textTip'> <br> <b>本站居然运行了 ${o} 天</span><span id='runtime'> ${i} 小时 ${b} 分 ${c} 秒 </b></span> <i id="heartbeat" class='fas fa-heartbeat' style='color:red'></i> <br> <b>旅行者 1 号当前距离地球 ${t} 千米，约为 ${a} 个天文单位 🚀</b> <br> <b><font size=2px>这里有一颗星星，它等过春夏秋冬的流转，等过山川湖泊的晨暮，等过漫漫孤灯的长夜，它在等你，等你披星戴月载着岁月的晨光而来点亮它的世界✨</font></b> `),
    document.getElementById("workboard") &&
      (document.getElementById("workboard").innerHTML = g);
}
setInterval(() => {
  createtime();
}, 1e3);
