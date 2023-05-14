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

                let t = new HitText(this, note.x, note.y, "X", null, 64);
                t.setColor("#eb3434");
                t.destroyText();
                note.destroyNote();
            }
        }, null, this);

        this.tweens.resumeAll(); // Make sure tween is running

        // Keys
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.upKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.downKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

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
        this.songProgressBar = new ProgressBar(this, 0, -16, game.config.width);
        this.songProgressBar.setValue(0);
        this.songProgressBar.setDepth(LayerConfig.UI)
        
        this.healthProgressBarBackground = new ProgressBar(this, game.config.width / 2 - 150, 50 - 16, 300, "#9c3333");
        this.healthProgressBar = new ProgressBar(this, game.config.width / 2 - 150, 50 - 16, 300, "#e64e4e");
        this.healthProgressBar.setValue(this.player.hp / this.player.maxHp);
        this.healthProgressBar.setDepth(LayerConfig.UI)
        this.healthLabel = this.add.text(game.config.width / 2, 50, this.player.hp + "/" + this.player.maxHp, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI);

        // HitText.CountDownTextInstantiate(this, "Get Ready...", 128); // Tell player to get ready
        this.displayDebug(this.debug);

        this.createPauseMenu();

        // Load the UI audios
        this.selectAudio = this.sound.add(SFXId.SELECT);
        this.backAudio = this.sound.add(SFXId.BACK);
        this.clickAudio = this.sound.add(SFXId.CLICK);
        this.fullcombo = this.sound.add(SFXId.FULL_COMBO);
        this.allperfect = this.sound.add(SFXId.ALL_PERFECT);

        // Pause / Unpause based on the screen is in focus or not
        // Game window is out of focus (Switch other tab or applocationi)
        this.game.events.on(Phaser.Core.Events.BLUR, () => {
            // Auto pause the game if window is blur out (Prevent anything bad happen if player if switch the screen out)
            if(this.start && !this.gameOver)
                this.pause(); 
        });
        // Game window is focus back
        this.game.events.on(Phaser.Core.Events.FOCUS, () => {
            //this.togglePause();
        });

        this.createUI();
        this.createLoseUI();
        CurrentSong.createSongPreviewUI(this);

        this.end = false;
        this.endCountdown = 3;
        this.showFullCombo = false;

        // Start updating beatmap
        this.beatmap.start();

        /** Level is finish loaded and ready to start */
        this.start = true;
    }

    update() {
        const deltaTime = (game.loop.delta * 0.001); // Get the delta time of this frame
        this.updateDebugLabels(); // Update debug labels
        // Parallax background scrolling

        if(!this.gameOver && !this.songPause)
            this.background.update();

        if(this.end) {
            this.endCountdown -= deltaTime;
            if(this.endCountdown <= 0) {
                this.scene.start(SceneKey.RESULT);
            }

            if(this.score.fullCombo() && !this.showFullCombo) {
                if(this.score.allPerfect()) {
                    this.allperfect.play(Note.SFXConfig);
                    HitText.CountDownTextInstantiate(this, "ALL Perfect!!!", 128, null, 2500);
                } else {
                    this.fullcombo.play(Note.SFXConfig);
                    HitText.CountDownTextInstantiate(this, "Full Combo!!!", 128, null, 2500);
                }

                this.showFullCombo = true;
            }
            return;
        }

        if(this.gameOver) {
            if(Phaser.Input.Keyboard.JustDown(this.upKey) || Phaser.Input.Keyboard.JustDown(this.upKey2)) {
                this.updateLoaseOption(true);
            } else if(Phaser.Input.Keyboard.JustDown(this.downKey) || Phaser.Input.Keyboard.JustDown(this.downKey2)) {
                this.updateLoaseOption(false);
            }
            
            if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                this.selectAudio.play(Note.SFXConfig);
                switch(this.loseOption) {
                    case 0:
                        this.scene.start(SceneKey.LEVEL);
                        break;
                    case 1:
                        this.scene.start(SceneKey.SONG_SELECT);
                        break;
                }
            }

            return; // Game over no need to take care other thing
        }

        // Unpause
        if(this.songPause) {
            if(Phaser.Input.Keyboard.JustDown(this.escapeKey) && !this.unpause) {
                this.selectAudio.play(Note.SFXConfig);
                this.readyUnpause();
            }

            if(!this.unpause) {
                if(Phaser.Input.Keyboard.JustDown(this.upKey) || Phaser.Input.Keyboard.JustDown(this.upKey2)) {
                    this.updateMenuOption(true);
                } else if(Phaser.Input.Keyboard.JustDown(this.downKey) || Phaser.Input.Keyboard.JustDown(this.downKey2)) {
                    this.updateMenuOption(false);
                }
                
                if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                    this.selectAudio.play(Note.SFXConfig);
                    switch(this.menuOption) {
                        case 0:
                            this.readyUnpause();
                            break;
                        case 1:
                            this.scene.start(SceneKey.LEVEL);
                            break;
                        case 2:
                            this.scene.start(SceneKey.SONG_SELECT);
                            break;
                    }
                }
            }

            if(this.unpause) {
                this.unpauseCountDown -= deltaTime;
                if(this.unpauseCountDown <= 0 && !this.unpauseCountDown_go) {
                    if(!this.unpauseImmediate) {
                        this.countdown_go.play(Note.SFXConfig);
                        HitText.CountDownTextInstantiate(this, "GO!", 256);
                    }
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
        } else {
            if(Phaser.Input.Keyboard.JustDown(this.escapeKey)) {
                this.pause();
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
                HitText.CountDownTextInstantiate(this, "3", 128);
                // Move the preview image
                CurrentSong.movePreviewUI(this, (game.config.width) - (400 / 4) - 100 , 400 / 4 + 30);
                this.playCountdown_3 = true;
            }

            if(this.currentCountDown >= 0) {
                // Play song
                CurrentSong.play(0);
            }
        } else {
            if(CurrentSong.song.isPlaying) {
                this.playTime = CurrentSong.song.seek;
                this.songProgressBar.setValue(this.playTime / CurrentSong.song.totalDuration);
            } else {
                this.songProgressBar.setValue(1);
            }
        }

        // Update beatmap to spawn notes
        //this.beatmap.update(CurrentSong.song.seek);
        this.updateBeatmap();

        // Player update
        this.player.update();

        // Hit notes
        const notesArray = Note.UpdateHit(JudgeConfig.colWidth * 2, this.player, this, this.playTime);
        let n = Note.HitNotes(notesArray);

        // Update beatmap to spawn notes
        //this.beatmap.update(CurrentSong.song.seek);
        this.updateBeatmap();

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

                this.updateCombo(this.score.combo, n);
            }
        }
        // Update beatmap to spawn notes
        //this.beatmap.update(CurrentSong.song.seek);
        this.updateBeatmap();


        // Go back to menu if song is playing and finish
        if(!CurrentSong.song.isPlaying && this.beatmap.finish()) {
            this.start = false;
            //this.scene.start(SceneKey.SONG_SELECT);
            this.end = true; // Song is ended

            if(this.score.fullCombo()) {
                this.endCountdown = 4;
            } else {
                this.endCountdown = 1;
            }
        }

        this.updateCombo(this.score.combo, null);
        this.updateScore(this.score.score, (this.score.accuracy * 100).toFixed(2));

        // Update player health
        this.healthProgressBar.setValue(this.player.hp / this.player.maxHp);
        this.healthLabel.text = this.player.hp + "/" + this.player.maxHp;

        if(this.player.hp <= 0) {
            this.gameOver = true;

            // Show game over UI
            this.lose();

            // Fade out song
            CurrentSong.fadeOutStop(this, 1000);
        }
        // Update beatmap to spawn notes
        //this.beatmap.update(CurrentSong.song.seek);
        this.updateBeatmap();
    }

    updateLoaseOption(up) {
        this.selectAudio.play(Note.SFXConfig);
        if(up)
            this.loseOption--;
        else
            this.loseOption++;
            
        if(this.loseOption < 0) this.loseOption = 1;
        if(this.loseOption > 1) this.loseOption = 0;

        let retryString = "Retry";
        let backString = "Song Selection";

        switch(this.loseOption) {
            case 0:
                retryString = "> " + retryString;
                break;
            case 1:
                backString = "> " + backString;
                break;
        }

        const combineString = retryString + "\n" + backString;
        this.loseSubLabel.text = combineString;    
    }

    updateMenuOption(up) {
        this.selectAudio.play(Note.SFXConfig);
        if(up)
            this.menuOption--;
        else
            this.menuOption++;
            
        if(this.menuOption < 0) this.menuOption = 2;
        if(this.menuOption > 2) this.menuOption = 0;

        let continueString = "Continue";
        let retryString = "Retry";
        let backString = "Song Selection";

        switch(this.menuOption) {
            case 0:
                continueString = "> " + continueString;
                break;
            case 1:
                retryString = "> " + retryString;
                break;
            case 2:
                backString = "> " + backString;
                break;
        }

        const combineString = continueString + "\n" + retryString + "\n" + backString;
        this.pauseSubLabel.text = combineString;
    }

    readyUnpause() {
        this.unpause = true;
        if(this.playTime < 0) {
            this.unpauseCountDown = 0.5;
            this.unpauseCountDown_3 = true;
            this.unpauseCountDown_2 = true;
            this.unpauseCountDown_1 = true;
            this.unpauseCountDown_go = false;
            this.unpauseImmediate = true;
        } else {
            this.unpauseCountDown = this.countDown + 0.5;
            this.unpauseCountDown_3 = false;
            this.unpauseCountDown_2 = false;
            this.unpauseCountDown_1 = false;
            this.unpauseCountDown_go = false;
            this.unpauseImmediate = false;
        }

        // Hide the pause menu
        this.tweens.add({
            targets: this.pausePanel,
            ease: "Linear",
            alpha: 0,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });
        for(let i = 0; i < this.menuLabels.length; i++) {
            this.tweens.add({
                targets: this.menuLabels[i],
                ease: "Linear",
                alpha: 0,
                duration: 150,
                repeat: 0,
                callbackScope: this,
            });
        }
    }

    lose() {
        //this.pausePanel.alpha = 0.5;
        const tween = this.tweens.add({
            targets: this.losePanel,
            ease: "Linear",
            alpha: 0.5,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });

        for(let i = 0; i < this.loseLabels.length; i++) {
            this.tweens.add({
                targets: this.loseLabels[i],
                ease: "Linear",
                alpha: 1,
                duration: 150,
                repeat: 0,
                callbackScope: this,
            });
        }
    }

    createLoseUI() {
        this.loseLabels = [];

        // Create pause panel
        this.losePanel = this.add.graphics();
        this.losePanel.fillStyle(0x000000, 1);
        this.losePanel.fillRect(0, 0, game.config.width, game.config.height);
        this.losePanel.setDepth(LayerConfig.UI_PANEL + 500);
        this.losePanel.alpha = 0;
        //this.losePanel.setDepth(LayerConfig.UI + 1);

        this.loseLabel = this.add.text(game.config.width / 2, game.config.height / 2.5, "Game Over", {
            fontFamily: 'Silkscreen', 
            fontSize: 128
        }).setOrigin(0.5).setDepth(LayerConfig.UI + 500); 
        this.loseSubLabel = this.add.text(game.config.width / 2, game.config.height / 2 + 64, 
            "> Retry\nSong Selection", {
            fontFamily: 'Silkscreen', 
            fontSize: 36
        }).setOrigin(0.5).setDepth(LayerConfig.UI + 500); 

        this.loseLabels.push(this.loseLabel);
        this.loseLabels.push(this.loseSubLabel);

        for(let i = 0; i < this.loseLabels.length; i++) {
            this.loseLabels[i].alpha = 0;
        }

        this.loseOption = 0;
        /** Determine if the game is over (Player HP drop to 0) */
        this.gameOver = false;
    }

    createUI() {
        this.scoreLabels = [];
        this.comboLabels = [];
        /** Combo value before update the combo value  */
        this.currentCombo = 0;
        this.currentScore = {
            score: 0,
        };
        this.currentAccuracy = {
            accuracy: 0.00,
        }

        this.scoreLabel = this.add.text(200, 50, "0", {
            fontFamily: 'Silkscreen', 
            fontSize: 36
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreTitleLabel = this.add.text(200, 100, "SCORE", {
            fontFamily: 'Silkscreen', 
            fontSize: 40
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabels.push(this.scoreLabel);
        this.scoreLabels.push(this.scoreTitleLabel);

        this.accuracyLabel = this.add.text(200, 150, "Accuracy: 0.00%", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 

        this.comboLabel = this.add.text(game.config.width / 2, 150, "9999", {
            fontFamily: 'Silkscreen', 
            fontSize: 36
        }).setOrigin(0.5).setDepth(LayerConfig.UI);
        this.comboTitleLabel = this.add.text(game.config.width / 2, 200, "Combo", {
            fontFamily: 'Silkscreen', 
            fontSize: 40
        }).setOrigin(0.5).setDepth(LayerConfig.UI);  
        this.comboLabels.push(this.comboLabel);
        this.comboLabels.push(this.comboTitleLabel);

        for(let i = 0; i < this.comboLabels.length; i++) {
            this.comboLabels[i].alpha = 0;
        }
    }

    updateScore(score, accuracy) {
        if(this.currentScore.score != score) {
            this.tweens.add({
                ease: 'Linear',
                targets: this.currentScore, // Set to this note object
                score: score,
                duration: 50,
                repeat: 0,
                onUpdate: function() {
                    this.scoreLabel.text = Math.ceil(this.currentScore.score);
                },
                callbackScope: this
            });    
        }

        if(this.currentAccuracy.accuracy != accuracy) {
            this.tweens.add({
                ease: 'Linear',
                targets: this.currentAccuracy, // Set to this note object
                accuracy: accuracy,
                duration: 50,
                repeat: 0,
                onUpdate: function() {
                    this.accuracyLabel.text = "Accuracy: " + this.currentAccuracy.accuracy.toFixed(2) + "%";
                },
                callbackScope: this
            });         
        }
    }

    updateCombo(combo, note) {
        if(this.currentCombo != combo) {
            this.currentCombo = combo;
            // Only display combo if its bigger than 5
            if(combo >= 5) {
                for(let i = 0; i < this.comboLabels.length; i++) {
                    this.tweens.add({
                        ease: 'Linear',
                        targets: this.comboLabels[i], // Set to this note object
                        alpha: 1,
                        duration: 150,
                        repeat: 0,
                        callbackScope: this
                    });   
                }
                this.comboLabel.text = combo;

                // Tween the scale of combo text
                if(note != null) {
                    let scaleMultiplier = 1;
                    switch(note.type) {
                        case NoteType.NORMAL:
                            scaleMultiplier = 1.5;
                            break;
                        case NoteType.HOLD:
                            scaleMultiplier = 1.8;
                            break;
                        case NoteType.BIG_NOTE:
                            scaleMultiplier = 2.2;
                            break;
                    }
                    const comboTween = this.tweens.add({
                        ease: 'Linear',
                        targets: this.comboLabel, // Set to this note object
                        scale: scaleMultiplier,
                        duration: 50,
                        repeat: 0,
                        onComplete: function() {
                            this.comboLabel.setScale(1);
                        },
                        callbackScope: this
                    });     
                }
            } else {
                for(let i = 0; i < this.comboLabels.length; i++) {
                    // this.comboLabels[i].alpha = 0;
                    this.tweens.add({
                        ease: 'Linear',
                        targets: this.comboLabels[i], // Set to this note object
                        alpha: 0,
                        duration: 150,
                        repeat: 0,
                        callbackScope: this
                    });   
                }  
            }
        }
    }

    createPauseMenu() {
        this.menuLabels = [];

        // Create pause panel
        this.pausePanel = this.add.graphics();
        this.pausePanel.fillStyle(0x000000, 1);
        this.pausePanel.fillRect(0, 0, game.config.width, game.config.height);
        this.pausePanel.setDepth(LayerConfig.UI_PANEL + 200);
        this.pausePanel.alpha = 0;
        this.pausePanel.setDepth(LayerConfig.UI + 200);

        this.pauseLabel = this.add.text(game.config.width / 2, game.config.height / 2.5, "Pause", {
            fontFamily: 'Silkscreen', 
            fontSize: 128
        }).setOrigin(0.5).setDepth(LayerConfig.UI + 200); 
        this.pauseSubLabel = this.add.text(game.config.width / 2, game.config.height / 2 + 64, 
            "> Continue\nRetry\nSong Selection", {
            fontFamily: 'Silkscreen', 
            fontSize: 36
        }).setOrigin(0.5).setDepth(LayerConfig.UI + 200); 

        this.menuLabels.push(this.pauseLabel);
        this.menuLabels.push(this.pauseSubLabel);

        for(let i = 0; i < this.menuLabels.length; i++) {
            this.menuLabels[i].alpha = 0;
        }

        this.menuOption = 0;
    }

    pause() {
        if(this.songPause) return; // No need to run again if the game is already pause

        this.clickAudio.play(Note.SFXConfig);
        this.songPause = true;
        this.stopSeek = this.playTime; // Get the current stop time
        CurrentSong.song.stop();
        //this.tweens.pauseAll();
        this.player.stop();
        Note.NoteHolding.pause();
        
        for(let i = 0; i < Note.Notes.getChildren().length; i++) {
            const tweens = this.tweens.getTweensOf(Note.Notes.getChildren()[i]);
            //x.pause();
            for(let j = 0; j < tweens.length; j++) {
                tweens[j].pause();
            }
        }

        //this.pausePanel.alpha = 0.5;
        const tween = this.tweens.add({
            targets: this.pausePanel,
            ease: "Linear",
            alpha: 0.5,
            duration: 150,
            repeat: 0,
            callbackScope: this,
        });

        for(let i = 0; i < this.menuLabels.length; i++) {
            //this.menuLabels[i].alpha = 1;
            this.tweens.add({
                targets: this.menuLabels[i],
                ease: "Linear",
                alpha: 1,
                duration: 150,
                repeat: 0,
                callbackScope: this,
            });
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
        this.player.play(AnimationId.CAR_RUNNING);

        Note.NoteHolding.resume();
        //this.player.play();

        if(this.playTime > 0) {
            CurrentSong.song.play();
            CurrentSong.song.seek = this.stopSeek;
        }
    }

    updateBeatmap() {
        if(this.playTime < 0) {
            this.beatmap.update(this.playTime);
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
        this.comboDebugLabel = this.add.text(game.config.width / 5, 240, "Combo: 0", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5); 
        this.scoreDebugLabel = this.add.text(game.config.width / 5, 270, "Score: 0", {
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
        this.debugLabels.push(this.comboDebugLabel);
        this.debugLabels.push(this.scoreDebugLabel);
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
        this.comboDebugLabel.text = "Combo: " + this.score.combo;
        this.scoreDebugLabel.text = "Score: " + this.score.score;
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