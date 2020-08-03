function Space() {
    this.spaceElem = document.createElement('div');
    this.spaceElem.classList.add('space');
    this.spaceElem.innerHTML = `
                    <div class="stage">
                    <div class="house">
                        <section class="wall wall-side-left"></section>
                        <section class="wall wall-side-right"></section>
                        <section class="wall wall-side-top"></section>
                        <section class="wall wall-side-bottom"></section>
                        <section class="wall wall-front wall-front-a"></section>
                        <section class="wall wall-front wall-front-b"></section>
                        <section class="wall wall-front wall-front-c"></section>
                        <section class="wall wall-front wall-front-d"></section>
                        <section class="wall wall-front wall-front-e"></section>
                        <section class="wall wall-front wall-front-f"></section>
                        <section class="wall wall-front wall-front-g"></section>
                        <section class="wall wall-front wall-front-h"></section>
                        <section class="wall wall-front wall-front-i"></section>
                        <section class="wall wall-front wall-front-j"></section>
                        <section class="wall wall-front wall-front-k"></section>
                        <section class="wall wall-front wall-front-l"></section>
                        <section class="wall wall-front wall-front-m"></section>
                        <section class="wall wall-front wall-front-n"></section>
                        <section class="wall wall-crown"></section>
                        <section class="wall wall-back"></section>

                    </div>
                    <!-- Character Stage -->
                </div>`
    document.body.appendChild(this.spaceElem);
}