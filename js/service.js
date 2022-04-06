/* 
兼容cms2.0,cms3.0接口请求公共函数，基于jquery ajax
新增商户服务接口
*/
(function (w) {
  var isCmsVersion3 = config.isCmsVersion3 || true;
  var stb = config.stb || "000000000";
  if (isCmsVersion3) {
    var serverName = "/apigateway/cms/api/v1/";
    var serviceName = {
      getCategoryList: "external/getCategoryList", // 获取栏目列表
      getContentList: "external/getContentList", // 获取内容列表
      getContentInfo: "external/getInfoContent", // 获取内容详情
      userActionLog: "useraction", // 通用点赞、收藏、浏览量等
      collect: "external/content/collectionSelect", // 获取收藏列表
    };
  } else {
    var serverName = "/cms/interfaces";
    var serviceName = {
      getCategoryList: "/vod/v1/listCategory",
      getContentList: "/vod/v1/listInfoByCategoryId",
      getContentInfo: "/vod/v1/getInfoContentById",
      userActionLog: "/vod/v1/userActionLogCallback",
      addLike: "/user/v1/setLikeNum",
      addCollection: "/user/v1/addCollection",
      removeCollection: "/user/v1/removeCollection",
      categoryLog: "/cms/logCollectorServlet",
      collect: "/user/v1/listCollection",
    };
  }

  // 商户服务
  var prefix = "/merchants/api/v1";
  var prifixCms = prefix + "/cms/";

  var apis = {
    stb: stb,

    /* ========================= 商户服务cms相关 ========================== */
    // 获取cms内容列表
    getShCategoryContentList: function (params, callback) {
      $.ajax({
        url: prifixCms + "getCategoryContentList",
        data: params,
        success: function (res) {
          callback(res);
        },
      });
    },

    /* ========================= Cms3.0/2.0 ========================== */

    /* 
      根据栏目id获取栏目列表
      * @param {*categoryId} 栏目id:
      * @param {*pageSize}: 默认10条
      * @param {*pageNo}:
    */
    getCategoryList: function (params, callback) {
      var self = this;
      var url = serverName + serviceName.getCategoryList;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        params = {
          sorted: 1,
          categoryId: params.categoryId,
          pageSize: params.pageSize || 10,
          pageNo: params.pageNo || 1,
        };
      } else {
        params = {
          parentId: params.categoryId,
          pageSize: params.pageSize || 10,
          pageNum: params.pageNo || 1,
        };
      }
      $.ajax({
        url: url,
        data: params,
        type: method,
        success: function (res) {
          var result = res;
          if (!isCmsVersion3) {
            result = {};
            result.errorCode = Number(res.code);
            result.errorMessage = res.message;
            if (result.errorCode == 0) {
              var list = res.categorieList;
              var data = {
                count: res.totalNum,
                list: [],
                pageNo: res.currentPage,
                pageSize: params.pageSize || 10,
                totalPage: res.totalPage,
              };
              for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                Object.defineProperties(obj, {
                  id: obj.categoryId,
                  title: obj.name,
                  ext1: obj.tag,
                  ext2: obj.description,
                });
                data.list.push(obj);
              }
            }
            result.data = data;
          }
          callback(result);
        },
      });
    },

    /*
     * 获取资讯列表
     * @param {*categoryId} 栏目id:
     * @param {*pageSize}: 默认10条
     * @param {*pageNo}:
     */
    getContentList: function (params, callback) {
      var url = serverName + serviceName.getContentList;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        params = {
          categoryId: params.categoryId,
          userId: this.stb,
          userType: 0,
          pageSize: params.pageSize || 10,
          pageNo: params.pageNo || 1,
        };
      } else {
        params = {
          categoryId: params.categoryId,
          clientId: this.stb,
          pageSize: params.pageSize || 10,
          pageNum: params.pageNo || 1,
          terminalType: "stb",
        };
      }
      $.ajax({
        url: url,
        data: params,
        type: method,
        success: function (res) {
          var result = res;
          if (!isCmsVersion3) {
            result = {};
            result.errorCode = Number(res.code);
            result.errorMessage = res.message;
            if (result.errorCode == 0) {
              var list = res.infoList;
              var data = {
                count: res.pageInfo.totalNum,
                list: [],
                pageNo: res.pageInfo.currentPage,
                pageSize: params.pageSize || 10,
                totalPage: res.pageInfo.totalPage,
              };
              for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                Object.defineProperties(obj, {
                  createTime: obj.auditTime,
                  contentType: obj.type == "cms_video" ? 2 : 0, // 2 对应视频，0对应普通资讯
                  content: obj.summary,
                  ext1: obj.EXT1,
                  ext2: obj.EXT2,
                  isCollection: Number(obj.isCollection),
                  collectionNum: Number(obj.collectionNum),
                  isLike: Number(obj.isLike),
                  likeNum: Number(obj.likeNum),
                  visitNum: Number(obj.visitNum),
                  poster1:
                    obj.posterUrl ||
                    obj.smallImg ||
                    obj.mediumImg ||
                    obj.largeImg,
                  publishTime: obj.auditTime,
                });
              }
            }
            result.data = data;
          }
          callback(result);
        },
      });
    },

    /*
     * 获取cms内容详情
     * @param id 资讯id:
     */
    getContentInfo: function (id, callback) {
      var self = this;
      var url = serverName + serviceName.getContentInfo;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        params = {
          contentId: id,
          userId: this.stb,
          userType: 0,
        };
      } else {
        params = {
          infoId: id,
          clientId: this.stb,
        };
      }
      $.ajax({
        url: url,
        data: params,
        type: method,
        success: function (res) {
          var result = res;
          if (!isCmsVersion3) {
            result = {};
            result.errorCode = Number(res.code);
            result.errorMessage = res.message;
            if (result.errorCode == 0) {
              var obj = res;
              Object.defineProperties(obj, {
                id: obj.infoId,
                createTime: obj.auditTime,
                contentType: obj.type == "cms_video" ? 2 : 0, // 2 对应视频，0对应普通资讯
                ext1: obj.EXT1,
                ext2: obj.EXT2,
                isCollection: Number(obj.isCollection),
                collectionNum: Number(obj.collectionNum),
                isLike: Number(obj.isLike),
                likeNum: Number(obj.likeNum),
                visitNum: Number(obj.visitNum),
                poster1:
                  obj.posterUrl ||
                  obj.smallImg ||
                  obj.mediumImg ||
                  obj.largeImg,
                publishTime: obj.auditTime,
              });
              result.data = obj;
            }
          }
          // 调用详情后，调用浏览量接口
          self.contentLog(result.data);
          callback(result);
        },
      });
    },

    /*
     * 获取cms收藏列表
     * @param {*pageSize}: 默认10条
     * @param {*pageNo}:
     */
    getCollectionList: function (params, callback) {
      var url = serverName + serviceName.collect;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        params = {
          actionType: 1,
          userId: this.stb,
          userType: 0,
          contentType: 0,
          pageNo: params.pageNo || 1,
          pageSize: params.pageSize || 10,
        };
      } else {
        params = {
          clientId: this.stb,
          terminalType: "stb",
          contentType: "cms_content",
          pageNum: params.pageNo || 1,
          pageSize: params.pageSize || 10,
        };
      }
      $.ajax({
        url: url,
        data: JSON.stringify(params),
        type: method,
        contentType: "application/json",
        success: function (res) {
          var result = res;
          if (!isCmsVersion3) {
            result = {};
            result.errorCode = Number(res.code);
            result.errorMessage = res.message;
            if (result.errorCode == 0) {
              var list = res.contentList;
              var data = {
                count: res.pageInfo.totalNum,
                list: [],
                pageNo: res.pageInfo.currentPage,
                pageSize: params.pageSize || 10,
                totalPage: res.pageInfo.totalPage,
              };
              for (var i = 0; i < list.length; i++) {
                var obj = list[i];
                Object.defineProperties(obj, {
                  createTime: obj.createTime,
                  contentType: obj.contentType == "cms_video" ? 2 : 0, // 2 对应视频，0对应普通资讯
                  collectionNum: Number(obj.collectionNum),
                  likeNum: Number(obj.likeNum),
                  visitNum: Number(obj.visitNum),
                  poster1:
                    obj.posterUrl ||
                    obj.smallImg ||
                    obj.mediumImg ||
                    obj.largeImg,
                  publishTime: obj.createTime,
                });
              }
            }
            result.data = data;
          }
          callback(result);
        },
      });
    },

    //----------------------用户user模块接口-------------------
    /*
     * 用户行为记录---资讯类 传内容对象
     * @param contentObj 资讯对象:
     */
    contentLog: function (contentObj, callback) {
      var url = serverName + serviceName.userActionLog;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        var params = {
          actionType: 2,
          contentType: 0,
          contentId: contentObj.id,
          userId: this.stb,
          userType: "0",
          actionStatus: true,
        };
      } else {
        var params = {
          clientId: this.stb,
          contentType:
            contentObj.contentType == 2 ? "cms_video" : "cms_content",
          contentId: contentObj.id,
          contentName: contentObj.title,
        };
      }
      $.ajax({
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        type: method,
        success: function (res) {
          callback && callback(res);
        },
      });
    },

    /*
     * 栏目行为记录
     * @param categotyId 栏目id:
     */
    categoryLog: function (categotyId) {
      var url = isCmsVersion3
        ? serverName + serviceName.userActionLog
        : serviceName.categoryLog;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        var params = {
          actionType: 2,
          contentType: 2,
          contentId: categotyId,
          userId: this.stb,
          userType: 0,
        };
      } else {
        var params = {
          clientId: this.stb,
          contentId: categotyId,
        };
      }
      $.ajax({
        url: url,
        data: params,
        type: method,
        success: function (res) {
          callback && callback(res);
        },
      });
    },

    /*
     * cms 资讯点赞
     * @param contentId 资讯id:
     */
    addLike: function (contentId, callback) {
      var url = isCmsVersion3
        ? serverName + serviceName.userActionLog
        : serverName + serviceName.addLike;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        var params = {
          actionType: 0,
          userId: this.stb,
          contentId: contentId,
          contentType: 0,
          userType: "0",
          actionStatus: true,
        };
      } else {
        var params = {
          userId: this.stb,
          contentId: contentId,
          type: 0,
        };
      }
      $.ajax({
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        type: method,
        success: function (res) {
          callback && callback(res);
        },
      });
    },

    /*
     * cms  取消点赞
     * @param contentId 资讯id:
     */
    removeLike: function (contentId, callback) {
      var url = isCmsVersion3
        ? serverName + serviceName.userActionLog
        : serverName + serviceName.addLike;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        var params = {
          actionType: 0,
          userId: stb,
          contentId: contentId,
          contentType: 0,
          userId: this.stb,
          userType: 0,
          actionStatus: false,
        };
      } else {
        var params = {
          userId: this.stb,
          contentId: contentId,
          type: 1,
        };
      }
      $.ajax({
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        type: method,
        success: function (res) {
          callback && callback(res);
        },
      });
    },

    /*
     *  cms 资讯收藏
     * @param contentObj 资讯对象:
     */
    addCollection: function (contentObj, callback) {
      var url = isCmsVersion3
        ? serverName + serviceName.userActionLog
        : serverName + serviceName.addCollection;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        var params = {
          actionType: 1,
          contentId: contentObj.id,
          contentType: 0,
          userId: this.stb,
          userType: "0",
          actionStatus: true,
        };
      } else {
        var params = {
          contentId: contentObj.id,
          contentType: "cms_content",
          contentName: contentObj.title,
          clientId: this.stb,
          terminalType: "stb",
        };
      }
      $.ajax({
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        type: method,
        success: function (res) {
          callback && callback(res);
        },
      });
    },

    /*
     * cms 移除资讯收藏
     * @param contentObj 资讯对象:
     */
    removeCollection: function (contentObj, callback) {
      var url = isCmsVersion3
        ? serverName + serviceName.userActionLog
        : serverName + serviceName.removeCollection;
      var method = isCmsVersion3 ? "post" : "get";
      if (isCmsVersion3) {
        var params = {
          actionType: 1,
          contentId: contentObj.id,
          contentType: 0,
          userId: this.stb,
          userType: "0",
          actionStatus: false,
        };
      } else {
        var params = {
          ids: contentObj.id,
          contentId: "all",
          clientId: this.stb,
        };
      }
      $.ajax({
        url: url,
        data: JSON.stringify(params),
        contentType: "application/json",
        type: method,
        success: function (res) {
          callback && callback(res);
        },
      });
    },
  };
  w.apis = apis;
})(window);
