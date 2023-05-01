class HitText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, fontFamily, fontSize, color) {
        super(scene, x, y, text);
        this.setOrigin(0.5);
        this.scene = scene;
        this.initialY = y;

        if(fontFamily == null) {
            this.setFont("Bold 16px Silkscreen");
        } else {
            this.setFont(fontFamily);
        }

        if(fontSize == null) {
            this.setFontSize(16);
        } else {
            this.setFontSize(fontSize);
        }

        if(color != null) {
            this.setColor(color);
        }

        scene.add.existing(this);
    }

    destroyText() {
        let tween = this.scene.tweens.add({
            targets: this,
            ease: "Bounce.easeOut",
            y: this.y - 125,
            alpha: 0.7,
            duration: 500,
            repeat: 0,
            onComplete: function() {
                console.log("Text destroy");
                this.destroy();
            },
            callbackScope: this,
        });
    }
}