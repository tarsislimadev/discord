
class MessageLog {
  message = null

  constructor(message) {
    this.message = message
  }

  toJSON() {
    return ({
      user_id: this.message.author.id,
      server_id: 0,
      channel_id: this.message.channelId,
      message_id: this.message.id,
      guild_id: this.message.guildId,
      content: this.message.content,
    })
  }
}

module.exports = {
  MessageLog,
}
