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
        this.song = song;

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

        this.skip = false;
        this.skipTime = 0;

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
            new NoteData(0, 0, 1, 0, 1, 1, 8, 0),
            new NoteData(2, 0, 1, 0, 1, 1, 6, 1),
            new NoteData(3, 2, 1, 0, 1, 1, 2, 0),
            new NoteData(4, 0, 1, 0, 1, 1, 4, 1),
            new NoteData(5, 0, 1, 0, 1, 1, 4, 0),
            new NoteData(6, 0, 1, 0, 1, 1, 8, 1),
            new NoteData(8, 0, 1, 0, 0, 0, 0, 0),
            // Test note type
            new NoteData(8, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(8, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(8, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(8, 3, 1, 0, 0, 0, 0, 0),
            new NoteData(8, 3, 4, 2, 0, 0, 0, 0),

            new NoteData(9, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(9, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(9, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(9, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(9, 3, 2, 0, 0, 0, 0, 1),

            new NoteData(9, 3, 2, 1, 0, 0, 0, 0),
            new NoteData(10, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(10, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(10, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(10, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(10, 3, 1, 0, 0, 0, 0, 0),

            new NoteData(10, 3, 2, 1, 0, 0, 0, 1),
            new NoteData(11, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(11, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(11, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(11, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(11, 3, 1, 0, 0, 0, 0, 1),

            new NoteData(11, 3, 2, 1, 0, 0, 0, 0),
            new NoteData(12, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(12, 0, 4, 3, 0, 0, 0, 0),
            new NoteData(12, 1, 1, 0, 0, 0, 0, 0),

            new NoteData(12, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(12, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(12, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(12, 3, 1, 0, 0, 0, 0, 1),

            new NoteData(12, 3, 2, 1, 0, 0, 0, 0),
            new NoteData(13, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(13, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(13, 1, 2, 0, 0, 0, 0, 0),
            new NoteData(13, 1, 2, 1, 0, 0, 0, 0),

            new NoteData(13, 2, 2, 0, 0, 0, 0, 1),
            new NoteData(13, 2, 2, 1, 0, 0, 0, 1),
            new NoteData(13, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(13, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(14, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(14, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(14, 1, 2, 0, 0, 0, 0, 0),
            new NoteData(14, 1, 2, 1, 0, 0, 0, 0),

            new NoteData(14, 2, 2, 0, 0, 0, 0, 1),
            new NoteData(14, 2, 2, 1, 0, 0, 0, 1),
            new NoteData(14, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(14, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(15, 0, 1, 0, 0, 0, 0, 0), // Build up *Good
            new NoteData(15, 1, 1, 0, 0, 0, 0, 0), //*Bye
            new NoteData(15, 2, 2, 0, 0, 0, 0, 1), // Ma
            new NoteData(15, 2, 2, 1, 0, 0, 0, 0),// Ta
            new NoteData(15, 3, 1, 0, 0, 0, 0, 1),// Ne
            // Bass spam
            new NoteData(16, 0, 4, 0, 1, 1, 3, 0),
            new NoteData(16, 3, 1, 0, 3, 0, 0, 1),

            new NoteData(17, 0, 1, 0, 1, 1, 1, 1), // Hype
            // Different rhytnm
            new NoteData(17, 2, 4, 0, 3, 0, 0, 0),
            new NoteData(17, 2, 4, 3, 3, 0, 0, 0),
            new NoteData(17, 3, 4, 2, 3, 0, 0, 0),

            new NoteData(18, 0, 2, 0, 0, 0, 0, 1),
            new NoteData(18, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(18, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(18, 1, 2, 1, 0, 0, 0, 0),
            new NoteData(18, 2, 4, 0, 0, 0, 0, 1),
            new NoteData(18, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(18, 3, 1, 0, 0, 0, 0, 0),
            new NoteData(18, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(19, 0, 1, 0, 1, 2, 1, 0),
            new NoteData(19, 1, 1, 0, 1, 2, 1, 1),
            new NoteData(19, 2, 1, 0, 1, 2, 1, 0),

            new NoteData(19, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(19, 3, 2, 0, 0, 0, 0, 1), 
            new NoteData(19, 3, 2, 1, 0, 0, 0, 1), 
            new NoteData(20, 0, 4, 0, 0, 0, 0, 1),
            // Triple
            new NoteData(20, 0, 4, 2, 0, 0, 0, 0), 
            new NoteData(20, 0, 4, 3, 0, 0, 0, 0), 
            new NoteData(20, 1, 2, 0, 0, 0, 0, 0), 

            new NoteData(20, 1, 2, 1, 0, 0, 0, 0), 

            new NoteData(20, 2, 2, 0, 1, 1, 1, 1), 
            new NoteData(20, 3, 2, 1, 0, 0, 0, 0), 

            new NoteData(21, 0, 1, 0, 1, 2, 1, 1),
            new NoteData(21, 1, 1, 0, 1, 2, 1, 0),
            new NoteData(21, 2, 1, 0, 1, 2, 1, 1),

            new NoteData(21, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(21, 3, 2, 0, 0, 0, 0, 0), 
            new NoteData(21, 3, 2, 1, 0, 0, 0, 0), 

            new NoteData(22, 0, 2, 0, 0, 0, 0, 1),
            new NoteData(22, 0, 2, 1, 0, 0, 0, 1),

            new NoteData(22, 1, 2, 0, 0, 0, 0, 0),
            new NoteData(22, 1, 2, 1, 0, 0, 0, 0),

            new NoteData(22, 2, 2, 0, 0, 0, 0, 1),
            new NoteData(22, 2, 2, 1, 0, 0, 0, 1),
            new NoteData(22, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(22, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(23, 0, 1, 0, 1, 2, 1, 0),
            new NoteData(23, 1, 1, 0, 1, 2, 1, 1),
            new NoteData(23, 2, 1, 0, 1, 2, 1, 0),

            new NoteData(23, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(23, 3, 2, 0, 0, 0, 0, 1), 
            new NoteData(23, 3, 2, 1, 0, 0, 0, 1), 

            new NoteData(24, 0, 1, 0, 0, 0, 0, 1), // Good
            new NoteData(24, 1, 1, 0, 0, 0, 0, 1), // Bye

            new NoteData(24, 2, 2, 0, 0, 0, 0, 0), // Ma
            new NoteData(24, 2, 2, 1, 0, 0, 0, 0), // Ta
            new NoteData(24, 3, 1, 0, 0, 0, 0, 0), // Ne

            new NoteData(25, 0, 1, 0, 1, 1, 1, 1), // Hold for stop beat
            new NoteData(25, 1, 1, 0, 3, 0, 0, 0),
            // Need to recheck
            // new NoteData(25, 0, 2, 1, 0, 0, 0, 0),
            // new NoteData(25, 1, 1, 1, 0, 0, 0, 0),
            new NoteData(25, 2, 4, 0, 0, 0, 0, 0),
            new NoteData(25, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(25, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(25, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(26, 0, 2, 0, 0, 0, 0, 1),
            new NoteData(26, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(26, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(26, 1, 2, 1, 0, 0, 0, 1),

            new NoteData(26, 2, 4, 0, 0, 0, 0, 0),
            new NoteData(26, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(26, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(26, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(27, 0, 1, 0, 1, 2, 1, 0),
            new NoteData(27, 1, 1, 0, 1, 2, 1, 1),
            new NoteData(27, 2, 1, 0, 1, 2, 1, 0),

            new NoteData(27, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(27, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(27, 3, 2, 1, 0, 0, 0, 1),
            new NoteData(28, 0, 4, 0, 0, 0, 0, 1),

            // Triple
            new NoteData(28, 0, 4, 2, 0, 0, 0, 0), 
            new NoteData(28, 0, 4, 3, 0, 0, 0, 0), 
            new NoteData(28, 1, 2, 0, 0, 0, 0, 0), 

            new NoteData(28, 2, 4, 0, 0, 0, 0, 1), 
            new NoteData(28, 2, 4, 3, 0, 0, 0, 1), 
            new NoteData(28, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(28, 3, 2, 1, 0, 0, 0, 1), 

            new NoteData(29, 0, 1, 0, 1, 2, 1, 0), 
            new NoteData(29, 1, 1, 0, 1, 2, 1, 1), 
            new NoteData(29, 2, 1, 0, 1, 2, 1, 0), 

            new NoteData(29, 2, 4, 3, 0, 0, 0, 1), 
            new NoteData(29, 3, 2, 0, 0, 0, 0, 1), 
            new NoteData(29, 3, 2, 1, 0, 0, 0, 1), 
            new NoteData(30, 0, 2, 0, 0, 0, 0, 0), 
            new NoteData(30, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(30, 1, 4, 0, 0, 0, 0, 0),

            // Triple
            new NoteData(30, 1, 4, 2, 0, 0, 0, 1),
            new NoteData(30, 1, 4, 3, 0, 0, 0, 1),
            new NoteData(30, 2, 1, 0, 0, 0, 0, 1),

            // new NoteData(30, 3, 2, 0, 1, 2, 1, 0),
            // new NoteData(30, 3, 2, 1, 1, 2, 1, 1),
            // new NoteData(31, 0, 1, 0, 1, 1, 1, 0), // Hold
             new NoteData(30, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(30, 3, 2, 1, 0, 0, 0, 1),
            new NoteData(31, 0, 1, 0, 1, 1, 1, 0), // Hold           

            // Double distinguish beat
            new NoteData(31, 1, 4, 3, 3, 0, 0, 1),
            new NoteData(31, 2, 2, 1, 3, 0, 0, 1),

            new NoteData(32, 0, 1, 0, 1, 1, 1, 1),
            new NoteData(32, 1, 1, 0, 1, 1, 1, 0),
            new NoteData(32, 2, 1, 0, 1, 1, 1, 1),
            new NoteData(32, 3, 1, 0, 1, 1, 1, 0),
            new NoteData(33, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(33, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(33, 2, 2, 0, 0, 0, 0, 0),
            new NoteData(33, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(33, 3, 2, 1, 1, 1, 1, 1),

            new NoteData(34, 1, 1, 0, 1, 1, 1, 0),

            new NoteData(34, 2, 2, 1, 1, 1, 1, 1),
            new NoteData(34, 3, 2, 1, 1, 1, 1, 0),

            new NoteData(35, 1, 2, 0, 1, 1, 1, 1),
            //new NoteData(35, 1, 2, 0, 0, 0, 0, 0),

            new NoteData(35, 2, 2, 1, 0, 0, 0, 0),
            //new NoteData(35, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(35, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(36, 0, 1, 0, 1, 1, 1, 1),
            new NoteData(36, 1, 1, 0, 1, 1, 1, 0),
            new NoteData(36, 2, 1, 0, 1, 1, 1, 1),
            new NoteData(36, 3, 1, 0, 1, 1, 1, 0),
            new NoteData(37, 0, 1, 0, 1, 1, 1, 1),
            new NoteData(37, 1, 1, 0, 1, 1, 1, 0),

            new NoteData(37, 2, 2, 1, 0, 0, 0, 1),
            new NoteData(37, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(37, 3, 2, 1, 1, 1, 1, 0),
            new NoteData(38, 1, 1, 0, 1, 1, 1, 1),
            new NoteData(38, 2, 2, 1, 0, 0, 0, 1),

            new NoteData(38, 3, 2, 1, 3, 0, 0, 0),
            new NoteData(39, 0, 4, 1, 3, 0, 0, 0),

            new NoteData(39, 1, 2, 1, 0, 0, 0, 0),
            new NoteData(39, 2, 2, 0, 0, 0, 0, 0),
            new NoteData(39, 2, 2, 1, 0, 0, 0, 0),
            new NoteData(39, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(39, 3, 2, 1, 1, 1, 1, 1),

            new NoteData(40, 1, 2, 0, 1, 1, 1, 0),
            //new NoteData(40, 1, 2, 0, 0, 0, 0, 1),

            new NoteData(40, 2, 2, 0, 1, 1, 1, 1),
            new NoteData(40, 3, 2, 0, 1, 1, 1, 0),

            // Second Verse
            new NoteData(41, 0, 1, 0, 1, 1, 4, 1), 
            new NoteData(41, 1, 1, 0, 2, 0, 0, 1), // No hit
            new NoteData(41, 2, 1, 0, 2, 0, 0, 1), // No hit
            new NoteData(41, 3, 1, 0, 2, 0, 0, 1), // No hit
            new NoteData(42, 0, 1, 0, 1, 1, 4, 0), 
            new NoteData(42, 1, 1, 0, 2, 0, 0, 0), // No hit
            new NoteData(42, 2, 1, 0, 2, 0, 0, 0), // No hit
            new NoteData(42, 3, 1, 0, 2, 0, 0, 0), // No hit

            new NoteData(43, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(43, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(43, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(43, 3, 1, 0, 0, 0, 0, 1),

            new NoteData(44, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(44, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(44, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(44, 3, 1, 0, 0, 0, 0, 1),

            new NoteData(45, 0, 1, 0, 1, 1, 4, 0), 
            new NoteData(45, 1, 1, 0, 2, 0, 0, 0), // No hit
            new NoteData(45, 2, 1, 0, 2, 0, 0, 0), // No hit
            new NoteData(45, 3, 1, 0, 2, 0, 0, 0), // No hit
            new NoteData(46, 0, 1, 0, 1, 1, 4, 1), 
            new NoteData(46, 1, 1, 0, 2, 0, 0, 1), // No hit
            new NoteData(46, 2, 1, 0, 2, 0, 0, 1), // No hit
            new NoteData(46, 3, 1, 0, 2, 0, 0, 1), // No hit

            new NoteData(47, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(47, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(47, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(47, 3, 1, 0, 0, 0, 0, 0),

            new NoteData(48, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(48, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(48, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(48, 3, 1, 0, 0, 0, 0, 0),

            new NoteData(49, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(49, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(49, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(49, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(49, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(50, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(50, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(50, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(50, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(50, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(50, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(51, 0, 1, 0, 0, 0, 0, 1),
            new NoteData(51, 1, 1, 0, 0, 0, 0, 1),
            new NoteData(51, 2, 1, 0, 0, 0, 0, 1),
            new NoteData(51, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(51, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(51, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(52, 0, 1, 0, 0, 0, 0, 0),
            new NoteData(52, 1, 1, 0, 0, 0, 0, 0),
            new NoteData(52, 2, 1, 0, 0, 0, 0, 0),
            new NoteData(52, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(52, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(52, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(53, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(53, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(53, 1, 2, 0, 0, 0, 0, 0),
            new NoteData(53, 1, 2, 1, 0, 0, 0, 0),

            new NoteData(53, 2, 2, 0, 0, 0, 0, 1),
            new NoteData(53, 2, 2, 1, 0, 0, 0, 1),
            new NoteData(53, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(53, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(54, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(54, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(54, 1, 2, 0, 0, 0, 0, 0),
            new NoteData(54, 1, 2, 1, 0, 0, 0, 0),

            new NoteData(54, 2, 2, 0, 0, 0, 0, 1),
            new NoteData(54, 2, 2, 1, 0, 0, 0, 1),
            new NoteData(54, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(54, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(55, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(55, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(55, 1, 2, 0, 0, 0, 0, 0),
            new NoteData(55, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(55, 2, 2, 0, 0, 0, 0, 0),
            new NoteData(55, 2, 2, 1, 0, 0, 0, 1),
            new NoteData(55, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(55, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(56, 0, 2, 0, 3, 0, 0, 1), // Second verse start * Good
            new NoteData(56, 1, 1, 0, 1, 2, 3, 0),// Bye
            new NoteData(56, 3, 1, 0, 0, 0, 0, 1),

            new NoteData(57, 0, 2, 0, 3, 0, 0, 0), // Big impact
            new NoteData(57, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(57, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(57, 1, 2, 1, 0, 0, 0, 0),
            new NoteData(57, 2, 2, 0, 0, 0, 0, 0),

            // Triple
            new NoteData(57, 2, 4, 2, 0, 0, 0, 1),
            new NoteData(57, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(57, 3, 4, 0, 0, 0, 0, 1),

            new NoteData(57, 3, 2, 1, 0, 0, 0, 0),
            new NoteData(58, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(58, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(58, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(58, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(58, 2, 2, 0, 0, 0, 0, 1),

            // Triple
            new NoteData(58, 2, 4, 2, 0, 0, 0, 0),
            new NoteData(58, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(58, 3, 2, 0, 0, 0, 0, 0),

            // EDM
            new NoteData(59, 0, 1, 0, 1, 1, 1, 0),
            new NoteData(59, 1, 1, 0, 1, 1, 1, 1),
            new NoteData(59, 2, 1, 0, 1, 1, 1, 0),
            new NoteData(59, 3, 2, 1, 0, 0, 0, 1),
            new NoteData(60, 0, 2, 0, 0, 0, 0, 1),

            // Triple
            new NoteData(60, 0, 4, 2, 0, 0, 0, 0),
            new NoteData(60, 0, 4, 3, 0, 0, 0, 0),
            new NoteData(60, 1, 2, 0, 0, 0, 0, 0),

            new NoteData(60, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(60, 2, 2, 0, 0, 0, 0, 0),

            // Triple
            new NoteData(60, 2, 4, 2, 0, 0, 0, 1),
            new NoteData(60, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(60, 3, 2, 0, 0, 0, 0, 1),

            new NoteData(60, 3, 2, 1, 0, 0, 0, 0),
            new NoteData(61, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(61, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(61, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(61, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(61, 2, 2, 0, 0, 0, 0, 1),

            // Triple
            new NoteData(61, 2, 4, 2, 0, 0, 0, 0),
            new NoteData(61, 2, 4, 3, 0, 0, 0, 0),
            new NoteData(61, 3, 2, 0, 0, 0, 0, 0),

            new NoteData(61, 3, 2, 1, 0, 0, 0, 1),
            new NoteData(62, 0, 2, 0, 0, 0, 0, 0),
            new NoteData(62, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(62, 1, 2, 0, 0, 0, 0, 0),

            // Triple
            new NoteData(62, 1, 4, 2, 0, 0, 0, 1),
            new NoteData(62, 1, 4, 3, 0, 0, 0, 1),
            new NoteData(62, 2, 2, 0, 0, 0, 0, 1),

            new NoteData(62, 2, 2, 1, 0, 0, 0, 0),
            new NoteData(62, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(62, 3, 2, 1, 0, 0, 0, 0),

            // EDM
            new NoteData(63, 0, 1, 0, 1, 1, 1, 1),
            new NoteData(63, 1, 1, 0, 1, 1, 1, 0),
            new NoteData(63, 2, 1, 0, 1, 1, 1, 1),

            // Triple
            new NoteData(63, 3, 4, 2, 0, 0, 0, 0),
            new NoteData(63, 3, 4, 3, 0, 0, 0, 0),
            new NoteData(64, 0, 2, 0, 0, 0, 0, 0),

            new NoteData(64, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(64, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(64, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(64, 2, 2, 0, 0, 0, 0, 0),
            new NoteData(64, 2, 2, 1, 0, 0, 0, 0),
            new NoteData(64, 3, 2, 0, 0, 0, 0, 0),
            new NoteData(64, 3, 2, 1, 0, 0, 0, 1),

            // Special
            new NoteData(65, 0, 1, 0, 1, 1, 1, 1),
            new NoteData(65, 1, 1, 0, 3, 0, 0, 0),

            new NoteData(65, 1, 2, 1, 0, 0, 0, 0),
            new NoteData(65, 2, 2, 0, 0, 0, 0, 0),

            // Triple
            new NoteData(65, 2, 4, 2, 0, 0, 0, 1),
            new NoteData(65, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(65, 3, 2, 0, 0, 0, 0, 1),

            new NoteData(65, 3, 2, 1, 0, 0, 0, 0),
            new NoteData(66, 0, 2, 0, 0, 0, 0, 1),
            new NoteData(66, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(66, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(66, 1, 2, 1, 0, 0, 0, 0),
            new NoteData(66, 2, 2, 0, 0, 0, 0, 1),

            new NoteData(66, 2, 2, 1, 1, 1, 1, 0),
            new NoteData(66, 3, 2, 1, 0, 0, 0, 1),

            new NoteData(67, 0, 2, 0, 0, 0, 0, 0),

            new NoteData(67, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(67, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(67, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(67, 2, 2, 0, 0, 0, 0, 0),
            new NoteData(67, 2, 2, 1, 0, 0, 0, 0),
            new NoteData(67, 3, 2, 0, 0, 0, 0, 0),

            // Triple
            new NoteData(67, 3, 4, 2, 0, 0, 0, 0),
            new NoteData(67, 3, 4, 3, 0, 0, 0, 0),
            new NoteData(68, 0, 2, 0, 0, 0, 0, 0),

            new NoteData(68, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(68, 1, 2, 0, 0, 0, 0, 0),
            new NoteData(68, 1, 2, 1, 0, 0, 0, 1),
            new NoteData(68, 2, 2, 0, 0, 0, 0, 0),

            // Triple
            new NoteData(68, 2, 4, 2, 0, 0, 0, 1),
            new NoteData(68, 2, 4, 3, 0, 0, 0, 1),
            new NoteData(68, 3, 2, 0, 0, 0, 0, 1),

            new NoteData(68, 3, 2, 1, 0, 0, 0, 0),
            new NoteData(69, 0, 2, 0, 0, 0, 0, 1),
            new NoteData(69, 0, 2, 1, 0, 0, 0, 0),
            new NoteData(69, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(69, 1, 2, 1, 0, 0, 0, 0),
            new NoteData(69, 2, 2, 0, 0, 0, 0, 1),
            new NoteData(69, 2, 2, 1, 0, 0, 0, 0),
            new NoteData(69, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(69, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(70, 0, 2, 0, 0, 0, 0, 1),
            new NoteData(70, 0, 2, 1, 0, 0, 0, 1),
            new NoteData(70, 1, 2, 0, 0, 0, 0, 1),
            new NoteData(70, 1, 2, 1, 0, 0, 0, 0),
            new NoteData(70, 2, 2, 0, 0, 0, 0, 0),
            new NoteData(70, 2, 2, 1, 0, 0, 0, 0),
            new NoteData(70, 3, 2, 0, 0, 0, 0, 1),
            new NoteData(70, 3, 2, 1, 0, 0, 0, 0),

            new NoteData(71, 0, 1, 0, 1, 1, 1, 1),
            new NoteData(71, 1, 1, 0, 1, 1, 1, 0),
            new NoteData(71, 2, 1, 0, 1, 1, 1, 1),

            // Triple
            new NoteData(71, 3, 4, 2, 0, 0, 0, 0),
            new NoteData(71, 3, 4, 3, 0, 0, 0, 0),
            new NoteData(72, 0, 2, 0, 0, 0, 0, 0),

            // Kinda hard here
            new NoteData(72, 1, 2, 0, 3, 0, 0, 1),
            new NoteData(72, 1, 2, 0, 1, 1, 1, 0),
            new NoteData(72, 2, 2, 0, 1, 1, 1, 1),
            new NoteData(72, 3, 2, 0, 3, 0, 0, 0),

            // End
            new NoteData(73, 0, 1, 0, 1, 1, 8, 1),
            new NoteData(75, 0, 1, 0, 1, 1, 6, 0),
            new NoteData(76, 2, 1, 0, 1, 1, 2, 1),
            new NoteData(77, 0, 1, 0, 1, 1, 4, 0),
            new NoteData(78, 0, 1, 0, 1, 1, 4, 1),
            new NoteData(79, 0, 1, 0, 1, 1, 7, 0),
        ];
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
                    const spawn = new NoteSpawn(this.beats[i].time, this.secondPerBeat, currentData[j]);
                    this.noteSpawns.push(spawn);

                    if(this.noteSpawns.length > 1 && spawn.equal(this.noteSpawns[this.noteSpawns.length - 2])) {
                        console.warn("[Beatmap] Duplicate note found at " + spawn.beatCount.getBeatCountString());
                    }
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
        // Song Skip
        if(this.skip) {
            if(playTime >= this.skipTime) {
                this.skip = false;
            }
            return;
        }
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
        } else {
            this.scene.instantiateNote(note.type, note.down);
        }

    }

    // TODO: instantly jump to certain progress of the song and the notes
    setSkip(t) {
        this.skip = true;
        this.skipTime = t;
    }
    jumpTo(t) {
        let removeCount = 0;
        // Removed pass notes
        for(let i = 0; i < this.accurateBeats; i++) {
            if(this.accurateBeats[i].time <= t) {
                removeCount++;
            }
        }
        for(let i = 0; i < removeCount; i++) {
            this.accurateBeats.shift();
        }

        removeCount = 0;
        for(let i = 0; i < this.currentBeats; i++) {
            if(this.currentBeats[i].time <= t) {
                removeCount++;
            }
        }
        for(let i = 0; i < removeCount; i++) {
            this.currentBeats.shift();
        }

        removeCount = 0;
        for(let i = 0; i < this.noteSpawns; i++) {
            if(this.noteSpawns[i].time - (this.scene.travelTime * 0.001) <= t) {
                removeCount++;
            }
        }
        for(let i = 0; i < removeCount; i++) {
            this.noteSpawns.shift();
        }

        this.song.song.setSeek(t);
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

    equal(noteSpawn) {
        if(noteSpawn.spawnTime === this.spawnTime && noteSpawn.beatCount.equal(this.beatCount) && noteSpawn.down === this.down) {
            return true;
        } else {
            return false;
        }
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
     * @param {int} type Note Type 0 - Normal, 1 - Hold, 2 - No Hit
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