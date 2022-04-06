//获取token
function getToken(obj, callbak) {
  var url = "/apigateway/system/api/v1/user/login";
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify(obj),
    success: function(res, textStatus, req) {
      callbak(res, textStatus, req);
    }
  });
}

// 信息服务平台探针
// 保存栏目日志
function catgory_cms(obj, token, callbak) {
  var url = "/apigateway/dataProbe/probe/api/v1/cmsDataSys/catgory";
  var catgoryCmsObj = {
    categoryId: obj.categoryId, //栏目id
    categoryName: obj.categoryName, // 栏目名称
    dateTime: obj.dateTime, // 操作发生的日期时间 yyyy-mm-dd hh24:mi:ss
    sysCode: obj.sysCode, // 产生日志的系统编码 默认cmsDataSys
    userType: obj.userType, //  用户类型 微信 1 盒子号 2 ic卡号 3 pc 4 默认2
    userValue: obj.userValue // 用户唯一标识
  };
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Long-Token", token);
    },
    data: JSON.stringify(catgoryCmsObj),
    success: function(res) {
      callbak(res);
    }
  });
}
// 保存资讯日志
function content_cms(obj, token, callbak) {
  var url = "/apigateway/dataProbe/probe/api/v1/cmsDataSys/content";
  var contentCmsObj = {
    categoryId: obj.categoryId, // 栏目id
    categoryName: obj.categoryName, // 栏目名称
    contentId: obj.contentId, //资讯id
    contentName: obj.contentName, //资讯标题
    dateTime: obj.dateTime, // 操作发生的日期时间 yyyy-mm-dd hh24:mi:ss
    sysCode: obj.sysCode, // 产生日志的系统编码 默认cmsDataSys
    userType: obj.userType, // 用户类型 微信 1 盒子号 2 ic卡号 3 pc 4 默认2
    userValue: obj.userValue // 用户唯一标识 微信 openId 盒子号 stbsn ic卡号 icsn pc userId
  };
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Long-Token", token);
    },
    data: JSON.stringify(contentCmsObj),
    success: function(res) {
      callbak(res);
    }
  });
}
// 用户行为统计
function userAction_cms(obj, token, callbak) {
  var url = "/apigateway/cms/api/v1/useraction";
  var userActionCmsObj = {
    actionType: obj.actionType, // 0 点赞 1 收藏 2 访问
    userId: obj.userId, // 用户唯一标识 微信 openId 盒子号 stbsn ic卡号 icsn pc userId
    userType: obj.userType, //用户类型 0 机顶盒 1 微信授权 2 手机注册 3 访客
    contentId: obj.contentId, // 内容id
    contentType: obj.contentType, // 0 内容 1 模板页面
    actionStatus: obj.actionStatus // true 增加 false 减少
  };
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Long-Token", token);
    },
    data: JSON.stringify(userActionCmsObj),
    success: function(res) {
      callbak(res);
    }
  });
}

// 数据开放平台探针
// 保存能力日志
function ability_open(obj, token, callbak) {
  var url = "/apigateway/dataopen/api/v1/ability";
  var abilityOpenObj = {
    abilityId: obj.abilityId, //能力id
    abilityName: obj.abilityName, //能力名称
    applicationId: obj.applicationId, //应用id
    applicationName: obj.applicationName, //应用名称
    dateTime: obj.dateTime, // 操作发生的日期时间 yyyy-mm-dd hh24:mi:ss
    status: obj.status, //访问状态 成功：0 失败1
    sysCode: obj.sysCode, // 产生日志的系统编码 openDataSys
    userType: obj.userType, //  用户类型 0 机顶盒 1 微信授权 2 手机注册 3 访客
    userValue: obj.userValue // 用户唯一标识 微信 openId 盒子号 stbsn ic卡号 icsn pc userId
  };
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Long-Token", token);
    },
    data: JSON.stringify(abilityOpenObj),
    success: function(res) {
      callbak(res);
    }
  });
}

// OTT互动视频服务平台探针
// 保存栏目
function catgory_ott(obj, token, callbak) {
  var url = "/apigateway/dataProbe/probe/api/v1/ottDataSys/catgory";
  var catgoryOttObj = {
    categoryId: obj.categoryId, // 栏目id
    categoryName: obj.categoryName, // 栏目名称
    dateTime: obj.dateTime, // 操作发生的日期时间 yyyy-mm-dd hh24:mi:ss
    pv: obj.pv, // 访问量
    sysCode: obj.sysCode, // 产生日志的系统编码 ottDataSys
    userType: obj.userType, // 用户类型 0 机顶盒 1 微信授权 2 手机注册 3 访客
    userValue: obj.userValue, // 用户唯一标识 微信 openId 盒子号 stbsn ic卡号 icsn pc userId
    uv: obj.uv // 访客量
  };
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Long-Token", token);
    },
    data: JSON.stringify(catgoryOttObj),
    success: function(res) {
      callbak(res);
    }
  });
}

function playVideo_ott(obj, token, callbak) {
  var url = "/apigateway/dataProbe/probe/api/v1/ottDataSys/catgory";
  var playVideoOttObj = {
    categoryId: obj.categoryId, // 栏目id
    categoryName: obj.categoryName, // 栏目名称
    assetId: obj.assetId, //影片资产id
    assetName: obj.assetName, //影片资产名称
    dateTime: obj.dateTime, // 操作发生的日期时间 yyyy-mm-dd hh24:mi:ss
    showType: obj.showType, // 资产类型 program-电影 series-电视剧 column-专栏档期 series_package-电视剧剧集 column_package-专栏档期剧集
    sysCode: obj.sysCode, // 产生日志的系统编码 ottDataSys
    userType: obj.userType, // 用户类型 0 机顶盒 1 微信授权 2 手机注册 3 访客
    userValue: obj.userValue, // 用户唯一标识 微信 openId 盒子号 stbsn ic卡号 icsn pc userId
    playDuration: obj.playDuration, // 点播时长
    lastPlayTime: obj.lastPlayTime //最近一次播放时间  yyyy-mm-dd hh24:mi:ss
  };
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Long-Token", token);
    },
    data: JSON.stringify(playVideoOttObj),
    success: function(res) {
      callbak(res);
    }
  });
}

// 保存影片点播 视频服务平台
function playVideo_video(obj, token, callbak) {
  var url = "/apigateway/dataProbe/probe/api/v1/videoDataSys/playVideo";
  var playVideoVideoObj = {
    assetId: obj.assetId, // 影片资产id
    assetName: obj.assetName, // 影片资产名称
    playTime: obj.playTime, //影片的播放时长
    dateTime: obj.dateTime, // 操作发生的日期时间 yyyy-mm-dd hh24:mi:ss
    sysCode: obj.sysCode, // 产生日志的系统编码 videoDataSys
    userType: obj.userType, // 用户类型 微信 1 盒子号 2 ic卡号 3 pc 4 默认2
    userValue: obj.userValue // 用户唯一标识 微信 openId 盒子号 stbsn ic卡号 icsn pc userId
  };
  $.ajax({
    url: url,
    type: "post",
    contentType: "application/json",
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("X-Long-Token", token);
    },
    data: JSON.stringify(playVideoVideoObj),
    success: function(res) {
      callbak(res);
    }
  });
}
var tzApis = {
  getToken: getToken, //获取token
  abilityOpen: ability_open, // 数据开放平台探针 保存能力日志
  catgoryCms: catgory_cms, // 信息服务平台探针 保存栏目日志
  contentCms: content_cms, // 信息服务平台探针 保存资讯日志
  userActionCms: userAction_cms, //用户行为统计
  catgoryOtt: catgory_ott, // OTT互动视频服务平台探针 保存栏目
  playVideoOtt: playVideo_ott // OTT互动视频服务平台探针 保存影片点播
};
