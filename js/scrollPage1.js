(function (window) {
  //整屏翻页
  window.ScrollPage = {
    currentPage: 1, //当前页
    totalPage: 1, //总页数
    scrollContentBox: 0, //内容容器高度
    scrollContent: 0, //内容高度
    targetContent: 0, //可滚动内容高度
    scorllRail: 0, //滚动轨道高度
    scrollBar: 0, //滚动体的高度
    targetBar: 0, //可滚动区域高度
    scrollContentTop: 0, //内容滚动top值
    scrollBarTop: 0, //滚动体top
    flag: true, //节流
    parentDom: null,
    childrenDom: null,
    time: null,
    init: function (parentDom, childrenDom) {
      this.parentDom = parentDom;
      this.childrenDom = childrenDom;

      //内容
      this.scrollContentBox = $(this.parentDom).height();
      this.scrollContent = $(this.childrenDom).height();
      this.targetContent = this.scrollContent - this.scrollContentBox;
      //页数
      this.totalPage = parseInt(
        // (this.scrollContent + this.scrollContentBox - 1) /
        // this.scrollContentBox
        (this.scrollContent + this.scrollContent) / this.scrollContentBox
      );
      $(".scrllBar").css("height", 100 / this.totalPage + "%");
      //滚动条
      this.scorllRail = $(".scrollRail").height();
      this.scrollBar = $(".scrllBar").height();
      this.targetBar = this.scorllRail - this.scrollBar;
      console.log(this.scrollContentBox, this.targetContent);
    },
    up: function () {
      clearInterval(this.time);
      if (this.flag) {
        this.flag = false;
        if (this.currentPage > 1) {
          this.currentPage--;
          $(".hr").css(
            "top",
            199 +
              this.currentPage *
                ((this.scrollContentBox - 96) / this.totalPage) +
              "px"
          );
          if (this.currentPage == 1) {
            $(".hr").css("top", "199px");
          }
          console.log(
            this.currentPage,
            (this.scrollContentBox - 96) / this.totalPage
          );
          this.scrollContentTop =
            -(((this.currentPage - 1) / this.totalPage) * this.targetContent) +
            "px";
          this.scrollBarTop =
            ((this.currentPage - 1) / this.totalPage) * this.targetBar + "px";
        } else {
          if (this.currentPage == 1) {
            $(".hr").css("top", "199px");
          }
          this.scrollContentTop = 0;
          this.scrollBarTop = 0;
        }
        $(this.childrenDom).animate(
          {
            top: this.scrollContentTop,
          },
          500,
          "swing"
        );
        $(".scrllBar").animate(
          {
            top: this.scrollBarTop,
          },
          500,
          "swing"
        );
        var _this = this;
        setTimeout(function () {
          _this.flag = true;
        }, 500);
      }
    },
    down: function () {
      clearInterval(this.time);
      console.log(this.targetContent, this.scrollContentBox / this.totalPage);
      if (this.flag) {
        this.flag = false;
        if (this.totalPage <= 1) {
          return;
        }
        if (this.currentPage < this.totalPage) {
          this.currentPage++;
          $(".hr").css(
            "top",
            199 +
              (this.currentPage - 1) *
                ((this.scrollContentBox - 96) / this.totalPage) +
              "px"
          );
          if (this.currentPage >= this.totalPage) {
            $(".hr").css("top", "566px");
          }
          this.scrollContentTop =
            -((this.currentPage / this.totalPage) * this.targetContent) + "px";
          this.scrollBarTop =
            (this.currentPage / this.totalPage) * this.targetBar + "px";
        } else {
          this.scrollContentTop = -this.targetContent + "px";
          this.scrollBarTop = this.targetBar + "px";
        }
        $(this.childrenDom).animate(
          {
            top: this.scrollContentTop,
          },
          500,
          "swing"
        );
        $(".scrllBar").animate(
          {
            top: this.scrollBarTop,
          },
          500,
          "swing"
        );
        var _this = this;
        setTimeout(function () {
          _this.flag = true;
        }, 500);
      }
    },
    backTop: function () {
      this.currentPage = 1;
      this.up();
    },
    roll: function () {
      var count = 1;
      this.time = setInterval(function () {
        $(".content").css({
          top: count-- + "px",
        });
        $(".hr").css(
          "top",
          199 + -count / (window.ScrollPage.targetContent / (566 - 199)) + "px"
        );
        if (window.ScrollPage.targetContent < -count) {
          count = 1;
        }
      }, 100);
    },
    stop: function () {
      if (this.time) {
        clearInterval(this.time);
      }
    },
  };
})(window);
