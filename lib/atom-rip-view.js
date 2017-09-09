'use babel'

export default class AtomRipView {

  constructor(serializedState) {

    this.hidden = true

    this.element = document.createElement('div')
    this.element.classList.add('atom-rip', 'hidden')

    const message = document.createElement('div')
    message.classList.add('message')

    const title = document.createElement('h1')
    title.textContent = '잠시 휴식을 가지세요'

    const subtitle = document.createElement('h2')
    subtitle.textContent = '과도한 코딩은 일상생활에 지장을 줄 수 있습니다.'

    message.appendChild(title)
    message.appendChild(subtitle)

    this.element.appendChild(message)

    // const video = document.createElement('video')
    // video.classList.add('videoStyle')
    // const videoSource = document.createElement('source')
    // videoSource.setAttribute('src', 'https://www.youtube.com/watch?v=CbTvcda__ns')
    // video.appendChild(videoSource)
    // this.element.appendChild(video)

    // const iframe = document.createElement('iframe')
    // iframe.classList.add('videoStyle')
    // iframe.setAttribute('src', 'http://www.youtube.com/embed/CbTvcda__ns')

    const iframe = this.setVideo('http://www.youtube.com/embed/CbTvcda__ns');
    this.element.appendChild(iframe)
    document.getElementsByTagName('body')[0].appendChild(this.element)
  }

  setVideo(url) {
    const iframe = document.createElement('iframe')
    iframe.classList.add('videoStyle')
    iframe.setAttribute('src', url)
    return iframe;
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
