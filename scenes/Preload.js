/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

let testSong1 = null;
const SceneKey = {
    PRELOAD: "Preload",
}
const SpriteId = {
    PLAYER_RUN: "PlayerRun",
    PLAYER_ATTACK: "PlayerAttack",
    CAR_RUNNING: "CarRunning",
    BOT_RUNNING: "BotRunning",
    RC_CAR: "RcCar",
    BUTTON_UP: "ButtonUp",
    BUTTON_DOWN: "ButtonDown",
    CONE: "Cone",
    VEHICLE1: "Vehicle1",
    VEHICLE2: "Vehicle2",
    VEHICLE3: "Vehicle3"
}

const AnimationId = {
    PLAYER_RUN: "PlayerRunAnimation",
    PLAYER_ATTACK1: "PlayerAttackAnimation1",
    PLAYER_ATTACK2: "PlayerAttackAnimation2",
    CAR_RUNNING: "CarRunningAnimation",
    BOT_RUNNING: "BotRunningAnimation",
    RC_CAR_RUNNING: "RcCarAnimation",
    VEHICLE1: "Vehicle1Animation",
    VEHICLE2: "Vehicle2Animation",
    VEHICLE3: "Vehicle3Animation",
}

const BackgroundId = {
    SUNSET_BACK: "SunsetBack",
    SUNSET_BUILDINGS: "SunsetBuilding",
    SUNSET_HIGHWAY: "SunsetHighway",
    SUNSET_PALMTREE: "SunsetPalmTree",
    SUNSET_PALMS: "SunsetPalms",
    SUNSET_SUN: "SunsetSun"
}

const SFXId = {
    NOTE_HIT: "NoteHit",
    NOTE_HOLD_HIT: "NoteHoldHit",
    METRONOME1: "Metronome1",
    METRONOME2: "Metronome2"
}

const LayerConfig = {
    NOTE: 10,

}

/**
 * Scene to preload neccessary assets required for the game
 */
class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        //this.load.audio("Song1", ["assets/songs/rejection-open your heart/song.mp3"]);
        
        // Load song
        this.testSong = new Song(this, "Song1", "assets/songs/PSYQUI-bye or not");
        //this.testSong = new Song(this, "Song1", "assets/songs/rejection-open your heart");
        //this.testSong = new Song(this, "Song1", "assets/songs/shinjuku2258");
        this.testSong.preload();

        // Load player sprite
        this.load.spritesheet(SpriteId.PLAYER_RUN, "assets/player/run_sheet.png", {frameWidth: 80, frameHeight: 80});
        this.load.spritesheet(SpriteId.PLAYER_ATTACK, "assets/player/attack_sheet.png", {frameWidth: 96, frameHeight: 80});
        this.load.spritesheet(SpriteId.CAR_RUNNING, "assets/player/car_running.png", {frameWidth: 184, frameHeight: 68});

        // Note sprite
        this.load.spritesheet(SpriteId.BOT_RUNNING, "assets/note/bot_running.png", {frameWidth: 61, frameHeight: 64});
        this.load.spritesheet(SpriteId.RC_CAR, "assets/note/rc_car.png", {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet(SpriteId.CONE, "assets/note/cone.png", {frameWidth: 371, frameHeight: 421});
        this.load.spritesheet(SpriteId.VEHICLE1, "assets/note/vehicle1.png", {frameWidth: 176, frameHeight: 96});
        this.load.spritesheet(SpriteId.VEHICLE2, "assets/note/vehicle2.png", {frameWidth: 176, frameHeight: 125});
        this.load.spritesheet(SpriteId.VEHICLE3, "assets/note/vehicle3.png", {frameWidth: 329, frameHeight: 160});

        // Load backgrounds
        this.load.image(BackgroundId.SUNSET_BACK, "assets/background/sunset/back.png");
        this.load.image(BackgroundId.SUNSET_BUILDINGS, "assets/background/sunset/buildings.png");
        this.load.image(BackgroundId.SUNSET_HIGHWAY, "assets/background/sunset/highway.png");
        this.load.image(BackgroundId.SUNSET_PALMTREE, "assets/background/sunset/palm-tree.png");
        this.load.image(BackgroundId.SUNSET_PALMS, "assets/background/sunset/palms.png");
        this.load.image(BackgroundId.SUNSET_SUN, "assets/background/sunset/sun.png");

        this.load.audio(SFXId.NOTE_HIT, "assets/sfx/punch.wav");
        this.load.audio(SFXId.NOTE_HOLD_HIT, "assets/sfx/holdHit.wav");

        this.load.audio(SFXId.METRONOME1, "assets/sfx/metronome1.mp3");
        this.load.audio(SFXId.METRONOME2, "assets/sfx/metronome2.mp3");

        this.load.spritesheet(SpriteId.BUTTON_DOWN, "assets/ui/ARROWDOWN.png", {frameWidth: 17, frameHeight: 16});
        this.load.spritesheet(SpriteId.BUTTON_UP, "assets/ui/ARROWUP.png", {frameWidth: 17, frameHeight: 16});
    }

    create() {
        Note.LoadSFX(this);
        Beatmap.LoadSFX(this);
        // Set origin to center the text
        this.add.text(game.config.width / 2, game.config.height / 2, "Loading assets...", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 

        // Test load music
        // let song = new Song(this, "Song1");
        // song.play();
        this.testSong.create();
        //this.testSong.play();
        testSong1 = this.testSong;

        const atkFrame = 20;
        const runFrame = 15;
        // Animations
        this.anims.create({
            key: AnimationId.PLAYER_RUN,
            frames: this.anims.generateFrameNumbers(SpriteId.PLAYER_RUN),
            frameRate: runFrame,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.PLAYER_ATTACK1,
            frames: this.anims.generateFrameNumbers(SpriteId.PLAYER_ATTACK, {start: 0, end: 3}), // Get the first 4 frames only
            frameRate: atkFrame,
            repeat: 0
        });
        this.anims.create({
            key: AnimationId.PLAYER_ATTACK2,
            frames: this.anims.generateFrameNumbers(SpriteId.PLAYER_ATTACK, {start: 4, end: 7}), // Get the last 4 frames only
            frameRate: atkFrame,
            repeat: 0
        });
        this.anims.create({
            key: AnimationId.CAR_RUNNING,
            frames: this.anims.generateFrameNumbers(SpriteId.CAR_RUNNING, {start: 1, end: 4}),
            frameRate: 16,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.BOT_RUNNING,
            frames: this.anims.generateFrameNumbers(SpriteId.BOT_RUNNING),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.RC_CAR_RUNNING,
            frames: this.anims.generateFrameNumbers(SpriteId.RC_CAR, {start: 6, end: 9}),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.VEHICLE1,
            frames: this.anims.generateFrameNumbers(SpriteId.VEHICLE1),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.VEHICLE2,
            frames: this.anims.generateFrameNumbers(SpriteId.VEHICLE2),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.VEHICLE3,
            frames: this.anims.generateFrameNumbers(SpriteId.VEHICLE3),
            frameRate: 8,
            repeat: -1
        });

        this.scene.start("Debug"); // Test
    }

    update() {

    }
}