const JudgeConfig = {
    origin: 0.5,
    scale: 3,
    colWidth: 100,
    colHeight: 10,
    circleRadius: 20,
    circleIteration: 0.2,
    circleAplha: 0.65, 
    circleColor: "#eb4034",
    rotateDuration: 3500,
    perfectDistance: 40,
    greatDistance: 80,
    badDistance: 120,
    missDistance: 160,
}

class JudgeCollider extends Phaser.GameObjects.Sprite {
    /** Physic group for judge colliders */
    static JudgeColliders;

    constructor(scene, x, y) {
        super(scene, x, y); // Cincai create a sprite
        this.alpha = 0; // Make it invisible
        this.setOrigin(JudgeConfig.origin);
        this.setScale(JudgeConfig.scale);

        // Set collider here
        if(JudgeCollider.JudgeColliders == null) {
            JudgeCollider.JudgeColliders = scene.physics.add.group();
        }
        scene.add.existing(this);
        JudgeCollider.JudgeColliders.add(this);
        this.body.setSize(JudgeConfig.colWidth, JudgeConfig.colHeight);

        this.circle = scene.add.circle(x, y, JudgeConfig.circleRadius, Phaser.Display.Color.HexStringToColor(JudgeConfig.circleColor).color);
        this.circle.iterations = JudgeConfig.circleIteration;
        this.circle.alpha = JudgeConfig.circleAplha;
        let tween = scene.tweens.add({
            targets: this.circle,
            angle: this.circle.angle + 360,
            duration: JudgeConfig.rotateDuration,
            repeat: -1,
        });
        scene.add.existing(this.circle);
    }

    static Reset(scene) {
        if(JudgeCollider.JudgeColliders != null) {
            JudgeCollider.JudgeColliders.clear(); // Clear the judgement colliders physic group
        } else {
            // The collider group is null, need to create it
            JudgeCollider.JudgeColliders = scene.physics.add.group();
        }
    }
}