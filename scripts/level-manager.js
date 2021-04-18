const chapterOne = require('../data/chapter-one.json');

function get(user) {
  if (user.chapter === 1) {
    const level = chapterOne.filter((x) => x.level === user.level);
    if (level) {
      return level[0];
    }
  }
}

module.exports = { get };
