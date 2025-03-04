import InteractuableDefault from "/src/gameObjects/pantallas/interactuable_default.js";
import AssetsData from '/src/data/assets_data.js';

import { EVENT_START_DIALOGO, EVENT_START_PANTALLA } from "/src/data/events_data.ts";

class ChangePantallaObject extends InteractuableDefault {
    constructor(scene, x, y, size_x, size_y, on_click) {
        let asset_data =  new AssetsData(scene);
        asset_data.recargar_datos();
        console.log(asset_data.get_collider());
        super(scene, x, y, asset_data.get_collider(), size_x, size_y, 0, on_click, null);

        this.can_be_clicked = true;
    }

    // Puedes sobrescribir métodos de la clase padre si es necesario
    set_events() {
        super.set_events(); // Llama al método de la clase padre

        // Agrega eventos adicionales o modifica los existentes
        this.on("pointerdown", () => {
            console.log("ChangePantallaObject click");
        });
    }
}

export default ChangePantallaObject;