'use babel'

export default class AtomRipView {

  constructor(serializedState) {
//     this.element = document.createElement('div') // div 만들고
//     this.element.classList.add('atom-rip') // class atom-rip 추가
//
//     // const message = document.createElement('div')
//     // message.textContent = 'The AtomRip package is Alive! It\'s ALIVE!'
//     // message.classList.add('message')
//     // this.element.appendChild(message)
//     // document.getElementsByTagName('body')[0].appendChild(this.element)
//
//     const = document.createElement('div')
//     const.classList.add('moviePlayer')
//
//     const movieVideo = document.createElement('video') // video elment 가져옴
//     const movieSource = document.createElement('source') // video  source
//     movieSource.setAttribute('src', 'https://www.youtube.com/watch?v=CbTvcda__ns') // 속성 셋
//     movieVideo.appendChild(movieSource)
//
//     this.element.appendChild(movieVideo);
    this.hidden = true

    this.element = document.createElement('div')
    this.element.classList.add('atom-rip', 'hidden')

    const title = document.createElement('h1')
    title.textContent = '잠시 휴식을 가지세요'

    const subtitle = document.createElement('h2')
    subtitle.textContent = '과도한 코딩은 일상생활에 지장을 줄 수 있습니다.'

    this.element.appendChild(title)
    this.element.appendChild(subtitle)
    document.getElementsByTagName('body')[0].appendChild(this.element)

  }

  toggle () {
    this.element.classList[this.hidden ? 'remove' : 'add']('hidden')
    this.hidden = !this.hidden
  }

  // Returns an object that can be retrieved when package is activated
  serialize () {}

  // Tear down any state and detach
  destroy () {
    this.element.remove()
  }

  getElement () {
    return this.element
  }

  playBGM (filePath) {
    var audio = new Audio(filePath)
    audio.play()
  }
}
