class TextoDialogo extends Phaser.GameObjects.BitmapText {
    constructor(scene, cuadro_dialogo_width, x, y, texto, opciones = {}) {
        // Opciones por defecto para el BitmapText
        let opcionesPorDefecto = {
            fontSize: 32,
            align: "left",
            maxWidth: cuadro_dialogo_width - 20
        };

        // Mezclar opciones personalizadas con las predeterminadas
        opciones = { ...opcionesPorDefecto, ...opciones };

        // Llamar al constructor de BitmapText
        super(scene, x, y, "pixelFont", "", opciones.fontSize);

        // Ajustar el origen (centrado)
        this.setOrigin(0.5);

        // Agregar el objeto a la escena
        scene.add.existing(this);

        // Mostrar el texto con animación
        this.actualizarTexto(texto);
    }

    // Método para actualizar el texto con animación
    actualizarTexto(nuevoTexto) {
        this.animacion_texto(nuevoTexto);
    }

    // Método para animar el texto tipo máquina de escribir
    animacion_texto(texto) {
        let i = 0;
        let texto_animado = "";
        let texto_completo = texto;
        let intervalo = setInterval(() => {
            texto_animado += texto_completo[i];
            this.setText(texto_animado);
            i++;
            if (i === texto_completo.length) {
                clearInterval(intervalo);
            }
        }, 50);
    }
}

export default TextoDialogo;
