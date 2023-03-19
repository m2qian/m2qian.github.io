"use strict";

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//创建一个音乐播放器的类 单例模式
var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    //类的构造函数
    //如果没有实例化，就去构造一个实例
    return this.getInstance.apply(this, arguments);
  } //构建实例


  _createClass(Player, [{
    key: "getInstance",
    value: function getInstance() {
      var instance = _construct(PlayerCreator, Array.prototype.slice.call(arguments)); //让实例可以使用到Player的原型的属性方法
      // instance.__proto__=Player.prototype;
      // instance.constructor=Player;
      //把构建好的实例挂在Player类上


      Player.instance = instance;
      return instance;
    }
  }]);

  return Player;
}(); //歌曲信息


var Musics =
/*#__PURE__*/
function () {
  //歌曲
  function Musics() {
    _classCallCheck(this, Musics);

    this.songs = [{
      id: 1,
      title: '越权访问-崩坏：星穹铁道 - Hanser',
      singer: '越权访问-崩坏：星穹铁道 - Hanser',
      songUrl: './songs/1.mp3',
      imageUrl: './images/songs/1.webp'
    }, {
      id: 2,
      title: '妄想Reality（翻自 洛天依） - 炎祾',
      singer: '妄想Reality（翻自 洛天依） - 炎祾',
      songUrl: './songs/2.mp3',
      imageUrl: './images/songs/2.webp'
    }, {
      id: 3,
      title: '人间失宠 - 昔诺',
      singer: '人间失宠 - 昔诺',
      songUrl: './songs/3.mp3',
      imageUrl: './images/songs/3.webp'
    }, {
      id: 4,
      title: '崩坏世界的歌姬 (Movie Ver.) - 小林未郁',
      singer: '崩坏世界的歌姬 (Movie Ver.) - 小林未郁',
      songUrl: './songs/4.mp3',
      imageUrl: './images/songs/4.webp'
    }, {
      id: 5,
      title: '玛德琳娜电塔 - 花玲',
      singer: '玛德琳娜电塔 - 花玲',
      songUrl: './songs/5.mp3',
      imageUrl: './images/songs/5.webp'
    }];
  } //根据索引获取歌曲的方法


  _createClass(Musics, [{
    key: "getSongByNum",
    value: function getSongByNum(index) {
      return this.songs[index];
    }
  }]);

  return Musics;
}(); //真正的构建播放器的类


var PlayerCreator =
/*#__PURE__*/
function () {
  function PlayerCreator() {
    _classCallCheck(this, PlayerCreator);

    this.audio = document.querySelector('.music-player__audio'); // Audio dom元素, 因为很多api都是需要原生audio调用的，所以不用jq获取
    // this.audio.muted = true; // 控制静音

    this.audio.volume = 0.2; //工具

    this.util = new Util();
    this.musics = new Musics(); //歌曲信息

    this.song_index = 0; // 当前播放的歌曲索引

    this.loop_mode = 1; // 1 2
    // 下方歌曲列表容器

    this.song_list = $('.music__list_content');
    this.render_doms = {
      //切换歌曲时需要渲染的dom组
      title: $('.music__info--title'),
      singer: $('.music__info--singer'),
      image: $('.music-player__image img'),
      blur: $('.music-player__blur')
    };
    this.ban_dom = {
      //禁音时需要渲染的dom组
      control__btn: $('.control__volume--icon')
    }; // 时间显示容器

    this.render_time = {
      now: $('.nowTime'),
      total: $('.totalTime')
    }; // 唱片

    this.disc = {
      image: $('.music-player__image'),
      pointer: $('.music-player__pointer')
    }; //播放器初始化

    this.init();
  } //初始化函数


  _createClass(PlayerCreator, [{
    key: "init",
    value: function init() {
      this.renderSongList();
      this.renderSongStyle();
      this.bindEventListener();
    } //生成播放列表

  }, {
    key: "renderSongList",
    value: function renderSongList() {
      var _str = '';
      this.musics.songs.forEach(function (song, i) {
        _str += "<li class=\"music__list__item\">".concat(song.title, "</li>");
      });
      this.song_list.html(_str);
    } //根据歌曲去渲染视图

  }, {
    key: "renderSongStyle",
    value: function renderSongStyle() {
      var _this$musics$getSongB = this.musics.getSongByNum(this.song_index),
          title = _this$musics$getSongB.title,
          singer = _this$musics$getSongB.singer,
          songUrl = _this$musics$getSongB.songUrl,
          imageUrl = _this$musics$getSongB.imageUrl;

      this.audio.src = songUrl;
      this.render_doms.title.html(title);
      this.render_doms.singer.html(singer);
      this.render_doms.image.prop('src', imageUrl);
      this.render_doms.blur.css('background-image', 'url("' + imageUrl + '")'); //切换列表中的item的类名 play

      this.song_list.find('.music__list__item').eq(this.song_index).addClass('play').siblings().removeClass('play');
    } //绑定各种事件

  }, {
    key: "bindEventListener",
    value: function bindEventListener() {
      var _this = this;

      //播放按钮
      this.$play = new Btns('.player-control__btn--play', {
        click: this.handlePlayAndPause.bind(this)
      }); //上一首

      this.$prev = new Btns('.player-control__btn--prev', {
        click: this.changeSong.bind(this, 'prev')
      }); //下一首

      this.$next = new Btns('.player-control__btn--next', {
        click: this.changeSong.bind(this, 'next')
      }); //循环模式

      this.$mode = new Btns('.player-control__btn--mode', {
        click: this.changePlayMode.bind(this)
      }); //禁音

      this.$ban = new Btns('.control__volume--icon', {
        click: this.banNotes.bind(this)
      }); //列表点击

      this.song_list.on('click', 'li', function (e) {
        var index = $(e.target).index();

        _this.changeSong(index);
      }); //音量控制 audio标签音量 vlouem 属性控制0-1

      new Progress('.control__volume--progress', {
        min: 0,
        max: 1,
        value: this.audio.volume,
        handler: function handler(value) {
          //更改进度时
          _this.audio.volume = value;
        }
      }); //歌曲进度 this.audio.duration
      //可以播放的时候触发（歌曲的基本信息都已经获取到了）

      this.audio.oncanplay = function () {
        //避免重复实例化
        if (_this.progress) {
          _this.progress.max = _this.audio.duration; //切换歌曲后更新时长

          _this.render_time.total.html(_this.util.formatTime(_this.audio.duration));

          return false;
        }

        ;
        _this.progress = new Progress('.player__song--progress', {
          min: 0,
          max: _this.audio.duration,
          value: 0,
          handler: function handler(value) {
            _this.audio.currentTime = value;
          }
        }); //调整总时长

        _this.render_time.total.html(_this.util.formatTime(_this.audio.duration));
      }; //会在播放的时候持续触发


      this.audio.ontimeupdate = function () {
        _this.progress.setValue(_this.audio.currentTime); //调整当前时长


        _this.render_time.now.html(_this.util.formatTime(_this.audio.currentTime));
      }; //当歌曲播放完成的时候


      this.audio.onended = function () {
        _this.changeSong('next'); //播放完，换歌后，重新播放


        _this.audio.play();
      };
    } //播放暂停控制

  }, {
    key: "handlePlayAndPause",
    value: function handlePlayAndPause() {
      var _o_i = this.$play.$el.find('i'); //this.audio.pauseed值为true 说明目前是不播放


      if (this.audio.paused) {
        //现在是暂停的 要播放
        this.audio.play();

        _o_i.removeClass('icon-play').addClass('icon-pause');

        this.disc.image.addClass('play');
        this.disc.pointer.addClass('play');
      } else {
        this.audio.pause();

        _o_i.addClass('icon-play').removeClass('icon-pause');

        this.disc.image.removeClass('play');
        this.disc.pointer.removeClass('play');
      }
    } //更改循环模式

  }, {
    key: "changePlayMode",
    value: function changePlayMode() {
      this.loop_mode++;
      if (this.loop_mode > 2) this.loop_mode = 0;
      this.renderPlayMode();
    } //更改按钮样式

  }, {
    key: "renderPlayMode",
    value: function renderPlayMode() {
      var _classess = ['loop', 'random', 'single'];

      var _o_i = this.$mode.$el.find('i'); //prop 改一些标签的自有属性 attr改一些标签的自定义属性


      _o_i.prop('class', 'iconfont icon-' + _classess[this.loop_mode]);
    } //更改歌曲索引

  }, {
    key: "changeSongIndex",
    value: function changeSongIndex(type) {
      if (typeof type === 'number') {
        this.song_index = type;
      } else {
        if (this.loop_mode === 0) {
          //列表循环
          this.song_index += type === 'next' ? 1 : -1;
          if (this.song_index > this.musics.songs.length - 1) this.song_index = 0;
          if (this.song_index < 0) this.song_index = this.musics.songs.length - 1;
        } else if (this.loop_mode === 1) {
          //随机播放
          var _length = this.musics.songs.length;

          var _random = Math.floor(Math.random() * _length);

          for (var i = 0; i < 10000; i++) {
            //随机的数为本身则继续随机
            if (this.song_index == _random) {
              _random = Math.floor(Math.random() * _length);
            } else {
              this.song_index = _random;
              break;
            }
          }
        } else if (this.loop_mode === 2) {
          this.song_index = this.song_index;
        }
      }
    } //歌曲时长

  }, {
    key: "songTime",
    value: function songTime() {
      var totalMinute = parseInt(this.audio.duration / 60) < 10 ? "0" + parseInt(this.audio.duration / 60) : parseInt(this.audio.duration / 60);
      var totalSecond = parseInt(this.audio.duration % 60) < 10 ? "0" + parseInt(this.audio.duration % 60) : parseInt(this.audio.duration % 60);
      $('.totalTime').text(totalMinute + ':' + totalSecond);
    } //切换歌曲

  }, {
    key: "changeSong",
    value: function changeSong(type) {
      //更改索引
      this.changeSongIndex(type); //记录切歌前的状态

      var _is_pause = this.audio.paused; //切歌后更改视图显示

      this.renderSongStyle(); //如果切歌前是在播放，就继续播放

      if (!_is_pause) this.audio.play();
    } //禁音

  }, {
    key: "banNotes",
    value: function banNotes() {
      var _o_i = this.$ban.$el.find("i");

      if (this.audio.muted == true) {
        //如果禁音则开启
        this.audio.muted = false;

        _o_i.removeClass('icon-muted').addClass('icon-volume');
      } else {
        this.audio.muted = true;

        _o_i.removeClass('icon-volume').addClass('icon-muted');
      }
    }
  }]);

  return PlayerCreator;
}(); //进度条


var Progress =
/*#__PURE__*/
function () {
  function Progress(selector, options) {
    _classCallCheck(this, Progress);

    $.extend(this, options); ///给this挂载传入的参数

    this.$el = $(selector);
    this.width = this.$el.width();
    this.init();
  } //进度条初始化


  _createClass(Progress, [{
    key: "init",
    value: function init() {
      this.renderBackAndPointer();
      this.bindEvents();
      this.drag();
      this.value;
      this.changeDOMStyle(this.width * this.value);
    } //为进度条渲染back和pointer

  }, {
    key: "renderBackAndPointer",
    value: function renderBackAndPointer() {
      this.$back = $('<div class="back">');
      this.$pointer = $('<div class="pointer">');
      this.$el.append(this.$back);
      this.$el.append(this.$pointer);
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      //主动调用，传入value值，设置进度条样式
      var _distance = this.width * value / (this.max - this.min);

      this.changeDOMStyle(_distance);
    }
  }, {
    key: "drag",
    value: function drag() {
      var _this2 = this;

      var ele = this.$pointer;
      var father = this.$el;
      var flag = false; //鼠标是否点击

      ele.mousedown(function (e) {
        flag = true;
        var mousePos = {
          x: e.offsetX
        };
        $(document).mousemove(function (e) {
          if (flag === true) {
            var _left = e.clientX - father.offset().left - mousePos.x;

            var _distance = Math.max(0, Math.min(_left, father.outerWidth(false) - ele.outerWidth(false)));

            var _ratio = _distance / father.outerWidth(false);

            var _value = _ratio * (_this2.max - _this2.min); //当前的音量值


            _this2.changeDOMStyle(_distance);

            _this2.handler(_value); //更改进度之后，执行回调

          }
        });
      });
      $(document).mouseup(function () {
        flag = false;
      });
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this3 = this;

      //鼠标点击时更改
      this.$el.click(function (e) {
        var _x = e.offsetX; //鼠标距离元素左边的距离

        var _ratio = _x / _this3.width;

        var _value = _ratio * (_this3.max - _this3.min); //当前的音量值


        _this3.changeDOMStyle(_x);

        _this3.handler(_value); //更改进度之后，执行回调

      });
    } //更改pointer和back

  }, {
    key: "changeDOMStyle",
    value: function changeDOMStyle(distance) {
      this.$back.width(distance + 7 == 7 ? 0 : distance + 7); //进度为0时将进度条背景改为0否则加上进度按钮的长度

      this.$pointer.css('left', distance + 'px');
    }
  }]);

  return Progress;
}(); //按钮类 


var Btns =
/*#__PURE__*/
function () {
  function Btns(selector, handlers) {
    _classCallCheck(this, Btns);

    this.$el = $(selector); //元素

    this.bindEvents(handlers);
  }

  _createClass(Btns, [{
    key: "bindEvents",
    value: function bindEvents(handlers) {
      //绑定事件
      for (var event in handlers) {
        //使用值的时候保证键值对在对象中是存在的
        if (handlers.hasOwnProperty(event)) {
          this.$el.on(event, handlers[event]);
        }
      }
    }
  }]);

  return Btns;
}();

new Player();
document.addEventListener('pjax:complete', function (e) {
  new Player();
});