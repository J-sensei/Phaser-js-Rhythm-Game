class Result extends Phaser.Scene {
    constructor() {
        super(SceneKey.RESULT);
    }

    create() {
        this.labels = [];
        this.score = Score.GetInstance();

        this.titleLabel = this.add.text(game.config.width / 2, 150, "Result", {
            fontFamily: 'Silkscreen', 
            fontSize: 64
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        
        this.songLabel = this.add.text(game.config.width / 2, 200, CurrentSong.name + " by " + CurrentSong.artist, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 

        this.scoreLabel = this.add.text(game.config.width / 2, 250, "Note Hit", {
            fontFamily: 'Silkscreen', 
            fontSize: 28
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabel = this.add.text(game.config.width / 2, 280, "Perfect: " + this.score.perfect, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabel = this.add.text(game.config.width / 2, 310, "Great: " + this.score.great, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabel = this.add.text(game.config.width / 2, 340, "Bad: " + this.score.bad, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabel = this.add.text(game.config.width / 2, 370, "Miss: " + this.score.miss, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 

        this.scoreLabel = this.add.text(game.config.width / 2, 450, "Score", {
            fontFamily: 'Silkscreen', 
            fontSize: 28
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabel = this.add.text(game.config.width / 2, 480, "Max Combo: " + this.score.maxCombo, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabel = this.add.text(game.config.width / 2, 510, "Accuracy: " + (this.score.accuracy * 100).toFixed(2) + "%", {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 
        this.scoreLabel = this.add.text(game.config.width / 2, 540, "Score: " + this.score.score, {
            fontFamily: 'Silkscreen', 
            fontSize: 24
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 

        // Grade
        const grade = this.calculateGrade((this.score.accuracy * 100).toFixed(2));

        this.scoreLabel = this.add.text(game.config.width - 250, game.config.height / 2, grade, {
            fontFamily: 'Silkscreen', 
            fontSize: 200
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 

        this.optionLabel = this.add.text(game.config.width / 2, 625, "> Retry\nSong Select", {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0.5).setDepth(LayerConfig.UI); 

        this.bgm = this.sound.add(SFXId.RESULT_BGM);
        this.bgm.play(Note.SFXConfigLooping);

        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.upKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.downKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.option = 0;
        this.selectAudio = this.sound.add(SFXId.SELECT);
        this.backAudio = this.sound.add(SFXId.BACK);
        this.clickAudio = this.sound.add(SFXId.CLICK);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(this.upKey) || Phaser.Input.Keyboard.JustDown(this.upKey2)) {
            this.updateOption(true);
        } else if(Phaser.Input.Keyboard.JustDown(this.downKey) || Phaser.Input.Keyboard.JustDown(this.downKey2)) {
            this.updateOption(false);
        }
        
        if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
            this.selectAudio.play(Note.SFXConfig);
            this.bgm.stop();
            switch(this.option) {
                case 0:
                    this.scene.start(SceneKey.LEVEL);
                    break;
                case 1:
                    this.scene.start(SceneKey.SONG_SELECT);
                    break;
            }
        }
    }

    updateOption(up) {
        this.selectAudio.play(Note.SFXConfig);
        if(up)
            this.option--;
        else
            this.option++;
            
        if(this.option < 0) this.option = 1;
        if(this.option > 1) this.option = 0;

        let retryString = "Retry";
        let backString = "Song Selection";

        switch(this.option) {
            case 0:
                retryString = "> " + retryString;
                break;
            case 1:
                backString = "> " + backString;
                break;
        }

        const combineString = retryString + "\n" + backString;
        this.optionLabel.text = combineString;    
    }

    calculateGrade(accuracy) {
        if(accuracy >= 100) {
            return "SSS";
        } else if(accuracy >= 95) {
            return "SS";
        } else if(accuracy >= 90) {
            return "S";
        } else if(accuracy >= 80) {
            return "A";
        } else if(accuracy >= 70) {
            return "B";
        } else if(accuracy >= 60) {
            return "C";
        } else {
            return "D";
        }
    }
}