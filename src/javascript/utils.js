export const element = (selector) => {
    return document.querySelector(selector);
}

export const elements = (selector) => {
    return [...document.querySelectorAll(selector)];
}