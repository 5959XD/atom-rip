'use babel';

import AtomRipView from './atom-rip-view';
import { CompositeDisposable } from 'atom';

export default {

  atomRipView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomRipView = new AtomRipView(state.atomRipViewState);

    this.subscriptions = new CompositeDisposable()
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rip:toggle': () => this.toggle()
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
  }
};
