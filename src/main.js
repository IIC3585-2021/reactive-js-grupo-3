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
    var maze = new Image();
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

const check_colissions = () => {
    /** Función que revisa las colisiones de los jugadores.
     * Se revisa el color del pixel y se decide si es posible el movimiento del jugador.
     * Muralla Negra: No se puede pasar.
     * Muralla Roja: Solo jugador rojo puede traspasar. Código color: rgba(255,39,39,255).
     * Muralla Azul: Solo jugador azul puede traspasar. Código color: rgba(0,103,208,255).
     * Muralla Verda: Jugador gana el juego. Código color: Código color: rgba(0,212,0,255).
    */
    var red_won = false;
    var found = false;
    // Derecha jugador rojo
    var pixels = ctx.getImageData(players.red.left + 2, players.red.top - 7, 5, 7).data;
    var check_right = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > 200 && pixels[i + 1] < 50 && pixels[i + 2] < 50) {
            found = true;
            break;
        }
    }
    check_right = check_right || found
    var found = false;
    // Abajo jugador rojo
    var pixels = ctx.getImageData(players.red.left - 12, players.red.top - 7, 5, 7).data;
    var check_bottom = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > 200 && pixels[i + 1] < 50 && pixels[i + 2] < 50) {
            found = true;
            break;
        }
    }
    check_bottom = check_bottom || found
    var found = false;
    // Izquierda jugador rojo
    var pixels = ctx.getImageData(players.red.left - 12, players.red.top - 7, 5, 7).data
    var check_left = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > 200 && pixels[i + 1] < 50 && pixels[i + 2] < 50) {
            found = true;
            break;
        }
    }
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] < 50 && pixels[i + 1] > 200 && pixels[i + 2] < 50) {
            red_won = true;
            end_game('red');
            break;
        }
    }
    check_left = check_left || found
    var found = false;
    // Arriba jugador rojo
    var pixels = ctx.getImageData(players.red.left - 8, players.red.top - 12, 7, 5).data
    var check_top = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] > 200 && pixels[i + 1] < 50 && pixels[i + 2] < 50) {
            found = true;
            break;
        }
    }
    check_top = check_top || found

    var blue_won = false;
    var found = false;
    // Derecha jugador azul
    var pixels = ctx.getImageData(players.blue.left + 2, players.blue.top - 7, 5, 7).data
    var check_d = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] < 50 && pixels[i + 1] > 80 && pixels[i + 2] > 200) {
            found = true;
            break;
        }
    }
    check_d = check_d || found
    var found = false;
    // Abajo jugador azul
    var pixels = ctx.getImageData(players.blue.left - 12, players.blue.top -7, 5, 7).data
    var check_s = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] < 50 && pixels[i + 1] > 80 && pixels[i + 2] > 200) {
            found = true;
            break;
        }
    }
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] < 50 && pixels[i + 1] > 200 && pixels[i + 2] < 50) {
            blue_won = true;
            end_game('blue');
            break;
        }
    }
    check_s = check_s || found
    var found = false;
    // Izquierda jugador azul
    var pixels = ctx.getImageData(players.blue.left - 12, players.blue.top - 7, 5, 7).data
    var check_a = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] < 50 && pixels[i + 1] > 80 && pixels[i + 2] > 200) {
            found = true;
            break;
        }
    }
    check_a = check_a || found
    var found = false;
    // Arriba jugador azul
    var pixels = ctx.getImageData(players.blue.left - 8, players.blue.top - 12, 7, 5).data
    var check_w = !pixels.some((value) => value < 100);
    for (i = 0; i < pixels.length; i += 4) {
        if (pixels[i] < 50 && pixels[i + 1] > 80 && pixels[i + 2] > 200) {
            found = true;
            break;
        }
    }
    check_w = check_w || found

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