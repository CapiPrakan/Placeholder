import { SCENE_DIALOGO } from '/src/data/scene_data.ts';
import { IMAGE_CUADRADO_DIALOGO, IMAGE_CUADRADO_DIALOGO_PATH, IMAGE_BOTON_DIALOGO, IMAGE_BOTON_DIALOGO_PATH, JSON_DIALOGO } from '/src/data/assets_data.ts';
import { EVENT_TEXTO_DIALOGO } from '/src/data/events_data.ts';

import CuadroDialogo from "/src/gameObjects/cuadrado_dialogo.js";
import BotonDialogo from "/src/gameObjects/boton_dialogo.js";
import Personaje from "/src/gameObjects/personaje.js";

class Dialogo extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_DIALOGO });
    }

    init(texto) {
        // inicializar variables
        this.texto_finalizado = false;
        this.nombre_dialogo = texto;
        this.dialogo_data = this.cache.json.get(JSON_DIALOGO).Dialogo;
    }

    preload() {
        // carga de imágenes
        this.load.image(IMAGE_CUADRADO_DIALOGO, IMAGE_CUADRADO_DIALOGO_PATH);
        this.load.image(IMAGE_BOTON_DIALOGO, IMAGE_BOTON_DIALOGO_PATH);
    }

    create() {
        // Obtener dimensiones del juego
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;

        // Cuadro de diálogo
        this.cuadro_dialogo = new CuadroDialogo(this, this.width / 2, this.height - 150, IMAGE_CUADRADO_DIALOGO, this.dialogo_data[this.nombre_dialogo]['texto']);

        // Capturar tecla de espacio
        this.cursor = this.input.keyboard.createCursorKeys();

        // añade los botones, en caso de que haya opciones
        if (this.dialogo_data[this.nombre_dialogo]['opciones'] == true) {
            this.añadir_botones();
        }

        let personaje_x = this.cuadro_dialogo.x - this.cuadro_dialogo.width / 4 - 50;
        let personaje_y = this.cuadro_dialogo.y - this.cuadro_dialogo.height / 2;
        this.personaje = new Personaje(this, personaje_x, personaje_y, this.dialogo_data[this.nombre_dialogo]['npc'], this.dialogo_data[this.nombre_dialogo]['pose']);

        // Agrega un evento de clic al objeto input de la escena
        this.input.on('pointerdown', this.onClick, this);
    }

    // función asíncrona que añade los botones de diálogo
    async añadir_botones() {
        let i = 0;
        let pos_x = this.width - (this.width - this.cuadro_dialogo.width) / 2;
        let pos_y = this.height - this.cuadro_dialogo.height - 83;
        this.botons = [];

        // mientras haya opciones
        while (this.dialogo_data[this.nombre_dialogo]['opcion_' + String(i + 1)] != null) {

            // esperar a que el evento 'EVENT_TEXTO_DIALOGO' ocurra
            await this.esperar_evento(EVENT_TEXTO_DIALOGO);

            // crear el botón
            this.botons[i] = new BotonDialogo(
                this, pos_x, pos_y, IMAGE_BOTON_DIALOGO, 
                this.dialogo_data[this.nombre_dialogo]['opcion_' + String(i + 1)], 
                this.dialogo_data[this.nombre_dialogo]['texto_' + String(i + 1)]
            );

            i++;
            if (i == 3) break; // máximo de 3 botones

            // actualizar posición
            pos_y -= this.botons[i - 1].height;
        }

        this.texto_finalizado = true;
    }
    
    // función que devuelve una Promesa que espera al evento EVENT_TEXTO_DIALOGO
    esperar_evento(evento) {
        return new Promise(resolve => {
            this.events.once(evento, () => {
                resolve();
            });
        });
    }

    onClick() {
        if (!this.texto_finalizado && this.dialogo_data[this.nombre_dialogo]['opciones']) {
            if (this.dialogo_data[this.nombre_dialogo]['opcion_1'] == "FIN") {
                this.scene.stop();
            }
            this.cuadro_dialogo.actualizar_texto(this.dialogo_data[this.nombre_dialogo]['opcion_1']);
        } else {
            if (!this.cuadro_dialogo.texto_finnished) {
                this.cuadro_dialogo.stop_animation();
            } else {
                if (this.botons.length > 0) {
                    this.botons[this.botons.length - 1].stop_animation();
                }
            }
        }
    }
}

export default Dialogo;