import { EVENT_DATOS_CARAGDOS } from "/src/data/events_data.ts";

class AssetsData {
    constructor(scene) {
        this.scene = scene;

        // datos json
        this.ASSETS = "Assets";

        this.PATH = "Path";
        this.PREFIX = "Prefix";
        this.EXTENSION = "Extension";

        this.IMAGES = "Images";
        this.JSON = "Json";

        this.DIALOGOS = "Dialogos";

        this.PERSONAJES = "Personajes";
        this.POSES = "Poses";

        // el main path
        let ASSETS_PATH = "/assets/"

        // prefijos y formatos
        this.IMG_PREFIX = "img_";
        this.FORMATO_IMAGEN = ".png";

        this.JSON_PREFIX = "json_";
        this.FORMATO_JSON = ".json";

        // los paths principales para cada asset
        this.IMAGE_PATH = ASSETS_PATH + "img/";
        this.JSON_PATH = ASSETS_PATH + "json/";

        this.inicializar_constantes_datos();
        this.inicializar_constantes_dialogos();
    }

    inicializar_constantes_datos() {
        // datos
        this.JSON_DATO = "data";
        this.JSON_DATO_PATH =  this.JSON_PATH + this.JSON_DATO + this.FORMATO_JSON;
    }
    
    // carga los datos (json)
    cargar_datos() {
        this.scene.load.json(this.JSON_PREFIX + this.JSON_DATO, this.JSON_DATO_PATH)
        
        // Agrega un evento 'filecomplete' para el JSON
        this.scene.load.once(`filecomplete-json-${this.JSON_PREFIX + this.JSON_DATO}`, () => {
            this.datos = this.scene.cache.json.get(this.JSON_PREFIX + this.JSON_DATO);
            this.datos_assets = this.datos.Assets;

            this.scene.events.emit(EVENT_DATOS_CARAGDOS);
        });

        // Inicia la carga de los datos
        this.scene.load.start();
    }

    get_json_dato() {
        return this.JSON_PREFIX + this.JSON_DATO;
    }

    // carga los dialogos (json)
    cargar_dialogos() {
        this.json_dialogo = this.datos_assets[this.JSON][this.PREFIX] + this.datos_assets[this.JSON][this.DIALOGOS]

        this.json_dialogo_path = this.datos_assets[this.JSON][this.PATH] + this.datos_assets[this.JSON][this.DIALOGOS] + this.datos_assets[this.JSON][this.EXTENSION]

        this.scene.load.json(this.json_dialogo, this.json_dialogo_path);
    }

    inicializar_constantes_dialogos() {
        // dialogo
        this.JSON_DIALOGO = "dialogo";
        this.JSON_DIALOGO_PATH =  this.JSON_PATH + this.JSON_DIALOGO + this.FORMATO_JSON;
    }

    get_json_dialogo() {
        return this.JSON_PREFIX + this.JSON_DIALOGO;
    }

    get_json_dialogo_path() {
        this.JSON_DIALOGO_PATH;
    }

    cargar_img_dialogos() {
        // path de los dialogos
        let DIALOGOS_PATH = this.IMAGE_PATH + "dialogos/";

        // cuadrado_dialogo
        this.CUADRADO_DIALOGO = "cuadrado_dialogo";
        this.IMAGE_CUADRADO_DIALOGO_PATH = DIALOGOS_PATH + this.CUADRADO_DIALOGO + this.FORMATO_IMAGEN;

        // boton_dialogo
        this.BOTON_DIALOGO = "boton_dialogo";
        this.IMAGE_BOTON_DIALOGO_PATH = DIALOGOS_PATH + this.BOTON_DIALOGO + this.FORMATO_IMAGEN;

        // cargamos los assets
        this._cargar_imagen(this.IMG_PREFIX + this.CUADRADO_DIALOGO, this.IMAGE_CUADRADO_DIALOGO_PATH)
        this._cargar_imagen(this.IMG_PREFIX + this.BOTON_DIALOGO, this.IMAGE_BOTON_DIALOGO_PATH)
    }

    get_cuadrado_dialogo() {
        return this.IMG_PREFIX + this.CUADRADO_DIALOGO;
    }
    get_cuadrado_dialogo_path() {
        return this.IMAGE_CUADRADO_DIALOGO_PATH;
    }

    get_boton_dialogo() {
        return this.IMG_PREFIX + this.BOTON_DIALOGO;
    }
    get_boton_dialogo_path() {
        return this.IMAGE_BOTON_DIALOGO_PATH;
    }

    // carga los personajes
    cargar_personajes() {
        // path del persoanje
        let PERSONAJES_PATH = this.IMAGE_PATH + "personajes/";

        // PASOS A SEGUIR:
        // ----------------------------------
        // 1. agregar / quitar las poses
        // 2. agregar / quitar los personajes
        // 3. añadir o quitar los personajes al diccionario
        // ----------------------------------

        // 1. EDIT - agregar o quitar las poses que añadamos o quitemos
        let PERSONAJES_POSES = [
            "normal",
            "triste",
            "enfado",
            "alegre",
        ]
        
        // 2. EDIT - agregar o quitar los personajes
        this.PROTA = "prota"
        this.VERONICA = "veronica"

        this.PERSONAJE_DIC = { }

        // 3. EDIT - añadiro quitar los personajes al diccionario
        this.PERSONAJE_DIC[this.PROTA] = this.IMG_PREFIX + this.PROTA;
        this.PERSONAJE_DIC[this.VERONICA] = this.IMG_PREFIX + this.VERONICA;
       
        Object.entries(this.PERSONAJE_DIC).forEach(([key, value]) => {
            for (let i = 0; i < PERSONAJES_POSES.length; i++) {
                let imagePath = PERSONAJES_PATH + key + "/" + key + "_" + PERSONAJES_POSES[i] + this.FORMATO_IMAGEN;
                this._cargar_imagen(value + "_" + PERSONAJES_POSES[i], imagePath);
            } 
        });
    }

    // carga los fondos
    cargar_fondos() {
        // path de los fondos
        this.BACKGROUND_PATH = this.IMAGE_PATH + "backgrounds/";
        
        // PASOS A SEGUIR:
        // ----------------------------------
        // 1. agregar / quitar los fondos
        // 2. añadir o quitar los fondos al diccionario
        // ----------------------------------

        // 1. EDIT - agregar o quitar los fondos
        let FONDOS = [
            "clase",
            "salon"
        ]
    }

    _cargar_imagen(key, url) {
        this.scene.load.image(key, url);
    }
}

export default AssetsData;