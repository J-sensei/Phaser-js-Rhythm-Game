class SongSelectScene extends Phaser.Scene {
    constructor() {
        super("SongSelectScene");
    }

    create() {
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.leftKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.rightKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.escapeKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.upKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.upKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.downKey1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.downKey2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.selectAudio = this.sound.add(SFXId.SELECT);
        this.backAudio = this.sound.add(SFXId.BACK);
        this.clickAudio = this.sound.add(SFXId.CLICK);

        // Initialize selected song as the current song
        this.imageX = game.config.width / 2;
        this.imageY = 270;

        this.selectingDifficulty = false;
        this.selectedDifficulty = Difficulty.EASY;
        this.currentIndex = 0;
        this.selectedSong = CurrentSong;
        this.selectedSong.createImage(this, this.imageX, this.imageY);
        this.selectedSong.preview(this);

        this.titleLabel = this.add.text(240 + 30, 35, "Song Selection", {
            fontFamily: 'Silkscreen', 
            fontSize: 52
        }).setOrigin(0.5); 
        this.songsLabel = this.add.text(35, 48 + 30, "Song: " + (this.currentIndex + 1) + " / " + SongList.length, {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0); 

        this.difficultyLabel = this.add.text(game.config.width / 1.7, game.config.height / 3, "Select Difficulty", {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0); 
        this.difficultySelectLabel = this.add.text(game.config.width / 1.7, game.config.height / 2, "> Easy\nHard", {
            fontFamily: 'Silkscreen', 
            fontSize: 32
        }).setOrigin(0); 
        this.difficultyLabel.alpha = 0;
        this.difficultySelectLabel.alpha = 0;

        this.selectedSong.setTitles(this.titleLabel, this.songsLabel);
    }

    update() {
        this.selectedSong.updatePreview(this);

        if(!this.selectingDifficulty) {
            if(Phaser.Input.Keyboard.JustDown(this.leftKey) || (Phaser.Input.Keyboard.JustDown(this.leftKey2))) {
                this.currentIndex--;
                if(this.currentIndex < 0) {
                    this.currentIndex = SongList.length - 1;
                }
    
                this.updateSelectedSong(this.currentIndex);
    
            } else if(Phaser.Input.Keyboard.JustDown(this.rightKey) || (Phaser.Input.Keyboard.JustDown(this.rightKey2))) {
                this.currentIndex++;
                if(this.currentIndex > SongList.length - 1) {
                    this.currentIndex = 0;
                }
    
                this.updateSelectedSong(this.currentIndex);
            }

            if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                // this.selectAudio.play(Note.SFXConfig);
                // console.log("ENTER BEATMAP!");

    
                // Select Difficulty
                this.selectingDifficulty = true;
                this.selectedSong.moveImage(-200, 100);        
                this.difficultyLabel.alpha = 1;
                this.difficultySelectLabel.alpha = 1;
                this.selectAudio.play(Note.SFXConfig);
            }
        }

        if(this.selectingDifficulty) {
            if(Phaser.Input.Keyboard.JustDown(this.escapeKey)) {    
                // Select Difficulty
                this.selectingDifficulty = false;
                this.selectedSong.moveImage();        
                this.difficultyLabel.alpha = 0;
                this.difficultySelectLabel.alpha = 0;
                this.backAudio.play(Note.SFXConfig);
            }

            if(Phaser.Input.Keyboard.JustDown(this.upKey1) || Phaser.Input.Keyboard.JustDown(this.upKey2) ||
            Phaser.Input.Keyboard.JustDown(this.downKey1) || Phaser.Input.Keyboard.JustDown(this.downKey2)) {
                this.selectAudio.play(Note.SFXConfig);
                if(this.selectedDifficulty === Difficulty.EASY) {
                    this.selectedDifficulty = Difficulty.HARD;
                } else {
                    this.selectedDifficulty = Difficulty.EASY;
                }

                "> Easy\nHard"
                let easyString = "Easy";
                let hardString = "Hard";
                if(this.selectedDifficulty === Difficulty.EASY) {
                    easyString = "> Easy";
                } else if(this.selectedDifficulty === Difficulty.HARD) {
                    hardString = "> Hard";
                }

                const diffString = easyString + "\n" + hardString;
                this.difficultySelectLabel.text = diffString;
            }

            if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {
                this.clickAudio.play(Note.SFXConfig);
                CurrentSong = this.selectedSong;
                CurrentDifficulty = this.selectedDifficulty;
                this.selectedSong.switchOut();
                this.scene.start("Debug"); // Test
            }
        }
    }

    updateSelectedSong(index) {
        this.selectAudio.play(Note.SFXConfig);
        this.selectedSong.switchOut();
        this.selectedSong = SongList[index];
        this.selectedSong.createImage(this, this.imageX, this.imageY);
        this.selectedSong.preview(this);
        this.songsLabel.text = "Song: " + (index + 1) + " / " + SongList.length;
        this.selectedSong.setTitles(this.titleLabel, this.songsLabel);
    }
}