const { Client, Events, GatewayIntentBits } = require('discord.js')
const { TOKEN } = require('./config.js')

const { MessageLog } = require('./models')

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

client.once(Events.ClientReady, client => console.log(`Client ready: ${client.user.tag}`))

client.on(Events.Raw, (ev) => console.log('Raw', ev))

client.on(Events.MessageCreate, (message) => {
  const message_log = new MessageLog(message)

  message.channel.messages.fetch({ limit: 10 }).then((messages_fetch) => {
    console.log({
      ...message_log.toJSON(),
      messages: messages_fetch
        .map((mes) => new MessageLog(mes))
        .map((log) => log.toJSON())
    })
  })
})

client.login(TOKEN)
