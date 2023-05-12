/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/


class PlayerCar extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, SpriteId.CAR_RUNNING).setOrigin(0.5);
        this.scene = scene
        this.setScale(2);
        this.play(AnimationId.CAR_RUNNING);

        this.initialPosition = new Phaser.Math.Vector2(x, y); // Remember the inital position, later might need to use it
        this.moveDistance = 60;

        // Both way to add it to physic calculation
        scene.physics.add.existing(this);
        //scene.physics.world.enableBody(this);
        scene.add.existing(this); // Add game object to the scene
        this.body.setSize(20, 12);
        this.body.offset.x = 70;
        this.body.offset.y = 40;

        this.isDownLane = true; // Default is down lane
        this.beating = false;
        this.holding = false;
    }

    create() {
        // Get the keycodes for the control
        this.up1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.up2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.down1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.down2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        /** Time to allow player press two note at different lane, Only happen when the lane switching is true */
        this.gracePeriod = 0.25; // 0.5seconds
        this.currentGracePeriod = 0;
        this.lastTime = 0;
    }

    update() {
        this.beating = false;
        // if(Phaser.Input.Keyboard.JustDown(this.switchLaneKey) || Phaser.Input.Keyboard.JustDown(this.switchLaneKey2)) {
        //     if(this.isDownLane) {
        //         this.y = this.initialPosition.y - this.moveDistance;
        //         this.isDownLane = false; // up lane
        //     } else {
        //         this.y = this.initialPosition.y;
        //         this.isDownLane = true; // down lane
        //     }
        // }
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

        if(this.currentGracePeriod > 0) {
            const t = new Date().getTime();
            const deltaTime = (t * 0.001) - (this.lastTime * 0.001);
            this.currentGracePeriod -= deltaTime;
            this.lastTime = t;
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

    switchDown() {
        if(!this.isDownLane) {
            this.currentGracePeriod = this.gracePeriod;
            this.lastTime = new Date().getTime();
        }

        this.y = this.initialPosition.y;
        this.isDownLane = true; // down lane
    }

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

    getDebugString() {
        return "IsDownLane: " + this.isDownLane + ", Beating: " + this.beating + '\n' + "Holding: " + this.holding + " GracePeriod: " + this.currentGracePeriod.toFixed(2);
    }
}