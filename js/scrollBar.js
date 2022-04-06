(function (window) {
    window.ScrollBar = {
        currentPage: 1, //当前页
        totalPage: 1, //总页数
        scorllRail: 0, //滚动轨道高度
        scrollBar: 0, //滚动体的高度
        targetBar: 0, //可滚动区域高度
        scrollBarTop: 0, //滚动体top
        flag: true, //节流
        isBack: false,
        init: function (currentPage, totalPage) {
            // if (currentPage != 1 || this.isBack) return;
            this.isBack = false;
            this.currentPage = currentPage;
            this.totalPage = totalPage;
            $('.scrllBar2').css('height', 100 / this.totalPage + '%'); //滚动条百分比
            //滚动条
            this.scorllRail = $('.scrollRail2').height();
            this.scrollBar = $('.scrllBar2').height();
            this.targetBar = this.scorllRail - this.scrollBar;
            if ((this.currentPage == this.totalPage) && this.totalPage > 1) {
                this.scrollBarTop = this.targetBar + 'px';
            } else {
                if (this.currentPage == 1) {
                    this.scrollBarTop = (this.currentPage - 1) / this.totalPage * this.targetBar + 'px';
                } else {
                    this.scrollBarTop = this.currentPage / this.totalPage * this.targetBar + 'px';
                }
            }
            $('.scrllBar2').css('top', this.scrollBarTop);
        },
        up: function () {
            if (this.flag) {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.scrollBarTop = (this.currentPage - 1) / this.totalPage * this.targetBar + 'px';
                } else {
                    this.scrollBarTop = 0;
                }
                $('.scrllBar2').animate({
                    top: this.scrollBarTop
                }, 500, 'swing');
                var _this = this;
                setTimeout(function () {
                    _this.flag = true;
                }, 500)
            }
        },
        down: function () {
            if (this.flag) {
                this.flag = false;
                if (this.totalPage <= 1) {
                    return;
                }
                if (this.currentPage < this.totalPage) {
                    this.currentPage++;
                    this.scrollBarTop = this.currentPage / this.totalPage * this.targetBar + 'px';
                } else {
                    this.scrollBarTop = this.targetBar + 'px';
                }
                $('.scrllBar2').animate({
                    top: this.scrollBarTop
                }, 500, 'swing');
                var _this = this;
                setTimeout(function () {
                    _this.flag = true;
                }, 500)
            }
        },
        backTop: function (callback) {
            if (this.currentPage > 1) {
                this.currentPage = 1;
                this.up();
                this.isBack = true;
                callback && callback();
            }
        }
    }
})(window);