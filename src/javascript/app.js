/**
 * Todo: Add AJAX script that loads all SVG's inline
 */

const colors = [
    'red',
    'blue',
    'green',
    'yellow',
];

window.onload = function() {
    colors.map(color => {
        fetch('/assets/images/cat-' + color + '.svg')
            .then(response => response.text())
            .then(svg => 
                document.querySelector('.cat-container.cat-' + color)
                    .insertAdjacentHTML('afterbegin', svg)
            );
    });
}