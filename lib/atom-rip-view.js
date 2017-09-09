'use babel'

const path = require('path')
const audio = new Audio(path.resolve(__dirname, 'test.mp3'))
const modules = path.resolve(__dirname, '..', 'node_modules')
const fontPath = path.resolve(modules, 'typeface-nanum-square', 'nanumsquare.css')

export default class AtomRipView {
  constructor(serializedState) {
    this.hidden = true

    this.element = document.createElement('div')
    this.element.classList.add('atom-rip', 'hidden')

    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', fontPath)
    this.element.appendChild(link)

    const title = document.createElement('h1')
    title.textContent = '잠시 휴식을 가지세요'

    const subtitle = document.createElement('h2')
    subtitle.textContent = '과도한 코딩은 일상생활에 지장을 줄 수 있습니다.'

    this.element.appendChild(title)
    this.element.appendChild(subtitle)
    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  setVideo(url) {
    const iframe = document.createElement('iframe')
    iframe.classList.add('videoStyle')
    iframe.setAttribute('src', url)
    return iframe
  }

  show () {
    this.playBGM()

    this.hidden = false
    this.element.classList.remove('hidden')
  }

  hide () {
    this.stopBGM()

    this.hidden = true
    this.element.classList.add('hidden')
  }

  toggle () {
    this.hidden ? this.show() : this.hide()
  }

  serialize () {}

  destroy() {
    this.element.remove()
  }

  getElement() {
    return this.element
  }

  playBGM () {
    audio.play()
  }

  stopBGM () {
    if(audio.played.length > 0) {
      audio.pause()
    }

    if (audio.played.length > 0) audio.pause()
  }
}
