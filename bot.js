const dotenv = require('dotenv');
const { Client } = require('discord.js');
const { User } = require('./scripts/user');
const { handleReaction } = require('./scripts/reaction-handler');
const messenger = require('./scripts/messenger');
const firebase = require('./scripts/firebase');

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
      if (message.content.toLowerCase() === '!start') {
        firebase.setUser(message.author.id, new User());
        messenger.send(message, new User());
      } else {
        message.channel.send(
          "You're not yet registerd. If you want to start your adventure type '!start'. We only store your discord indentifier to keep track of your progress."
        );
      }
    } else {
      messenger.send(message, userSnapshot.val());
    }
  }
});

client.on('messageReactionAdd', async (messageReaction, user) => {
  if (messageReaction.me === false) {
    const userSnapshot = await firebase.getUserSnapshot(user.id);
    if (userSnapshot.val()) {
      handleReaction(messageReaction, userSnapshot, user);
    }
  }
});

client.login(process.env.BOT_TOKEN);
