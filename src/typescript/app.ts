/// <reference path="./game.ts" />

const colors = [
    'green',
    'red',
    'blue',
    'yellow',
]

window.onload = function() {
    colors.map(color => {
        fetch('/assets/images/cat-' + color + '.svg')
            .then(response => response.text())
            .then(svg => 
                document.querySelector('.cat-' + color + ' .cat') !
                    .insertAdjacentHTML('afterbegin', svg)
            )
    })

    fetch('/assets/images/guillotine.svg')
    .then(response => response.text())
    .then(svg => 
        [...document.querySelectorAll('.guillotine')]
        .map(element => element.insertAdjacentHTML('afterbegin', svg))
    )
    
    new Game()
}