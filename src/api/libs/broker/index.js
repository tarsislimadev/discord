
class Broker {
  messages = []

  message(when, then) {
    this.messages.push({ when, then, type: 'message' })
    return this
  }

  regexp(when, then) {
    this.messages.push({ when, then, type: 'regexp' })
    return this
  }

  command(when, then) {
    this.messages.push({ when, then, type: 'command' })
    return this
  }

  run(message) {
    const current = this.messages.find((m) => {
      switch (m.type) {
        case 'message': return m.when === message.content
        case 'regexp': return (new RegExp(m.when)).test(message.content)
        case 'command': return message.content.substring(0, ('/' + m.when).length) == '/' + m.when
      }

      return false
    })

    if (!(current === undefined)) current.then(message)

    return message
  }
}

module.exports = { Broker }
