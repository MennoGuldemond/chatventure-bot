function getHealthColor(user) {
  const step = 2.55;
  const red = Math.round(255 - step * user.health);
  const green = Math.round(step * user.health);
  return `${rgbToHex(red)}${rgbToHex(green)}00`;
}

function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
}

module.exports = { getHealthColor };
