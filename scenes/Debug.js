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
        this.skipTime = 100;
        this.skip = false;
        Note.Reset(this); // Reset the note
        this.noteCount = 0; // Reset the note count
        this.travelTime = 900;
        this.beatmap = new Beatmap(this, testSong1); // Test
        this.beatmap.create();
        this.beatmap.drawBeatLine = false;
        this.beatmap.playMetronome = false;

        if(this.skip)
            this.beatmap.setSkip(this.skipTime); // Skip song

        /** Test score counter */
        this.score = new Score();

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
        this.upJudge = new JudgeCollider(this, JudgementPositions[0].x, JudgementPositions[0].y);
        this.downJudge = new JudgeCollider(this, JudgementPositions[1].x, JudgementPositions[1].y);

        // Setup overlap logic for judge colliders and notes
        this.physics.add.overlap(JudgeCollider.JudgeColliders, Note.Notes, Note.NoteOverlap, null, this);

        this.startTime = -3;
        this.pause = true;
        this.start = false;

        this.missCollider = this.physics.add.sprite(this.player.x - 80, this.player.y);
        this.missCollider.setSize(20, 200);
        this.physics.add.overlap(this.missCollider, Note.Notes, function(missCollider, note) {
            if(!note.hitted && !(note.type === NoteType.NO_HIT)) {
                console.log("YES");
                note.destroyNote();
                this.score.add(NoteHitResult.MISS);
                // Double miss for hold note
                if(note.type === NoteType.HOLD) {
                    this.score.add(NoteHitResult.MISS);
                }

                let t = new HitText(this, this.player.x - 80, this.player.y, "X", null, 64);
                t.setColor("#eb3434");
                t.destroyText();
            }
        }, null, this);

        this.physics.add.sprite(260, 500, SpriteId.VEHICLE1).setOrigin(0.5).play(AnimationId.VEHICLE1);
    }

    togglePause() {
        this.pause = !this.pause;

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
        //this.keyPress = Phaser.Input.Keyboard.JustDown(this.player.beatKey);
        // If the music finish playing
        if(this.playTime >= testSong1.duration()) {
            this.pause = true;
            this.start = false;
            this.playTime = this.startTime;
            console.log("Reset!!!");
        }

        // Parallax background scrolling
        this.background.update();
        
        this.beatLabel.text = this.beatmap.beatString();
        this.player.update();
        this.playerLabel.text = this.player.getDebugString();

        // Test song start
        if(Phaser.Input.Keyboard.JustDown(this.spacebar) && !testSong1.song.isPlaying){
            this.playTime = this.startTime; // -3
            const t = new Date();
            this.lastUpdateTime = t.getTime();
            this.pause = false;
            this.beatmap.start();
            this.start = true;
            this.tweens.resumeAll();
        }

        if(!this.pause && this.start && !testSong1.playing()) {
            // Count down
            const t = new Date();
            const currentTime = t.getTime();
            this.deltaTime = (currentTime * 0.001) - (this.lastUpdateTime * 0.001);
            this.playTime += this.deltaTime;
            this.lastUpdateTime = currentTime;

            if(this.playTime >= 0) {
                console.log("Play Song!!!");
                testSong1.play(0);
                if(this.skip)
                    this.beatmap.jumpTo(this.skipTime); // Skip song
            }
        }

        if(testSong1.playing() && !this.sound.locked && !this.pause) {
            this.playTime = testSong1.song.seek; // Get the accurate current time of the song
        }

        if(!this.pause) {
            this.beatmap.update(this.playTime);
        }

        // Song playtime label
        if(!testSong1.playing())
            this.playTimeLabel.text = this.playTime.toFixed(2) + "/" + testSong1.duration().toFixed(2); // Show playtime debug
        else
            this.playTimeLabel.text = testSong1.playTimeString();

        const notesArray = Note.UpdateHit(JudgeConfig.colWidth * 2, this.player, this, this.playTime);
        let n = Note.HitNotes(notesArray, this);
        if(n != null) {
            this.noteDestroyCount++;
            this.noteDestroyLabel.text = "Note Destroy: " + this.noteDestroyCount;
            HitText.noteHitInstantiate(this, n); // Instantiate text to show hit result
            this.score.add(n.result); // Add the score
        }

        // Test show note score
        this.noteLabel.text = "Perfect: "+this.score.perfect+" Great: "+this.score.great+" Bad: "+this.score.bad+" Miss: " + this.score.miss;
        this.accLabel.text = "Accuracy: " + (this.score.accuracy * 100).toFixed(2) + "% ";
        this.comboLabel.text = "Combo: " + this.score.combo;
        this.scoreLabel.text = "Score: " + this.score.score;
    }

    // Test note spawn
    spawnNote() {
        let x = NoteType.NORMAL;
        if(this.noteCount % 3 == 0) x = NoteType.NORMAL;
        let y;

        //if(true) {
        if(this.noteCount % 3 == 0 || this.noteCount % 1 == 0 ) {    
            Note.Instantiate(this, SpriteId.BOT_RUNNING, NoteSpawnPoint[0].x, NoteSpawnPoint[0].y, 
                this.judgementPositions[0].x, this.judgementPositions[0].y, this.travelTime, true, x);
        }
        this.noteCount++;
    }

    instantiateNote(type, down, holdTime) {
        let spawn;
        let judgementPos;
        if(down) {
            spawn = new Phaser.Math.Vector2(NoteSpawnPoint[0].x, NoteSpawnPoint[0].y);
            judgementPos = new Phaser.Math.Vector2(JudgementPositions[0].x, JudgementPositions[0].y);
        }
        else {
            spawn = new Phaser.Math.Vector2(NoteSpawnPoint[1].x, NoteSpawnPoint[1].y);
            judgementPos = new Phaser.Math.Vector2(JudgementPositions[1].x, JudgementPositions[1].y);
        }

        if(type == NoteType.HOLD) {
            let n = Note.Instantiate(this, SpriteId.VEHICLE1, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime);
            n.play(AnimationId.VEHICLE1);
            n.flipX = true;
        } else if(type == NoteType.NORMAL) {
            let n = Note.Instantiate(this, SpriteId.CONE, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type);
            n.setScale(0.2);
        } else if(type === NoteType.NO_HIT) {
            let n = Note.Instantiate(this, SpriteId.MUSIC_NOTE, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type);
            n.setScale(0.15);
        } else if(type === NoteType.BIG_NOTE) {
            let n = Note.Instantiate(this, SpriteId.VEHICLE2, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, this.travelTime, down, type, holdTime);
            n.play(AnimationId.VEHICLE2);
            n.flipX = true;
            n.setScale(0.8);
        }
    }
}