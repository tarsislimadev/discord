const { GatewayIntentBits } = require('discord.js')

module.exports = [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
]
