'use babel'

import path from 'path'
import AtomRipTimerView from './atom-rip-timer-view'

const root = path.resolve(__dirname, '..')
const assets = path.resolve(root, 'assets')
const modules = path.resolve(root, 'node_modules')
const fonts = path.resolve(modules, 'typeface-nanum-square', 'nanumsquare.css')

export default class AtomRipView {
  constructor () {
    this.hidden = true
    this.restTime = atom.config.get('atom-rip.restTime')
    this.timerView = new AtomRipTimerView(this.time = this.restTime)

    this.initAudio()
    this.initElement()
  }

  initAudio () {
    this.music = new Audio(path.resolve(assets, 'super_relaxed.mp3'))
    this.music.addEventListener('ended', () => {
      this.music.pause()
      this.music.currentTime = 0
      this.music.play()
    })

    if (atom.config.get('atom-rip.muteNarration')) return

    this.music.volume = 0.5
    this.narration = new Audio(path.resolve(assets, 'narration.mp3'))
  }

  initElement () {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', fonts)

    const title = document.createElement('h1')
    title.id = 'atomRipTitle'
    title.textContent = '잠시 휴식을 가지세요'

    const subtitle = document.createElement('h2')
    subtitle.id = 'atomRipSubtitle'
    subtitle.textContent = '과도한 코딩은 일상생활에 지장을 줄 수 있습니다.'

    this.element = document.createElement('div')
    this.element.classList.add('atom-rip', 'hidden')

    this.element.appendChild(link)
    this.element.appendChild(title)
    this.element.appendChild(subtitle)
    this.element.appendChild(this.timerView.getElement())

    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  destroy() {
    if (this.music) {
      this.music.pause()
      this.music = null
    }

    if (this.narration) {
      this.narration.pause()
      this.narration = null
    }

    this.timerView.destroy()
    this.getElement().remove()
  }

  getElement() {
    return this.element
  }

  start () {
    this.hidden = false
    this.getElement().classList.remove('hidden')

    if (this.music) this.music.play()
    if (this.narration) this.narration.play()

    const start = performance.now()
    const timer = setInterval(() => {
      const time = this.restTime - (performance.now() - start) / 1000
      if (time > 0) return this.timerView.update(time.toFixed(1))

      clearInterval(timer)
      if (this.music) this.music.pause()
      if (this.narration) this.narration.pause()

      this.hidden = true
      this.getElement().classList.add('hidden')
    }, 5)
  }
}
