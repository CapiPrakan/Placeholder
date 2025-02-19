import { SCENE_PLAY, SCENE_DIALOGO } from '/src/data/scene_data.ts';

class ScenePlay extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_PLAY });
    }

    create() {
        this.scene.launch(SCENE_DIALOGO, "dialogo_1");
    }
}

export default ScenePlay;
