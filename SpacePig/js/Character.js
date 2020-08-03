function Character(mousePos) {
    let xPos = mousePos.x
    newElem = document.createElement('div');
    newElem.classList.add('character');
    newElem.innerHTML = `
                <div class="character-face pig-body">
                    <div class="character-face pig-body-front"></div>
                    <div class="character-face pig-body-back"></div>
                </div>
                <div class="character-face pig-tail"></div>
                <div class="character-face pig-arm-left"></div>
                <div class="character-face pig-arm-right"></div>
                <div class="character-face pig-leg-left"></div>
                <div class="character-face pig-leg-right"></div>`
    newElem.style.left = xPos * 100 + '%';
    document.querySelector('.stage').appendChild(newElem);
    this.init(xPos);

}


Character.prototype = {
    constructor: Character,
    init: function(xPos) {
        let nowScroll = 0;
        let swimState = false;
        let leftValue = xPos * 100
        const self = this;



        function swimKeydownHandler(e) {
            if (swimState) clearTimeout(swimState);
            if (e.keyCode == 37) {
                this.newElem.setAttribute('data-direction', 'left');
                this.newElem.classList.add('swim');
                swimState = false;
                this.newElem.style.left = leftValue + '%';
                leftValue -= 1;

                if (leftValue < 5) {
                    leftValue = 5;
                }
            } else if (e.keyCode == 39) {
                this.newElem.setAttribute('data-direction', 'right');
                this.newElem.classList.add('swim');
                this.newElem.style.left = 20 + '%';
                swimState = false;
                this.newElem.style.left = leftValue + '%';
                leftValue += 1;
                if (leftValue > 85) {
                    leftValue = 85;
                }
            }
            swimState = setTimeout(function() {
                this.newElem.classList.remove('swim');
            }, 500);
            requestAnimationFrame(function() {

            })
        }

        function swimScrollHandler(e) {
            if (swimState) {
                clearTimeout(swimState);
                this.newElem.removeAttribute('data-direction');
            }

            if (nowScroll < pageYOffset) {
                this.newElem.setAttribute('data-direction', 'forward');
                this.newElem.classList.add('swim');
                swimState = false;
                nowScroll = pageYOffset;
            } else if (nowScroll > pageYOffset) {
                this.newElem.setAttribute('data-direction', 'backward');
                this.newElem.classList.add('swim');
                swimState = false;
                nowScroll = pageYOffset;
            }

            swimState = setTimeout(function() {
                this.newElem.classList.remove('swim');
            }, 500);
        }
        window.addEventListener('keydown', swimKeydownHandler);
        window.addEventListener('scroll', swimScrollHandler);
    }
}