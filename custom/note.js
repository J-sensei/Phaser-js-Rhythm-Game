/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/** Note type keys to recognize different notes */
const NoteType = {
    /** Normal note, player just need to press the button to beat it */
    NORMAL: "Normal",
    /** Hold note, player have to hold button for certain amount of time to beat it */
    HOLD: "Hold",
    /** End note, use to connect the hold note */
    END: "EndNote",
    OBSTACLE: "Obstacle",
    /** Note that does not required player to hit the beat key to hit it, just collide it with car */
    NO_HIT: "No Hit",
    /** Bigger normal to hit (Stronger hitsound - use to emphasis certain part of the sound) */
    BIG_NOTE: "BigNote",
}

/** Size required for all note collider for consistency */
const NoteColliderSize = 20;

/** Results for the note hitting */
const NoteHitResult = {
    PERFECT: "Perfect",
    GREAT: "Great",
    BAD: "Bad",
    MISS: "Miss",
    NO_HIT: "NoHitResult",
}

/** Color decision for circle on the note */
const NoteCircleColor = {
    UP: "#3f81eb",
    DOWN: "#eb3fda",
}

/**
 * Music note to sync with the song
 */
class Note extends Phaser.GameObjects.Sprite {
    // Static variables
    /** Audio Normal note hit sound */
    static NormalHit;
    /** Hold note hit sound */
    static HoldHit;
    /** Sound to play repeatly while holding a note */
    static NoteHolding;
    /** Music note (Non hittable note) sound */
    static MusicHit;
    /** Use when combo break (Use in Score class) */
    static ComboBreak;
    /** Metal hit (Big note hit sound) */
    static MetalHit;
    /** Physic group for Notes */
    static Notes;
    /** Number of note spawned in the game */
    static NoteCount = 0;
    /** SFX Audio configuration for note */
    static SFXConfig;
    /** SFX AUdio configutation for looping audio */
    static SFXConfigLooping;
    /** Current scene reference */
    static Scene;

    /**
     * 
     * @param {Scene} scene Scene reference
     * @param {string} key Key for the sprite
     * @param {number} x Position x
     * @param {number} y Position y
     * @param {number} destX Destination x location
     * @param {number} destY Destination y location
     * @param {number} travelTime Time required to moved from spawn point to judgement point
     * @param {bool} down Which lane the note belongs to
     * @param {string} type Type of the note
     * @param {number} holdTime Hold required to hold the note (Only use for hold note) (Deprecated)
     * @param {Note} parentNote Parent note to for the refenerece (Only use for end note)
     * @param {number} delay Delay happen when spawn the note (ms)
     *  @param {number} targetTime Exact time of the note should be reached the judgment point (TEST)
     */
    constructor(scene, key, x, y, destX, destY, travelTime, down, type, holdTime, parentNote, delay, noteSpawn) {
        super(scene, x, y, key); // Create sprite
        /** Scene reference */
        this.scene = scene;
        /** Initial spawn position x */
        this.spawnX = x;
        /** Initial spawn position y */
        this.spawnY = y;
        /** Destination position x */
        this.destX = destX;
        /** Destination position y */
        this.destY = destY;
        /** Travel time required to reached the destination (speed of the note travel) */
        this.travelTime = travelTime;
        // Check note lane
        if(down == null) this.down = true; // if null then its lowest (down) lane
        else this.down = down;
        /** Note Active, only activated notes can be press */
        this.noteActive = false;
        /** Note Activate hold, only activated hold will check the holding logics */
        this.activeHold = false; // Start to check holding a note

        // Check type
        /** Type of the note */
        this.type = null;
        if(type == null) {
            this.type = NoteType.NORMAL;
        } else {
            this.type = type;
        }
        /** End note, only use for HOLD type of note */
        this.endNote = null;
        /** Is the note alreadt hitted by player */
        this.hitted = false;
        this.parentNote = null;
        if(this.type === NoteType.END) {
            this.parentNote = parentNote;
        }
        this.reachedDestination = false;
        /** Distance between note and judgement collider when hitted */
        this.hitDistance = -99999;

        this.noteSpawn = noteSpawn;

        // Incase the notes is null, initialize it
        if(Note.Notes == null) {
            Note.Notes = scene.physics.add.group(); // Create a physic group to hold notes
            console.log("[Note] Notes group is null, initialized note group");
        }

        scene.add.existing(this); // This code is important as it add the game object to the scene
        //scene.notes.add(this); // Add to notes group (Test) TODO: remove it when stable
        Note.Notes.add(this); // Add to notes group

        /** Last play time (seek) of the song */
        this.lastPlayTime = 0;
        /** Last delta time seek of the song */
        this.deltaPlayTime = 0;

        /** Note scrolling using tween */
        /** Distance between spawn and destination x position */
        const distance = x - destX;

        // Offset delay
        // **As every note will not spawn in perfect timing, 
        // **need to subtract duration with the delay to deliver perfect timing to the judgement colliders
        //console.log("This NOTE("+type+") spawned delay: " + delay + "ms");
        /** A delay when the note is spawned (millisecond) */
        let delayOffset = 0;
        this.initialValue = x;
        this.targetValue = destX;

        if(CurrentSong.song.isPlaying)
            delay = (CurrentSong.song.seek - noteSpawn.spawnTime) * 1000;
        
        this.travelTime = travelTime - delay;
        //console.log("Delay Calc: " + delay + "ms")
        if(!isNaN(delay)) { // As long as the delay can be catch
            delayOffset = delay;
            /** Get the exact spawn position with the delay offset */
            this.exactSpawnX = this.initialValue + (this.targetValue - this.initialValue) * ((delayOffset) / this.travelTime); // 0 delay offset will give the orignal x position
        } else {
            this.exactSpawnX = x;
        }
        //this.startTime = new Date().getTime();
        this.startTime = game.loop.time;

        this.updateDelayPosition = false;
        this.x = this.exactSpawnX; // Skip some x position to align with the beat (Solve slight delay)
        // Create tweens
        const tween = scene.tweens.add({
            ease: 'Linear',
            targets: this, // Set to this note object
            x: destX, // Destination in x position
            duration: this.travelTime, // Time required travel to destination (Subtract by the delay)
            delay: 0,
            repeat: 0, // No repeat
            onActive: function() {
                //console.log("Active");
            },
            // When the tween is start
            onStart: function() {
                const currentTime = game.loop.time;
                //console.log("Start Delay: " + (currentTime - this.startTime) + "ms");
                const startDelay = currentTime - this.startTime;

                const delayX = this.initialValue + (this.targetValue - this.initialValue) * (startDelay / this.travelTime);
                const deltaX = this.initialValue - delayX;
                //console.log("Delta x: " + deltaX);
                //this.x -= deltaX;
                //console.log("Start Pos x: " + this.x);

                // const currentTime = new Date().getTime();
                // const delta = (currentTime*0.001 - this.startTime*0.001);
                // console.log("Before X: " + this.exactSpawnX);
                // if(!isNaN(delay)) { // As long as the delay can be catch
                //     delayOffset = delay;
                //     const initialValue = x; // Initial value of the not
                //     const targetValue = destX; // Target value of the detination
                //     /** Get the exact spawn position with the delay offset */
                //     this.exactSpawnX = initialValue + (targetValue - initialValue) * ((delayOffset) / travelTime); // 0 delay offset will give the orignal x position
                // } else {
                //     this.exactSpawnX = x;
                // }
                //tween.seek(-delayOffset);
                //const xBefore = this.x;
                //tween.updateTo('x', this.exactSpawnX, true);


                // this.x = this.exactSpawnX;
                // console.log("After X: " + this.exactSpawnX);
                //const xAfter = this.x;
                //console.log("Bfore: " + xBefore + " XAfter: " + xAfter);
                //console.log("Delay Offset: " + delayOffset + "ms" + ", " + delta +"ms. " + "Total: " + (delayOffset + delta) + "ms");
            },
            // When the tween is complete
            onComplete: function() {
                /** 
                 * If the note is still not destroy,
                 * create another tween with same properties (to have constant speed) to move it to behind
                 */
                //console.log("Complete Time: " + CurrentSong.song.seek); // Check the complete time match with the expectedt beat time or not
                //console.log(noteSpawn.getTargetTime(this.travelTime*0.001) + " " + CurrentSong.song.seek);
                //console.log(game.loop.delta);
                //console.log("Delay offset: " + delayOffset + "ms");
                //console.log("Delay: " + (CurrentSong.song.seek - noteSpawn.getTargetTime(this.travelTime*0.001)) * 1000 + "ms")
                const tween2 = scene.tweens.add({
                    ease: 'Linear',
                    targets: this,
                    x: this.x - distance, // Apply the distance between calculated here to have constant speed
                    duration: travelTime,
                    repeat: 0,
                    onComplete: function() {
                        // If the tween is completed, destroy the note as it should out of screen
                        this.reachedDestination = true;
                        if(this.type === NoteType.END) {
                            this.parentNote.destroyNote();
                        } else if (this.type === NoteType.NORMAL) {
                            this.destroyNote();
                        }
                    },
                    callbackScope: this
                });
            },
            callbackScope: this
        });
        // tween.on('update', function(tween, key, target, current, previous){
        //     if(key === "x" && !this.updateDelayPosition) {
        //         // console.log(current + " " + previous)
        //         // current = 100;
        //         // console.log(tween);
        //         //tween.callbackScope.x = 50;
        //         //tween.callbackScope.x = 
        //     }
        // }, this);

        // Different note type will have move in from above        
        if(type === NoteType.HOLD || type === NoteType.BIG_NOTE) {
            let moveInDuration;
            if(type === NoteType.HOLD) moveInDuration = travelTime / 3;
            else if(type === NoteType.BIG_NOTE) moveInDuration = travelTime / 2;
            const moveInDist = 500;
            this.y -= 500;
            const moveInTween = scene.tweens.add({
                targets: this,
                y: this.y + moveInDist,
                duration: moveInDuration,
                repeat: 0,
            });
        }

        // Set depth
        let depth = 0;
        if(down) {
            depth = LayerConfig.NOTE_DOWN;
        } else {
            depth = LayerConfig.NOTE_UP;
        }

        switch(this.type) {
            case NoteType.NORMAL:
                depth += 5;
            break;
            case NoteType.HOLD:
            break;
            case NoteType.END:
            break;
            case NoteType.NO_HIT:
                depth += 10;
            break;
        }
        this.setDepth(depth);

        // Create hit circle to let player see the perfect point
        let circleColor;
        if(down) {
            circleColor = NoteCircleColor.DOWN;
        } else {
            circleColor = NoteCircleColor.UP;
        }
        this.circle = this.scene.add.circle(x, y, JudgeConfig.circleRadius + 10, Phaser.Display.Color.HexStringToColor(circleColor).color);
        this.circle.iterations = JudgeConfig.circleIteration;
        this.circle.alpha = 0.5;
        let circleTween = scene.tweens.add({
            targets: this.circle,
            angle: this.circle.angle + 360,
            duration: JudgeConfig.rotateDuration,
            repeat: -1,
            callbackScope: this,
        });
        this.circle.setDepth(depth + 2);
        scene.add.existing(this.circle);

        // Only apply this to hold note
        if(this.type === NoteType.HOLD) {
            const lineHeight = 18;
            //let lineColor = "#eb4034";
            /*
                x1, y1 - start position, x2, y2 - endposition
                Put the end position to the spawn point first, later only update it when the end note is spawn
            */
            /** Line to link between the notes (For hold note only) */
            this.line = this.scene.add.line(this.x, this.y, 0, 0, x, 0,  Phaser.Display.Color.HexStringToColor(circleColor).color).setOrigin(0);
            this.line.setLineWidth(lineHeight, lineHeight);
            this.line.alpha = 0.5; // Make it transparent
            this.line.setDepth(depth - 1);
            this.scene.add.existing(this.line); // Add it to the current scene
        }

        this.noHitActive = false;
        this.result = "None";

        // Collision body configuration
        this.setOrigin(0.5);
        this.body.setSize(NoteColliderSize * this.scale, NoteColliderSize * this.scale);
    }

    moveNote(initialValue, targetValue, currentDuration, totalDuration) {
        // console.log(initialValue + " " + targetValue);
        // console.log(currentDuration + " " + totalDuration);
        // console.log(initialValue + (targetValue - initialValue) * (currentDuration / totalDuration));

        // if(currentDuration > 0)
        //     this.x = initialValue + (targetValue - initialValue) * (currentDuration / totalDuration);
        // else
        //     this.x = initialValue + (targetValue - initialValue) * (0 / totalDuration);
        const smooth = 1;
        this.x = initialValue + (targetValue - initialValue) * (((currentDuration * smooth) / (totalDuration * smooth)));
    }

    /**
     * Load neccessary common resources for Note, call it in the preload scene to load the note sfx audio
     * @param {Scene} scene 
     */
    static LoadSFX(scene) {
        Note.NormalHit = scene.sound.add(SFXId.NOTE_HIT);
        Note.HoldHit = scene.sound.add(SFXId.NOTE_HOLD_HIT);
        Note.MusicHit = scene.sound.add(SFXId.MUSIC_HIT);
        Note.ComboBreak = scene.sound.add(SFXId.COMBO_BREAK);
        Note.MetalHit = scene.sound.add(SFXId.METAL_HIT);
        Note.NoteHolding = scene.sound.add(SFXId.NOTE_HOLDING);
        Note.UpdateSFXConfig();
    }

    /**
     * Handle note hitting logic
     * @param {Note[]} notes Group of active notes
     * @returns Destroyed note if successfully hit a note, Null if there is no note is hit
     */
    static HitNotes(notes) {
        let note = null;
        if(notes.length > 0) { // Only execute when note array is more
            notes.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)); // Get the oldest note in the hit list
            notes[0].hitted = true; // Note is hitted by the player
            note = notes[0];

            Note.JudgeNote(note); // Judge the note

            if(note.result == NoteHitResult.BAD || note.result == NoteHitResult.MISS) {
                note.destroyNote();
                if(note.type === NoteType.HOLD) {
                    Score.GetInstance().add(NoteHitResult.MISS); // Miss for end note
                }

                return note; // No hit
            }

            switch(note.type) {
                case NoteType.NORMAL: case NoteType.BIG_NOTE:
                    if(note.type === NoteType.NORMAL)
                        Note.NormalHit.play(Note.SFXConfig);
                    else
                        Note.MetalHit.play(Note.SFXConfig);

                    note.destroyNormalNote(); // 
                    break;
                case NoteType.HOLD:
                    Note.HoldHit.play(Note.SFXConfig);
                    note.noteActive = false; // No need to check this note active or not anymore, as the note start to holding
                    note.activeHold = true; // Activate the holding note
                    //note.scene.tweens.killTweensOf(note); // Stop the tween of the note
                    Note.Scene.tweens.killTweensOf(note);
                    note.alpha = 0; // Make the note transparent (TEST)

                    // TODO: Use class to handle current song is playing
                    this.lastPlayTime = CurrentSong.currentTime(); // Update the last play time for the song
                    break;
                default:
                    console.log("[Note] No hitting logic to handle this note: " + notes[0].type);
                    break;
            }
        }
        return note;
    }

    /**
     * Reset neccessary static variables, call it before spawn a note every beatmap
     * @param {Scene} scene 
     */
    static Reset(scene) {
        Note.NoteCount = 0; // Reset note count to 0
        // if(Note.Notes != null) {
        //     Note.Notes.clear(); // Clear the note physic group
        // } else {
        //     // The note group is null, need to create it
        //     Note.Notes = scene.physics.add.group();
        // }
        // Create new group for note using the current scene
        Note.Notes = scene.physics.add.group();
        Note.UpdateSFXConfig();
        Note.Scene = scene;
    }

    static UpdateSFXConfig() {
        Note.SFXConfig = {
            mute: false,
            volume: AudioConfig.sfx, // Get the current volume fonr the audio configuration
            loop: false, // No looping for the song
        };

        Note.SFXConfigLooping = {
            mute: false,
            volume: AudioConfig.sfx * 0.8, // Get the current volume fonr the audio configuration
            loop: true, // Looping the sfx
        };
    }

    static Instantiate(scene, key, x, y, destX, destY, travelTime, down, type, holdTime, parentNote, delay, targetTime) {
        let note;
        if(type === NoteType.END) {
            note = new Note(scene, key, x, y, destX, destY, travelTime, down, type, null, parentNote, delay, targetTime);
            parentNote.endNote = note;
        } else {
            note = new Note(scene, key, x, y, destX, destY, travelTime, down, type, holdTime, null, delay, targetTime);
        }
        note.setId(Note.NoteCount);
        Note.NoteCount++;
        return note;
    }

    static InstantiateNote(travelTime, down, type, holdTime, parentNote, delay, noteSpawn) {
        let spawn; // Spawn position
        let judgementPos; // Judgement position aka destination position
        let n = null; // Note
        if(down) {
            spawn = new Phaser.Math.Vector2(NoteSpawnPoint[0].x, NoteSpawnPoint[0].y);
            judgementPos = new Phaser.Math.Vector2(JudgementPositions[0].x, JudgementPositions[0].y);
        }
        else {
            spawn = new Phaser.Math.Vector2(NoteSpawnPoint[1].x, NoteSpawnPoint[1].y);
            judgementPos = new Phaser.Math.Vector2(JudgementPositions[1].x, JudgementPositions[1].y);
        }

        // Instantiate the note based on the type given
        if(type == NoteType.HOLD) {
            n = Note.Instantiate(Note.Scene, SpriteId.VEHICLE1, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, travelTime, down, type, holdTime, null, delay, noteSpawn);
            n.play(AnimationId.VEHICLE1);
            n.flipX = true;
        } else if(type == NoteType.NORMAL) {
            n = Note.Instantiate(Note.Scene, SpriteId.CONE, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, travelTime, down, type, null, null, delay, noteSpawn);
            n.setScale(0.2);
        } else if(type === NoteType.NO_HIT) {
            n = Note.Instantiate(Note.Scene, SpriteId.MUSIC_NOTE, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, travelTime, down, type, null, null, delay, noteSpawn);
            n.setScale(0.15);
        } else if(type === NoteType.BIG_NOTE) {
            n = Note.Instantiate(Note.Scene, SpriteId.VEHICLE2, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, travelTime, down, type, holdTime, null, delay, noteSpawn);
            n.play(AnimationId.VEHICLE2);
            n.flipX = true;
            n.setScale(0.8);
        } else if(type === NoteType.END && parentNote.result != NoteHitResult.MISS && parentNote.result != NoteHitResult.BAD) {
            n = Note.Instantiate(Note.Scene, SpriteId.VEHICLE1, spawn.x, spawn.y, 
                judgementPos.x, judgementPos.y, travelTime, down, type, holdTime, parentNote, delay, noteSpawn);
            n.play(AnimationId.VEHICLE1);
            n.flipX = true;
        }

        return n;
    }

    /**
     * 
     * @param {number} minimumDistance 
     * @param {PlayerCar} player 
     * @param {Scene} scene 
     * @param {number} playTime 
     * @returns Note Array
     */
    static UpdateHit(minimumDistance, player, scene, playtime) {
        let notesArray = []; // Empty note array
        for(let i = 0; i < Note.Notes.getChildren().length; i++) {
            let note = Note.Notes.getChildren()[i]; // Get the note
            note.update(player, playtime); // Update note here
            let distance = 0; // Distance between note and the judgement colliders

            // Check which lane the note is to calculate the distance
            if(note.down) {
                distance = note.x - JudgementPositions[0].x;
            } else {
                distance = note.x - JudgementPositions[1].x;
            }

            // None hittable note
            if(note.type === NoteType.NO_HIT && note.noHitActive && distance == 0 && player.isDownLane === note.down) {
                let text;
                if(note.down) {
                    text = new HitText(scene, JudgementPositions[1].x, JudgementPositions[1].y, "300", null, 32);
                } else {
                    text = new HitText(scene, JudgementPositions[0].x, JudgementPositions[0].y, "300", null, 32);
                }
                text.destroyText();
                Score.GetInstance().add(NoteHitResult.NO_HIT);
                Note.MusicHit.play(Note.SFXConfig);
                note.destroyNote();
                continue;
            }

            if(note.type === NoteType.NO_HIT) continue;
            
            if(note.active && player.beating && !note.hitted &&
                (distance > -minimumDistance && distance < minimumDistance) && 
                player.compareLane(note.down)) {
                note.hitDistance = distance;
                notesArray.push(note); // Push valid note to the array
            }

            // TODO: Optimize here
            // If end note is active and ready to destroy when it touches the jugement collider precisely (distance 0)
            if(note.type === NoteType.END && note.endNoteActive && distance <= 0) {
                // Update score here
                this.result = NoteHitResult.PERFECT;
                // let text;
                // if(note.down) {
                //     text = new HitText(scene, JudgementPositions[1].x, JudgementPositions[1].y, NoteHitResult.PERFECT, null, 32);
                // } else {
                //     text = new HitText(scene, JudgementPositions[0].x, JudgementPositions[0].y, NoteHitResult.PERFECT, null, 32);
                // }
                // text.destroyText();
                HitText.NoteHitInstantiate(Note.Scene, this);
                Score.GetInstance().add(NoteHitResult.PERFECT);
                Note.HoldHit.play(Note.SFXConfig);
                note.parentNote.destroyNote(); // As end note parent note is the hold note
            }
        }
        return notesArray;
    }

    /**
     * Notes overlap with judgement colliders logic
     * @param {JudgeCollider} judgement 
     * @param {Note} note 
     */
    static NoteOverlap(judgement, note) {
        // Note is not active and not holding
        if(!note.noteActive && !note.activeHold && note.type != NoteType.END && note.type != NoteType.NO_HIT) {
            note.activate();
        }
    
        if(note.type == NoteType.END && note.parentNote.activeHold) {
            note.endNoteActive = true; // Ready to destroy end note
        }

        if(note.type === NoteType.NO_HIT) {
            note.noHitActive = true;
        }
    }

    /**
     * Judge a note hit result, update the note result variable (this.result)
     * @param {Note} note Note class reference
     * @returns Note
     */
    static JudgeNote(note) {
        const distance = Math.abs(note.hitDistance); // Get the hit distance of the note
        if(distance <= JudgeConfig.perfectDistance >= 0 && distance <= JudgeConfig.perfectDistance) {
            note.result = NoteHitResult.PERFECT;
        } else if(distance > JudgeConfig.perfectDistance && distance <= JudgeConfig.greatDistance) {
            note.result = NoteHitResult.GREAT;
        } else if(distance > JudgeConfig.greatDistance && distance <= JudgeConfig.badDistance) {
            note.result = NoteHitResult.BAD;;
        } else if(distance > JudgeConfig.badDistance && distance <= JudgeConfig.missDistance){ // Treat the rest as miss note
            note.result = NoteHitResult.MISS;
        } else {
            // console.warn("[Note] Invalid distance: " + distance);
            note.result = NoteHitResult.MISS;
        }

        return note;
    }

    update(player, playtime) {
        //this.moveNote(this.initialValue, this.targetValue, CurrentSong.song.seek, this.noteSpawn.getTargetTime(this.travelTime*0.001));
        this.circle.x = this.x;
        this.circle.y = this.y;

        // Update will check holding note only
        if(this.type === NoteType.HOLD) {
            // Update line position follow the note
            this.line.x = this.x;
            this.line.y = this.y;

            if(this.endNote != null) {
                const distance = this.endNote.x - this.x; // Get the distance of the end note to the position of the note
                this.line.setTo(0, 0, distance, 0); // Change the distination x position of the line
            } else {
                const distance = this.spawnX - this.x; // End note not spawn yet, update the line with the spawn position
                this.line.setTo(0, 0, distance, 0);
            }

            // Check holding note until the end
            // When the note is ready to hold
            if(this.activeHold) {
                // Player still holding it
                if(player.holding && player.compareLane(this.down)) {
                    if(!Note.NoteHolding.isPlaying) {
                        Note.NoteHolding.play(Note.SFXConfigLooping);
                    }
                } else { // Player failed to hold it while the active hold is still true
                    // Stop holding audio
                    if(Note.NoteHolding.isPlaying) {
                        Note.NoteHolding.stop();
                    }
                    // Update the end note hitDistance
                    // Determine if the distance if release early
                    if(this.endNote != null) {
                        if(this.down) {
                            this.endNote.hitDistance = this.endNote.x - JudgementPositions[0].x;
                        } else {
                            this.endNote.hitDistance = this.endNote.x - JudgementPositions[1].x;
                        }

                        Note.JudgeNote(this.endNote);
                        HitText.NoteHitInstantiate(Note.Scene, this.endNote);
                        
                        // If the result are not bad or miss
                        if(this.endNote.result != NoteHitResult.BAD && this.endNote.result != NoteHitResult.MISS) {
                            Note.HoldHit.play(Note.SFXConfig);
                        }
    
                        //text.destroyText();
                        Score.GetInstance().add(this.endNote.result);
                        this.destroyNote();
                    } else { // Miss as end note note even spawn yet (Miss very early)
                        this.result = NoteHitResult.MISS; // Manually put the result as miss
                        HitText.NoteHitInstantiate(Note.Scene, this);
                        Score.GetInstance().add(NoteHitResult.MISS);
                        this.destroyNote(); // Can safely destroy the note right away
                    }
                }
            }
        }
    }

    /**
     * Set the ID of the note to sort it correctly with the spawn order
     * @param {int} id ID of the note for the sorting purposes
     */
    setId(id) {
        this.id = id;
    }

    /** Activate the note, its ready to detect beat hit */
    activate() {
        this.noteActive = true;
    }

    /** Deactivate the note, its not ready to detect the beat anymore */
    deactivate() {
        this.noteActive = false;
    }

    /** Destroy the note */
    destroyNote() {
        // Delete
        Note.Scene.tweens.killTweensOf(this); // Make sure to remove the tween before delete it, else will cause error

        // The note is holding type, delete the line too
        if(this.type === NoteType.HOLD)
            this.line.destroy();

        if(this.type === NoteType.END) {
            if(Note.NoteHolding.isPlaying) {
                Note.NoteHolding.stop();
            }
        }

        // If end note is present, delete it
        if(this.endNote != null) {
            this.endNote.destroyNote();
        }

        this.circle.destroy();
        this.destroy(); // Can safely remove it now
    }

    /** Destroy the note with velocity and gravity effect */
    destroyNormalNote() {
        // Normal note destroy will flip it up and down
        this.body.velocity.x = -100;
        this.body.velocity.y = -2500;
        this.body.setAllowGravity(true);
        this.body.setGravityY(5000 * 1.5); // Gravity to move it down

        // Make the body 0 velocity after 0.15s
        this.scene.time.addEvent({
            delay: 150,
            callback: function() {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            },
            callbackScope: this,
            loop: false,
        });

        // Add tween to rotate the object
        const rotateTween = this.scene.tweens.add({
            targets: this,
            angle: this.angle + 360,
            duration: 1000,
            onComplete: function() {
                this.destroyNote(); // Delete the object
            },
            callbackScope: this
        });
    }
}