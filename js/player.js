var mp = null;
var player = null;
try {
  mp = new MediaPlayer();
  mp.setVideoDisplayMode(0); //设置播放器播放窗口模式，按下面的设置区域位置来播放视频
  //var nativePlayerInstanceId = mp.getNativePlayerInstanceId();
  //mp.bindNativePlayerInstance(nativePlayerInstanceId);
} catch (error) {}

player = {
  playFlag: -1,
  smallToFull: function () {
    try {
      mp.setVideoDisplayArea(0, 0, 1280, 720); //这里设置播放区域	left, top, width, height
      mp.refreshVideoDisplay();
    } catch (error) {}
  },
  playSmall: function (obj) {
    try {
      var t = mp.setVideoDisplayArea(obj.left, obj.top, obj.width, obj.height); //这里设置播放区域	left, top, width, height
      mp.refreshVideoDisplay();
      mp.setSingleMedia(obj.url); //设置播放的内容
      var playFlag = mp.playFromStart(); //开始播放
      this.playFlag = playFlag;
    } catch (error) {
      $(".debug").html(error);
    }
  },
  fullPlay: function (obj) {
    try {
      mp.setVideoDisplayArea(0, 0, 1280, 720); //这里设置播放区域	left, top, width, height
      mp.refreshVideoDisplay();
      mp.setSingleMedia(obj.url); //设置播放的内容
      mp.playFromStart(); //开始播放
    } catch (error) {
      $(".debug").html(error);
    }
  },
  playMoveDown: function () {
    try {
      mp.setVideoDisplayMode(0); //设置播放器播放窗口模式，按下面的设置区域位置来播放视频
      mp.setVideoDisplayArea(66, -146, 646, 358); //这里设置播放区域	left, top, width, height
      mp.refreshVideoDisplay(); // 辅助函数
    } catch (error) {
      $(".debug").html(error);
    }
  },
  playMoveUp: function () {
    try {
      mp.setVideoDisplayMode(0); //设置播放器播放窗口模式，按下面的设置区域位置来播放视频
      mp.setVideoDisplayArea(66, 124, 646, 358); //这里设置播放区域	left, top, width, height
      mp.refreshVideoDisplay(); // 辅助函数
    } catch (error) {
      $(".debug").html(error);
    }
  },
  //暂停
  pause: function () {
    mp.pause();
  },
  //恢复播放
  resume: function () {
    mp.resume();
  },
  stop: function () {
    mp.stop();
  },
  currentPlayerTime: function () {
    var position;
    position = mp.getCurrentPlayTime();

    return position;
  },
  duration: function () {
    var duration;
    duration = mp.getMediaDuration();
    return duration;
  },
  // 静音
  mute: function () {},
  // 获取当前播放音量。
  volum: function () {},
  setVolum: function (val) {},
  seek: function (val) {
    mp.playByTime(1, val, 1);
  },
};
