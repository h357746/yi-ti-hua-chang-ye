var Action = {
  browType: "GOOGLE",
  KEY: {},
  tipTimer: null,
  initAction: function () {
    this.initBrowType();
  },
  initBrowType: function () {
    //判断盒子类型
    try {
      var userAgent = window.navigator.userAgent;
      switch (true) {
        case userAgent.indexOf("MSIE") >= 0:
          if (userAgent.indexOf("iPanel") >= 0) {
            this.browType = "iPanel"; //茁壮中间件--马鞍山
            document.onirkeypress = this.handleMethod;
            document.onkeypress = this.handleMethod;
          } else {
            this.browType = "IE";
            document.onkeydown = this.handleMethod;
          }
          break;
        case userAgent.indexOf("Android") >= 0:
          this.browType = "Android";
          document.onkeydown = this.handleMethod;
          break;
        case userAgent.indexOf("Chrome") >= 0:
          this.browType = "Chrome";
          document.onkeydown = this.handleMethod;
          break;
        case userAgent.indexOf("Firefox") >= 0:
          this.browType = "Firefox";
          document.onkeypress = this.handleMethod;
          break;
        case userAgent.indexOf("DVNBrowser") >= 0:
          if (userAgent.indexOf("Coship") >= 0) {
            this.browType = "TVOS"; //TVOS的盒子
          } else if (userAgent.indexOf("iPanel") >= 0) {
            this.browType = "DVN_IPANEL"; //无锡天柏中间件
          } else {
            this.browType = "DVN"; //天柏的盒子
          }
          document.onirkeypress = this.handleMethod;
          document.onkeypress = this.handleMethod;
          break;
        case userAgent.indexOf("Coship") >= 0:
          this.browType = "Coship"; //同洲盒子
          document.onirkeypress = this.handleMethod;
          document.onkeypress = this.handleMethod;

          // if (DMX.Browser.coship) {
          //   var _p = Utility.getEnv("STB.powered");
          //   if (_p != "true") {
          //     Utility.ioctlWrite("motoKey2Dvb", "");
          //   }
          // }
          break;
        case userAgent.indexOf("iPanel") >= 0:
          this.browType = "iPanel"; //茁壮中间件
          document.onirkeypress = this.handleMethod;
          document.onkeypress = this.handleMethod;
          break;
        case userAgent.indexOf("CoocaaOS-TVOSBrowser") >= 0:
          this.browType = "Coocaa"; //酷开
          document.onkeydown = this.handleMethod;
          break;
        default:
          this.browType = "PUBLIC"; //其他所有通用的盒子
          document.onkeypress = this.handleMethod;
          break;
      }
    } catch (e) {
      this.browType = "PUBLIC";
      document.onkeypress = this.handleMethod;
    }
    this.initKey();
  },
  handleMethod: function () {
    var keyCode = event.which || event.keyCode;
    eventHandle(keyCode);
  },
  initKey: function () {
    switch (this.browType) {
      case "IE":
      case "Chrome":
      case "Firefox":
        this.KEY = {
          UP: 38,
          DOWN: 40,
          LEFT: 37,
          RIGHT: 39,
          ENTER: 13,
          PAGEUP: 33,
          PAGEDOWN: 34,
          BACK: 189, //后退-
          EXIT: 187, //退出+
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          VOLUMNUP: 190, //音量>
          VOLUMNDOWN: 188, //音量减<
          STOP: 48, //stop
          STOPPOINT: 68, //stop
          VOLUMNNO: 191, //静音
          F1: 65,
          F2: 66,
          F3: 67,
          F4: 68,
          INFO: 73
        };
        break;
      case "DVN_IPANEL":
      case "DVN":
        this.KEY = {
          UP: 38,
          DOWN: 40,
          LEFT: 37,
          RIGHT: 39,
          ENTER: 13,
          PAGEDOWN: 121,
          PAGEUP: 120,
          BACK: 8,
          EXIT: 0x72,
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          VOLUMNUP: 190,
          VOLUMNDOWN: 188,
          VOLUMNNO: 77, //静音
          STOP: 65, //播放时按退出响应的键值
          STOP1: 0x41,
          STOPPOINT: 80, //播放时按后退响应的键值
          MENU: 72,
          F1: 96,
          F2: 97,
          F3: 98,
          F4: 99,
          END: 0x20, //播放结束事件
          END1: 0x2b, //43
          END2: 48, //stop
          INFO: 112, //信息
          VODEND: 45012
        };
        break;
      case "TVOS":
        // Utility.ioctlWrite("JsAddKeyState", "N");
        this.KEY = {
          UP: 38,
          DOWN: 40,
          LEFT: 37,
          RIGHT: 39,
          ENTER: 13,
          PAGEDOWN: 121,
          PAGEUP: 120,
          BACK: 640,
          EXIT: 0x72,
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          VOLUMNUP: 190,
          VOLUMNDOWN: 188,
          VOLUMNNO: 77, //静音
          STOP: 48, //播放时按退出响应的键值
          STOP1: 0x41,
          STOPPOINT: 80, //播放时按后退响应的键值
          MENU: 72,
          F1: 96,
          F2: 97,
          F3: 98,
          F4: 99,
          END: 768, //播放结束事件
          INFO: 112, //信息
          VODEND: 40200
        };
        break;
      case "iPanel":
        this.KEY = {
          UP: 1,
          DOWN: 2,
          LEFT: 3,
          RIGHT: 4,
          ENTER: 13,
          PAGEDOWN: 373,
          PAGEUP: 372,
          BACK: 340,
          EXIT: 339,
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          VOLUMNUP: 595,
          VOLUMNDOWN: 596,
          VOLUMNNO: 597,
          PLAYPAUSE: 561,
          F1: 832,
          F2: 834
        };
        break;
      case "Coship":
        this.KEY = {
          UP: 38,
          DOWN: 40,
          LEFT: 37,
          RIGHT: 39,
          ENTER: 13,
          PAGEDOWN: 121,
          PAGEUP: 120,
          //后退-
          BACK: 640,
          //退出+
          EXIT: 114,
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          //音量>
          VOLUMNUP: 447,
          //音量减<
          VOLUMNDOWN: 448,
          //静音：?
          VOLUMNNO: 449,
          F1: 96,
          F2: 97,
          F3: 98,
          F4: 99,
          FAV: 480,
          NAV: 458
        };

        //将键值转换成
        // Utility.ioctlWrite("JsAddKeyState", "N");
        // //Coship浏览器其他类型的盒子
        // this.KEY = {
        //   UP: 28,
        //   DOWN: 29,
        //   LEFT: 30,
        //   RIGHT: 31,
        //   ENTER: 13,
        //   PAGEDOWN: 121,
        //   PAGEUP: 120,
        //   BACK: 32,
        //   EXIT: 114, //退出+
        //   NUMBER0: 48,
        //   NUMBER1: 49,
        //   NUMBER2: 50,
        //   NUMBER3: 51,
        //   NUMBER4: 52,
        //   NUMBER5: 53,
        //   NUMBER6: 54,
        //   NUMBER7: 55,
        //   NUMBER8: 56,
        //   NUMBER9: 57,
        //   VOLUMNUP: 41, //音量+
        //   VOLUMNDOWN: 39, //音量-
        //   VOLUMNNO: 40, //静音
        //   //STOP: 48,//退出播放    TODO
        //   //STOP: 0x41,//播放时按退出响应的键值
        //   STOP: 65, //播放时按退出响应的键值
        //   //STOPPOINT: 68,//暂停播放    TODO
        //   STOPPOINT: 0x20, //播放时按后退响应的键值
        //   MENU: 113, //菜单
        //   INFO: 112, //信息
        //   CHANNELUP: 122, //频道+
        //   CHANNELDOWN: 123, //频道-
        //   VOD: 74, //点播
        //   LIKE: 70, //喜爱
        //   NAVIGATION: 19, //导航
        //   F1: 96,
        //   F2: 97,
        //   F3: 98,
        //   F4: 99,
        //   //END: 0x20, //播放结束事件  TODO
        //   END: 0x2b,
        //   VODEND: 45012 //播放结束
        // };
        break;
      case "Coocaa":
        this.KEY = {
          UP: 38,
          DOWN: 40,
          LEFT: 37,
          RIGHT: 39,
          ENTER: 13,
          PAGEDOWN: 121,
          PAGEUP: 120,
          BACK: 640,
          EXIT: 114,
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          VOLUMNUP: 447,
          VOLUMNDOWN: 448,
          VOLUMNNO: 449,
          F1: 96,
          F2: 97,
          F3: 98,
          F4: 99,
          FAV: 480,
          NAV: 458
        };
        break;
      case "Android":
        Utility.ioctlWrite("JsAddKeyState", "N");
        this.KEY = {
          UP: 28,
          DOWN: 29,
          LEFT: 30,
          RIGHT: 31,
          ENTER: 13,
          PAGEUP: 120,
          PAGEDOWN: 121,
          BACK: 32,
          EXIT: 114,
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          VOLUMNUP: 190,
          VOLUMNDOWN: 188,
          VOLUMNNO: 0x28, //静音
          STOP: 48, //播放时按退出响应的键值
          STOPPOINT: 65, //播放时按后退响应的键值
          STOPPOINT1: 65,
          MENU: 113,
          F1: 96,
          F2: 97,
          F3: 98,
          F4: 99,
          END: 0x20, //播放结束事件
          END1: 0x2b,
          INFO: 112 //信息
        };
        break;
      default:
        this.KEY = {
          // 其他通用键值
          UP: 38,
          DOWN: 40,
          LEFT: 37,
          RIGHT: 39,
          ENTER: 13,
          PAGEDOWN: 34,
          PAGEUP: 33,
          BACK: 189,
          EXIT: 187,
          NUMBER0: 48,
          NUMBER1: 49,
          NUMBER2: 50,
          NUMBER3: 51,
          NUMBER4: 52,
          NUMBER5: 53,
          NUMBER6: 54,
          NUMBER7: 55,
          NUMBER8: 56,
          NUMBER9: 57,
          VOLUMNUP: 190,
          VOLUMNDOWN: 188,
          STOP: 48, //stop
          STOPPOINT: 68, //stop
          VOLUMNNO: 191,
          F1: 65, //A
          F2: 66, //B
          F3: 67, //C
          F4: 68 //D
        };
        break;
    }
  },
  chsLog: function (key, value) {
    var logdiv = document.getElementById("chs-log");
    if (!logdiv) {
      var div = document.createElement("div");
      div.innerHTML = '<div id="chs-log" style="max-width: 600px;max-height: 624px;position: absolute;left: 36px;top: 36px;z-index: 100;color: #FF0000;font-size: 24px;padding: 20px;background-color: #dad610;filter: Alpha(opacity=90);-moz-opacity: 0.9;opacity: 0.9;overflow: hidden;word-break: break-word;"></div>';
      document.body.appendChild(div);
      logdiv = document.getElementById("chs-log");
    }
    logdiv.innerHTML = key + "：" + value + "<br>" + logdiv.innerHTML;
  },
  chsTip: function (value) {
    this.tipTimer && clearTimeout(this.tipTimer);
    var tipdiv = document.getElementById("chs-tip");
    if (!tipdiv) {
      var div = document.createElement("div");
      div.innerHTML = '<div id="chs-tip" style="width: 480px;position: absolute;left: 370px;top: 190px;z-index: 100;color: #ffffff;font-size: 24px;padding: 10px 20px 60px;background-color: #091a45;filter: Alpha(opacity=90);-moz-opacity: 0.9;opacity: 0.9;overflow: hidden;">' + '<div class="chs-tip-head" style="width: 100%;text-align: center;font-size: 28px;color: #f1ce1a;font-weight: 700;margin: 12px 0 20px;">系统提示</div>' + '<div class="chs-tip-content" style="width: 100%;text-indent: 2em;line-height: 1.6;">' + value + "</div>" + "</div>";
      document.body.appendChild(div);
      tipdiv = document.getElementById("chs-tip");
    }
    tipdiv.style.display = "block";
    this.tipTimer = setTimeout(function () {
      tipdiv.style.display = "none";
    }, 5000);
  }
};

Action.initAction();
