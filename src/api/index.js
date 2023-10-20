const { Database } = require('@brtmvdl/database')
const { Client, Events, GatewayIntentBits } = require('discord.js')

const { texts } = require('./texts.json')

const { TOKEN } = require('./config.js')
const { MessageLog } = require('./models')

const db = new Database(process.env.DATA_PATH)

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
  db.in('messages').new().writeMany(message_log.toJSON())
  const text = texts.find((text) => {
    return text.when.every((w) => {
      switch (true) {
        case w['message.0.content'] === message.content: return true
      }

      return false
    })
  })

  if (text) message.reply(text.then)
  else console.log({
    ...message_log.toJSON(),
    messages: messages_fetch
      .map((mes) => new MessageLog(mes))
      .map((log) => log.toJSON())
  })
})

client.login(TOKEN)
