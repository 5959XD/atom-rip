'use babel';

import AtomRipView from './atom-rip-view';
import { CompositeDisposable } from 'atom';

export default {

  atomRipView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomRipView = new AtomRipView(state.atomRipViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomRipView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-rip:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomRipView.destroy();
  },

  serialize() {
    return {
      atomRipViewState: this.atomRipView.serialize()
    };
  },

  toggle() {
    console.log('AtomRip was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }




};
