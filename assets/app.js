"use strict";
const element = (selector) => {
    return document.querySelector(selector);
};
const elements = (selector) => {
    return [...document.querySelectorAll(selector)];
};
/// <reference path="./utils.ts" />
/**
 * Say animations
 */
const transitionIdleToSay = (cat) => {
    var _a, _b;
    (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('idle');
    (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('idle-to-say');
    return new Promise((res, rej) => {
        setTimeout(() => {
            var _a, _b;
            (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('idle-to-say');
            (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('say');
            res();
        }, 500);
    });
};
const sayToTransitionIdle = (cat) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            var _a, _b;
            (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('say');
            (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('say-to-idle');
            res();
        }, 1000);
    });
};
const transitionSayToIdle = (cat) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            var _a, _b;
            (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('say-to-idle');
            (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('idle');
            res();
        }, 500);
    });
};
/**
 * Press animations
 */
const transitionIdleToPress = (cat) => {
    var _a, _b;
    (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('idle');
    (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('idle-to-press');
    return new Promise((res, rej) => {
        setTimeout(() => {
            var _a, _b;
            (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('idle-to-press');
            (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('press');
            res();
        }, 500);
    });
};
const pressToTransitionIdle = (cat) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            var _a, _b;
            (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('press');
            (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('press-to-idle');
            res();
        }, 1000);
    });
};
const transitionPressToIdle = (cat) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            var _a, _b;
            (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('press-to-idle');
            (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('idle');
            res();
        }, 500);
    });
};
/// <reference path="./utils.ts" />
/// <reference path="./animate.ts" />
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
            setTimeout(() => this.mew(stack.shift()), 1500);
        }
    }
    initStartGameListener() {
        var _a;
        (_a = element('.start-game-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            var _a;
            (_a = element('.modal.start-game')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            this.start();
        });
    }
    initRetryListener() {
        var _a;
        (_a = element('.retry-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            var _a;
            (_a = element('.modal.game-over')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            this.start();
        });
    }
    initReplayListener() {
        var _a;
        (_a = element('.replay-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            var _a;
            (_a = element('.modal.winner')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            this.start();
        });
    }
    start() {
        this.sequence = [];
        this.stack = [];
        this.turn = [];
        this.addToSequence();
        this.stack = [...this.sequence];
        setTimeout(() => this.playSequence(this.stack), 1000);
    }
    initRestartListener() {
        var _a;
        (_a = element('.restart')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.restart();
        });
    }
    initAudioToggle() {
        var _a;
        (_a = elements('.audio')) === null || _a === void 0 ? void 0 : _a.map(audioElement => {
            audioElement.addEventListener('click', () => {
                var _a;
                this.audio = !this.audio;
                (_a = elements('.audio')) === null || _a === void 0 ? void 0 : _a.map(element => element.classList.toggle('no-audio'));
            });
        });
    }
    initHardcoreToggle() {
        var _a;
        (_a = element('.guillotine-btn')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', (e) => {
            var _a;
            (_a = element('.guillotine')) === null || _a === void 0 ? void 0 : _a.classList.add('on-top');
            const target = e.currentTarget;
            const classList = target.classList;
            this.restart();
            if (classList.contains('dropped')) {
                this.hardcore = false;
                classList.add('lifted');
                classList.remove('droppped');
                Promise.resolve(setTimeout(() => {
                    classList.remove('lifted');
                    classList.remove('dropped');
                }, 500));
            }
            else {
                this.hardcore = true;
                classList.add('dropped');
            }
            setTimeout(() => { var _a; return (_a = element('.guillotine')) === null || _a === void 0 ? void 0 : _a.classList.remove('on-top'); }, 1500);
        });
    }
    mew(catIndex) {
        var _a, _b;
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';
        (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('idle');
        (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('idle-to-say');
        if (this.audio) {
            let catSound = new Audio('/assets/sounds/' + catIndex + '.mp3');
            catSound.play();
        }
        transitionIdleToSay(cat)
            .then(() => sayToTransitionIdle(cat))
            .then(() => transitionSayToIdle(cat));
        if (this.stack.length) {
            this.playSequence(this.stack);
        }
        else {
            setTimeout(() => this.initPressListener(), 500);
        }
    }
    press(e) {
        var _a, _b, _c;
        this.clearPressListener();
        const target = e.currentTarget;
        const catIndex = parseInt(target.dataset.index);
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';
        (_a = element(cat)) === null || _a === void 0 ? void 0 : _a.classList.remove('idle');
        (_b = element(cat)) === null || _b === void 0 ? void 0 : _b.classList.add('idle-to-press');
        if (this.audio) {
            let simonSound = new Audio('/assets/sounds/simonSound' + (catIndex + 1) + '.mp3');
            setTimeout(() => simonSound.play(), 500);
        }
        if (this.sequence[this.turn.length] === catIndex) {
            this.turn.push(catIndex);
            if (this.turn.length === this.sequence.length) {
                if (this.sequence.length === 20) {
                    (_c = element('.winner')) === null || _c === void 0 ? void 0 : _c.classList.remove('hidden');
                }
                else {
                    this.addToSequence();
                    this.turn = [];
                    setTimeout(() => {
                        this.stack = [...this.sequence];
                        this.playSequence(this.stack);
                    }, 1500);
                }
            }
            else {
                setTimeout(() => this.initPressListener(), 500);
            }
        }
        else {
            if (this.hardcore) {
                this.gameOver();
            }
            else {
                setTimeout(() => {
                    this.turn = [];
                    this.stack = [...this.sequence];
                    this.playSequence(this.stack);
                }, 1500);
            }
        }
        transitionIdleToPress(cat)
            .then(() => pressToTransitionIdle(cat))
            .then(() => transitionPressToIdle(cat));
    }
    addToSequence() {
        let cat = Math.floor(Math.random() * 4);
        while (cat === this.sequence[this.sequence.length - 1]) {
            cat = Math.floor(Math.random() * 4);
        }
        this.sequence.push(cat);
        element('.score').innerHTML = this.sequence.length + "";
    }
    restart() {
        var _a;
        this.audio = false;
        (_a = element('.restarting')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
        this.start();
        setTimeout(() => {
            var _a;
            (_a = element('.restarting')) === null || _a === void 0 ? void 0 : _a.classList.add('hidden');
            this.audio = true;
        }, 1500);
    }
    gameOver() {
        var _a;
        this.sequence = [];
        (_a = element('.game-over')) === null || _a === void 0 ? void 0 : _a.classList.remove('hidden');
    }
    initPressListener() {
        var _a;
        (_a = elements('.cat')) === null || _a === void 0 ? void 0 : _a.map(element => {
            element.addEventListener('click', this.press);
        });
    }
    clearPressListener() {
        var _a;
        (_a = elements('.cat')) === null || _a === void 0 ? void 0 : _a.map(element => {
            element.removeEventListener('click', this.press);
        });
    }
}
/// <reference path="./game.ts" />
// import Game from './game'
const colors = [
    'green',
    'red',
    'blue',
    'yellow',
];
window.onload = function () {
    colors.map(color => {
        fetch('/assets/images/cat-' + color + '.svg')
            .then(response => response.text())
            .then(svg => document.querySelector('.cat-' + color + ' .cat')
            .insertAdjacentHTML('afterbegin', svg));
    });
    fetch('/assets/images/guillotine.svg')
        .then(response => response.text())
        .then(svg => [...document.querySelectorAll('.guillotine')]
        .map(element => element.insertAdjacentHTML('afterbegin', svg)));
    new Game();
};
