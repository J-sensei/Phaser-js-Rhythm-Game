/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

// Global variables
/** Current song for the player to play */
let CurrentSong = null;
/** Current Difficulty selected for the song */
let CurrentDifficulty = Difficulty.EASY;
/**
 * Songs available in the game
 */
let SongList = [];

/** Scene keys naming */
const SceneKey = {
    PRELOAD: "PreloadScene",
    SONG_SELECT: "SongSlection",
    DEBUG: "DebugScene",
    LEVEL: "LevelScene",
    RESULT: "ResultScene",
}

/** Sprite keys naming */
const SpriteId = {
    CAR_RUNNING: "CarRunning",
    CONE: "Cone",
    VEHICLE1: "Vehicle1",
    VEHICLE2: "Vehicle2",
    VEHICLE3: "Vehicle3",
    MUSIC_NOTE: "MusicNote",
    PROGRESS_FILL: "ProgressFill",
}

/** Particle keys */
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
    COUTDOWN_3: "CountDown3Sound",
    COUTDOWN_2: "CountDown2Sound",
    COUTDOWN_1: "CountDown1Sound",
    COUTDOWN_GO: "CountDownGoSound",
    RESULT_BGM: "ResultBGMSound",
    FULL_COMBO: "FullComboSound",
    ALL_PERFECT: "AllPerfectSound",
}

/** Layer depth configuration */
const LayerConfig = {
    PLAYER: 10,
    BACKGROUND: 0,
    FOREGROUND: 100,
    NOTE_UP: 20,
    NOTE_DOWN: 30,
    UI_PANEL: 150,
    UI: 200,
    DEBUG_UI: 300,
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
        super(SceneKey.PRELOAD);
    }

    preload() {
        // Plugins
        // Audio fade in / out
        this.load.plugin('rexsoundfadeplugin', 'library/rexsoundfadeplugin.min.js', true);
        // Circle image
        this.load.plugin('rexcirclemaskimageplugin', 'library/rexcirclemaskimageplugin.min.js', true);

        // Load songs
        // Define the songs that need to load here
        const songPaths = [
            "assets/songs/PSYQUI-bye or not",
            "assets/songs/nini",
            "assets/songs/cyaegha",
        ];

        // Song all the songs
        for(let i = 0; i < songPaths.length; i++) {
            // Scene, Key (Just to make it unique), song path, song position (iteration number)
            const song = new Song(this, "Song" + i, songPaths[i], i);
            song.preload(); // Preload the song resources
            SongList.push(song); // Push it into the song list
        }

        // Load player sprite
        this.load.spritesheet(SpriteId.CAR_RUNNING, "assets/player/car_running.png", {frameWidth: 184, frameHeight: 68});

        // Note sprite
        // this.load.spritesheet(SpriteId.BOT_RUNNING, "assets/note/bot_running.png", {frameWidth: 61, frameHeight: 64});
        // this.load.spritesheet(SpriteId.RC_CAR, "assets/note/rc_car.png", {frameWidth: 32, frameHeight: 32});
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

        // UI
        this.load.image(SpriteId.PROGRESS_FILL, "assets/ui/progress_fill.png");

        // Note hit Sound Effect
        this.load.audio(SFXId.NOTE_HIT, "assets/sfx/punch.wav");
        this.load.audio(SFXId.NOTE_HOLD_HIT, "assets/sfx/holdHit.wav");
        this.load.audio(SFXId.MUSIC_HIT, "assets/sfx/music_hit.wav");
        this.load.audio(SFXId.COMBO_BREAK, "assets/sfx/combo_break.mp3");
        this.load.audio(SFXId.METAL_HIT, "assets/sfx/metalHit.wav");
        this.load.audio(SFXId.NOTE_HOLDING, "assets/sfx/note_holding.wav");

        // For debuging metronome sound
        this.load.audio(SFXId.METRONOME1, "assets/sfx/metronome1.mp3");
        this.load.audio(SFXId.METRONOME2, "assets/sfx/metronome2.mp3");

        // UI Audio
        this.load.audio(SFXId.SELECT, "assets/sfx/song_select.mp3");
        this.load.audio(SFXId.BACK, "assets/sfx/song_back.mp3");
        this.load.audio(SFXId.CLICK, "assets/sfx/song_click.mp3");
        this.load.audio(SFXId.RESULT_BGM, "assets/sfx/result_bgm.mp3");
        this.load.audio(SFXId.FULL_COMBO, "assets/sfx/fullcombo.mp3");
        this.load.audio(SFXId.ALL_PERFECT, "assets/sfx/allperfect.mp3");

        // Count down audio
        this.load.audio(SFXId.COUTDOWN_3, "assets/sfx/countdown_3.wav");
        this.load.audio(SFXId.COUTDOWN_2, "assets/sfx/countdown_2.wav");
        this.load.audio(SFXId.COUTDOWN_1, "assets/sfx/countdown_1.wav");
        this.load.audio(SFXId.COUTDOWN_GO, "assets/sfx/countdown_go.wav");
    }

    create() {
        // Show the text to indicate loading is happening right now
        this.add.text(game.config.width / 2, game.config.height / 2, "Loading assets...", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); // Set origin to center the text

        // Initialize SFX for neccessary classes
        Note.LoadSFX(this);
        Beatmap.LoadSFX(this);

        // Initialize score
        Score.SetSingleton(new Score());
        Score.GetInstance().reset(); // Reset the score just in case

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

        // Initialize song list
        for(let i = 0; i < SongList.length;  i++) {
            SongList[i].create();
        }

        // By default choosing the first song
        CurrentSong = SongList[0]; // Bye or Not

        // Animations
        // Player car animation
        this.anims.create({
            key: AnimationId.CAR_RUNNING,
            frames: this.anims.generateFrameNumbers(SpriteId.CAR_RUNNING, {start: 1, end: 4}),
            frameRate: 16,
            repeat: -1
        });
        // Note animations
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

        //this.scene.start(SceneKey.RESULT); // Test
        //this.scene.start(SceneKey.DEBUG); // Test
        this.scene.start(SceneKey.SONG_SELECT); 
    }
}