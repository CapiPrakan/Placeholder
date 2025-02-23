import { 
    IMAGE_CUADRADO_DIALOGO, IMAGE_CUADRADO_DIALOGO_PATH, 
    IMAGE_BOTON_DIALOGO, IMAGE_BOTON_DIALOGO_PATH, 
    JSON_DIALOGO, JSON_DIALOGO_PATH 
} from "/src/data/assets_data.ts";

import { SCENE_BOOTLOADER, SCENE_PLAY, SCENE_DIALOGO } from "/src/data/scene_data.ts";

// la idea es q este se encarge de agregar cada escena y cargue los assets correspondientes 
// ( de momento solo carga el dialogo )
class Bootloader extends Phaser.Scene {
    constructor(scene, extraData) {
        super({ key: SCENE_BOOTLOADER, active: true });

        this.extraData = extraData;
        this.nextScene = scene;
    }

    preload() {// Diccionario que mapea cadenas de texto a funciones
        this.scene_play();
    }

    scene_play() {
        // cuando se completa la carga de todos los elementos, llamamos a la escena ScenePlay
        this.load.on("complete", () => {
            this.scene.start(SCENE_PLAY);
            this.scene.stop(SCENE_BOOTLOADER); 
        });
        
        this.load.json(JSON_DIALOGO, JSON_DIALOGO_PATH);
    }

    scene_dialogo() {
    }
}

export default Bootloader;