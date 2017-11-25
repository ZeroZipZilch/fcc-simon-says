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

        this.audio = true;
        this.hardcore = false;

        this.press = this.press.bind(this);

        this.initStartGameListener();
        this.initRetryListener();
        this.initReplayListener();

        this.initAudioToggle();
        this.initHardcoreToggle();
        this.initRestartListener();
    }

    playSequence(stack) {
        if (stack.length) {
            setTimeout(() => this.mew(stack.shift()), 1000);
        }
    }

    initStartGameListener () {
        element('.start-game-btn').addEventListener('click', () => {
            element('.modal.start-game').classList.add('hidden');
            this.start();
        });
    }

    initRetryListener () {
        element('.retry-btn').addEventListener('click', () => {
            element('.modal.game-over').classList.add('hidden');
            this.start();
        });
    }

    initReplayListener () {
        element('.replay-btn').addEventListener('click', () => {
            element('.modal.winner').classList.add('hidden');
            this.start();
        });
    }

    start () {
        this.sequence = [];
        this.stack = [];
        this.turn = [];

        this.addToSequence();
        this.stack = [...this.sequence];

        this.playSequence(this.stack);
    }

    initRestartListener () {
        element('.restart').addEventListener('click', () => {
            this.restart();
        });
    }

    initAudioToggle () {
        element('.audio').addEventListener('click', e => {
            this.audio = !this.audio;
            elements('.audio').map(element => element.classList.toggle('no-audio'))
        });
    }

    initHardcoreToggle () {
        element('.guillotine-btn').addEventListener('click', (e) => {
            element('.guillotine').classList.add('on-top');
            const classList = e.currentTarget.classList;
            
            this.restart();
            
            if (classList.contains('dropped')) {
                this.hardcore = false;
                classList.add('lifted');
                classList.remove('droppped');
                
                Promise.resolve(
                    setTimeout(() => {
                        classList.remove('lifted');
                        classList.remove('dropped');
                    }, 500)
                );
            } else {
                this.hardcore = true;
                classList.add('dropped');
            }
            
            setTimeout(() => element('.guillotine').classList.remove('on-top'), 1500);
        })
    }

    mew (catIndex) {
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';
        
        console.log(catIndex, cat);
        element(cat).classList.remove('idle');
        element(cat).classList.add('idle-to-say');

        if (this.audio) {
            let catSound = new Audio('/assets/sounds/' + catIndex + '.mp3');
            catSound.play();
        }

        transitionIdleToSay(cat)
        .then(() => sayToTransitionIdle(cat))
        .then(() => transitionSayToIdle(cat));

        if (this.stack.length) {
            this.playSequence(this.stack);
        } else {
            setTimeout(() => this.initPressListener(), 500);
        }
    }

    press (e) {
        this.clearPressListener();
        const catIndex = parseInt(e.currentTarget.dataset.index);
        
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';

        element(cat).classList.remove('idle');
        element(cat).classList.add('idle-to-press');
        
        if (this.audio) {
            let simonSound = new Audio('/assets/sounds/simonSound' + (parseInt(catIndex) + 1) + '.mp3');
            setTimeout(() => simonSound.play(), 500);
        }
        
        if (this.sequence[this.turn.length] === catIndex) {
            this.turn.push(catIndex);

            if (this.turn.length === this.sequence.length) {

                if (this.sequence.length === 20) {
                    element('.winner').classList.remove('hidden');
                } else {
                    this.addToSequence();
                    this.turn = [];

                    setTimeout(() => {
                        this.stack = [...this.sequence];
                        this.playSequence(this.stack);
                    }, 1500);
                }
            } else {
                setTimeout(() => this.initPressListener(), 500);
            }
        } else {
            if (this.hardcore) {
                this.gameOver();
            } else {
                setTimeout(() => {
                    this.turn = [];
                    this.stack = [...this.sequence];
                    this.playSequence(this.stack);
                }, 1000);
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
        element('.score').innerHTML = this.sequence.length;
    }

    restart () {
        this.audio = false;
        element('.restarting').classList.remove('hidden');
        this.start();
        setTimeout(() => {
            element('.restarting').classList.add('hidden');
            this.audio = true;
        }, 1500);
    }

    gameOver () {
        this.sequence = [];
        element('.game-over').classList.remove('hidden');
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