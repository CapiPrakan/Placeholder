import { SCENE_PLAY, SCENE_DIALOGO } from '/src/data/scene_data.ts';
import { EVENT_DATOS_CARAGDOS } from "/src/data/events_data.ts";

import AssetsData from '/src/data/assets_data.js';

// esta escena de momento solo lanza la escena de dialogo
class ScenePlay extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_PLAY });
        this.assets_data = new AssetsData(this);
    }

    preload() {
        // Cargar datos y esperar a que se emita la señal EVENT_DATOS_CARAGDOS
        this.assets_data.cargar_datos();

        this.events.once(EVENT_DATOS_CARAGDOS, () => {
            this.assets_data.cargar_dialogos();
        });
    }

    create() {
        // lanzamos la escena de dialogo, pero scene_play sigue activa
        this.scene.launch(SCENE_DIALOGO, "dialogo_1");
    }
}

export default ScenePlay;
