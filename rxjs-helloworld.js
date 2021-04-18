const { fromEvent } = rxjs;
const { map } = rxjs.operators;

const button = document.querySelector("#myButton");
const content = document.querySelector("#myContent");
const maze = document.getElementById("maze");
const red = document.getElementById("red")
const blue = document.getElementById("blue")

const players = {
    'red': {
        top: 30,
        left: 30
    },
    'blue': {
        top: 30,
        left: 100
    }
}

const keydown = fromEvent(document, 'keydown').pipe(
    map(event => event.code),
);

const keyup = fromEvent(document, 'keyup').pipe(
    map(event => event.code),
);

keyup.subscribe((key) => {
    console.log(key)
    switch (key) {
        case 'ArrowDown':
            players.red.top += 5
            red.style.top = players.red.top + 'px'
            break
        case 'ArrowUp':
            players.red.top -= 5
            red.style.top = players.red.top + 'px'
            break
        case 'ArrowLeft':
            players.red.left -= 5
            red.style.left = players.red.left + 'px'
            break
        case 'ArrowRight':
            players.red.left += 5
            red.style.left = players.red.left + 'px'
            break
        case 'KeyS':
            players.blue.top += 5
            blue.style.top = players.blue.top + 'px'
            break
        case 'KeyW':
            players.blue.top -= 5
            blue.style.top = players.blue.top + 'px'
            break
        case 'KeyA':
            players.blue.left -= 5
            blue.style.left = players.blue.left + 'px'
            break
        case 'KeyD':
            players.blue.left += 5
            blue.style.left = players.blue.left + 'px'
            break
    }
});

keydown.subscribe((key) => {
    console.log(key)
    switch (key) {
        case 'ArrowDown':
            players.red.top += 5
            red.style.top = players.red.top + 'px'
            break
        case 'ArrowUp':
            players.red.top -= 5
            red.style.top = players.red.top + 'px'
            break
        case 'ArrowLeft':
            players.red.left -= 5
            red.style.left = players.red.left + 'px'
            break
        case 'ArrowRight':
            players.red.left += 5
            red.style.left = players.red.left + 'px'
            break
        case 'KeyS':
            players.blue.top += 5
            blue.style.top = players.blue.top + 'px'
            break
        case 'KeyW':
            players.blue.top -= 5
            blue.style.top = players.blue.top + 'px'
            break
        case 'KeyA':
            players.blue.left -= 5
            blue.style.left = players.blue.left + 'px'
            break
        case 'KeyD':
            players.blue.left += 5
            blue.style.left = players.blue.left + 'px'
            break
    }
});