import { element } from './utils';

/**
 * Say animations
 */
export const transitionIdleToSay = function (cat) {
    element(cat).classList.remove('idle');
    element(cat).classList.add('idle-to-say');

    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat).classList.remove('idle-to-say');
            element(cat).classList.add('say');
            res();
        }, 500);
    });
}

export const sayToTransitionIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat).classList.remove('say');
            element(cat).classList.add('say-to-idle');
            res();
        }, 1000);
    });
}

export const transitionSayToIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat).classList.remove('say-to-idle');
            element(cat).classList.add('idle');
            res();
        }, 500);
    });
}

/**
 * Press animations
 */
export const transitionIdleToPress = function (cat) {
    element(cat).classList.remove('idle');
    element(cat).classList.add('idle-to-press');

    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat).classList.remove('idle-to-press');
            element(cat).classList.add('press');
            res();
        }, 500);
    });
}

export const pressToTransitionIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat).classList.remove('press');
            element(cat).classList.add('press-to-idle');
            res();
        }, 1000);
    });
}

export const transitionPressToIdle = function (cat) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat).classList.remove('press-to-idle');
            element(cat).classList.add('idle');
            res();
        }, 500);
    });
}
