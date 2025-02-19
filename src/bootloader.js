import { 
    IMAGE_CUADRADO_DIALOGO, IMAGE_CUADRADO_DIALOGO_PATH, 
    IMAGE_BOTON_DIALOGO, IMAGE_BOTON_DIALOGO_PATH, 
    JSON_DIALOGO, JSON_DIALOGO_PATH 
} from "./data/assets_data";

class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: "Bootloader", active: true });
    }

    preload() {
        // cuando se completa la carga de todos los elementos, llamamos a la escena ScenePlay
        this.load.on("complete", () => {
            this.scene.start("ScenePlay");
        });
        
        // carga de imágenes
        this.load.image(IMAGE_CUADRADO_DIALOGO, IMAGE_CUADRADO_DIALOGO_PATH);
        this.load.image(IMAGE_BOTON_DIALOGO, IMAGE_BOTON_DIALOGO_PATH);
        
        this.load.json(JSON_DIALOGO, JSON_DIALOGO_PATH);
    }
}

export default Bootloader;