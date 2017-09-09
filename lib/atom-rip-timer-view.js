
export default class AtomRipTimerView {
  totalSeconds: 0

  constructor(serializedState) {
    this.element = document.createElement('label')
    this.element.classList.add('timer')

    this.hour = document.createElement('span')
    this.hour.textContent = '00'

    this.minute = document.createElement('span')
    this.minute.textContent = '00'

    this.second = document.createElement('span')
    this.second.textContent = '00'

    const seperator = document.createElemet('span')
    seperator.textContent = ":"

    this.element.appendChild(hour)
    this.element.appendChild(seperator)

  }

  setTime() {
    this.totalSeconds++
    this.second.textContent = pad(totalSeconds % 60)
    this.minute.textContent = pad(Math.floor(totalSeconds / 60))
  }

  pad (val) {
    const str = val.toString()

    if(str.length < 2) return '0' + str;
    else return str
  }
}