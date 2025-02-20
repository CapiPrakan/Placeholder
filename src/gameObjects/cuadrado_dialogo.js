import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

// cuadro de dialogo principal
class CuadroDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, texto) {
        super(scene, x, y, type);

        // añadir el cuadro de dialogo a la escena
        scene.add.existing(this);

        // añade el texto de dialogo principal
        this.texto = new TextoDialogo(scene, this.width - 10, x - this.width / 2 + 20, y - this.height / 2 + 20, texto, false, {});
    }
}

export default CuadroDialogo;