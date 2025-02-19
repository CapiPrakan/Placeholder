class BotonDialogo extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type, name, texto) {
        super(scene, x, y, type);
        this.setInteractive();
        this.setOrigin(1, 0.5); // Cambia el origen al centro

        this.set_event(name);

        scene.add.existing(this);

        // Centrar el texto dentro del botón
        scene.add.text(x - this.width / 2, y, texto, {
            align: "center",
            fontFamily: 'Arial',
            fontSize: 32,
            color: '#000000',
            wordWrap: { width: this.width - 20, height: this.height - 10 }
        }).setOrigin(0.5, 0.5); // Cambia el origen al centro
    }

    set_event(name) {
        this.on("pointerdown", () => {
            console.log(name);
        });

        this.on("pointerover", () => {
            this.setTint(0x787878);
        });

        this.on("pointerout", () => {
            this.clearTint();
        });
    }
}

export default BotonDialogo;