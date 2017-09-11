'use babel'

export default class AtomRipTimerView {
  constructor (time) {
    this.element = document.createElement('span')
    this.element.classList.add('inline-block', 'atom-rip-timer')

    this.update(time)
  }

  getElement () {
    return this.element
  }

  destroy() {
    this.getElement().remove()
  }

  update (time) {
    this.element.textContent = time + '초'
  }
}
