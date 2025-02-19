import Dialogo from '/src/scenes/dialogo.js';
import Bootloader from '/src/bootloader.js'; // Importamos el Bootloader
import ScenePlay from '/src/scenes/scene_play.js'; // Importamos la escena ScenePlay

// Configuración del juego
const config = {
    // Tamaño del canvas
    width: 1860,
    height: 1056,

    // Contenedor del canvas (donde queremos poner el juego en el html)
    parent: 'contenedor',

    // Físicas del juego
    physics: {
        default: 'arcade',
    },

    // Escenas del juego
    scene: [
        Bootloader,
        ScenePlay,
        Dialogo
    ],
}

// Creamos el juego con la configuración
new Phaser.Game(config);