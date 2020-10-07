/// <reference path="./utils.ts" />

/**
 * Say animations
 */
const transitionIdleToSay = (cat: any) => {
    element(cat)?.classList.remove('idle')
    element(cat)?.classList.add('idle-to-say')

    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat)?.classList.remove('idle-to-say')
            element(cat)?.classList.add('say')
            res()
        }, 500)
    })
}

const sayToTransitionIdle = (cat: any) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat)?.classList.remove('say')
            element(cat)?.classList.add('say-to-idle')
            res()
        }, 1000)
    })
}

const transitionSayToIdle = (cat: any) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat)?.classList.remove('say-to-idle')
            element(cat)?.classList.add('idle')
            res()
        }, 500)
    })
}

/**
 * Press animations
 */
const transitionIdleToPress = (cat: any) => {
    element(cat)?.classList.remove('idle')
    element(cat)?.classList.add('idle-to-press')

    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat)?.classList.remove('idle-to-press')
            element(cat)?.classList.add('press')
            res()
        }, 500)
    })
}

const pressToTransitionIdle = (cat: any) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat)?.classList.remove('press')
            element(cat)?.classList.add('press-to-idle')
            res()
        }, 1000)
    })
}

const transitionPressToIdle = (cat: any) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            element(cat)?.classList.remove('press-to-idle')
            element(cat)?.classList.add('idle')
            res()
        }, 500)
    })
}
