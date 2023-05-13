/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/


/**
 * Song data, contains function use to play song and song data
 * @param { Scene } scene Phaser Scene reference
 * @param { string } id Unique ID for the song
 * @param { string } path Location of the song resources 
 */
class Song extends Phaser.GameObjects.Sprite {
    constructor(scene, id, path, indexId) {
        super(scene, 0, 0, "Test"); // Test

        // Set class variables
        this.id = id;
        this.path = path;
        this.scene = scene;
        this.index = indexId;

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
            offset: this.offset,
            laneSpeed: this.getLaneSpeed(CurrentDifficulty),
        }
        this.beatmap = new Beatmap(this, this, this.beatmapConfig);
        this.beatmap.create();

        if(data.easyLaneSpeed != null)
            this.easyLaneSpeed = data.easyLaneSpeed;
        else
            this.easyLaneSpeed = 1.0;

        if(data.hardLaneSpeed != null)
            this.hardLaneSpeed = data.hardLaneSpeed;
        else
            this.hardLaneSpeed = 1.0;
    }

    /**
     * Get the lane speed based on the song difficulty
     * @param {Difficulty} difficulty Difficulty enum
     * @returns number
     */
    getLaneSpeed(difficulty) {
        const baseDuration = 1800;
        switch(difficulty) {
            case Difficulty.EASY:
                return baseDuration - (this.easyLaneSpeed / 0.01);
                break;
            case Difficulty.HARD:
                return baseDuration - (this.hardLaneSpeed / 0.01);
                break;
        }
    }

    /**
     * Create the song UI to display as the menu UI
     * @param {Scene} scene Current scene to create the song UI
     * @param {number} x X position of the UI
     * @param {number} y Y position of the UI
     */
    createSongUI(scene, x, y) {
        if(this.image == null) { 
            this.createSongImage(scene, x, y);   
        } else {
            this.image.x = x;
            this.image.y = y;
            //this.image.alpha = 1;

            scene.tweens.add({
                ease: "Linear",
                targets: this.image,
                alpha: 1,
                duration: 150,
                repeat: 0,
                callbackScope: this,
            });
        }

        if(this.songLabels == null) {
            this.createSongLabels(scene, x, y);
        } else {
            const labelOffset = 250;
            const labelY = 32;
            for(let i = 0; i < this.songLabels.length; i++) {
                let off = 0;
                if(i > 0) {
                    off = 5;
                }
                this.songLabels[i].x = x;
                this.songLabels[i].y = y + labelOffset + (labelY * i) + off;
                scene.tweens.add({
                    ease: "Linear",
                    targets: this.songLabels[i],
                    alpha: 1,
                    duration: 150,
                    repeat: 0,
                    callbackScope: this,
                });    
            }
        }
    }

    createSongImage(scene, x, y) {
        const size = 400; // Fixed size of the image
        this.image = scene.add.rexCircleMaskImage(x, y, this.imageId, null, null); // Create a circle image using the plugin

        // Scale the image based on the constant size given above
        this.imageScaleX = size / this.image.width;
        this.imageScaleY = size / this.image.height;
        this.image.setScale(this.imageScaleX, this.imageScaleY);

        // Remember the original positions
        this.originalX = this.image.x;
        this.originalY = this.image.y;
        this.image.alpha = 0; // Set the alpha value to 0 for the tween transition

        // Transition to make the image fade in when selected
        scene.tweens.add({
            ease: "Linear",
            targets: this.image,
            alpha: 1,
            duration: 300,
            repeat: 0,
            callbackScope: this,
        });

        // Rotate the image
        //const easeList = ["Linear", "Sine.easeInOut", "Bounce.easeInOut"];
        //const easeList = ["Linear", "Sine.easeInOut"];
        const easeList = ["Linear"];
        const tween = scene.tweens.add({
            ease: easeList[Phaser.Math.Between(0, easeList.length)],
            targets: this.image,
            angle: this.image.angle + 360,
            duration: this.bpm * 40,
            repeat: -1,
            callbackScope: this,
        });
    }

    createSongLabels(scene, x, y) {
        /** Array of all song labels */
        this.songLabels = []; 
        const fontSize = 32;
        const fontFamily = "Silkscreen";
        const origin = 0.5;

        // Create song labels
        // Source (Where the song from e.g. video game, anime, album name)
        this.sourceLabel = scene.add.text(x, y + 250, "Source: " + this.source, {
            fontFamily: fontFamily, 
            fontSize: fontSize
        }).setOrigin(origin); 
        // Name of the song
        this.songNameLabel = scene.add.text(x, y + 250 + 32 + 5, "Name: " + this.name, {
            fontFamily: fontFamily, 
            fontSize: fontSize
        }).setOrigin(origin); 
        // Creator of the song
        this.artistLabel = scene.add.text(x, y + 250 + 32*2 + 5, "Artist: " + this.artist, {
            fontFamily: fontFamily, 
            fontSize: fontSize
        }).setOrigin(origin); 
        // BPM of the song (Beat per minute)
        this.bpmLabel = scene.add.text(x, y + 250 + 32*3 + 5, "BPM: " + this.bpm, {
            fontFamily: fontFamily, 
            fontSize: fontSize
        }).setOrigin(origin); 

        // Get the duration of the song (seconds)
        const totalSeconds = this.song.totalDuration;
        const date = new Date(0); // Create date object
        // Set the date object to the duration of the song (minus offset as no note will spawn there)
        date.setSeconds(totalSeconds - this.offset); // Specify value for SECONDS here 
        const timeString = date.toISOString().substring(14, 19);
        // Length of the song (Expect value of how long the song should be)
        this.lengthLabel = scene.add.text(x, y + 250 + 32*4 + 5, "Length: " + timeString , {
            fontFamily: fontFamily, 
            fontSize: fontSize
        }).setOrigin(origin); 

        // Add into the song array
        this.songLabels.push(this.sourceLabel);
        this.songLabels.push(this.songNameLabel);
        this.songLabels.push(this.artistLabel);
        this.songLabels.push(this.bpmLabel);
        this.songLabels.push(this.lengthLabel);

        for(let i = 0; i < this.songLabels.length; i++) {
            this.songLabels[i].alpha = 0;
            scene.tweens.add({
                ease: "Linear",
                targets: this.songLabels[i],
                alpha: 1,
                duration: 150,
                repeat: 0,
                callbackScope: this,
            });      
        }
    }

    /** Destroy and remove the image and labels properly */
    disposeSongUI() {
        // Destroy the image and set it to null
        if(this.image != null) {
            this.image.destroy();
            this.image = null;
        }

        // Destroy text labels and set to null
        if(this.songLabels != null) {
            for(let i = 0; i < this.songLabels.length; i++) {
                this.songLabels[i].destroy();
            }
            this.songLabels = null;
        }
    }

    moveImage(scene, x, y) {

        let targetX = this.originalX;
        let targetY = this.originalY;
        if(x != null)
            targetX= x;
        if(y != null)
            targetY= y;

        scene.tweens.add({
            ease: "Linear",
            targets: this.image,
            x: targetX,
            y: targetY,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });

        let alpha = 0;
        if(x == null || y == null) alpha = 1;

        for(let i = 0; i < this.songLabels.length; i++) {
            scene.tweens.add({
                ease: "Linear",
                targets: this.songLabels[i],
                alpha: alpha,
                duration: 150,
                repeat: 0,
                callbackScope: this,
            });      
        }
    }

    /**
     * Start preview the song
     * @param {Scene} scene Current scene
     */
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

    switchOut(scene, isLeft) {
        this.previewAudio.stop();

        const moveDistance = 250;
        let moveX = 0;
        if(isLeft) moveX = this.image.x - moveDistance;
        else moveX = this.image.x + moveDistance;

        scene.tweens.add({
            ease: "Linear",
            targets: this.image,
            x: moveX,
            alpha: 0,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });    

        for(let i = 0; i < this.songLabels.length; i++) {
            scene.tweens.add({
                ease: "Linear",
                targets: this.songLabels[i],
                x: moveX,
                alpha: 0,
                duration: 150,
                repeat: 0,
                callbackScope: this,
            });      
        }

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
                            alpha: 0.55,
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


    /**
     * Get array of note datas
     * @returns Note Data[]
     */
    getNoteData() {
        //return NiniEasyMap; // Testing Code
        // TODO: load the data from json file instead!!
        //console.log(this.id);
        if(this.id === "Song0") {
            if(CurrentDifficulty === Difficulty.EASY)
                return ByeOrNotEasyMap;
            else if(CurrentDifficulty === Difficulty.HARD)
                return ByeOrNotHardMap;
        } else if(this.id === "Song1") {
            if(CurrentDifficulty === Difficulty.EASY)
                return NiniEasyMap;
            else if(CurrentDifficulty === Difficulty.HARD)
                return NiniHardMap;
        } else if(this.id === "Song2") {
            if(CurrentDifficulty === Difficulty.EASY)
                return CyaeghaEasyMap;
            else if(CurrentDifficulty === Difficulty.HARD)
                return CyaeghaHardMap;
        }
        else {
            return [];
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