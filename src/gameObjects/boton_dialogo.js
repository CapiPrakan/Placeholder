import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

// Es el botón que se muestra en el diálogo
class BotonDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, name, texto) {
        super(scene, x, y, type);

        // lo hacemos interactuable
        this.setInteractive();

        // cambia el origen al centro a la derecha
        this.setOrigin(1, 0.5);

        // añade los eventos al botón
        this.set_event(name);

        // agregamos el botón a la escena dialogo
        scene.add.existing(this);

        // agragamos el texto al botón y lo centramos (izquierda, centro)
        this.texto = new TextoDialogo(scene, this.width - 10, x - this.width / 2, y, texto, true, {}).setOrigin(0, 0.5);
    }

    // añade los eventos al botón
    set_event(name) {

        // al ser clicado
        this.on("pointerdown", () => {
            console.log(name);
        });

        // al pasar el ratón por encima
        this.on("pointerover", () => {
            this.setTint(0x787878);
        });

        // al sacar el raton del boton
        this.on("pointerout", () => {
            this.clearTint();
        });
    }
}

export default BotonDialogo;