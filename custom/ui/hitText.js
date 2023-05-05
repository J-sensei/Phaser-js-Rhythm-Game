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

    destroyText(duration) {
        let d;
        if(duration == null) {
            d = 500;
        } else {
            d = duration;
        }

        let tween = this.scene.tweens.add({
            targets: this,
            ease: "Bounce.easeOut",
            y: this.y - 125,
            alpha: 0.7,
            scale: 0.7,
            duration: d,
            repeat: 0,
            onComplete: function() {
                console.log("Text destroy");
                this.destroy();
            },
            callbackScope: this,
        });
    }

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
            text.destroyText(900);
        else
            text.destroyText();
    }
}