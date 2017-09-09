'use babel'

export default class AtomRipView {
  constructor(serializedState) {
    this.hidden = true

    this.element = document.createElement('div')
    this.element.classList.add('atom-rip', 'hidden')

    const message = document.createElement('div')
    message.classList.add('message')

    const title = document.createElement('h1')
    title.textContent = '잠시 휴식을 가지세요'
    message.appendChild(title)

    this.element.appendChild(message)
    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  toggle () {
    this.element.classList[this.hidden ? 'remove' : 'add']('hidden')
    this.hidden = !this.hidden
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {}

  // Tear down any state and detach
  destroy () {
    this.element.remove()
  }

  getElement () {
    return this.element
  }

  playBGM (filePath) {
    var audio = new Audio(filePath)
    audio.play()
  }
}
