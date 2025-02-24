import { 
    IMAGE_CUADRADO_DIALOGO, IMAGE_CUADRADO_DIALOGO_PATH, 
    IMAGE_BOTON_DIALOGO, IMAGE_BOTON_DIALOGO_PATH, 
    JSON_DIALOGO, JSON_DIALOGO_PATH 
} from "/src/data/assets_data.ts";

import { SCENE_BOOTLOADER, SCENE_PLAY, SCENE_DIALOGO } from "/src/data/scene_data.ts";

import { PERSONAJES, PERSONAJES_PATH, PROTA, VERONICA } from '/src/data/npc_data.ts';

// la idea es q este se encarge de agregar cada escena y cargue los assets correspondientes 
// ( de momento solo carga el dialogo )
class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_BOOTLOADER, active: true });
    }

    preload() {// Diccionario que mapea cadenas de texto a funciones
        setTimeout(() => {
        this.scene_play();
        }, 500);
    }

    scene_play() {
        this.scene.start(SCENE_PLAY);
        this.scene.stop(SCENE_BOOTLOADER); 
    }
}

export default Bootloader;