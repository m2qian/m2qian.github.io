"use strict";

/** 监听copy事件 */
document.addEventListener("copy", function (e) {
  //复制的内容
  btf.snackbarShow('复制成功，请遵循GPL协议', false, 3000);
});