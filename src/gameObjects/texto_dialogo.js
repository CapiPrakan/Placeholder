class TextoDialogo extends Phaser.GameObjects.Text {
    constructor(scene, cuadro_dialogo_width, x, y, texto, botones, opciones = {}) {
        // Opciones por defecto para el Text
        let opcionesPorDefecto = {
            fontSize: "32px",
            fontFamily: "Arial",
            color: "#000000",
            align: "left",
            lineSpacing: 10,
            wordWrap: { width: cuadro_dialogo_width - 20 },
        };

        // Mezclar opciones personalizadas con las predeterminadas
        opciones = { ...opcionesPorDefecto, ...opciones };

        // Llamar al constructor de Text
        super(scene, x, y, "", opciones);

        // Ajustar el origen (centrado)
        this.setOrigin(0, 0);

        if (botones) {
            let texto_final = scene.add.text(this.x, this.y, texto, opcionesPorDefecto);
            
            console.log(texto_final.width);
            console.log(this.x);
            this.x -= texto_final.width / 2;
            texto_final.destroy();
        }

        // Agregar el objeto a la escena
        scene.add.existing(this);

        // Mostrar el texto con animación
        this.actualizarTexto(texto);
    }

    // Método para actualizar el texto con animación
    actualizarTexto(nuevoTexto) {
        this.animacion_texto(nuevoTexto);
    }

    // Método para animar el texto tipo máquina de escribir con colores aleatorios
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
