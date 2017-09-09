'use babel'

export default class AtomRipTimerView {
  totalSeconds: 0

  constructor (serializedState) {
    this.element = document.createElement('span')
    this.element.classList.add('inline-block')

    this.element.appendChild(this.getSpan('00'))
    this.element.appendChild(this.getSpan(':'))
    this.element.appendChild(this.getSpan('00'))
    this.element.appendChild(this.getSpan(':'))
    this.element.appendChild(this.getSpan('00'))
  }

  getSpan (text) {
    const span = document.createElement('span')
    span.textContent = text
    return span
  }

  setTime () {
    this.totalSeconds++
    this.second.textContent = pad(totalSeconds % 60)
    this.minute.textContent = pad(Math.floor(totalSeconds / 60))
  }

  pad (val) {
    const str = val.toString()
    return str.length >= 2 ? str : '0' + str
  }
}
