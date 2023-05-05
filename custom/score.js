const AccuracyWeight = {
    PERFECT: 1, // 100%
    GREAT: 0.5, // 50%
    BAD: 0.25, // 25%
    MISS: 0, // 0%
}

const ScoreWeight = {
    PERFECT: 300,
    GREAT: 100,
    BAD: 50,
    MISS: 0,
}

class Score {
    // Singleton
    static Instance;
    static SetSingleton(score) {
        if(Score.Instance == null)
            Score.Instance = score;
        else
            console.warn("Score instance already exist");
    }
    static GetInstance() {
        if(Score.Instance == null) {
            Score.Instance = new Score();
        }

        return Score.Instance;
    }

    // TODO: add total note parameter
    constructor() {
        // Note hit counter
        /** Current total not hitted */
        this.currentTotal = 0;
        this.perfect = 0;
        this.great = 0;
        this.bad = 0;
        this.miss = 0;
        this.combo = 0;

        this.accuracySum = 0;
        this.accuracy = 0;

        this.score = 0;
    }

    reset() {
        this.currentTotal = 0;
        this.perfect = 0;
        this.great = 0;
        this.bad = 0;
        this.miss = 0;
        this.combo = 0;

        this.accuracySum = 0;
        this.accuracy = 0;

        this.score = 0;
    }

    add(noteType) {
        let accuracyWeight = 0;
        let noteScore = 0;
        switch(noteType) {
            case NoteHitResult.PERFECT:
                this.perfect++;
                this.combo++;
                accuracyWeight = AccuracyWeight.PERFECT;
                noteScore = ScoreWeight.PERFECT;
            break;
            case NoteHitResult.GREAT:
                this.great++;
                this.combo++;
                accuracyWeight = AccuracyWeight.GREAT;
                noteScore = ScoreWeight.GREAT;
            break;
            case NoteHitResult.BAD:
                this.bad++;
                if(this.combo > 3) {
                    Note.ComboBreak.play(Note.SFXConfig);
                }
                this.combo = 0; // Break the combo
                accuracyWeight = AccuracyWeight.BAD;
                noteScore = ScoreWeight.BAD;
            break;
            case NoteHitResult.MISS:
                this.miss++;
                if(this.combo > 3) {
                    Note.ComboBreak.play(Note.SFXConfig);
                }
                this.combo = 0; // Break the combo
                accuracyWeight = AccuracyWeight.MISS;
                noteScore = ScoreWeight.MISS;
            break;
            case NoteHitResult.NO_HIT:
                noteScore = ScoreWeight.PERFECT;
            break;
            default:
                console.warn("[Score] Invalid note type: " + noteType);
            break;
        }

        if(noteType != NoteHitResult.NO_HIT) {
            this.currentTotal++; // Plus total hitted note
            this.accuracySum += accuracyWeight;
            this.accuracy = this.accuracySum / this.currentTotal;
        }

        // Score simply multiply by current combo
        // Higher combo hold = higher score
        this.score += (noteScore * this.combo);
    }
}