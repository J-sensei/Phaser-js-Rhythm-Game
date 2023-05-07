// const musicConfig = {
//     volume: 0.5,
//     loop: false,
// }

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
        this.dataId = this.id + ".data";
        this.imageId = this.id + ".image";
    }

    /**
     * Preload neccessary resources of the song
     */
    preload() {
        this.scene.load.json(this.dataId, this.path + "/data.json"); // Load the data
        this.scene.load.audio(this.songId, [this.path + "/song.mp3"]); // Load the song
        this.scene.load.image(this.imageId, this.path + "/cover.png");
    }

    /**
     * Initialize neccessary variables of the song class
     */
    create() {
        /** Audio reference */
        this.song = this.scene.sound.add(this.id); // Crate the song
        //this.image = this.scene.add.image(0, 0, this.imageId);
        // this.image.width = 250;
        // this.image.height = 250;
        //console.log("Image width: " + this.image.width + " Image height: " + this.image.height);
        // this.circleImage = new CircleImage(this.scene, 500, 350, this.image, 250/2);
        // this.circleImage.setScale(0.5);

        /** Data of the song */
        let data = this.scene.cache.json.get(this.dataId); // Get json data
        // TODO: load map data here
        // this.mapData = 

        // Song details
        /** Song Name */
        this.name = data.name;
        /** Artist Name */
        this.artist = data.artist;
        /** Song BPM(Beat Per Minute) */
        this.bpm = data.bpm;
        /** Offset to start counting BPM */
        this.offset = data.offset;
        /** Source of the music (From other video game or album) */
        this.source = data.source;

        // Preview song
        // Test Bye or Not
        /** Preview start time */
        this.previewStartTimeline = data.previewStart;
        /** Preview end time */
        this.previewEndTimeline = data.previewEnd;
        this.data = data;

        // Create beatmap to get the beat!
        this.beatmapConfig = {
            bpm: this.bpm,
            offset: this.offset
        }
        this.beatmap = new Beatmap(this, this, this.beatmapConfig);
        this.beatmap.create();
    }

    createImage(scene, x, y) {
        const size = 400;
        this.image = scene.add.rexCircleMaskImage(x, y, this.imageId, null, null);
        console.log("Image width: " + this.image.width + " Image height: " + this.image.height + " Scale: " + this.image.scale);

        this.imageScaleX = size / this.image.width;
        this.imageScaleY = size / this.image.height;

        this.image.setScale(this.imageScaleX, this.imageScaleY);
        console.log("Image width: " + this.image.width + " Image height: " + this.image.height + " Scale: " + this.image.scale);

        //const easeList = ["Linear", "Sine.easeInOut", "Bounce.easeInOut"];
        const easeList = ["Linear", "Sine.easeInOut"];
        // Rotate the image
        const tween = scene.tweens.add({
            ease: easeList[Phaser.Math.Between(0, easeList.length)],
            targets: this.image,
            angle: this.image.angle + 360,
            duration: this.bpm * 40,
            repeat: -1,
            callbackScope: this,
        });
        
        // Create labels
        this.sourceLabel = scene.add.text(x, y + 250, "Source: " + this.source, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0.5); 
        this.songNameLabel = scene.add.text(x, y + 250 + 32 + 5, "Name: " + this.name, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0.5); 
        this.artistLabel = scene.add.text(x, y + 250 + 32*2 + 5, "Artist: " + this.artist, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0.5); 
        this.bpmLabel = scene.add.text(x, y + 250 + 32*3 + 5, "BPM: " + this.bpm, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0.5); 

        const totalSeconds = this.song.totalDuration;
        const totalMinutes = Math.floor(totalSeconds / 60);

        const seconds = totalSeconds % 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const date = new Date(0);
        date.setSeconds(totalSeconds - this.offset); // specify value for SECONDS here
        const timeString = date.toISOString().substring(14, 19);
        this.lengthLabel = scene.add.text(x, y + 250 + 32*4 + 5, "Length: " + timeString , {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0.5); 
    }

    preview(scene) {        
        this.previewAudio = scene.plugins.get('rexsoundfadeplugin').fadeIn(this.song, 2000, AudioConfig.music, 0);
        this.previewAudio.seek = this.previewStartTimeline;
        this.previewStart = true;
        this.noteBeats = this.beatmap.getPreviewBeats(this.previewStartTimeline);
        this.fadeOutStart = false;
    }

    setTitles(title, subTitle) {
        this.titleLabel = title;
        this.subTitleLabel = subTitle;
    }

    switchOut() {
        this.previewAudio.stop();
        this.image.destroy();
        this.sourceLabel.destroy();
        this.songNameLabel.destroy();
        this.artistLabel.destroy();
        this.bpmLabel.destroy();
        this.lengthLabel.destroy();
    }

    updatePreview(scene) {
        if(this.previewAudio == null) return;
        // Fade out start
        if(this.previewAudio.isPlaying && this.previewAudio.seek >= this.previewEndTimeline && this.previewStart) {
            const seek = this.previewAudio.seek;
            this.previewAudio.stop();
            this.previewAudio = scene.plugins.get('rexsoundfadeplugin').fadeOut(this.previewAudio, 2000, false);
            this.previewAudio.seek = seek;
            this.previewStart = false;
            this.fadeOutStart = true;
        }

        if(!this.previewStart && !this.previewAudio.isPlaying) {
            // this.previewAudio = scene.plugins.get('rexsoundfadeplugin').fadeIn(this.song, 2000, AudioConfig.music, 0);
            // this.previewAudio.seek = this.previewStartTimeline;
            // this.previewStart = true;
            // this.noteBeats = this.beatmap.getPreviewBeats(this.previewStartTimeline);
            this.preview(scene);
        }

        // Change the scale with the beat
        if(this.previewAudio.isPlaying) {
            // let remove = false;
            // for(let i = this.noteBeats.length - 1; i >= 0; i--) {
            //     if(this.previewAudio.seek >= this.noteBeats[i].spawnTime) {
            //         console.log("Beat!!! " + this.noteBeats[i].type);
            //         remove = true;

            //         let scaleMultiplier = 1;
            //         let duration = 100;
            //         switch(this.noteBeats[i].type) {
            //             case NoteType.NORMAL:
            //                 scaleMultiplier = 1.08;
            //             break;
            //             case NoteType.HOLD:
            //                 scaleMultiplier = 1.03;
            //             break;
            //             case NoteType.BIG_NOTE:
            //                 scaleMultiplier = 1.2;
            //             break;
            //         }

            //         // Tween the image scale
            //         const tween = scene.tweens.add({
            //             ease: 'Linear',
            //             targets: this.image, // Set to this note object
            //             scale: this.imageScaleX * scaleMultiplier,
            //             duration: 150,
            //             repeat: 0,
            //             onComplete: function() {
            //                 this.image.setScale(this.imageScaleX, this.imageScaleY);
            //             },
            //             callbackScope: this
            //         });     
            //     }
            // }

            // if(remove) {
            //     this.noteBeats.pop();
            // }

            if(this.noteBeats.length > 0) {
                let scaleMultiplier = 1.12;
                if(this.previewAudio.seek - this.previewStartTimeline <= 1) {
                    scaleMultiplier = 1.04;
                } else if(this.previewAudio.seek - this.previewStartTimeline <= 2) {
                    scaleMultiplier = 1.07;
                }
                
                if(this.previewEndTimeline - this.previewAudio.seek <= 0.5) {
                    scaleMultiplier = 1.04;
                } else if (this.previewEndTimeline - this.previewAudio.seek <= 1) {
                    scaleMultiplier = 1.07;
                }


                if(this.previewAudio.seek >= this.noteBeats[this.noteBeats.length - 1].time) {
                    const tween = scene.tweens.add({
                        ease: 'Linear',
                        targets: this.image, // Set to this note object
                        scale: this.imageScaleX * scaleMultiplier,
                        duration: 125,
                        repeat: 0,
                        onComplete: function() {
                            this.image.setScale(this.imageScaleX, this.imageScaleY);
                        },
                        callbackScope: this
                    });     

                    // Title
                    if(this.titleLabel != null) {
                        const titleTween = scene.tweens.add({
                            ease: 'Linear',
                            targets: this.titleLabel, // Set to this note object
                            scale: scaleMultiplier,
                            alpha: 0.5,
                            duration: 125,
                            repeat: 0,
                            onComplete: function() {
                                this.titleLabel.setScale(1);
                                this.titleLabel.alpha = 1;
                            },
                            callbackScope: this
                        });     
                    }
                    this.noteBeats.pop(); // Removed the beat at the end
                }
            }
        }
    }

    play(delay) {
        let config = {
            mute: false,
            volume: AudioConfig.music, // Get the current volume fonr the audio configuration
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