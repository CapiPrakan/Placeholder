import { IMAGE_PATH, FORMATO_IMAGEN, IMAGE_PROTA, IMAGE_VERONICA, PERSONAJES_POSES } from '/src/data/assets_data.ts';
import { PERSONAJES, PERSONAJES_PATH, PROTA, VERONICA } from '/src/data/npc_data.ts';

// Es el botón que se muestra en el diálogo
class BotonDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, personaje, pose) {
        super(scene, x, y, "");

        this.personaje = personaje;
        this.pose = pose;

        this.add_personaje(scene, personaje, pose);
    }

    change_texture(personaje, pose) {
        let img_name = this.get_img_name(personaje) + "_" + pose;
        this.setTexture(img_name);
    }

    add_personaje(scene, personaje, pose) {
        this.change_texture(personaje, pose);
        this.setOrigin(0, 1);
        scene.add.existing(this);
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

    actualizar_npc(personaje, pose) {
        this.change_texture(personaje, pose);
    }
}

export default BotonDialogo;