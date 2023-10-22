
class Broker {
  messages = []

  message(when, then) {
    this.messages.push({ when, then })
    return this
  }

  run(message) {
    const current = this.messages.find((m) => m.when == message.content)

    if (!(current === undefined)) current.then(message)

    return message
  }
}

module.exports = { Broker }
