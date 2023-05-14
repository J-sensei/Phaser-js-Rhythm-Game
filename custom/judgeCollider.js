/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/** Configuration of judgement colliders */
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

/**
 * Judgement Collider to judge the performance when pressing a note
 */
class JudgeCollider extends Phaser.GameObjects.Sprite {
    /** Physic group for judge colliders */
    static JudgeColliders;

    /**
     * 
     * @param {Scene} scene Current scene reference
     * @param {number} x X position
     * @param {number} y Y position
     * @param {string} color Hex value
     */
    constructor(scene, x, y, color) {
        super(scene, x, y); // Cincai create a sprite
        this.alpha = 0; // Make it invisible
        this.setOrigin(JudgeConfig.origin);
        this.setScale(JudgeConfig.scale);

        // Set collider here
        if(JudgeCollider.JudgeColliders == null) {
            JudgeCollider.JudgeColliders = scene.physics.add.group();
        }
        scene.add.existing(this); // Add to scene to make it appear
        JudgeCollider.JudgeColliders.add(this);
        this.body.setSize(JudgeConfig.colWidth, JudgeConfig.colHeight);

        // Collider visual
        let circleColor;
        if(color == null) {
            circleColor = JudgeConfig.circleColor;
        } else {
            circleColor = color;
        }
        this.circle = scene.add.circle(x, y, JudgeConfig.circleRadius, Phaser.Display.Color.HexStringToColor(circleColor).color);
        this.circle.iterations = JudgeConfig.circleIteration; // Reduce iteration to make it like pentagon
        this.circle.alpha = JudgeConfig.circleAplha;

        // Make it rotate
        let tween = scene.tweens.add({
            targets: this.circle,
            angle: this.circle.angle + 360,
            duration: JudgeConfig.rotateDuration,
            repeat: -1,
        });
        scene.add.existing(this.circle); // Add to scene to make it appear

        // Add particle to the judge collider (Explode when hit note)
        this.emitter = scene.add.particles(x, y, ParticleKey.HIT_PARTICLE, {
            lifespan: 500,
            speed: { min: 300, max: 750 },
            scale: { start: 0.08, end: 0 },
            alpha: { start: 1, end: 0},
            gravityY: 1000,
            blendMode: 'ADD',
            tint: 0xff0000, // Red
            emitting: false,
        });
    }

    /**
     * Reset judgement colliders physic group for a new scene
     * @param {Scene} scene Current scene reference
     */
    static Reset(scene) {
        JudgeCollider.JudgeColliders = scene.physics.add.group();
    }
}