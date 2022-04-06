// 需要作cms 和 实践后台的区分
// 添加cms收藏
function addCollection(obj, callbak) {
  var url = "/cms/interfaces/user/v1/addCollection?";
  url += "contentId=" + obj.contentId;
  url += "&contentType=" + obj.contentType;
  url += "&contentName=" + obj.contentName;
  url += "&clientId=" + obj.stb;
  url += "&terminalType=stb";
  $.ajax({
    url: url,
    success: function(res) {
      callbak(res);
    }
  });
}
// 取消cms收藏
function removeCollection(obj, callbak) {
  var url = "/cms/interfaces/user/v1/removeCollection?";
  url += "ids=all";
  url += "&contentId=" + obj.contentId;
  url += "&clientId=" + obj.stb;
  $.ajax({
    url: url,
    success: function(res) {
      callbak(res);
    }
  });
}
// cms点赞或者取消点赞
function setLike(obj, callbak) {
  var url = "/cms/interfaces/user/v1/setLikeNum?";
  url += "contentId=" + obj.contentId;
  url += "&userId=" + obj.stb;
  url += "&type=" + obj.isLike;
  $.ajax({
    url: url,
    success: function(res) {
      callbak(res);
    }
  });
}
//实践后台收藏和取消收藏接口
function collect_sjz(obj, callback) {
  var url = "/weixinInterface/setActivityCollectionStatus?userType=stb";
  url += "&activityId=" + obj.activityId;
  url += "&userId=" + obj.userId;
  url += "&status=" + obj.status;
  $.ajax({
    url: url,
    success: function(res) {
      callback(res);
    }
  });
}
//实践后台点赞和取消点赞接口
function setlike_sjz(obj, callback) {
  var url = "/weixinInterface/setActivityLikeStatus?userType=stb";
  url += "&activityId=" + obj.activityId;
  url += "&userId=" + obj.userId;
  url += "&status=" + obj.status;
  $.ajax({
    url: url,
    success: function(res) {
      callback(res);
    }
  });
}
// 应用访问记录接口
function clientVisitLog(obj) {
  var url = "/cms/interfaceservice/clientVisitLog?clientId=" + obj.userId;
  $.ajax({
    url: url,
    success: function() {}
  });
}
// 访问栏目记录接口
function logCollectorServlet(obj) {
  var url =
    "/cms/logCollectorServlet?clientId=" +
    obj.userId +
    "&categoryId=" +
    obj.categoryId;
  $.ajax({
    url: url,
    success: function() {}
  });
}
//  重新设置行高
function setLineHeight(str) {
  var lh = parseInt($(str).css("lineHeight"));
  $(str).css({
    lineHeight: lh * 1.156 + "px"
  });
}
var apis = {
  addCollection: addCollection,
  removeCollection: removeCollection,
  setLike: setLike,
  collect_sjz: collect_sjz,
  setlike_sjz: setlike_sjz,
  clientVisitLog: clientVisitLog,
  logCollectorServlet: logCollectorServlet,
  setLineHeight: setLineHeight
};
