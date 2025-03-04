import AssetsData from '/src/data/assets_data.js';
import BackgroundsPantallas from '/src/gameObjects/pantallas/backgrounds_pantallas.js';
import Protagonista from '/src/gameObjects/pantallas/interactuables/potagonista.js';
import ChangePantallaObject from '/src/gameObjects/pantallas/interactuables/change_pantalla_objects.js';

import { SCENE_PANTALLAS } from '/src/data/scene_data.ts';
import { EVENT_START_DIALOGO, EVENT_ANIMATION_INTRERACTUABLE_FINNISHED } from "/src/data/events_data.ts";

class Pantallas extends Phaser.Scene {
    constructor() {
        super({ key: SCENE_PANTALLAS });

        this.scene_play ;

        this.offset_x = 0;
        this.offset_y = 0;

        this.can_move = false;
        this.animation_finnished = false;

        this.interactuables_animations = {};
        
        this.assets_data = new AssetsData(this);
    }

    preload() {
        this.assets_data.cargar_backgrounds_pantallas();
        this.assets_data.cargar_personajes_dialogos();
        this.assets_data.cargar_img_collider();

    }

    init(pantalla) {
        this.assets_data.recargar_datos();

        this.pantalla_data = this.cache.json.get(this.assets_data.get_json_pantalla()).Pantallas;

        this.nombre_pantalla = pantalla;
    }

    create() {
        this.backgrounds_pantallas = this.create_backgrounds();

        this.protagonista = this.create_protgonista();

        this.npcs = this.create_npcs();

        this.change_pantallas_oibject = new ChangePantallaObject(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, 100, 300, true);

        // Agregar listener para el movimiento del ratón
        this.input.on('pointermove', this.onPointerMove, this);
        this.events.on(EVENT_START_DIALOGO, this.start_dialogo, this);
        this.events.on(EVENT_ANIMATION_INTRERACTUABLE_FINNISHED, this.on_animation_finnished, this);
    }

    create_backgrounds() {
        let background_name = this.pantalla_data[this.nombre_pantalla]['background'];
        let backgrounds = new BackgroundsPantallas(this, this.sys.game.config.width / 2, this.sys.game.config.height / 2, this.assets_data.get_background_pantallas(background_name));
        return backgrounds;
    }

    create_protgonista() {
        let nombre = this.pantalla_data[this.nombre_pantalla]['prota']['nombre'];
        let pose = this.pantalla_data[this.nombre_pantalla]['prota']['pose'];
        let pos_x = this.pantalla_data[this.nombre_pantalla]['prota']['pos_x'];
        let pos_y = this.pantalla_data[this.nombre_pantalla]['prota']['pos_y'];
        let size = this.pantalla_data[this.nombre_pantalla]['prota']['size'];
        let on_click = this.pantalla_data[this.nombre_pantalla]['prota']['on_click'];
        let delay = this.pantalla_data[this.nombre_pantalla]['prota']['delay'];
        let animation = this.pantalla_data[this.nombre_pantalla]['prota']['animation'];

        let personaje = this.assets_data.get_personaje_dialogos(nombre, pose);

        let protagonista = new Protagonista(this, pos_x, pos_y, personaje, size, delay, on_click, animation);

        this.interactuables_animations[personaje] = false;

        return protagonista;
    }

    create_npcs() {
        let npcs = this.pantalla_data[this.nombre_pantalla]['npcs'];
        let npcs_array = [];

        Object.keys(npcs).forEach((key) => {
            let nombre = npcs[key]['nombre'];
            let pose = npcs[key]['pose'];
            let pos_x = npcs[key]['pos_x'];
            let pos_y = npcs[key]['pos_y'];
            let size = npcs[key]['size'];
            let on_click = npcs[key]['on_click'];
            let delay = npcs[key]['delay'];
            let animation = npcs[key]['animation'];

            let personaje = this.assets_data.get_personaje_dialogos(nombre, pose);

            let npc = new Protagonista(this, pos_x, pos_y, personaje, size, delay, on_click, animation);
            this.interactuables_animations[personaje] = false;

            npcs_array.push(npc);
        });

        return npcs_array;
    }

    update() {
        if (this.can_move && this.animation_finnished) {
            let movimiento_x = 0;
            let movimiento_y = 0;

            if (Math.abs(this.movement_x + this.offset_x) < (this.backgrounds_pantallas.width - this.sys.game.config.width) / 2) {
                this.offset_x += this.movement_x;

                movimiento_x = this.movement_x;
            }

            if (Math.abs(this.movement_y + this.offset_y) < (this.backgrounds_pantallas.height - this.sys.game.config.height) / 2) {
                this.offset_y += this.movement_y;

                movimiento_y = this.movement_y;
            }

            this.move_objects(this.backgrounds_pantallas, movimiento_x, movimiento_y);
            this.move_objects(this.protagonista, movimiento_x, movimiento_y);

            this.npcs.forEach(npc => {
                this.move_objects(npc, movimiento_x, movimiento_y);
            });
        }
    }

    onPointerMove(pointer) {
        const margin = 300;
        const maxSpeed = 1;

        let moving_x = true;
        let moving_y = true;

        this.movement_x = 0;
        this.movement_y = 0;

        // Calcular el desplazamiento en función de la posición del ratón

        if (pointer.x < margin) {
            this.movement_x = maxSpeed * (1 - pointer.x / margin);
        } else if (pointer.x > this.sys.game.config.width - margin) {
            this.movement_x = -maxSpeed * (1 - (this.sys.game.config.width - pointer.x) / margin);
        } else {
            moving_x = false;
            this.movement_x = 0;
        }

        if (pointer.y < margin) {
            this.movement_y = maxSpeed * (1 - pointer.y / margin);
        } else if (pointer.y > this.sys.game.config.height - margin) {
            this.movement_y = -maxSpeed * (1 - (this.sys.game.config.height - pointer.y) / margin);
        } else {
            moving_y = false;
            this.movement_y = 0;
        }

        if (moving_x || moving_y) {
            this.can_move = true;
        } else {
            this.can_move = false;
        }
    }
    on_animation_start(interactuable) {
        this.animation_finnished = false;
    }

    on_animation_finnished(interactuable) {
        this.interactuables_animations[interactuable.name] = true;
        
        for (const key in this.interactuables_animations) {
            if (!this.interactuables_animations[key]) {
                return;
            }
        }

        this.animation_finnished = true;
    }

    max_movement() {
        if (this.backgrounds_pantallas.x > 0) {
            this.backgrounds_pantallas.x = 0;
        } else if (this.backgrounds_pantallas.x < this.sys.game.config.width - this.backgrounds_pantallas.width) {
            this.backgrounds_pantallas.x = this.sys.game.config.width - this.backgrounds_pantallas.width;
        }

        if (this.backgrounds_pantallas.y > 0) {
            this.backgrounds_pantallas.y = 0;
        } else if (this.backgrounds_pantallas.y < this.sys.game.config.height - this.backgrounds_pantallas.height) {
            this.backgrounds_pantallas.y = this.sys.game.config.height - this.backgrounds_pantallas.height;
        }
    }

    move_objects(objeto, x, y) {
        objeto.x += x;
        objeto.y += y;
    }

    start_dialogo(dialogo) {
        this.scene.stop();
    }
}

export default Pantallas;