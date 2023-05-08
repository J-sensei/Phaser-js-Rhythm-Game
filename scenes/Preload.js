/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

// Global
/** Current song for the player to play */
let CurrentSong = null;
/** Current Difficulty selected for the song */
let CurrentDifficulty = Difficulty.HARD
/**
 * Songs available in the game
 */
let SongList = [];

/** Scene keys naming */
const SceneKey = {
    PRELOAD: "Preload",
}

/** Sprite keys naming */
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
    VEHICLE3: "Vehicle3",
    MUSIC_NOTE: "MusicNote",
}

const ParticleKey = {
    HIT_PARTICLE: "HitParticle",
}

/** Animation keys naming */
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

/** Background keys naming */
const BackgroundId = {
    SUNSET_BACK: "SunsetBack",
    SUNSET_BUILDINGS: "SunsetBuilding",
    SUNSET_HIGHWAY: "SunsetHighway",
    SUNSET_PALMTREE: "SunsetPalmTree",
    SUNSET_PALMS: "SunsetPalms",
    SUNSET_SUN: "SunsetSun"
}

/** Sound effect audio keys naming */
const SFXId = {
    NOTE_HIT: "NoteHit",
    NOTE_HOLD_HIT: "NoteHoldHit",
    MUSIC_HIT: "MusicHit",
    METRONOME1: "Metronome1",
    METRONOME2: "Metronome2",
    COMBO_BREAK: "ComboBreak",
    METAL_HIT: "MetalHit",
    SELECT: "SelectSound",
    CLICK: "ClickSound",
    BACK: "BackSound",
    NOTE_HOLDING: "NoteHoldingSound",
}

/** Layer depth configuration */
const LayerConfig = {
    NOTE: 10,
}

/** Fixed player position */
let PlayerPosition;
/** Fixed judgement positions */
let JudgementPositions = [];
/** Fxied positions for note spawn */
let NoteSpawnPoint = [];

/**
 * Scene to preload neccessary assets required for the game
 */
class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        // Plugins
        // Audio fade in / out
        this.load.plugin('rexsoundfadeplugin', 'library/rexsoundfadeplugin.min.js', true);
        // Circle image
        this.load.plugin('rexcirclemaskimageplugin', 'library/rexcirclemaskimageplugin.min.js', true);
        // Load song
        //this.testSong = new Song(this, "Song1", "assets/songs/PSYQUI-bye or not");
        //this.testSong = new Song(this, "Song1", "assets/songs/rejection-open your heart");
        //this.testSong = new Song(this, "Song1", "assets/songs/shinjuku2258");
        //this.testSong.preload();
        const songPaths = [
            "assets/songs/PSYQUI-bye or not",
            "assets/songs/nini",
            "assets/songs/cyaegha",
        ];
        for(let i = 0; i < songPaths.length; i++) {
            const song = new Song(this, "Song" + i, songPaths[i], i);
            song.preload();
            SongList.push(song);
        }

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
        this.load.spritesheet(SpriteId.MUSIC_NOTE, "assets/note/music_note.png", {frameWidth: 360, frameHeight: 360});

        // Load backgrounds
        this.load.image(BackgroundId.SUNSET_BACK, "assets/background/sunset/back.png");
        this.load.image(BackgroundId.SUNSET_BUILDINGS, "assets/background/sunset/buildings.png");
        this.load.image(BackgroundId.SUNSET_HIGHWAY, "assets/background/sunset/highway.png");
        this.load.image(BackgroundId.SUNSET_PALMTREE, "assets/background/sunset/palm-tree.png");
        this.load.image(BackgroundId.SUNSET_PALMS, "assets/background/sunset/palms.png");
        this.load.image(BackgroundId.SUNSET_SUN, "assets/background/sunset/sun.png");
        
        // Particle
        this.load.image(ParticleKey.HIT_PARTICLE, "assets/particle/star.png");

        // Sound Effect
        this.load.audio(SFXId.NOTE_HIT, "assets/sfx/punch.wav");
        this.load.audio(SFXId.NOTE_HOLD_HIT, "assets/sfx/holdHit.wav");
        this.load.audio(SFXId.MUSIC_HIT, "assets/sfx/music_hit.wav");
        this.load.audio(SFXId.COMBO_BREAK, "assets/sfx/combo_break.mp3");
        this.load.audio(SFXId.METAL_HIT, "assets/sfx/metalHit.wav");
        this.load.audio(SFXId.NOTE_HOLDING, "assets/sfx/note_holding.wav");

        this.load.audio(SFXId.METRONOME1, "assets/sfx/metronome1.mp3");
        this.load.audio(SFXId.METRONOME2, "assets/sfx/metronome2.mp3");

        this.load.audio(SFXId.SELECT, "assets/sfx/song_select.mp3");
        this.load.audio(SFXId.BACK, "assets/sfx/song_back.mp3");
        this.load.audio(SFXId.CLICK, "assets/sfx/song_click.mp3");

        // UI
        this.load.spritesheet(SpriteId.BUTTON_DOWN, "assets/ui/ARROWDOWN.png", {frameWidth: 17, frameHeight: 16});
        this.load.spritesheet(SpriteId.BUTTON_UP, "assets/ui/ARROWUP.png", {frameWidth: 17, frameHeight: 16});
    }

    create() {
        // Initialize SFX for neccessary class
        Note.LoadSFX(this);
        Beatmap.LoadSFX(this);

        // Initialize score
        Score.SetSingleton(new Score());
        Score.GetInstance().reset();

        // Set origin to center the text
        this.add.text(game.config.width / 2, game.config.height / 2, "Loading assets...", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 

        // Define Positions
        PlayerPosition = new Phaser.Math.Vector2(200, game.config.height - 60);
        JudgementPositions = [
            new Phaser.Math.Vector2(PlayerPosition.x + 200, PlayerPosition.y - 35), // Down
            new Phaser.Math.Vector2(PlayerPosition.x + 200, PlayerPosition.y + 35) // Up
        ];
        NoteSpawnPoint = [
            new Phaser.Math.Vector2(game.config.width + 100, game.config.height - 64 - 10 + 40), // Down
            new Phaser.Math.Vector2(game.config.width + 100, game.config.height - 64 - 10 - 25), // Up
        ];

        // Test load music
        // let song = new Song(this, "Song1");
        // song.play();
        //this.testSong.create();
        for(let i = 0; i < SongList.length;  i++) {
            SongList[i].create();
        }

        CurrentSong = SongList[0]; // Bye or Not

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
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.VEHICLE2,
            frames: this.anims.generateFrameNumbers(SpriteId.VEHICLE2),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: AnimationId.VEHICLE3,
            frames: this.anims.generateFrameNumbers(SpriteId.VEHICLE3),
            frameRate: 12,
            repeat: -1
        });

        //this.scene.start("Debug");
        this.scene.start("SongSelectScene"); // Test
    }

    update() {

    }
}