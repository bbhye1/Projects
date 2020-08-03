function Character(info) {
    this.newElem = document.createElement('div');
    this.newElem.classList.add('character');
    this.newElem.style.left = info.x * 100 + '%';
    this.newElem.innerHTML = `
                <div class="character-face pig-body">
                    <div class="character-face pig-body-front"></div>
                    <div class="character-face pig-body-back"></div>
                </div>
                <div class="character-face pig-tail"></div>
                <div class="character-face pig-arm-left"></div>
                <div class="character-face pig-arm-right"></div>
                <div class="character-face pig-leg-left"></div>
                <div class="character-face pig-leg-right"></div>`

    document.querySelector('.stage').appendChild(this.newElem);
    this.nowScroll = 0;
    this.scrollState = false;
    this.swimState = false;
    this.xPos = info.x * 100;
    this.speed = info.speed;
    this.rafId;
    this.init();
}

Character.prototype = {
    constructor: Character,
    init: function() {

        const self = this;

        function swimKeydownHandler(e) {
            if (self.swimState) { return; };
            if (e.keyCode == 37) {
                self.direction = 'left';
                self.newElem.setAttribute('data-direction', 'left');
                self.newElem.classList.add('swim');
                self.run(self);
                self.swimState = true;
            } else if (e.keyCode == 39) {
                self.direction = 'right';
                self.newElem.setAttribute('data-direction', 'right');
                self.newElem.classList.add('swim');
                self.run(self);
                self.swimState = true;
            }
        }

        function swimKeyupHandler(e) {
            self.newElem.removeAttribute('data-direction');
            self.newElem.classList.remove('swim');
            cancelAnimationFrame(self.rafId);
            self.swimState = 0;
        }

        function swimScrollHandler() {
            clearTimeout(self.scrollState);

            if (!self.scrollState) {
                self.newElem.classList.add('swim');
            }
            self.scrollState = setTimeout(function() {
                self.scrollState = false;
                self.newElem.classList.remove('swim');
                self.newElem.removeAttribute('data-direction');
            }, 500);

            if (self.nowScroll < pageYOffset) {
                self.newElem.setAttribute('data-direction', 'forward');
            } else if (self.nowScroll > pageYOffset) {
                self.newElem.setAttribute('data-direction', 'backward');
            }
            self.nowScroll = pageYOffset;
        };
        window.addEventListener('keyup', swimKeyupHandler);
        window.addEventListener('keydown', swimKeydownHandler);
        window.addEventListener('scroll', swimScrollHandler);
    },
    run: function(self) {
        if (self.direction == 'left') {
            self.xPos -= self.speed;
        } else if (self.direction == 'right') {
            self.xPos += self.speed;
        }

        if (self.xPos < 2) {
            self.xPos = 2;
        } else if (self.xPos > 88) {
            self.xPos = 88;
        }
        self.newElem.style.left = self.xPos + '%';
        self.rafId = requestAnimationFrame(function() { self.run(self) });
    }
}