import { EVENT_DATOS_CARAGDOS } from "/src/data/events_data.ts";

// ------------------------------------------------------------- //
//   esta función se encarga de cargar los datos de los assets   //
// ------------------------------------------------------------- //
class AssetsData {
    constructor(scene) {
        this.scene = scene;

        // estos parametros corresponden a los nombres de las keys en el json
        this.ASSETS = "Assets";

        this.PATH = "Path";
        this.PREFIX = "Prefix";
        this.EXTENSION = "Extension";

        this.IMAGES = "Images";
        this.JSON = "Json";

        this.DIALOGOS = "Dialogos";

        this.PERSONAJES = "Personajes";
        this.POSES = "Poses";

        this.BACKGROUNDS = "Backgrounds";

        // prefijos y formatos
        this.IMG_PREFIX = "img_";
        this.FORMATO_IMAGEN = ".png";

        this.JSON_PREFIX = "json_";
        this.FORMATO_JSON = ".json";

        // el path principal para descargar el json
        this.JSON_PATH = "/assets/json/";

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

    // vuelve a hacer load del dato
    recargar_datos() {
        this.datos = this.scene.cache.json.get(this.JSON_PREFIX + this.JSON_DATO);
        if (this.datos) {
            this.datos_assets = this.datos.Assets;
        }
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
        let DIALOGOS_PATH = this.datos_assets[this.IMAGES][this.DIALOGOS][this.PATH];

        // cuadrado_dialogo
        this.CUADRADO_DIALOGO = this.datos_assets[this.IMAGES][this.DIALOGOS].CuadradoDialogo;

        // boton_dialogo
        this.BOTON_DIALOGO = this.datos_assets[this.IMAGES][this.DIALOGOS].BotonDialogo;

        // cargamos los assets
        this._cargar_imagen(this.IMG_PREFIX + this.CUADRADO_DIALOGO, DIALOGOS_PATH + this.CUADRADO_DIALOGO + this.FORMATO_IMAGEN)
        this._cargar_imagen(this.IMG_PREFIX + this.BOTON_DIALOGO, DIALOGOS_PATH + this.BOTON_DIALOGO + this.FORMATO_IMAGEN)
    }

    get_cuadrado_dialogo() {
        return this.IMG_PREFIX + this.CUADRADO_DIALOGO;
    }

    get_boton_dialogo() {
        return this.IMG_PREFIX + this.BOTON_DIALOGO;
    }

    // carga los personajes
    cargar_personajes() {
        let PERSONAJES_PATH = this.datos_assets[this.IMAGES][this.PERSONAJES][this.PATH];

      
        let PERSONAJES_POSES = this.datos_assets[this.IMAGES][this.PERSONAJES][this.POSES];
        let PERSONAJES = this.datos_assets[this.IMAGES][this.PERSONAJES][this.PERSONAJES];
        
        for (let i = 0; i < PERSONAJES.length; i++) {
            for (let j = 0; j < PERSONAJES_POSES.length; j++) {
                let img_name = PERSONAJES[i] + "_" + PERSONAJES_POSES[j]
                let imagePath = PERSONAJES_PATH + PERSONAJES[i] + "/" + img_name + this.FORMATO_IMAGEN;
                this._cargar_imagen(this.IMG_PREFIX + img_name, imagePath);
            }
        }
    }

    get_personaje(persoanje, pose) {
        return this.IMG_PREFIX + persoanje + "_" + pose;
    }

    // carga los fondos
    cargar_backgrounds() {
        let BACKGROUND_PATH = this.datos_assets[this.IMAGES][this.BACKGROUNDS][this.PATH];

      
        let BACKGROUNDS = this.datos_assets[this.IMAGES][this.BACKGROUNDS][this.BACKGROUNDS];
        
        for (let i = 0; i < BACKGROUNDS.length; i++) {
            let imagePath = BACKGROUND_PATH +  BACKGROUNDS[i] + this.FORMATO_IMAGEN;
            this._cargar_imagen(this.IMG_PREFIX + BACKGROUNDS[i], imagePath);
        }
    }

    get_background(background) {
        return this.IMG_PREFIX + background;
    }

    _cargar_imagen(key, url) {
        this.scene.load.image(key, url);
    }
}

export default AssetsData;