const fs = require('fs')
const { Database } = require('@brtmvdl/database')
const { Client, Events } = require('discord.js')
const messages = require('./messages.js')
const { TOKEN } = require('./config.js')
const { MessageLog } = require('./models')
const db = new Database(process.env.DATA_PATH)
const { Audier } = require('./libs/audier')
const audier = new Audier(process.env.DATA_PATH)
const audioPlayer = new AudioPlayer({})

const client = new Client({ intents: require('./intents.js') })
const { createAudioResource, joinVoiceChannel, AudioPlayer } = require('@discordjs/voice')

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const now = Date.now()

  console.log({ now })

  audier.mp3(`Datetime: ${now}`, now).then((filename) => {
    const connection = joinVoiceChannel({
      channelId: interaction.channel.id,
      guildId: interaction.channel.guild.id,
      adapterCreator: interaction.channel.guild.voiceAdapterCreator,
    })

    connection.subscribe(audioPlayer)
    audioPlayer.play(createAudioResource(fs.createReadStream(filename)))
  }).catch((err) => console.error(err))
})

client.on(Events.MessageCreate, (message) => {
  const message_log = new MessageLog(message)
  db.in('messages').new().writeMany(message_log.toJSON())

  messages.run(message)
})

client.login(TOKEN)
