const { fromEvent } = rxjs;
const { map } = rxjs.operators;

const button = document.querySelector("#myButton");
const content = document.querySelector("#myContent");
const maze = document.getElementById("maze");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Función encargada de cargar el laberinto.
const load_image  = () => {
    var maze = new Image();
    maze.src = 'maze2.jpg';
    maze.onload = function(){
        ctx.drawImage(maze, 0, 0, 560, 560);
    }
};

// Cargar canvas con el laberinto.
load_image()


const players = {
    'red': {
        top: 25,
        left: 25
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
/*     switch (key) {
        case 'ArrowDown':
            players.red.top += 1
            red.style.top = players.red.top + 'px'
            break
        case 'ArrowUp':
            players.red.top -= 1
            red.style.top = players.red.top + 'px'
            break
        case 'ArrowLeft':
            players.red.left -= 1
            red.style.left = players.red.left + 'px'
            break
        case 'ArrowRight':
            players.red.left += 1
            red.style.left = players.red.left + 'px'
            break
        case 'KeyS':
            players.blue.top += 1
            blue.style.top = players.blue.top + 'px'
            break
        case 'KeyW':
            players.blue.top -= 1
            blue.style.top = players.blue.top + 'px'
            break
        case 'KeyA':
            players.blue.left -= 1
            blue.style.left = players.blue.left + 'px'
            break
        case 'KeyD':
            players.blue.left += 1
            blue.style.left = players.blue.left + 'px'
            break
    } */
});

keydown.subscribe((key) => {
    console.log(key)
    if (check_colissions()) {
        switch (key) {
            case 'ArrowDown':
                players.red.top += 2
                red.style.top = players.red.top + 'px'
                break
            case 'ArrowUp':
                players.red.top -= 2
                red.style.top = players.red.top + 'px'
                break
            case 'ArrowLeft':
                players.red.left -= 2
                red.style.left = players.red.left + 'px'
                break
            case 'ArrowRight':
                players.red.left += 2
                red.style.left = players.red.left + 'px'
                break
            case 'KeyS':
                players.blue.top += 2
                blue.style.top = players.blue.top + 'px'
                break
            case 'KeyW':
                players.blue.top -= 2
                blue.style.top = players.blue.top + 'px'
                break
            case 'KeyA':
                players.blue.left -= 2
                blue.style.left = players.blue.left + 'px'
                break
            case 'KeyD':
                players.blue.left += 2
                blue.style.left = players.blue.left + 'px'
                break
    }

    }
    console.log(players.red.left, players.red.top)
});


const myObservable = fromEvent(button, 'click');
myObservable.subscribe(() => {
    content.textContent = moment().format('LTS');
    console.log("Acáaaaaaaaaaaaaaaaaa", ctx.getImageData(0, 0, 1, 1).data);
});

const check_colissions = () => {
    // Reviso las posiciones de los jugadores y el color del pixel
    // y: players.red.top, x: players.red.left
    // Si alguno es negro Choca
    console.log(ctx.getImageData(players.red.left - 10, players.red.top - 10, 10, 2).data)
    console.log(ctx.getImageData(players.red.left - 10, players.red.top - 10, 10, 2).data.some((value) => value < 100))
    const check_top = !ctx.getImageData(players.red.left - 12, players.red.top - 10, 10, 2).data.some((value) => value < 100);
    const check_left = !ctx.getImageData(players.red.left, players.red.top - 10, 5, 10).data.some((value) => value < 100);
    const check_bottom = !ctx.getImageData(players.red.left - 10, players.red.top, 10, 5).data.some((value) => value < 100);
    const check_right = !ctx.getImageData(players.red.left - 12, players.red.top, 5, 10).data.some((value) => value < 100)
    console.log('arriba:', check_top, 'abajo:', check_bottom, 'izquierda:', check_left, 'derecha:', check_right )

    return check_left && check_bottom && check_top
};