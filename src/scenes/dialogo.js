import { SCENE_DIALOGO } from '/src/data/scene_data.ts';
import { IMAGE_CUADRADO_DIALOGO, IMAGE_BOTON_DIALOGO, JSON_DIALOGO } from '/src/data/assets_data.ts';

import CuadroDialogo from "/src/gameObjects/cuadrado_dialogo.js";
import BotonDialogo from "/src/gameObjects/boton_dialogo.js";
// import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

class Dialogo extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_DIALOGO });
    }

    init(texto) {
        this.nombre_dialogo = texto;
        
        
        this.dialogo_data = this.cache.json.get(JSON_DIALOGO).Dialogo;
        console.log(this.dialogo_data);
    }

    create() {
        // Obtener dimensiones del juego
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        // Cuadro de diálogo
        this.cuadro_dialogo = new CuadroDialogo(this, this.width / 2, this.height - 150, IMAGE_CUADRADO_DIALOGO, this.dialogo_data[this.nombre_dialogo]['texto']);

        // Capturar tecla de espacio
        this.cursor = this.input.keyboard.createCursorKeys();

        // Añadir boton
        if (this.dialogo_data[this.nombre_dialogo]['opciones'] == true) {
            let i = 0;
            let pos_x = this.width - (this.width - this.cuadro_dialogo.width) / 2;
            let pos_y = this.height - this.cuadro_dialogo.height - 83;
            this.botons = [3];

            while (this.dialogo_data[this.nombre_dialogo]['opcion_' + String(i + 1)] != null) {
                this.botons[i] = new BotonDialogo(this, pos_x, pos_y, IMAGE_BOTON_DIALOGO, this.dialogo_data[this.nombre_dialogo]['opcion_' + String(i + 1)], this.dialogo_data[this.nombre_dialogo]['texto_' + String(i + 1)]);
                i++;

                if (i == 3) {
                    break;
                }
                pos_y -= this.botons[i - 1].height;
                console.log(this.botons[i - 1].height);
            }
        }
    }

    update() {
        if (this.cursor.space.isDown) {
            
        }
    }
}

export default Dialogo;
