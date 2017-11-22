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
        this.stack = [...this.sequence];

        this.start();
    }

    start () {
        //this.mew(this.stack.peek());
        this.initPressListener();
    }

    mew (catIndex) {
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';
        console.log(catIndex, element(cat));
        element(cat).classList.remove('idle');
        element(cat).classList.add('idle-to-say');

        let catSound = new Audio('/assets/sounds/' + catIndex + '.mp3');
        catSound.play();

        transitionIdleToSay(cat)
        .then(() => sayToTransitionIdle(cat))
        .then(() => transitionSayToIdle(cat));
    }

    press (catIndex) {
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';
        
        element(cat).classList.remove('idle');
        element(cat).classList.add('idle-to-press');

        let catSound = new Audio('/assets/sounds/simonSound' + (parseInt(catIndex) + 1) + '.mp3');
        
        setTimeout(() => catSound.play(), 1000);

        transitionIdleToPress(cat)
        .then(() => pressToTransitionIdle(cat))
        .then(() => transitionPressToIdle(cat));
    }

    initPressListener() {
        elements('.cat').map(element => {
            element.addEventListener('click', event => {
                this.press(element.dataset.index);
            });
        });
    }
}

export default Game;