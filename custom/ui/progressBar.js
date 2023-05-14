/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/** Progress bar UI */
class ProgressBar extends Phaser.GameObjects.Group {
    /**
     * 
     * @param {Scene} scene Current scene reference
     * @param {number} x X position
     * @param {number} y Y position
     * @param {number} fillSize Progress bar width
     * @param {string} hex Hex code 
     * @param {number} scale Scale value 
     */
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
     * Set the value to update the progress bar UI
     * @param {number} value 0 - 1
     */
    setValue(value) {
        const percent = Phaser.Math.Clamp(value, 0, 1);
        this.imageFill.width = percent * this.fillSize;
    }
}