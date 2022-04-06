// 句容公共js
var stb; //默认机顶盒号
try {
  stb = hardware.STB.serialNumber;
} catch (error) {
  // stb = "02987617140000570";
  stb = "000000000000000000";
}
