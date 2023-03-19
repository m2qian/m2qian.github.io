"use strict";

// 霓虹灯效果
// 颜色数组
var arr = ["#39c5bb", "#f14747", "#f1a247", "#f1ee47", "#b347f1", "#1edbff", "#ed709b", "#5636ed"]; // 颜色索引

var idx = 0; // 切换颜色

function changeColor() {
  // 仅夜间模式才启用
  if (document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark') {
    if (document.getElementById("site-name")) document.getElementById("site-name").style.textShadow = arr[idx] + " 0 0 15px";
    if (document.getElementById("site-title")) document.getElementById("site-title").style.textShadow = arr[idx] + " 0 0 15px";
    if (document.getElementById("site-subtitle")) document.getElementById("site-subtitle").style.textShadow = arr[idx] + " 0 0 10px";
    if (document.getElementById("post-info")) document.getElementById("post-info").style.textShadow = arr[idx] + " 0 0 5px";

    try {
      document.getElementsByClassName("author-info__name")[0].style.textShadow = arr[idx] + " 0 0 12px";
      document.getElementsByClassName("author-info__description")[0].style.textShadow = arr[idx] + " 0 0 12px";
    } catch (_unused) {}

    idx++;

    if (idx == 8) {
      idx = 0;
    }
  } else {
    // 白天模式恢复默认
    if (document.getElementById("site-name")) document.getElementById("site-name").style.textShadow = "#1e1e1ee0 1px 1px 1px";
    if (document.getElementById("site-title")) document.getElementById("site-title").style.textShadow = "#1e1e1ee0 1px 1px 1px";
    if (document.getElementById("site-subtitle")) document.getElementById("site-subtitle").style.textShadow = "#1e1e1ee0 1px 1px 1px";
    if (document.getElementById("post-info")) document.getElementById("post-info").style.textShadow = "#1e1e1ee0 1px 1px 1px";

    try {
      document.getElementsByClassName("author-info__name")[0].style.textShadow = "";
      document.getElementsByClassName("author-info__description")[0].style.textShadow = "";
    } catch (_unused2) {}
  }
} // 开启计时器


window.onload = setInterval(changeColor, 1200); // 存数据
// name：命名 data：数据

function saveData(name, data) {
  localStorage.setItem(name, JSON.stringify({
    'time': Date.now(),
    'data': data
  }));
} // 取数据
// name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据


function loadData(name, time) {
  var d = JSON.parse(localStorage.getItem(name)); // 过期或有错误返回 0 否则返回数据

  if (d) {
    var t = Date.now() - d.time;
    if (t < time * 60 * 1000 && t > -1) return d.data;
  }

  return 0;
} // 上面两个函数如果你有其他需要存取数据的功能，也可以直接使用
// 读取背景


try {
  var data = loadData('blogbg', 1440);
  if (data) changeBg(data, 1);else localStorage.removeItem('blogbg');
} catch (error) {
  localStorage.removeItem('blogbg');
} // 切换背景函数
// 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
// 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.


function changeBg(s, flag) {
  var bg = document.getElementById('web_bg');

  if (s.charAt(0) == '#') {
    bg.style.backgroundColor = s;
    bg.style.backgroundImage = 'none';
  } else bg.style.backgroundImage = s;

  if (!flag) {
    saveData('blogbg', s);
  }
} // 以下为2.0新增内容
// 创建窗口


var winbox = '';

function createWinbox() {
  var div = document.createElement('div');
  document.body.appendChild(div);
  winbox = WinBox({
    id: 'changeBgBox',
    index: 999,
    title: "切换背景",
    x: "center",
    y: "center",
    minwidth: '300px',
    height: "60%",
    background: 'var(--leonus-blue)',
    onmaximize: function onmaximize() {
      div.innerHTML = "<style>body::-webkit-scrollbar {display: none;}div#changeBgBox {width: 100% !important;}</style>";
    },
    onrestore: function onrestore() {
      div.innerHTML = '';
    }
  });
  winResize();
  window.addEventListener('resize', winResize); // 每一类我放了一个演示，直接往下复制粘贴 a标签 就可以，需要注意的是 函数里面的链接 冒号前面需要添加反斜杠\进行转义

  winbox.body.innerHTML = "\n    <div id=\"article-container\" style=\"padding:10px;\">\n    \n    <p><button onclick=\"localStorage.removeItem('blogbg');location.reload();\" style=\"background:#5fcdff;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;\"><i class=\"fa-solid fa-arrows-rotate\"></i> \u70B9\u6211\u6062\u590D\u9ED8\u8BA4\u80CC\u666F</button></p>\n    <h2 id=\"\u56FE\u7247\uFF08\u624B\u673A\uFF09\"><a href=\"#\u56FE\u7247\uFF08\u624B\u673A\uFF09\" class=\"headerlink\" title=\"\u56FE\u7247\uFF08\u624B\u673A\uFF09\"></a>\u56FE\u7247\uFF08\u624B\u673A\uFF09</h2>\n    <div class=\"bgbox\">\n    <a href=\"javascript:;\" rel=\"noopener external nofollow\" style=\"background-image:url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)\" class=\"pimgbox\" onclick=\"changeBg('url(https://img.vm.laomishuo.com/image/2021/12/2021122715170589.jpeg)')\"></a>\n    </div>\n    \n    <h2 id=\"\u56FE\u7247\uFF08\u7535\u8111\uFF09\"><a href=\"#\u56FE\u7247\uFF08\u7535\u8111\uFF09\" class=\"headerlink\" title=\"\u56FE\u7247\uFF08\u7535\u8111\uFF09\"></a>\u56FE\u7247\uFF08\u7535\u8111\uFF09</h2>\n    <div class=\"bgbox\">\n    <a href=\"javascript:;\" rel=\"noopener external nofollow\" style=\"background-image:url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)\" class=\"imgbox\" onclick=\"changeBg('url(https://cn.bing.com/th?id=OHR.GBRTurtle_ZH-CN6069093254_1920x1080.jpg)')\"></a>\n    </div>\n    \n    \n    \n    <h2 id=\"\u6E10\u53D8\u8272\"><a href=\"#\u6E10\u53D8\u8272\" class=\"headerlink\" title=\"\u6E10\u53D8\u8272\"></a>\u6E10\u53D8\u8272</h2>\n    <div class=\"bgbox\">\n    <a href=\"javascript:;\" rel=\"noopener external nofollow\" class=\"box\" style=\"background: linear-gradient(to right, #eecda3, #ef629f)\" onclick=\"changeBg('linear-gradient(to right, #eecda3, #ef629f)')\"></a>\n    </div>\n    \n    <h2 id=\"\u7EAF\u8272\"><a href=\"#\u7EAF\u8272\" class=\"headerlink\" title=\"\u7EAF\u8272\"></a>\u7EAF\u8272</h2>\n    <div class=\"bgbox\">\n    <a href=\"javascript:;\" rel=\"noopener external nofollow\" class=\"box\" style=\"background: #7D9D9C\" onclick=\"changeBg('#7D9D9C')\"></a> \n    </div>\n";
} // 适应窗口大小


function winResize() {
  var offsetWid = document.documentElement.clientWidth;

  if (offsetWid <= 768) {
    winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
  } else {
    winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
  }
} // 切换状态，窗口已创建则控制窗口显示和隐藏，没窗口则创建窗口


function toggleWinbox() {
  if (document.querySelector('#changeBgBox')) winbox.toggleClass('hide');else createWinbox();
}

function whenDOMReady() {
  // 背景localstorage
  try {
    var _data = loadData('blogbg', 1440);

    if (_data) changeBg(_data, 1);else localStorage.removeItem('blogbg');
  } catch (error) {
    localStorage.removeItem('blogbg');
  }
}

whenDOMReady();
document.addEventListener("pjax:success", whenDOMReady); // 防抖全局计时器

var TT = null; //time用来控制事件的触发
// 防抖函数:fn->逻辑 time->防抖时间

function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
} // 复制提醒


document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function data() {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    });
  }, 300);
});

if (GLOBAL_CONFIG.Snackbar) {
  btf.snackbarShow('欢迎光临');
}