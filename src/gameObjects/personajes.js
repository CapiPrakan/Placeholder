import { IMAGE_PATH, FORMATO_IMAGEN, IMAGE_PROTA, IMAGE_VERONICA, PERSONAJES_POSES } from '/src/data/assets_data.ts';
import { PERSONAJES, PROTA, VERONICA } from '/src/data/npc_data.ts';

// Es el botón que se muestra en el diálogo
class BotonDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, npc) {
        super(scene, x, y, type);

        this.cargar_personajes(scene, npc);
    }
    
    cargar_personajes(scene, persoanje) {
        this.personajes_path = IMAGE_PATH + PERSONAJES;
        
        for (let i = 0; i < PERSONAJES_POSES.length; i++) {
            let imagePath = this.personajes_path + persoanje + "/" + persoanje + PERSONAJES_POSES[i] + FORMATO_IMAGEN;
            this.verificar_y_cargar_imagen(scene, this.get_img_name(persoanje) + PERSONAJES_POSES[i], imagePath);
        }
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

    verificar_y_cargar_imagen(scene, key, url) {
        fetch(url, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    scene.load.image(key, url);
                } else {
                    console.warn(`La imagen no existe: ${url}`);
                }
            })
            .catch(error => {
                console.error(`Error al verificar la imagen: ${url}`, error);
            });
    }
}

export default BotonDialogo;