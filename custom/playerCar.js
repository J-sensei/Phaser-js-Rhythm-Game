/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/**
 * Player class, contains logic to hit note and detect lanes
 */
class PlayerCar extends Phaser.GameObjects.Sprite {
    /**
     * 
     * @param {Scene} scene Current scene reference
     * @param {number} x X position
     * @param {number} y Y position
     */
    constructor(scene, x, y) {
        super(scene, x, y, SpriteId.CAR_RUNNING).setOrigin(0.5);
        this.scene = scene
        this.setScale(2);
        this.setDepth(LayerConfig.PLAYER);
        this.play(AnimationId.CAR_RUNNING);

        this.initialPosition = new Phaser.Math.Vector2(x, y); // Remember the inital position, later might need to use it
        this.moveDistance = 60;

        // Both way to add it to physic calculation
        scene.physics.add.existing(this);
        //scene.physics.world.enableBody(this);
        scene.add.existing(this); // Add game object to the scene
        this.body.setSize(20, 12);
        this.body.offset.x = 125;
        this.body.offset.y = 42;

        this.isDownLane = true; // Default is down lane
        this.beating = false;
        this.holding = false;
        this.maxHp = 100;
        this.hp = this.maxHp;
    }

    /**
     * Take the damage to the player based on the note that hit the car
     * @param {Note} note Note that hit the player
     */
    damage(note) {
        if(this.hp < 0) return;
        switch(note.type) {
            case NoteType.NORMAL: case NoteType.END:
                this.hp -= 5;
                break;
            case NoteType.HOLD:
                this.hp -= 8;
                break;
            case NoteType.BIG_NOTE:
                this.hp -= 12;
                break;
        }
        this.hp = Phaser.Math.Clamp(this.hp, 0, this.maxHp);
    }

    /**
     * Heal the player based on the note
     * @param {Note} note Note reference
     */
    heal(note) {
        if(this.hp >= this.maxHp) return;
        switch(note.type) {
            case NoteType.NO_HIT: 
                this.hp += 10;
                break;
        }
        this.hp = Phaser.Math.Clamp(this.hp, 0, this.maxHp);
    }

    create() {
        // Get the keycodes for the control
        this.up1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.up2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.down1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.down2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        /** Time to allow player press two note at different lane, Only happen when the lane switching is true */
        this.gracePeriod = 0.05; // 0.5seconds
        this.currentGracePeriod = 0;
    }

    update() {
        this.beating = false; // Every frame reset the beating to false to have accurate beat judgement
        if(Phaser.Input.Keyboard.JustDown(this.up1) || Phaser.Input.Keyboard.JustDown(this.up2)) {
            this.swtichUp();
            this.beating = true;
        }

        if(Phaser.Input.Keyboard.JustDown(this.down1) || Phaser.Input.Keyboard.JustDown(this.down2)) {
            this.switchDown();
            this.beating = true;
        }

        if(this.down1.isDown || this.down2.isDown || this.up1.isDown || this.up2.isDown) {
            this.holding = true;
        } else {
            this.holding = false;
        }

        // Calculate grace period to determine which lane the player currently moving
        if(this.currentGracePeriod > 0) {
            //this.currentGracePeriod -= deltaTime;
            this.currentGracePeriod -= (game.loop.delta * 0.001);
        }
    }

    /**
     * Compare to check if the note is same with the player lane
     * @param {bool} down Is the note up or down
     * @returns Boolean
     */
    compareLane(down) {
        if(this.currentGracePeriod > 0) {
            return true;
        } else {
            return down === this.isDownLane;
        }
    }

    /** Switch to upper lane */
    switchDown() {
        if(!this.isDownLane) {
            this.currentGracePeriod = this.gracePeriod;
            this.lastTime = new Date().getTime();
        }

        this.y = this.initialPosition.y;
        this.isDownLane = true; // down lane
    }

    /** Switch to lower lane */
    swtichUp() {
        if(this.isDownLane) {
            this.currentGracePeriod = this.gracePeriod;
            this.lastTime = new Date().getTime();
        }

        this.y = this.initialPosition.y - this.moveDistance;
        this.isDownLane = false; // up lane
    }

    /**
     * Position where the note should be collide with the player car
     * @returns {Phaser.Math.Vector2} Position of the beat collider 
     */
    getBeatPosition() {
        return new Phaser.Math.Vector2(this.x + this.body.offset.x + 20, this.y + this.body.offset.y);
    }

    /** Debug string to show variables */
    getDebugString() {
        return "IsDownLane: " + this.isDownLane + ", Beating: " + this.beating + '\n' + "Holding: " + this.holding + " GracePeriod: " + this.currentGracePeriod.toFixed(2) + "\n" + "HP: " + this.hp;
    }
}