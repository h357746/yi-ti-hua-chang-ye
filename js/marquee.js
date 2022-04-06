// 跑马灯js
function getMarquee() {
  var url =
    "/cms/dataEnginerServlet?key=L_" +
    topCategoryId +
    "_0_zlm_" +
    topCategoryId +
    "_1&pageSize=20";
  $.ajax({
    url: url,
    success: function(res) {
      var response = res;
      response = eval("(" + response + ")");
      var data = response.dataList;
      var str = "";
      var description = data[data.length - 1].description;

      /**
       *
       *  <marquee behavior="" direction="" id="marquee">'+data[data.length - 1].description+'</marquee>
       */
      str = description.replace(
        /&/g,
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
      );

      $("#marquee").html(
        '<marquee behavior="" direction="" id="marquee">' + str + "</marquee>"
      );
    }
  });
}
getMarquee();
