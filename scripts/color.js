function getHealthColor(user) {
  if (user.health > 50) {
    const red = Math.round(-5.1 * user.health + 510);
    return `${rgbToHex(red)}${rgbToHex(255)}00`;
  } else if (user.health < 50) {
    const green = Math.round(5.1 * (user.health / 2));
    return `${rgbToHex(255)}${rgbToHex(green)}00`;
  } else {
    return `${rgbToHex(255)}${rgbToHex(255)}00`;
  }
}

function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = '0' + hex;
  }
  return hex;
}

module.exports = { getHealthColor };
