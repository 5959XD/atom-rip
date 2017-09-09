'use babel'

import AtomRipView from './atom-rip-view'
import AtomRipTimerView from './atom-rip-timer-view'
import { CompositeDisposable } from 'atom'

export default {
  atomRipView: null,
  subscriptions: null,

  timer: null,
  timeLeft: 10,

  activate(state) {
    this.atomRipView = new AtomRipView(state.atomRipViewState)
    this.atomRipTimerView = new AtomRipTimerView(state.atomRipViewState)

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rip:toggle': () => this.toggle(),
      'atom-rip:timeCheck': () => this.timeCheck()
    }))

    console.log('코딩 시간', atom.config.get('atom-rip.codingTime'))
    console.log('휴식 시간', atom.config.get('atom-rip.restTime'))
  },

  deactivate() {
    this.subscriptions.dispose()
    this.atomRipView.destroy()
    this.atomRipTimerView.destroy()
  },

  serialize() {
    return {
      atomRipViewState: this.atomRipView.serialize()
    }
  },

  consumeStatusBar (statusBar) {
    statusBar.addRightTile({ item: this.atomRipTimerView, priority: -Infinity })
  },

  toggle() {
    console.log('AtomRIP was toggled!')
    this.atomRipView.toggle()
  },

  startTimer () {
    return setInterval(() => {
      console.log('tile left', --this.timeLeft)
      if (this.timeLeft <= 0) this.atomRipView.show()
    }, 1000)
  },

  timeCheck(){
    atom.workspace.observeTextEditors(editor => {
      editor.onDidChange(() => {
        if (!this.timer) this.timer = this.startTimer()
      })

      editor.onDidStopChanging(() => {
        clearInterval(this.timer)
        this.timer = null
      })
    })
  }
}
