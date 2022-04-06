/* 
常用js方法
*/
(function (w) {
	w.utils = {
		typeTest: typeTest,
		getDate: getDate,
		getCookie: getCookie,
		setCookie: setCookie,
		delCookie: DelCookie,
		getParam: getParam,
		cutString: cutString,
		trim: trim,
		random: random,
		getPlayUrl: getPlayUrl,
		setStorage: setStorage,
		getStorage: getStorage,
		delStorage: delStorage,
	};

	function setStorage(key, value) {
		if (sessionStorage) {
			sessionStorage
				.setItem(key, value);
		} else {
			setCookie(key, value)
		}

	}

	function getStorage(key) {
		if (sessionStorage) {
			return sessionStorage
				.getItem(key)
		} else {
			return getCookie(key);
		}

	}

	function delStorage(key) {
		if (sessionStorage) {
			sessionStorage
				.removeItem(key)
		} else {
			DelCookie(key);
		}

	}
	/**
	 * 检测数据类型
	 * @param {any} obj
	 */
	function typeTest(obj) {
		return Object.prototype.toString.call(obj);
	}
	/**
	 * 获取日期
	 */
	function getDate() {
		var date = {};
		var tt = new Date();
		date.year = tt.getFullYear(); //年
		date.month =
			tt.getMonth() + 1 >= 10 ? tt.getMonth() + 1 : "0" + (tt.getMonth() + 1); //月
		date.date = tt.getDate() >= 10 ? tt.getDate() : "0" + tt.getDate(); //日
		date.day = tt.getDay(); //星期
		date.hour = tt.getHours();
		date.minutes =
			tt.getMinutes() >= 10 ? tt.getMinutes() : "0" + tt.getMinutes();
		date.seconds =
			tt.getSeconds() >= 10 ? tt.getSeconds() : "0" + tt.getSeconds();
		/**
		 * 格式化时间
		 * @param {any} symbol1 日期链接符 -
		 * @param {any} symbol2 时间链接符 :
		 */
		date.format = function (symbol1, symbol2) {
			return [
				date.year + symbol1 + date.month + symbol1 + date.date,
				date.hour + symbol2 + date.minutes + symbol2 + date.seconds
			];
		};
		return date;
	}
	//取得Cookie
	function getCookie(c_name) {
		if (document.cookie.length > 0) {
			c_start = document.cookie.indexOf(c_name + "=");
			if (c_start != -1) {
				c_start = c_start + c_name.length + 1;
				c_end = document.cookie.indexOf(";", c_start);
				if (c_end == -1) c_end = document.cookie.length;
				console.log(unescape(document.cookie.substring(c_start, c_end)))
				return unescape(document.cookie.substring(c_start, c_end));
			}
		}
		return "";
	}
	//设置Cookie
	function setCookie(c_name, value, expiredays) {
		if (expiredays == null || expiredays == "") expiredays = 1;
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie =
			c_name +
			"=" +
			value +
			(expiredays == null ? "" : ";expires=" + exdate.toUTCString());
	}

	//删除Cookie
	function DelCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = getCookie(name);
		document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
	}
	// 获取url参数
	function getParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search
			.substr(1)
			.replace(new RegExp(/(amp;)/g), "")
			.match(reg);
		if (r != null) {
			return r[2];
		}
		return null;
	}
	/**
	 * @param {any} str 待处理字符串
	 * @param {any} len 显示长度
	 * @param {any} replaceSymbol 截取替换多余字符串
	 */
	function cutString(str, len, replaceSymbol) {
		if (!str || !len) {
			return "";
		}
		var a = 0;
		var i = 0;
		var temp = "";
		for (i = 0; i < str.length; i++) {
			if (str.charCodeAt(i) > 255) {
				a += 2;
			} else {
				a++;
			}
			if (a > len) {
				return temp + replaceSymbol;
			}
			temp += str.charAt(i);
		}
		return str;
	}

	function getPlayUrl(obj, callback) {
		var playurl =
			"/cms/interfaceservice/play?assetId=" +
			obj.assetId +
			"&clientId=" +
			obj.clientId +
			"&busiType=vpg&assetName=" +
			obj.title;

		$.ajax({
			url: playurl,
			success: function (res) {
				callback(res);
			}
		});
	}
	/**
	 * @param {any} str 待处理字符串
	 * @param {any} type 类型: 1所有空格、2前后空格、3前空格、4后空格
	 */
	function trim(str, type) {
		var type = type || 1;
		switch (type) {
			case 1:
				return str.replace(/\s+/g, "");
				break;
			case 2:
				return str.replace(/(^\s*)|(\s*$)/g, "");
				break;
			case 3:
				return str.replace(/(^\s*)/g, "");
				break;
			case 4:
				return str.replace(/(\s*$)/g, "");
				break;
		}
	}
	/**
	 * JS获取n至m随机整数
	 */

	function random(n, m) {
		var c = m - n + 1;

		return Math.floor(Math.random() * c + n);
	}
	var malert = {
		flag: true,
		timer: null,
		focusV: null,
		show: function (tips, focusValue, timeout) {
			var self = this;
			this.flag = false;
			focus = "malert";

			this.focusV = focusValue;
			$(".malert").show();
			$(".alert_con").text(tips);
			var times = timeout ? timeout : 3000;
			if (this.timer) {
				clearTimeout(this.timer);
				this.timer = null;
			}
			this.timer = setTimeout(function () {
				$(".malert").hide();
				self.flag = true;
				focus = focusValue;
			}, times);
		},
		enter: function () {
			$(".malert").hide();
			this.timer = null;
			this.flag = true;
			focus = this.focusV;
		}
	};
})(window);