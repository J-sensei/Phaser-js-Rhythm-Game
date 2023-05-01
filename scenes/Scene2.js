class Scene2 extends Phaser.Scene {
    constructor() {
        super("Scene2"); // Identifier of the scene
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "Background");
        this.background.setScale(2);
        this.background.setOrigin(0, 0); // Set origin to top left corner (default is center of the image)

        // Create black panel
        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 1); // Add a shape with black color fill
        graphics.beginPath();
        graphics.moveTo(0, 0);
        graphics.lineTo(game.config.width, 0);
        graphics.lineTo(game.config.width, 20);
        graphics.lineTo(0, 20);
        graphics.lineTo(0, 0);
        graphics.closePath();
        graphics.fillPath();

        // Score and label
        this.score = 0;
        let scoreString = this.zeroPad(this.score, 6);
        this.scoreLabel = this.add.bitmapText(10, 5, "PixelFont", "SCORE: " + scoreString, 16); // 16 = font size

        // Create Audios
        // SFX
        this.beamSound = this.sound.add("Audio_Beam");
        this.explosionSoud = this.sound.add("Audio_Explosion");
        this.pickupSound = this.sound.add("Audio_Pickup");

        // Music / BGM
        this.music = this.sound.add("Music");
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        this.music.play(musicConfig);

        // Create images
        // this.ship = this.add.image(config.width / 2 - 50, config.height / 2, "Ship");
        // this.ship2 = this.add.image(config.width / 2, config.height / 2, "Ship2");
        // this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, "Ship3");

        // Create sprites
        this.ship = this.add.sprite(config.width / 2 - 50, config.height / 2, "Ship");
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, "Ship2");
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, "Ship3");

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        // Add animation to the sprites
        this.ship.play("ship1_anim");
        this.ship2.play("ship2_anim");
        this.ship3.play("ship3_anim");

        // Make the ship interactable
        this.ship.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        // Param1: scopes the callback function to the object itself
        this.input.on("gameobjectdown", this.destroyShip, this);

        // Add power ups
        this.powerUps = this.physics.add.group();
        const maxPowerUp = 4;
        for(let i = 0; i < maxPowerUp; i++) {
            let powerUp = this.physics.add.sprite(16, 16, "PowerUp");
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height); // build in function to set random position

            // 50% chance for the power up type
            if(Math.random() > 0.5) {
                powerUp.play("red_powerup_anim");
            } else {
                powerUp.play("gray_powerup_anim");
            }

            // Set the velocity using physic engine
            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true); // Stop when collided with the bound
            
            powerUp.setBounce(1); // Bouncing 
        }

        // Create player
        this.player = this.physics.add.sprite(game.config.width / 2 - 8, game.config.height - 64, "Player");
        this.player.play("player_anim");
        this.player.setCollideWorldBounds(true);

        // Input
        this.cursorKey = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Add spacebar input
        //this.beam = new Beam(this);

        // Beam group
        this.projectiles = this.add.group();

        // Enable collision
        // Collider will simulate the physics
        // this.physics.add.collider(this.projectiles, this.powerUps, function(projectile, powerUp) {
        //     projectile.destroy();
        // });
        // Overlap only calculate the collision but not simulate the physics
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    }

    update() {
        this.moveShip(this.ship, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;

        this.playerMovement();
        this.playerShoot();

        // Update beams
        for(let i = 0; i < this.projectiles.getChildren().length; i++) {
            let beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    moveShip(ship, speed) {
        ship.y += speed; // Move the ship y axis by the speed (The image has the x y properties)

        if(ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship) {
        ship.y = 0; // Reset y
        const x = Phaser.Math.Between(0, config.width);
        ship.x = x;
    }

    // pointer: mouse pointer
    // gameObject: reference to the ship game object
    destroyShip(pointer, gameObject) {
        gameObject.setTexture("Explosion"); // Switch the texture to the game object
        gameObject.play("explosion_anim"); // Player the explosion animation
    }

    playerMovement() {
        let x, y = 0;
        if(this.cursorKey.left.isDown) {
            //this.player.setVelocityX(-gameSettings.playerSpeed);
            x = -1;
        } else if(this.cursorKey.right.isDown) {
            //this.player.setVelocityX(gameSettings.playerSpeed);
            x = 1;
        }

        if(this.cursorKey.up.isDown) {
            //this.player.setVelocityY(-gameSettings.playerSpeed);
            y = -1;
        } else if(this.cursorKey.down.isDown) {
            //this.player.setVelocityY(gameSettings.playerSpeed);
            y = 1;
        }

        let move = new Phaser.Math.Vector2(x, y).normalize();
        this.player.setVelocity(move.x * gameSettings.playerSpeed, move.y * gameSettings.playerSpeed);
    }

    playerShoot() {
        if(Phaser.Input.Keyboard.JustDown(this.spacebar) && this.player.active){
            this.instantiateBeam();
        }
    }

    instantiateBeam() {
        //let beam = this.physics.add.sprite(this.player.x, this.player.y, "Beam");
        let beam = new Beam(this);
        this.beamSound.play();
    }

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true); // Hide it
        this.pickupSound.play();
    }

    hurtPlayer(player, enemy) {
        if(this.player.alpha < 1) return; // Do not hurt player if the aplha value is lower

        this.resetShipPos(enemy); // Reset enemy position

        let explosion = new Explosion(this, player.x, player.y);
        player.disableBody(true , true);
        //this.resetPlayer(player);
        this.explosionSoud.play(); // Play explosion sound

        // Delay reset player
        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false
        });

        // Reset player position
        // player.x = game.config.width / 2 - 8;
        // player.y = game.config.height - 64;
    }

    resetPlayer() {
        const x = game.config.width / 2 - 8;
        const y = game.config.height;
        this.player.enableBody(true, x, y, true, true);
        this.player.alpha = 0.5; // make the player transparent for invinsible
        // Tween to reset back alpha value
        // Tween will moving the player between the duration
        let tween = this.tweens.add({
            targets: this.player, // target the player
            y: game.config.height - 64, // the player ship will moving up
            ease: "Power1",
            duration: 1500,
            repeat: 0,
            onComplete: function() {
                this.player.alpha = 1;
            },
            callbackScope: this
        });
    }

    hitEnemy(projectile, enemy) {
        projectile.destroy();
        // let explosion = this.add.sprite(enemy.x, enemy.y, "Explosion");
        // explosion.play("explosion_anim");
        let explosion = new Explosion(this, enemy.x, enemy.y);
        this.explosionSoud.play(); // Play explosion sound
        this.resetShipPos(enemy);

        // Update score
        this.score += 10;
        let scoreString = this.zeroPad(this.score, 6);
        this.scoreLabel.text = "SCORE: " + scoreString;
    }

    zeroPad(number, size) {
        let stringNum = String(number);
        while(stringNum.length < (size || 2)) {
            stringNum = "0" + stringNum;
        }

        return stringNum;
    }
}