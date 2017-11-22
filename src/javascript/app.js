import Game from './game';

const colors = [
    'green',
    'red',
    'blue',
    'yellow',
];

window.onload = function() {
    new Game();

    colors.map(color => {
        fetch('/assets/images/cat-' + color + '.svg')
            .then(response => response.text())
            .then(svg => 
                document.querySelector('.cat-' + color + ' .cat')
                    .insertAdjacentHTML('afterbegin', svg)
            );
    });
}

Array.prototype.peek = function() {
    return this[this.length - 1];
};