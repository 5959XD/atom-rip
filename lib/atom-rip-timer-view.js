'use babel'

export default class AtomRipTimerView {
  constructor (time) {
    this.element = document.createElement('span')
    this.element.classList.add('inline-block', 'atom-rip-timer')

    this.update(time)
  }

  destroy () {
    this.getElement().remove()
  }

  getElement () {
    return this.element
  }

  update (time = 0) {
    this.element.textContent = time.toFixed(1) + '초'
  }
}
