const { fromEvent, Observable } = rxjs;
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

const keys = [
    { name: 'ArrowDown', value: false },
    { name: 'ArrowUp', value: false },
    { name: 'ArrowLeft', value: false },
    { name: 'ArrowRight', value: false },
    { name: 's', value: false },
    { name: 'w', value: false },
    { name: 'a', value: false },
    { name: 'd', value: false }
]

const keydown = fromEvent(document, 'keydown').pipe(
    map(event => event.code),
);

const keyup = fromEvent(document, 'keyup').pipe(
    map(event => event.code),
);

const moveObservable = new Observable((observer) => {
    setInterval(() => {
        observer.next();
    }, 100);
});

keydown.subscribe((key) => {
    console.log(key)
    switch (key) {
        case 'ArrowDown':
            keys[0].value = true
            break
        case 'ArrowUp':
            keys[1].value = true
            break
        case 'ArrowLeft':
            keys[2].value = true
            break
        case 'ArrowRight':
            keys[3].value = true
            break
        case 'KeyS':
            keys[4].value = true
            break
        case 'KeyW':
            keys[5].value = true
            break
        case 'KeyA':
            keys[6].value = true
            break
        case 'KeyD':
            keys[7].value = true
            break
    }
});

keyup.subscribe((key) => {
    console.log(key)
    switch (key) {
        case 'ArrowDown':
            keys[0].value = false
            break
        case 'ArrowUp':
            keys[1].value = false
            break
        case 'ArrowLeft':
            keys[2].value = false
            break
        case 'ArrowRight':
            keys[3].value = false
            break
        case 'KeyS':
            keys[4].value = false
            break
        case 'KeyW':
            keys[5].value = false
            break
        case 'KeyA':
            keys[6].value = false
            break
        case 'KeyD':
            keys[7].value = false
            break
    }
});



const check_colissions = () => {
    // Reviso las posiciones de los jugadores y el color del pixel
    // y: players.red.top, x: players.red.left
    // Si alguno es negro Choca
    console.log(ctx.getImageData(players.red.left - 10, players.red.top, 10, 5).data)
    console.log(ctx.getImageData(players.red.left - 10, players.red.top, 10, 5).data.some((value) => value < 100))
    const check_left = !ctx.getImageData(players.red.left, players.red.top - 10, 5, 10).data.some((value) => value < 100)
    const check_bottom = !ctx.getImageData(players.red.left - 10, players.red.top, 10, 5).data.some((value) => value < 100)
    const check_right = !ctx.getImageData(players.red.left - 10, players.red.top, 10, 5).data.some((value) => value < 100)
    
    const check_top = ctx.getImageData(players.red.left + 2, players.red.top - 10, 1, 10).data.some((value) => value < 100)

    return check_left && check_bottom
};  

const move = (key) => {
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
        case 's':
            players.blue.top += 5
            blue.style.top = players.blue.top + 'px'
            break
        case 'w':
            players.blue.top -= 5
            blue.style.top = players.blue.top + 'px'
            break
        case 'a':
            players.blue.left -= 5
            blue.style.left = players.blue.left + 'px'
            break
        case 'd':
            players.blue.left += 5
            blue.style.left = players.blue.left + 'px'
            break
    }

}

moveObservable.subscribe(() => {
    keys.map((key) => {
        if (key.value === true) {
            move(key.name)
        }
    })
})