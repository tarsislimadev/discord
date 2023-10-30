const espeak = require('espeak')
const path = require('path')
const fs = require('fs')

class Audier {
  data_path = null

  constructor(data_path) {
    console.log('Audier', { data_path: data_path })

    fs.mkdirSync(this.data_path = data_path, { recursive: true })

  }

  mp3(message, filename = Date.now().toString()) {
    return new Promise((s, f) => {
      const { data_path } = this

      console.log('Create a MP3 file', `Message: ${message}`, `File name: ${filename}`)

      espeak.speak(message, (err, wav) => {
        if (err) return f(err)

        const fn = path.join(data_path, filename + '.wav')
        fs.writeFileSync(fn, wav.buffer)

        s(fn)
      })
    })
  }
}

module.exports.Audier = Audier
