const { Database } = require('@brtmvdl/database')
const { Client, Events, GatewayIntentBits } = require('discord.js')
const pack = require('./package.json')

const { TOKEN } = require('./config.js')
const { MessageLog } = require('./models')

const db = new Database(process.env.DATA_PATH)

const { Broker } = require('./libs/broker/index.js')

const broker = new Broker()

broker.message('Olá, gente!', (m) => m.reply(`Olá, meu nome é ${pack.nickname}`))

broker.message('/clock', (m) => m.reply(`Agora é ${new Date()}.`))

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
})

client.on(Events.MessageCreate, (message) => {
  const message_log = new MessageLog(message)
  db.in('messages').new().writeMany(message_log.toJSON())

  broker.run(message)
})

client.login(TOKEN)
