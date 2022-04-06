function hmacSha256(queryString, timeStemap, method, secret) {
    var signStr = method + "&" + encodeURIComponent("/") + "&";
    var TimeStamp = encodeURIComponent(timeStemap).replace("%20", "+");
    queryString = buildqueryString(queryString);
    if (queryString.length > 1) {
        signStr += TimeStamp + '&' + encodeURIComponent(queryString);
    } else {
        signStr += TimeStamp + '&';
    }
    var _t = CryptoJS.HmacSHA256(signStr, secret);
    var hashInBase64 = CryptoJS.enc.Base64.stringify(_t);
    return hashInBase64;
};

function buildqueryString(queryString) {
    var stringResult = queryString.split('&');
    stringResult.sort();
    var res = stringResult.map(function(item, index, stringResult) {
        var tmpSplit = item.split("=");
        if (tmpSplit.length >= 2 && tmpSplit[1].length > 0) {
            var name = tmpSplit[0];
            var value = tmpSplit[1];
            item = name + "=" + value;
            return item;
        }

    })
    var arr = [];
    for (var i = 0; i < res.length; i++) {
        if (res[i] != undefined && res[i] != '') {
            arr.push(res[i]);
        }
    }
    return arr.join('&');
}

function getFilterTime() {
    var time = new Date();
    var year = time.getUTCFullYear();
    var month = time.getUTCMonth() + 1;
    month = month < 10 ? "0" + month : month;
    var date =
        time.getUTCDate() < 10 ? "0" + time.getUTCDate() : time.getUTCDate();

    var hour =
        time.getUTCHours() < 10 ? "0" + time.getUTCHours() : time.getUTCHours();
    var minutes =
        time.getUTCMinutes() < 10 ?
        "0" + time.getUTCMinutes() :
        time.getUTCMinutes();
    var seconds =
        time.getUTCSeconds() < 10 ?
        "0" + time.getUTCSeconds() :
        time.getUTCSeconds();

    return (
        year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds
    );
};

var baseCrypto = {
    hmacSha256: hmacSha256,
    getFilterTime: getFilterTime,
    AppId: 'nlffdbc0a9bd0a499f',
    AppSecret: '723b4e5d9d9a49d59b640a1ffb338c88',
};