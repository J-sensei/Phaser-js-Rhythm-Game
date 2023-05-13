class ProgressBar extends Phaser.GameObjects.Group {
    constructor(scene, x, y, fillSize, hex) {
        super(scene);
        this.imageFill = scene.add.tileSprite(x, y, fillSize, 32, SpriteId.PROGRESS_FILL)
        this.add(this.imageFill);

        this.fillSize = fillSize;
        
        if(hex != null)
            this.imageFill.tint = Phaser.Display.Color.HexStringToColor(hex).color;
        // this.imageFill.width = 
        // this.image = this.create(0, 0, SpriteId.PROGRESS_FILL);
        // this.image.x = 0;

        // const width = 32;
        // this.fillScale = game.config.width / this.image.width;
        // this.image.scaleX = this.fillScale;
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