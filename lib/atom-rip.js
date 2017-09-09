'use babel'

import AtomRipView from './atom-rip-view'
import { CompositeDisposable } from 'atom'

export default {
  atomRipView: null,
  subscriptions: null,

  activate(state) {
    this.atomRipView = new AtomRipView(state.atomRipViewState)

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rip:toggle': () => this.toggle(),
      'atom-rip:timeCheck': () => this.timeCheck()
    }));
  },

  deactivate() {
    this.subscriptions.dispose()
    this.atomRipView.destroy()
    this.stopBGM()
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

  timeCheck(){
    let startCoding = ()=>{
      //if(){
        const start = window.performance.now();
        for(var i=0; i<500000; ++i){

        }
      //}
    };
    startCoding();

    const end = window.performance.now();
    console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

  }
};
