'use babel'

import { CompositeDisposable } from 'atom'
import AtomRipView from './atom-rip-view'
import AtomRipTimerView from './atom-rip-timer-view'

export default {
  activate () {
    this.subscription = new CompositeDisposable()
    this.codingTime = atom.config.get('atom-rip.codingTime')

    this.ripView = new AtomRipView()
    this.timerView = new AtomRipTimerView(this.time = this.codingTime)

    atom.workspace.observeTextEditors(editor => {
      let last = null

      this.subscription.add(editor.onDidChange(() => {
        const now = performance.now()
        if (!this.ripView.hidden) return

        if (now < 10000) return
        if (last === null) return (last = now)

        this.time -= (now - last) / 1000
        this.timerView.update(this.time.toFixed(1))

        last = now
        if (this.time > 0) return

        this.ripView.start()
        this.time = this.codingTime
        this.timerView.update(this.time)
      }))

      this.subscription.add(editor.onDidStopChanging(() => (last = null)))
    })
  },

  deactivate () {
    this.ripView.destroy()
    this.timerView.destroy()
    this.subscription.dispose()
  },

  consumeStatusBar (statusBar) {
    statusBar.addRightTile({ item: this.timerView, priority: -Infinity })
  }
}
