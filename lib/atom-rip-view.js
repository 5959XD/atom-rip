'use babel'

import path from 'path'
import AtomRipTimerView from './atom-rip-timer-view'

const root = path.resolve(__dirname, '..')
const modules = path.resolve(root, 'node_modules')

const audio = new Audio(path.resolve(root, 'assets', 'super_relaxed.mp3'))

audio.addEventListener('ended',function(){
  this.currentTime=0;
  this.play();
},false);

const fontPath = path.resolve(modules, 'typeface-nanum-square', 'nanumsquare.css')

export default class AtomRipView {
  constructor () {
    this.hidden = true
    this.REST_TIME = atom.config.get('atom-rip.restTime')

    this.timeLeft = this.REST_TIME
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
    this.playBGM()

    this.hidden = false
    this.getElement().classList.remove('hidden')

    this.timer = setInterval(() => {
      console.log('RIP', this.timeLeft--)
      this.timeView.update(this.timeLeft)

      if (this.timeLeft <= 0) {
        this.hide()
        clearInterval(this.timer)
        this.timeLeft = this.REST_TIME
      }
    }, 1000)
  }

  hide () {
    this.stopBGM()

    this.hidden = true
    this.getElement().classList.add('hidden')
  }

  toggle () {
    this.hidden ? this.show() : this.hide()
  }

  update (time) {
    this.timer.update(time)
  }

  playBGM () {
    audio.play()
  }

  stopBGM () {
    if (audio.played.length > 0) audio.pause()
  }
}
