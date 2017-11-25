import { element, elements } from './utils';
import { 
    transitionIdleToSay,
    transitionSayToIdle,
    sayToTransitionIdle,
    transitionIdleToPress,
    transitionPressToIdle,
    pressToTransitionIdle,
} from './animate';

class Game {
    constructor() {
        this.cats = ['green', 'red', 'blue', 'yellow'];

        this.sequence = [Math.floor(Math.random() * 4)];
        this.stack = [];
        this.turn = [];

        this.hardcore = false;

        this.press = this.press.bind(this);

        this.start();
    }

    playSequence(stack) {
        if (stack.length) {
            setTimeout(() => this.mew(stack.shift()), 2000);
        }
    }

    start () {
        this.stack = [...this.sequence];

        this.playSequence(this.stack);
    }

    mew (catIndex) {
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';
        
        element(cat).classList.remove('idle');
        element(cat).classList.add('idle-to-say');

        let catSound = new Audio('/assets/sounds/' + catIndex + '.mp3');
        catSound.play();

        transitionIdleToSay(cat)
        .then(() => sayToTransitionIdle(cat))
        .then(() => transitionSayToIdle(cat));

        if (this.stack.length) {
            this.playSequence(this.stack);
        } else {
            setTimeout(() => this.initPressListener(), 2000);
        }
    }

    press (e) {
        this.clearPressListener();
        const catIndex = parseInt(e.currentTarget.dataset.index);
        
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';

        element(cat).classList.remove('idle');
        element(cat).classList.add('idle-to-press');
        

        let simonSound = new Audio('/assets/sounds/simonSound' + (parseInt(catIndex) + 1) + '.mp3');
        
        setTimeout(() => simonSound.play(), 1000);
        
        if (this.sequence[this.turn.length] === catIndex) {
            this.turn.push(catIndex);

            if (this.turn.length === this.sequence.length) {

                if (this.sequence.length === 20) {
                    console.log("WOOOOON");
                } else {
                    this.addToSequence();
                    this.turn = [];

                    setTimeout(() => {
                        this.stack = [...this.sequence];
                        this.playSequence(this.stack);
                    }, 3000);
                }
            } else {
                setTimeout(() => this.initPressListener(), 2000);
            }
        } else {
            if (this.hardcore) {
                this.gameOver();
            } else {
                setTimeout(() => {
                    this.stack = [...this.sequence];
                    this.playSequence(this.stack);
                }, 2000);
            }
        }

        transitionIdleToPress(cat)
        .then(() => pressToTransitionIdle(cat))
        .then(() => transitionPressToIdle(cat));
    }

    addToSequence () {
        let cat = Math.floor(Math.random() * 4);

        while (cat === this.sequence.peek()) {
            cat = Math.floor(Math.random() * 4);
        }

        this.sequence.push(cat);
    }

    gameOver  () {

    }

    initPressListener() {
        elements('.cat').map(element => {
            element.addEventListener( 'click', this.press)
        });
    }

    clearPressListener () {
        elements('.cat').map(element => {
            element.removeEventListener('click', this.press);
        });
    }
}

export default Game;