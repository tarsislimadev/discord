const pack = require('./package.json')

const { Broker } = require('./libs/broker/index.js')

const broker = new Broker()

broker.message('Olá, gente!', (m) => m.reply(`Olá, meu nome é ${pack.nickname}`))

broker.message('/clock', (m) => m.reply(`Agora é ${new Date()}.`))

module.exports = broker
