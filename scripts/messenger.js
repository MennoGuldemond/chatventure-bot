const { MessageEmbed } = require('discord.js');
const { emoji } = require('../data/emoji');
const levelManager = require('./level-manager');

async function send(message, user) {
  const level = levelManager.get(user);
  const embed = create(level);
  try {
    const sendMessage = await message.channel.send(embed);
    level.options.forEach((option) => {
      sendMessage.react(emoji[option.emoji]);
    });
  } catch (err) {
    console.error(err);
  }
}

function create(level) {
  const embed = new MessageEmbed();
  try {
    let description = level.text;
    for (let i = 0; i < level.options.length; i++) {
      description += `\n\n${emoji[level.options[i].emoji]} : ${
        level.options[i].text
      }`;
    }
    embed.setDescription(description);
  } catch (err) {
    console.error(err);
  }

  return embed;
}

module.exports = { create, send };
