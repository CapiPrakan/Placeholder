import CuadroDialogo from "/src/gameObjects/cuadrado_dialogo.js";
import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

class ScenePlay extends Phaser.Scene {
    constructor() {
        super({ key: "ScenePlay" });
    }

    preload() {
        // Cargar la fuente Bitmap
        this.load.bitmapFont("pixelFont", "assets/font/font.TTF");
    }

    create() {
        // Obtener dimensiones del juego
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        this.texto1 = "[red]Hola, soy un [blue]cuadro de diálogo";
        this.texto2 = "[green]¡Ahora el texto ha cambiado!";

        // Cuadro de diálogo
        this.cuadro_dialogo = new CuadroDialogo(this, this.width / 2, this.height - 150, "cuadrado_dialogo");

        // Crear el texto usando BitmapText
        // this.texto = new TextoDialogo(this, this.cuadro_dialogo.width, this.width / 2, this.height - 150, this.texto1, {});

        // Capturar tecla de espacio
        this.cursor = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.cursor.space.isDown) {
            // this.texto.actualizarTexto(this.texto2);
        }
    }
}

export default ScenePlay;
