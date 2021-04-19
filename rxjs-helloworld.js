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
const load_image = () => {
    var maze = new Image();
    maze.src = 'maze2.jpg';
    maze.onload = function() {
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

const check_red_pixel = (sx, sy, sw, sh) => {
    let r_match = false;
    let g_match = false;
    let b_match = false;
    const r = 140;
    const g = 100;
    const b = 100;
    let result = true;
    let pixels = ctx.getImageData(players.red.left + sx, players.red.top + sy, sw, sh).data;
    pixels.forEach((element, i) => {
        if ((i+1)%4 === 1) {
            if (element > r || element > 100) {
                r_match = true;
            }
        }
        else if ((i+1)%4 === 2){
            if (element < g || element > 100) {
                g_match = true;
            }
        }
        else if ((i+1)%4 === 3){
            if (element < b || element > 100) {
                b_match = true;
            }
        }
        else if ((i+1)%4 === 0) {
            if (!r_match || !g_match || !b_match){
                result = false;
                return;
            }
            r_match = false;
            g_match = false;
            b_match = false;
        }
    });
    return result;
}

const check_blue_pixel = (sx, sy, sw, sh) => {
    let r_match = false
    let g_match = false
    let b_match = false
    const r = 70
    const g = 50
    const b = 180
    let result = true;
    let pixels = ctx.getImageData(players.blue.left + sx, players.blue.top + sy, sw, sh).data;
    pixels.forEach((element, i) => {
        if ((i+1)%4 === 1) {
            if (element < r || element > 100) {
                r_match = true;
            }
        }
        else if ((i+1)%4 === 2){
            if (element > g || element > 100) {
                g_match = true;
            }
        }
        else if ((i+1)%4 === 3){
            if (element > b || element > 100) {
                b_match = true;
            }
        }
        else if ((i+1)%4 === 0) {
            if (!r_match || !g_match || !b_match){
                result = false;
                return;
            }
            r_match = false;
            g_match = false;
            b_match = false;
        }
    });
    return result;
}   

const check_green_pixel = (player) => {
    let r_match = false
    let g_match = false
    let b_match = false
    const r = 50
    const g = 200
    const b = 50
    let result = false;
    let pixels;
    let sx = -12;
    let sy = -7;
    let sw = 5;
    let sh = 7;
    if (player === "red"){
        pixels = ctx.getImageData(players.red.left + sx, players.red.top - sy, sw, sh).data;
    }
    else if (player === "blue"){
        pixels = ctx.getImageData(players.blue.left + sx, players.blue.top - sy, sw, sh).data;
    }
    pixels.forEach((element, i) => {
        if ((i+1)%4 === 1) {
            if (element < r) {
                r_match = true;
            }
        }
        else if ((i+1)%4 === 2){
            if (element > g) {
                g_match = true;
            }
        }
        else if ((i+1)%4 === 3){
            if (element < b) {
                b_match = true;
            }
        }
        else if ((i+1)%4 === 0) {
            if (r_match && g_match && b_match){
                console.log(player)
                console.log("ganó")
                result = true;
                return;
            }
            r_match = false;
            g_match = false;
            b_match = false;
        }
    });
    return result;
}

keydown.subscribe((key) => {
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

const check_movement = (player, direction) => {
    let sx;
    let sy;
    let sw;
    let sh;
    if (direction === "up"){
        sx = -8;
        sy = -12;
        sw = 7;
        sh = 5;
    }
    else if (direction === "down"){
        sx = -8;
        sy = 2;
        sw = 7;
        sh = 5;
    }
    else if (direction === "left"){
        sx = -12;
        sy = -7;
        sw = 5;
        sh = 7;
    }
    else if (direction === "right"){
        sx = 2;
        sy = -7;
        sw = 5;
        sh = 7;
    }
    if (player === "red"){
        return check_red_pixel(sx, sy, sw, sh)
    }
    else if (player === "blue"){
        return check_blue_pixel(sx, sy, sw, sh)
    }
}



const check_colissions = () => {
    // Reviso las posiciones de los jugadores y el color del pixel
    // y: players.red.top, x: players.red.left
    // Si alguno es negro Choca
    // Blue wall: rgba(0,103,208,255)
    // Red wall: rgba(255,39,39,255)
    // Green wall: rgba(0,212,0,255)
    let red_won = check_green_pixel("red");
    let blue_won = check_green_pixel("blue");
    let check_bottom = check_movement("red", "down");
    let check_top = check_movement("red", "up");
    let check_left = check_movement("red", "left");
    let check_right = check_movement("red", "right");

    let check_s = check_movement("blue", "down");
    let check_w = check_movement("blue", "up");
    let check_a = check_movement("blue", "left");
    let check_d = check_movement("blue", "right");

    const checks = [check_bottom, check_top, check_left, check_right, check_s, check_w, check_a, check_d]
    keys.map((key) => {
        key.value = (key.value === true && checks[keys.indexOf(key)] === false) ? false : key.value
    });
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
        check_colissions();
        if (key.value === true) {
            move(key.name)
        }
    })
})