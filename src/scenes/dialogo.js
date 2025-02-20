import { SCENE_DIALOGO } from '/src/data/scene_data.ts';
import { IMAGE_CUADRADO_DIALOGO, IMAGE_BOTON_DIALOGO, JSON_DIALOGO } from '/src/data/assets_data.ts';
import { EVENT_TEXTO_DIALOGO } from '/src/data/events_data.ts';

import CuadroDialogo from "/src/gameObjects/cuadrado_dialogo.js";
import BotonDialogo from "/src/gameObjects/boton_dialogo.js";
// import TextoDialogo from "/src/gameObjects/texto_dialogo.js";

class Dialogo extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_DIALOGO });

        // this.ee = new Phaser.Events.EventEmitter();
    }

    init(texto) {
        this.nombre_dialogo = texto;
        this.dialogo_data = this.cache.json.get(JSON_DIALOGO).Dialogo;
        
        // this.events.on(EVENT_TEXTO_DIALOGO, this.on_texto_dialogo, this);
        
        this.next_text = false;
    }

    create() {
        // Obtener dimensiones del juego
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        // Cuadro de diálogo
        this.cuadro_dialogo = new CuadroDialogo(this, this.width / 2, this.height - 150, IMAGE_CUADRADO_DIALOGO, this.dialogo_data[this.nombre_dialogo]['texto']);

        // Capturar tecla de espacio
        this.cursor = this.input.keyboard.createCursorKeys();

        this.añadir_botones();
    }

    async añadir_botones() {
        if (this.dialogo_data[this.nombre_dialogo]['opciones'] == true) {
            let i = 0;
            let pos_x = this.width - (this.width - this.cuadro_dialogo.width) / 2;
            let pos_y = this.height - this.cuadro_dialogo.height - 83;
            this.botons = [];
    
            while (this.dialogo_data[this.nombre_dialogo]['opcion_' + String(i + 1)] != null) {
    
                // Esperar a que el evento 'EVENT_TEXTO_DIALOGO' ocurra
                await this.esperar_evento(EVENT_TEXTO_DIALOGO);
    
                // Crear el botón
                this.botons[i] = new BotonDialogo(
                    this, pos_x, pos_y, IMAGE_BOTON_DIALOGO, 
                    this.dialogo_data[this.nombre_dialogo]['opcion_' + String(i + 1)], 
                    this.dialogo_data[this.nombre_dialogo]['texto_' + String(i + 1)]
                );
    
                i++;
                if (i == 3) break; // Máximo de 3 botones
    
                pos_y -= this.botons[i - 1].height;
            }
        }
    }
    
    // Función que devuelve una Promesa que espera al evento EVENT_TEXTO_DIALOGO
    esperar_evento(evento) {
        return new Promise(resolve => {
            this.events.once(evento, () => {
                resolve();
            });
        });
    }
    

    update() {
        if (this.cursor.space.isDown) {
            
        }
    }
}

export default Dialogo;
