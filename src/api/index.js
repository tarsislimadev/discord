const { Database } = require('@brtmvdl/database')
const { Client, Events } = require('discord.js')
const messages = require('./messages.js')
const { TOKEN } = require('./config.js')
const { MessageLog } = require('./models')
const db = new Database(process.env.DATA_PATH)

const client = new Client({ intents: require('./intents.js') })

client.on(Events.MessageCreate, (message) => {
  const message_log = new MessageLog(message)
  db.in('messages').new().writeMany(message_log.toJSON())

  messages.run(message)
})

client.login(TOKEN)
