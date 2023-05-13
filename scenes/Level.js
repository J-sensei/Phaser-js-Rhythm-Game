/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/** Level scene for the player to play current selected song */
class Level extends Phaser.Scene {
    constructor() {
        super(SceneKey.LEVEL);
    }
    
    create() {
        /** Debug flag to enable some debug texts to display */
        this.debug = false;

        /** Take screen dimension width and height */
        const {width, height} = this.scale; // Take the screen width and height

        /** Travel time (Milisecond) / Early time to spawn notes */
        const travelTime = CurrentSong.getLaneSpeed(CurrentDifficulty); // Get the lane speed using getLaneSpeed in song for the current difficulty
        // Create beatmap object (responsible to spawn note with the audio)
        this.beatmap = new Beatmap(this, CurrentSong, CurrentSong.beatmapConfig, travelTime); 
        this.beatmap.create(); // Initialize beatmap
        // Disable draw line and metronome (Debug setting)
        this.beatmap.drawBeatLine = false;
        this.beatmap.playMetronome = false;

        Note.Reset(this); // Reset the note
        Score.GetInstance().reset();
        /** Reference to score class (Singleton class) */
        this.score = Score.GetInstance();

        // Background
        const backgroundData = [
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_BACK, 0, 360, width, height, 3.5, 50, LayerConfig.BACKGROUND),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_BUILDINGS, 0, 400, width, 240, 2.5, 100, LayerConfig.BACKGROUND),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_PALMS, 0, 470, width, 240, 2.5, 200, LayerConfig.BACKGROUND),
            new BackgroundData(BackgroundType.TILE_SPRITE, BackgroundId.SUNSET_HIGHWAY, 0, height - 240, width, 240, 2, 300, LayerConfig.BACKGROUND),
            new BackgroundData(BackgroundType.OBJECT, BackgroundId.SUNSET_PALMTREE, width, height - 200, 133, 208, 3, 500, LayerConfig.FOREGROUND)
        ];

        /** Parallax background object */
        this.background = new Background(this, backgroundData); // Create parallax backgrounds

        /** Speed of the background depends on the lane speed */
        let backgroundSpeed;
        if(CurrentDifficulty == Difficulty.EASY) {
            backgroundSpeed = CurrentSong.easyLaneSpeed * 0.1; // Get 0 - 1 value
        } else {
            backgroundSpeed = CurrentSong.hardLaneSpeed * 0.1; // Get 0 - 1 value
        }
        const basedSpeed = 1.2; // Base speed to multiply with the backgroud speed
        this.background.setSpeed(basedSpeed * (backgroundSpeed)); // 1 is normal speed, higher number means faster
        
        // Player
        this.player = new PlayerCar(this, PlayerPosition.x, PlayerPosition.y);
        this.player.create(); // Initialize player

        // Initialize judgement objects
        JudgeCollider.Reset(this); // Reset judgement collider static variables
        this.upJudge = new JudgeCollider(this, JudgementPositions[0].x, JudgementPositions[0].y, NoteCircleColor.UP);
        this.downJudge = new JudgeCollider(this, JudgementPositions[1].x, JudgementPositions[1].y, NoteCircleColor.DOWN);

        // Setup overlap logic for judge colliders and notes (Enable physic / collision detection for these two group)
        this.physics.add.overlap(JudgeCollider.JudgeColliders, Note.Notes, Note.NoteOverlap, null, this);

        this.createDebugLabels(); // Initialize debug labels neccessary for displaying debug variables
        
        // Song variables
        /** Count down time (seconds) */
        this.countDown = 3;
        this.currentCountDown = -this.countDown - CurrentSong.offset - (travelTime * 0.001);
        // e.g. 3s + offset + earlyTime to spawn notes
        // Count down will slightly more then the count down value set to make sure have enought time to pre spawn notes
        /** Is the song pausing */
        this.songPause = false;
        /** Seek to the song when the game is pause */
        this.stopSeek = -this.countDown;
        this.unpause = false;
        this.unpauseCountDown = this.countDown;

        /** Current playtime of the song (Negative value means count down is counting) */
        this.playTime = this.currentCountDown; // Need to have negative value to pre spawn the note before the song


        /** Is the song started */
        this.start = false;

        // initialize miss collider
        const missColliderPos = new Phaser.Math.Vector2(this.player.x, this.player.y); // Position
        this.missCollider = this.physics.add.sprite(missColliderPos.x, missColliderPos.y); // Create
        this.missCollider.setSize(20, 200); // Collider size

        // Note hit miss collider
        this.physics.add.overlap(this.missCollider, Note.Notes, function(missCollider, note) {
            // No Hit Note will not affect the score
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

        // Note hit player (Similar to miss collider but player will take damage)
        this.physics.add.overlap(this.player, Note.Notes, function(player, note) {
            // No Hit Note will not affect the score and player HP
            if(!note.hitted && !(note.type === NoteType.NO_HIT)) {
                player.damage(note); // Player will take damage here
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

        this.tweens.resumeAll(); // Make sure tween is running

        // Keys
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // Countdown sfx
        this.countdown_3 = this.sound.add(SFXId.COUTDOWN_3);
        this.playCountdown_3 = false;
        this.countdown_2 = this.sound.add(SFXId.COUTDOWN_2);
        this.playCountdown_2 = false;
        this.countdown_1 = this.sound.add(SFXId.COUTDOWN_1);
        this.playCountdown_1 = false;
        this.countdown_go = this.sound.add(SFXId.COUTDOWN_GO);
        this.playCountdown_go = false;

        // UI
        this.songProgressBar = new ProgressBar(this, 0, 0, game.config.width * 2, NoteCircleColor.DOWN);
        this.songProgressBar.setValue(0);

        HitText.CountDownTextInstantiate(this, "Get Ready...", 128); // Tell player to get ready
        this.displayDebug(this.debug);

        this.createPauseMenu();

        // Pause / Unpause based on the screen is in focus or not
        // Game window is out of focus (Switch other tab or applocationi)
        this.game.events.on(Phaser.Core.Events.BLUR, () => {
            // Auto pause the game if window is blur out (Prevent anything bad happen if player if switch the screen out)
            this.pause(); 
        });
        // Game window is focus back
        this.game.events.on(Phaser.Core.Events.FOCUS, () => {
            //this.togglePause();
        });

        // Start updating beatmap
        this.beatmap.start();
    }

    update() {
        const deltaTime = (game.loop.delta * 0.001); // Get the delta time of this frame
        this.updateDebugLabels(); // Update debug labels

        // Unpause
        if(this.songPause) {
            if(Phaser.Input.Keyboard.JustDown(this.escapeKey) && !this.unpause) {
                this.unpause = true;
                this.unpauseCountDown = this.countDown + 1;
                this.unpauseCountDown_3 = false;
                this.unpauseCountDown_2 = false;
                this.unpauseCountDown_1 = false;
                this.unpauseCountDown_go = false;
                // Hide the pause menu
                this.pausePanel.alpha = 0;
                for(let i = 0; i < this.menuLabels.length; i++) {
                    this.menuLabels[i].alpha = 0;
                }
            }

            if(this.unpause) {
                this.unpauseCountDown -= deltaTime;
                if(this.unpauseCountDown <= 0 && !this.unpauseCountDown_go) {
                    this.countdown_go.play(Note.SFXConfig);
                    HitText.CountDownTextInstantiate(this, "GO!", 256);
                    this.unpauseCountDown_go = true;
                    this.unpause = false;
                    this.resume();
                } else if(this.unpauseCountDown <= 1 && !this.unpauseCountDown_1) {
                    this.countdown_1.play(Note.SFXConfig);
                    HitText.CountDownTextInstantiate(this, "1", 128);
                    this.unpauseCountDown_1 = true;
                } else if(this.unpauseCountDown <= 2 && !this.unpauseCountDown_2) {
                    this.countdown_2.play(Note.SFXConfig);
                    HitText.CountDownTextInstantiate(this, "2", 128)
                    this.unpauseCountDown_2 = true;
                } else if(this.unpauseCountDown <= 3 && !this.unpauseCountDown_3) {
                    this.countdown_3.play(Note.SFXConfig);
                    HitText.CountDownTextInstantiate(this, "3", 128);
                    this.unpauseCountDown_3 = true;
                }
            }
        }

        if(this.songPause) return; // Don't bother to update things below if the game is pausing

        if(this.currentCountDown < 0) {
            // Count down!

            this.currentCountDown += deltaTime;
            this.playTime = this.currentCountDown;

            // Play count down audio
            if(this.currentCountDown >= 0 && !this.playCountdown_go) {
                this.countdown_go.play(Note.SFXConfig);
                HitText.CountDownTextInstantiate(this, "GO!", 256);
                this.playCountdown_go = true;
            } else if(this.currentCountDown >= -1 && !this.playCountdown_1) {
                this.countdown_1.play(Note.SFXConfig);
                HitText.CountDownTextInstantiate(this, "1", 128);
                this.playCountdown_1 = true;
            } else if(this.currentCountDown >= -2 && !this.playCountdown_2) {
                this.countdown_2.play(Note.SFXConfig);
                HitText.CountDownTextInstantiate(this, "2", 128);
                this.playCountdown_2 = true;
            } else if(this.currentCountDown >= -3 && !this.playCountdown_3) {
                this.countdown_3.play(Note.SFXConfig);
                const tweens = this.tweens.getTweensOf(HitText.CountDownTextInstantiate(this, "3", 128), true);

                this.playCountdown_3 = true;
            }

            if(this.currentCountDown >= 0) {
                // Play song
                CurrentSong.play(0);
            }
        } else {
            this.playTime = CurrentSong.song.seek;
            this.songProgressBar.setValue(this.playTime / CurrentSong.song.totalDuration);
        }

        // Parallax background scrolling
        this.background.update();
        //this.updateBeatmap();
        this.beatmap.update(this.playTime);
        // Player update
        this.player.update();

        // Hit notes
        const notesArray = Note.UpdateHit(JudgeConfig.colWidth * 2, this.player, this, this.playTime);
        let n = Note.HitNotes(notesArray);
        if(n != null) { // If note is not empty, meaning a note is hit and destroy by the player
            // Debug update note destroy text
            this.noteDestroyCount++;
            this.noteDestroyLabel.text = "Note Destroy: " + this.noteDestroyCount;

            HitText.NoteHitInstantiate(this, n); // Instantiate text to show hit result
            this.score.add(n.result); // Add the score

            // Camera shaking
            if(n.result != NoteHitResult.MISS && n.result != NoteHitResult.BAD) {
                let explodeSize = 3; // Explode size for particle emission
                if(n.type === NoteType.HOLD) {
                    this.cameras.main.shake(100, 0.0035, 0, null, this); // Small shake
                    explodeSize = 6;   
                }
                else if(n.type === NoteType.BIG_NOTE) {
                    this.cameras.main.shake(100, 0.01, 0, null, this); // Big shake
                    explodeSize = 16;   
                }

                // Render particle emission
                if(n.down) {
                    this.downJudge.emitter.explode(explodeSize);
                } else {
                    this.upJudge.emitter.explode(explodeSize);
                }
            }
        }

        // Go back to menu if song is playing and finish
        if(!CurrentSong.song.isPlaying && this.beatmap.finish()) {
            this.scene.start(SceneKey.SONG_SELECT);
        }
    }

    createPauseMenu() {
        this.menuLabels = [];

        // Create pause panel
        this.pausePanel = this.add.graphics();
        this.pausePanel.fillStyle(0x000000, 1);
        this.pausePanel.fillRect(0, 0, game.config.width, game.config.height);
        this.pausePanel.setDepth(LayerConfig.UI_PANEL);
        this.pausePanel.alpha = 0;

        this.pauseLabel = this.add.text(game.config.width / 2, game.config.height / 2.5, "Pause", {
            fontFamily: 'Silkscreen', 
            fontSize: 128
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.pauseSubLabel = this.add.text(game.config.width / 2, game.config.height / 2 + 36, "Press (escape) to unpause", {
            fontFamily: 'Silkscreen', 
            fontSize: 36
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.pauseSubLabel2 = this.add.text(game.config.width / 2, game.config.height / 2 + 36 * 2, "Press (R) back to retry", {
            fontFamily: 'Silkscreen', 
            fontSize: 36
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.pauseSubLabel3 = this.add.text(game.config.width / 2, game.config.height / 2 + 36 * 3, "Press (B) back to song selection", {
            fontFamily: 'Silkscreen', 
            fontSize: 36
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 

        this.menuLabels.push(this.pauseLabel);
        this.menuLabels.push(this.pauseSubLabel);
        this.menuLabels.push(this.pauseSubLabel2);
        this.menuLabels.push(this.pauseSubLabel3);

        for(let i = 0; i < this.menuLabels.length; i++) {
            this.menuLabels[i].alpha = 0;
        }
    }

    pause() {
        this.songPause = true;
        this.stopSeek = this.playTime; // Get the current stop time
        CurrentSong.song.stop();
        //this.tweens.pauseAll();
        //this.player.stop();
        Note.NoteHolding.pause();
        
        for(let i = 0; i < Note.Notes.getChildren().length; i++) {
            const tweens = this.tweens.getTweensOf(Note.Notes.getChildren()[i]);
            //x.pause();
            for(let j = 0; j < tweens.length; j++) {
                tweens[j].pause();
            }
        }

        this.pausePanel.alpha = 0.5;

        for(let i = 0; i < this.menuLabels.length; i++) {
            this.menuLabels[i].alpha = 1;
        }
    }

    resume() {
        this.songPause = false;
        //this.tweens.resumeAll();
        for(let i = 0; i < Note.Notes.getChildren().length; i++) {
            const tweens = this.tweens.getTweensOf(Note.Notes.getChildren()[i]);
            //x.pause();
            for(let j = 0; j < tweens.length; j++) {
                tweens[j].resume();
            }
        }

        Note.NoteHolding.resume();
        //this.player.play();

        if(this.playTime > 0) {
            CurrentSong.song.play();
            CurrentSong.song.seek = this.stopSeek;
        }
    }

    updateBeatmap() {
        if(this.currentCountDown < 0) {
            this.beatmap.update(this.currentCountDown);
        } else {
            this.beatmap.update(CurrentSong.song.seek);
        }
    }

    displayDebug(debug) {
        let alpha = 1;
        if(!debug) alpha = 0
        for(let i = 0; i < this.debugLabels.length; i++) {
            this.debugLabels[i].alpha = alpha;
        }
    }

    createDebugLabels() {
        this.debugLabels = [];

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
        this.songPlayingLabel = this.add.text(game.config.width / 5, 330, "Song Playing: " + CurrentSong.song.isPlaying, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.fpsLabel = this.add.text(game.config.width / 1.1, 30, "FPS: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 

        this.debugLabels.push(this.playTimeLabel);
        this.debugLabels.push(this.beatLabel);
        this.debugLabels.push(this.noteDestroyLabel);
        this.debugLabels.push(this.playerLabel);
        this.debugLabels.push(this.noteLabel);
        this.debugLabels.push(this.accLabel);
        this.debugLabels.push(this.comboLabel);
        this.debugLabels.push(this.scoreLabel);
        this.debugLabels.push(this.beatmapFinishLabel);
        this.debugLabels.push(this.songPlayingLabel);
        this.debugLabels.push(this.fpsLabel);
    }

    updateDebugLabels() {
        if(!this.debug) return; // Ignore updating these value of not in debug mode

        this.fpsLabel.text = "FPS: " + game.loop.actualFps.toFixed(2);
        this.beatLabel.text = this.beatmap.beatString();
        this.playerLabel.text = this.player.getDebugString();
        this.noteLabel.text = "Perfect: "+this.score.perfect+" Great: "+this.score.great+" Bad: "+this.score.bad+" Miss: " + this.score.miss;
        this.accLabel.text = "Accuracy: " + (this.score.accuracy * 100).toFixed(2) + "% ";
        this.comboLabel.text = "Combo: " + this.score.combo;
        this.scoreLabel.text = "Score: " + this.score.score;
        this.songPlayingLabel.text = "Song Playing: " + CurrentSong.song.isPlaying;
        this.beatmapFinishLabel.text = "Finish: " + this.beatmap.finish();

        // Song playtime label
        if(!CurrentSong.song.isPlaying) {
            // Show negative value for the count down as the song havenot start yet
            this.playTimeLabel.text = this.playTime.toFixed(2) + "/" + CurrentSong.duration().toFixed(2); // Show playtime debug
        } else {
            // Show the actual playtime of the song
            this.playTimeLabel.text = CurrentSong.playTimeString();   
        }
    }
}