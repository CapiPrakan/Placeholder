import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

class BotonDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, name, texto) {
        super(scene, x, y, type);
        this.setInteractive();
        this.setOrigin(1, 0.5); // Cambia el origen al centro

        this.set_event(name);

        scene.add.existing(this);

        // Centrar el texto dentro del botón
        this.texto = new TextoDialogo(scene, this.width - 10, x - this.width / 2, y, texto, true, {}).setOrigin(0, 0.5);
    }

    set_event(name) {
        this.on("pointerdown", () => {
            console.log(name);
        });

        this.on("pointerover", () => {
            this.setTint(0x787878);
        });

        this.on("pointerout", () => {
            this.clearTint();
        });
    }
}

export default BotonDialogo;