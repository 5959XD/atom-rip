'use babel'

export default class AtomRipTimerView {
  time: 0

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
    this.time = time
    this.element.textContent = this.time + '초'
  }
}
