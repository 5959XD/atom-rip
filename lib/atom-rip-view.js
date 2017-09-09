'use babel'

const path = require('path')
const root = path.resolve(__dirname, '..')
const modules = path.resolve(root, 'node_modules')

const audio = new Audio(path.resolve(root, 'assets', 'test.mp3'))
const fontPath = path.resolve(modules, 'typeface-nanum-square', 'nanumsquare.css')

export default class AtomRipView {

  constructor(serializedState) {

    this.Action_Youtube = 'youtube'
    this.Action_Music = 'music'

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



    // Button Line
    this.btnDiv = document.createElement('div')
    this.btnDiv.classList.add('btnDiv')

    // Play Youtube
    const youtubeBtn = this.createBtn(this.Action_Youtube)
    this.btnDiv.appendChild(youtubeBtn)

    // Play Music
    const musicBtn = this.createBtn(this.Action_Music)
    this.btnDiv.appendChild(musicBtn)
    this.element.appendChild(this.btnDiv)

    document.getElementsByTagName('body')[0].appendChild(this.element)
  }




  buttonAction(action_name) { // 버튼에 액션을 처리하는 함수

    if (action_name === this.Action_Youtube) {
        console.log('Youtube Button Click')
    } else if (action_name == this.Action_Music) {
        console.log('Music Button click')
    }

  }

  createBtn(btnAction) { // Create Button

    var btnName;

    console.log('btnAction ' + btnAction + " const action " + this.Action_Youtube)

    const btn = document.createElement('button')
    btn.classList.add('btnStyle')

    if( btnAction == this.Action_Youtube ) {
      btnName = 'Play Youtube'
    } else if ( btnAction == this.Action_Music ) {
      btnName = 'Play Music'
    }

    btn.textContent = btnName
    btn.addEventListener('click', this.buttonAction.bind(this,btnAction))

    return btn;

  }

  setVideo(url) {

    // 호출할 동영상 태그 사용법
    // const iframe = this.setVideo('http://www.youtube.com/embed/CbTvcda__ns')
    // this.element.appendChild(iframe)

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
