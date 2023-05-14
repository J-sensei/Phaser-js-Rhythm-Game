/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/**
 * Text game object when note is destroy
 */
class HitText extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, fontFamily, fontSize, color) {
        super(scene, x, y, text);
        this.setOrigin(0.5);
        this.setDepth(LayerConfig.UI);
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

    /**
     * Destroy the text when hit a note
     * @param {number} duration Tween duration
     */
    destroyText(duration) {
        let d;
        if(duration == null) {
            d = 500;
        } else {
            d = duration;
        }

        const tween = this.scene.tweens.add({
            targets: this,
            ease: "Bounce.easeOut",
            y: this.y - 125,
            alpha: 0.7,
            scale: 0.7,
            duration: d,
            repeat: 0,
            onComplete: function() {
                //console.log("Text destroy");
                this.destroy();
            },
            callbackScope: this,
        });
    }

    /**
     * Destroy the text using tween
     * @param {string} ease Tween ease type
     * @param {number} duration Tween duration
     * @param {number} y Move to target y position
     * @param {number} alpha Transparency 
     * @param {number} scale Scale value
     */
    tweenDestroy(ease, duration, y, alpha, scale) {
        let easeType = "Linear";
        if(ease != null) easeType = ease;
        const targetX = this.y + y;

        const tween = this.scene.tweens.add({
            targets: this,
            ease: easeType,
            y: targetX,
            alpha: alpha,
            scale: scale,
            duration: duration,
            repeat: 0,
            onComplete: function() {
                this.destroy();
            },
            callbackScope: this,
        });
    }

    /**
     * Instantiate count down text
     * @param {Scene} scene Current scene reference
     * @param {string} text Text value
     * @param {number} fontSize Font size
     * @param {string} color Hex code
     * @param {number} duration Tween duration
     * @returns 
     */
    static CountDownTextInstantiate(scene, text, fontSize, color, duration) {
        const t = new HitText(scene, game.config.width / 2, game.config.height / 2, text, null, fontSize, color);
        let d = 600;
        if(duration != null) d = duration;
        t.tweenDestroy("Linear", d, -100, 0, 0.5);

        return t;
    }

    /**
     * Instantiate an hit text when a note it hit by player
     * @param {Scene} scene Current scene reference
     * @param {Note} note Note reference
     */
    static NoteHitInstantiate(scene, note) {
        const perfectColor = "#f55d92";
        const greatColor = "#cf69cf";
        const badColor = "#8a668c";
        const missColor = "#6c668c";

        let fontSize;
        let color;

        switch(note.result) {
            case NoteHitResult.PERFECT: 
                color = perfectColor;
                fontSize = 36;
                break;
            case NoteHitResult.GREAT: 
                color = greatColor;
                fontSize = 36;
                break;
            case NoteHitResult.BAD: 
                color = badColor;
                fontSize = 24;
                break;
            case NoteHitResult.MISS: 
                color = missColor;
                fontSize = 24;
                break;
            default:
                // White color
                break;
        }

        if(note.type === NoteType.BIG_NOTE && !(note.result === NoteHitResult.BAD || note.result === NoteHitResult.MISS)) {
            fontSize *= 1.8;
        }

        let text;
        if(note.down) {
            text = new HitText(scene, JudgementPositions[1].x, JudgementPositions[1].y, note.result, null, fontSize);
        } else {
            text = new HitText(scene, JudgementPositions[0].x, JudgementPositions[0].y, note.result, null, fontSize);
        }

        text.setColor(color);

        if(note.type === NoteType.BIG_NOTE && !(note.result === NoteHitResult.BAD || note.result === NoteHitResult.MISS))
            text.destroyText(900); // Big note will have longer duration
        else
            text.destroyText(); // Else will just follow the default duration
    }
}