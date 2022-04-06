(function (w) {
  function PageScroller(current,total,scrollHeigh,tailHeight) {
    this.current = current;
    this.total = total;
    this.scrollHeigh = scrollHeigh;
    this.tailHeight = tailHeight;
    this.targetHeight = this.scrollHeigh - this.tailHeight;
    this.dom = this.init();
  }
  PageScroller.prototype = {
    init: function() {
      var dom = $('<div class="pageScroller" id="pageScroller"><div class="pageWrapper"><div class="pageTail"><span id="currentPage">'+this.current+'</span><span class="split">/</span><span id="totalPage">'+this.total+'</span></div><div class="pageTips"></div></div></div>');
      $('body').append(dom);
      return dom;
    },
    update: function(current,total) {
      this.current = current;
      this.total = total;
      var top = (this.current - 1)/total * this.targetHeight;
      $("#pageScroller #currentPage").html(current);
      $("#pageScroller #totalPage").html(total);
      $("#pageScroller .pageTail").css({
        top: top + "px"
      });
    },
    show: function() {
      $("#pageScroller").show();
    },
    hide: function() {
      $("#pageScroller").hide();
    },
    remove: function() {
      $("#pageScroller").remove();
    }
  };
  w.PageScroller = PageScroller;
})(window);