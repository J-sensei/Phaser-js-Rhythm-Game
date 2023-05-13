class ProgressBar extends Phaser.GameObjects.Group {
    constructor(scene, x, y, fillSize, hex, scale) {
        super(scene);
        this.imageFill = scene.add.tileSprite(x, y, fillSize, 32, SpriteId.PROGRESS_FILL);
        this.imageFill.setOrigin(0);
        this.add(this.imageFill);
        if(scale != null)
            this.imageFill.setScale(scale);

        this.fillSize = fillSize;
        
        if(hex != null)
            this.imageFill.tint = Phaser.Display.Color.HexStringToColor(hex).color;
    }

    /**
     * 
     * @param {number} value 0 - 1
     */
    setValue(value) {
        const percent = Phaser.Math.Clamp(value, 0, 1);
        this.imageFill.width = percent * this.fillSize;
    }
}