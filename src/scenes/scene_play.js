import { SCENE_PLAY, SCENE_DIALOGO } from '/src/data/scene_data.ts';
import AssetsData from '../data/assets_data';

// esta escena de momento solo lanza la escena de dialogo
class ScenePlay extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_PLAY });
        this.assets_data = new AssetsData(this);
    }

    preload() {
        this.assets_data.cargar_dialogos();
    }

    create() {
        // lanzamos la escena de dialogo, pero scene_play sigue activa
        this.scene.launch(SCENE_DIALOGO, "dialogo_1");
    }
}

export default ScenePlay;
