const DefaultBeatmapConfig = {
    x: 0
}

class Beatmap {
    static Metronome1;
    static Metronome2;

    /**
     * 
     * @param {Scene} scene Beatmap scene reference
     * @param {Song} song Song reference
     */
    constructor(scene, song) {
        this.scene = scene;
        this.drawBeatLine = true;
        this.playMetronome = true;

        this.offsetCount = 0;
        // Open your heart
        //this.offset = 0.222; // milisecond
        //this.bpm = 150; // test
        // Bye or not
        this.offset = 0.874; // milisecond
        this.bpm = 170; // test

        this.songDuration = song.duration(); 
        this.tempo = this.bpm / 60.0; // 2 beat per second
        this.secondPerBeat = 1.0 / this.tempo;

        this.currentBeatCount = new BeatCount();

        // Based on song playtime
        /** Next timeline that will have the beat drop  */
        this.nextSongTempo = this.offset;

        // Old data
        this.data = [new NoteData(0, 0, 1, 0),
                    new NoteData(0, 2, 1, 0),
                    new NoteData(1, 0, 1, 0),
                    new NoteData(1, 1, 1, 0),
                    new NoteData(1, 2, 1, 0),
                    new NoteData(2, 0, 1, 0),
                    new NoteData(2, 2, 1, 0),
                    new NoteData(3, 0, 1, 0),
                    new NoteData(3, 1, 1, 0),
                    new NoteData(3, 2, 1, 0),
                    new NoteData(3, 3, 4, 0),
                    new NoteData(3, 3, 4, 2),
                    new NoteData(4, 0, 1, 0),
                    new NoteData(4, 2, 1, 0),
                    new NoteData(5, 0, 1, 0),
                    new NoteData(5, 1, 1, 0),
                    new NoteData(5, 2, 1, 0),
                    new NoteData(6, 0, 1, 0),
                    new NoteData(6, 1, 1, 0),
                    new NoteData(6, 2, 1, 0),
                    new NoteData(6, 3, 1, 0),
                    new NoteData(7, 0, 1, 0),
                    new NoteData(7, 0, 2, 1),
                    new NoteData(7, 0, 8, 6),
                    new NoteData(7, 0, 8, 7),
                    new NoteData(7, 0, 8, 8),
                    new NoteData(7, 1, 4, 2),
                    new NoteData(7, 1, 8, 7),
                    new NoteData(7, 1, 8, 8),
                    new NoteData(7, 2, 6, 2),
                    new NoteData(7, 2, 6, 5),
                    new NoteData(7, 2, 6, 6),
                    new NoteData(7, 3, 6, 2),
                    new NoteData(7, 3, 6, 3),
                    new NoteData(8, 0, 1, 0),
                    new NoteData(8, 1, 1, 0),
                    new NoteData(8, 1, 8, 4),
                    new NoteData(8, 1, 8, 6),
                    new NoteData(8, 2, 8, 2),
                    new NoteData(8, 2, 8, 4),
                    new NoteData(8, 3, 4, 0),
                    new NoteData(8, 3, 4, 2),
                    new NoteData(9, 0, 4, 0),
                    new NoteData(9, 0, 4, 1),
                    new NoteData(9, 0, 4, 2),
                    new NoteData(9, 1, 4, 0),
                    new NoteData(9, 1, 4, 2),
                    new NoteData(9, 1, 4, 3),
                    new NoteData(9, 2, 4, 1),
                    new NoteData(9, 2, 4, 2),
                    new NoteData(9, 3, 4, 0),
                    new NoteData(9, 3, 4, 2),
                    new NoteData(9, 3, 4, 3),
                    new NoteData(10, 0, 4, 0),
                    new NoteData(10, 1, 4, 0),
                    new NoteData(10, 1, 4, 2),
                    new NoteData(10, 1, 4, 3),
                    new NoteData(10, 2, 4, 1),
                    new NoteData(10, 2, 4, 2),
                    new NoteData(10, 3, 4, 0),
                    new NoteData(10, 3, 4, 2),
                    new NoteData(11, 0, 4, 0),
                    new NoteData(11, 0, 4, 2),
                    new NoteData(11, 1, 4, 0),
                    new NoteData(11, 1, 4, 2),
                    new NoteData(11, 1, 4, 3),
                    new NoteData(11, 2, 4, 0),
                    new NoteData(11, 2, 4, 1),
                    new NoteData(11, 2, 4, 2),
                    new NoteData(11, 3, 4, 0),
                    new NoteData(11, 3, 4, 2),
                    new NoteData(11, 3, 4, 3),
                    new NoteData(11, 3, 4, 4),
                    new NoteData(12, 1, 4, 0),
                    new NoteData(12, 1, 4, 2),
                    new NoteData(12, 1, 4, 3),
                    new NoteData(12, 2, 4, 1),
                    new NoteData(12, 2, 4, 2),
                    new NoteData(12, 3, 4, 0),
                    new NoteData(12, 3, 4, 2),
                    new NoteData(12, 3, 4, 3),
                    new NoteData(12, 3, 4, 4),
                    new NoteData(13, 0, 4, 2),
                    new NoteData(13, 1, 4, 0),
                ];
        this.data2 = [
            // new NoteData(0, 0, 1, 0, 0, 0, 0, 0),
            // new NoteData(1, 3, 1, 0, 1, 1, 7, 1),
            // new NoteData(2, 3, 1, 0, 0, 0, 0, 1),
            // new NoteData(3, 3, 1, 0, 0, 0, 0, 1),
            // new NoteData(4, 3, 1, 0, 0, 0, 0, 1),
            //new NoteData(3, 1, 1, 0, 1, 1, 2, 1),
            //new NoteData(3, 3, 1, 0, 1, 1, 7, 0),
            new NoteData(0, 0, 1, 0, 1, 1, 4, 1),
            new NoteData(0, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(0, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(0, 3, 1, 0, 0, 0, 0, 1),

            new NoteData(1, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(1, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(1, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(1, 3, 1, 0, 0, 0, 0, 0),

            new NoteData(2, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(2, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(2, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(2, 3, 1, 0, 0, 0, 0, 0),

            new NoteData(3, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(3, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(3, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(3, 3, 1, 0, 0, 0, 0, 0),

            new NoteData(4, 0, 1, 0, 1, 1, 1, 1),
            new NoteData(4, 2, 1, 0, 1, 1, 1, 0),

            new NoteData(5, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(5, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(5, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(5, 3, 1, 0, 0, 0, 0, 0),

            new NoteData(6, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(6, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(6, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(6, 3, 1, 0, 0, 0, 0, 1),
        ];
        //console.log(this.data2);
    }

    /** Load neccessary common resources for Beatmap, call it in the preload scene to load the note sfx audio */
    static LoadSFX(scene) {
        Beatmap.Metronome1 = scene.sound.add(SFXId.METRONOME1);
        Beatmap.Metronome2 = scene.sound.add(SFXId.METRONOME2);
    }

    create() {
        this.running = false;
        this.bpmStart = false;

        let n = 0;
        //let nextTempo = this.offset;
        /** Updated tempo when looping the song */
        let nextTempo = 0;
        const spawnEarlySec = this.scene.travelTime * 0.001; // Need to determine by the hit position and the spawn position to know how many sec needed 
        const timePrecision = 0.0001;
        /** All beats for the song */
        this.beats = []; 
        this.accurateBeats = []; 
        this.noteSpawns = []; //notes to spawn
        /** Beat count when looping the song */
        let beatCounting = new BeatCount();

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
        const testBeatDivide = 1;
        let currentData = this.data2; // Map data for the song
        //console.log(this.beats);
        //console.log(currentData)
        for(let i = 0; i < this.beats.length; i++) {

            // Test Note Instantiate
            // for(let j = 0; j < testBeatDivide; j++) {
            //     this.noteSpawns.push(new NoteSpawnTest(this.beats[i].time, testBeatDivide, j, this.secondPerBeat));
            // }

            // Test data instantiate
            for(let j = 0; j < currentData.length; j++) {
                //if(currentData[j].beat == this.beats[i].beat && currentData[j].subBeat == this.beats[i].subBeat) {

                //console.log(this.beats[i].equal(currentData[j].beatCount) + " " + currentData[0]);
                if(this.beats[i].equal(currentData[j].beatCount)) {
                    //this.spawnTime.push(new NoteSpawn(this.beats[i].time, currentData[j].beatSnapDivisor, currentData[j].beatSnapDivisorPosition, this.secondPerBeat));
                    this.noteSpawns.push(new NoteSpawn(this.beats[i].time, this.secondPerBeat, currentData[j]));
                }
            }
        }
        
        // console.log(this.beats);
        // console.log(this.accurateBeats);
        // console.log(this.noteSpawns);
    }

    /**
     * Update the note spawn logic with the song
     * @param {number} playTime Current seek value of the song
     */
    update(playTime) {
        // Counting beat
        if(this.running && playTime >= this.offset) {
            //if(playTime > this.nextSongTempo) {
            if(this.accurateBeats.length > 0) {
                if(playTime >= this.accurateBeats[0].time) {
                    this.currentBeatCount.count(); // Count the beat
    
                    // Play metronome audio
                    if(this.playMetronome) {
                        if(this.currentBeatCount.subBeat == 0) {
                            Beatmap.Metronome2.play(); // Higher pitch metronome
                        } else {
                            Beatmap.Metronome1.play(); // Lower pitch metronome
                        }
                    }
                    this.accurateBeats.shift(); // Removed the beat at the end
                }
            }
        }

        // Spawn notes
        if(this.running) {
            // TODO: optimise the code here
            /** Determine wherether to remove first note in the noteSpawns array */
            let remove = false;
            let removeIndex = [];
            let removeMultiple = false;
            let removeCount = 0;
            for(let i = 0; i < this.noteSpawns.length; i++) {
                // Spawn note if the time is matched
                if(playTime >= this.noteSpawns[i].spawnTime) {
                    this.instantiateNote(this.noteSpawns[i]); // Instantiate the note
                    remove = true; // Note is instansiated, so remove it
                    //console.log(this.noteSpawns[i].beatCount.getBeatCountString());
                    removeIndex.push(i);
                    removeCount++;
                    // if(i + 1 < this.noteSpawns.length && this.noteSpawns[i + 1] != null && 
                    //     this.noteSpawns[i + 1].spawnTime <= playTime) {
                    //     removeMultiple = true;
                    // } else {
                    //     break;
                    // }
                } else {
                    break;
                }
            }
            // Remove first note if its true
            // if(remove && removeMultiple) {
            //     for(let i = 0; i < removeIndex.length; i++) {
            //         this.noteSpawns.splice(i, 1);
            //     }
            // } else if(remove) {
            //     this.noteSpawns.shift();
            // }
            if(remove) {
                for(let i = 0; i < removeCount; i++) 
                    this.noteSpawns.shift();
                // for(let i = 0; i < removeIndex.length; i++) {
                //     this.noteSpawns.splice(i, 1);
                // }
            }

            remove = false; // Reuse the variable for drawing beat line
            // Draw beat lines to visualize the beat
            if(this.drawBeatLine) {
                // Loop all the beats
                for(let i = 0; i < this.currentBeats.length; i++) {
                    // If matched with the song playtime
                    if(playTime >= this.currentBeats[i].time) {
                        // Draw line
                        this.drawBeatLineVisual();
                        remove = true;
                        break;
                    }
                }
                if(remove) {
                    this.currentBeats.shift(); // Remove it from current beats
                }
            }
        }
    }

    start() {
        this.running = true;
        this.nextSongTempo = this.offset;

        /** An array to reference the beats, as do not want to change the orginal beats array */
        this.currentBeats = this.beats;
    }

    drawBeatLineVisual() {
        const lineHeight = 500; // Height of the line
        const lineWidth = 1;
        const lineColor = "#eb4034";
        let line = this.scene.add.line(this.scene.noteSpawnPoint.x, game.config.height - lineHeight, 0,0, 0, lineHeight,  
                                        Phaser.Display.Color.HexStringToColor(lineColor).color).setOrigin(0);
        line.setLineWidth(lineWidth, lineWidth); // Set line width
        this.scene.add.existing(line);
        // Move the line by tween
        let tween = this.scene.tweens.add({
            targets: line, // target the player
            x: this.scene.judgementPositions[0].x,
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

    instantiateNote(note) {
        if(note.type == NoteType.HOLD) {
            this.scene.instantiateNote(note.type, note.down, note.holdTime); // Need hold time reference
        } else if(note.type == NoteType.NORMAL) {
            this.scene.instantiateNote(note.type, note.down);
        }

    }
}

class NoteSpawn {
    constructor(time, tempo, noteData) {
        this.spawnTime = time + ((tempo / noteData.beatSnapDivisor) * noteData.beatSnapDivisorPosition);
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
     * @param {int} type Note Type 0 - Normal, 1 - Hold
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