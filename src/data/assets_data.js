class AssetsData {
    constructor(scene) {
        this.scene = scene;

        // el main path
        let ASSETS_PATH = "/assets/"

        // prefijos y formatos
        this.IMG_PREFIX = "img_";
        this.FORMATO_IMAGEN = ".png";

        // los paths principales para cada asset
        this.IMAGE_PATH = ASSETS_PATH + "img/";
        this.JSON_PATH = ASSETS_PATH + "json/";

    }

    cargar_dialogos() {
        let DIALOGOS_PATH = this.IMAGE_PATH + "dialogos/";

        let CUADRADO_DIALOGO = "cuadrado_dialogo";
        this.IMAGE_CUADRADO_DIALOGO_PATH = DIALOGOS_PATH + CUADRADO_DIALOGO + this.FORMATO_IMAGEN;

        let BOTON_DIALOGO = "boton_dialogo";
        this.IMAGE_BOTON_DIALOGO_PATH = DIALOGOS_PATH + BOTON_DIALOGO + this.FORMATO_IMAGEN;

        console.log("cuadro: ", this.IMG_PREFIX + CUADRADO_DIALOGO);
        console.log("boton: ", this.IMG_PREFIX + BOTON_DIALOGO);

        this._verificar_y_cargar_imagen(this.IMG_PREFIX + CUADRADO_DIALOGO, this.IMAGE_CUADRADO_DIALOGO_PATH)
        this._verificar_y_cargar_imagen(this.IMG_PREFIX + BOTON_DIALOGO, this.IMAGE_BOTON_DIALOGO_PATH)
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
                this._verificar_y_cargar_imagen(value + "_" + PERSONAJES_POSES[i], imagePath);
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

    _verificar_y_cargar_imagen(key, url) {
        this.scene.load.image(key, url);
    }
}

export default AssetsData;