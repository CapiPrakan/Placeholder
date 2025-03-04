import { SCENE_MANAGER, SCENE_PANTALLAS, SCENE_DIALOGO } from '/src/data/scene_data.ts';
import { EVENT_START_DIALOGO, EVENT_START_PANTALLA } from "/src/data/events_data.ts";

import AssetsData from '/src/data/assets_data.js';

// esta escena de momento solo lanza la escena de dialogo
class SceneManager extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_MANAGER });
        this.assets_data = new AssetsData(this);
    }

    init() {
        this.assets_data.recargar_datos();
    }

    preload() {
        setTimeout(() => {
            this.change_cursor("normal");
        }, 100);
    }

    create() {

        this.events.on(EVENT_START_DIALOGO, this.start_dialogo, this);
        this.events.on(EVENT_START_PANTALLA, this.start_pantalla, this);
    }

    start_dialogo(dialogo) {
        this.stop_scenes();
        this.scene.launch(SCENE_DIALOGO, dialogo);
    }

    start_pantalla(pantalla) {
        this.stop_scenes();
        this.scene.start(SCENE_PANTALLAS, pantalla);
    }

    stop_scenes() {
        if (this.scene.isActive(SCENE_PANTALLAS)) {
            console.log("stop scene pantallas");
            this.scene.stop(SCENE_PANTALLAS);
        }
        
        if (this.scene.isActive(SCENE_DIALOGO)) {
            console.log("stop scene dialogo");
            this.scene.stop(SCENE_DIALOGO);
        }
    }

    change_cursor(cursor) {
        switch (cursor) {
            case "normal":
                this.change_img_cursor(this.assets_data.get_cursor());
                break;
            default:
                console.error("Tipo de animación no encontrado");
        }
    }

    change_img_cursor(textureKey) {
        const texture = this.textures.get(textureKey);
                if (texture) {
                    const url = texture.getSourceImage().src;
                    this.input.setDefaultCursor(`url(${url}), pointer`);
                } else {
                    console.error(`Textura ${textureKey} no encontrada`);
                }
    }
}

export default SceneManager;