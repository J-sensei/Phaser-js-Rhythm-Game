/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/**
 * Test debug scene
 */
class Debug extends Phaser.Scene {
    constructor() {
        super("Debug");
    }

    create() {
        // Song Skip config
        this.skipTime = 60;
        this.skip = false;

        this.noteCount = 0; // Reset the note count
        /** Travel time (Milisecond) / Early time to spawn notes */
        this.travelTime = 950;
        this.beatmap = new Beatmap(this, CurrentSong, CurrentSong.beatmapConfig); // Test
        this.beatmap.create();
        this.beatmap.drawBeatLine = false;
        this.beatmap.playMetronome = false;

        Note.Reset(this); // Reset the note
        /** Reference to score class */
        this.score = Score.GetInstance();

        // Background
        const {width, height} = this.scale; // Take the screen width and height
        const backgroundData = [
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_BACK, 0, 360, width, height, 3.5, 0.1, 0),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_BUILDINGS, 0, 400, width, 240, 2.5, 0.3, 0),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_PALMS, 0, 470, width, 240, 2.5, 0.5, 0),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_HIGHWAY, 0, height - 240, width, 240, 2, 1.5, 0),
            new BackgroundData(BackgroundType.OBJECT, BackgroundId.SUNSET_PALMTREE, width, height - 200, 133, 208, 3, 3, 100)
        ];

        /** Parallax background object */
        this.background = new Background(this, backgroundData);
        this.background.setSpeed(1); // 1 is normal speed, higher number means faster

        // Player
        this.player = new PlayerCar(this, PlayerPosition.x, PlayerPosition.y);
        this.player.create(); // Initialize player

        // Set debug texts
        this.playTimeLabel = this.add.text(game.config.width / 2, 30, " ", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.beatLabel = this.add.text(game.config.width / 5, 30, this.beatmap.beatString(), {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.noteDestroyCount = 0;
        this.noteDestroyLabel = this.add.text(game.config.width / 5, 60, "Note Destroy: " + this.noteDestroyCount, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.playerLabel = this.add.text(game.config.width / 5, 90, this.player.getDebugString(), {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.noteLabel = this.add.text(game.config.width / 5, 150, "Perfect: 0, Great: 0, Bad: 0, Miss: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.accLabel = this.add.text(game.config.width / 5, 180, "Accuracy: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.comboLabel = this.add.text(game.config.width / 5, 210, "Combo: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.scoreLabel = this.add.text(game.config.width / 5, 240, "Score: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.fpsLabel = this.add.text(game.config.width / 1.1, 30, "FPS: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 

        // Song test
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // Add spacebar input
        this.playTime = 0;
        this.lastUpdateTime = this.time.now;

        // Pause / Unpause based on the screen is in focus or not
        // Game window is out of using
        this.game.events.on(Phaser.Core.Events.BLUR, () => {
            this.togglePause();
        });
        // Game window is focus back
        this.game.events.on(Phaser.Core.Events.FOCUS, () => {
            this.togglePause();
        });

        // Judgement objects
        JudgeCollider.Reset(this); // Reset judgement collider static variables
        this.upJudge = new JudgeCollider(this, JudgementPositions[0].x, JudgementPositions[0].y, NoteCircleColor.UP);
        this.downJudge = new JudgeCollider(this, JudgementPositions[1].x, JudgementPositions[1].y, NoteCircleColor.DOWN);

        // Setup overlap logic for judge colliders and notes
        this.physics.add.overlap(JudgeCollider.JudgeColliders, Note.Notes, Note.NoteOverlap, null, this);

        /** Start countdown */
        this.startTime = -3;
        /** Is the song pausing */
        this.pause = true;
        /** Is the song started */
        this.start = false;

        this.missCollider = this.physics.add.sprite(this.player.x - 80, this.player.y);
        this.missCollider.setSize(20, 200);
        this.physics.add.overlap(this.missCollider, Note.Notes, function(missCollider, note) {
            if(!note.hitted && !(note.type === NoteType.NO_HIT)) {
                note.result = NoteHitResult.MISS;
                this.score.add(NoteHitResult.MISS);

                // Double miss for hold note
                if(note.type === NoteType.HOLD) {
                    this.score.add(NoteHitResult.MISS);
                }

                let t = new HitText(this, this.player.x - 80, this.player.y, "X", null, 64);
                t.setColor("#eb3434");
                t.destroyText();
                note.destroyNote();
            }
        }, null, this);

        // this.testV = this.physics.add.sprite(400, 400, SpriteId.VEHICLE1).setOrigin(0.5).play(AnimationId.VEHICLE1);
        // const tween = this.tweens.add({
        //     ease: 'Linear',
        //     targets: this.testV, // Set to this note object
        //     x: 1380, // Destination in x position
        //     duration: 1000, // Time required travel to destination (Subtract by the delay)
        //     repeat: -1, // No repeat
        //     callbackScope: this
        // });    
        // tween.seek(500);
        //tween.seek(0.5);
    }

    togglePause() {
        this.pause = !this.pause; // Reverse pausing

        // Pause and resume the moving tween object (notes)
        if(this.pause) {
            this.tweens.pauseAll();
            //this.background.stop();
        } else {
            this.tweens.resumeAll();
            //this.background.start();
        }

        const t = new Date();
        this.lastUpdateTime = t.getTime();
    }

    update() {
        if(CurrentSong.playing() && !this.sound.locked && !this.pause) {
            this.playTime = CurrentSong.song.seek; // Get the accurate current time of the song
        }

        if(!this.pause) {
            this.beatmap.update(this.playTime);
        }

        // Parallax background scrolling
        this.background.update();
        // Player update
        this.player.update();

        // Start the song only if the song is not playing
        if(Phaser.Input.Keyboard.JustDown(this.spacebar) && !CurrentSong.song.isPlaying){
            this.playTime = this.startTime; // Initialize the playtime
            const t = new Date();
            this.lastUpdateTime = t.getTime();
            this.pause = false;

            this.beatmap.start();
            if(this.skip)
                this.beatmap.setSkip(this.skipTime); // Skip song

            this.start = true;
            this.tweens.resumeAll();
        }
            
        // Play the song if its already started
        if(!this.pause && this.start && !CurrentSong.song.isPlaying) {
            // Count down
            const t = new Date();
            const currentTime = t.getTime();
            this.deltaTime = (currentTime * 0.001) - (this.lastUpdateTime * 0.001);
            this.playTime += this.deltaTime;
            this.lastUpdateTime = currentTime;

            if(this.playTime >= 0) {
                // Play the song
                CurrentSong.play(0);

                // Skip to certain part of the song if skip is set to true
                if(this.skip)
                    this.beatmap.jumpTo(this.skipTime); // Skip song
                this.start = false;
            }
        }

        if(this.pause) return; // If pausing don't bother to check the note hitting logic

        const notesArray = Note.UpdateHit(JudgeConfig.colWidth * 2, this.player, this);
        let n = Note.HitNotes(notesArray);
        if(n != null) { // If note is not empty, meaning a note is hit and destroy by the player
            this.noteDestroyCount++;
            this.noteDestroyLabel.text = "Note Destroy: " + this.noteDestroyCount;
            HitText.NoteHitInstantiate(this, n); // Instantiate text to show hit result
            this.score.add(n.result); // Add the score

            // Camera shaking
            if(n.result != NoteHitResult.MISS && n.result != NoteHitResult.BAD) {
                let explodeSize = 3;
                if(n.type === NoteType.HOLD) {
                    this.cameras.main.shake(100, 0.0035, 0, null, this); // Small shake
                    explodeSize = 6;   
                }
                else if(n.type === NoteType.BIG_NOTE) {
                    this.cameras.main.shake(100, 0.01, 0, null, this); // Big shake
                    explodeSize = 16;   
                }

                if(n.down) {
                    this.downJudge.emitter.explode(explodeSize);
                } else {
                    this.upJudge.emitter.explode(explodeSize);
                }
            }
        }

        // Test show note score
        this.beatLabel.text = this.beatmap.beatString();
        this.playerLabel.text = this.player.getDebugString();
        this.noteLabel.text = "Perfect: "+this.score.perfect+" Great: "+this.score.great+" Bad: "+this.score.bad+" Miss: " + this.score.miss;
        this.accLabel.text = "Accuracy: " + (this.score.accuracy * 100).toFixed(2) + "% ";
        this.comboLabel.text = "Combo: " + this.score.combo;
        this.scoreLabel.text = "Score: " + this.score.score;
        this.fpsLabel.text = "FPS: " + game.loop.actualFps;

        // Song playtime label
        if(!CurrentSong.playing())
            this.playTimeLabel.text = this.playTime.toFixed(2) + "/" + CurrentSong.duration().toFixed(2); // Show playtime debug
        else
            this.playTimeLabel.text = CurrentSong.playTimeString();

        if(CurrentSong.playing() && !this.sound.locked && !this.pause) {
            this.playTime = CurrentSong.song.seek; // Get the accurate current time of the song
        }

        if(!this.pause) {
            this.beatmap.update(this.playTime);
        }
    }

    /**
     * Instantiate note to the current scene
     * @param {string} type 
     * @param {bool} down 
     * @param {number} holdTime 
     * @returns Note
     */
    instantiateNote(type, down, holdTime, parentNote, delay) {
        let spawn;
        let judgementPos;
        let n = null; // Note
        if(down) {
            spawn = new Phaser.Math.Vector2(NoteSpawnPoint[0].x, NoteSpawnPoint[0].y);
            judgementPos = new Phaser.Math.Vector2(JudgementPositions[0].x, JudgementPositions[0].y);
        }
        else {
            spawn = new Phaser.Math.Vector2(NoteSpawnPoint[1].x, NoteSpawnPoint[1].y);
            judgementPos = new Phaser.Math.Vector2(JudgementPositions[1].x, JudgementPositions[1].y);
        }

        if(type == NoteType.HOLD) {
            n = Note.Instantiate(this, SpriteId.VEHICLE1, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime, null, delay);
            n.play(AnimationId.VEHICLE1);
            n.flipX = true;
        } else if(type == NoteType.NORMAL) {
            n = Note.Instantiate(this, SpriteId.CONE, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type, null, null, delay);
            n.setScale(0.2);
        } else if(type === NoteType.NO_HIT) {
            n = Note.Instantiate(this, SpriteId.MUSIC_NOTE, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type, null, null, delay);
            n.setScale(0.15);
        } else if(type === NoteType.BIG_NOTE) {
            n = Note.Instantiate(this, SpriteId.VEHICLE2, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime, null, delay);
            n.play(AnimationId.VEHICLE2);
            n.flipX = true;
            n.setScale(0.8);
        } else if(type === NoteType.END && parentNote.result != NoteHitResult.MISS && parentNote.result != NoteHitResult.BAD) {
            n = Note.Instantiate(this, SpriteId.VEHICLE1, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime, parentNote, delay);
            n.play(AnimationId.VEHICLE1);
            n.flipX = true;
        }

        return n;
    }
}