const dotenv = require('dotenv');
const { Client } = require('discord.js');
const { emoji } = require('./data/emoji');
const { User } = require('./scripts/user');
const messenger = require('./scripts/messenger');
const firebase = require('./scripts/firebase');
const levelManager = require('./scripts/level-manager');

dotenv.config();
const client = new Client();
firebase.init();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.channel.type === 'dm' && message.author.bot === false) {
    const userSnapshot = await firebase.getUserSnapshot(message.author.id);
    if (userSnapshot.val() == null) {
      firebase.setUser(message.author.id, new User());
      messenger.send(message, new User());
    } else {
      messenger.send(message, userSnapshot.val());
    }
  }
});

client.on('messageReactionAdd', async (messageReaction, user) => {
  if (messageReaction.me === false) {
    const userSnapshot = await firebase.getUserSnapshot(user.id);
    if (userSnapshot.val()) {
      const currentLevel = levelManager.get(userSnapshot.val());
      const emojiName = Object.keys(emoji).find(
        (k) => emoji[k] === messageReaction.emoji.name
      );
      if (emojiName) {
        const chosenOption = currentLevel.options.find(
          (o) => o.emoji === emojiName
        );
        if (chosenOption) {
          const updatedUser = {
            ...userSnapshot.val(),
            level: chosenOption.next,
          };
          firebase.setUser(user.id, updatedUser);
          messenger.send(messageReaction.message, updatedUser);
        }
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
