'use babel'

import path from 'path'
import { CompositeDisposable } from 'atom'
import AtomRipTimerView from './atom-rip-timer-view'

export default class AtomRipView {
  constructor () {
    this.subscription = new CompositeDisposable()
    this.subscribe('restTime')
    this.subscribe('muteNarration')

    this.hidden = true
    this.timerView = new AtomRipTimerView(this.time = this.restTime)

    this.initAudio()
    this.initElement()
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
    this.subscription.dispose()
  }

  getElement() {
    return this.element
  }

  subscribe (key, callback) {
    const config = `atom-rip.${key}`
    this[key] = atom.config.get(config)

    this.subscription.add(atom.config.observe(config, value => {
      this[key] = value
      if (callback) callback(value)
    }))
  }

  initAudio () {
    const assets = path.resolve(__dirname, '..', 'assets')

    this.music = new Audio(path.resolve(assets, 'super_relaxed.mp3'))
    this.music.addEventListener('ended', () => {
      this.music.pause()
      this.music.currentTime = 0
      this.music.play()
    })

    this.narration = new Audio(path.resolve(assets, 'narration.mp3'))
  }

  initElement () {
    const title = document.createElement('h1')
    title.id = 'AtomRipTitle'
    title.textContent = '잠시 휴식을 가지세요'

    const subtitle = document.createElement('h2')
    subtitle.id = 'AtomRipSubtitle'
    subtitle.textContent = '과도한 코딩은 일상생활에 지장을 줄 수 있습니다.'

    this.element = document.createElement('div')
    this.element.classList.add('atom-rip', 'hidden')
    this.subscribe('customFont', font => this.element.style.fontFamily = font)

    this.element.appendChild(title)
    this.element.appendChild(subtitle)
    this.element.appendChild(this.timerView.getElement())

    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  start () {
    this.hidden = false
    this.getElement().classList.remove('hidden')

    this.begin = performance.now()
    this.timer = setInterval(this.tick.bind(this), 5)

    if (this.music) {
      this.music.play()
      this.music.volume = this.muteNarration ? 1 : 0.5
    }

    if (this.narration && !this.muteNarration) {
      this.narration.currentTime = 0
      this.narration.play()
    }
  }

  tick () {
    const elapsed = (performance.now() - this.begin) / 1000
    if (elapsed < this.restTime) return this.timerView.update(this.restTime - elapsed)

    clearInterval(this.timer)
    if (this.music) this.music.pause()
    if (this.narration) this.narration.pause()

    this.hidden = true
    this.getElement().classList.add('hidden')
  }
}
