'use babel'

import AtomRipView from './atom-rip-view'
import AtomRipTimerView from './atom-rip-timer-view'

export default {
  ripView: null,
  statusView: null,

  timer: null,
  timeLeft: Infinity,
  first: 16,

  activate () {
    this.ripView = new AtomRipView()
    this.CODING_TIME = atom.config.get('atom-rip.codingTime')

    this.timeLeft = this.CODING_TIME
    this.statusView = new AtomRipTimerView(this.timeLeft)

    atom.workspace.observeTextEditors(editor => {
      editor.onDidChange(() => {
        if (this.first-- > 0) return
        if (this.timer || this.ripView.isVisible()) return

        this.startTimer()
      })

      editor.onDidStopChanging(() => {
        clearInterval(this.timer)
        this.timer = null
      })
    })
  },

  deactivate () {
    this.ripView.destroy()
    this.statusView.destroy()
  },

  serialize () {},

  consumeStatusBar (statusBar) {
    statusBar.addRightTile({ item: this.statusView, priority: -Infinity })
  },

  startTimer () {
    this.timer = setInterval(() => {
      console.log('CODE', this.timeLeft--)
      this.statusView.update(this.timeLeft)

      if (this.timeLeft < 0) {
        this.ripView.show()
        this.timeLeft = this.CODING_TIME

        clearInterval(this.timer)
        this.timer = null
      }
    }, 1000)
  }
}
