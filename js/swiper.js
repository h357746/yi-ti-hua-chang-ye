(function (window) {
    window.Swiper = {
        bannerEl: '.pic', //轮播图父元素
        pointEl: '.point-list', //焦点父元素
        bannerIndex: 0, //轮播图索引
        pointIndex: 0, //焦点索引
        bannerLen: 0, //轮播图数量
        bannerWidth: 0, //轮播图宽度
        bannerData: [], //轮播图片地址
        time: 5000, //轮播定时器5s
        timer: null, //定时器
        init: function (option) {
            this.bannerData = option.bannerData || [];
            this.bannerEl = option.bannerEl || '.pic';
            this.pointEl = option.pointEl || '.point-list';
            this.bannerIndex = option.bannerIndex || 0;
            this.pointIndex = option.pointIndex || 0;
            this.time = option.time || 5000;
            if (!this.bannerData.length) return;
            //渲染轮播图
            for (var i = 0; i < this.bannerData.length; i++) {
                $(this.bannerEl).append('<li>' + this.bannerData[i] + '</li>');
            }
            $(this.bannerEl).append($(this.bannerEl + ' li:first').clone(true)); //无缝轮播，克隆第一个元素放在最后面
            this.bannerLen = $(this.bannerEl).children().length; //克隆之后的数量
            $(this.bannerEl).css('width', this.bannerLen * 101 + '%'); //宽度多加一些
            //渲染轮播焦点
            for (var i = 0; i < this.bannerLen - 1; i++) {
                $(this.pointEl).append('<li></li>');
            }
            $(this.pointEl + ' li').eq(this.pointIndex).addClass('active').siblings().removeClass('active');
            this.bannerWidth = $(this.bannerEl + ' li').width();
            if (this.bannerLen > 2) this.auto();

        },
        auto: function () {
            this.timer && clearInterval(this.timer);
            var _this = this;
            this.timer = setInterval(function () {
                if (_this.bannerIndex == _this.bannerLen - 1) {
                    $(_this.bannerEl).get(0).style.left = 0; //如果是最后一张，瞬间跳回第一张
                    _this.bannerIndex = 0;
                }
                _this.bannerIndex++;
                $(_this.bannerEl).animate({
                    left: (-_this.bannerIndex * _this.bannerWidth) + 'px'
                }, 600)
                if (_this.pointIndex < _this.bannerLen - 2) {
                    _this.pointIndex++;
                } else {
                    _this.pointIndex = 0;
                }
                $(_this.pointEl + ' li').eq(_this.pointIndex).addClass('active').siblings().removeClass('active');
            }, this.time);
        },
        prev: function () {
            if (!this.bannerData.length) return;
            this.bannerIndex--;
            if (this.bannerIndex == -1) {
                $(this.bannerEl)[0].style.left = (-(this.bannerLen - 2) * this.bannerWidth) + 'px'; //第一张，瞬间跳回最后一张
                this.bannerIndex = this.bannerLen - 2;
            }
            $(this.bannerEl).animate({
                left: (-(this.bannerIndex) * this.bannerWidth) + 'px'
            }, 600)
            this.pointIndex--;
            if (this.pointIndex == -1) {
                this.pointIndex = this.bannerLen - 2;
            }
            $(this.pointEl + ' li').eq(this.pointIndex).addClass('active').siblings().removeClass('active');
        },
        next: function () {
            if (!this.bannerData.length) return;
            if (this.bannerIndex == this.bannerLen - 1) {
                $(this.bannerEl).get(0).style.left = 0; //最后一张，瞬间跳回第一张
                this.bannerIndex = 0;
            }
            this.bannerIndex++;
            $(this.bannerEl).animate({
                left: (-this.bannerIndex * this.bannerWidth) + 'px'
            }, 600)
            if (this.pointIndex < this.bannerLen - 2) {
                this.pointIndex++;
            } else {
                this.pointIndex = 0;
            }
            $(this.pointEl + ' li').eq(this.pointIndex).addClass('active').siblings().removeClass('active');
        }
    }
})(window);