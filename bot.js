const dotenv = require('dotenv');
const { Client } = require('discord.js');
const { emoji } = require('./data/emoji');

const firebase = require('./scripts/firebase');

dotenv.config();
const client = new Client();
firebase.init();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.channel.type === 'dm' && message.author.bot === false) {
    // console.log(message);
    // message.react('1️⃣');
    // message.react('2️⃣');
    // message.react('3️⃣');
    // message.react('4️⃣');
    const myMessage = await message.channel.send('This is a message from me..');
    myMessage.react(emoji.one);
    myMessage.react(emoji.two);
    myMessage.react(emoji.three);
    myMessage.react(emoji.four);
    // const userSnapshot = await firebase.getUserSnapshot(message.author.id);
    // console.log(userSnapshot.val());
  }
});

client.on('messageReactionAdd', async (messageReaction, user) => {
  if (messageReaction.me === false) {
    // console.log(messageReaction.emoji.name);
    if (messageReaction.emoji.name === emoji.one) {
      console.log('Match!!');
    }
    // console.log(user);
  }
});

client.login(process.env.BOT_TOKEN);
