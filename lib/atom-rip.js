'use babel'

import AtomRipView from './atom-rip-view'
import { CompositeDisposable } from 'atom'

export default {

  atomRipView: null,
  modalPanel: null,
  subscriptions: null,

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
    this.modalPanel.destroy()
    this.subscriptions.dispose()
    this.atomRipView.destroy()
  },

  serialize() {
    return {
      atomRipViewState: this.atomRipView.serialize()
    }
  },

  toggle() {
    console.log('AtomRip was toggled!')
    this.atomRipView.toggle()
  },

  timeCheck(){
    let startCoding = ()=>{
      /*if(){
        const start = window.performance.now();

      }*/
      console.log("hello!!!!!!!!start coding!!!!!");
    };

    atom.workspace.observeTextEditors(editor =>
      editor.onDidChange(startCoding)
    );

    /*
    const end = window.performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");
    */
  }

};
