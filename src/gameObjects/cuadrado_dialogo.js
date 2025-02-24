import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

// cuadro de dialogo principal
class CuadroDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, texto) {
        super(scene, x, y, type);

        this.texto_finnished = false;

        // añadir el cuadro de dialogo a la escena
        scene.add.existing(this);
        this.scaleX = 0;
        this.scaleY = 0;
        this.alpha = 0;

        scene.tweens.add({
            targets: this,
            scaleX: 1,
            scaleY: 1,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.tween_finnished(scene, x, y, texto);
            }
        });
    }

    tween_finnished(scene, x, y, texto) {
        // añade el texto de dialogo principal
        this.texto = new TextoDialogo(scene, this, this.width - 10, x - this.width / 2 + 20, y - this.height / 2 + 20, texto, false, {});
    }

    actualizar_texto(texto) {
        this.texto.actualizar_texto(texto);
    }

    stop_animation() {
        this.texto.stop_animation();
    }
}

export default CuadroDialogo;