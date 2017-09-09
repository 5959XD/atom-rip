'use babel';

export default class AtomRipView {
  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div') // div 만들고
    this.element.classList.add('atom-rip') // class atom-rip 추가

    const message = document.createElement('div')
    message.textContent = 'The AtomRip package is Alive! It\'s ALIVE!';
    message.classList.add('message')

    this.element.appendChild(message)
    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  toggle () {
    this.hidden = !this.hidden
    this.element.classList[this.hidden ? 'remove' : 'add']('hidden')
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
