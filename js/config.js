var stb;
try {
     stb = hardware.STB.serialNumber;
} catch (error) {
    stb = '123456789012345';
}

var config = {
  isCmsVersion3: true,
  stb: stb,
};