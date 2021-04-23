const { emoji } = require('../data/emoji');
const firebase = require('./firebase');
const levelManager = require('./level-manager');
const messenger = require('./messenger');

function handleReaction(messageReaction, userSnapshot, user) {
  const currentLevel = levelManager.get(userSnapshot.val());
  const emojiName = Object.keys(emoji).find(
    (k) => emoji[k] === messageReaction.emoji.name
  );
  if (emojiName) {
    const chosenOption = currentLevel.options.find(
      (o) => o.emoji === emojiName
    );
    if (chosenOption) {
      const currentUser = userSnapshot.val();
      let newHealth = currentUser.health;
      if (chosenOption.effect) {
        if (chosenOption.effect.health) {
          newHealth = currentUser.health + chosenOption.effect.health;
          if (newHealth > 100) {
            newHealth = 100;
          } else if (newHealth <= 0) {
            // Game over
          }
        }
      }
      const updatedUser = {
        ...currentUser,
        level: chosenOption.next,
        health: newHealth,
      };
      firebase.setUser(user.id, updatedUser);
      messenger.send(messageReaction.message, updatedUser);
    }
  }
}

module.exports = { handleReaction };
