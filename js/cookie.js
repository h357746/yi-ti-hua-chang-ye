// var cookies = {
//     setCookie: setCookie,
//     getCookie: getCookie,
//     delCookie: delCookie,
// }

// 设置
function setCookie(name, value, path) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    if (path) {
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path;
    } else {
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    }

}

// 获取
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 删除
function delCookie(name, path) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        if (path) {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path="+path;
        } else {
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }

    }
   
}

function parseStrObjByRegExp(strDes) {
    var obj = {};
    strDes.replace(/(\w+)(?:=([^;]*))?/g, function (str, key, value) {
        obj[key] = value;
    });
    return obj;
}