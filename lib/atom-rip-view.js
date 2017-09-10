'use babel'

import path from 'path'
import AtomRipTimerView from './atom-rip-timer-view'

const root = path.resolve(__dirname, '..')
const assets = path.resolve(root, 'assets')
const modules = path.resolve(root, 'node_modules')

const audio = new Audio(path.resolve(assets, 'super_relaxed.mp3'))
const narration = new Audio(path.resolve(assets, 'narration.mp3'))

audio.volume = 0.5
audio.addEventListener('ended', () => {
  audio.pause()
  audio.currentTime = 0
  audio.play()
})

const fontPath = path.resolve(modules, 'typeface-nanum-square', 'nanumsquare.css')

export default class AtomRipView {
  constructor () {
    this.hidden = true
    atom.config.observe('atom-rip.restTime', time => this.TIME = time)

    this.timeLeft = this.TIME
    this.timeView = new AtomRipTimerView(this.timeLeft)

    this.element = document.createElement('div')
    this.element.classList.add('atom-rip', 'hidden')

    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', fontPath)

    const title = document.createElement('h1')
    title.id = 'mainTitle'
    title.textContent = '잠시 휴식을 가지세요'

    const subtitle = document.createElement('h2')
    subtitle.id = 'subTitle'
    subtitle.textContent = '과도한 코딩은 일상생활에 지장을 줄 수 있습니다.'

    this.element.appendChild(link)
    this.element.appendChild(title)
    this.element.appendChild(subtitle)
    this.element.appendChild(this.timeView.getElement())

    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  destroy() {
    this.stopBGM()

    this.timeView.destroy()
    this.getElement().remove()
  }

  serialize () {}

  getElement() {
    return this.element
  }

  isVisible () {
    return !this.hidden
  }

  show () {
    audio.play()
    narration.play()
    this.update(this.timeLeft)

    this.hidden = false
    this.getElement().classList.remove('hidden')

    this.timer = setInterval(() => {
      this.update(this.timeLeft)
      console.log('RIP', this.timeLeft--)

      if (this.timeLeft < 0) {
        this.hide()
        clearInterval(this.timer)
        this.timeLeft = this.TIME
      }
    }, 1000)
  }

  hide () {
    audio.pause()
    narration.pause()

    this.hidden = true
    this.getElement().classList.add('hidden')
  }

  toggle () {
    this.hidden ? this.show() : this.hide()
  }

  update (time) {
    this.timeView.update(time)
  }
}
