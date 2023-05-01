// Tutorial
/*
    Phaser Scene functions
    init() // Used to prepare data
    preload() // Used to load the musics & images into memory
    create() // Add the objects to the game
    update() // loop that runs contantly (game loop)

    preload image
    // Key: string to identify the image
    // Url: string path to the image
    this.load.image("Key", "url"); 
*/

class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene1"); // Identifier of the scene
    }

    preload() {
        this.load.image("Background", "assets/background.png"); // Preload the image into memory

        // Load image
        // this.load.image("Ship", "assets/ship.png");
        // this.load.image("Ship2", "assets/ship2.png");
        // this.load.image("Ship3", "assets/ship3.png");

        // Load spritesheet
        this.load.spritesheet("Ship", "assets/ship.png", {frameWidth: 16, frameHeight: 16}); // Specify the width and height for a frame
        this.load.spritesheet("Ship2", "assets/ship2.png", {frameWidth: 32, frameHeight: 16});
        this.load.spritesheet("Ship3", "assets/ship3.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet("Explosion", "assets/explosion.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("PowerUp", "assets/power-up.png", {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet("Player", "assets/player.png", {frameWidth: 16, frameHeight: 24});   
        this.load.spritesheet("Beam", "assets/beam.png", {frameWidth: 16, frameHeight: 16});    
        
        // Load font
        this.load.bitmapFont("PixelFont", "assets/font/font.png", "assets/font/font.xml");

        // Load Audio
        // Can load multiple file for different formats (Phaser support ogg and mp3)
        this.load.audio("Audio_Beam", ["assets/sounds/beam.ogg", "assets/sounds/beam.mp3"]);
        this.load.audio("Audio_Pickup", ["assets/sounds/pickup.ogg", "assets/sounds/pickup.mp3"]);
        this.load.audio("Audio_Explosion", ["assets/sounds/explosion.ogg", "assets/sounds/explosion.mp3"]);
        this.load.audio("Music", ["assets/sounds/sci-fi_platformer12.ogg", "assets/sounds/sci-fi_platformer12.mp3"]);
    }

    create() {
        this.add.text(20, 20, "Loading game..."); // Create a text object, with x and y parameters as the position

        // Create animation
        // Ship animations
        this.anims.create({
            key: "ship1_anim", // Name / Key of the animation for the reference and identifier
            frames: this.anims.generateFrameNumbers("Ship"), // Get the frames from the Ship spritesheet
            frameRate: 20, // 20 frames per second
            repeat: -1 // Number of repeat times, -1 is infinity loop
        });
        this.anims.create({
            key: "ship2_anim",
            frames: this.anims.generateFrameNumbers("Ship2"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "ship3_anim",
            frames: this.anims.generateFrameNumbers("Ship3"),
            frameRate: 20,
            repeat: -1
        });
        // Explosion animation
        this.anims.create({
            key: "explosion_anim",
            frames: this.anims.generateFrameNumbers("Explosion"),
            frameRate: 20,
            repeat: 0, // No repeat
            hideOnComplete: true // Dissapear when the animation is finished
        });
        // Power up animation
        this.anims.create({
            key: "red_powerup_anim",
            frames: this.anims.generateFrameNumbers("PowerUp", {start: 0, end: 1}), // Get the first two frames only
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "gray_powerup_anim",
            frames: this.anims.generateFrameNumbers("PowerUp", {start: 2, end: 3}), // Get the last two frames only
            frameRate: 20,
            repeat: -1
        });
        // Player animation
        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("Player"),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: "beam_anim",
            frames: this.anims.generateFrameNumbers("Beam"),
            frameRate: 20,
            repeat: -1
        });

        this.scene.start("Scene2");
    }
}