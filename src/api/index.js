const { Client, Events } = require('discord.js')
const { TOKEN } = require('./config.js')
const client = new Client({ intents: require('./intents.js') })

const hellos = ['Hello!', 'Hi.', 'Hey! 🤠']

const random = (n) => Math.floor(Math.random() * n)

const answerHello = () => Promise.resolve(hellos[random(hellos.length)])

const answer = (question) => {
  switch (question) {
    case '/hello': return answerHello()
  }

  console.log('No answer.', question)

  return Promise.resolve('')
}

client.on(Events.MessageCreate, (message) => answer(message.content).then((an) => an && message.reply(an)))

client.login(TOKEN)
