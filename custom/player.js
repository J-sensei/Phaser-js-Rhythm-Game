/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/** Old class, don't use already */
class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, spriteId.PLAYER_RUN).setOrigin(0.5);
        this.scene = scene
        this.setScale(3);
        this.play(AnimationId.PLAYER_RUN);

        this.initialPosition = new Phaser.Math.Vector2(x, y); // Remember the inital position, later might need to use it
        this.jumpDistance = 300;
        this.maxHeight = this.initialPosition.y + 300;

        // Both way to add it to physic calculation
        scene.physics.add.existing(this);
        //scene.physics.world.enableBody(this);
        scene.add.existing(this); // Add game object to the scene
    }

    /** Initialize neccessary variables for the player
     */
    create() {
        // Get the keycodes for the control
        this.downAtk1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.downAtk2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        this.upAtk1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.upAtk2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        // Initalize variables
        /** Check if the animation is currently playing */
        this.animPlaying = true; // Set to true by default as player is running
        console.log(this.anims.isPlaying + " " + this.anims.currentAnim.key);

        this.atkDown = false;
        this.atkUp = false;
        
    }

    update() {
        // Check inputs for different actions
        // Need to make sure player can only press another attack only if the current attack animation is finish playing
        if(Phaser.Input.Keyboard.JustDown(this.downAtk1) || Phaser.Input.Keyboard.JustDown(this.downAtk2)) {
            this.downAttack();
        }
        if(Phaser.Input.Keyboard.JustDown(this.upAtk1) || Phaser.Input.Keyboard.JustDown(this.upAtk2)) {
            this.upAttack();
        }
        //  else if ((Phaser.Input.Keyboard.JustDown(this.downAtk1) && Phaser.Input.Keyboard.JustDown(this.upAtk1)) ||
        //             (Phaser.Input.Keyboard.JustDown(this.downAtk2) && Phaser.Input.Keyboard.JustDown(this.upAtk2)) ||
        //             (Phaser.Input.Keyboard.JustDown(this.downAtk1) && Phaser.Input.Keyboard.JustDown(this.upAtk2)) ||
        //             (Phaser.Input.Keyboard.JustDown(this.downAtk2) && Phaser.Input.Keyboard.JustDown(this.upAtk1))) {
        //     this.bothAttack();
        // }

        // Flag attack to false
        if(!this.anims.isPlaying) {
            // this.atkDown = false;
            // this.atkUp = false;

            // Back to running
            this.play(AnimationId.PLAYER_RUN);
            this.y = this.initialPosition.y
        }

        // if(this.y > this.maxHeight + 50 || this.y < this.initialPosition.y + 50) this.body.setVelocityY(0);
    }

    downAttack() {
        // Animation not playing OR player is running (no attack currently)
        if(!this.anims.isPlaying || this.anims.currentAnim.key === AnimationId.PLAYER_RUN) {
            this.play(animationId.playerAttack1); // Attack down
            this.atkDown = true; // Flag to true
            this.atkUp = false; // Make sure player not attack up anymore
            //this.body.setVelocityY(this.jumpVelocity);
            this.y = this.initialPosition.y;
        } else if(this.anims.isPlaying){
            this.bothAttack();
        }
    }

    upAttack() {
        // Animation not playing OR player is running (no attack currently)
        if(!this.anims.isPlaying || this.anims.currentAnim.key === AnimationId.PLAYER_RUN) {
            this.play(AnimationId.PLAYER_ATTACK2); // Attack down
            this.atkDown = false; // Flag to true
            this.atkUp = true; // Make sure player not attack up anymore
            //this.body.setVelocityY(-this.jumpVelocity);
            this.y = this.initialPosition.y - this.jumpDistance;
        } else if(this.anims.isPlaying){
            this.bothAttack();
        }
    }

    bothAttack() {
        // Animation not playing OR player is running (no attack currently)
        if(!this.anims.isPlaying || this.anims.currentAnim.key === AnimationId.PLAYER_RUN) {
            this.play(AnimationId.PLAYER_ATTACK2); // Attack down
            this.atkDown = true; // Flag to true
            this.atkUp = true; // Make sure player not attack up anymore
            //this.body.setVelocityY(-this.jumpVelocity);
            this.y = this.initialPosition.y - (this.jumpDistance / 2);
        }
    }

    getAttackDebug() {
        return "Up: " + this.atkUp + " Down: " + this.atkDown;
    }
}

// class Player extends Phaser.GameObjects.Sprite {
//     constructor(scene, x, y) {
//         super(scene, x, y, spriteId.playerRun).setOrigin(0.5);
//         this.scene = scene
//         this.setScale(3);
//         this.play(animationId.playerRun);

//         this.initialPosition = new Phaser.Math.Vector2(x, y); // Remember the inital position, later might need to use it
//         this.jumpDistance = 300;
//         this.maxHeight = this.initialPosition.y + 300;

//         // Both way to add it to physic calculation
//         scene.physics.add.existing(this);
//         //scene.physics.world.enableBody(this);
//         scene.add.existing(this); // Add game object to the scene
//     }

//     /** Initialize neccessary variables for the player
//      */
//     create() {
//         // Get the keycodes for the control
//         this.downAtk1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
//         this.downAtk2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
//         this.upAtk1 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
//         this.upAtk2 = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

//         // Initalize variables
//         /** Check if the animation is currently playing */
//         this.animPlaying = true; // Set to true by default as player is running
//         console.log(this.anims.isPlaying + " " + this.anims.currentAnim.key);

//         this.atkDown = false;
//         this.atkUp = false;
        
//     }

//     update() {
//         // Check inputs for different actions
//         // Need to make sure player can only press another attack only if the current attack animation is finish playing
//         if(Phaser.Input.Keyboard.JustDown(this.downAtk1) || Phaser.Input.Keyboard.JustDown(this.downAtk2)) {
//             this.downAttack();
//         }
//         if(Phaser.Input.Keyboard.JustDown(this.upAtk1) || Phaser.Input.Keyboard.JustDown(this.upAtk2)) {
//             this.upAttack();
//         }
//         //  else if ((Phaser.Input.Keyboard.JustDown(this.downAtk1) && Phaser.Input.Keyboard.JustDown(this.upAtk1)) ||
//         //             (Phaser.Input.Keyboard.JustDown(this.downAtk2) && Phaser.Input.Keyboard.JustDown(this.upAtk2)) ||
//         //             (Phaser.Input.Keyboard.JustDown(this.downAtk1) && Phaser.Input.Keyboard.JustDown(this.upAtk2)) ||
//         //             (Phaser.Input.Keyboard.JustDown(this.downAtk2) && Phaser.Input.Keyboard.JustDown(this.upAtk1))) {
//         //     this.bothAttack();
//         // }

//         // Flag attack to false
//         if(!this.anims.isPlaying) {
//             // this.atkDown = false;
//             // this.atkUp = false;

//             // Back to running
//             this.play(animationId.playerRun);
//             this.y = this.initialPosition.y
//         }

//         // if(this.y > this.maxHeight + 50 || this.y < this.initialPosition.y + 50) this.body.setVelocityY(0);
//     }

//     downAttack() {
//         // Animation not playing OR player is running (no attack currently)
//         if(!this.anims.isPlaying || this.anims.currentAnim.key === animationId.playerRun) {
//             this.play(animationId.playerAttack1); // Attack down
//             this.atkDown = true; // Flag to true
//             this.atkUp = false; // Make sure player not attack up anymore
//             //this.body.setVelocityY(this.jumpVelocity);
//             this.y = this.initialPosition.y;
//         } else if(this.anims.isPlaying){
//             this.bothAttack();
//         }
//     }

//     upAttack() {
//         // Animation not playing OR player is running (no attack currently)
//         if(!this.anims.isPlaying || this.anims.currentAnim.key === animationId.playerRun) {
//             this.play(animationId.playerAttack2); // Attack down
//             this.atkDown = false; // Flag to true
//             this.atkUp = true; // Make sure player not attack up anymore
//             //this.body.setVelocityY(-this.jumpVelocity);
//             this.y = this.initialPosition.y - this.jumpDistance;
//         } else if(this.anims.isPlaying){
//             this.bothAttack();
//         }
//     }

//     bothAttack() {
//         // Animation not playing OR player is running (no attack currently)
//         if(!this.anims.isPlaying || this.anims.currentAnim.key === animationId.playerRun) {
//             this.play(animationId.playerAttack2); // Attack down
//             this.atkDown = true; // Flag to true
//             this.atkUp = true; // Make sure player not attack up anymore
//             //this.body.setVelocityY(-this.jumpVelocity);
//             this.y = this.initialPosition.y - (this.jumpDistance / 2);
//         }
//     }

//     getAttackDebug() {
//         return "Up: " + this.atkUp + " Down: " + this.atkDown;
//     }
// }