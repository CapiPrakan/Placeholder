// cargaremos las imagenes en el bootloader y luego llamaremos a la escena
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
        this.load.image("cuadrado_dialogo", "/assets/img/cuadrado_dialogo.png");
    }
}

export default Bootloader;