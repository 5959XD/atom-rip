
export default class AtomRipTimerView {
  constructor(serializedState) {
    this.element = document.createElement('label')
    this.element.classList.add('timer')

    var hour = document.createElement('span')
    hour.textContent = '00'

    var minute = document.createElement('span')
    minute.textContent = '00'

    var second = document.createElement('span')
    second.textContent = '00'

    const seperator = document.createElemet('span')
    seperator.textContent = ":"

    this.element.appendChild(hour)
    this.element.appendChild(seperator)

  }

  function setTime() {
           ++totalSeconds;
           secondsLabel.innerHTML = pad(totalSeconds%60);
           minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
       }

       function pad(val)
       {
           var valString = val + "";
           if(valString.length < 2)
           {
               return "0" + valString;
           }
           else
           {
               return valString;
           }
       }
}
