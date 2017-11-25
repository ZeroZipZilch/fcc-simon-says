import Game from './game';

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

    fetch('/assets/images/fish-score.svg')
    .then(response => response.text())
    .then(svg => 
        document.querySelector('.fish-score')
            .insertAdjacentHTML('afterbegin', svg)
    );
    
    new Game();
}

Array.prototype.peek = function() {
    return this[this.length - 1];
};