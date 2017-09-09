'use babel';

export default class AtomRipView {

  constructor(serializedState) {
    // Create root elemento
    this.element = document.createElement('div') // div 만들고
    this.element.classList.add('atom-rip') // class atom-rip 추가

    // const message = document.createElement('div')
    // message.textContent = 'The AtomRip package is Alive! It\'s ALIVE!'
    // message.classList.add('message')
    // this.element.appendChild(message)
    // document.getElementsByTagName('body')[0].appendChild(this.element)

    const = document.createElement('div')
    const.classList.add('moviePlayer')

    const movieVideo = document.createElement('video') // video elment 가져옴
    const movieSource = document.createElement('source') // video  source
    movieSource.setAttribute('src', 'https://www.youtube.com/watch?v=CbTvcda__ns') // 속성 셋
    movieVideo.appendChild(movieSource)

    this.element.appendChild(movieVideo);

    document.getElementsByTagName('body')[0].appendChild(this.element)

  }

  toggle () {
    this.hidden = !this.hidden
    this.element.classList[this.hidden ? 'remove' : 'add']('hidden')
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
