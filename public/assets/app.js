/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const element = (selector) => {
    return document.querySelector(selector);
}
/* harmony export (immutable) */ __webpack_exports__["a"] = element;


const elements = (selector) => {
    return [...document.querySelectorAll(selector)];
}
/* harmony export (immutable) */ __webpack_exports__["b"] = elements;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(5);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game__ = __webpack_require__(3);


const colors = [
    'green',
    'red',
    'blue',
    'yellow',
];

window.onload = function() {
    colors.map(color => {
        fetch('/assets/images/cat-' + color + '.svg')
            .then(response => response.text())
            .then(svg => 
                document.querySelector('.cat-' + color + ' .cat')
                    .insertAdjacentHTML('afterbegin', svg)
            );
    });

    fetch('/assets/images/guillotine.svg')
    .then(response => response.text())
    .then(svg => 
        [...document.querySelectorAll('.guillotine')]
        .map(element => element.insertAdjacentHTML('afterbegin', svg))
    );
    
    new __WEBPACK_IMPORTED_MODULE_0__game__["a" /* default */]();
}

Array.prototype.peek = function() {
    return this[this.length - 1];
};

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__animate__ = __webpack_require__(4);



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
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.start-game-btn').addEventListener('click', () => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.modal.start-game').classList.add('hidden');
            this.start();
        });
    }

    initRetryListener () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.retry-btn').addEventListener('click', () => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.modal.game-over').classList.add('hidden');
            this.start();
        });
    }

    initReplayListener () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.replay-btn').addEventListener('click', () => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.modal.winner').classList.add('hidden');
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
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.restart').addEventListener('click', () => {
            this.restart();
        });
    }

    initAudioToggle () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* elements */])('.audio').map(audioElement => {
            audioElement.addEventListener('click', e => {
                this.audio = !this.audio;
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* elements */])('.audio').map(element => element.classList.toggle('no-audio'));
            })
        });
    }

    initHardcoreToggle () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.guillotine-btn').addEventListener('click', (e) => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.guillotine').classList.add('on-top');
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
            
            setTimeout(() => Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.guillotine').classList.remove('on-top'), 1500);
        })
    }

    mew (catIndex) {
        const cat = '.cat-' + this.cats[catIndex] + ' .cat';
        
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('idle');
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('idle-to-say');

        if (this.audio) {
            let catSound = new Audio('/assets/sounds/' + catIndex + '.mp3');
            catSound.play();
        }

        Object(__WEBPACK_IMPORTED_MODULE_1__animate__["d" /* transitionIdleToSay */])(cat)
        .then(() => Object(__WEBPACK_IMPORTED_MODULE_1__animate__["b" /* sayToTransitionIdle */])(cat))
        .then(() => Object(__WEBPACK_IMPORTED_MODULE_1__animate__["f" /* transitionSayToIdle */])(cat));

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

        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('idle');
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('idle-to-press');
        
        if (this.audio) {
            let simonSound = new Audio('/assets/sounds/simonSound' + (parseInt(catIndex) + 1) + '.mp3');
            setTimeout(() => simonSound.play(), 500);
        }
        
        if (this.sequence[this.turn.length] === catIndex) {
            this.turn.push(catIndex);

            if (this.turn.length === this.sequence.length) {

                if (this.sequence.length === 20) {
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.winner').classList.remove('hidden');
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

        Object(__WEBPACK_IMPORTED_MODULE_1__animate__["c" /* transitionIdleToPress */])(cat)
        .then(() => Object(__WEBPACK_IMPORTED_MODULE_1__animate__["a" /* pressToTransitionIdle */])(cat))
        .then(() => Object(__WEBPACK_IMPORTED_MODULE_1__animate__["e" /* transitionPressToIdle */])(cat));
    }

    addToSequence () {
        let cat = Math.floor(Math.random() * 4);

        while (cat === this.sequence.peek()) {
            cat = Math.floor(Math.random() * 4);
        }

        this.sequence.push(cat);
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.score').innerHTML = this.sequence.length;
    }

    restart () {
        this.audio = false;
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.restarting').classList.remove('hidden');
        this.start();
        setTimeout(() => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.restarting').classList.add('hidden');
            this.audio = true;
        }, 1500);
    }

    gameOver () {
        this.sequence = [];
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])('.game-over').classList.remove('hidden');
    }

    initPressListener() {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* elements */])('.cat').map(element => {
            element.addEventListener( 'click', this.press)
        });
    }

    clearPressListener () {
        Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* elements */])('.cat').map(element => {
            element.removeEventListener('click', this.press);
        });
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Game);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


/**
 * Say animations
 */
const transitionIdleToSay = function (cat) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('idle');
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('idle-to-say');

    return new Promise((res, rej) => {
        setTimeout(() => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('idle-to-say');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('say');
            res();
        }, 500);
    });
}
/* harmony export (immutable) */ __webpack_exports__["d"] = transitionIdleToSay;


const sayToTransitionIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('say');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('say-to-idle');
            res();
        }, 1000);
    });
}
/* harmony export (immutable) */ __webpack_exports__["b"] = sayToTransitionIdle;


const transitionSayToIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('say-to-idle');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('idle');
            res();
        }, 500);
    });
}
/* harmony export (immutable) */ __webpack_exports__["f"] = transitionSayToIdle;


/**
 * Press animations
 */
const transitionIdleToPress = function (cat) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('idle');
    Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('idle-to-press');

    return new Promise((res, rej) => {
        setTimeout(() => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('idle-to-press');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('press');
            res();
        }, 500);
    });
}
/* harmony export (immutable) */ __webpack_exports__["c"] = transitionIdleToPress;


const pressToTransitionIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('press');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('press-to-idle');
            res();
        }, 1000);
    });
}
/* harmony export (immutable) */ __webpack_exports__["a"] = pressToTransitionIdle;


const transitionPressToIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.remove('press-to-idle');
            Object(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* element */])(cat).classList.add('idle');
            res();
        }, 500);
    });
}
/* harmony export (immutable) */ __webpack_exports__["e"] = transitionPressToIdle;



/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map