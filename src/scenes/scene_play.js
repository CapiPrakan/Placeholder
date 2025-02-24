import { SCENE_PLAY, SCENE_DIALOGO } from '/src/data/scene_data.ts';
import { 
    JSON_DIALOGO, JSON_DIALOGO_PATH 
} from "/src/data/assets_data.ts";

// esta escena de momento solo lanza la escena de dialogo
class ScenePlay extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_PLAY });
    }

    preload() {
        this.load.json(JSON_DIALOGO, JSON_DIALOGO_PATH);
    }

    create() {
        // lanzamos la escena de dialogo, pero scene_play sigue activa
        this.scene.launch(SCENE_DIALOGO, "dialogo_1");
    }
}

export default ScenePlay;
