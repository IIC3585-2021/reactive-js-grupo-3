const { fromEvent } = rxjs;

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

const myObservable = fromEvent(button, 'click');
myObservable.subscribe(() => {
    content.textContent = moment().format('LTS');
});


const keydown = fromEvent(document, 'keydown')

keydown.subscribe((key) => {
    console.log(key.code)
    switch (key.code) {
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