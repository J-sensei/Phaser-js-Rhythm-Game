/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

const NoteType = {
    /** Normal note, player just need to press the button to beat it */
    NORMAL: "Normal",
    /** Hold note, player have to hold button for certain amount of time to beat it */
    HOLD: "Hold",
    /** End note, use to connect the hold note */
    END: "EndNote",
    OBSTACLE: "Obstacle",
    /** Note that does not required player to hit the beat key to hit it, just collide it with car */
    NO_HIT: "No Hit"
}

const NoteSize = 20;

const NoteHitResult = {
    PERFECT: "Perfect",
    GREAT: "Great",
    BAD: "Bad",
    MISS: "Miss",
    NO_HIT: "NoHitResult",
}

class Note extends Phaser.GameObjects.Sprite {
    // Static variables
    /** Audio Normal note hit sound */
    static NormalHit;
    /** Hold note hit sound */
    static HoldHit;
    static MusicHit;
    /** Physic group for Notes */
    static Notes;
    /** Number of note spawned in the game */
    static NoteCount = 0;

    constructor(scene, key, x, y, destX, destY, travelTime, down, type, holdTime, parentNote, colliderX, colliderY, offsetX, offsetY) {
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
        this.active = false;
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

        // Incase the notes is null, initialize it
        if(Note.Notes == null) {
            Note.Notes = scene.physics.add.group(); // Create a physic group to hold notes
            console.log("[Note] Notes group is null, initialized note group");
        }

        scene.add.existing(this); // This code is important as it add the game object to the scene
        //scene.notes.add(this); // Add to notes group (Test) TODO: remove it when stable
        Note.Notes.add(this); // Add to notes group

        if(this.type === NoteType.HOLD) {
            this.holdTime = holdTime;
            this.spawnEndNoteTime = this.holdTime; // Use this time to spawn end note
            this.endNoteSpawnTime = this.scene.playTime + this.holdTime;
        }

        /** Last play time (seek) of the song */
        this.lastPlayTime = 0;
        /** Last delta time seek of the song */
        this.deltaPlayTime = 0;

        /** Note scrolling using tween */
        /** Distance between spawn and destination x position */
        const distance = x - destX;
        // Create tweens
        const tween = scene.tweens.add({
            targets: this, // Set to this note object
            x: destX, // Destination in x position
            duration: travelTime, // Time required travel to destination
            repeat: 0, // No repeat
            // When the tween is complete
            onComplete: function() {
                /** 
                 * If the note is still not destroy,
                 * create another tween with same properties (to have constant speed) to move it to behind
                 */
                scene.tweens.add({
                    targets: this,
                    x: this.x - distance, // Apply the distance between calculated here to have constant speed
                    duration: travelTime,
                    repeat: 0,
                    onComplete: function() {
                        // If the tween is completed, destroy the note as it should out of screen
                        //this.destroyNote();
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

        // Only apply this to hold note
        if(this.type === NoteType.HOLD) {
            const lineHeight = 10;
            const lineColor = "#eb4034";
            /*
                x1, y1 - start position, x2, y2 - endposition
                Put the end position to the spawn point first, later only update it when the end note is spawn
            */
            /** Line to link between the notes (For hold note only) */
            this.line = this.scene.add.line(this.x, this.y, 0, 0, x, 0,  Phaser.Display.Color.HexStringToColor(lineColor).color).setOrigin(0);
            this.line.setLineWidth(lineHeight, lineHeight);
            this.line.alpha = 0.5; // Make it transparent
            this.scene.add.existing(this.line); // Add it to the current scene

            // TODO: Create a time class to handle delta time!
            const spawnT = new Date();
            const currentTime = spawnT.getTime();
            this.endNoteSpawnLastTime = currentTime;
            this.endNoteSpawnDeltaTime = 0;
        }

        this.endNoteSpawned = false;
        this.endNoteActive = false;
        this.noHitActive = false;
        this.result = "None";

        // Create hit circle to let player see the perfect point
        this.circle = this.scene.add.circle(x, y, JudgeConfig.circleRadius + 10, Phaser.Display.Color.HexStringToColor("#d0ff61").color);
        this.circle.iterations = JudgeConfig.circleIteration;
        this.circle.alpha = 0.5;
        let circleTween = scene.tweens.add({
            targets: this.circle,
            angle: this.circle.angle + 360,
            duration: JudgeConfig.rotateDuration,
            repeat: -1,
            callbackScope: this,
        });
        scene.add.existing(this.circle);

        // Collision body configuration
        this.setOrigin(0.5);
        this.body.setSize(NoteSize * this.scale, NoteSize * this.scale);
    }

    /**
     * Load neccessary common resources for Note, call it in the preload scene to load the note sfx audio
     * @param {Scene} scene 
     */
    static LoadSFX(scene) {
        Note.NormalHit = scene.sound.add(SFXId.NOTE_HIT);
        Note.HoldHit = scene.sound.add(SFXId.NOTE_HOLD_HIT);
        Note.MusicHit = scene.sound.add(SFXId.MUSIC_HIT);
    }

    /**
     * Handle note hitting logic
     * @param {Note[]} notes Group of active notes
     * @returns Destroyed note if successfully hit a note, Null if there is no note is hit
     */
    static HitNotes(notes, scene) {
        let note = null;
        if(notes.length > 0) { // Only execute when note array is more
            notes.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)); // Get the oldest note in the hit list
            notes[0].hitted = true; // Note is hitted by the player
            note = notes[0];

            const distance = Math.abs(note.hitDistance);
            // Check not hit distance to determine the hit result
            if(distance <= JudgeConfig.perfectDistance) {
                note.result = NoteHitResult.PERFECT;
            } else if(distance <= JudgeConfig.greatDistance) {
                note.result = NoteHitResult.GREAT;
            } else if(distance <= JudgeConfig.badDistance) {
                note.result = NoteHitResult.BAD;;
            } else if(distance <= JudgeConfig.missDistance){ // Treat the rest as miss note
                note.result = NoteHitResult.MISS;
            } else {
                // console.warn("[Note] Invalid distance: " + distance);
                note.result = NoteHitResult.MISS;
            }

            if(note.result == NoteHitResult.BAD || note.result == NoteHitResult.MISS) {
                note.destroyNote();
                return note;
            }

            switch(note.type) {
                case NoteType.NORMAL:
                    Note.NormalHit.play();
                    note.destroyNormalNote();
                    break;
                case NoteType.HOLD:
                    Note.HoldHit.play();
                    note.active = false; // No need to check this note active or not anymore, as the note start to holding
                    note.activeHold = true; // Activate the holding note
                    note.scene.tweens.killTweensOf(note); // Stop the tween of the note

                    // TODO: Use class to handle current song is playing
                    this.lastPlayTime = testSong1.currentTime(); // Update the last play time for the song
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
        if(Note.Notes != null) {
            Note.Notes.clear(); // Clear the note physic group
        } else {
            // The note group is null, need to create it
            Note.Notes = scene.physics.add.group();
        }
    }

    static Instantiate(scene, key, x, y, destX, destY, travelTime, down, type, holdTime, colliderX, colliderY, offsetX, offsetY) {
        let note = new Note(scene, key, x, y, destX, destY, travelTime, down, type, holdTime, colliderX, colliderY, offsetX, offsetY);
        note.setId(Note.NoteCount);
        Note.NoteCount++;
        return note;
    }

    /**
     * 
     * @param {int} minimumDistance 
     * @param {PlayerCar} player 
     * @returns Note array
     */
    static UpdateHit(minimumDistance, player, judgeColliderDown, judgeColliderUp, scene) {
        let notesArray = []; // Empty note array
        for(let i = 0; i < Note.Notes.getChildren().length; i++) {
            let note = Note.Notes.getChildren()[i]; // Get the note
            note.update(player, scene); // Update note here
            let distance = 0; // Distance between note and the judgement colliders

            // Check which lane the note is to calculate the distance
            if(note.down) {
                distance = note.x - judgeColliderDown.x;
            } else {
                distance = note.x - judgeColliderUp.x;
            }

            if(note.active && player.beating && !note.hitted &&
                (distance > -minimumDistance && distance < minimumDistance) && 
                player.isDownLane === note.down) {
                note.hitDistance = distance;
                notesArray.push(note); // Push valid note to the array
            }

            // TODO: Optimize here
            // If end note is active and ready to destroy when it touches the jugement collider precisely (distance 0)
            if(note.type === NoteType.END && note.endNoteActive && distance <= 0) {
                // Update score here
                let text;
                // TODO: Do not use scene.judgementPosition
                if(note.down) {
                    text = new HitText(scene, scene.judgementPositions[1].x, scene.judgementPositions[1].y, NoteHitResult.PERFECT, null, 32);
                } else {
                    text = new HitText(scene, scene.judgementPositions[0].x, scene.judgementPositions[0].y, NoteHitResult.PERFECT, null, 32);
                }
                text.destroyText();
                scene.score.add(NoteHitResult.PERFECT);

                Note.HoldHit.play();
                note.parentNote.destroyNote(); // As end note parent note is the hold note
            }

            // None hittable note
            if(note.type === NoteType.NO_HIT && note.noHitActive && distance == 0 && player.isDownLane === note.down) {
                let text;
                // TODO: Do not use scene.judgementPosition
                if(note.down) {
                    text = new HitText(scene, scene.judgementPositions[1].x, scene.judgementPositions[1].y, "300", null, 32);
                } else {
                    text = new HitText(scene, scene.judgementPositions[0].x, scene.judgementPositions[0].y, "300", null, 32);
                }
                text.destroyText();
                scene.score.add(NoteHitResult.NO_HIT);
                Note.MusicHit.play();
                note.destroyNote();
            }
        }

        return notesArray;
    }

    /**
     * Notes overlap with judgement colliders logic
     * @param {*} judgement 
     * @param {Note} note 
     */
    static NoteOverlap(judgement, note) {
        if(!note.active && !note.activeHold && note.type != NoteType.END && note.type != NoteType.NO_HIT) // Note is not active and not holding
        note.activate();
    
        if(note.type == NoteType.END && note.parentNote.activeHold) {
            note.endNoteActive = true; // Ready to destroy end note
        }

        if(note.type === NoteType.NO_HIT) {
            note.noHitActive = true;
        }
    }

    // setTexture(v) {
    //     this.setTexture(v);
    // }

    // setOffset(x, y) {
    //     this.body.offset.x = x;
    //     this.body.offset.y = y;
    // }

    // setSize(x, y) {
    //     this.body.setSize(x, y);
    // }

    update(player, scene) {
        this.circle.x = this.x;
        this.circle.y = this.y;

        // Update will check holding note only
        if(this.type === NoteType.HOLD) {
            // Update line position follow the note
            this.line.x = this.x;
            this.line.y = this.y;

            // // update normal delta time
            // const spawnT = new Date();
            // const currentTime = spawnT.getTime();
            // this.endNoteSpawnDeltaTime = (currentTime * 0.001) - (this.endNoteSpawnLastTime * 0.001);
            // this.endNoteSpawnLastTime = currentTime;

            // Update playtime delta time
            const t = testSong1.song.seek;
            // this.deltaPlayTime = t - this.lastPlayTime;
            // this.lastPlayTime = t;

            // Update end note to spawn it in right timing
            // Method 1
            if(t >= this.endNoteSpawnTime && !this.endNoteSpawned) {
                // this.endNote = new Note(this.scene, SpriteId.BOT_RUNNING, this.spawnX, this.spawnY, 
                //     this.destX, this.destY, this.travelTime, this.down, NoteType.END, null, this);
                
                this.endNote = new Note(this.scene, SpriteId.VEHICLE1, this.spawnX, this.spawnY, 
                    this.destX, this.destY, this.travelTime, this.down, NoteType.END, null, this);
                this.endNote.flipX = true;
                this.endNoteSpawned = true;
            }

            if(this.endNoteSpawned) { // The end note spawned, update the line with the end note position
                const distance = this.endNote.x - this.x; // Get the distance of the end note to the position of the note
                this.line.setTo(0, 0, distance, 0); // Change the distination x position of the line
            } else {
                const distance = this.spawnX - this.x; // End note not spawn yet, update the line with the spawn position
                this.line.setTo(0, 0, distance, 0);
            }

            // Method 2
            // if(this.spawnEndNoteTime > 0) { // Update when spawn note is not spawn yet
                    
            //         // if(testSong1.currentTime() > this.spawnEndNoteTime) {
            //         //     this.spawnEndNoteTime -= this.deltaPlayTime; // Minus time
            //         // } else {
            //         //     this.spawnEndNoteTime -= this.endNoteSpawnDeltaTime; // Minus time
            //         // }
            //         this.spawnEndNoteTime -= this.endNoteSpawnDeltaTime; // Minus delta time
            //         // Spawn end note
            //         if(this.spawnEndNoteTime <= 0) {
            //             // Same position, destination, travel time and land but its END note
            //             this.endNote = new Note(this.scene, SpriteId.BOT_RUNNING, this.spawnX, this.spawnY, 
            //                 this.destX, this.destY, this.travelTime, this.down, NoteType.END);
            //         }
                    
            // }
            // else { 
            //         // End note is spawned
            //         const distance = this.endNote.x - this.x; // Get the distance of the end note to the position of the note
            //         this.line.setTo(0, 0, distance, 0); // Change the distination x position of the line
            // }

            // Check holding note until the end
            // When the note is ready to hold
            if(this.activeHold) {
                // Player still holding it
                if(player.holding && player.isDownLane === this.down) {
                    //this.holdTime -= this.deltaPlayTime; // Minus the delta playtime
                    this.holdTime -= this.endNoteSpawnDeltaTime; // Minus the delta playtime
                    // Player successfully hold the note
                    if(this.holdTime <= 0) {
                        Note.HoldHit.play();
                        this.destroyNote();
                    }
                } else { // Player failed to hold it while the active hold is still true
                    // Failed 
                    //this.destroyNote();
                    let text;
                    // TODO: Do not use scene.judgementPosition
                    if(this.down) {
                        text = new HitText(scene, scene.judgementPositions[1].x, scene.judgementPositions[1].y, NoteHitResult.MISS, null, 32);
                    } else {
                        text = new HitText(scene, scene.judgementPositions[0].x, scene.judgementPositions[0].y, NoteHitResult.MISS, null, 32);
                    }
                    text.destroyText();
                    //scene.score.add(NoteHitResult.MISS);
                    this.destroyNote();
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
        this.active = true;
    }

    /** Deactivate the note, its not ready to detect the beat anymore */
    deactivate() {
        this.active = false;
    }

    /** Destroy the note */
    destroyNote() {
        // Delete
        this.scene.tweens.killTweensOf(this); // Make sure to remove the tween before delete it, else will cause error

        // The note is holding type, delete the line too
        if(this.type === NoteType.HOLD)
            this.line.destroy();

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
        let tween = this.scene.tweens.add({
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