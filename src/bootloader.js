import { 
    IMAGE_CUADRADO_DIALOGO, IMAGE_CUADRADO_DIALOGO_PATH, 
    IMAGE_BOTON_DIALOGO, IMAGE_BOTON_DIALOGO_PATH, 
    JSON_DIALOGO, JSON_DIALOGO_PATH 
} from "/src/data/assets_data.ts";

import { SCENE_BOOTLOADER, SCENE_PLAY, SCENE_DIALOGO } from "/src/data/scene_data.ts";

import { IMAGE_PATH, FORMATO_IMAGEN, IMAGE_PROTA, IMAGE_VERONICA, PERSONAJES_POSES } from '/src/data/assets_data.ts';
import { PERSONAJES, PERSONAJES_PATH, PROTA, VERONICA } from '/src/data/npc_data.ts';

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

        for (let i = 0; i < PERSONAJES.length; i++) {
            this.cargar_personajes(PERSONAJES[i]);
        }
    }

    scene_play() {
        // cuando se completa la carga de todos los elementos, llamamos a la escena ScenePlay
        this.load.on("complete", () => {
            this.scene.start(SCENE_PLAY);
            this.scene.stop(SCENE_BOOTLOADER); 
        });
        
        this.load.json(JSON_DIALOGO, JSON_DIALOGO_PATH);
    }

    cargar_personajes(persoanje) {
        this.personajes_path = IMAGE_PATH + PERSONAJES_PATH;
        
        for (let i = 0; i < PERSONAJES_POSES.length; i++) {
            let imagePath = this.personajes_path + persoanje + "/" + persoanje + PERSONAJES_POSES[i] + FORMATO_IMAGEN;
            this.verificar_y_cargar_imagen(this.get_img_name(persoanje) + PERSONAJES_POSES[i], imagePath);
        }
    }

    verificar_y_cargar_imagen(key, url) {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    this.load.image(key, url);
                } else {
                    console.warn(`La imagen no existe: ${url}`);
                }
            })
            .catch(error => {
                console.error(`Error al verificar la imagen: ${url}`, error);
            });
    }

    get_img_name(name) {
        switch (name) {
            case PROTA:
                return IMAGE_PROTA;
            case VERONICA:
                return IMAGE_VERONICA;
            default:
                return null;
        }
    }
}

export default Bootloader;