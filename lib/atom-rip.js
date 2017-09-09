'use babel'

import AtomRipView from './atom-rip-view'
import { CompositeDisposable } from 'atom'

export default {
  atomRipView: null,
  subscriptions: null,

  timer: null,
  timeLeft: 10,

  activate(state) {
    this.atomRipView = new AtomRipView(state.atomRipViewState)
    this.atomRipView.playBGM()

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rip:toggle': () => this.toggle(),
      'atom-rip:timeCheck': () => this.timeCheck()
    }));
  },

  deactivate() {
    this.subscriptions.dispose()
    this.atomRipView.destroy()
  },

  serialize() {
    return {
      atomRipViewState: this.atomRipView.serialize()
    }
  },

  toggle() {
    console.log('AtomRIP was toggled!')
    this.atomRipView.toggle()
  },

  startTimer () {
    return setInterval(() => {
      console.log("timeleft :", this.timeLeft)
      if (--this.timeLeft > 0) return
      this.atomRipView.toggle()
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

};
