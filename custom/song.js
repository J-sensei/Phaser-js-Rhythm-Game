const musicConfig = {
    volume: 0.5,
    loop: false,
}

/**
 * Song data, contains function use to play song and song data
 * @param { Scene } scene Phaser Scene reference
 * @param { string } id Unique ID for the song
 * @param { string } path Location of the song resources 
 */
class Song extends Phaser.GameObjects.Sprite {
    constructor(scene, id, path) {
        super(scene, 0, 0, "Test"); // Test

        // Set class variables
        this.id = id;
        this.path = path;
        this.scene = scene;

        // Define the id
        /** Unique ID for song asset */
        this.songId = this.id;
        /** Unique ID for song data asset */
        this.dataId = this.id + ".data"
    }

    /**
     * Preload neccessary resources of the song
     */
    preload() {
        this.scene.load.json(this.dataId, this.path + "/data.json"); // Load the data
        this.scene.load.audio(this.songId, [this.path + "/song.mp3"]); // Load the song
    }

    /**
     * Initialize neccessary variables of the song class
     */
    create() {
        /** Audio reference */
        this.song = this.scene.sound.add(this.id); // Crate the song
        /** Data of the song */
        let data = this.scene.cache.json.get(this.dataId); // Get json data
        // TODO: load map data here
        // this.mapData = 

        // Song details
        /** Song Name */
        this.name = data.name;
        /** Artist Name */
        this.artist = data.artist;
        this.data = data;
    }

    play(delay) {
        let config = {
            mute: false,
            volume: audioConfig.music, // Get the current volume fonr the audio configuration
            loop: false, // No looping for the song
            delay: delay
        }

        if (!this.scene.sound.locked) // already unlocked so play
        {
            this.song.play(config);
        }
        else
        {
            this.scene.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.song.play(config);
            });
        }
        //this.song.setSeek(100); // Set to target time
        console.log("Play " + this.name + " by " + this.artist); // Test
    }

    /**
     * Current time of the playing audio, return negative number if its in delay
     * @returns deciaml
     */
    currentTime() {
        return this.song.seek;
    }

    /**
     * Return current song play time
     * @returns String of the song current play time
     */
    playTimeString() {
        return this.song.seek.toFixed(2) + "/" + this.song.totalDuration.toFixed(2);
    }

    /**
     * See if the song is currently playing
     * @returns Boolean
     */
    playing() {
        return this.song.isPlaying;
    }

    duration() {
        return this.song.totalDuration;
    }

    /**
     * Audio reference of the song
     * @returns Audio
     */
    music() {
        return this.song;
    }
}