const element = (selector: string): Element | null => {
    return document.querySelector(selector)
}

const elements = (selector: string): Element[] | null => {
    return [...document.querySelectorAll(selector)]
}