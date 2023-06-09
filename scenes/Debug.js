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
        super(SceneKey.DEBUG);
    }

    create() {
        // Song Skip config
        this.skipTime = 110;
        this.skip = false;
        this.autoStart  = true;

        /** Travel time (Milisecond) / Early time to spawn notes */
        this.travelTime = CurrentSong.getLaneSpeed(CurrentDifficulty);
        this.beatmap = new Beatmap(this, CurrentSong, CurrentSong.beatmapConfig, this.travelTime); // Test
        this.beatmap.create();
        this.beatmap.drawBeatLine = false;
        this.beatmap.playMetronome = false;

        Score.GetInstance().reset();
        Note.Reset(this); // Reset the note
        /** Reference to score class */
        this.score = Score.GetInstance();

        // Background
        const {width, height} = this.scale; // Take the screen width and height
        const backgroundData = [
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_BACK, 0, 360, width, height, 3.5, 50, 0),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_BUILDINGS, 0, 400, width, 240, 2.5, 100, 0),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_PALMS, 0, 470, width, 240, 2.5, 200, 0),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_HIGHWAY, 0, height - 240, width, 240, 2, 300, 0),
            new BackgroundData(BackgroundType.OBJECT, BackgroundId.SUNSET_PALMTREE, width, height - 200, 133, 208, 3, 500, 100)
        ];

        /** Parallax background object */
        this.background = new Background(this, backgroundData);

        let backgroundSpeed;
        if(CurrentDifficulty == Difficulty.EASY) {
            backgroundSpeed = CurrentSong.easyLaneSpeed;
        } else {
            backgroundSpeed = CurrentSong.hardLaneSpeed;
        }
        console.log(backgroundSpeed);
        const basedSpeed = 1.2
        this.background.setSpeed(basedSpeed * (backgroundSpeed * 0.1)); // 1 is normal speed, higher number means faster

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
        this.playerLabel = this.add.text(game.config.width / 5, 120, this.player.getDebugString(), {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.noteLabel = this.add.text(game.config.width / 4.5, 180, "Perfect: 0, Great: 0, Bad: 0, Miss: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.accLabel = this.add.text(game.config.width / 5, 210, "Accuracy: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.comboLabel = this.add.text(game.config.width / 5, 240, "Combo: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.scoreLabel = this.add.text(game.config.width / 5, 270, "Score: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.beatmapFinishLabel = this.add.text(game.config.width / 5, 300, "Finish: " + this.beatmap.finish(), {
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
        /** Is the song has started since the scene loaded */
        this.startOnce = false;

        const missColliderPos = new Phaser.Math.Vector2(this.player.x, this.player.y);

        this.missCollider = this.physics.add.sprite(missColliderPos.x, missColliderPos.y);
        this.missCollider.setSize(20, 200);

        // Note hit miss collider
        this.physics.add.overlap(this.missCollider, Note.Notes, function(missCollider, note) {
            if(!note.hitted && !(note.type === NoteType.NO_HIT)) {
                note.result = NoteHitResult.MISS;
                this.score.add(NoteHitResult.MISS);

                // Double miss for hold note
                if(note.type === NoteType.HOLD) {
                    this.score.add(NoteHitResult.MISS);
                }

                let t = new HitText(this, missColliderPos.x, missColliderPos.y, "X", null, 64);
                t.setColor("#eb3434");
                t.destroyText();
                note.destroyNote();
            }
        }, null, this);

        // Note hit player
        this.physics.add.overlap(this.player, Note.Notes, function(player, note) {
            if(!note.hitted && !(note.type === NoteType.NO_HIT)) {
                player.damage(note);
                note.result = NoteHitResult.MISS;
                this.score.add(NoteHitResult.MISS);

                // Double miss for hold note
                if(note.type === NoteType.HOLD) {
                    this.score.add(NoteHitResult.MISS);
                }

                let t = new HitText(this, this.player.x, this.player.y, "X", null, 64);
                t.setColor("#eb3434");
                t.destroyText();
                note.destroyNote();
            }
        }, null, this);
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
        // Display FPS
        this.fpsLabel.text = "FPS: " + game.loop.actualFps.toFixed(2);
        
        if(CurrentSong.song.isPlaying) {
            this.playTime = CurrentSong.song.seek; // Get the accurate current time of the song
            if(!this.pause) {
                this.beatmap.update(this.playTime);
            }
        }

        // Parallax background scrolling
        this.background.update();
        // Player update
        this.player.update();

        // Test updating beatmap
        if(CurrentSong.song.isPlaying) {
            this.playTime = CurrentSong.song.seek; // Get the accurate current time of the song
            if(!this.pause) {
                this.beatmap.update(this.playTime);
            }
        }


        // Start the song only if the song is not playing
        if((Phaser.Input.Keyboard.JustDown(this.spacebar) || this.autoStart) && !CurrentSong.song.isPlaying){
            this.playTime = this.startTime; // Initialize the playtime
            const t = new Date();
            this.lastUpdateTime = t.getTime();
            this.pause = false;

            this.beatmap.start();
            if(this.skip)
                this.beatmap.setSkip(this.skipTime); // Skip song

            this.start = true;
            this.tweens.resumeAll();
            this.autoStart = false;
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
                this.startOnce = true;
            }
        }

        if(this.startOnce && !CurrentSong.song.isPlaying) {
            this.scene.start(SceneKey.SONG_SELECT);
        }

        if(this.pause) return; // If pausing don't bother to check the note hitting logic

        // Test updating beatmap
        if(CurrentSong.song.isPlaying) {
            this.playTime = CurrentSong.song.seek; // Get the accurate current time of the song
            if(!this.pause) {
                this.beatmap.update(this.playTime);
            }
        }


        const notesArray = Note.UpdateHit(JudgeConfig.colWidth * 2, this.player, this, this.playTime);
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
        this.beatmapFinishLabel.text = "Finish: " + this.beatmap.finish();

        // Song playtime label
        if(!CurrentSong.playing())
            this.playTimeLabel.text = this.playTime.toFixed(2) + "/" + CurrentSong.duration().toFixed(2); // Show playtime debug
        else
            this.playTimeLabel.text = CurrentSong.playTimeString();

        // Test updating beatmap
        if(CurrentSong.song.isPlaying) {
            this.playTime = CurrentSong.song.seek; // Get the accurate current time of the song
        }
        // if(!this.pause) {
        //     this.beatmap.update(this.playTime);
        // }
    }

    // /**
    //  * Instantiate note to the current scene
    //  * @param {string} type 
    //  * @param {bool} down 
    //  * @param {number} holdTime 
    //  * @returns Note
    //  */
    // instantiateNote(type, down, holdTime, parentNote, delay, targetTime) {
    //     let spawn;
    //     let judgementPos;
    //     let n = null; // Note
    //     if(down) {
    //         spawn = new Phaser.Math.Vector2(NoteSpawnPoint[0].x, NoteSpawnPoint[0].y);
    //         judgementPos = new Phaser.Math.Vector2(JudgementPositions[0].x, JudgementPositions[0].y);
    //     }
    //     else {
    //         spawn = new Phaser.Math.Vector2(NoteSpawnPoint[1].x, NoteSpawnPoint[1].y);
    //         judgementPos = new Phaser.Math.Vector2(JudgementPositions[1].x, JudgementPositions[1].y);
    //     }

    //     if(type == NoteType.HOLD) {
    //         n = Note.Instantiate(this, SpriteId.VEHICLE1, spawn.x, spawn.y, 
    //             judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime, null, delay, targetTime);
    //         n.play(AnimationId.VEHICLE1);
    //         n.flipX = true;
    //     } else if(type == NoteType.NORMAL) {
    //         n = Note.Instantiate(this, SpriteId.CONE, spawn.x, spawn.y, 
    //             judgementPos.x, judgementPos.y, this.travelTime, down, type, null, null, delay, targetTime);
    //         n.setScale(0.2);
    //     } else if(type === NoteType.NO_HIT) {
    //         n = Note.Instantiate(this, SpriteId.MUSIC_NOTE, spawn.x, spawn.y, 
    //             judgementPos.x, judgementPos.y, this.travelTime, down, type, null, null, delay, targetTime);
    //         n.setScale(0.15);
    //     } else if(type === NoteType.BIG_NOTE) {
    //         n = Note.Instantiate(this, SpriteId.VEHICLE2, spawn.x, spawn.y, 
    //             judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime, null, delay, targetTime);
    //         n.play(AnimationId.VEHICLE2);
    //         n.flipX = true;
    //         n.setScale(0.8);
    //     } else if(type === NoteType.END && parentNote.result != NoteHitResult.MISS && parentNote.result != NoteHitResult.BAD) {
    //         n = Note.Instantiate(this, SpriteId.VEHICLE1, spawn.x, spawn.y, 
    //             judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime, parentNote, delay, targetTime);
    //         n.play(AnimationId.VEHICLE1);
    //         n.flipX = true;
    //     }

    //     return n;
    // }
}