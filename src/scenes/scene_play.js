import { SCENE_PLAY, SCENE_DIALOGO } from '/src/data/scene_data.ts';

// esta escena de momento solo lanza la escena de dialogo
class ScenePlay extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_PLAY });
    }

    create() {
        // lanzamos la escena de dialogo, pero scene_play sigue activa
        this.scene.launch(SCENE_DIALOGO, "dialogo_1");
    }
}

export default ScenePlay;
