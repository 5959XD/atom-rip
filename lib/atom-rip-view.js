'use babel'

const path = require('path')
const root = path.resolve(__dirname, '..')
const modules = path.resolve(root, 'node_modules')

const audio = new Audio(path.resolve(root, 'assets', 'super_relaxed.mp3'))
const fontPath = path.resolve(modules, 'typeface-nanum-square', 'nanumsquare.css')

export default class AtomRipView {
  constructor(serializedState) {
    this.hidden = true

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

    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  destroy() {
    this.stopBGM()
    this.getElement().remove()
  }

  serialize () {}

  getElement() {
    return this.element
  }

  show () {
    this.playBGM()

    this.hidden = false
    this.getElement().classList.remove('hidden')
  }

  hide () {
    this.stopBGM()

    this.hidden = true
    this.getElement().classList.add('hidden')
  }

  toggle () {
    this.hidden ? this.show() : this.hide()
  }

  playBGM () {
    audio.play()
  }

  stopBGM () {
    if (audio.played.length > 0) audio.pause()
  }
}
