const { fromEvent, Observable } = rxjs;
const { map } = rxjs.operators;

const maze = document.getElementById("maze");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const redwinner = document.getElementById("redwinner");
const bluewinner = document.getElementById("bluewinner");
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Función encargada de cargar el laberinto.
const load_image = () => {
    let maze = new Image();
    maze.src = 'src/assets/maze.jpg';
    maze.onload = function() {
        ctx.drawImage(maze, 0, 0, 560, 560);
    }
};

// Diccionario con información de los jugadores.
const players = {
    'red': {
        top: 20,
        left: 74
    },
    'blue': {
        top: 20,
        left: 87
    }
};

// Información de las teclas utilizadas por el juego.
const keys = [
    { name: 'ArrowDown', value: false },
    { name: 'ArrowUp', value: false },
    { name: 'ArrowLeft', value: false },
    { name: 'ArrowRight', value: false },
    { name: 's', value: false },
    { name: 'w', value: false },
    { name: 'a', value: false },
    { name: 'd', value: false }
];

// Manejo de movimientos.
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
                end_game(player);
                return;
            }
            r_match = false;
            g_match = false;
            b_match = false;
        }
    });
    return result;
}

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
    /** Función que revisa las colisiones de los jugadores.
     * Se revisa el color del pixel y se decide si es posible el movimiento del jugador.
     * Muralla Negra: No se puede pasar.
     * Muralla Roja: Solo jugador rojo puede traspasar. Código color: rgba(255,39,39,255).
     * Muralla Azul: Solo jugador azul puede traspasar. Código color: rgba(0,103,208,255).
     * Muralla Verda: Jugador gana el juego. Código color: Código color: rgba(0,212,0,255).
    */
     check_green_pixel("red");
     check_green_pixel("blue");
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

// Función que modifica la vista del juego cuando un jugador gana.
const end_game = (winner) => {
    // Falta asociar las imagenes a los gameover correspondientes
    blue.style.display = "none";
    red.style.display = "none";
    let game_over = new Image();
    game_over.src = winner === 'blue' ? 'src/assets/bluewinner.jpg': 'src/assets/redwinner.jpg';
    game_over.onload = function() {
        ctx.drawImage(game_over, 0, 0, 560, 560);
    }
}

// Juego 
load_image()
moveObservable.subscribe(() => {
    keys.map((key) => {
        check_colissions();
        if (key.value === true) {
            move(key.name)
        }
    })
})
