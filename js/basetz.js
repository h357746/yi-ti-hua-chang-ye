var myDate = new Date()
var dateTime = dateFormat('yy-mm-dd hh:mi:ss', myDate)
var token = null
//登录信息
var loginObj = {
  loginName: 'admin',
  password: 'db4e632e9de00ba7b4415ce7606c2f43'
}

// 时间格式化
function dateFormat(fmt, date) {
  let ret
  const opt = {
    'y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'h+': date.getHours().toString(), // 时
    'mi+': date.getMinutes().toString(), // 分
    's+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], opt[k].length == 1 ? '0' + opt[k] : opt[k])
    }
  }
  return fmt
}
//机顶盒号
function getStbId() {
  var e = ''
  try {
    e = hardware.STB.serialNumber
  } catch (t) {
    e = ''
  }
  return e
}
