import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

// Es el botón que se muestra en el diálogo
class BotonDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, name, texto) {
        super(scene, x, y, type);

        this.texto_finnished = false;

        // lo hacemos interactuable
        this.setInteractive();

        // cambia el origen al centro a la derecha
        this.setOrigin(0, 0.5);

        // añade los eventos al botón
        this.set_event(name);

        // agregamos el botón a la escena dialogo
        scene.add.existing(this);
        this.scaleX = 0;
        this.alpha = 0;
        this.x = x - this.width;

        scene.tweens.add({
            targets: this,
            scaleX: 1,
            alpha: 1,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                this.tween_finnished(scene, x, y, texto);
            }
        });
    }

    tween_finnished(scene, x, y, texto) {
        this.setOrigin(1, 0.5);
        this.x = this.x + this.width;
        
        // agragamos el texto al botón y lo centramos (izquierda, centro)
        this.texto = new TextoDialogo(scene, this, this.width - 10, x - this.width / 2, y, texto, true, {}).setOrigin(0, 0.5);
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

    actualizar_texto(texto) {
        this.texto.actualizar_texto(texto);
    }

    stop_animation() {
        this.texto.stop_animation();
    }
}

export default BotonDialogo;