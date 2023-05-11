/********************************************
Course : TGD2251 Game Physics
Session: Trimester 2, 2022/23
ID and Name #1 : 1191100556 Liew Jiann Shen
Contacts #1 : 0174922881 1191100556@student.mmu.edu.my
********************************************/

/** Difficulties constants */
const Difficulty = {
    EASY: "EasyDifficulty",
    HARD: "HardDifficulty"
}

/**
 * Spawn note sync with the song
 */
class Beatmap {
    /** Debug metronome audio 1 */
    static Metronome1;
    /** Debug metronome audio 2 */
    static Metronome2;

    /**
     * 
     * @param {Scene} scene Beatmap scene reference
     * @param {Song} song Song reference
     * @param {BeatmapConfig} config Configuration of the beatmap
     */
    constructor(scene, song, config) {
        this.scene = scene;
        this.drawBeatLine = true;
        this.playMetronome = true;
        this.song = song;
        
        // Open your heart
        //this.offset = 0.222; // milisecond
        //this.bpm = 150; // test
        // Bye or not
        if(config != null) {
            this.offset = config.offset;
            this.bpm = config.bpm;
        } else {
            this.offset = 0.874; // milisecond
            this.bpm = 170; // test
        }

        this.songDuration = song.duration(); 
        this.tempo = this.bpm / 60.0; // 2 beat per second
        this.secondPerBeat = 1.0 / this.tempo;

        this.currentBeatCount = new BeatCount();

        // Based on song playtime
        /** Next timeline that will have the beat drop  */
        this.nextSongTempo = this.offset;

        /** Decide whether to skip the song */
        this.skip = false;
        /** If skip is set to true, which position of the song should skip to */
        this.skipTime = 0;
    }

    /** Load neccessary common resources for Beatmap, call it in the preload scene to load the note sfx audio */
    static LoadSFX(scene) {
        Beatmap.Metronome1 = scene.sound.add(SFXId.METRONOME1);
        Beatmap.Metronome2 = scene.sound.add(SFXId.METRONOME2);
    }

    create() {
        /** Define should the beatmap start to running with all the calculated bpm and notes */
        this.running = false;

        let n = 0;
        //let nextTempo = this.offset;
        /** Updated tempo when looping the song */
        let nextTempo = 0;

        /** Need to determine by the hit position and the spawn position to know how many sec needed  */
        let earlyTime;
        if(this.scene.travelTime == null) {
            earlyTime = 0;
        } else {
            earlyTime = this.scene.travelTime * 0.001;
        }
        /** Time early of the accurate beat time */
        this.travelTime = earlyTime;
        const spawnEarlySec = earlyTime; 
        /** Time adding in the loop when counting beat timing, more decimal places means more precise the timing calculate will be */
        const timePrecision = 0.001;

        /** All beats for the song */
        this.beats = []; 
        /** Beat accurate to the song */
        this.accurateBeats = []; 
        /** Notes to spawn */
        this.noteSpawns = [];
        /** Beat count when looping the song */
        let beatCounting = new BeatCount();

        // TODO: upgrade end note logic
        /** End Notes queue to spawn */
        this.endNoteSpawns = [];
        
        const currentData = this.song.getNoteData(); // Map data for the song

        // Loop the whole song in miliseconds precision
        while(n < this.songDuration - this.offset) {
            // If the time if bigger / equal to the tempo
            if(n >= nextTempo) {
                beatCounting.count(); // Add the beat count
                const accurateBeatCount = new BeatCount();
                //this.beatArray.push(nextTempo + this.offset); // Add the time for the accurate beat
                accurateBeatCount.set(beatCounting.beat, beatCounting.subBeat, nextTempo + this.offset);
                this.accurateBeats.push(accurateBeatCount);
                let t = (nextTempo + this.offset) - spawnEarlySec; // Beat with spawn time offset
                const beatCount = new BeatCount();
                beatCount.set(beatCounting.beat, beatCounting.subBeat, t);
                //this.beats.push(new Beat(beatCounting.beat, beatCounting.subBeat, t));
                this.beats.push(beatCount);

                nextTempo += this.secondPerBeat; // Update the next tempo
            }
            n += timePrecision; // Move the time for the song
        }

        // Note data instantiate
        let idCount = 0;
        // Loop through all the beats available
        for(let i = 0; i < this.beats.length; i++) {
            // Calculate the notes to spawn
            for(let j = 0; j < currentData.length; j++) {
                // If the beat is euqal
                if(this.beats[i].equal(currentData[j].beatCount)) {
                    const spawn = new NoteSpawn(this.beats[i].time, this.secondPerBeat, currentData[j], idCount); // Create the note spawn object
                    this.noteSpawns.push(spawn);
                    if(spawn.type === NoteType.HOLD) {
                        // End Note data
                        const d = new NoteData(currentData[j].beat, currentData[j].subBeat, currentData[j].holdSnapDivisor, 
                            currentData[j].holdMultiplier, 4, 0, 0, currentData[j].down);
                        // End note spawn
                        const spawn = new NoteSpawn(this.beats[i].time, this.secondPerBeat, d, idCount);
                        spawn.setCompleteTime(this.accurateBeats[i].time);
                        // End note spawns array
                        this.endNoteSpawns.push(new EndNoteSpawn(spawn, null));
                    }

                    // Checking if any mistake is made in the note data
                    if(this.noteSpawns.length > 1 && spawn.equal(this.noteSpawns[this.noteSpawns.length - 2])) {
                        console.warn("[Beatmap] Duplicate note found at " + spawn.beatCount.getBeatCountString());
                    }
                    idCount++;
                }
            }
        }

        // Reverse arrays as later can use pop instead of shift to increase the performance
        this.beats.reverse();
        this.noteSpawns.reverse();
        this.accurateBeats.reverse();
        this.endNoteSpawns.reverse();
        // Debug variables
        this.lastNoteSpawnTime = -9999;
        this.deltaNoteTime = 0;
        /** Determine how many delay the note is spawn than the expected time */
        this.noteSpawnDelay = 0;
        
        //console.log(this.noteSpawns);
    }

    /**
     * Update the note spawn logic with the song
     * @param {number} playTime Current seek value of the song
     */
    update(playTime) {
        this.noteSpawnDelay = 0; // Assume no delay at first
        // Song Skip
        if(this.skip) {
            if(playTime >= this.skipTime) {
                this.skip = false;
            }
            return;
        }
        
        // Counting beat
        if(this.running && playTime >= this.offset && this.accurateBeats.length > 0 && 
            this.accurateBeats[this.accurateBeats.length - 1].time <= playTime) {
            //if(playTime > this.nextSongTempo) {
            if(this.accurateBeats.length > 0) {
                if(playTime >= this.accurateBeats[this.accurateBeats.length - 1].time) {
                    this.currentBeatCount.count(); // Count the beat
    
                    // Play metronome audio
                    if(this.playMetronome) {
                        if(this.currentBeatCount.subBeat == 0) {
                            Beatmap.Metronome2.play(); // Higher pitch metronome
                        } else {
                            Beatmap.Metronome1.play(); // Lower pitch metronome
                        }
                    }
                    this.accurateBeats.pop(); // Removed the beat at the end
                }
            }
        }

        // Spawn notes
        if(this.running && (this.noteSpawns.length > 0 && this.noteSpawns[this.noteSpawns.length - 1].spawnTime <= playTime) || 
            (this.endNoteSpawns.length > 0 && this.endNoteSpawns[this.endNoteSpawns.length - 1].noteSpawn.spawnTime <= playTime)) {
            // TODO: optimise the code here
            /** Determine wherether to remove first note in the noteSpawns array */
            let remove = false;
            /** How many note are needed to be remove */
            let removeCount = 0;

            // Spawn note
            for(let i = this.noteSpawns.length - 1; i >= 0; i--) {
                // Spawn note if the time is matched or more than the playtime 
                let spawnTime = this.noteSpawns[i].spawnTime;
                if(playTime >= spawnTime) {
                    this.calculateNoteDelay(playTime, this.noteSpawns[i].spawnTime); // Calculate the delay
                    const targetTime = this.noteSpawns[i].getTargetTime(this.travelTime);
                    const note = this.instantiateNote(this.noteSpawns[i], null, this.noteSpawnDelay * 1000.00); // Instantiate the note

                    // If the note spawned is hold, add the end note spawn
                    if(this.noteSpawns[i].type === NoteType.HOLD) {
                        // End note spawn should be found as it is initialized properly in create method
                        const endNoteSpawn = this.endNoteSpawns.find((x) => x.noteSpawn.id == this.noteSpawns[i].id);
                        endNoteSpawn.parentNote = note;
                    }
                    remove = true; // Note is instansiated, so remove it
                    removeCount++;
                } else {
                    break; // No matching time note are present, just break the loop
                }
            }
            
            if(remove) {
                // Calculate delta spawn time
                const t = new Date().getTime();
                if(this.lastNoteSpawnTime > -999) {
                    this.deltaNoteTime = (t * 0.001) - (this.lastNoteSpawnTime * 0.001);
                }
                this.lastNoteSpawnTime = t;

                // Pop the array depends on how many note are required to remove
                for(let i = 0; i < removeCount; i++) 
                    this.noteSpawns.pop();
            }
            //console.log(this.deltaNoteTime);

            remove = false; // Reuse the variable for drawing beat line
            removeCount = 0;
            // Spawn End Note
            for(let i = this.endNoteSpawns.length - 1; i >= 0; i--) {
                //console.log(this.endNoteSpawns[i].noteSpawn.spawnTime + " " + playTime);
                if(playTime >= this.endNoteSpawns[i].noteSpawn.spawnTime) {
                    if(this.endNoteSpawns[i].parentNote != null) {
                        this.calculateNoteDelay(playTime, this.endNoteSpawns[i].noteSpawn.spawnTime);
                        const targetTime = this.endNoteSpawns[i].noteSpawn.getTargetTime(this.travelTime);
                        const note = this.instantiateNote(this.endNoteSpawns[i].noteSpawn, this.endNoteSpawns[i].parentNote, this.noteSpawnDelay * 1000);
                        remove = true; // Note is instansiated or the parent note is destroyed already, so remove it
                        removeCount++;
                    }
                } else {
                    break;
                }
            }

            if(remove) {
                for(let i = 0; i < removeCount; i++) 
                    this.endNoteSpawns.pop();
            }
        }

        // Render beat line (Debug)
        if(this.running && this.drawBeatLine) {
            let remove = false;
            for(let i = this.spawnBeats.length - 1; i >= 0; i--) {
                // If matched with the song playtime
                if(playTime >= this.spawnBeats[i].time) {
                    // Draw line
                    this.drawBeatLineVisual();
                    remove = true;
                    break;
                }
            }
            if(remove) {
                this.spawnBeats.pop(); // Remove it from current beats
            }
        }
    }

    /** Start to run the beatmap with note spawn logic, 
     * should run earlier before the song is play (more than the offset + timeToSpawnEarly) 
    */
    start() {
        this.running = true;
        this.nextSongTempo = this.offset;

        /** An array to reference the beats, as do not want to change the orginal beats array */
        this.spawnBeats = Array.from(this.beats);
    }

    /** Debug to visualize the beat lines */
    drawBeatLineVisual() {
        const lineHeight = 500; // Height of the line
        const lineWidth = 1;
        const lineColor = "#eb4034";
        let line = this.scene.add.line(NoteSpawnPoint[0].x, game.config.height - lineHeight, 0,0, 0, lineHeight,  
                                        Phaser.Display.Color.HexStringToColor(lineColor).color).setOrigin(0);
        line.setLineWidth(lineWidth, lineWidth); // Set line width
        this.scene.add.existing(line);
        // Move the line by tween
        let tween = this.scene.tweens.add({
            targets: line, // target the player
            x: JudgementPositions[0].x,
            duration: this.scene.travelTime,
            repeat: 0,
            onComplete: function() {
                line.destroy();
            },
            callbackScope: this.scene
        });
    }

    /** Return the beat tempo count */
    beatString() {
        //return "Beat: " + this.beatCount + ":" + this.subBeatCount + " (" + this.totalBeatCount + ")";
        return this.currentBeatCount.getBeatCountString();
    }

    /**
     * Spawn an note from the scene (Beatmap scene)
     * @param {Note} note 
     * @returns Note
     */
    instantiateNote(note, parentNote, delay) {
        // let n = null;
        // if(note.type === NoteType.HOLD) {
        //     n = this.scene.instantiateNote(note.type, note.down, note.holdTime, null, delay, targetTime); // Need hold time reference
        // } else if(note.type === NoteType.END) {
        //     n = this.scene.instantiateNote(note.type, note.down, null, parentNote, delay, targetTime);
        // } else {
        //     n = this.scene.instantiateNote(note.type, note.down, null, null, delay, targetTime);
        // }
        
        // return n;
        const noteSpawned = Note.InstantiateNote(this.travelTime * 1000, note.down, note.type, note.holdTime, parentNote, delay, note);
        return noteSpawned;
    }

    calculateNoteDelay(actualTime, expectedTime) {
        this.noteSpawnDelay = actualTime - expectedTime;
        //console.log("Note Spawned Delay: " + this.noteSpawnDelay + "s :: " + (this.noteSpawnDelay * 1000) + "ms");
    }

    // TODO: instantly jump to certain progress of the song and the notes
    setSkip(t) {
        this.skip = true;
        this.skipTime = t;

        let removeCount = 0;
        // Removed pass notes
        for(let i = this.accurateBeats.length - 1; i >= 0; i--) {
            if(this.accurateBeats[i].time <= t) {

                removeCount++;
            }
        }
        for(let i = 0; i < removeCount; i++) {
            this.currentBeatCount.count();
            this.accurateBeats.pop();
        }

        removeCount = 0;
        for(let i = this.spawnBeats.length - 1; i >= 0; i--) {
            if(this.spawnBeats[i].time <= t) {
                removeCount++;
            }
        }
        for(let i = 0; i < removeCount; i++) {
            this.spawnBeats.pop();
        }

        removeCount = 0;
        for(let i = this.noteSpawns.length - 1; i >= 0; i--) {
            if(this.noteSpawns[i].spawnTime <= t) {
                removeCount++;
            }
        }
        for(let i = 0; i < removeCount; i++) {
            this.noteSpawns.pop();
        }

        removeCount = 0;
        for(let i = this.endNoteSpawns.length - 1; i >= 0; i--) {
            if(this.endNoteSpawns[i].noteSpawn.spawnTime <= t) {
                removeCount++;
            }  
        }
        for(let i = 0; i < removeCount; i++) {
            this.endNoteSpawns.pop();
        }
    }

    jumpTo(t) {

        this.song.song.setSeek(t);
    }

    getPreviewBeats(t) {
        let removeCount = 0;
        for(let i = this.accurateBeats.length - 1; i >= 0; i--) {
            if(this.accurateBeats[i].time <= t) {
                removeCount++;
            }
        }

        for(let i = 0; i < removeCount; i++) {
            this.accurateBeats.pop();
        }
        return Array.from(this.accurateBeats);
    }
}

class NoteSpawn {
    constructor(time, tempo, noteData, id) {
        this.spawnTime = time + ((tempo / noteData.beatSnapDivisor) * noteData.beatSnapDivisorPosition);
        //this.spawnTime = this.spawnTime.toFixed(3);
        this.type = noteData.type;
        if(this.type == NoteType.HOLD) {
            this.holdTime = (tempo / noteData.holdSnapDivisor) * noteData.holdMultiplier;
        }
        else {
            this.holdTime = 0;
        }

        this.beatCount = noteData.beatCount;
        this.time = time;
        this.down = noteData.down;
        this.data = noteData;
        this.id = id;
        //this.completeTime = 0;
    }

    /**
     * 
     * @param {number} travelTime 
     * @returns number - exact time to reached the judgement point
     */
    getTargetTime(travelTime) {
        return this.spawnTime + travelTime;
    }

    setCompleteTime(t) {
        this.completeTime = t;
    }

    equal(noteSpawn) {
        if(noteSpawn.spawnTime === this.spawnTime && noteSpawn.beatCount.equal(this.beatCount) && noteSpawn.down === this.down) {
            return true;
        } else {
            return false;
        }
    }
}

/** Responsible to add the end note spawn logic */
class EndNoteSpawn {
    constructor(noteSpawn, parentNote) {
        this.noteSpawn = noteSpawn;
        this.parentNote = parentNote;
    }
}

class NoteSpawnTest {
    constructor(time, beatSnapDivisor, position, tempo) {
        this.spawnTime = time + ((tempo / beatSnapDivisor) * position);

        // Debug
        this.time = time;
    } 
}

class NoteData {
    /**
     * 
     * @param {int} beat 
     * @param {int} subBeat 
     * @param {int} beatSnapDivisor 
     * @param {int} beatSnapDivisorPosition 
     * @param {int} type Note Type 0 - Normal, 1 - Hold, 2 - No Hit, 3 - Big Note, 4 - End Note
     * @param {int} down Note 0 - false, 1 - true
     */
    constructor(beat, subBeat, beatSnapDivisor, beatSnapDivisorPosition, type, holdSnapDivisor, holdMultiplier, down) {
        this.beat = beat;
        this.subBeat = subBeat;
        this.beatSnapDivisor = beatSnapDivisor;
        this.beatSnapDivisorPosition = beatSnapDivisorPosition;

        this.beatCount = new BeatCount();
        this.beatCount.set(beat, subBeat);

        if(down == 0) {
            this.down = false;
        }else if(down == 1) {
            this.down = true;
        } else {
            this.down = true;
        }

        if(type == null) {
            this.type = NoteType.NORMAL;
        }
        else {
            switch(type) {
                case 0:
                    this.type = NoteType.NORMAL;
                    break;
                case 1:
                    this.type = NoteType.HOLD;
                    break;
                case 2:
                    this.type = NoteType.NO_HIT;
                    break;
                case 3:
                    this.type = NoteType.BIG_NOTE;
                    break;
                case 4:
                    this.type = NoteType.END;
                    break;
                default:
                    this.type = NoteType.NORMAL;
                    break;
            }
        }
        
        if(this.type == NoteType.HOLD) {
            this.holdSnapDivisor = holdSnapDivisor;
            this.holdMultiplier = holdMultiplier;
        }
        
    }
}

class Beat {
    /**
     * 
     * @param {int} beat 
     * @param {int} subBeat 
     * @param {number} time 
     */
    constructor(beat, subBeat, time) {
        this.beat = beat;
        this.subBeat = subBeat;
        this.time = time;

        this.beatCount = new BeatCount();
        this.beatCount.set(beat, subBeat);
    }
}

class BeatCount {
    constructor() {
        this.beat = -1;
        this.subBeat = 3;
        this.totalBeat = 0;
        this.time = -1;
    }

    count(v) {
        if(v == null || v <= 1) {
            this.subBeat++;
            this.totalBeat++;
            if(this.subBeat > 3) {
                this.subBeat = 0;
                this.beat++;
            }
        } else {
            for(let i = 0; i < v; i++) {
                this.subBeat++;
                this.totalBeat++;
                if(this.subBeat > 3) {
                    this.subBeat = 0;
                    this.beat++;
                }    
            }
        }
    }

    reset() {
        this.beat = -1;
        this.subBeat = 3;
        this.totalBeat = 0;
    }

    set(beat, subBeat, time) {
        this.beat = beat;
        this.subBeat = subBeat;
        this.totalBeat = (beat * 4) + subBeat;

        if(time != null) {
            this.time = time;
        }
    }

    equal(beatCount) {
        if(beatCount.beat == this.beat && beatCount.subBeat == this.subBeat) {
            return true;
        } else {
            return false;
        }
    }

    getBeatCountString() {
        return "Beat: " + this.beat + ":" + this.subBeat + " (" + this.totalBeat + ")";
    }
}