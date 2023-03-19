"use strict";

// 分享本页
function share_() {
  var url = window.location.origin + window.location.pathname;

  try {
    // 截取标题
    var title = document.title;
    var subTitle = title.endsWith("| Rugu☕") ? title.substring(0, title.length - 14) : title;
    navigator.clipboard.writeText('Rugu☕的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎来访！🍭🍭🍭');
    new Vue({
      data: function data() {
        this.$notify({
          title: "成功复制分享信息🎉",
          message: "您现在可以通过粘贴直接跟小伙伴分享了！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        }); // return { visible: false }
      }
    });
  } catch (err) {
    console.error('复制失败！', err);
  }
} // 防抖


function share() {
  debounce(share_, 300);
}